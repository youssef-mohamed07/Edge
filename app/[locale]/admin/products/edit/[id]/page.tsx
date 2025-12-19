"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const translations = {
  en: {
    editProduct: "Edit Product",
    basicInfo: "Basic Information",
    titleEn: "Title (English)",
    titleAr: "Title (Arabic)",
    descEn: "Description (English)",
    descAr: "Description (Arabic)",
    longDescEn: "Long Description (English)",
    longDescAr: "Long Description (Arabic)",
    slug: "Slug (URL)",
    category: "Category",
    media: "Main Image",
    gallery: "Photo Gallery",
    galleryDesc: "Add additional images to the product gallery",
    features: "Features",
    featuresEn: "Features (English)",
    featuresAr: "Features (Arabic)",
    featuresPlaceholder: "One feature per line",
    specs: "Specifications",
    specsEn: "Specifications (English)",
    specsAr: "Specifications (Arabic)",
    specsPlaceholder: "Key: Value (one per line)",
    featured: "Mark as Featured Product",
    save: "Update Product",
    cancel: "Cancel",
    saving: "Saving...",
    uploading: "Uploading...",
    loading: "Loading...",
    dragDrop: "Drag and drop an image here, or click to select",
    dragDropGallery: "Drag and drop images here, or click to add",
    maxSize: "Maximum file size: 5MB",
    removeImage: "Remove",
  },
  ar: {
    editProduct: "تعديل المنتج",
    basicInfo: "المعلومات الأساسية",
    titleEn: "العنوان (إنجليزي)",
    titleAr: "العنوان (عربي)",
    descEn: "الوصف (إنجليزي)",
    descAr: "الوصف (عربي)",
    longDescEn: "الوصف المفصل (إنجليزي)",
    longDescAr: "الوصف المفصل (عربي)",
    slug: "الرابط (URL)",
    category: "التصنيف",
    media: "الصورة الرئيسية",
    gallery: "معرض الصور",
    galleryDesc: "أضف صور إضافية لمعرض المنتج",
    features: "المميزات",
    featuresEn: "المميزات (إنجليزي)",
    featuresAr: "المميزات (عربي)",
    featuresPlaceholder: "ميزة واحدة في كل سطر",
    specs: "المواصفات",
    specsEn: "المواصفات (إنجليزي)",
    specsAr: "المواصفات (عربي)",
    specsPlaceholder: "المفتاح: القيمة (واحدة في كل سطر)",
    featured: "تحديد كمنتج مميز",
    save: "تحديث المنتج",
    cancel: "إلغاء",
    saving: "جاري الحفظ...",
    uploading: "جاري الرفع...",
    loading: "جاري التحميل...",
    dragDrop: "اسحب وأفلت صورة هنا، أو انقر للاختيار",
    dragDropGallery: "اسحب وأفلت صور هنا، أو انقر للإضافة",
    maxSize: "الحد الأقصى لحجم الملف: 5 ميجابايت",
    removeImage: "إزالة",
  },
};

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "en";
  const productId = params.id as string;
  const isRTL = locale === "ar";
  const t = translations[locale as keyof typeof translations] || translations.en;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [dragActiveGallery, setDragActiveGallery] = useState(false);
  const [formData, setFormData] = useState({
    titleEn: "", titleAr: "", descEn: "", descAr: "",
    longDescEn: "", longDescAr: "", slug: "", category: "bottoms",
    image: "", gallery: [] as string[],
    featuresEn: "", featuresAr: "", specsEn: "", specsAr: "",
    featured: false,
  });

  useEffect(() => { checkAuth(); fetchProduct(); }, [productId]);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/check");
      if (!res.ok) router.push(`/${locale}/admin/login`);
    } catch { router.push(`/${locale}/admin/login`); }
  };

  const specsToString = (specs: Record<string, string>) => Object.entries(specs || {}).map(([k, v]) => `${k}: ${v}`).join("\n");

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();
      if (data.product) {
        const p = data.product;
        setFormData({
          titleEn: p.title?.en || "", titleAr: p.title?.ar || "",
          descEn: p.description?.en || "", descAr: p.description?.ar || "",
          longDescEn: p.longDescription?.en || "", longDescAr: p.longDescription?.ar || "",
          slug: p.slug || "", category: p.category || "bottoms", image: p.image || "",
          gallery: p.gallery || [],
          featuresEn: (p.features?.en || []).join("\n"), featuresAr: (p.features?.ar || []).join("\n"),
          specsEn: specsToString(p.specifications?.en), specsAr: specsToString(p.specifications?.ar),
          featured: p.featured || false,
        });
      }
    } catch (error) { console.error("Error:", error); }
    finally { setPageLoading(false); }
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formDataUpload });
      if (res.ok) { const data = await res.json(); setFormData({ ...formData, image: data.url }); }
    } catch (error) { console.error("Upload error:", error); }
    finally { setUploading(false); }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleImageUpload(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleImageUpload(e.target.files[0]);
  };

  const handleGalleryUpload = async (files: FileList) => {
    setUploadingGallery(true);
    const newImages: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const formDataUpload = new FormData();
      formDataUpload.append("file", files[i]);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: formDataUpload });
        if (res.ok) { const data = await res.json(); newImages.push(data.url); }
      } catch (error) { console.error("Upload error:", error); }
    }
    setFormData({ ...formData, gallery: [...formData.gallery, ...newImages] });
    setUploadingGallery(false);
  };

  const handleGalleryDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActiveGallery(true);
    else if (e.type === "dragleave") setDragActiveGallery(false);
  };

  const handleGalleryDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setDragActiveGallery(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleGalleryUpload(e.dataTransfer.files);
  };

  const handleGalleryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) handleGalleryUpload(e.target.files);
  };

  const removeGalleryImage = (index: number) => {
    setFormData({ ...formData, gallery: formData.gallery.filter((_, i) => i !== index) });
  };

  const parseSpecs = (text: string) => {
    const specs: Record<string, string> = {};
    text.split("\n").forEach((line) => {
      const idx = line.indexOf(":");
      if (idx > 0) { specs[line.substring(0, idx).trim()] = line.substring(idx + 1).trim(); }
    });
    return specs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: formData.slug,
          title: { en: formData.titleEn, ar: formData.titleAr },
          description: { en: formData.descEn, ar: formData.descAr },
          longDescription: { en: formData.longDescEn, ar: formData.longDescAr },
          image: formData.image,
          gallery: formData.gallery,
          features: { en: formData.featuresEn.split("\n").filter(Boolean), ar: formData.featuresAr.split("\n").filter(Boolean) },
          specifications: { en: parseSpecs(formData.specsEn), ar: parseSpecs(formData.specsAr) },
          category: formData.category,
          featured: formData.featured,
        }),
      });
      if (res.ok) router.push(`/${locale}/admin`);
    } catch (error) { console.error("Error:", error); }
    finally { setLoading(false); }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-50 ${isRTL ? "font-[var(--font-cairo)]" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/admin`} className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all">
              <svg className={`w-5 h-5 ${isRTL ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-slate-800">{t.editProduct}</h1>
          </div>
          <button onClick={() => router.push(`/${locale === "ar" ? "en" : "ar"}/admin/products/edit/${productId}`)} className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all">
            {locale === "ar" ? "EN" : "AR"}
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Image Upload */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">{t.media}</h2>
            {formData.image ? (
              <div className="relative">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
                  <Image src={formData.image} alt="Preview" fill className="object-cover" />
                </div>
                <button type="button" onClick={() => setFormData({ ...formData, image: "" })} className="absolute top-3 right-3 px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-all">
                  {t.removeImage}
                </button>
              </div>
            ) : (
              <div className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${dragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"}`}
                onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                {uploading ? (
                  <div><div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p className="text-slate-600">{t.uploading}</p></div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                    <p className="text-slate-700 font-medium mb-1">{t.dragDrop}</p>
                    <p className="text-slate-500 text-sm">{t.maxSize}</p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Gallery */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-800">{t.gallery}</h2>
              <p className="text-sm text-slate-500 mt-1">{t.galleryDesc}</p>
            </div>
            {formData.gallery.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {formData.gallery.map((img, index) => (
                  <div key={index} className="relative group aspect-square rounded-xl overflow-hidden bg-slate-100">
                    <Image src={img} alt={`Gallery ${index + 1}`} fill className="object-cover" />
                    <button type="button" onClick={() => removeGalleryImage(index)} className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${dragActiveGallery ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"}`}
              onDragEnter={handleGalleryDrag} onDragLeave={handleGalleryDrag} onDragOver={handleGalleryDrag} onDrop={handleGalleryDrop} onClick={() => galleryInputRef.current?.click()}>
              <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGalleryFileChange} className="hidden" />
              {uploadingGallery ? (
                <div><div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div><p className="text-slate-600 text-sm">{t.uploading}</p></div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <p className="text-slate-600 text-sm">{t.dragDropGallery}</p>
                </>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">{t.basicInfo}</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.titleEn}</label>
                  <input type="text" required value={formData.titleEn} onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.titleAr}</label>
                  <input type="text" required value={formData.titleAr} onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" dir="rtl" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.slug}</label>
                  <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.category}</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    <option value="bottoms">Bottoms</option>
                    <option value="tops">Tops</option>
                    <option value="outerwear">Outerwear</option>
                    <option value="workwear">Workwear</option>
                    <option value="custom">Custom</option>
                    <option value="services">Services</option>
                  </select>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.descEn}</label>
                  <textarea required rows={3} value={formData.descEn} onChange={(e) => setFormData({ ...formData, descEn: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.descAr}</label>
                  <textarea required rows={3} value={formData.descAr} onChange={(e) => setFormData({ ...formData, descAr: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" dir="rtl" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.longDescEn}</label>
                  <textarea required rows={5} value={formData.longDescEn} onChange={(e) => setFormData({ ...formData, longDescEn: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" dir="ltr" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">{t.longDescAr}</label>
                  <textarea required rows={5} value={formData.longDescAr} onChange={(e) => setFormData({ ...formData, longDescAr: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" dir="rtl" />
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">{t.features}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.featuresEn}</label>
                <textarea rows={5} value={formData.featuresEn} onChange={(e) => setFormData({ ...formData, featuresEn: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder={t.featuresPlaceholder} dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.featuresAr}</label>
                <textarea rows={5} value={formData.featuresAr} onChange={(e) => setFormData({ ...formData, featuresAr: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder={t.featuresPlaceholder} dir="rtl" />
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-6">{t.specs}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.specsEn}</label>
                <textarea rows={5} value={formData.specsEn} onChange={(e) => setFormData({ ...formData, specsEn: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder={t.specsPlaceholder} dir="ltr" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">{t.specsAr}</label>
                <textarea rows={5} value={formData.specsAr} onChange={(e) => setFormData({ ...formData, specsAr: e.target.value })} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none" placeholder={t.specsPlaceholder} dir="rtl" />
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl mt-6">
              <input type="checkbox" id="featured" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500" />
              <label htmlFor="featured" className="text-sm font-medium text-slate-700 cursor-pointer">{t.featured}</label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link href={`/${locale}/admin`} className="px-6 py-3 bg-white border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-medium">{t.cancel}</Link>
            <button type="submit" disabled={loading || !formData.image} className="px-8 py-3 bg-[#1A4AFF] text-white rounded-xl hover:bg-[#122D8B] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? t.saving : t.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
