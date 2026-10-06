import { useAuth } from "../../context/AuthContext"

export default function Sidebar({ collapsed, onToggle, conversations, activeId, onSelect, onNew }) {
  const { user, logout } = useAuth()

  const today     = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const isToday     = (d) => new Date(d).toDateString() === today.toDateString()
  const isYesterday = (d) => new Date(d).toDateString() === yesterday.toDateString()

  const todayList     = conversations.filter(c => isToday(c.updatedAt))
  const yesterdayList = conversations.filter(c => isYesterday(c.updatedAt) && !isToday(c.updatedAt))
  const olderList     = conversations.filter(c => !isToday(c.updatedAt) && !isYesterday(c.updatedAt))

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

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-2 py-1">
        {!collapsed && (
          <>
            <ConvoGroup label="Today"     list={todayList}     activeId={activeId} onSelect={onSelect} />
            <ConvoGroup label="Yesterday" list={yesterdayList} activeId={activeId} onSelect={onSelect} />
            <ConvoGroup label="Older"     list={olderList}     activeId={activeId} onSelect={onSelect} />
            {conversations.length === 0 && (
              <p className="text-nebula-muted text-xs text-center py-10">No chats yet</p>
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

function ConvoGroup({ label, list, activeId, onSelect }) {
  if (!list.length) return null
  return (
    <>
      <p className="text-[10px] text-nebula-muted font-mono uppercase tracking-widest px-2 py-2">{label}</p>
      {list.map(c => (
        <button
          key={c._id}
          onClick={() => onSelect(c._id)}
          className={`w-full text-left px-3 py-2 rounded-lg mb-0.5 text-sm truncate transition-all ${
            c._id === activeId
              ? "bg-nebula-primary/15 text-nebula-text border border-nebula-primary/30"
              : "text-nebula-dim hover:bg-nebula-surface2"
          }`}
        >
          {c.title}
        </button>
      ))}
    </>
  )
}