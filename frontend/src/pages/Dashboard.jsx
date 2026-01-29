import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const [c, i] = await Promise.all([api.get("/categories"), api.get("/items")]);
      setCategories(c.data);
      setItems(i.data);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-3xl font-extrabold">System Status</div>

      <div className="rounded-3xl bg-slate-900 text-white p-10 shadow">
        <div className="inline-flex px-3 py-1 rounded-full bg-white/10 text-xs font-bold tracking-widest">
          STORE STATUS: ONLINE
        </div>

        <div className="mt-5 text-5xl font-black leading-tight">
          Manage your <span className="text-orange-400">Zakoota</span>
          <br />
          Menu in real-time.
        </div>

        <div className="mt-4 text-white/70 max-w-xl">
          Your dashboard provides a high-level summary of your menu architecture and item count.
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <StatCard title="Active Categories" value={categories.length} sub="Market sections defined" />
        <StatCard title="Menu Items" value={items.length} sub="Delicious products live" />
      </div>
    </div>
  );
}

function StatCard({ title, value, sub }) {
  return (
    <div className="bg-white rounded-3xl border p-6 shadow-sm">
      <div className="text-xs font-bold tracking-widest text-slate-400">{title}</div>
      <div className="mt-2 text-4xl font-black">{value}</div>
      <div className="mt-1 text-sm text-slate-500 font-semibold">{sub}</div>
    </div>
  );
}
