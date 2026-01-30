import { useEffect } from "react";

export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 ">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm -mt-6"
        onClick={onClose}
      />

      {/* dialog wrapper */}
      <div className="absolute inset-0 flex items-center justify-center px-5 py-6">
        {/* dialog */}
        <div
          className="w-full max-w-[700px] rounded-[28px] bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.35)] max-h-[calc(100vh-48px)] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}