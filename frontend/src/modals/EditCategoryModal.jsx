import Modal from "./Modal";
import CategoryForm from "../forms/CategoryForm";

export default function EditCategoryModal({
  open,
  onClose,
  initialName = "",
  onSave,
  loading = false,
    initialIcon = null,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="p-10">
        <div className="text-3xl font-black text-slate-900">Edit Category</div>
        <div className="mt-2 text-sm font-semibold text-slate-500">
          Update your category name.
        </div>

        <div className="mt-8">
<CategoryForm
  initialName={initialName}
  initialIcon={initialIcon}
  onCancel={onClose}
  loading={loading}
  onSubmit={async (formData) => {
    await onSave?.(formData);
    onClose?.();
  }}
/>

        </div>
      </div>
    </Modal>
  );
};
