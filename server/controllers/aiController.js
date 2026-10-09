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
    const res = await fetch("https://google.serper.dev/search", {
      method:  "POST",
      headers: {
        "X-API-KEY":    process.env.SERPER_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ q: query, num: 5 })
    });
    const data = await res.json();
    const results = data.organic?.slice(0, 4).map(r =>
      `Title: ${r.title}\nSnippet: ${r.snippet}\nURL: ${r.link}`
    ).join("\n\n");
    return results || "No results found.";
  } catch {
    return "Search unavailable.";
  }
};

// ── Detect if question needs web search ───
const needsWebSearch = (text) => {
  const keywords = [
    "today", "latest", "current", "now", "recent", "2024", "2025", "2026",
    "news", "update", "price", "weather", "score", "who won", "what happened",
    "right now", "this week", "this month", "this year", "live"
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
    let systemPrompt = "You are Lumina, a helpful AI assistant. Be concise, clear, and friendly.";

    // ── Add web search context if needed ──
    if (needsWebSearch(lastMessage)) {
      res.write(`data: ${JSON.stringify({ text: "🔍 Searching the web...\n\n" })}\n\n`);
      const searchResults = await webSearch(lastMessage);
      systemPrompt = `You are Lumina, a helpful AI assistant with access to real-time web search.
      
Current date: ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}

Web search results for "${lastMessage}":
${searchResults}

Use these search results to give an accurate, up-to-date answer. Cite sources when relevant. Be concise and friendly.`;
    }

    let fullText = "";

    const stream = await groq.chat.completions.create({
      model:  "meta-llama/llama-4-scout-17b-16e-instruct",
      stream: true,
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