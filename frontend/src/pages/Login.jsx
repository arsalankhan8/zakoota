import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // cooldown seconds left
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
    // Explicitly set Content-Type to ensure backend parses JSON correctly
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
      setErr("Invalid username or password."); // more descriptive
    } else {
      setErr(e2?.response?.data?.message || "Login failed");
    }
  } finally {
    setLoading(false);
  }
}

  const disabled = loading || cooldown > 0;

  return (
    <div className="relative min-h-screen grid place-items-center p-6 overflow-hidden">
      {/* ...your background stuff... */}

      <div className="relative w-full max-w-md bg-white rounded-3xl border p-8 shadow-sm">
        {/* ...header... */}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold tracking-widest text-slate-400">
              USERNAME
            </label>
            <input
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-4 focus:ring-orange-100"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter User Name"
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-xs font-bold tracking-widest text-slate-400">
              PASSWORD
            </label>
            <input
              type="password"
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-4 focus:ring-orange-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {err ? (
            <div className="text-sm text-red-600 font-semibold py-2">{err}</div>
          ) : null}

          <button
            disabled={disabled}
            className={[
              "w-full rounded-xl bg-orange-500 text-white font-bold py-3 shadow",
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
