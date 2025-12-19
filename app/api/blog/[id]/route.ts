import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// GET single post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
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

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// PUT update post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from("blog_posts")
      .update({
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
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
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

    return NextResponse.json({ post });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// DELETE post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabase.from("blog_posts").delete().eq("id", id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
