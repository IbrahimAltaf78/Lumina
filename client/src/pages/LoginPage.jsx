import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const [isLogin,  setIsLogin]  = useState(true);
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-nebula-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-nebula-primary mb-2">✦ Lumina</h1>
          <p className="text-nebula-dim text-sm">Your AI assistant. Your interface.</p>
        </div>

        {/* Card */}
        <div className="bg-nebula-surface border border-nebula-border rounded-2xl p-8">

          {/* Tabs */}
          <div className="flex bg-nebula-surface2 rounded-xl p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                isLogin
                  ? "bg-nebula-primary text-white"
                  : "text-nebula-dim hover:text-nebula-text"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                !isLogin
                  ? "bg-nebula-primary text-white"
                  : "text-nebula-dim hover:text-nebula-text"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-nebula-dim text-sm mb-1.5">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-nebula-surface2 border border-nebula-border rounded-xl px-4 py-3 text-nebula-text placeholder-nebula-muted text-sm outline-none focus:border-nebula-primary transition-colors"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-nebula-dim text-sm mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-nebula-surface2 border border-nebula-border rounded-xl px-4 py-3 text-nebula-text placeholder-nebula-muted text-sm outline-none focus:border-nebula-primary transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-nebula-dim text-sm mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-nebula-surface2 border border-nebula-border rounded-xl px-4 py-3 text-nebula-text placeholder-nebula-muted text-sm outline-none focus:border-nebula-primary transition-colors"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-nebula-primary hover:bg-purple-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all text-sm mt-2"
            >
              {loading ? "Please wait..." : isLogin ? "Login to Lumina" : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-nebula-muted text-xs mt-6">
          ✦ Lumina — Built with intention. Designed to be different.
        </p>
      </div>
    </div>
  );
}