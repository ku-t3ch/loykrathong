-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blessing" (
    "id" TEXT NOT NULL,
    "blessing" TEXT NOT NULL,
    "kratongId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blessing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Krathong" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Krathong_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blessing" ADD CONSTRAINT "Blessing_kratongId_fkey" FOREIGN KEY ("kratongId") REFERENCES "Krathong"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
