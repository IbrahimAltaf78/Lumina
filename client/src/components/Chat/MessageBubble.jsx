import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function MessageBubble({ message }) {
  const isUser = message.role === "user"

  return (
    <div className={`flex gap-3 mb-5 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-lg bg-nebula-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">✦</div>
      )}
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
        isUser
          ? "bg-nebula-primary text-white rounded-tr-sm"
          : "bg-nebula-primary/10 border border-nebula-primary/20 text-nebula-dim rounded-tl-sm"
      }`}>
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <ReactMarkdown components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "")
              return !inline && match ? (
                <div className="my-2">
                  <div className="flex items-center justify-between bg-nebula-surface2 px-3 py-1 rounded-t-lg border border-nebula-border">
                    <span className="text-[10px] font-mono text-nebula-muted">{match[1]}</span>
                    <button onClick={() => navigator.clipboard.writeText(String(children))} className="text-[10px] text-nebula-muted hover:text-nebula-dim">copy</button>
                  </div>
                  <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" className="rounded-b-lg !m-0" {...props}>
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                </div>
              ) : (
                <code className="bg-nebula-surface2 px-1.5 py-0.5 rounded text-nebula-cyan font-mono text-xs" {...props}>{children}</code>
              )
            },
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
            strong: ({ children }) => <strong className="font-semibold text-nebula-text">{children}</strong>,
            h1: ({ children }) => <h1 className="text-lg font-bold text-nebula-text mb-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-base font-bold text-nebula-text mb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-sm font-bold text-nebula-text mb-1">{children}</h3>,
          }}>
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  )
}