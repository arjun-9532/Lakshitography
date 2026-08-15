import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/server/auth";
import { getDatabase } from "@/lib/server/database";
import { apiError, requestJson } from "@/lib/server/http";

export const runtime = "nodejs";
const statuses = new Set(["new", "contacted", "confirmed", "completed", "cancelled"]);

export async function PATCH(request, { params }) {
  const admin = await getAdminFromRequest(request);
  if (admin.error) return apiError(admin.error, admin.status);
  const body = await requestJson(request);
  if (!statuses.has(body?.status)) return apiError("Invalid status. Must be one of cancelled, completed, confirmed, contacted, new.");
  const { bookingId } = await params;
  const booking = await (await getDatabase()).collection("bookings").findOneAndUpdate(
    { id: bookingId }, { $set: { status: body.status } }, { returnDocument: "after", projection: { _id: 0 } },
  );
  if (!booking) return apiError("Booking not found", 404);
  return NextResponse.json(booking);
}

export async function DELETE(request, { params }) {
  const admin = await getAdminFromRequest(request);
  if (admin.error) return apiError(admin.error, admin.status);
  const { bookingId } = await params;
  const result = await (await getDatabase()).collection("bookings").deleteOne({ id: bookingId });
  if (!result.deletedCount) return apiError("Booking not found", 404);
  return NextResponse.json({ ok: true });
}
