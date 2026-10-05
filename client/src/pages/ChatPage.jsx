import { useAuth } from "../context/AuthContext"

export default function ChatPage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-nebula-bg flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-nebula-primary mb-4">✦ Lumina</h1>
        <p className="text-nebula-dim mb-2">Welcome back, <span className="text-nebula-text font-semibold">{user?.name}</span></p>
        <p className="text-nebula-muted text-sm mb-8">Chat interface coming next.</p>
        <button
          onClick={logout}
          className="text-xs text-nebula-muted hover:text-nebula-dim border border-nebula-border px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}