import { useEffect, useMemo, useState } from "react";
import { api } from "../api/api";
import CreateCategoryModal from "../modals/CreateCategoryModal";
import EditCategoryModal from "../modals/EditCategoryModal";
import ConfirmModal from "../modals/ConfirmModal";
import { Layers, Pencil, Trash2, Plus } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  // create
  const [openCreate, setOpenCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  // edit
  const [openEdit, setOpenEdit] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // { id, name }

  // delete confirm
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, name }

  async function load() {
    const [cRes, iRes] = await Promise.all([api.get("/categories"), api.get("/items")]);
    setCategories(cRes.data);
    setItems(iRes.data);
  }

  useEffect(() => {
    load();
  }, []);

  const densityMap = useMemo(() => {
    const map = {};
    for (const it of items) {
      const catId = it.category?._id || it.category;
      if (!catId) continue;
      map[catId] = (map[catId] || 0) + 1;
    }
    return map;
  }, [items]);

  async function createCategory(name) {
    setCreating(true);
    try {
      await api.post("/categories", { name });
      await load();
      setOpenCreate(false);
    } finally {
      setCreating(false);
    }
  }

  // ✅ open edit
  function startEdit(id, name) {
    setEditTarget({ id, name });
    setOpenEdit(true);
  }

  // ✅ save edit
  async function saveEdit(newName) {
    if (!editTarget?.id) return;

    setEditing(true);
    try {
      await api.put(`/categories/${editTarget.id}`, { name: newName });
      await load();
      setOpenEdit(false);
      setEditTarget(null);
    } finally {
      setEditing(false);
    }
  }

  // ✅ open delete confirm
  function askDelete(id, name) {
    setDeleteTarget({ id, name });
    setConfirmOpen(true);
  }

  // ✅ confirm delete
  async function confirmDelete() {
    if (!deleteTarget?.id) return;

    setDeleting(true);
    try {
      await api.delete(`/categories/${deleteTarget.id}`);
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
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-xs font-bold tracking-widest text-slate-400">
            MENU MANAGEMENT / <span className="text-orange-500">CATEGORIES</span>
          </div>
          <div className="text-4xl font-extrabold mt-2">Menu Structure</div>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-extrabold text-white shadow hover:opacity-95"
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Category
        </button>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100">
          <div className="text-lg font-extrabold text-slate-900">Manage Sections</div>
          <div className="mt-1 text-[11px] font-extrabold tracking-[0.22em] text-slate-400 uppercase">
            Group your fried chicken & burgers
          </div>
        </div>

        <div className="grid grid-cols-[100px_1fr_180px_160px] px-8 py-4 text-[11px] font-extrabold tracking-[0.22em] text-slate-400 uppercase">
          <div>Icon</div>
          <div>Category Name</div>
          <div className="text-center">Density</div>
          <div className="text-right">Actions</div>
        </div>

        {categories.map((c) => (
          <Row
            key={c._id}
            name={c.name}
            density={densityMap[c._id] || 0}
            onEdit={() => startEdit(c._id, c.name)}
            onDelete={() => askDelete(c._id, c.name)}
          />
        ))}
      </div>

      {/* Create Modal */}
      <CreateCategoryModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onCreate={createCategory}
        loading={creating}
      />

      {/* Edit Modal */}
      <EditCategoryModal
        open={openEdit}
        onClose={() => {
          if (editing) return;
          setOpenEdit(false);
          setEditTarget(null);
        }}
        initialName={editTarget?.name || ""}
        onSave={saveEdit}
        loading={editing}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => {
          if (deleting) return;
          setConfirmOpen(false);
          setDeleteTarget(null);
        }}
        title="Delete Category?"
        message={
          deleteTarget?.name
            ? `Are you sure you want to delete “${deleteTarget.name}”? This can’t be undone.`
            : "Are you sure you want to delete this category? This can’t be undone."
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

function Row({ name, density, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-[100px_1fr_180px_160px] px-8 py-6 border-t border-slate-100 items-center">
      {/* icon */}
      <div>
        <div className="w-12 h-12 rounded-2xl bg-slate-50 grid place-items-center border border-slate-100">
          <Layers size={18} className="text-slate-400" />
        </div>
      </div>

      {/* name */}
      <div className="font-extrabold text-slate-900">{name}</div>

      {/* density */}
      <div className="text-center">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-extrabold text-slate-600">
          {density} ITEMS
        </span>
      </div>

      {/* actions */}
      <div className="flex justify-end gap-3">
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
  );
}
