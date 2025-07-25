// AnnouncementForm.js içindeki handleFileUpload fonksiyonu

const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Dosya boyutu kontrolü (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    setError("Dosya boyutu 5MB'dan küçük olmalıdır.");
    return;
  }

  // Dosya tipi kontrolü
  if (!file.type.startsWith('image/')) {
    setError("Lütfen sadece resim dosyası seçin.");
    return;
  }

  setIsUploading(true);
  setError("");

  try {
    // FormData oluştur
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'announcements'); // Supabase bucket'ı belirtmek için

    // Dosyayı Supabase Storage'a yükle
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      
      // Eski resmi sil (eğer varsa ve güncelleme yapılıyorsa)
      if (announcement?.imageUrl && announcement.imageUrl !== data.url) {
        await deleteOldImage(announcement.imageUrl);
      }
      
      setFormData(prev => ({
        ...prev,
        imageUrl: data.url,
        imagePath: data.path, // Silme işlemi için path'i sakla
        imageBucket: data.bucket
      }));
      setPreviewImage(data.url);
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Yükleme başarısız');
    }
  } catch (error) {
    console.error('Upload error:', error);
    setError(`Resim yükleme hatası: ${error.message}`);
  } finally {
    setIsUploading(false);
  }
};

// Eski resmi silme fonksiyonu
const deleteOldImage = async (imageUrl) => {
  try {
    // URL'den path ve bucket bilgisini çıkar
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const path = `announcements/${fileName}`;
    
    await fetch(`/api/upload?bucket=announcements&path=${encodeURIComponent(path)}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Eski resim silinirken hata:', error);
  }
};

// removeImage fonksiyonunu da güncelle
const removeImage = async () => {
  if (formData.imagePath && formData.imageBucket) {
    try {
      await fetch(`/api/upload?bucket=${formData.imageBucket}&path=${encodeURIComponent(formData.imagePath)}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Resim silinirken hata:', error);
    }
  }
  
  setFormData(prev => ({
    ...prev,
    imageUrl: "",
    imagePath: "",
    imageBucket: ""
  }));
  setPreviewImage("");
};