import Hero from "@/components/hero";
import TrustBar from "@/components/trust-bar";
import ServicesSection from "@/components/services-section";
import BeforeAfterSection from "@/components/before-after-section";
import ProcessSection from "@/components/process-section";
import AreasSection from "@/components/areas-section";
import CtaBand from "@/components/cta-band";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesSection />
      <BeforeAfterSection />
      <ProcessSection />
      <AreasSection />
      <CtaBand />
    </>
  );
}
