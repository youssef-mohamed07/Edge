'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ScrollReveal } from './ScrollReveal';

interface Client {
  id: string;
  name: string;
  logo: string;
  country: string;
  countryAr: string;
  description: string;
  descriptionAr: string;
  partnership: string;
  partnershipAr: string;
}

interface ClientsShowcaseProps {
  isRTL?: boolean;
}

export function ClientsShowcase({ isRTL = false }: ClientsShowcaseProps) {
  const [activeClient, setActiveClient] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const clients: Client[] = [
    {
      id: 'zara',
      name: 'Zara',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80',
      country: 'Spain',
      countryAr: 'إسبانيا',
      description: 'Leading fashion retailer with global presence',
      descriptionAr: 'متاجر أزياء رائدة مع حضور عالمي',
      partnership: 'Since 2015',
      partnershipAr: 'منذ 2015'
    },
    {
      id: 'hm',
      name: 'H&M',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80',
      country: 'Sweden',
      countryAr: 'السويد',
      description: 'Sustainable fashion for everyone',
      descriptionAr: 'أزياء مستدامة للجميع',
      partnership: 'Since 2017',
      partnershipAr: 'منذ 2017'
    },
    {
      id: 'uniqlo',
      name: 'Uniqlo',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80',
      country: 'Japan',
      countryAr: 'اليابان',
      description: 'Quality basics and innovative fabrics',
      descriptionAr: 'أساسيات عالية الجودة وأقمشة مبتكرة',
      partnership: 'Since 2019',
      partnershipAr: 'منذ 2019'
    },
    {
      id: 'gap',
      name: 'Gap',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80',
      country: 'USA',
      countryAr: 'الولايات المتحدة',
      description: 'American casual wear brand',
      descriptionAr: 'علامة تجارية أمريكية للملابس الكاجوال',
      partnership: 'Since 2020',
      partnershipAr: 'منذ 2020'
    },
    {
      id: 'levis',
      name: "Levi's",
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80',
      country: 'USA',
      countryAr: 'الولايات المتحدة',
      description: 'Original denim brand since 1853',
      descriptionAr: 'العلامة التجارية الأصلية للدنيم منذ 1853',
      partnership: 'Since 2021',
      partnershipAr: 'منذ 2021'
    },
    {
      id: 'tommy',
      name: 'Tommy Hilfiger',
      logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80',
      country: 'USA',
      countryAr: 'الولايات المتحدة',
      description: 'Premium American lifestyle brand',
      descriptionAr: 'علامة تجارية أمريكية فاخرة لأسلوب الحياة',
      partnership: 'Since 2022',
      partnershipAr: 'منذ 2022'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(clients.length / 3));
    }, 4000);

    return () => clearInterval(timer);
  }, [clients.length]);

  const visibleClients = clients.slice(currentSlide * 3, (currentSlide + 1) * 3);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#F8F9FB] to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className={`text-[#1A4AFF] text-sm font-semibold uppercase tracking-wider block mb-3 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
              {isRTL ? 'عملاؤنا وشركاؤنا' : 'OUR CLIENTS & PARTNERS'}
            </span>
            <h2 className={`text-3xl md:text-5xl font-bold text-[#122D8B] mb-6 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
              {isRTL ? 'نفخر بثقة العلامات العالمية' : 'Trusted by Global Brands'}
            </h2>
            <p className={`text-[#122D8B]/70 text-lg max-w-3xl mx-auto ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
              {isRTL 
                ? 'نعمل مع أكبر العلامات التجارية العالمية لتقديم منتجات عالية الجودة تلبي أعلى المعايير الدولية.'
                : 'We work with the world\'s leading brands to deliver high-quality products that meet the highest international standards.'
              }
            </p>
          </div>
        </ScrollReveal>

        {/* Clients Grid */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl p-8">
          <div className="grid md:grid-cols-3 gap-8 min-h-[300px]">
            {visibleClients.map((client, index) => (
              <ScrollReveal key={client.id} delay={index * 200} direction="up">
                <div 
                  className={`
                    group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 
                    shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer
                    hover:-translate-y-4 hover:scale-[1.02] border border-gray-100
                    ${activeClient === client.id ? 'ring-2 ring-[#1A4AFF] shadow-2xl shadow-[#1A4AFF]/20' : ''}
                    ${isRTL ? 'text-right' : ''}
                  `}
                  onClick={() => setActiveClient(activeClient === client.id ? null : client.id)}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1A4AFF]/5 to-[#60A5FA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  {/* Logo */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <h3 className={`text-xl font-bold text-[#122D8B] mb-2 group-hover:text-[#1A4AFF] transition-colors duration-300 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                      {client.name}
                    </h3>
                    
                    <div className={`flex items-center justify-center gap-2 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-4 h-4 rounded-full bg-[#1A4AFF]/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#1A4AFF]" />
                      </div>
                      <span className={`text-sm text-[#122D8B]/60 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                        {isRTL ? client.countryAr : client.country}
                      </span>
                    </div>

                    <p className={`text-sm text-[#1A4AFF] font-medium mb-4 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                      {isRTL ? client.partnershipAr : client.partnership}
                    </p>

                    {/* Expandable Description */}
                    <div className={`
                      transition-all duration-500 overflow-hidden
                      ${activeClient === client.id ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}
                    `}>
                      <div className="pt-4 border-t border-[#122D8B]/10">
                        <p className={`text-sm text-[#122D8B]/70 leading-relaxed ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                          {isRTL ? client.descriptionAr : client.description}
                        </p>
                      </div>
                    </div>

                    {/* Expand/Collapse Indicator */}
                    <div className="flex items-center justify-center mt-4">
                      <div className={`
                        w-6 h-6 rounded-full bg-[#1A4AFF]/10 flex items-center justify-center
                        group-hover:bg-[#1A4AFF]/20 transition-all duration-300
                        ${activeClient === client.id ? 'rotate-180' : ''}
                      `}>
                        <svg className="w-3 h-3 text-[#1A4AFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#1A4AFF]/20 transition-all duration-500" />
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(clients.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${currentSlide === index 
                    ? 'bg-[#1A4AFF] scale-125' 
                    : 'bg-[#1A4AFF]/30 hover:bg-[#1A4AFF]/50'
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <ScrollReveal delay={400}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { number: '50+', label: isRTL ? 'عميل عالمي' : 'Global Clients' },
              { number: '25+', label: isRTL ? 'دولة' : 'Countries' },
              { number: '15+', label: isRTL ? 'سنة خبرة' : 'Years Experience' },
              { number: '99%', label: isRTL ? 'رضا العملاء' : 'Client Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl lg:text-4xl font-bold text-[#122D8B] mb-2 group-hover:text-[#1A4AFF] transition-colors duration-300">
                  {stat.number}
                </div>
                <div className={`text-sm text-[#122D8B]/70 font-medium ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Call to Action */}
        <ScrollReveal delay={600}>
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-[#122D8B] to-[#1A4AFF] rounded-2xl px-8 py-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className={`font-semibold ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                {isRTL ? 'انضم إلى شركائنا' : 'Become Our Partner'}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}