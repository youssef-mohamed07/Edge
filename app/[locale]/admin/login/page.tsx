"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const translations = {
  en: {
    title: "Admin Login",
    subtitle: "Enter your credentials to access the dashboard",
    username: "Username",
    password: "Password",
    login: "Sign In",
    logging: "Signing in...",
    error: "Invalid username or password",
  },
  ar: {
    title: "تسجيل الدخول",
    subtitle: "أدخل بياناتك للوصول إلى لوحة التحكم",
    username: "اسم المستخدم",
    password: "كلمة المرور",
    login: "تسجيل الدخول",
    logging: "جاري الدخول...",
    error: "اسم المستخدم أو كلمة المرور غير صحيحة",
  },
};

export default function LoginPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "en";
  const isRTL = locale === "ar";
  const t = translations[locale as keyof typeof translations] || translations.en;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });

      if (res.ok) {
        router.push(`/${locale}/admin`);
      } else {
        setError(t.error);
      }
    } catch {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-[#122D8B] to-slate-900 flex items-center justify-center p-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Image
            src="/logo1.png"
            alt="EDGE"
            width={160}
            height={50}
            className="mx-auto mb-6"
          />
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">{t.title}</h1>
            <p className="text-slate-500 text-sm">{t.subtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t.username}
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1A4AFF] focus:border-transparent transition-all"
                placeholder="admin"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                {t.password}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#1A4AFF] focus:border-transparent transition-all"
                placeholder="********"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#1A4AFF] text-white font-semibold rounded-xl hover:bg-[#122D8B] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t.logging : t.login}
            </button>
          </form>
        </div>

        {/* Language Toggle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push(`/${locale === "ar" ? "en" : "ar"}/admin/login`)}
            className="text-white/70 hover:text-white text-sm transition-colors"
          >
            {locale === "ar" ? "English" : "العربية"}
          </button>
        </div>
      </div>
    </div>
  );
}
