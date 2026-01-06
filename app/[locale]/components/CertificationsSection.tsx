'use client';

import Image from 'next/image';
import { ScrollReveal } from './ScrollReveal';

interface Certification {
  id: string;
  name: string;
  nameAr: string;
  image: string;
}

interface CertificationsSectionProps {
  isRTL?: boolean;
}

export function CertificationsSection({ isRTL = false }: CertificationsSectionProps) {
  const certifications: Certification[] = [
    {
      id: 'smeta-sedex',
      name: 'SMETA 4-Pillar Certified',
      nameAr: 'شهادة SMETA 4-Pillar',
      image: '/assets/images/smeta-sedex.png'
    },
    {
      id: 'intertek-grs',
      name: 'Global Recycled Standard (GRS)',
      nameAr: 'المعيار العالمي للمواد المعاد تدويرها',
      image: '/assets/images/intertek-grs.png'
    },
    {
      id: 'iso-45001',
      name: 'ISO 45001:2018',
      nameAr: 'آيزو 45001:2018',
      image: '/assets/images/iso-45001.png'
    },
    {
      id: 'wrap-gold',
      name: 'WRAP Gold Certified',
      nameAr: 'شهادة WRAP الذهبية',
      image: '/assets/images/cert-wrap-gold.png'
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-alabaster-grey">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-true-cobalt mb-4 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
              {isRTL ? 'شهاداتنا واعتماداتنا' : 'Our Certifications'}
            </h2>
            <p className={`text-true-cobalt/70 text-lg max-w-2xl mx-auto ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
              {isRTL 
                ? 'نحن فخورون بحصولنا على شهادات دولية تؤكد التزامنا بأعلى معايير الجودة والاستدامة.'
                : 'We are proud to hold international certifications confirming our commitment to quality and sustainability.'
              }
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.id} delay={index * 100} direction="up">
              <div className="group flex flex-col items-center">
                {/* Certificate Image Container */}
                <div className="relative w-full aspect-[3/4] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300">
                  <Image
                    src={cert.image}
                    alt={isRTL ? cert.nameAr : cert.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                
                {/* Certificate Name */}
                <h3 className={`mt-4 text-center text-sm lg:text-base font-semibold text-true-cobalt ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                  {isRTL ? cert.nameAr : cert.name}
                </h3>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
