'use client';

import { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';

interface ProcessStep {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: React.ReactNode;
  duration: string;
  durationAr: string;
  details: string[];
  detailsAr: string[];
}

interface ProductionProcessProps {
  isRTL?: boolean;
}

export function ProductionProcess({ isRTL = false }: ProductionProcessProps) {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const processSteps: ProcessStep[] = [
    {
      id: 'design',
      title: 'Design & Planning',
      titleAr: 'التصميم والتخطيط',
      description: 'Creating detailed designs and production plans based on client requirements.',
      descriptionAr: 'إنشاء تصاميم مفصلة وخطط إنتاج بناءً على متطلبات العميل.',
      duration: '2-3 Days',
      durationAr: '2-3 أيام',
      details: [
        'Pattern development',
        'Material selection',
        'Color matching',
        'Size grading'
      ],
      detailsAr: [
        'تطوير الباترون',
        'اختيار المواد',
        'مطابقة الألوان',
        'تدريج المقاسات'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      )
    },
    {
      id: 'cutting',
      title: 'Cutting',
      titleAr: 'القص',
      description: 'Precision cutting of fabric pieces using advanced cutting machinery.',
      descriptionAr: 'قص دقيق لقطع القماش باستخدام آلات القص المتقدمة.',
      duration: '1-2 Days',
      durationAr: '1-2 يوم',
      details: [
        'Automated cutting systems',
        'Quality control checks',
        'Waste minimization',
        'Piece identification'
      ],
      detailsAr: [
        'أنظمة القص الآلية',
        'فحوصات مراقبة الجودة',
        'تقليل الهدر',
        'تحديد القطع'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-10V4a2 2 0 00-2-2H5a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2V4z" />
        </svg>
      )
    },
    {
      id: 'embroidery',
      title: 'Embroidery & Printing',
      titleAr: 'التطريز والطباعة',
      description: 'Adding decorative elements, logos, and designs through embroidery and printing.',
      descriptionAr: 'إضافة العناصر الزخرفية والشعارات والتصاميم من خلال التطريز والطباعة.',
      duration: '2-4 Days',
      durationAr: '2-4 أيام',
      details: [
        'Computer-controlled embroidery',
        'Screen printing',
        'Heat transfer',
        'Quality inspection'
      ],
      detailsAr: [
        'التطريز المحوسب',
        'الطباعة الحريرية',
        'النقل الحراري',
        'فحص الجودة'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
        </svg>
      )
    },
    {
      id: 'sewing',
      title: 'Sewing & Assembly',
      titleAr: 'الخياطة والتجميع',
      description: 'Expert sewing and assembly of garments by skilled craftspeople.',
      descriptionAr: 'خياطة وتجميع الملابس بخبرة من قبل حرفيين مهرة.',
      duration: '3-5 Days',
      durationAr: '3-5 أيام',
      details: [
        'Skilled seamstresses',
        'Quality stitching',
        'Reinforced seams',
        'Precision assembly'
      ],
      detailsAr: [
        'خياطات ماهرات',
        'خياطة عالية الجودة',
        'درزات معززة',
        'تجميع دقيق'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      )
    },
    {
      id: 'washing',
      title: 'Washing & Treatment',
      titleAr: 'الغسيل والمعالجة',
      description: 'Professional washing and treatment processes for desired finish and feel.',
      descriptionAr: 'عمليات غسيل ومعالجة احترافية للحصول على اللمسة النهائية المرغوبة.',
      duration: '1-3 Days',
      durationAr: '1-3 يوم',
      details: [
        'Stone washing',
        'Enzyme treatment',
        'Color enhancement',
        'Softening processes'
      ],
      detailsAr: [
        'الغسيل الحجري',
        'المعالجة بالإنزيمات',
        'تعزيز الألوان',
        'عمليات التنعيم'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: 'finishing',
      title: 'Finishing & QC',
      titleAr: 'التشطيب ومراقبة الجودة',
      description: 'Final finishing touches and comprehensive quality control inspection.',
      descriptionAr: 'اللمسات الأخيرة للتشطيب وفحص شامل لمراقبة الجودة.',
      duration: '1-2 Days',
      durationAr: '1-2 يوم',
      details: [
        'Final pressing',
        'Quality inspection',
        'Packaging preparation',
        'Shipping coordination'
      ],
      detailsAr: [
        'الكي النهائي',
        'فحص الجودة',
        'تحضير التعبئة',
        'تنسيق الشحن'
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className={`text-royal-azure text-sm font-semibold uppercase tracking-wider block mb-3 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
              {isRTL ? 'العملية الإنتاجية' : 'PRODUCTION PROCESS'}
            </span>
            <h2 className={`text-3xl md:text-5xl font-bold text-true-cobalt mb-6 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
              {isRTL ? 'من التصميم إلى التسليم' : 'From Design to Delivery'}
            </h2>
            <p className={`text-true-cobalt/70 text-lg max-w-3xl mx-auto ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
              {isRTL 
                ? 'عملية إنتاج متطورة تضمن أعلى معايير الجودة في كل خطوة من خطوات التصنيع.'
                : 'An advanced production process ensuring the highest quality standards at every step of manufacturing.'
              }
            </p>
          </div>
        </ScrollReveal>

        {/* Process Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-royal-azure to-[#60A5FA] rounded-full" />

          <div className="space-y-16">
            {processSteps.map((step, index) => (
              <ScrollReveal key={step.id} delay={index * 200} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? (isRTL ? 'text-left' : 'text-right') : (isRTL ? 'text-right' : 'text-left')}`}>
                    <div 
                      className={`
                        group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl 
                        transition-all duration-500 cursor-pointer border border-gray-100
                        hover:-translate-y-2 hover:scale-[1.02]
                        ${activeStep === step.id ? 'ring-2 ring-royal-azure shadow-2xl shadow-royal-azure/20' : ''}
                      `}
                      onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                    >
                      {/* Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-royal-azure/5 to-[#60A5FA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                      
                      <div className="relative z-10">
                        {/* Header */}
                        <div className={`flex items-center gap-4 mb-4 ${index % 2 === 0 ? (isRTL ? 'flex-row' : 'flex-row-reverse') : (isRTL ? 'flex-row-reverse' : 'flex-row')}`}>
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-true-cobalt to-royal-azure flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                            {step.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-xl font-bold text-true-cobalt group-hover:text-royal-azure transition-colors duration-300 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                              {isRTL ? step.titleAr : step.title}
                            </h3>
                            <p className={`text-sm text-royal-azure font-medium ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                              {isRTL ? step.durationAr : step.duration}
                            </p>
                          </div>
                        </div>

                        {/* Description */}
                        <p className={`text-true-cobalt/70 mb-4 leading-relaxed ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                          {isRTL ? step.descriptionAr : step.description}
                        </p>

                        {/* Expandable Details */}
                        <div className={`
                          transition-all duration-500 overflow-hidden
                          ${activeStep === step.id ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}
                        `}>
                          <div className="pt-4 border-t border-true-cobalt/10">
                            <h4 className={`text-sm font-semibold text-true-cobalt mb-3 ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                              {isRTL ? 'التفاصيل:' : 'Details:'}
                            </h4>
                            <ul className="space-y-2">
                              {(isRTL ? step.detailsAr : step.details).map((detail, detailIndex) => (
                                <li key={detailIndex} className={`flex items-center gap-2 text-sm text-true-cobalt/70 ${isRTL ? 'flex-row-reverse font-[var(--font-cairo)]' : ''}`}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-royal-azure" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Expand/Collapse Indicator */}
                        <div className={`flex items-center justify-center mt-4`}>
                          <div className={`
                            w-6 h-6 rounded-full bg-royal-azure/10 flex items-center justify-center
                            group-hover:bg-royal-azure/20 transition-all duration-300
                            ${activeStep === step.id ? 'rotate-180' : ''}
                          `}>
                            <svg className="w-3 h-3 text-royal-azure" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-full bg-white border-4 border-royal-azure shadow-lg">
                      <div className="w-full h-full rounded-full bg-royal-azure animate-pulse" />
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <ScrollReveal delay={800}>
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-true-cobalt to-royal-azure rounded-2xl px-8 py-4 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className={`font-semibold ${isRTL ? 'font-[var(--font-cairo)]' : ''}`}>
                {isRTL ? 'جولة في المصنع' : 'Factory Tour'}
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}