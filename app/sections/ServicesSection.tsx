
import { SectionHeader, Button } from "../components/ui";
import {
  FabricInspectionIcon,
  CuttingIcon,
  SewingIcon,
  WashingIcon,
  EmbroideryIcon,
  PackagingIcon,
} from "../components/Icons";

const services = [
  {
    icon: FabricInspectionIcon,
    title: "Fabric Inspection",
    description: "Rigorous quality checks on all incoming materials to ensure premium standards.",
  },
  {
    icon: CuttingIcon,
    title: "Cutting",
    description: "Precision cutting with advanced machinery for accurate patterns and minimal waste.",
  },
  {
    icon: SewingIcon,
    title: "Sewing",
    description: "Expert stitching by skilled craftsmen using industrial-grade equipment.",
  },
  {
    icon: WashingIcon,
    title: "Washing",
    description: "Specialized washing techniques for desired finishes and fabric treatment.",
  },
  {
    icon: EmbroideryIcon,
    title: "Embroidery & Printing",
    description: "Custom embroidery and printing services for branding and design elements.",
  },
  {
    icon: PackagingIcon,
    title: "Packaging & Final QC",
    description: "Comprehensive quality control and professional packaging for delivery.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32" style={{ backgroundColor: "#F8F9FB" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeader
          title="Our Production Cycle"
          subtitle="A complete end-to-end manufacturing process designed for quality and efficiency."
        />

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-white p-8 group border border-[#D8DDE9] shadow-sm hover:shadow-md transition-all"
            >
              {/* Step Number */}
              <div
                className="text-[#B6C6E1] text-sm mb-4 font-bold uppercase tracking-wide"
                style={{ fontFamily: "'Arial Black', 'Bebas Neue', sans-serif" }}
              >
                STEP {String(index + 1).padStart(2, "0")}
              </div>

              {/* Icon */}
              <div className="mb-6">
                <service.icon className="w-14 h-14 text-[#122D8B] group-hover:text-[#1A4AFF] transition-colors" />
              </div>

              {/* Content */}
              <h3
                className="text-lg text-[#122D8B] mb-3 font-bold uppercase tracking-wide"
                style={{ fontFamily: "'Arial Black', 'Bebas Neue', sans-serif" }}
              >
                {service.title}
              </h3>
              <p className="text-[#122D8B]/60 text-sm leading-relaxed">{service.description}</p>

              {/* Bottom Line */}
              <div className="mt-6 w-8 h-0.5 bg-[#B6C6E1] group-hover:w-16 group-hover:bg-[#1A4AFF] transition-all" />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button href="/services" variant="outline">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
