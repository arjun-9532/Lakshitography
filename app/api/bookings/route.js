import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { ensureAdmin, getAdminFromRequest } from "@/lib/server/auth";
import { getDatabase } from "@/lib/server/database";
import { apiError, isEmail, optionalText, requestJson } from "@/lib/server/http";

export const runtime = "nodejs";

export async function POST(request) {
  const body = await requestJson(request);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const service = typeof body?.service === "string" ? body.service : "";

  if (!name || name.length > 120) return apiError("Name must be between 1 and 120 characters.");
  if (!isEmail(email)) return apiError("Enter a valid email address.");
  if (phone.length < 5 || phone.length > 30) return apiError("Phone must be between 5 and 30 characters.");
  if (!service) return apiError("Service is required.");

  const booking = {
    id: randomUUID(), name, email, phone, service,
    preferred_date: optionalText(body.preferred_date),
    people_count: optionalText(body.people_count),
    location: optionalText(body.location),
    message: optionalText(body.message) || "",
    status: "new",
    created_at: new Date().toISOString(),
  };
  await ensureAdmin();
  await (await getDatabase()).collection("bookings").insertOne(booking);
  return NextResponse.json(booking, { status: 201 });
}

export async function GET(request) {
  const admin = await getAdminFromRequest(request);
  if (admin.error) return apiError(admin.error, admin.status);
  const bookings = await (await getDatabase()).collection("bookings")
    .find({}, { projection: { _id: 0 } }).sort({ created_at: -1 }).limit(1000).toArray();
  return NextResponse.json(bookings);
}
