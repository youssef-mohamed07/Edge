import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    const product = {
      id: data.id,
      slug: data.slug,
      title: { en: data.title_en, ar: data.title_ar },
      description: { en: data.description_en, ar: data.description_ar },
      longDescription: { en: data.long_description_en, ar: data.long_description_ar },
      image: data.image,
      gallery: data.gallery || [],
      features: { en: data.features_en || [], ar: data.features_ar || [] },
      specifications: { en: data.specifications_en || {}, ar: data.specifications_ar || {} },
      category: data.category,
      featured: data.featured,
    };

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { data, error } = await supabase
      .from("products")
      .update({
        slug: body.slug,
        title_en: body.title.en,
        title_ar: body.title.ar,
        description_en: body.description.en,
        description_ar: body.description.ar,
        long_description_en: body.longDescription.en,
        long_description_ar: body.longDescription.ar,
        image: body.image,
        gallery: body.gallery || [],
        features_en: body.features.en || [],
        features_ar: body.features.ar || [],
        specifications_en: body.specifications.en || {},
        specifications_ar: body.specifications.ar || {},
        category: body.category,
        featured: body.featured || false,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, product: data });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
