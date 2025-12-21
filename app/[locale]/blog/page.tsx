import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { isValidLocale, siteUrl, getDirection, type Locale } from "../../i18n/config";
import { getDictionary } from "../../i18n/dictionaries";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Chatbot } from "../components/layout/Chatbot";
import { PageHero } from "../components/PageHero";
import { ScrollReveal } from "../components/ScrollReveal";
import { supabase } from "@/lib/supabase";
import { TypewriterTitle } from "../components/TypewriterTitle";

interface PageProps {
  params: Promise<{ locale: string }>;
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const isRTL = locale === "ar";
  const currentUrl = `${siteUrl}/${locale}/blog`;

  return {
    title: isRTL ? "المدونة والأخبار | إيدج للملابس" : "Blog & News | EDGE for Garments",
    description: isRTL
      ? "تابع آخر أخبارنا وإنجازاتنا والزيارات الرسمية لمصنعنا"
      : "Stay updated with our latest news, achievements, and official visits to our factory",
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${siteUrl}/en/blog`,
        ar: `${siteUrl}/ar/blog`,
        "x-default": `${siteUrl}/en/blog`,
      },
    },
  };
}

async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Error fetching posts:", error);
      return [];
    }

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
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export const revalidate = 0; // Disable caching

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const dir = getDirection(locale);
  const isRTL = dir === "rtl";

  const blogPosts = await getBlogPosts();
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <main className="min-h-screen bg-alabaster-grey overflow-x-hidden" dir={dir}>
      <Navbar locale={locale} dict={dict} />

      {/* Page Hero */}
      <PageHero
        title={isRTL ? "المدونة والأخبار" : "Blog & News"}
        subtitle={
          isRTL
            ? "تابع آخر أخبارنا وإنجازاتنا والزيارات الرسمية لمصنعنا"
            : "Stay updated with our latest news, achievements, and official visits to our factory"
        }
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=80"
        isRTL={isRTL}
        breadcrumbs={[
          { label: isRTL ? "الرئيسية" : "Home", href: `/${locale}` },
          { label: isRTL ? "الأخبار" : "News" },
        ]}
      />

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 lg:py-16 bg-alabaster-grey">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <ScrollReveal direction="up" delay={0}>
              <Link href={`/${locale}/blog/${featuredPost.slug}`} className="group block">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl lg:order-1">
                    <Image
                      src={featuredPost.image}
                      alt={isRTL ? featuredPost.title.ar : featuredPost.title.en}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"}`}>
                      <span className={`inline-block bg-royal-azure text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                        {isRTL ? "مميز" : "Featured"}
                      </span>
                    </div>
                  </div>
                  <div className={`lg:order-2 ${isRTL ? "text-right" : ""}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-royal-azure text-sm font-semibold ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                        {isRTL ? featuredPost.category.ar : featuredPost.category.en}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 text-sm">{featuredPost.date}</span>
                    </div>
                    <h2 className={`text-2xl lg:text-3xl xl:text-4xl font-bold text-true-cobalt mb-4 group-hover:text-royal-azure transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? featuredPost.title.ar : featuredPost.title.en}
                    </h2>
                    <p className={`text-slate-600 text-lg leading-relaxed mb-6 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                      {isRTL ? featuredPost.excerpt.ar : featuredPost.excerpt.en}
                    </p>
                    <div className="inline-flex items-center gap-2 text-royal-azure font-semibold group-hover:gap-3 transition-all">
                      <span className={isRTL ? "font-[var(--font-cairo)]" : ""}>{isRTL ? "اقرأ المزيد" : "Read More"}</span>
                      <svg className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-24 bg-alabaster-grey">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal direction="up" delay={0}>
            <div className="mb-12">
              <TypewriterTitle
                text={isRTL ? "جميع المقالات" : "All Articles"}
                isVisible={true}
                className={`text-2xl lg:text-3xl font-bold text-true-cobalt mb-2 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}
              />
            </div>
          </ScrollReveal>

          {blogPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className={`text-slate-500 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                {isRTL ? "لا توجد مقالات حالياً" : "No articles available"}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <ScrollReveal key={post.id} direction="up" delay={index * 100}>
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 block h-full"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.image}
                        alt={isRTL ? post.title.ar : post.title.en}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className={`p-6 ${isRTL ? "text-right" : ""}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-royal-azure text-xs font-semibold uppercase ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                          {isRTL ? post.category.ar : post.category.en}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-400 text-xs">{post.date}</span>
                      </div>
                      <h3 className={`text-lg font-bold text-true-cobalt mb-3 line-clamp-2 group-hover:text-royal-azure transition-colors ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                        {isRTL ? post.title.ar : post.title.en}
                      </h3>
                      <p className={`text-slate-500 text-sm line-clamp-2 mb-4 ${isRTL ? "font-[var(--font-cairo)]" : ""}`}>
                        {isRTL ? post.excerpt.ar : post.excerpt.en}
                      </p>
                      <div className="flex items-center gap-1 text-royal-azure text-sm font-medium group-hover:gap-2 transition-all">
                        <span className={isRTL ? "font-[var(--font-cairo)]" : ""}>{isRTL ? "اقرأ المزيد" : "Read More"}</span>
                        <svg className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer locale={locale} dict={dict} />
      <Chatbot locale={locale} />
    </main>
  );
}
