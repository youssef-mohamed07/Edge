'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ScrollReveal } from './ScrollReveal';

interface Certification {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  year: string;
  issuer: string;
  issuerAr: string;
}

interface CertificationsSectionProps {
  isRTL?: boolean;
}

export function CertificationsSection({ isRTL = false }: CertificationsSectionProps) {
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const certifications: Certification[] = [
    {
      id: 'iso9001',
      name: 'ISO 9001:2015',
      nameAr: 'آيزو 9001:2015',
      description: 'Quality Management System certification ensuring consistent quality in our manufacturing processes.',
      descriptionAr: 'شهادة نظام إدارة الجودة التي تضمن الجودة المستمرة في عمليات التصنيع لدينا.',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80',
      year: '2020',
      issuer: 'International Organization for Standardization',
      issuerAr: 'المنظمة الدولية للمعايير'
    },
    {
      id: 'oeko',
      name: 'OEKO-TEX Standard 100',
      nameAr: 'معيار أويكو-تكس 100',
      description: 'Textile certification ensuring our products are free from harmful substances.',
      descriptionAr: 'شهادة النسيج التي تضمن خلو منتجاتنا من المواد الضارة.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&q=80',
      year: '2021',
      issuer: 'OEKO-TEX Association',
      issuerAr: 'جمعية أويكو-تكس'
    },
    {
      id: 'gots',
      name: 'GOTS Certification',
      nameAr: 'شهادة جوتس',
      description: 'Global Organic Textile Standard for sustainable and organic textile production.',
      descriptionAr: 'المعيار العالمي للنسيج العضوي للإنتاج المستدام والعضوي للنسيج.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80',
      year: '2022',
      issuer: 'Global Organic Textile Standard',
      issuerAr: 'المعيار العالمي للنسيج العضوي'
    },
    {
      id: 'bsci',
      name: 'BSCI Certification',
      nameAr: 'شهادة بي إس سي آي',
      description: 'Business Social Compliance Initiative ensuring ethical working conditions.',
      descriptionAr: 'مبادرة الامتثال الاجتماعي للأعمال التي تضمن ظروف العمل الأخلاقية.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80',
      year: '2023',
      issuer: 'Foreign Trade Association',
      issuerAr: 'جمعية التجارة الخارجية'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className={`text-royal-azure text-sm font-semibold uppercase tracking-wider block mb-3 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
              {isRTL ? 'الشهادات والجوائز' : 'CERTIFICATIONS & AWARDS'}
            </span>
            <h2 className={`text-3xl md:text-5xl font-bold text-true-cobalt mb-6 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
              {isRTL ? 'معتمدون عالمياً' : 'Globally Certified'}
            </h2>
            <p className={`text-true-cobalt/70 text-lg max-w-3xl mx-auto ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
              {isRTL 
                ? 'نحن فخورون بحصولنا على شهادات دولية تؤكد التزامنا بأعلى معايير الجودة والاستدامة والمسؤولية الاجتماعية.'
                : 'We are proud to hold international certifications that confirm our commitment to the highest standards of quality, sustainability, and social responsibility.'
              }
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.id} delay={index * 150} direction="up">
              <div 
                className={`
                  group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl 
                  transition-all duration-500 cursor-pointer overflow-hidden
                  hover:-translate-y-4 hover:scale-[1.02]
                  ${selectedCert === cert.id ? 'ring-2 ring-royal-azure shadow-2xl shadow-royal-azure/20' : ''}
                  ${isRTL ? 'text-right' : ''}
                `}
                onClick={() => setSelectedCert(selectedCert === cert.id ? null : cert.id)}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-royal-azure/5 to-[#60A5FA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Image */}
                <div className="relative h-32 mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={cert.image}
                    alt={isRTL ? cert.nameAr : cert.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-true-cobalt/60 to-transparent" />
                  
                  {/* Year Badge */}
                  <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} bg-white/90 backdrop-blur-sm rounded-full px-3 py-1`}>
                    <span className="text-xs font-bold text-true-cobalt">{cert.year}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className={`text-lg font-bold text-true-cobalt mb-2 group-hover:text-royal-azure transition-colors duration-300 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                    {isRTL ? cert.nameAr : cert.name}
                  </h3>
                  
                  <p className={`text-sm text-true-cobalt/60 mb-4 leading-relaxed ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                    {isRTL ? cert.issuerAr : cert.issuer}
                  </p>

                  {/* Expandable Description */}
                  <div className={`
                    transition-all duration-500 overflow-hidden
                    ${selectedCert === cert.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                    <div className="pt-4 border-t border-true-cobalt/10">
                      <p className={`text-sm text-true-cobalt/70 leading-relaxed ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                        {isRTL ? cert.descriptionAr : cert.description}
                      </p>
                    </div>
                  </div>

                  {/* Expand/Collapse Indicator */}
                  <div className={`flex items-center justify-center mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`
                      w-6 h-6 rounded-full bg-royal-azure/10 flex items-center justify-center
                      group-hover:bg-royal-azure/20 transition-all duration-300
                      ${selectedCert === cert.id ? 'rotate-180' : ''}
                    `}>
                      <svg className="w-3 h-3 text-royal-azure" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-royal-azure/20 transition-all duration-500" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Call to Action */}
        <ScrollReveal delay={600}>
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-true-cobalt to-royal-azure rounded-2xl px-8 py-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className={`font-semibold ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                {isRTL ? 'اطلب شهادات مفصلة' : 'Request Detailed Certificates'}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}