import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    try {
      const res = await api.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (e2) {
      setErr(e2?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="relative min-h-screen grid place-items-center p-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-white to-slate-50" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft glow accents */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-orange-200/30 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-slate-200/40 blur-3xl" />

      {/* Login card (unchanged) */}
      <div className="relative w-full max-w-md bg-white rounded-3xl border p-8 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-500 text-white grid place-items-center font-black">
            
          </div>
          <div className="mt-3 text-2xl font-extrabold">ZAKOOTA</div>
          <div className="text-xs tracking-widest text-slate-400 font-bold">
            MANAGEMENT PORTAL
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold tracking-widest text-slate-400">
              USERNAME
            </label>
            <input
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-4 focus:ring-orange-100"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter User Name"
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
            />
          </div>

          {err ? (
            <div className="text-sm text-red-600 font-semibold">{err}</div>
          ) : null}

          <button className="w-full rounded-xl bg-orange-500 text-white font-bold py-3 shadow hover:opacity-95">
            UNLOCK DASHBOARD
          </button>
        </form>
      </div>
    </div>
  );
}
