-- AlterTable
ALTER TABLE "dislikes" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "views" ALTER COLUMN "user_id" DROP NOT NULL;
