import { useState, useRef, useEffect } from "react"

export default function CommandInput({ onSend, loading }) {
  const [text,     setText]     = useState("")
  const [image,    setImage]    = useState(null)
  const [preview,  setPreview]  = useState(null)
  const textRef  = useRef(null)
  const fileRef  = useRef(null)

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "auto"
      textRef.current.style.height = Math.min(textRef.current.scrollHeight, 180) + "px"
    }
  }, [text])

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => { setImage(null); setPreview(null); fileRef.current.value = "" }

  const handleSend = () => {
    if ((!text.trim() && !image) || loading) return
    onSend(text.trim(), image)
    setText("")
    setImage(null)
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ""
  }

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <div className="border-t border-nebula-border bg-nebula-surface px-6 py-4">

      {/* Image preview */}
      {preview && (
        <div className="relative inline-block mb-3">
          <img src={preview} alt="upload preview" className="h-20 w-20 object-cover rounded-xl border border-nebula-border" />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
          >✕</button>
        </div>
      )}

      <div className="flex items-end gap-3 bg-nebula-surface2 border border-nebula-border focus-within:border-nebula-primary/60 rounded-2xl px-4 py-3 transition-all">
        <span className="text-nebula-primary text-base pb-0.5 flex-shrink-0">✦</span>
        <textarea
          ref={textRef}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask Lumina anything…"
          className="flex-1 bg-transparent text-nebula-text placeholder-nebula-muted text-sm outline-none resize-none leading-relaxed"
        />
        <div className="flex items-center gap-2 flex-shrink-0 pb-0.5">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="text-nebula-muted hover:text-nebula-primary transition-colors text-sm cursor-pointer"
            title="Attach image"
          >⊕</label>
          <button
            onClick={handleSend}
            disabled={(!text.trim() && !image) || loading}
            className="w-8 h-8 bg-nebula-primary hover:bg-purple-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-all"
          >
            <span className="text-white text-sm font-bold">↑</span>
          </button>
        </div>
      </div>
      <p className="text-center text-[10px] text-nebula-border font-mono mt-2">
        Enter to send &nbsp;·&nbsp; Shift+Enter for new line &nbsp;·&nbsp; ⊕ to attach image
      </p>
    </div>
  )
}
