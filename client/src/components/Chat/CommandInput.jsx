import { useState, useRef, useEffect } from "react"

export default function CommandInput({ onSend, loading }) {
  const [text, setText] = useState("")
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto"
      ref.current.style.height = Math.min(ref.current.scrollHeight, 180) + "px"
    }
  }, [text])

  const handleSend = () => {
    if (!text.trim() || loading) return
    onSend(text.trim())
    setText("")
  }

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-nebula-border bg-nebula-surface px-6 py-4">
      <div className="flex items-end gap-3 bg-nebula-surface2 border border-nebula-border focus-within:border-nebula-primary/60 rounded-2xl px-4 py-3 transition-all">
        <span className="text-nebula-primary text-base pb-0.5 flex-shrink-0">✦</span>
        <textarea
          ref={ref}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask Lumina anything…"
          className="flex-1 bg-transparent text-nebula-text placeholder-nebula-muted text-sm outline-none resize-none leading-relaxed"
        />
        <div className="flex items-center gap-2 flex-shrink-0 pb-0.5">
          <button className="text-nebula-muted hover:text-nebula-dim transition-colors text-sm">⊕</button>
          <button
            onClick={handleSend}
            disabled={!text.trim() || loading}
            className="w-8 h-8 bg-nebula-primary hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-all"
          >
            <span className="text-white text-sm font-bold">↑</span>
          </button>
        </div>
      </div>
      <p className="text-center text-[10px] text-nebula-border font-mono mt-2">
        Enter to send &nbsp;·&nbsp; Shift+Enter for new line
      </p>
    </div>
  )
}