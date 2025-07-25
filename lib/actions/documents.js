// lib/actions/documents.js
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { deleteFile } from "@/lib/supabase";

// Yeni döküman oluştur (Supabase Storage ile)
export async function createDocument(data) {
  try {
    if (!data.title || !data.fileUrl) {
      throw new Error("Başlık ve dosya gereklidir");
    }

    const document = await prisma.document.create({
      data: {
        title: data.title,
        description: data.description || "",
        category: data.category || "",
        published: data.published || false,
        fileName: data.fileName,
        fileUrl: data.fileUrl,
        filePath: data.filePath || null,
        fileBucket: data.fileBucket || null,
        fileSize: data.fileSize || null,
        mimeType: data.mimeType
      }
    });

    revalidatePath("/admin/documents");
    revalidatePath("/documents");
    
    return { success: true, data: document };
  } catch (error) {
    console.error("Döküman oluşturma hatası:", error);
    return { success: false, error: error.message };
  }
}

// Döküman güncelle (Supabase Storage ile)
export async function updateDocument(documentId, data) {
  try {
    if (!data.title) {
      throw new Error("Başlık gereklidir");
    }

    // Mevcut dökümanı al (eski dosyayı silmek için)
    const existingDocument = await prisma.document.findUnique({
      where: { id: documentId }
    });

    if (!existingDocument) {
      throw new Error("Döküman bulunamadı");
    }

    const updateData = {
      title: data.title,
      description: data.description || "",
      category: data.category || "",
      published: data.published || false
    };

    // Eğer yeni dosya yüklendiyse
    if (data.fileUrl && data.fileUrl !== existingDocument.fileUrl) {
      // Eski dosyayı sil
      if (existingDocument.filePath && existingDocument.fileBucket) {
        try {
          await deleteFile(existingDocument.fileBucket, existingDocument.filePath);
        } catch (deleteError) {
          console.warn('Eski dosya silinirken hata:', deleteError);
        }
      }

      // Yeni dosya bilgilerini ekle
      updateData.fileName = data.fileName;
      updateData.fileUrl = data.fileUrl;
      updateData.filePath = data.filePath;
      updateData.fileBucket = data.fileBucket;
      updateData.fileSize = data.fileSize;
      updateData.mimeType = data.mimeType;
    }

    const document = await prisma.document.update({
      where: { id: documentId },
      data: updateData
    });

    revalidatePath("/admin/documents");
    revalidatePath("/documents");
    
    return { success: true, data: document };
  } catch (error) {
    console.error("Döküman güncelleme hatası:", error);
    return { success: false, error: error.message };
  }
}

// Döküman sil (Supabase Storage ile)
export async function deleteDocument(documentId) {
  try {
    // Dökümanı al (dosyayı silmek için)
    const document = await prisma.document.findUnique({
      where: { id: documentId }
    });

    if (!document) {
      throw new Error("Döküman bulunamadı");
    }

    // Eğer dosya varsa Supabase Storage'dan sil
    if (document.filePath && document.fileBucket) {
      try {
        await deleteFile(document.fileBucket, document.filePath);
      } catch (deleteError) {
        console.warn('Dosya silinirken hata:', deleteError);
      }
    }

    // Dökümanı veritabanından sil
    await prisma.document.delete({
      where: { id: documentId }
    });

    revalidatePath("/admin/documents");
    revalidatePath("/documents");
    
    return { success: true };
  } catch (error) {
    console.error("Döküman silme hatası:", error);
    return { success: false, error: error.message };
  }
}

// Tüm dökümanları getir
export async function getDocuments(published = null) {
  try {
    const where = published !== null ? { published } : {};
    
    const documents = await prisma.document.findMany({
      where,
      orderBy: { createdAt: "desc" }
    });

    return { success: true, data: documents };
  } catch (error) {
    console.error("Dökümanları getirme hatası:", error);
    return { success: false, error: error.message };
  }
}

// Yayınlanmış dökümanları getir
export async function getPublishedDocuments() {
  try {
    const documents = await prisma.document.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" }
    });

    return { success: true, data: documents };
  } catch (error) {
    console.error("Yayınlanmış dökümanları getirme hatası:", error);
    return { success: false, error: error.message };
  }
}

// Tek döküman getir
export async function getDocument(documentId) {
  try {
    const document = await prisma.document.findUnique({
      where: { id: documentId }
    });

    if (!document) {
      throw new Error("Döküman bulunamadı");
    }

    return { success: true, data: document };
  } catch (error) {
    console.error("Döküman getirme hatası:", error);
    return { success: false, error: error.message };
  }
}

// Kategoriye göre dökümanları getir
export async function getDocumentsByCategory(category, published = true) {
  try {
    const where = { 
      category,
      ...(published !== null && { published })
    };
    
    const documents = await prisma.document.findMany({
      where,
      orderBy: { createdAt: "desc" }
    });

    return { success: true, data: documents };
  } catch (error) {
    console.error("Kategoriye göre dökümanları getirme hatası:", error);
    return { success: false, error: error.message };
  }
}

// Döküman kategorilerini getir
export async function getDocumentCategories() {
  try {
    const categories = await prisma.document.findMany({
      where: {
        category: { not: null },
        published: true
      },
      select: { category: true },
      distinct: ['category']
    });

    const uniqueCategories = categories
      .map(doc => doc.category)
      .filter(Boolean)
      .sort();

    return { success: true, data: uniqueCategories };
  } catch (error) {
    console.error("Kategorileri getirme hatası:", error);
    return { success: false, error: error.message };
  }
}

// Döküman durumunu değiştir
export async function toggleDocumentStatus(documentId) {
  try {
    const document = await prisma.document.findUnique({
      where: { id: documentId }
    });

    if (!document) {
      throw new Error("Döküman bulunamadı");
    }

    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
      data: {
        published: !document.published
      }
    });

    revalidatePath("/admin/documents");
    revalidatePath("/documents");
    
    return { success: true, data: updatedDocument };
  } catch (error) {
    console.error("Döküman durum değiştirme hatası:", error);
    return { success: false, error: error.message };
  }
}