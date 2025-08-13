import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import DocumentForm from "../../../../../components/forms/DocumentForm";
import Card from "../../../../../components/ui/Card";
import BackButton from "@/components/ui/BackButton";

const prisma = new PrismaClient();

export default async function EditDocumentPage({ params }) {
  const document = await prisma.document.findUnique({
    where: { id: params.id }
  });

  if (!document) {
    notFound();
  }

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center mb-8 relative">
          <div className="absolute left-0 top-0">
            <BackButton href="/admin/documents" variant="green" />
          </div>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg 
              className="w-8 h-8 text-green-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Belge Düzenle
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            "{document.title}" belgesini düzenleyin ve güncelleyin.
          </p>
        </div>

        <div className="pb-8">
          <Card className="p-6">
            <DocumentForm document={document} />
          </Card>
        </div>
      </div>
    </div>
  );
}