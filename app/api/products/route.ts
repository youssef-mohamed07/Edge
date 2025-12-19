import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import productsJson from "@/data/products.json";

export async function GET() {
  try {
    // Try Supabase first
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      const products = data.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: { en: p.title_en, ar: p.title_ar },
        description: { en: p.description_en, ar: p.description_ar },
        longDescription: { en: p.long_description_en, ar: p.long_description_ar },
        image: p.image,
        gallery: p.gallery || [],
        features: { en: p.features_en || [], ar: p.features_ar || [] },
        specifications: { en: p.specifications_en || {}, ar: p.specifications_ar || {} },
        category: p.category,
        featured: p.featured,
      }));
      return NextResponse.json({ products });
    }

    // Fallback to JSON
    return NextResponse.json({ products: productsJson.products });
  } catch {
    return NextResponse.json({ products: productsJson.products });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from("products")
      .insert({
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
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, product: data });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
