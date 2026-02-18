import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  async function onSubmit(e) {
    e.preventDefault();
    if (loading || cooldown > 0) return;

    setErr("");
    setLoading(true);

    try {
      const res = await api.post(
        "/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (e2) {
      const status = e2?.response?.status;

      if (status === 429) {
        setCooldown(30);
        setErr("Too many attempts. Please wait 30 seconds and try again.");
      } else if (status === 401) {
        setErr("Invalid username or password.");
      } else {
        setErr(e2?.response?.data?.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  }

  const disabled = loading || cooldown > 0;

  return (
    <div className="relative min-h-screen grid place-items-center p-6 bg-[#f4f1ea]">
      {/* Centered Card */}
      <div className="relative w-full max-w-md bg-white rounded-[28px] border border-gray-200 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-[#1b1b1b] text-center tracking-wide mb-6">
          Go to Zakoota Dashboard
        </h2>
        <p className="text-sm text-black/60 text-center mb-6">
          Login to access your dashboard and manage your content
        </p>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="text-xs font-extrabold tracking-[0.5px] text-[#1b1b1b]/60">
              USERNAME
            </label>
            <input
              className="mt-2 w-full rounded-[20px] border border-gray-300 px-4 py-3 text-black text-sm font-semibold outline-none focus:ring-4 focus:ring-orange-100 transition"
           
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter User Name"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-xs font-extrabold tracking-[0.5px] text-[#1b1b1b]/60">
              PASSWORD
            </label>
            <input
              type="password"
              className="mt-2 w-full rounded-[20px] border border-gray-300 px-4 py-3 text-black text-sm font-semibold outline-none focus:ring-4 focus:ring-orange-100 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {/* Error */}
          {err && (
            <div className="text-sm text-red-600 font-semibold py-2 text-center">
              {err}
            </div>
          )}

          {/* Submit */}
          <button
            disabled={disabled}
            className={[
              "w-full rounded-[20px] bg-[#0b7a3b] text-white font-extrabold py-3 shadow-lg text-sm transition-all",
              disabled ? "opacity-60 cursor-not-allowed" : "hover:opacity-95",
            ].join(" ")}
          >
            {loading
              ? "CHECKING..."
              : cooldown > 0
              ? `WAIT ${cooldown}s`
              : "UNLOCK DASHBOARD"}
          </button>
        </form>
      </div>
    </div>
  );
}
