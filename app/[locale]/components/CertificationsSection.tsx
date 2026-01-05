'use client';

import { ScrollReveal } from './ScrollReveal';

interface Certification {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  year: string;
  icon: React.ReactNode;
}

interface CertificationsSectionProps {
  isRTL?: boolean;
}

export function CertificationsSection({ isRTL = false }: CertificationsSectionProps) {
  const certifications: Certification[] = [
    {
      id: 'sedex',
      name: 'SEDEX',
      nameAr: 'سيدكس',
      description: 'Supplier Ethical Data Exchange - Ensuring ethical supply chain practices and responsible sourcing.',
      descriptionAr: 'تبادل البيانات الأخلاقية للموردين - ضمان ممارسات سلسلة التوريد الأخلاقية والمصادر المسؤولة.',
      year: '2020',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'iso9001',
      name: 'ISO 9001:2015',
      nameAr: 'آيزو 9001:2015',
      description: 'Quality Management System certification ensuring consistent quality in manufacturing processes.',
      descriptionAr: 'شهادة نظام إدارة الجودة التي تضمن الجودة المستمرة في عمليات التصنيع.',
      year: '2021',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      id: 'oeko',
      name: 'OEKO-TEX',
      nameAr: 'أويكو-تكس',
      description: 'Standard 100 textile certification ensuring products are free from harmful substances.',
      descriptionAr: 'شهادة النسيج معيار 100 التي تضمن خلو المنتجات من المواد الضارة.',
      year: '2022',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'gots',
      name: 'GOTS',
      nameAr: 'جوتس',
      description: 'Global Organic Textile Standard for sustainable and organic textile production.',
      descriptionAr: 'المعيار العالمي للنسيج العضوي للإنتاج المستدام والعضوي.',
      year: '2023',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-alabaster-grey">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold text-true-cobalt mb-6 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
              {isRTL ? 'شهاداتنا' : 'Our Certifications'}
            </h2>
            <p className={`text-true-cobalt/70 text-lg max-w-3xl mx-auto ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
              {isRTL 
                ? 'نحن فخورون بحصولنا على شهادات دولية تؤكد التزامنا بأعلى معايير الجودة والاستدامة.'
                : 'We are proud to hold international certifications confirming our commitment to quality and sustainability.'
              }
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.id} delay={index * 100} direction="up">
              <div 
                className={`
                  group relative bg-white rounded-2xl p-8 
                  border border-true-cobalt/10 hover:border-royal-azure/30
                  transition-all duration-500 h-full
                  hover:-translate-y-2 hover:shadow-xl hover:shadow-royal-azure/10
                  ${isRTL ? 'text-right' : ''}
                `}
              >
                {/* Icon Container */}
                <div className={`mb-6 ${isRTL ? 'flex justify-end' : ''}`}>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-royal-azure/10 to-true-cobalt/5 flex items-center justify-center text-royal-azure group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-royal-azure group-hover:to-true-cobalt group-hover:text-white transition-all duration-500">
                    {cert.icon}
                  </div>
                </div>

                {/* Year Badge */}
                <div className={`inline-flex items-center gap-2 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-xs font-semibold text-royal-azure bg-royal-azure/10 px-3 py-1 rounded-full">
                    {cert.year}
                  </span>
                </div>

                {/* Content */}
                <h3 className={`text-xl font-bold text-true-cobalt mb-3 group-hover:text-royal-azure transition-colors duration-300 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                  {isRTL ? cert.nameAr : cert.name}
                </h3>
                
                <p className={`text-sm text-true-cobalt/60 leading-relaxed ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                  {isRTL ? cert.descriptionAr : cert.description}
                </p>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-royal-azure to-true-cobalt rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-${isRTL ? 'right' : 'left'}`} />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
