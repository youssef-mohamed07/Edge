import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isValidLocale, siteUrl, getDirection } from "../../../i18n/config";
import { getDictionary } from "../../../i18n/dictionaries";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Chatbot } from "../../components/layout/Chatbot";
import { PageHero } from "../../components/PageHero";
import { supabase } from "@/lib/supabase";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

interface BlogPost {
  id: string;
  slug: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  content: { en: string; ar: string };
  date: string;
  category: { en: string; ar: string };
  image: string;
  gallery?: string[];
  featured?: boolean;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      slug: data.slug,
      title: { en: data.title_en, ar: data.title_ar },
      excerpt: { en: data.excerpt_en, ar: data.excerpt_ar },
      content: { en: data.content_en, ar: data.content_ar },
      category: { en: data.category_en, ar: data.category_ar },
      image: data.image,
      gallery: data.gallery || [],
      featured: data.featured,
      date: new Date(data.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  } catch {
    return null;
  }
}

async function getRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .neq("slug", currentSlug)
      .order("created_at", { ascending: false })
      .limit(2);

    if (error || !data) return [];

    return data.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: { en: post.title_en, ar: post.title_ar },
      excerpt: { en: post.excerpt_en, ar: post.excerpt_ar },
      content: { en: post.content_en, ar: post.content_ar },
      category: { en: post.category_en, ar: post.category_ar },
      image: post.image,
      gallery: post.gallery || [],
      featured: post.featured,
      date: new Date(post.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) return {};

  const post = await getBlogPost(slug);
  if (!post) return {};

  const isRTL = locale === "ar";
  const currentUrl = `${siteUrl}/${locale}/blog/${slug}`;

  return {
    title: isRTL ? `${post.title.ar} | إيدج للملابس` : `${post.title.en} | EDGE for Garments`,
    description: isRTL ? post.excerpt.ar : post.excerpt.en,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/blog/${slug}`,
        ar: `${siteUrl}/ar/blog/${slug}`,
        "x-default": `${siteUrl}/en/blog/${slug}`,
      },
    },
  };
}

export const revalidate = 0;

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale)) notFound();

  const post = await getBlogPost(slug);
  if (!post) notFound();

  const dict = getDictionary(locale);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  // Get content and split by double newlines only
  const rawContent = isRTL ? post.content.ar : post.content.en;
  const contentParagraphs = rawContent.split("\n\n").filter((p) => p.trim());
  const relatedPosts = await getRelatedPosts(slug);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white" dir={dir}>
      <Navbar locale={locale} dict={dict} />

      {/* Hero Section */}
      <section className="relative py-28 lg:py-44 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={post.image} alt={isRTL ? post.title.ar : post.title.en} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#122D8B]/95 via-[#122D8B]/80 to-[#122D8B]/60" />
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#1A4AFF]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#1A4AFF]/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className={`max-w-4xl ${isRTL ? "mr-0 ml-auto text-right" : ""}`}>
            {/* Breadcrumb */}
            <nav className={`flex items-center gap-2 mb-6 text-sm ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
              <Link href={`/${locale}`} className={`text-white/70 hover:text-white transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "الرئيسية" : "Home"}
              </Link>
              <svg className={`w-4 h-4 text-white/50 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <Link href={`/${locale}/blog`} className={`text-white/70 hover:text-white transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "الأخبار" : "News"}
              </Link>
            </nav>
            
            <div className={`flex items-center gap-4 mb-6 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
              <span className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full border border-white/20 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {isRTL ? post.category.ar : post.category.en}
              </span>
              <span className={`inline-flex items-center gap-2 text-white/80 text-sm ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.date}
              </span>
            </div>
            
            <h1 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? post.title.ar : post.title.en}
            </h1>
            
            <p className={`text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
              {isRTL ? post.excerpt.ar : post.excerpt.en}
            </p>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(248 250 252)" />
          </svg>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-12 lg:py-20 -mt-1">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Article Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 md:p-12 lg:p-16 border border-slate-100">
            {/* Content - Simple clean design */}
            <div className={`prose prose-lg max-w-none ${isRTL ? "text-right" : ""}`}>
              {contentParagraphs.length > 1 ? (
                // Multiple paragraphs
                contentParagraphs.map((paragraph, index) => (
                  <p 
                    key={index} 
                    className={`text-slate-700 text-lg leading-loose mb-6 last:mb-0 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                // Single block - render as is with proper line height
                <div 
                  className={`text-slate-700 text-lg leading-loose whitespace-pre-line ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
                >
                  {rawContent}
                </div>
              )}
            </div>

            {/* Gallery Section */}
            {post.gallery && post.gallery.length > 0 && (
              <div className="mt-16 pt-12 border-t border-slate-200">
                <div className={`flex items-center gap-3 mb-8 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1A4AFF] to-[#122D8B] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className={`text-2xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "معرض الصور" : "Photo Gallery"}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {post.gallery.map((img, index) => (
                    <div key={index} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                      <Image src={img} alt={`Gallery ${index + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                          {isRTL ? `صورة ${index + 1}` : `Photo ${index + 1}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Share & Actions */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 ${isRTL ? "sm:flex-row-reverse" : ""}`}>
                {/* Share Buttons */}
                <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <span className={`text-slate-500 text-sm font-medium ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                    {isRTL ? "مشاركة:" : "Share:"}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white rounded-full flex items-center justify-center transition-colors" aria-label="Share on Facebook">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white rounded-full flex items-center justify-center transition-colors" aria-label="Share on Twitter">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-full flex items-center justify-center transition-colors" aria-label="Share on WhatsApp">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Back Button */}
                <Link 
                  href={`/${locale}/blog`} 
                  className={`inline-flex items-center gap-3 bg-gradient-to-r from-[#1A4AFF] to-[#122D8B] text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-[#1A4AFF]/30 transition-all duration-300 ${isRTL ? "flex-row-reverse font-[var(--font-cairo)]" : ""}`}
                >
                  <svg className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>{isRTL ? "العودة للأخبار" : "Back to News"}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            {/* Section Header */}
            <div className={`flex items-center gap-4 mb-12 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
              <div className="w-14 h-14 bg-gradient-to-br from-[#1A4AFF] to-[#122D8B] rounded-2xl flex items-center justify-center shadow-lg shadow-[#1A4AFF]/20">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className={isRTL ? "text-right" : ""}>
                <h2 className={`text-2xl lg:text-3xl font-bold text-[#122D8B] ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "أخبار ذات صلة" : "Related News"}
                </h2>
                <p className={`text-slate-500 mt-1 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                  {isRTL ? "اكتشف المزيد من أخبارنا" : "Discover more of our news"}
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/${locale}/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 border border-slate-100 hover:-translate-y-2"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={relatedPost.image} alt={isRTL ? relatedPost.title.ar : relatedPost.title.en} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"}`}>
                      <span className={`inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-[#122D8B] text-xs font-bold px-3 py-1.5 rounded-full ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {isRTL ? relatedPost.category.ar : relatedPost.category.en}
                      </span>
                    </div>
                  </div>
                  <div className={`p-6 lg:p-8 ${isRTL ? "text-right" : ""}`}>
                    <div className={`flex items-center gap-2 text-slate-400 text-sm mb-3 ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className={isRTL ? "font-[var(--font-cairo)]" : ""}>{relatedPost.date}</span>
                    </div>
                    <h3 className={`text-xl font-bold text-[#122D8B] mb-4 line-clamp-2 group-hover:text-[#1A4AFF] transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? relatedPost.title.ar : relatedPost.title.en}
                    </h3>
                    <div className={`flex items-center gap-2 text-[#1A4AFF] font-semibold group-hover:gap-3 transition-all ${isRTL ? "flex-row-reverse justify-end" : ""}`}>
                      <span className={isRTL ? "font-[var(--font-cairo)]" : ""}>{isRTL ? "اقرأ المزيد" : "Read More"}</span>
                      <svg className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}
