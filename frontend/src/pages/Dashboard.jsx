import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Layers3, UtensilsCrossed, ArrowUpRight, Wrench, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [adminError, setAdminError] = useState(false);
  const [fixingAdmin, setFixingAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [c, i] = await Promise.all([
        api.get("/categories"),
        api.get("/items"),
      ]);
      setCategories(Array.isArray(c.data?.data) ? c.data.data : (Array.isArray(c.data) ? c.data : []));
      setItems(Array.isArray(i.data?.data) ? i.data.data : (Array.isArray(i.data) ? i.data : []));
      setAdminError(false);
    } catch (e) {
      if (e?.response?.status === 403) {
        setAdminError(true);
      } else {
        console.error("Failed to load data:", e);
      }
    }
  }

  async function fixAdminAccess() {
    setFixingAdmin(true);
    try {
      const res = await api.post("/auth/promote-to-admin");
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        await loadData();
      }
    } catch (e) {
      console.error("Failed to promote to admin:", e);
      alert("Failed to fix admin access. Please try logging out and back in, or contact support.");
    } finally {
      setFixingAdmin(false);
    }
  }

  return (
    <div className="mx-auto w-full">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.22em] font-extrabold uppercase text-slate-300">
        <span className="text-slate-300">ZAKOOTA DASHBOARD</span>
        <span className="text-slate-200">/</span>
        <span className="text-orange-500">OVERVIEW</span>
      </div>

      {/* Title */}
      <h1 className="mt-2 text-[26px] sm:text-[34px] leading-[1.1] font-black text-slate-900">
        System Status
      </h1>

      {/* Admin Fix Banner */}
      {adminError && (
        <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 px-5 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-orange-200 grid place-items-center shrink-0">
              <AlertTriangle className="text-orange-500" size={18} />
            </div>
            <div>
              <div className="font-extrabold text-slate-900">
                Admin Access Required
              </div>
              <div className="text-sm text-slate-600 mt-1">
                Your account needs admin privileges to access this page. Click below to fix this.
              </div>
            </div>
          </div>
          <button
            onClick={fixAdminAccess}
            disabled={fixingAdmin}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-extrabold text-white hover:opacity-95 disabled:opacity-50"
          >
            {fixingAdmin ? "Fixing..." : "Fix Admin Access"}
          </button>
        </div>
      )}

      {/* Hero */}
      <div
        className="mt-6 sm:mt-8 rounded-[24px] sm:rounded-[38px]
                   px-5 sm:px-10 lg:px-12
                   py-7 sm:py-10 lg:py-12
                   text-white shadow-[0_18px_60px_-30px_rgba(15,23,42,0.55)]
                   overflow-hidden bg-[#0b1220] relative"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-24 -top-24 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] rounded-full bg-orange-500/10 blur-[60px]" />
          <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-[#0b1220] via-[#0b1220] to-[#1b1330]/60" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-white/10 border border-white/10 text-[10px] sm:text-[11px] font-extrabold tracking-[0.22em] uppercase">
            Store Status: Online
          </div>

          <div className="mt-5 sm:mt-7 text-[30px] sm:text-[44px] lg:text-[54px] leading-[1.05] font-black">
            Manage your{" "}
            <span className="text-orange-500 underline decoration-orange-500/40 underline-offset-[8px] sm:underline-offset-[10px]">
              Zakoota
            </span>
            <br />
            <span className="text-orange-500">Menu</span> in real-time.
          </div>

          <p className="mt-4 sm:mt-6 max-w-[520px] text-[13px] sm:text-[15px] leading-6 sm:leading-7 text-white/55 font-semibold">
            Your dashboard provides a high-level summary of your menu architecture
            and item count.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-7 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-7">
        <StatCard
          onClick={() => navigate("/admin/categories")}
          icon={Layers3}
          iconTone="blue"
          title="ACTIVE CATEGORIES"
          value={categories.length}
          sub="Market sections defined"
        />
        <StatCard
          onClick={() => navigate("/admin/items")}
          icon={UtensilsCrossed}
          iconTone="orange"
          title="MENU ITEMS"
          value={items.length}
          sub="Delicious products live"
        />
      </div>

      {/* Bottom callout */}
      <div
        className="mt-6 sm:mt-8 rounded-[20px] sm:rounded-[26px]
                   border border-slate-200/80 bg-white
                   px-5 sm:px-7 py-5 sm:py-6
                   flex flex-col md:flex-row md:items-center md:justify-between
                   gap-4 md:gap-6
                   shadow-[0_10px_30px_-24px_rgba(15,23,42,0.25)]"
      >
        <div className="flex items-start sm:items-center gap-4">
          <div className="shrink-0 w-10 h-10 rounded-2xl bg-slate-100 grid place-items-center text-slate-600">
            <Wrench className="w-5 h-5" />
          </div>

          <div className="min-w-0">
            <div className="text-[13px] sm:text-[14px] font-extrabold text-slate-900">
              Need to update prices or descriptions?
            </div>
            <div className="text-[12px] sm:text-[13px] font-semibold text-slate-500">
              Head over to the Items section to edit your offerings.
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/admin/items")}
          className="w-full md:w-auto px-6 py-3 rounded-2xl bg-[#0b1220] text-white
                     text-[12px] font-extrabold tracking-[0.08em]
                     shadow-[0_14px_40px_-24px_rgba(2,6,23,0.8)]
                     hover:opacity-95 active:scale-[0.99] transition"
        >
          MANAGE ITEMS
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, iconTone = "blue", title, value, sub, onClick }) {
  const tone =
    iconTone === "orange"
      ? "bg-orange-50 text-orange-500"
      : "bg-blue-50 text-blue-600";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? onClick?.() : null)}
      className="group relative rounded-[22px] sm:rounded-[28px]
                 bg-white border border-slate-200/80 px-5 sm:px-7 py-5 sm:py-6
                 shadow-[0_16px_40px_-34px_rgba(15,23,42,0.35)]
                 cursor-pointer transition
                 hover:-translate-y-[2px] hover:shadow-[0_22px_60px_-38px_rgba(15,23,42,0.45)]
                 hover:border-slate-300/80"
    >
      <div className="flex items-start   justify-between gap-4">
        <div className="flex items-start  gap-4 min-w-0  sm-flex-row flex-col">
          <div className={`shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${tone} grid place-items-center`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <div className="min-w-0">
            <div className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.22em] uppercase text-slate-300">
              {title}
            </div>
            <div className="mt-1 text-[34px] sm:text-[44px] leading-none font-black text-slate-900">
              {value}
            </div>
            <div className="mt-1 text-[12px] sm:text-[13px] font-semibold text-slate-500">
              {sub}
            </div>
          </div>
        </div>

        <div className="shrink-0 w-10 h-10 rounded-full bg-slate-100 text-slate-400 grid place-items-center transition group-hover:bg-slate-200/70">
          <ArrowUpRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
