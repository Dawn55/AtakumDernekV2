-- AlterTable
ALTER TABLE "announcements" ADD COLUMN     "imageBucket" TEXT,
ADD COLUMN     "imagePath" TEXT;

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "fileBucket" TEXT,
ADD COLUMN     "filePath" TEXT,
ALTER COLUMN "fileSize" DROP NOT NULL;
