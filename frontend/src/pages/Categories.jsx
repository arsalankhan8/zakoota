import { useEffect, useMemo, useState } from "react";
import { api } from "../api/api";
import CreateCategoryModal from "../modals/CreateCategoryModal";
import EditCategoryModal from "../modals/EditCategoryModal";
import ConfirmModal from "../modals/ConfirmModal";
import {
  Layers,
  Pencil,
  Trash2,
  Plus,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);

  // page states
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

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
    } catch (e) {
      setErr(getErrorMessage(e));
    } finally {
      setCreating(false);
    }
  }

  function startEdit(id, name) {
    setEditTarget({ id, name });
    setOpenEdit(true);
  }

  async function saveEdit(newName) {
    if (!editTarget?.id) return;
    setEditing(true);
    try {
      await api.put(`/categories/${editTarget.id}`, { name: newName });
      await load();
      setOpenEdit(false);
      setEditTarget(null);
    } catch (e) {
      setErr(getErrorMessage(e));
    } finally {
      setEditing(false);
    }
  }

  function askDelete(id, name) {
    setDeleteTarget({ id, name });
    setConfirmOpen(true);
  }

  async function confirmDelete() {
    if (!deleteTarget?.id) return;

    setDeleting(true);
    try {
      await api.delete(`/categories/${deleteTarget.id}`);
      await load();
      setConfirmOpen(false);
      setDeleteTarget(null);
    } catch (e) {
      setErr(getErrorMessage(e));
    } finally {
      setDeleting(false);
    }
  }

  const isEmpty = !loading && !err && categories.length === 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-6">
        <div>
          <div className="text-xs font-bold tracking-widest text-slate-400">
            MENU MANAGEMENT / <span className="text-orange-500">CATEGORIES</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold mt-2">
            Menu Structure
          </div>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="w-max inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-extrabold text-white shadow hover:opacity-95 disabled:opacity-50"
          disabled={loading}
          title={loading ? "Please wait..." : "Add Category"}
        >
          <Plus size={18} strokeWidth={2.5} />
          Add Category
        </button>
      </div>

      {/* Error banner */}
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

      {/* Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden">
        {!err && (
          <>
            <div className="px-5 sm:px-8 py-6 border-b border-slate-100">
              <div className="text-lg font-extrabold text-slate-900">
                Manage Sections
              </div>
              <div className="mt-1 text-[11px] font-extrabold tracking-[0.22em] text-slate-400 uppercase">
                Group your fried chicken & burgers
              </div>
            </div>

            {/* Header row (desktop only) */}
            <div className="hidden md:grid grid-cols-[100px_1fr_180px_160px] px-8 py-4 text-[11px] font-extrabold tracking-[0.22em] text-slate-400 uppercase">
              <div>Icon</div>
              <div>Category Name</div>
              <div className="text-center">Density</div>
              <div className="text-right">Actions</div>
            </div>
          </>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <div className="px-5 sm:px-8 py-10">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-100 p-4 sm:p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-slate-300" />
                    <div className="flex-1 space-y-3">
                      <div className="h-4 rounded bg-slate-300 w-2/3" />
                      <div className="h-8 rounded-full bg-slate-300 w-28" />
                    </div>

                    <div className="hidden sm:flex gap-3">
                      <div className="h-10 w-10 rounded-xl bg-slate-300" />
                      <div className="h-10 w-10 rounded-xl bg-slate-300" />
                    </div>
                  </div>

                  <div className="mt-4 flex sm:hidden gap-3 justify-end">
                    <div className="h-10 w-10 rounded-xl bg-slate-300" />
                    <div className="h-10 w-10 rounded-xl bg-slate-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Empty state */}
        {isEmpty ? (
          <div className="px-5 sm:px-8 py-16 text-center">
            <div className="mx-auto w-14 h-14 rounded-3xl bg-slate-50 border border-slate-100 grid place-items-center">
              <Layers className="text-slate-400" size={20} />
            </div>
            <div className="mt-4 text-xl font-extrabold text-slate-900">
              No categories yet
            </div>
            <div className="mt-2 text-sm text-slate-500">
              Create your first menu section to start organizing items.
            </div>
            <button
              onClick={() => setOpenCreate(true)}
              className="mt-6 w-full sm:w-max inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-extrabold text-white shadow hover:opacity-95"
            >
              <Plus size={18} strokeWidth={2.5} />
              Add Category
            </button>
          </div>
        ) : null}

        {/* Rows */}
        {!loading && !err
          ? categories.map((c) => (
              <Row
                key={c._id}
                name={c.name}
                density={densityMap[c._id] || 0}
                onEdit={() => startEdit(c._id, c.name)}
                onDelete={() => askDelete(c._id, c.name)}
              />
            ))
          : null}
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
            ? `Delete “${deleteTarget.name}”? ${
                densityMap[deleteTarget.id] || 0
              } items will move to Uncategorized.`
            : "Are you sure you want to delete this category?"
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

/** Reusable actions so we don't duplicate button markup */
function RowActions({ onEdit, onDelete }) {
  const btn =
    "w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 grid place-items-center";

  return (
    <>
      <button onClick={onEdit} className={btn} title="Edit">
        <Pencil size={18} className="text-slate-500" />
      </button>

      <button onClick={onDelete} className={btn} title="Delete">
        <Trash2 size={18} className="text-slate-500" />
      </button>
    </>
  );
}

function Row({ name, density, onEdit, onDelete }) {
  return (
    <>
      {/* Desktop row (md+) */}
      <div className="hidden md:grid grid-cols-[100px_1fr_180px_160px] px-8 py-6 border-t border-slate-100 items-center">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-slate-50 grid place-items-center border border-slate-100">
            <Layers size={18} className="text-slate-400" />
          </div>
        </div>

        <div className="font-extrabold text-slate-900">{name}</div>

        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-extrabold text-slate-600">
            {density} ITEMS
          </span>
        </div>

        <div className="flex justify-end gap-3">
          <RowActions onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>

      {/* Mobile card (< md) */}
      <div className="md:hidden border-t border-slate-100 px-5 py-5">
        <div className="rounded-2xl border border-slate-100 bg-white p-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 grid place-items-center border border-slate-100 shrink-0">
              <Layers size={18} className="text-slate-400" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="font-extrabold text-slate-900 leading-snug break-words">
                {name}
              </div>

              <div className="mt-3">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-xs font-extrabold text-slate-600">
                  {density} ITEMS
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex sm-justify-end gap-3">
            <RowActions onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>
      </div>
    </>
  );
}
