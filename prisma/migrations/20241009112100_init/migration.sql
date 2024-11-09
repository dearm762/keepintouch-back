-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "avatarUrl" TEXT,
    "age" INTEGER,
    "email" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
