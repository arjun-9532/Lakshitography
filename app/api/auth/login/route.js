import { NextResponse } from "next/server";
import { createAccessToken, ensureAdmin, publicUser } from "@/lib/server/auth";
import { getDatabase } from "@/lib/server/database";
import { apiError, isEmail, requestJson } from "@/lib/server/http";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(request) {
  const body = await requestJson(request);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!isEmail(email) || !password) return apiError("Invalid email or password", 401);

  await ensureAdmin();
  const user = await (await getDatabase()).collection("users").findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password_hash || ""))) {
    return apiError("Invalid email or password", 401);
  }

  return NextResponse.json({ access_token: await createAccessToken(user), user: publicUser(user) });
}
