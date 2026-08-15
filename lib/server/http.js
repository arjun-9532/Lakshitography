import { NextResponse } from "next/server";

export function apiError(detail, status = 400) {
  return NextResponse.json({ detail }, { status });
}

export async function requestJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function isEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function optionalText(value) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}
