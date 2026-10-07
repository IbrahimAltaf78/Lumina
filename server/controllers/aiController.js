const OpenAI       = require("openai");
const Message      = require("../models/Message");
const Conversation = require("../models/Conversation");

const groq = new OpenAI({
  apiKey:  process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
});

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

    let fullText = "";

    const stream = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
      stream: true,
      messages: [
        { role: "system", content: "You are Lumina, a helpful AI assistant. Be concise, clear, and friendly." },
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