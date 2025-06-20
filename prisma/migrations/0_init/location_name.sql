-- CreateEnum
CREATE TYPE "media_type" AS ENUM ('video', 'image');

-- CreateEnum
CREATE TYPE "report_status" AS ENUM ('process', 'pending', 'completed');

-- CreateTable
CREATE TABLE "fireman" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fireman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fireman_report_group" (
    "id" SERIAL NOT NULL,
    "group_id" INTEGER NOT NULL,
    "fireman_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fireman_report_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group" (
    "id" SERIAL NOT NULL,
    "location_name" VARCHAR(255),
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "status" "report_status",
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" SERIAL NOT NULL,
    "media_url" TEXT NOT NULL,
    "type" "media_type" NOT NULL,
    "email" VARCHAR(120),
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "description" TEXT,
    "is_anonymous" BOOLEAN DEFAULT false,
    "is_secret" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "location_name" INTEGER NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_group_member" (
    "id" SERIAL NOT NULL,
    "validation_id" INTEGER,
    "report_id" INTEGER,
    "group_id" INTEGER,

    CONSTRAINT "report_group_member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "validation" (
    "id" SERIAL NOT NULL,
    "verified" BOOLEAN DEFAULT false,
    "accuracy" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "validation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fireman_email_key" ON "fireman"("email");

-- AddForeignKey
ALTER TABLE "fireman_report_group" ADD CONSTRAINT "fireman_report_group_fireman_id_fkey" FOREIGN KEY ("fireman_id") REFERENCES "fireman"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fireman_report_group" ADD CONSTRAINT "fireman_report_group_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report_group_member" ADD CONSTRAINT "report_group_member_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report_group_member" ADD CONSTRAINT "report_group_member_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "report_group_member" ADD CONSTRAINT "report_group_member_validation_id_fkey" FOREIGN KEY ("validation_id") REFERENCES "validation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

