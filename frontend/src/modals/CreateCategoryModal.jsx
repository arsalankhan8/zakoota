import Modal from "./Modal";
import CategoryForm from "../forms/categoryForm";

export default function CreateCategoryModal({ open, onClose, onCreate, loading }) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-10">
        <div className="text-3xl font-black text-slate-900">Create Category</div>
        <div className="mt-2 text-sm font-semibold text-slate-500">
          Organize your menu for better management.
        </div>

        <div className="mt-8">
          <CategoryForm
            onCancel={onClose}
            loading={loading}
            onSubmit={async ({ name }) => {
              await onCreate?.(name);
              onClose?.();
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
