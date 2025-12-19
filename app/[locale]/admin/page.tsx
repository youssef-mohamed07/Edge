"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: string;
  slug: string;
  title: { en: string; ar: string };
  excerpt: { en: string; ar: string };
  content: { en: string; ar: string };
  date: string;
  category: { en: string; ar: string };
  image: string;
  featured?: boolean;
}

interface Product {
  id: string;
  slug: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  image: string;
  category: string;
  featured?: boolean;
}

const translations = {
  en: {
    dashboard: "Dashboard",
    blog: "Blog Posts",
    products: "Products",
    totalPosts: "Total Posts",
    totalProducts: "Total Products",
    featuredPosts: "Featured",
    categories: "Categories",
    managePosts: "Manage Posts",
    manageProducts: "Manage Products",
    addNewPost: "Add New Post",
    addNewProduct: "Add New Product",
    title: "Title",
    category: "Category",
    date: "Date",
    featured: "Featured",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    confirmDelete: "Are you sure you want to delete this?",
    yes: "Delete",
    no: "Cancel",
    backToSite: "View Site",
    noPosts: "No posts found",
    noProducts: "No products found",
    search: "Search...",
    logout: "Logout",
  },
  ar: {
    dashboard: "لوحة التحكم",
    blog: "المقالات",
    products: "المنتجات",
    totalPosts: "إجمالي المقالات",
    totalProducts: "إجمالي المنتجات",
    featuredPosts: "مميزة",
    categories: "التصنيفات",
    managePosts: "إدارة المقالات",
    manageProducts: "إدارة المنتجات",
    addNewPost: "إضافة مقال",
    addNewProduct: "إضافة منتج",
    title: "العنوان",
    category: "التصنيف",
    date: "التاريخ",
    featured: "مميز",
    actions: "الإجراءات",
    edit: "تعديل",
    delete: "حذف",
    confirmDelete: "هل أنت متأكد من الحذف؟",
    yes: "حذف",
    no: "إلغاء",
    backToSite: "عرض الموقع",
    noPosts: "لا توجد مقالات",
    noProducts: "لا توجد منتجات",
    search: "بحث...",
    logout: "تسجيل الخروج",
  },
};

export default function AdminDashboard() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || "en";
  const isRTL = locale === "ar";
  const t = translations[locale as keyof typeof translations] || translations.en;

  const [activeTab, setActiveTab] = useState<"blog" | "products">("blog");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteType, setDeleteType] = useState<"blog" | "product">("blog");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchPosts();
    fetchProducts();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/check");
      if (!res.ok) router.push(`/${locale}/admin/login`);
    } catch {
      router.push(`/${locale}/admin/login`);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const endpoint = deleteType === "blog" ? `/api/blog/${id}` : `/api/products/${id}`;
      await fetch(endpoint, { method: "DELETE" });
      if (deleteType === "blog") {
        setPosts(posts.filter((p) => p.id !== id));
      } else {
        setProducts(products.filter((p) => p.id !== id));
      }
      setDeleteId(null);
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push(`/${locale}/admin/login`);
  };

  const filteredPosts = posts.filter((post) => {
    const title = isRTL ? post.title.ar : post.title.en;
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredProducts = products.filter((product) => {
    const title = isRTL ? product.title.ar : product.title.en;
    return title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const stats = {
    totalPosts: posts.length,
    totalProducts: products.length,
    featured: posts.filter((p) => p.featured).length,
    categories: [...new Set(posts.map((p) => (isRTL ? p.category.ar : p.category.en)))].length,
  };

  return (
    <div className={`min-h-screen bg-slate-50 ${isRTL ? "font-[var(--font-cairo)]" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <aside className={`fixed top-0 ${isRTL ? "right-0" : "left-0"} w-64 h-full bg-[#122D8B] text-white z-40 hidden lg:block`}>
        <div className="p-6">
          <Image src="/logo1.png" alt="EDGE" width={120} height={40} className="mb-8" />
        </div>
        
        <nav className="px-4">
          <button
            onClick={() => setActiveTab("blog")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${activeTab === "blog" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <span>{t.blog}</span>
          </button>
          
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${activeTab === "products" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5"}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>{t.products}</span>
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link href={`/${locale}`} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/5 hover:text-white transition-all mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>{t.backToSite}</span>
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>{t.logout}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`min-h-screen ${isRTL ? "lg:mr-64" : "lg:ml-64"}`}>
        <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="lg:hidden"><Image src="/logo1.png" alt="EDGE" width={100} height={35} /></div>
            <h1 className="text-xl font-bold text-slate-800 hidden lg:block">{t.dashboard}</h1>
            <div className="flex items-center gap-4">
              <button onClick={() => router.push(`/${locale === "ar" ? "en" : "ar"}/admin`)} className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all">
                {locale === "ar" ? "EN" : "AR"}
              </button>
              <button onClick={handleLogout} className="lg:hidden px-3 py-1.5 text-sm text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-all">
                {t.logout}
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm mb-1">{t.totalPosts}</p>
                  <p className="text-4xl font-bold text-slate-800">{stats.totalPosts}</p>
                </div>
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm mb-1">{t.totalProducts}</p>
                  <p className="text-4xl font-bold text-slate-800">{stats.totalProducts}</p>
                </div>
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm mb-1">{t.featuredPosts}</p>
                  <p className="text-4xl font-bold text-slate-800">{stats.featured}</p>
                </div>
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm mb-1">{t.categories}</p>
                  <p className="text-4xl font-bold text-slate-800">{stats.categories}</p>
                </div>
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-lg font-bold text-slate-800">{activeTab === "blog" ? t.managePosts : t.manageProducts}</h2>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1 md:w-64">
                    <input type="text" placeholder={t.search} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm" />
                    <svg className={`w-5 h-5 text-slate-400 absolute top-2.5 ${isRTL ? "left-3" : "right-3"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <Link href={`/${locale}/admin/${activeTab === "blog" ? "new" : "products/new"}`} className="px-5 py-2.5 bg-[#1A4AFF] text-white rounded-xl hover:bg-[#122D8B] transition-all font-medium text-sm flex items-center gap-2 whitespace-nowrap">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {activeTab === "blog" ? t.addNewPost : t.addNewProduct}
                  </Link>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-16 text-center">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                </div>
              ) : activeTab === "blog" ? (
                filteredPosts.length === 0 ? (
                  <div className="p-16 text-center"><p className="text-slate-500">{t.noPosts}</p></div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className={`px-6 py-4 text-${isRTL ? "right" : "left"} text-xs font-semibold text-slate-500 uppercase`}>{t.title}</th>
                        <th className={`px-6 py-4 text-${isRTL ? "right" : "left"} text-xs font-semibold text-slate-500 uppercase hidden md:table-cell`}>{t.category}</th>
                        <th className={`px-6 py-4 text-${isRTL ? "right" : "left"} text-xs font-semibold text-slate-500 uppercase hidden lg:table-cell`}>{t.date}</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 relative rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                                <Image src={post.image} alt="" fill className="object-cover" />
                              </div>
                              <p className="font-medium text-slate-800 truncate max-w-[200px]">{isRTL ? post.title.ar : post.title.en}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm">{isRTL ? post.category.ar : post.category.en}</span>
                          </td>
                          <td className="px-6 py-4 text-slate-500 text-sm hidden lg:table-cell">{post.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <Link href={`/${locale}/admin/edit/${post.id}`} className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              </Link>
                              <button onClick={() => { setDeleteId(post.id); setDeleteType("blog"); }} className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              ) : (
                filteredProducts.length === 0 ? (
                  <div className="p-16 text-center"><p className="text-slate-500">{t.noProducts}</p></div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className={`px-6 py-4 text-${isRTL ? "right" : "left"} text-xs font-semibold text-slate-500 uppercase`}>{t.title}</th>
                        <th className={`px-6 py-4 text-${isRTL ? "right" : "left"} text-xs font-semibold text-slate-500 uppercase hidden md:table-cell`}>{t.category}</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-500 uppercase">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 relative rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                                <Image src={product.image} alt="" fill className="object-cover" />
                              </div>
                              <p className="font-medium text-slate-800 truncate max-w-[200px]">{isRTL ? product.title.ar : product.title.en}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden md:table-cell">
                            <span className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm">{product.category}</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-center gap-2">
                              <Link href={`/${locale}/admin/products/edit/${product.id}`} className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              </Link>
                              <button onClick={() => { setDeleteId(product.id); setDeleteType("product"); }} className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-slate-800 text-center mb-2">{t.confirmDelete}</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-medium">{t.no}</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-medium">{t.yes}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
