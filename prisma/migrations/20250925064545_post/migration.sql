-- CreateTable
CREATE TABLE "public"."Post" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "img" VARCHAR(255),

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
