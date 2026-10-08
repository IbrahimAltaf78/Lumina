import { useState, useEffect, useRef } from "react"
import Sidebar       from "../components/Layout/Sidebar"
import Navbar        from "../components/Layout/Navbar"
import MessageBubble from "../components/Chat/MessageBubble"
import CommandInput  from "../components/Chat/CommandInput"
import api           from "../services/api"

export default function ChatPage() {
  const [collapsed,     setCollapsed]     = useState(false)
  const [conversations, setConversations] = useState([])
  const [activeId,      setActiveId]      = useState(null)
  const [messages,      setMessages]      = useState([])
  const [loading,       setLoading]       = useState(false)
  const [model,         setModel]         = useState("openai/gpt-oss-20b")
  const bottomRef = useRef(null)

  useEffect(() => {
    api.get("/conversations").then(r => setConversations(r.data)).catch(() => {})
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSelect = async (id) => {
    setActiveId(id)
    try {
      const { data } = await api.get(`/conversations/${id}`)
      setMessages(data.messages)
    } catch {}
  }

  const handleNew = () => { setActiveId(null); setMessages([]) }

  const handleDelete = (id) => {
    setConversations(prev => prev.filter(c => c._id !== id))
    if (activeId === id) { setActiveId(null); setMessages([]) }
  }

  const handleExport = () => {
    if (!messages.length) return
    const text = messages.map(m => `${m.role === "user" ? "You" : "Lumina"}: ${m.content}`).join("\n\n")
    const blob = new Blob([text], { type: "text/plain" })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement("a")
    a.href = url
    a.download = "lumina-chat.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  const sendMessage = async (text, historyOverride) => {
    setLoading(true)
    const history = historyOverride || messages
    const userMsg = { role: "user", content: text, _id: Date.now() }
    const newMessages = [...history, userMsg]
    setMessages(newMessages)

    try {
      let convoId = activeId
      if (!convoId) {
        const { data } = await api.post("/conversations", { title: text.slice(0, 40), model })
        convoId = data._id
        setActiveId(convoId)
        setConversations(prev => [data, ...prev])
      }

      const aiId = Date.now() + 1
      setMessages(prev => [...prev, { role: "assistant", content: "", _id: aiId }])

      const token    = localStorage.getItem("lumina_token")
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body:    JSON.stringify({
          conversationId: convoId,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          model
        })
      })

      const reader  = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const lines = decoder.decode(value).split("\n").filter(l => l.startsWith("data: "))
        for (const line of lines) {
          const raw = line.replace("data: ", "")
          if (raw === "[DONE]") break
          try {
            const { text: chunk } = JSON.parse(raw)
            if (chunk) setMessages(prev => prev.map(m => m._id === aiId ? { ...m, content: m.content + chunk } : m))
          } catch {}
        }
      }

      const { data: convos } = await api.get("/conversations")
      setConversations(convos)

    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  const handleSend = (text) => sendMessage(text)

  const handleRegenerate = () => {
    const lastUser = [...messages].reverse().find(m => m.role === "user")
    if (!lastUser) return
    const history = messages.slice(0, messages.lastIndexOf(messages.find(m => m === lastUser)))
    setMessages(messages.filter(m => m.role !== "assistant" || messages.indexOf(m) !== messages.length - 1))
    sendMessage(lastUser.content, messages.filter((_, i) => i < messages.findLastIndex(m => m.role === "user")))
  }

  return (
    <div className="flex h-screen bg-nebula-bg overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        conversations={conversations}
        activeId={activeId}
        onSelect={handleSelect}
        onNew={handleNew}
        onDelete={handleDelete}
      />
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar
          onToggleSidebar={() => setCollapsed(!collapsed)}
          model={model}
          onModelChange={setModel}
          onExport={handleExport}
          hasMessages={messages.length > 0}
        />
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-5xl mb-4">✦</p>
              <h2 className="text-2xl font-bold text-nebula-primary mb-2">Lumina</h2>
              <p className="text-nebula-muted text-sm">Start a conversation below.</p>
            </div>
          ) : messages.map((m, i) => (
            <MessageBubble
              key={m._id}
              message={m}
              isLast={i === messages.length - 1}
              onRegenerate={i === messages.length - 1 ? handleRegenerate : null}
            />
          ))}
          {loading && messages[messages.length - 1]?.content === "" && (
            <div className="flex gap-3 mb-5">
              <div className="w-7 h-7 rounded-lg bg-nebula-primary flex items-center justify-center text-white text-xs">✦</div>
              <div className="bg-nebula-primary/10 border border-nebula-primary/20 rounded-2xl rounded-tl-sm px-4 py-3">
                <span className="text-nebula-primary text-sm animate-pulse">Thinking…</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <CommandInput onSend={handleSend} loading={loading} />
      </div>
    </div>
  )
}