// lib/actions/announcements.js
"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { deleteFile } from "@/lib/supabase";

const prisma = new PrismaClient();

export async function createAnnouncement(data) {
  try {
    const announcement = await prisma.announcement.create({
      data: {
        title: data.title,
        content: data.content,
        slug: data.slug,
        imageUrl: data.imageUrl || null,
        imagePath: data.imagePath || null,
        imageBucket: data.imageBucket || null,
        published: data.published,
        publishedAt: data.published ? new Date() : null,
      },
    });

    revalidatePath('/admin/announcements');
    revalidatePath('/announcements');
    
    return { success: true, data: announcement };
  } catch (error) {
    console.error('Duyuru oluşturma hatası:', error);
    
    // Unique constraint hatası kontrolü
    if (error.code === 'P2002') {
      return { success: false, error: 'Bu slug zaten kullanılıyor' };
    }
    
    return { success: false, error: 'Duyuru oluşturulamadı' };
  }
}

export async function updateAnnouncement(id, data) {
  try {
    // Mevcut duyuruyu al (eski resmi silmek için)
    const existingAnnouncement = await prisma.announcement.findUnique({
      where: { id }
    });

    // Eğer yeni resim yüklendi ve eski resim varsa, eski resmi sil
    if (data.imageUrl && 
        existingAnnouncement?.imagePath && 
        existingAnnouncement?.imageBucket &&
        existingAnnouncement.imageUrl !== data.imageUrl) {
      
      try {
        await deleteFile(existingAnnouncement.imageBucket, existingAnnouncement.imagePath);
      } catch (deleteError) {
        console.warn('Eski resim silinirken hata:', deleteError);
      }
    }

    const announcement = await prisma.announcement.update({
      where: { id },
      data: {
        title: data.title,
        content: data.content,
        slug: data.slug,
        imageUrl: data.imageUrl || null,
        imagePath: data.imagePath || existingAnnouncement?.imagePath || null,
        imageBucket: data.imageBucket || existingAnnouncement?.imageBucket || null,
        published: data.published,
        publishedAt: data.published && !existingAnnouncement?.publishedAt ? new Date() : existingAnnouncement?.publishedAt,
      },
    });

    revalidatePath('/admin/announcements');
    revalidatePath('/announcements');
    revalidatePath(`/announcements/${announcement.slug}`);
    
    return { success: true, data: announcement };
  } catch (error) {
    console.error('Duyuru güncelleme hatası:', error);
    
    // Unique constraint hatası kontrolü
    if (error.code === 'P2002') {
      return { success: false, error: 'Bu slug zaten kullanılıyor' };
    }
    
    return { success: false, error: 'Duyuru güncellenemedi' };
  }
}

export async function deleteAnnouncement(id) {
  try {
    // Duyuruyu al (resim silmek için)
    const announcement = await prisma.announcement.findUnique({
      where: { id }
    });

    // Eğer resim varsa Supabase Storage'dan sil
    if (announcement?.imagePath && announcement?.imageBucket) {
      try {
        await deleteFile(announcement.imageBucket, announcement.imagePath);
      } catch (deleteError) {
        console.warn('Resim silinirken hata:', deleteError);
      }
    }

    // Duyuruyu veritabanından sil
    await prisma.announcement.delete({
      where: { id },
    });

    revalidatePath('/admin/announcements');
    revalidatePath('/announcements');
    
    return { success: true };
  } catch (error) {
    console.error('Duyuru silme hatası:', error);
    return { success: false, error: 'Duyuru silinemedi' };
  }
}

export async function getAnnouncements() {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' },
    });
    
    return { success: true, data: announcements };
  } catch (error) {
    console.error('Duyurular getirilirken hata:', error);
    return { success: false, error: 'Duyurular getirilemedi' };
  }
}

export async function getPublishedAnnouncements() {
  try {
    const announcements = await prisma.announcement.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
    });
    
    return { success: true, data: announcements };
  } catch (error) {
    console.error('Yayınlanmış duyurular getirilirken hata:', error);
    return { success: false, error: 'Duyurular getirilemedi' };
  }
}

export async function getAnnouncementBySlug(slug) {
  try {
    const announcement = await prisma.announcement.findUnique({
      where: { slug },
    });
    
    if (!announcement) {
      return { success: false, error: 'Duyuru bulunamadı' };
    }
    
    return { success: true, data: announcement };
  } catch (error) {
    console.error('Duyuru getirme hatası:', error);
    return { success: false, error: 'Duyuru getirilemedi' };
  }
}

export async function getAnnouncementById(id) {
  try {
    const announcement = await prisma.announcement.findUnique({
      where: { id },
    });
    
    if (!announcement) {
      return { success: false, error: 'Duyuru bulunamadı' };
    }
    
    return { success: true, data: announcement };
  } catch (error) {
    console.error('Duyuru getirme hatası:', error);
    return { success: false, error: 'Duyuru getirilemedi' };
  }
}

export async function toggleAnnouncementStatus(id) {
  try {
    const announcement = await prisma.announcement.findUnique({
      where: { id },
    });

    if (!announcement) {
      return { success: false, error: 'Duyuru bulunamadı' };
    }

    const updatedAnnouncement = await prisma.announcement.update({
      where: { id },
      data: {
        published: !announcement.published,
        publishedAt: !announcement.published ? new Date() : announcement.publishedAt,
      },
    });

    revalidatePath('/admin/announcements');
    revalidatePath('/announcements');
    
    return { success: true, data: updatedAnnouncement };
  } catch (error) {
    console.error('Duyuru durum değiştirme hatası:', error);
    return { success: false, error: 'Durum değiştirilemedi' };
  }
}