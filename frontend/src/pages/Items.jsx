import { useEffect, useState, useMemo } from "react";
import { api } from "../api/api";
import CreateItemModal from "../modals/CreateItemModal";
import EditItemModal from "../modals/EditItemModal";
import ConfirmModal from "../modals/ConfirmModal";
import { Plus, Pencil, Trash2, ExternalLink, Flame,   Layers,   } from "lucide-react";
import { Filter } from "lucide-react";

export default function Items() {
  const API = import.meta.env.VITE_API_URL;
  const BASE = API?.endsWith("/api") ? API.slice(0, -4) : API;


  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  // page states (same pattern as Categories)
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // create
  const [openCreate, setOpenCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  // edit
  const [openEdit, setOpenEdit] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  // delete confirm
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }

  function getErrorMessage(e) {
    if (e?.response) {
      const status = e.response.status;
      const msg = e.response.data?.message;

      if (status === 401) return msg || "Unauthorized. Please login again.";
      if (status === 403) return msg || "You don’t have permission to view this.";
      if (status === 404) return msg || "Endpoint not found (404).";
      if (status >= 500) return msg || "Server error. Please try again.";
      return msg || `Request failed (${status}).`;
    }

    if (e?.request) {
      return "Backend not responding. Check your API URL, server, or internet connection.";
    }

    return e?.message || "Something went wrong.";
  }



  async function load() {
    setLoading(true);
    setErr("");

    try {
      const [cRes, iRes] = await Promise.all([
        api.get("/categories"),
        api.get("/items"),
      ]);

      const cats = Array.isArray(cRes.data) ? cRes.data : [];
      const its = Array.isArray(iRes.data) ? iRes.data : [];

      setCategories(cats);
      setItems(its);
    } catch (e) {
      setCategories([]);
      setItems([]);
      setErr(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create(payload) {
    setCreating(true);
    setErr("");
    try {
      await api.post("/items", payload);
      await load();
      setOpenCreate(false);
    } catch (e) {
      setErr(getErrorMessage(e));
    } finally {
      setCreating(false);
    }
  }

  function startEdit(item) {
    setEditTarget(item);
    setOpenEdit(true);
  }

  async function saveEdit(payload) {
    if (!editTarget?._id) return;

    setEditing(true);
    setErr("");
    try {
      await api.put(`/items/${editTarget._id}`, payload);
      await load();
      setOpenEdit(false);
      setEditTarget(null);
    } catch (e) {
      setErr(getErrorMessage(e));
    } finally {
      setEditing(false);
    }
  }

  function askDelete(item) {
    setDeleteTarget({ id: item._id, name: item.name });
    setConfirmOpen(true);
  }

  async function confirmDelete() {
    if (!deleteTarget?.id) return;

    setDeleting(true);
    setErr("");
    try {
      await api.delete(`/items/${deleteTarget.id}`);
      await load();
      setConfirmOpen(false);
      setDeleteTarget(null);
    } catch (e) {
      setErr(getErrorMessage(e));
    } finally {
      setDeleting(false);
    }
  }

  const uncategorized = useMemo(() => {
    return items.filter((it) => {
      const catId = it.category?._id || it.category;
      return !catId;
    });
  }, [items]);

  const hasAnyItems = items.length > 0;

  const isEmpty = !loading && !err && !hasAnyItems;

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div className="text-xs font-bold tracking-widest text-slate-400">
            MENU MANAGEMENT / <span className="text-orange-500">ITEMS</span>
          </div>
          <div className="text-4xl font-extrabold mt-2">Menu Offerings</div>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="inline-flex items-center gap-2 w-max rounded-2xl bg-orange-500 text-white font-extrabold px-6 py-4 shadow hover:opacity-95 disabled:opacity-50"
          disabled={loading}
          title={loading ? "Please wait..." : "Add New Item"}
        >
          <Plus size={18} strokeWidth={2.5} />
          Add New Item
        </button>
      </div>

      {/* Error banner (same style as Categories) */}
      {err ? (
        <div className="rounded-3xl border border-red-100 bg-red-50 px-5 sm:px-6 py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-red-100 grid place-items-center shrink-0">
              <AlertTriangle className="text-red-500" size={18} />
            </div>
            <div>
              <div className="font-extrabold text-slate-900">
                Couldn’t load data
              </div>
              <div className="text-sm text-slate-600 mt-1">{err}</div>
            </div>
          </div>

          <button
            onClick={load}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-extrabold text-white hover:opacity-95"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      ) : null}

      {/* Loading skeleton */}
      {loading ? (
        <div className="space-y-5">
          {[...Array(3)].map((_, sectionIdx) => (
            <div key={sectionIdx} className="space-y-4">
              <div className="animate-pulse flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-300" />
                <div className="h-5 w-44 rounded bg-slate-300" />
                <div className="h-6 w-20 rounded-full bg-slate-300" />
              </div>

              <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(4)].map((__, cardIdx) => (
                  <div
                    key={cardIdx}
                    className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm"
                  >
                    <div className="h-[180px] sm:h-[220px] lg:h-[260px] xl:h-[300px] bg-slate-300" />
                    <div className="p-4 sm:p-6 space-y-3">
                      <div className="h-5 w-32 rounded bg-slate-300" />
                      <div className="h-4 w-2/3 rounded bg-slate-300" />
                      <div className="h-4 w-1/2 rounded bg-slate-300" />
                      <div className="h-10 w-full rounded-2xl bg-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* Empty state */}
      {isEmpty ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm px-5 sm:px-8 py-16 text-center">
          <div className="mx-auto w-14 h-14 rounded-3xl bg-slate-50 border border-slate-100 grid place-items-center">
            <Layers className="text-slate-400" size={20} />
          </div>
          <div className="mt-4 text-xl font-extrabold text-slate-900">
            No items yet
          </div>
          <div className="mt-2 text-sm text-slate-500">
            Add your first item to start building your menu.
          </div>
          <button
            onClick={() => setOpenCreate(true)}
            className="mt-6 w-full sm:w-max inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 text-sm font-extrabold text-white shadow hover:opacity-95"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add New Item
          </button>
        </div>
      ) : null}

      {/* Content */}
      {!loading && !err ? (
        <div className="space-y-10">
          {categories.map((cat) => {
            const catItems = items.filter((it) => {
              const catId = it.category?._id || it.category;
              return String(catId) === String(cat._id);
            });

            if (catItems.length === 0) return null;

            return (
              <section key={cat._id} className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white grid place-items-center">
                    <Filter size={18} className="text-white" />
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-xl font-extrabold text-slate-900">
                      {cat.name}
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-extrabold tracking-widest text-slate-500">
                      {catItems.length} ITEMS
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {catItems.map((it) => (
                    <Card
                      key={it._id}
                      it={it}
                      base={BASE}
                      onEdit={() => startEdit(it)}
                      onDelete={() => askDelete(it)}
                    />

                  ))}
                </div>
              </section>
            );
          })}

          {uncategorized.length > 0 && (
            <section className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white grid place-items-center">
                  <Filter size={18} className="text-white" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xl font-extrabold text-slate-900">
                    Uncategorized
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-extrabold tracking-widest text-slate-500">
                    {uncategorized.length} ITEMS
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {uncategorized.map((it) => (
                  <Card
                    key={it._id}
                    it={it}
                    base={BASE}
                    onEdit={() => startEdit(it)}
                    onDelete={() => askDelete(it)}
                  />
                ))}

              </div>
            </section>
          )}
        </div>
      ) : null}

      {/* Create */}
      <CreateItemModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        categories={categories}
        onCreate={create}
        loading={creating}
      />

      {/* Edit */}
      <EditItemModal
        open={openEdit}
        onClose={() => {
          if (editing) return;
          setOpenEdit(false);
          setEditTarget(null);
        }}
        categories={categories}
        initialValues={
          editTarget
            ? {
              name: editTarget.name || "",
              category: editTarget.category?._id || editTarget.category || "",
              description: editTarget.description || "",
              prices: editTarget.prices
                ? {
                  small: Number(editTarget.prices.small || 0),
                  medium: Number(editTarget.prices.medium || 0),
                  large: Number(editTarget.prices.large || 0),
                }
                : {
                  // legacy fallback
                  small: Number(editTarget.price || 0),
                  medium: 0,
                  large: 0,
                },
              externalUrl: editTarget.externalUrl || "",
              isLive: !!editTarget.isLive,
              isBestSeller: !!editTarget.isBestSeller,
              imageUrl: editTarget.imageUrl || "",
            }
            : {}
        }

        onSave={saveEdit}
        loading={editing}
      />

      {/* Confirm delete */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => {
          if (deleting) return;
          setConfirmOpen(false);
          setDeleteTarget(null);
        }}
        title="Delete Item?"
        message={
          deleteTarget?.name
            ? `Are you sure you want to delete “${deleteTarget.name}”? This can’t be undone.`
            : "Are you sure you want to delete this item? This can’t be undone."
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        loading={deleting}
        tone="danger"
      />
    </div>
  );
}

function safeHost(url) {
  if (!url) return null;

  try {
    // if user forgot https:// add it
    const fixed = url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;

    const u = new URL(fixed);
    return u.hostname.replace("www.", "").toUpperCase();
  } catch {
    return "OPEN LINK";
  }
}

function safeHref(url) {
  if (!url) return null;
  // same “auto-fix” for missing protocol
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
}


function Card({ it, onEdit, onDelete, base = "" }) {
  const img = it.imageUrl;
  const joinUrl = (a, b) => `${String(a).replace(/\/$/, "")}/${String(b).replace(/^\//, "")}`;
  // ✅ build correct image src
  const imgSrc = img
    ? img.startsWith("http")
      ? img
      : joinUrl(base, img)
    : null;


  // ✅ normalize prices (support new + old schema)
  const p = it.prices || {};
  const priceList = [
    { key: "small", label: "SMALL", value: Number(p.small) },
    { key: "medium", label: "MEDIUM", value: Number(p.medium) },
    { key: "large", label: "LARGE", value: Number(p.large) },
  ].filter((x) => Number.isFinite(x.value) && x.value > 0);

  // fallback old single price
  const fallbackPrice =
    !priceList.length && Number(it.price) > 0
      ? [{ key: "single", label: "PRICE", value: Number(it.price) }]
      : [];

  const finalPrices = priceList.length ? priceList : fallbackPrice;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm flex flex-col h-full">
      {/* image */}
      <div className="h-[180px] sm:h-[220px] lg:h-[260px] xl:h-[300px] bg-slate-50 border-b border-slate-100 overflow-hidden">
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={it.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-sm font-extrabold text-slate-300">
            No Image
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3">
          {/* LIVE pill */}
          {it.isLive ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-[11px] font-extrabold tracking-widest text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              LIVE
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-extrabold tracking-widest text-slate-500">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              OFF
            </span>
          )}

          {/* BEST SELLER */}
          {it.isBestSeller ? (
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-widest text-orange-600">
              <Flame size={14} className="text-orange-500" />
              BEST SELLER
            </span>
          ) : null}
        </div>

        <div className="mt-4 text-base sm:text-lg font-extrabold text-slate-900">
          {it.name}
        </div>

        <div className="mt-1 text-sm text-slate-500 font-semibold line-clamp-2">
          {it.description || "—"}
        </div>

        {it.externalUrl ? (
          <a
            href={safeHref(it.externalUrl)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold tracking-widest text-slate-400 hover:text-slate-600"
          >
            <ExternalLink size={14} />
            {safeHost(it.externalUrl)}
          </a>
        ) : (
          <div className="mt-4 text-xs font-extrabold tracking-widest text-slate-300">
            —
          </div>
        )}

        {/* ✅ PRICES */}
        <div className="mt-5 flex flex-wrap gap-2">
          {finalPrices.length ? (
            finalPrices.map((x) => (
              <span
                key={x.key}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-extrabold tracking-widest text-slate-700"
              >
                {x.label}
                <span className="text-slate-900">AUD {x.value.toFixed(2)}</span>
              </span>
            ))
          ) : (
            <span className="text-xs font-extrabold tracking-widest text-slate-300">
              NO PRICES
            </span>
          )}
        </div>

        <div className="mt-6 flex items-center justify-end pt-2 mt-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={onEdit}
              className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 grid place-items-center"
              title="Edit"
            >
              <Pencil size={18} className="text-slate-500" />
            </button>

            <button
              onClick={onDelete}
              className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 grid place-items-center"
              title="Delete"
            >
              <Trash2 size={18} className="text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
