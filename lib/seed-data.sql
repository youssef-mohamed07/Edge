-- =============================================
-- EDGE Blog Database Setup & Seed Data
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. Create Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  excerpt_en TEXT NOT NULL,
  excerpt_ar TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  category_en VARCHAR(255) DEFAULT 'News',
  category_ar VARCHAR(255) DEFAULT 'أخبار',
  image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Insert Admin User (username: admin, password: admin123)
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO NOTHING;

-- 4. Insert Blog Posts Data
INSERT INTO blog_posts (slug, title_en, title_ar, excerpt_en, excerpt_ar, content_en, content_ar, category_en, category_ar, image, featured, gallery, created_at) VALUES

-- Post 1: Prime Minister Visit (Featured)
(
  'prime-minister-visit',
  'The Visit of the Prime Minister and the Governor of Port Said',
  'زيارة رئيس الوزراء ومحافظ بورسعيد',
  'The Prime Minister inspects the Edge factory for ready-to-wear clothes in Port Said.',
  'رئيس الوزراء يتفقد مصنع إيدج للملابس الجاهزة في بورسعيد.',
  'The prime minister inspects the "Edge" factory for ready-to-wear clothes in Port Said, and holds discussions with workers.

The Governor of Port Said was so proud of the youth of the industrial communities after their success in conquering their products on global markets.

During his visit to Port Said governorate today, Dr. Mustafa Madbouly, Prime Minister, his accompanying delegation, and Major General Adel Ghadhban, Governor of Port Said, inspected the "Edge" factory for ready-to-wear clothes in Port Said.

Company officials said: "Work began in the factory in 2016, with 200 workers, indicating that the production amounted to 900 thousand trousers annually, and part of the production is exported to Europe and the United States, and the remaining part is put on the local markets."

During his tour in the factory, the prime minister had conversations with a number of workers in the factory, including a female worker who obtained a prep certificate, and had worked in the factory for a year. And she added that the factory provides her with transportation.

Major General Adel Al-Ghadhban, Governor of Port Said, confirmed that the youth of the 58 factory project and the 54 factories had proven their worth after they had succeeded in invading their products to international markets shortly after they had received the factories.',
  'يتفقد رئيس الوزراء مصنع "إيدج" للملابس الجاهزة في بورسعيد، ويجري نقاشات مع العمال.

كان محافظ بورسعيد فخوراً جداً بشباب المجتمعات الصناعية بعد نجاحهم في غزو منتجاتهم للأسواق العالمية.

خلال زيارته لمحافظة بورسعيد اليوم، قام الدكتور مصطفى مدبولي، رئيس الوزراء، والوفد المرافق له، واللواء عادل الغضبان، محافظ بورسعيد، بتفقد مصنع "إيدج" للملابس الجاهزة في بورسعيد.

وقال مسؤولو الشركة: "بدأ العمل في المصنع عام 2016، بـ 200 عامل، مشيرين إلى أن الإنتاج بلغ 900 ألف بنطلون سنوياً، ويتم تصدير جزء من الإنتاج إلى أوروبا والولايات المتحدة، ويطرح الجزء المتبقي في الأسواق المحلية."

خلال جولته في المصنع، أجرى رئيس الوزراء محادثات مع عدد من العمال في المصنع، بما في ذلك عاملة حصلت على شهادة إعدادية، وعملت في المصنع لمدة عام. وأضافت أن المصنع يوفر لها وسائل النقل.

وأكد اللواء عادل الغضبان، محافظ بورسعيد، أن شباب مشروع الـ 58 مصنعاً والـ 54 مصنعاً قد أثبتوا جدارتهم بعد أن نجحوا في غزو منتجاتهم للأسواق الدولية بعد فترة وجيزة من استلامهم المصانع.',
  'News',
  'أخبار',
  'https://edgeforgarments.com/wp-content/uploads/2020/11/125231717_230544125072450_6821586552934938452_n.jpg',
  TRUE,
  ARRAY['https://edgeforgarments.com/wp-content/uploads/2020/11/124952895_230544231739106_7908619298259705222_n-300x181.jpg', 'https://edgeforgarments.com/wp-content/uploads/2020/11/125326618_230544251739104_7114983533161462777_n-300x260.jpg'],
  '2020-12-16 10:00:00+00'
),

-- Post 2: Committee Visit
(
  'committee-visit',
  'The Visit of the Distinguished Members of the Esteemed Committee',
  'زيارة الأعضاء المتميزين من اللجنة الموقرة',
  'The visit on the occasion of the inauguration of the new Edge Garment Factory.',
  'زيارة بمناسبة افتتاح مصنع إيدج الجديد للملابس.',
  'The visit of the distinguished members of the esteemed committee, which had the merit after God Almighty in choosing the owners of the factories of the 58 factory… as well as the owners of the 58 factories.

All this on the occasion of the inauguration of the new Edge Garment Factory in the 118 Factory Complex.

This momentous occasion marked a significant milestone in our journey of growth and expansion. The committee members toured the facility, observing our state-of-the-art production lines and meeting with our dedicated workforce.

The inauguration ceremony was attended by key stakeholders and industry leaders, all of whom expressed their confidence in Edge Garments commitment to quality and excellence in the garment manufacturing sector.',
  'زيارة الأعضاء المتميزين من اللجنة الموقرة، التي كان لها الفضل بعد الله تعالى في اختيار أصحاب مصانع الـ 58 مصنعاً... وكذلك أصحاب الـ 58 مصنعاً.

كل هذا بمناسبة افتتاح مصنع إيدج الجديد للملابس في مجمع الـ 118 مصنعاً.

شكلت هذه المناسبة الهامة علامة فارقة في رحلة نمونا وتوسعنا. قام أعضاء اللجنة بجولة في المنشأة، ولاحظوا خطوط الإنتاج الحديثة لدينا والتقوا بقوتنا العاملة المتفانية.

حضر حفل الافتتاح أصحاب المصلحة الرئيسيون وقادة الصناعة، وقد أعربوا جميعاً عن ثقتهم في التزام إيدج للملابس بالجودة والتميز في قطاع تصنيع الملابس.',
  'News',
  'أخبار',
  'https://edgeforgarments.com/wp-content/uploads/2020/12/87313942_157047515755445_671847753994731520_o.jpg',
  FALSE,
  ARRAY['https://edgeforgarments.com/wp-content/uploads/2020/12/87768389_157047709088759_3543045778056413184_o-300x225.jpg'],
  '2020-12-16 09:00:00+00'
),

-- Post 3: Governor Visit
(
  'governor-visit',
  'The Visit of Major General Adel Ghadhban, Governor of Port Said',
  'زيارة اللواء عادل الغضبان محافظ بورسعيد',
  'The visit of the Governor to the Edge Factory for Ready-Made Garments.',
  'زيارة المحافظ لمصنع إيدج للملابس الجاهزة.',
  'The visit of Major General Adel Ghadhban, Governor of Port Said, to the Edge Factory for Ready-Made Garments on February 18, 2020.

During his visit, the Governor toured the production facilities and met with factory management to discuss the companys contribution to the local economy and employment opportunities for the youth of Port Said.

The Governor expressed his appreciation for the quality of work being produced at the facility and commended the management for their commitment to providing stable employment for local workers.

This visit underscored the strong relationship between Edge Garments and the local government, highlighting our role as a key contributor to the industrial development of the Port Said region.',
  'زيارة اللواء عادل الغضبان، محافظ بورسعيد، لمصنع إيدج للملابس الجاهزة في 18 فبراير 2020.

خلال زيارته، قام المحافظ بجولة في مرافق الإنتاج والتقى بإدارة المصنع لمناقشة مساهمة الشركة في الاقتصاد المحلي وفرص العمل لشباب بورسعيد.

أعرب المحافظ عن تقديره لجودة العمل المنتج في المنشأة وأشاد بالإدارة لالتزامها بتوفير عمل مستقر للعمال المحليين.

أكدت هذه الزيارة على العلاقة القوية بين إيدج للملابس والحكومة المحلية، مما يسلط الضوء على دورنا كمساهم رئيسي في التنمية الصناعية لمنطقة بورسعيد.',
  'News',
  'أخبار',
  'https://edgeforgarments.com/wp-content/uploads/2020/11/87025445_1791634644305092_4180343608236310528_n.jpg',
  FALSE,
  ARRAY['https://edgeforgarments.com/wp-content/uploads/2020/11/86842068_1791634127638477_8843948724641071104_n.jpg', 'https://edgeforgarments.com/wp-content/uploads/2020/11/86490451_1791634260971797_7128620348047622144_n.jpg', 'https://edgeforgarments.com/wp-content/uploads/2020/11/86725992_1791634370971786_6716494201359433728_n.jpg'],
  '2020-11-12 10:00:00+00'
)

ON CONFLICT (slug) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_ar = EXCLUDED.title_ar,
  excerpt_en = EXCLUDED.excerpt_en,
  excerpt_ar = EXCLUDED.excerpt_ar,
  content_en = EXCLUDED.content_en,
  content_ar = EXCLUDED.content_ar,
  category_en = EXCLUDED.category_en,
  category_ar = EXCLUDED.category_ar,
  image = EXCLUDED.image,
  featured = EXCLUDED.featured,
  gallery = EXCLUDED.gallery;

-- 5. Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 6. Create Policies (Allow all operations for now)
DROP POLICY IF EXISTS "Allow all on blog_posts" ON blog_posts;
CREATE POLICY "Allow all on blog_posts" ON blog_posts FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow read on admin_users" ON admin_users;
CREATE POLICY "Allow read on admin_users" ON admin_users FOR SELECT USING (true);

-- 7. Verify Data
SELECT 'Admin Users:' as info;
SELECT * FROM admin_users;

SELECT 'Blog Posts:' as info;
SELECT id, slug, title_en, featured, created_at FROM blog_posts ORDER BY created_at DESC;
