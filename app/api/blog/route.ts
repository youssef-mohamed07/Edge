import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// GET all posts
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ posts: [] });
    }

    // Transform data to match expected format
    const posts = (data || []).map((post) => ({
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

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ posts: [] });
  }
}

// POST new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("blog_posts")
      .insert({
        slug: generateSlug(body.title.en),
        title_en: body.title.en,
        title_ar: body.title.ar,
        excerpt_en: body.excerpt.en,
        excerpt_ar: body.excerpt.ar,
        content_en: body.content.en,
        content_ar: body.content.ar,
        category_en: body.category.en,
        category_ar: body.category.ar,
        image: body.image,
        gallery: body.gallery || [],
        featured: body.featured || false,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }

    const post = {
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

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
