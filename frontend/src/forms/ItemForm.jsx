import { useEffect, useState } from "react";
import { ImageUp } from "lucide-react";

export default function ItemForm({
  categories = [],
  initialValues,
  onSubmit,
  onCancel,
  loading = false,
  submitText = "Create Item",
}) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    price: 0,
    externalUrl: "",
    isLive: true,
    isBestSeller: false,
    imageUrl: "",
    ...initialValues,
  });

  useEffect(() => {
    setForm((p) => ({ ...p, ...initialValues }));
  }, [initialValues]);

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;

    const payload = {
      ...form,
      category: form.category ? form.category : null,
    };

    await onSubmit?.(payload);
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {/* Main grid: 1 col on mobile, 2 cols on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* LEFT */}
        <div className="space-y-5">
          <Field label="ITEM NAME">
            <input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Zakoota Spicy Thighs"
              className="w-full rounded-2xl border border-slate-200 px-4 sm:px-5 py-3.5 sm:py-4 text-sm font-semibold outline-none focus:ring-4 focus:ring-orange-100"
            />
          </Field>

          <Field label="CATEGORY">
            <select
              value={form.category || ""}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="w-full rounded-2xl border border-slate-200 px-4 sm:px-5 py-3.5 sm:py-4 text-sm font-semibold outline-none focus:ring-4 focus:ring-orange-100"
            >
              <option value="">Uncategorized</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="DESCRIPTION">
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Describe the flavors..."
              rows={4}
              className="w-full rounded-2xl border border-slate-200 px-4 sm:px-5 py-3.5 sm:py-4 text-sm font-semibold outline-none focus:ring-4 focus:ring-orange-100 resize-none"
            />
          </Field>

          <Field label="PRICE (AUD)">
            <input
              type="number"
              inputMode="decimal"
              value={form.price}
              onChange={(e) =>
                setForm((p) => ({ ...p, price: Number(e.target.value || 0) }))
              }
              placeholder="e.g. 12.99"
              className="w-full rounded-2xl border border-slate-200 px-4 sm:px-5 py-3.5 sm:py-4 text-sm font-semibold outline-none focus:ring-4 focus:ring-orange-100"
            />
          </Field>
        </div>

        {/* RIGHT */}
        <div className="space-y-5">
          <Field label="PRODUCT IMAGE">
            <div className="grid gap-3">
              <label className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-5 sm:p-8 grid place-items-center text-center cursor-pointer hover:bg-slate-50">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 grid place-items-center">
                  <ImageUp className="text-slate-500" size={20} />
                </div>
                <div className="mt-3 text-[11px] sm:text-xs font-extrabold tracking-[0.22em] text-slate-400">
                  CLICK TO UPLOAD
                </div>
                <div className="mt-1 text-xs font-semibold text-slate-400">
                  (we’ll connect real upload next)
                </div>
                <input type="file" className="hidden" />
              </label>

              <input
                value={form.imageUrl || ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, imageUrl: e.target.value }))
                }
                placeholder="Or paste image URL..."
                className="w-full rounded-2xl border border-slate-200 px-4 sm:px-5 py-3.5 sm:py-4 text-sm font-semibold outline-none focus:ring-4 focus:ring-orange-100"
              />
            </div>
          </Field>

          <ToggleCard
            title="Menu Availability"
            desc="Toggle if this item is currently in stock."
            checked={!!form.isLive}
            onChange={(v) => setForm((p) => ({ ...p, isLive: v }))}
          />

          <ToggleCard
            title="Best Seller"
            desc="Highlight this item on your website."
            checked={!!form.isBestSeller}
            onChange={(v) => setForm((p) => ({ ...p, isBestSeller: v }))}
            tone="warm"
          />
        </div>
      </div>

      <Field label="EXTERNAL REDIRECT URL (UBEREATS, FOODPANDA, ETC.)">
        <input
          value={form.externalUrl}
          onChange={(e) =>
            setForm((p) => ({ ...p, externalUrl: e.target.value }))
          }
          placeholder="https://foodpanda.com/zakoota/item/123"
          className="w-full rounded-2xl border border-slate-200 px-4 sm:px-5 py-3.5 sm:py-4 text-sm font-semibold outline-none focus:ring-4 focus:ring-orange-100"
        />
      </Field>

      <div className="pt-2 flex flex-col min-[470px]:flex-row  gap-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="w-full min-[470px]:w-auto min-[470px]:min-w-[170px] rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-extrabold text-slate-600 hover:bg-slate-50 disabled:opacity-60"
        >
          Discard Changes
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full min-[470px]:w-auto min-[470px]:min-w-[170px] rounded-2xl bg-orange-500 px-6 py-4 text-sm font-extrabold text-white shadow-[0_12px_30px_-14px_rgba(249,115,22,0.6)] hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Saving..." : submitText}
        </button>
      </div>
    </form>
  );
}



function Field({ label, children }) {
  return (
    <div>
      <div className="text-[11px] font-extrabold tracking-[0.22em] text-slate-400">
        {label}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}


function ToggleCard({ title, desc, checked, onChange, tone = "default" }) {
  const bg =
    tone === "warm"
      ? "bg-orange-50/50 border-orange-100"
      : "bg-slate-50/50 border-slate-200";

  return (
    <div className={`rounded-2xl border ${bg} p-4 flex items-center gap-4`}>
      {/* Text */}
      <div className="min-w-0 flex-1">
        <div className="text-sm font-extrabold text-slate-900 break-words">
          {title}
        </div>
        <div className="text-xs font-semibold text-slate-500 mt-1 break-words">
          {desc}
        </div>
      </div>

      {/* Toggle */}
      <button
        type="button"
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
        className={`shrink-0 w-12 h-7 rounded-full p-1 transition ${checked ? "bg-emerald-500" : "bg-slate-300"
          }`}
      >
        <span
          className={`block w-5 h-5 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0"
            }`}
        />
      </button>
    </div>
  );
}