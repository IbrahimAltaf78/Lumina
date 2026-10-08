export default function Navbar({ onToggleSidebar, model, onModelChange, onExport, hasMessages }) {
  const models = [
    { id: "openai/gpt-oss-20b",  label: "GPT-OSS 20B" },
    { id: "openai/gpt-oss-120b", label: "GPT-OSS 120B" },
  ]

  return (
    <div className="h-14 bg-nebula-surface border-b border-nebula-border flex items-center justify-between px-4 flex-shrink-0">
      <button
        onClick={onToggleSidebar}
        className="text-nebula-muted hover:text-nebula-dim transition-colors p-2 rounded-lg hover:bg-nebula-surface2"
      >☰</button>

      <div className="flex items-center gap-2 bg-nebula-surface2 border border-nebula-border rounded-lg px-3 py-1.5">
        <span className="w-2 h-2 rounded-full bg-nebula-green flex-shrink-0"></span>
        <select
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
          className="bg-transparent text-nebula-dim text-xs font-mono outline-none cursor-pointer"
        >
          {models.map(m => (
            <option key={m.id} value={m.id} className="bg-nebula-surface2">{m.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        {hasMessages && (
          <button
            onClick={onExport}
            className="text-nebula-muted hover:text-nebula-dim transition-colors p-2 rounded-lg hover:bg-nebula-surface2 text-xs font-mono"
            title="Export chat"
          >↓ export</button>
        )}
        <button className="text-nebula-muted hover:text-nebula-dim transition-colors p-2 rounded-lg hover:bg-nebula-surface2 text-sm">⚙</button>
      </div>
    </div>
  )
}