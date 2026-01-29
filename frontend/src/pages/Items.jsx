import { useEffect, useState } from "react";
import { api } from "../api/api";
import CreateItemModal from "../modals/CreateItemModal";
import EditItemModal from "../modals/EditItemModal";
import ConfirmModal from "../modals/ConfirmModal";
import { Plus, Pencil, Trash2, ExternalLink, Flame } from "lucide-react";
import { Filter } from "lucide-react";


export default function Items() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  // create
  const [openCreate, setOpenCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  // edit
  const [openEdit, setOpenEdit] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // item object

  // delete confirm
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }

  async function load() {
    const [c, i] = await Promise.all([api.get("/categories"), api.get("/items")]);
    setCategories(c.data);
    setItems(i.data);
  }

  useEffect(() => {
    load();
  }, []);

  async function create(payload) {
    setCreating(true);
    try {
      await api.post("/items", payload);
      await load();
      setOpenCreate(false);
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
    try {
      await api.put(`/items/${editTarget._id}`, payload);
      await load();
      setOpenEdit(false);
      setEditTarget(null);
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
    try {
      await api.delete(`/items/${deleteTarget.id}`);
      await load();
      setConfirmOpen(false);
      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold tracking-widest text-slate-400">
            MENU MANAGEMENT / <span className="text-orange-500">ITEMS</span>
          </div>
          <div className="text-4xl font-extrabold mt-2">Menu Offerings</div>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 text-white font-extrabold px-6 py-4 shadow hover:opacity-95"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add New Item
        </button>
      </div>

      {/* Grid */}
      <div className="space-y-10">
        {categories.map((cat) => {
          const catItems = items.filter((it) => {
            const catId = it.category?._id || it.category;
            return String(catId) === String(cat._id);
          });

          if (catItems.length === 0) return null;

          return (
            <section key={cat._id} className="space-y-5">
              {/* Category header like your screenshot */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white grid place-items-center">
                  {/* simple icon inside */}
                  <Filter size={18} className="text-white" />

                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xl font-extrabold text-slate-900">{cat.name}</div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-extrabold tracking-widest text-slate-500">
                    {catItems.length} ITEMS
                  </span>
                </div>
              </div>

              {/* Items grid under this category */}
              <div className="grid grid-cols-3 gap-6">
                {catItems.map((it) => (
                  <Card
                    key={it._id}
                    it={it}
                    onEdit={() => startEdit(it)}
                    onDelete={() => askDelete(it)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>


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
              price: editTarget.price || 0,
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


function Card({ it, onEdit, onDelete }) {
  const img = it.imageUrl;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      {/* image */}
      <div className="h-[300px] bg-slate-50 border-b border-slate-100 overflow-hidden">
        {img ? (
          <img src={img} alt={it.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full grid place-items-center text-sm font-extrabold text-slate-300">
            No Image
          </div>
        )}
      </div>

      <div className="p-6">
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

          {/* BEST SELLER text (no pill) */}
          {it.isBestSeller ? (
            <span className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-widest text-orange-600">
              <Flame size={14} className="text-orange-500" />
              BEST SELLER
            </span>
          ) : null}
        </div>


        <div className="mt-4 text-lg font-extrabold text-slate-900">{it.name}</div>
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
          <div className="mt-4 text-xs font-extrabold tracking-widest text-slate-300">—</div>
        )}


        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm font-black text-slate-900">
            AUD {Number(it.price || 0).toFixed(2)}
          </div>

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
