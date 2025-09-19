import Hero from "@/components/hero-section";
import Partners from "@/components/sections/Partners";
import GlobalSection from "@/components/sections/Globalsection";
import MVVSection from "@/components/sections/MVVSection";
import EventSection from "@/components/sections/Eventsection";
import WhyParticipateSection from "@/components/sections/Whyparticipatesection";
import CTASection from "@/components/sections/CTASection";
import CTAWithCountdown from "@/components/sections/CTAWithCountdown";

export default function Home() {
  return (
    <div>
      {/* <ButtonCta/> */}
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
    </div>
  );
}
