import DocumentForm from "../../../../components/forms/DocumentForm";
import Card from "../../../../components/ui/Card";
import BackButton from "@/components/ui/BackButton";

export default function CreateDocumentPage() {
  return (
    <div className="min-h-screen max-h-screen overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center mb-8">
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
            Yeni Belge Ekle
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Yeni bir belge yükleyin ve kullanıcılarınızla önemli dokümanları paylaşın.
          </p>
        </div>

        <div className="pb-8">
                <Card className="p-6">
        <DocumentForm />
      </Card>
        </div>
      </div>
      </div>
    </div>
  );
}