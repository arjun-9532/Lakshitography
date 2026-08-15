import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { DEFAULT_GALLERY_CATEGORIES } from "@/data/content";
import { getAdminFromRequest } from "@/lib/server/auth";
import { uploadGalleryImage } from "@/lib/server/cloudinary";
import { getDatabase } from "@/lib/server/database";
import { apiError } from "@/lib/server/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedCategories = new Set(DEFAULT_GALLERY_CATEGORIES);
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function normalizeCategory(category, customCategory) {
  const safeCategory = typeof category === "string" ? category.trim() : "";
  const safeCustomCategory = typeof customCategory === "string" ? customCategory.trim() : "";

  if (safeCategory === "Other") {
    if (!safeCustomCategory) return null;
    return safeCustomCategory;
  }

  if (!safeCategory || !allowedCategories.has(safeCategory)) return null;
  return safeCategory;
}

export async function GET() {
  const photos = await (await getDatabase()).collection("gallery")
    .find({}, { projection: { _id: 0 } }).sort({ created_at: -1 }).toArray();
  return NextResponse.json(photos, {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request) {
  const admin = await getAdminFromRequest(request);
  if (admin.error) return apiError(admin.error, admin.status);

  const formData = await request.formData();
  const image = formData.get("image");
  const category = formData.get("category");
  const customCategory = formData.get("customCategory");
  if (!(image instanceof File) || image.size === 0) return apiError("Choose an image to upload.");
  if (!image.type.startsWith("image/")) return apiError("Only image files can be uploaded.");
  if (image.size > MAX_FILE_SIZE) return apiError("Image must be 10 MB or smaller.");

  const normalizedCategory = normalizeCategory(category, customCategory);
  if (!normalizedCategory) return apiError("Choose a valid gallery category.");

  const result = await uploadGalleryImage(Buffer.from(await image.arrayBuffer()));
  const photo = {
    id: randomUUID(),
    category: normalizedCategory,
    url: result.secure_url,
    public_id: result.public_id,
    created_at: new Date().toISOString(),
  };
  await (await getDatabase()).collection("gallery").insertOne(photo);
  return NextResponse.json(photo, { status: 201 });
}

export async function PATCH(request) {
  const admin = await getAdminFromRequest(request);
  if (admin.error) return apiError(admin.error, admin.status);

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const { id, category, customCategory } = body;
  const normalizedCategory = normalizeCategory(category, customCategory);

  if (typeof id !== "string" || !id) return apiError("Gallery photo id is required.");
  if (!normalizedCategory) return apiError("Choose a valid gallery category.");

  const result = await (await getDatabase()).collection("gallery").findOneAndUpdate(
    { id },
    { $set: { category: normalizedCategory } },
    { returnDocument: "after", projection: { _id: 0 } },
  );

  if (!result) return apiError("Gallery photo not found.", 404);
  return NextResponse.json(result);
}

export async function DELETE(request) {
  const admin = await getAdminFromRequest(request);
  if (admin.error) return apiError(admin.error, admin.status);

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const { id } = body;
  if (typeof id !== "string" || !id) return apiError("Gallery photo id is required.");

  const result = await (await getDatabase()).collection("gallery").deleteOne({ id });
  if (!result.deletedCount) return apiError("Gallery photo not found.", 404);
  return NextResponse.json({ ok: true });
}
