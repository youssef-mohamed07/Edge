import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center px-6">
            <h1 className="text-6xl font-bold text-true-cobalt mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-true-cobalt mb-4">Page Not Found</h2>
            <p className="text-true-cobalt/60 mb-8">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/en"
                className="px-6 py-3 bg-royal-azure text-white font-semibold hover:bg-true-cobalt transition-colors"
              >
                English Home
              </Link>
              <Link
                href="/ar"
                className="px-6 py-3 border-2 border-true-cobalt text-true-cobalt font-semibold hover:bg-true-cobalt hover:text-white transition-colors font-[var(--font-cairo)]"
              >
                الصفحة الرئيسية
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
