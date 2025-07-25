// pages/api/download/[documentId].js veya app/api/download/[documentId]/route.js

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    const { documentId } = params;
    
    // Document bilgilerini veritabanından al
    const document = await prisma.document.findUnique({
      where: { 
        id: documentId,
        published: true // Sadece yayınlanmış belgeler indirilebilir
      }
    });

    if (!document) {
      return NextResponse.json({ error: "Belge bulunamadı" }, { status: 404 });
    }

    // Dosyayı external URL'den fetch et
    const fileResponse = await fetch(document.fileUrl);
    
    if (!fileResponse.ok) {
      return NextResponse.json({ error: "Dosya indirilemedi" }, { status: 500 });
    }

    const fileBuffer = await fileResponse.arrayBuffer();
    
    // İndirme için uygun headers ayarla
    const headers = {
      'Content-Type': document.mimeType || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${encodeURIComponent(document.fileName || document.title)}"`,
      'Content-Length': fileBuffer.byteLength.toString(),
    };

    return new NextResponse(fileBuffer, { headers });
    
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: "Dosya indirme hatası" }, { status: 500 });
  }
}