export default function MessageBubble({ message }) {
  const isUser = message.role === "user"

  return (
    <div className={`flex gap-3 mb-5 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-nebula-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
          ✦
        </div>
      )}
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
        isUser
          ? "bg-nebula-primary text-white rounded-tr-sm"
          : "bg-nebula-primary/10 border border-nebula-primary/20 text-nebula-dim rounded-tl-sm"
      }`}>
        {message.content}
      </div>
    </div>
  )
}