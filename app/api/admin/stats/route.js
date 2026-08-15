import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/server/auth";
import { getDatabase } from "@/lib/server/database";
import { apiError } from "@/lib/server/http";

export const runtime = "nodejs";

export async function GET(request) {
  const admin = await getAdminFromRequest(request);
  if (admin.error) return apiError(admin.error, admin.status);
  const bookings = (await getDatabase()).collection("bookings");
  const [total, fresh, confirmed, completed] = await Promise.all([
    bookings.countDocuments(),
    bookings.countDocuments({ status: "new" }),
    bookings.countDocuments({ status: "confirmed" }),
    bookings.countDocuments({ status: "completed" }),
  ]);
  return NextResponse.json({ total, new: fresh, confirmed, completed });
}
