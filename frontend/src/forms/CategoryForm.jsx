import { useEffect, useState } from "react";

export default function CategoryForm({
  initialName = "",
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");

  useEffect(() => setName(initialName), [initialName]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    await onSubmit?.({ name: name.trim() });
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div>
        <div className="text-[11px] font-extrabold tracking-[0.22em] text-slate-400">
          CATEGORY NAME
        </div>

        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Extra Spicy Deals"
          className={`mt-2 w-full rounded-2xl border px-5 py-4 text-sm font-semibold outline-none transition
            focus:ring-4 focus:ring-orange-100
            ${error ? "border-orange-500 ring-orange-100" : "border-slate-200"}
          `}
        />

        {error ? (
          <div className="mt-2 text-sm font-semibold text-orange-600">
            {error}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col items-center  gap-4 min-[470px]:flex-row min-[470px]:px-0 sm:items-start">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="w-full min-[470px]:w-auto min-w-[170px] rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-extrabold text-slate-600 hover:bg-slate-50 disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full min-[470px]:w-auto min-w-[170px] rounded-2xl bg-orange-500 px-6 py-4 text-sm font-extrabold text-white shadow-[0_12px_30px_-14px_rgba(249,115,22,0.6)] hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </form>
  );
}
