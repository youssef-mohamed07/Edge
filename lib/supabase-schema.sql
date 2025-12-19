-- Run this SQL in your Supabase SQL Editor to create the tables

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: admin123)
-- Using simple hash for demo - in production use proper bcrypt
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO NOTHING;

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  excerpt_en TEXT NOT NULL,
  excerpt_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  category_en VARCHAR(255) NOT NULL DEFAULT 'News',
  category_ar VARCHAR(255) NOT NULL DEFAULT 'أخبار',
  image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample blog posts
INSERT INTO blog_posts (slug, title_en, title_ar, excerpt_en, excerpt_ar, content_en, content_ar, category_en, category_ar, image, featured) VALUES
(
  'prime-minister-visit',
  'The Visit of the Prime Minister and the Governor of Port Said',
  'زيارة رئيس الوزراء ومحافظ بورسعيد',
  'The Prime Minister inspects the Edge factory for ready-to-wear clothes in Port Said.',
  'رئيس الوزراء يتفقد مصنع إيدج للملابس الجاهزة في بورسعيد.',
  'The prime minister inspects the "Edge" factory for ready-to-wear clothes in Port Said, and holds discussions with workers. The Governor of Port Said was so proud of the youth of the industrial communities after their success in conquering their products on global markets.',
  'يتفقد رئيس الوزراء مصنع "إيدج" للملابس الجاهزة في بورسعيد، ويجري نقاشات مع العمال. كان محافظ بورسعيد فخوراً جداً بشباب المجتمعات الصناعية بعد نجاحهم في غزو منتجاتهم للأسواق العالمية.',
  'News',
  'أخبار',
  'https://edgeforgarments.com/wp-content/uploads/2020/11/125231717_230544125072450_6821586552934938452_n.jpg',
  TRUE
),
(
  'committee-visit',
  'The Visit of the Distinguished Members of the Esteemed Committee',
  'زيارة الأعضاء المتميزين من اللجنة الموقرة',
  'The visit on the occasion of the inauguration of the new Edge Garment Factory.',
  'زيارة بمناسبة افتتاح مصنع إيدج الجديد للملابس.',
  'The visit of the distinguished members of the esteemed committee on the occasion of the inauguration of the new Edge Garment Factory in the 118 Factory Complex.',
  'زيارة الأعضاء المتميزين من اللجنة الموقرة بمناسبة افتتاح مصنع إيدج الجديد للملابس في مجمع الـ 118 مصنعاً.',
  'News',
  'أخبار',
  'https://edgeforgarments.com/wp-content/uploads/2020/12/87313942_157047515755445_671847753994731520_o.jpg',
  FALSE
),
(
  'governor-visit',
  'The Visit of Major General Adel Ghadhban, Governor of Port Said',
  'زيارة اللواء عادل الغضبان محافظ بورسعيد',
  'The visit of the Governor to the Edge Factory for Ready-Made Garments.',
  'زيارة المحافظ لمصنع إيدج للملابس الجاهزة.',
  'The visit of Major General Adel Ghadhban, Governor of Port Said, to the Edge Factory for Ready-Made Garments on February 18, 2020.',
  'زيارة اللواء عادل الغضبان، محافظ بورسعيد، لمصنع إيدج للملابس الجاهزة في 18 فبراير 2020.',
  'News',
  'أخبار',
  'https://edgeforgarments.com/wp-content/uploads/2020/11/87025445_1791634644305092_4180343608236310528_n.jpg',
  FALSE
)
ON CONFLICT (slug) DO NOTHING;

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ar TEXT NOT NULL,
  long_description_en TEXT NOT NULL,
  long_description_ar TEXT NOT NULL,
  image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  features_en TEXT[] DEFAULT '{}',
  features_ar TEXT[] DEFAULT '{}',
  specifications_en JSONB DEFAULT '{}',
  specifications_ar JSONB DEFAULT '{}',
  category VARCHAR(255) NOT NULL DEFAULT 'general',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to blog posts
CREATE POLICY "Public can read blog posts" ON blog_posts
  FOR SELECT USING (true);

-- Create policy for authenticated operations (you may need to adjust based on your auth setup)
CREATE POLICY "Allow all operations on blog posts" ON blog_posts
  FOR ALL USING (true);

CREATE POLICY "Allow read admin users" ON admin_users
  FOR SELECT USING (true);

-- Create policies for products
CREATE POLICY "Public can read products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow all operations on products" ON products
  FOR ALL USING (true);
