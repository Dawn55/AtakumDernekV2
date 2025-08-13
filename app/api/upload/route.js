import { NextResponse } from 'next/server';
import { uploadFile, getPublicUrl } from '@/lib/supabase';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const type = formData.get('type') || 'announcements';

    if (!file) {
      return NextResponse.json(
        { error: 'Dosya bulunamadı' },
        { status: 400 }
      );
    }

    
    if (type === 'announcements' && !file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Sadece resim dosyaları kabul edilir' },
        { status: 400 }
      );
    }

    
    const maxSize = type === 'announcements' ? 5 * 1024 * 1024 : 10 * 1024 * 1024; // 5MB image, 10MB documents
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `Dosya boyutu ${maxSize / (1024 * 1024)}MB'dan küçük olmalıdır` },
        { status: 400 }
      );
    }

    
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const originalName = file.name || 'upload';
    const fileExtension = path.extname(originalName) || (type === 'announcements' ? '.jpg' : '.pdf');
    const fileName = `${timestamp}-${randomString}${fileExtension}`;
    const filePath = `${type}/${fileName}`;

    const bucket = type === 'announcements' ? 'announcements' : 'documents';

    const uploadResult = await uploadFile(bucket, file, filePath);

    const publicUrl = getPublicUrl(bucket, filePath);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: fileName,
      path: filePath,
      bucket: bucket
    });

  } catch (error) {
    console.error('Upload hatası:', error);
    return NextResponse.json(
      { error: error.message || 'Dosya yükleme sırasında hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const bucket = searchParams.get('bucket');
    const path = searchParams.get('path');

    if (!bucket || !path) {
      return NextResponse.json(
        { error: 'Bucket ve path parametreleri gerekli' },
        { status: 400 }
      );
    }

    await deleteFile(bucket, path);

    return NextResponse.json({
      success: true,
      message: 'Dosya başarıyla silindi'
    });

  } catch (error) {
    console.error('Delete hatası:', error);
    return NextResponse.json(
      { error: error.message || 'Dosya silme sırasında hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Supabase Storage API endpoint çalışıyor',
    timestamp: new Date().toISOString()
  });
}