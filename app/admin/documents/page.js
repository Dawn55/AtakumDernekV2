import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import DeleteButton from "../../../components/ui/DeleteButton";
import { deleteDocument } from "../../../lib/actions/documents";

const prisma = new PrismaClient();

export default async function AdminDocumentsPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: "desc" }
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0 || !bytes) return "Bilinmeyen boyut";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (mimeType) => {
    if (!mimeType) return "📁";
    if (mimeType.includes("pdf")) return "📑";
    if (mimeType.includes("word") || mimeType.includes("msword") || mimeType.includes("wordprocessingml")) return "📝";
    if (mimeType.includes("excel") || mimeType.includes("spreadsheet")) return "📊";
    if (mimeType.includes("image")) return "🖼️";
    if (mimeType.includes("zip") || mimeType.includes("rar")) return "📦";
    if (mimeType.includes("text")) return "📄";
    return "📁";
  };

  const getFileFormat = (mimeType) => {
    if (!mimeType) return "UNKNOWN";
    if (mimeType.includes("pdf")) return "PDF";
    if (mimeType.includes("word") || mimeType.includes("msword") || mimeType.includes("wordprocessingml")) return "WORD";
    if (mimeType.includes("excel") || mimeType.includes("spreadsheet")) return "EXCEL";
    if (mimeType.includes("image/jpeg") || mimeType.includes("image/jpg")) return "JPG";
    if (mimeType.includes("image/png")) return "PNG";
    if (mimeType.includes("image")) return "IMAGE";
    if (mimeType.includes("zip")) return "ZIP";
    if (mimeType.includes("rar")) return "RAR";
    if (mimeType.includes("text")) return "TXT";
    return "FILE";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Belge Yönetimi</h1>
        <Link href="/admin/documents/create">
          <Button>Yeni Belge Ekle</Button>
        </Link>
      </div>

      <div className="grid gap-6">
        {documents.map((document) => (
          <Card key={document.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4 flex-1">
                <div className="text-2xl">
                  {getFileIcon(document.mimeType)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {document.title}
                  </h3>
                  {document.description && (
                    <p className="text-gray-600 mb-4">
                      {document.description}
                    </p>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="font-semibold text-gray-700 text-xs uppercase tracking-wide">
                      {getFileFormat(document.mimeType)}
                    </span>
                    <span>{document.fileName}</span>
                    <span>{formatFileSize(document.fileSize)}</span>
                    <span>
                      {new Date(document.createdAt).toLocaleDateString("tr-TR")}
                    </span>
                    {document.category && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {document.category}
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      document.published 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {document.published ? "Yayında" : "Taslak"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <Link href={`/admin/documents/${document.id}/edit`}>
                  <Button variant="outline" size="sm">Düzenle</Button>
                </Link>
                <a
                  href={`/api/download/${document.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
                >
                  İndir
                </a>
                <DeleteButton
                  itemId={document.id}
                  itemTitle={document.title}
                  deleteAction={deleteDocument}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {documents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Henüz belge bulunmamaktadır.</p>
          <Link href="/admin/documents/create" className="mt-4 inline-block">
            <Button>İlk Belgenizi Ekleyin</Button>
          </Link>
        </div>
      )}
    </div>
  );
}