import Modal from "./Modal";
import { AlertTriangle } from "lucide-react";

export default function ConfirmModal({
  open,
  onClose,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  loading = false,
  tone = "danger", // "danger" | "default"
}) {
  const confirmBtn =
    tone === "danger"
      ? "bg-orange-500 text-white shadow-[0_12px_30px_-14px_rgba(249,115,22,0.6)]"
      : "bg-slate-900 text-white";

  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 grid place-items-center border border-orange-100">
            <AlertTriangle className="text-orange-500" size={20} />
          </div>

          <div className="flex-1">
            <div className="text-2xl font-black text-slate-900">{title}</div>
            <div className="mt-2 text-sm font-semibold text-slate-500">
              {message}
            </div>
          </div>
        </div>

        {/* ✅ SAME BUTTON GROUP PATTERN */}
        <div className="mt-8 flex flex-col items-center gap-4 min-[470px]:flex-row sm:items-start">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="w-full min-[470px]:w-auto min-w-[170px] rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-extrabold text-slate-600 hover:bg-slate-50 disabled:opacity-60"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`w-full min-[470px]:w-auto min-w-[170px] rounded-2xl px-6 py-4 text-sm font-extrabold hover:opacity-95 disabled:opacity-60 ${confirmBtn}`}
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
