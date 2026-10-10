const OpenAI       = require("openai");
const Message      = require("../models/Message");
const Conversation = require("../models/Conversation");

const groq = new OpenAI({
  apiKey:  process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

// ── Web search helper ─────────────────────
const webSearch = async (query) => {
  try {
    const res = await fetch("https://api.tavily.com/search", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key:      process.env.TAVILY_API_KEY,
        query:        query,
        search_depth: "basic",
        max_results:  5,
        include_answer: true
      })
    });

    const data = await res.json();
    console.log("TAVILY FULL:", JSON.stringify(data).slice(0, 800));
    console.log("Tavily status:", res.status);

    let results = [];

    // Direct answer
    if (data.answer) {
      results.push(`DIRECT ANSWER: ${data.answer}`);
    }

    // Search results
    if (data.results?.length) {
      results.push(...data.results.slice(0, 4).map(r =>
        `Title: ${r.title}\nContent: ${r.content}\nURL: ${r.url}`
      ));
    }

    console.log("Search results count:", results.length);
    return results.length > 0 ? results.join("\n\n") : "No results found.";

  } catch (err) {
    console.error("Search error:", err.message);
    return "Search unavailable.";
  }
};

// ── Detect if question needs web search ───
const needsWebSearch = (text) => {
  const keywords = [
    "today", "latest", "current", "now", "recent", "2024", "2025", "2026",
    "news", "update", "price", "weather", "score", "who won", "what happened",
    "right now", "this week", "this month", "this year", "live", "prime minister",
    "president", "ceo", "founder", "currently", "who is", "what is the latest",
    "how much is", "stock", "crypto", "bitcoin", "rate", "standings", "new"
  ];
  return keywords.some(k => text.toLowerCase().includes(k));
};

const chat = async (req, res, next) => {
  try {
    const { conversationId, messages } = req.body;

    res.setHeader("Content-Type",  "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection",    "keep-alive");

    const userMsg = await Message.create({
      conversation: conversationId,
      role:    "user",
      content: messages[messages.length - 1].content
    });
    await Conversation.findByIdAndUpdate(conversationId, {
      $push: { messages: userMsg._id },
      updatedAt: new Date()
    });

    const lastMessage = messages[messages.length - 1].content;
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });

    let systemPrompt = `You are Lumina, a helpful and intelligent AI assistant.
Today's date is ${today}.
Be concise, accurate, and friendly in your responses.`;

    // ── Add web search context if needed ──
    if (needsWebSearch(lastMessage)) {
      res.write(`data: ${JSON.stringify({ text: "🔍 Searching the web...\n\n" })}\n\n`);
      const searchResults = await webSearch(lastMessage);

      systemPrompt = `You are Lumina, an AI assistant with real-time web search.

TODAY'S DATE: ${today}

CRITICAL INSTRUCTIONS:
- You have JUST searched the web RIGHT NOW and found live results below
- You MUST use these search results as your PRIMARY and MOST RELIABLE source
- NEVER say "I don't have real-time data" or "my training data is limited" — you just searched
- NEVER say "as of my last update" — use the live results instead
- Answer DIRECTLY and CONFIDENTLY using the search results
- If the answer is in the search results, state it as fact
- Keep your answer concise and clear

LIVE WEB SEARCH RESULTS (just retrieved):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${searchResults}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Now answer the user's question using ONLY the live search results above.
Do not use your training data for facts — the search results are more current and accurate.`;
    }

    let fullText = "";

    const stream = await groq.chat.completions.create({
      model:       "openai/gpt-oss-20b",
      stream:      true,
      temperature: 0.3,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map(m => ({ role: m.role, content: m.content }))
      ]
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || "";
      if (text) {
        fullText += text;
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    const aiMsg = await Message.create({
      conversation: conversationId,
      role:    "assistant",
      content: fullText
    });
    await Conversation.findByIdAndUpdate(conversationId, {
      $push: { messages: aiMsg._id }
    });

    res.write("data: [DONE]\n\n");
    res.end();

  } catch (err) { next(err); }
};

module.exports = { chat };