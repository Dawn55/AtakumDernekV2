"use client";

import { useState, useTransition } from "react";

export default function DeleteButton({ 
  itemId, 
  itemTitle, 
  deleteAction
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!showConfirm) {
      setShowConfirm(true);
      return;
    }

    startTransition(async () => {
      try {
        const result = await deleteAction(itemId);
        
        if (!result.success) {
          alert(`Silme işlemi başarısız: ${result.error}`);
        }
        // Başarılı durumda sayfa otomatik olarak yenilenecek (revalidatePath sayesinde)
      } catch (error) {
        console.error("Silme hatası:", error);
        alert("Silme işlemi sırasında bir hata oluştu");
      } finally {
        setShowConfirm(false);
      }
    });
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div className="flex space-x-2">
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Siliniyor..." : "Evet, Sil"}
        </button>
        <button
          onClick={handleCancel}
          disabled={isPending}
          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          İptal
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center px-3 py-1 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
      title={`"${itemTitle}" öğesini sil`}
    >
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      Sil
    </button>
  );
}