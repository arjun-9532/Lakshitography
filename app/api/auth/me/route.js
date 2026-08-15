import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/server/auth";
import { apiError } from "@/lib/server/http";

export const runtime = "nodejs";

export async function GET(request) {
  const result = await getAdminFromRequest(request);
  return result.error ? apiError(result.error, result.status) : NextResponse.json(result.user);
}
