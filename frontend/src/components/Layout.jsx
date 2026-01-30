import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Layers,
  UtensilsCrossed,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Layout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const SIDEBAR_WIDTH = 280;

  const linkBase =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition";
  const inactive = `${linkBase} text-slate-500 hover:bg-slate-100`;
  const active = `${linkBase} bg-orange-500 text-white shadow`;

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  // close drawer on route change (when user taps a nav item)
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const SidebarContent = () => (
    <div className="h-[90%] lg:h-full p-5 flex w-full flex-col">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-orange-500 text-white grid place-items-center font-black">
          Z
        </div>
        <div>
          <div className="font-extrabold leading-5">ZAKOOTA</div>
          <div className="text-xs text-slate-400 font-semibold">
            ADMIN CENTRAL
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="text-xs font-bold tracking-widest text-slate-400 mb-3">
        MANAGEMENT
      </div>

      <nav className="space-y-2 flex-1">
        <NavLink
          to=""
          end
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          {({ isActive }) => (
            <>
              <LayoutDashboard
                size={18}
                className={isActive ? "text-white" : "text-slate-400"}
              />
              Dashboard
            </>
          )}
        </NavLink>

        <NavLink
          to="categories"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          {({ isActive }) => (
            <>
              <Layers
                size={18}
                className={isActive ? "text-white" : "text-slate-400"}
              />
              Categories
            </>
          )}
        </NavLink>

        <NavLink
          to="items"
          className={({ isActive }) => (isActive ? active : inactive)}
        >
          {({ isActive }) => (
            <>
              <UtensilsCrossed
                size={18}
                className={isActive ? "text-white" : "text-slate-400"}
              />
              Items
            </>
          )}
        </NavLink>
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-6 w-full rounded-xl border px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 inline-flex items-center gap-3 justify-center"
      >
        <LogOut size={18} className="text-slate-400" />
        Logout
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* MOBILE TOP BAR */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="h-14 px-4 flex items-center justify-between">
          <button
            onClick={() => setOpen(true)}
            className="py-2 rounded-xl hover:bg-slate-100"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500 text-white grid place-items-center font-black">
              Z
            </div>
            <div className="text-sm font-extrabold">ZAKOOTA</div>
          </div>

          <button
            onClick={logout}
            className="py-2 rounded-xl hover:bg-slate-100"
            aria-label="Logout"
          >
            <LogOut size={20} className="text-slate-500" />
          </button>
        </div>
      </header>

      {/* DESKTOP SIDEBAR */}
      <aside
        className="hidden lg:flex fixed inset-y-0 left-0 border-r bg-white"
        style={{ width: SIDEBAR_WIDTH }}
      >
        <SidebarContent />
      </aside>

      {/* MOBILE DRAWER + BACKDROP */}
      <div className={`lg:hidden ${open ? "block" : "hidden"}`}>
        {/* Backdrop */}
        <button
          className="fixed inset-0 bg-black/40 z-50"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        />

        {/* Drawer */}
        <aside className="fixed inset-y-0 left-0 z-50 w-[280px] bg-white border-r shadow-xl">
          <div className="h-14 px-4 border-b flex items-center justify-between">
            <div className="text-sm font-extrabold">Menu</div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 rounded-xl hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
          <SidebarContent />
        </aside>
      </div>

      {/* MAIN CONTENT */}
      <main className="p-4 lg:p-8 lg:ml-[280px]">
        <Outlet />
      </main>
    </div>
  );
}
