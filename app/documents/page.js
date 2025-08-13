import { PrismaClient } from "@prisma/client";
import Card from "../../components/ui/Card";
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import SearchComponent from '@/components/ui/SearchBar';

const prisma = new PrismaClient();



export default async function DocumentsPage({ searchParams }) {
  const query = searchParams?.q || '';
  const selectedCategory = searchParams?.category || '';

  // Arama ve filtreleme logic'i
  const whereClause = {
    published: true,
  };

  if (query) {
    whereClause.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } }
    ];
  }

  if (selectedCategory && selectedCategory !== 'all') {
    whereClause.category = selectedCategory;
  }

  const documents = await prisma.document.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" }
  });

  // Tüm kategorileri al (search dropdown için)
  const allCategories = await prisma.document.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ['category']
  });

  const categories = allCategories
    .map(doc => doc.category || "Genel")
    .filter((category, index, self) => self.indexOf(category) === index)
    .sort();

  const groupedDocuments = documents.reduce((acc, doc) => {
    const category = doc.category || "Genel";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(doc);
    return acc;
  }, {} );

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

  // Dosyanın tarayıcıda görüntülenebilir olup olmadığını kontrol eden fonksiyon
  const isViewableInBrowser = (mimeType) => {
    if (!mimeType) return false;
    
    // Görüntülenemez dosya türleri
    const nonViewableTypes = [
      'word', 'msword', 'wordprocessingml', // Word dosyaları
      'excel', 'spreadsheet', // Excel dosyaları
      'zip', 'rar', // Arşiv dosyaları
    ];
    
    return !nonViewableTypes.some(type => mimeType.includes(type));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="/documents" />
      
      <div className="pt-32 relative bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Belgeler
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Atakum Bileşim Derneği'nin resmi belgelerine buradan ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Arama Bileşeni */}
        <SearchComponent 
          categories={categories} 
          currentQuery={query}
          currentCategory={selectedCategory}
        />

        {/* Arama Sonuçları Bilgisi */}
        {(query || selectedCategory) && (
          <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-blue-800 font-medium">
                  {documents.length} belge bulundu
                  {query && <span className="font-normal"> - "{query}" için</span>}
                  {selectedCategory && <span className="font-normal"> - {selectedCategory} kategorisinde</span>}
                </span>
              </div>
              <a 
                href="/documents" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Temizle
              </a>
            </div>
          </div>
        )}

        {/* Belgeler Listesi */}
        {Object.entries(groupedDocuments).map(([category, docs]) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
              {category} <span className="text-lg font-normal text-gray-500">({docs.length})</span>
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {docs.map((document) => (
                <Card key={document.id} className="p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">
                      {getFileIcon(document.mimeType)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {document.title}
                      </h3>
                      {document.description && (
                        <p className="text-gray-600 mb-3 text-sm">
                          {document.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm text-gray-500">
                          <span className="block font-semibold text-gray-700 text-xs uppercase tracking-wide mb-1">
                            {getFileFormat(document.mimeType)}
                          </span>
                          <span className="block">
                            {new Date(document.createdAt).toLocaleDateString("tr-TR")}
                          </span>
                          {document.fileSize && (
                            <span className="block text-xs mt-1">
                              {formatFileSize(document.fileSize)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <a
                          href={`/api/download/${document.id}`}
                          download
                          className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors justify-center ${
                            isViewableInBrowser(document.mimeType) ? 'flex-1' : 'w-full'
                          }`}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          İndir
                        </a>
                        
                        {/* View Button - Sadece görüntülenebilir dosyalar için */}
                        {isViewableInBrowser(document.mimeType) && (
                          <a
                            href={document.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Görüntüle
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {documents.length === 0 && !query && !selectedCategory && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Henüz belge bulunmamaktadır</h3>
              <p className="mt-2 text-gray-500">
                Yakında belgeler paylaşılacaktır.
              </p>
            </div>
          </div>
        )}

        {documents.length === 0 && (query || selectedCategory) && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Arama sonucu bulunamadı</h3>
              <p className="mt-2 text-gray-500">
                Farklı anahtar kelimeler deneyebilir veya filtreyi değiştirebilirsiniz.
              </p>
              <a 
                href="/documents" 
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Tüm Belgeleri Görüntüle
              </a>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}