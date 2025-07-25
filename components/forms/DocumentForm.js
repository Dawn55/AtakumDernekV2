"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createDocument, updateDocument } from "@/lib/actions/documents";
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function DocumentForm({ document = null }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: document?.title || "",
    description: document?.description || "",
    category: document?.category || "",
    published: document?.published || false,
    fileUrl: document?.fileUrl || "",
    filePath: document?.filePath || "",
    fileBucket: document?.fileBucket || "",
    fileName: document?.fileName || "",
    mimeType: document?.mimeType || "", // Add mimeType to state
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Dosya boyutu kontrolü (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Dosya boyutu 10MB'dan küçük olmalıdır.");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('type', 'documents');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      if (response.ok) {
        const data = await response.json();
        
        // Eski dosyayı sil (eğer varsa ve güncelleme yapılıyorsa)
        if (formData.filePath && formData.fileBucket) {
          await deleteOldFile(formData.filePath, formData.fileBucket);
        }
        
        setFormData(prev => ({
          ...prev,
          fileUrl: data.url,
          filePath: data.path,
          fileBucket: data.bucket,
          fileName: data.filename,
          mimeType: file.type || getMimeTypeFromExtension(file.name) // Set mimeType from file or extension
        }));
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Yükleme başarısız');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError(`Dosya yükleme hatası: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Helper function to determine MIME type from file extension
  const getMimeTypeFromExtension = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    const mimeTypes = {
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'txt': 'text/plain',
      'rtf': 'application/rtf',
      'odt': 'application/vnd.oasis.opendocument.text'
    };
    return mimeTypes[extension] || 'application/octet-stream';
  };

  const deleteOldFile = async (path, bucket) => {
    try {
      await fetch(`/api/upload?bucket=${bucket}&path=${encodeURIComponent(path)}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Eski dosya silinirken hata:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Yeni doküman oluştururken dosya zorunlu
      if (!document && !formData.fileUrl) {
        setError("Lütfen bir dosya yükleyin.");
        setIsSubmitting(false);
        return;
      }

      const dataToSend = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        published: formData.published,
        fileUrl: formData.fileUrl,
        filePath: formData.filePath,
        fileBucket: formData.fileBucket,
        fileName: formData.fileName,
        mimeType: formData.mimeType // Include mimeType in data to send
      };

      let result;
      if (document) {
        result = await updateDocument(document.id, dataToSend);
      } else {
        result = await createDocument(dataToSend);
      }

      if (result.success) {
        router.push("/admin/documents");
        router.refresh();
      } else {
        setError(result.error || "Bir hata oluştu");
      }
    } catch (error) {
      console.error("Form gönderim hatası:", error);
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Başlık
        </label>
        <Input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Açıklama
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Kategori
        </label>
        <Input
          id="category"
          name="category"
          type="text"
          value={formData.category}
          onChange={handleChange}
          placeholder="Örn: Tüzük, Yönetmelik, Rapor"
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
          Dosya {document ? "(Değiştirmek için yeni dosya seçin)" : ""}
        </label>
        <input
          id="file"
          name="file"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          required={!document && !formData.fileUrl}
          accept=".pdf,.doc,.docx,.txt"
          disabled={isUploading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {isUploading && (
          <p className="mt-2 text-sm text-blue-600">Dosya yükleniyor...</p>
        )}
        {formData.fileUrl && (
          <p className="mt-2 text-sm text-green-600">
            ✅ Dosya yüklendi: {formData.fileName} ({formData.mimeType})
          </p>
        )}
        {document && !formData.fileUrl && (
          <p className="mt-2 text-sm text-gray-600">
            Mevcut dosya: {document.fileName} ({document.mimeType})
          </p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="published"
          name="published"
          type="checkbox"
          checked={formData.published}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
          Yayınla
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/documents")}
          disabled={isSubmitting || isUploading}
        >
          İptal
        </Button>
        <Button type="submit" disabled={isSubmitting || isUploading}>
          {isSubmitting ? "Kaydediliyor..." : document ? "Güncelle" : "Oluştur"}
        </Button>
      </div>
    </form>
  );
}