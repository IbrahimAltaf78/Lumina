import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const [name,        setName]        = useState(user?.name || "")
  const [currentPass, setCurrentPass] = useState("")
  const [newPass,     setNewPass]     = useState("")
  const [message,     setMessage]     = useState("")
  const [error,       setError]       = useState("")
  const [loading,     setLoading]     = useState(false)

  const handleUpdateName = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    setError("")
    try {
      await api.patch("/auth/update", { name })
      setMessage("Name updated successfully!")
      const saved = JSON.parse(localStorage.getItem("lumina_user"))
      localStorage.setItem("lumina_user", JSON.stringify({ ...saved, name }))
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update name")
    } finally { setLoading(false) }
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault()
    if (newPass.length < 6) { setError("Password must be at least 6 characters"); return }
    setLoading(true)
    setMessage("")
    setError("")
    try {
      await api.patch("/auth/update", { currentPassword: currentPass, newPassword: newPass })
      setMessage("Password updated successfully!")
      setCurrentPass("")
      setNewPass("")
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update password")
    } finally { setLoading(false) }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure? This will permanently delete your account and all conversations.")) return
    try {
      await api.delete("/auth/delete")
      logout()
      navigate("/login")
    } catch (err) {
      setError("Failed to delete account")
    }
  }

  return (
    <div className="min-h-screen bg-nebula-bg">
      {/* Header */}
      <div className="h-14 bg-nebula-surface border-b border-nebula-border flex items-center px-6 gap-4">
        <button
          onClick={() => navigate("/chat")}
          className="text-nebula-muted hover:text-nebula-dim transition-colors text-sm font-mono"
        >← Back</button>
        <h1 className="text-nebula-text font-semibold">Settings</h1>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">

        {/* Profile */}
        <div className="bg-nebula-surface border border-nebula-border rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-nebula-primary flex items-center justify-center text-white text-xl font-bold">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-nebula-text font-semibold text-lg">{user?.name}</p>
              <p className="text-nebula-muted text-sm">{user?.email}</p>
              <span className="text-[10px] font-mono text-nebula-primary bg-nebula-primary/10 border border-nebula-primary/20 px-2 py-0.5 rounded-full">
                {user?.plan} plan
              </span>
            </div>
          </div>

          <form onSubmit={handleUpdateName} className="space-y-3">
            <label className="block text-nebula-dim text-sm mb-1">Display Name</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="flex-1 bg-nebula-surface2 border border-nebula-border rounded-xl px-4 py-2.5 text-nebula-text text-sm outline-none focus:border-nebula-primary transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-nebula-primary hover:bg-purple-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Appearance */}
        <div className="bg-nebula-surface border border-nebula-border rounded-2xl p-6">
          <h2 className="text-nebula-text font-semibold mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-nebula-dim text-sm font-medium">Theme</p>
              <p className="text-nebula-muted text-xs mt-0.5">Switch between Nebula dark and light mode</p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                theme === "dark" ? "bg-nebula-primary" : "bg-nebula-border"
              }`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                theme === "dark" ? "translate-x-7" : "translate-x-1"
              }`}/>
            </button>
          </div>
          <p className="text-nebula-muted text-xs mt-2 font-mono">
            Current: {theme === "dark" ? "🌙 Nebula Dark" : "☀️ Nebula Light"}
          </p>
        </div>

        {/* Change Password */}
        <div className="bg-nebula-surface border border-nebula-border rounded-2xl p-6">
          <h2 className="text-nebula-text font-semibold mb-4">Change Password</h2>
          <form onSubmit={handleUpdatePassword} className="space-y-3">
            <div>
              <label className="block text-nebula-dim text-sm mb-1">Current Password</label>
              <input
                type="password"
                value={currentPass}
                onChange={e => setCurrentPass(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-nebula-surface2 border border-nebula-border rounded-xl px-4 py-2.5 text-nebula-text text-sm outline-none focus:border-nebula-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-nebula-dim text-sm mb-1">New Password</label>
              <input
                type="password"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-nebula-surface2 border border-nebula-border rounded-xl px-4 py-2.5 text-nebula-text text-sm outline-none focus:border-nebula-primary transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-nebula-primary hover:bg-purple-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors disabled:opacity-50"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Messages */}
        {message && <p className="text-nebula-green text-sm bg-nebula-green/10 border border-nebula-green/20 rounded-xl px-4 py-3">{message}</p>}
        {error   && <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{error}</p>}

        {/* Danger Zone */}
        <div className="bg-nebula-surface border border-red-500/20 rounded-2xl p-6">
          <h2 className="text-red-400 font-semibold mb-2">Danger Zone</h2>
          <p className="text-nebula-muted text-sm mb-4">Permanently delete your account and all conversations. This cannot be undone.</p>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
          >
            Delete Account
          </button>
        </div>

      </div>
    </div>
  )
}