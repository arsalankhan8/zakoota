import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Layers, UtensilsCrossed, LogOut } from "lucide-react";

export default function Layout() {
  const navigate = useNavigate();

  const SIDEBAR_WIDTH = "280px";

  const linkBase =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition";
  const inactive = `${linkBase} text-slate-500 hover:bg-slate-100`;
  const active = `${linkBase} bg-orange-500 text-white shadow`;

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className="h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className="fixed inset-y-0 left-0 border-r bg-white p-5 flex flex-col"
        style={{ width: SIDEBAR_WIDTH }}
      >
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
          <NavLink to="" end className={({ isActive }) => (isActive ? active : inactive)}>
            {({ isActive }) => (
              <>
                <LayoutDashboard size={18} className={isActive ? "text-white" : "text-slate-400"} />
                Dashboard
              </>
            )}
          </NavLink>

          <NavLink to="categories" className={({ isActive }) => (isActive ? active : inactive)}>
            {({ isActive }) => (
              <>
                <Layers size={18} className={isActive ? "text-white" : "text-slate-400"} />
                Categories
              </>
            )}
          </NavLink>

          <NavLink to="items" className={({ isActive }) => (isActive ? active : inactive)}>
            {({ isActive }) => (
              <>
                <UtensilsCrossed size={18} className={isActive ? "text-white" : "text-slate-400"} />
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
      </aside>

      {/* Main content */}
      <main
        className="h-full overflow-y-auto p-8"
        style={{ marginLeft: SIDEBAR_WIDTH }}
      >
        <Outlet />
      </main>
    </div>
  );
}
