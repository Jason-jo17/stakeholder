-- Run this in your Supabase SQL Editor to manually apply the changes
-- This is safe to run even if it was partially applied.

-- 1. Add the "slug" column to the "Solution" table
ALTER TABLE "Solution" ADD COLUMN IF NOT EXISTS "slug" TEXT;

-- 2. Create a unique index for the "slug" column (required for @unique in Prisma)
CREATE UNIQUE INDEX IF NOT EXISTS "Solution_slug_key" ON "Solution"("slug");
