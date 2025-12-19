import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

// Fallback credentials
const FALLBACK_USERNAME = "admin";
const FALLBACK_PASSWORD = "admin123";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const username = email;

    let isAuthenticated = false;

    // Try Supabase first
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("username", username)
        .eq("password_hash", password)
        .single();

      if (!error && data) {
        isAuthenticated = true;
      }
    } catch (e) {
      console.log("Supabase auth check failed, using fallback");
    }

    // Fallback to hardcoded credentials
    if (!isAuthenticated) {
      if (username === FALLBACK_USERNAME && password === FALLBACK_PASSWORD) {
        isAuthenticated = true;
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
