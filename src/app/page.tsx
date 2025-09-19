import Hero from "@/components/hero-section";
import Partners from "@/components/sections/Partners";
import GlobalSection from "@/components/sections/GlobalSection";
import MVVSection from "@/components/sections/MVVSection";
import EventSection from "@/components/sections/EventSection";
import WhyParticipateSection from "@/components/sections/WhyParticipateSection";
import CTASection from "@/components/sections/CTASection";
import CTAWithCountdown from "@/components/sections/CTAWithCountdown";
import Header from "./(components)/navbar";
import Footer from "./(components)/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Partners />
      <GlobalSection />
      <div id="quem-somos" className="mt-20">
        <MVVSection />
      </div>
      <div id="sobre" className="mt-20">
        <EventSection />
      </div>
      <div id="evento" className="mt-20">
        <WhyParticipateSection />
      </div>
      <div id="contato" className="mt-20">
        <CTAWithCountdown />
      </div>
      <CTASection />
      <Footer />
    </div>
  );
}
