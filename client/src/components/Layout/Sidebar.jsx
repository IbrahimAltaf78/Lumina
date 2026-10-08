import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import api from "../../services/api"

export default function Sidebar({ collapsed, onToggle, conversations, activeId, onSelect, onNew, onDelete }) {
  const { user, logout } = useAuth()
  const [search, setSearch] = useState("")
  const [hoverId, setHoverId] = useState(null)

  const filtered = conversations.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase())
  )

  const today     = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const isToday     = (d) => new Date(d).toDateString() === today.toDateString()
  const isYesterday = (d) => new Date(d).toDateString() === yesterday.toDateString()

  const todayList     = filtered.filter(c => isToday(c.updatedAt))
  const yesterdayList = filtered.filter(c => isYesterday(c.updatedAt) && !isToday(c.updatedAt))
  const olderList     = filtered.filter(c => !isToday(c.updatedAt) && !isYesterday(c.updatedAt))

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    try {
      await api.delete(`/conversations/${id}`)
      onDelete(id)
    } catch {}
  }

  return (
    <div className={`flex flex-col bg-nebula-surface border-r border-nebula-border transition-all duration-300 flex-shrink-0 ${collapsed ? "w-14" : "w-60"}`}>

      {/* Logo + Toggle */}
      <div className="flex items-center gap-2 p-4 border-b border-nebula-border h-14">
        <span className="text-nebula-primary text-xl flex-shrink-0">✦</span>
        {!collapsed && <span className="font-bold text-nebula-text flex-1">Lumina</span>}
        <button onClick={onToggle} className="text-nebula-muted hover:text-nebula-dim transition-colors text-sm ml-auto">
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* New Chat */}
      <div className="p-2">
        <button
          onClick={onNew}
          className={`flex items-center gap-2 w-full bg-nebula-primary/10 hover:bg-nebula-primary/20 border border-nebula-primary/30 text-nebula-primary rounded-xl p-2.5 transition-all text-sm font-medium ${collapsed ? "justify-center" : ""}`}
        >
          <span className="text-base leading-none">+</span>
          {!collapsed && "New Chat"}
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-2 pb-2">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search chats..."
            className="w-full bg-nebula-surface2 border border-nebula-border rounded-lg px-3 py-1.5 text-xs text-nebula-dim placeholder-nebula-muted outline-none focus:border-nebula-primary/50 transition-colors"
          />
        </div>
      )}

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-2 py-1">
        {!collapsed && (
          <>
            <ConvoGroup label="Today"     list={todayList}     activeId={activeId} onSelect={onSelect} onDelete={handleDelete} hoverId={hoverId} setHoverId={setHoverId} />
            <ConvoGroup label="Yesterday" list={yesterdayList} activeId={activeId} onSelect={onSelect} onDelete={handleDelete} hoverId={hoverId} setHoverId={setHoverId} />
            <ConvoGroup label="Older"     list={olderList}     activeId={activeId} onSelect={onSelect} onDelete={handleDelete} hoverId={hoverId} setHoverId={setHoverId} />
            {filtered.length === 0 && (
              <p className="text-nebula-muted text-xs text-center py-10">
                {search ? "No results" : "No chats yet"}
              </p>
            )}
          </>
        )}
      </div>

      {/* User Profile */}
      <div className="p-2 border-t border-nebula-border">
        <div className={`flex items-center gap-2 p-2 rounded-xl hover:bg-nebula-surface2 cursor-pointer transition-colors ${collapsed ? "justify-center" : ""}`}>
          <div className="w-7 h-7 rounded-full bg-nebula-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-nebula-text text-xs font-semibold truncate">{user?.name}</p>
                <p className="text-nebula-muted text-[10px] font-mono">{user?.plan} plan</p>
              </div>
              <button onClick={logout} className="text-nebula-muted hover:text-red-400 text-xs transition-colors">✕</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function ConvoGroup({ label, list, activeId, onSelect, onDelete, hoverId, setHoverId }) {
  if (!list.length) return null
  return (
    <>
      <p className="text-[10px] text-nebula-muted font-mono uppercase tracking-widest px-2 py-2">{label}</p>
      {list.map(c => (
        <div
          key={c._id}
          onMouseEnter={() => setHoverId(c._id)}
          onMouseLeave={() => setHoverId(null)}
          className={`flex items-center gap-1 rounded-lg mb-0.5 transition-all ${
            c._id === activeId ? "bg-nebula-primary/15 border border-nebula-primary/30" : "hover:bg-nebula-surface2"
          }`}
        >
          <button
            onClick={() => onSelect(c._id)}
            className="flex-1 text-left px-3 py-2 text-sm truncate"
          >
            <span className={c._id === activeId ? "text-nebula-text" : "text-nebula-dim"}>
              {c.title}
            </span>
          </button>
          {hoverId === c._id && (
            <button
              onClick={(e) => onDelete(e, c._id)}
              className="pr-2 text-nebula-muted hover:text-red-400 transition-colors text-xs flex-shrink-0"
            >
              🗑
            </button>
          )}
        </div>
      ))}
    </>
  )
}