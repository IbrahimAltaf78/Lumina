import { useState, useEffect, useRef } from "react"
import Sidebar      from "../components/Layout/Sidebar"
import Navbar       from "../components/Layout/Navbar"
import MessageBubble from "../components/Chat/MessageBubble"
import CommandInput  from "../components/Chat/CommandInput"
import api           from "../services/api"

export default function ChatPage() {
  const [collapsed,      setCollapsed]      = useState(false)
  const [conversations,  setConversations]  = useState([])
  const [activeId,       setActiveId]       = useState(null)
  const [messages,       setMessages]       = useState([])
  const [loading,        setLoading]        = useState(false)
  const [model,          setModel]          = useState("claude-sonnet-4-6")
  const bottomRef = useRef(null)

  // Load all conversations on mount
  useEffect(() => {
    api.get("/conversations").then(res => setConversations(res.data)).catch(() => {})
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Load messages when active conversation changes
  const handleSelect = async (id) => {
    setActiveId(id)
    try {
      const { data } = await api.get(`/conversations/${id}`)
      setMessages(data.messages)
    } catch {}
  }

  // Create new conversation
  const handleNew = () => {
    setActiveId(null)
    setMessages([])
  }

  // Send message
  const handleSend = async (text) => {
    setLoading(true)

    const userMsg = { role: "user", content: text, _id: Date.now() }
    setMessages(prev => [...prev, userMsg])

    try {
      let convoId = activeId

      // Create conversation if none active
      if (!convoId) {
        const { data } = await api.post("/conversations", {
          title: text.slice(0, 40),
          model
        })
        convoId = data._id
        setActiveId(convoId)
        setConversations(prev => [data, ...prev])
      }

      // Placeholder AI response (we connect real AI in Phase 4)
      const aiMsg = {
        role: "assistant",
        content: "✦ AI integration coming in Phase 4. Your message was: " + text,
        _id: Date.now() + 1
      }
      setMessages(prev => [...prev, aiMsg])

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-nebula-bg overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        conversations={conversations}
        activeId={activeId}
        onSelect={handleSelect}
        onNew={handleNew}
      />

      {/* Main Area */}
      <div className="flex flex-col flex-1 min-w-0">

        {/* Navbar */}
        <Navbar
          onToggleSidebar={() => setCollapsed(!collapsed)}
          model={model}
          onModelChange={setModel}
        />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-5xl mb-4">✦</p>
              <h2 className="text-2xl font-bold text-nebula-primary mb-2">Lumina</h2>
              <p className="text-nebula-muted text-sm">Start a conversation below.</p>
            </div>
          ) : (
            messages.map(msg => <MessageBubble key={msg._id} message={msg} />)
          )}
          {loading && (
            <div className="flex gap-3 mb-5">
              <div className="w-7 h-7 rounded-lg bg-nebula-primary flex items-center justify-center text-white text-xs font-bold">✦</div>
              <div className="bg-nebula-primary/10 border border-nebula-primary/20 rounded-2xl rounded-tl-sm px-4 py-3">
                <span className="text-nebula-primary text-sm animate-pulse">Thinking…</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <CommandInput onSend={handleSend} loading={loading} />

      </div>
    </div>
  )
}