import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import LoginPage from "./pages/LoginPage"
import ChatPage  from "./pages/ChatPage"

function App() {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="min-h-screen bg-nebula-bg flex items-center justify-center">
      <p className="text-nebula-primary text-xl">✦</p>
    </div>
  )

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/chat" />} />
      <Route path="/chat"  element={user  ? <ChatPage />  : <Navigate to="/login" />} />
      <Route path="*"      element={<Navigate to={user ? "/chat" : "/login"} />} />
    </Routes>
  )
}

export default App