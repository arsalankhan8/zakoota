import Modal from "./Modal";
import CategoryForm from "../forms/CategoryForm";
export default function CreateCategoryModal({
  open,
  onClose,
  onCreate,
  loading,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-10">
        <div className="text-3xl font-black text-slate-900">
          Create Category
        </div>
        <div className="mt-2 text-sm font-semibold text-slate-500">
          Organize your menu for better management.
        </div>

        <div className="mt-8">
          <CategoryForm
            onCancel={onClose}
            loading={loading}
            onSubmit={async (formData) => {
              // ✅ Receive FormData
              await onCreate?.(formData); // ✅ Send FormData to API
              onClose?.();
            }}
          />
        </div>
      </div>
    </Modal>
  );
}
