import { Navbar, Footer, Chatbot } from "./components/layout";
import {
  HeroSection,
  AboutSection,
  OurServicesSection,
  PartnersSection,
  ProductsSection,
  PortfolioSection,
  TestimonialSection,
  FAQSection,
  ValuesSection,
} from "./sections";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <OurServicesSection />
      <ProductsSection />
      <PortfolioSection />
      <PartnersSection />
      <TestimonialSection />
      <FAQSection />
      <ValuesSection />
      <Footer />
      <Chatbot />
    </main>
  );
}
