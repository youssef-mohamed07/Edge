"use client";

import { SectionHeader } from "../components/ui";
import { LocationIcon, PhoneIcon, EmailIcon, WhatsAppIcon } from "../components/Icons";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 lg:py-32" style={{ backgroundColor: "#122D8B" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form Side */}
          <div>
            <SectionHeader title="Request a Quote" centered={false} light />
            <p className="text-white/70 mb-8 -mt-12">
              Ready to start your project? Get in touch with our team.
            </p>

            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#1A4AFF] focus:bg-white/15 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Company</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#1A4AFF] focus:bg-white/15 transition-colors"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#1A4AFF] focus:bg-white/15 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#1A4AFF] focus:bg-white/15 transition-colors"
                    placeholder="+20 xxx xxx xxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/80 text-sm mb-2">Message *</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#1A4AFF] focus:bg-white/15 transition-colors resize-none"
                  placeholder="Tell us about your project requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-[#1A4AFF] text-white font-semibold tracking-wide hover:bg-[#0A1D5A] transition-colors"
              >
                Get a Quote
              </button>
            </form>
          </div>

          {/* Contact Info Side */}
          <div className="lg:pl-12">
            <div className="bg-white/5 p-8 border border-white/10 mb-8">
              <h3
                className="text-xl text-white mb-6 font-bold uppercase tracking-wide"
                style={{ fontFamily: "'Arial Black', 'Bebas Neue', sans-serif" }}
              >
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <LocationIcon className="w-6 h-6 text-[#1A4AFF] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium mb-1">Address</p>
                    <p className="text-white/60 text-sm">
                      Port Said Free Zone
                      <br />
                      Port Said, Egypt
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <WhatsAppIcon className="w-6 h-6 text-[#1A4AFF] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium mb-1">WhatsApp</p>
                    <a
                      href="https://wa.me/20xxxxxxxxxx"
                      className="text-white/60 text-sm hover:text-[#1A4AFF] transition-colors"
                    >
                      +20 xxx xxx xxxx
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <EmailIcon className="w-6 h-6 text-[#1A4AFF] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium mb-1">Email</p>
                    <a
                      href="mailto:info@edgegarments.com"
                      className="text-white/60 text-sm hover:text-[#1A4AFF] transition-colors"
                    >
                      info@edgegarments.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <PhoneIcon className="w-6 h-6 text-[#1A4AFF] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-white font-medium mb-1">Phone</p>
                    <a
                      href="tel:+20xxxxxxxxxx"
                      className="text-white/60 text-sm hover:text-[#1A4AFF] transition-colors"
                    >
                      +20 xxx xxx xxxx
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div
              className="aspect-video border border-white/10 relative overflow-hidden"
              style={{ backgroundColor: "#0A1D5A" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <LocationIcon className="w-10 h-10 text-white/20 mx-auto mb-2" />
                  <p className="text-white/30 text-sm">Map Location</p>
                </div>
              </div>
              {/* Simple Map Grid Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-white/20" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
