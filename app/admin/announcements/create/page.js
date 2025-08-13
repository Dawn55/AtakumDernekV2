import AnnouncementForm from "../../../../components/forms/AnnouncementForm.js";
import Card from "../../../../components/ui/Card";
import BackButton from "@/components/ui/BackButton.js";

export default function CreateAnnouncementPage() {
  return (
    
    <div className="space-y-6">
        <div className="text-center mb-8 relative">
            <div className="absolute left-0 top-0">
              <BackButton href="/admin/documents"/>
            </div>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg 
              className="w-8 h-8 text-blue-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" 
              />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Yeni Duyuru Ekle
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Yeni bir duyuru oluşturun ve kullanıcılarınızla önemli bilgileri paylaşın.
          </p>
        </div>

        <AnnouncementForm />

    </div>
  );
}