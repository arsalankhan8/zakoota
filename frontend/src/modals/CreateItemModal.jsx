import Modal from "./Modal";
import ItemForm from "../forms/ItemForm";
import { X } from "lucide-react";

export default function CreateItemModal({ open, onClose, categories, onCreate, loading }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <div className="text-3xl font-black text-slate-900">Create Product</div>
            <div className="mt-2 text-sm font-semibold text-slate-500">
              Configure your menu item details and appearance.
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 grid place-items-center"
            title="Close"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <div className="mt-8">
          <ItemForm
            categories={categories}
            onCancel={onClose}
            loading={loading}
            submitText="Create Item"
            onSubmit={async (payload) => {
              await onCreate?.(payload);
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
