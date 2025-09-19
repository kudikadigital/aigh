import Hero from "@/components/hero-section";
import Partners from "@/components/sections/partners";
import GlobalSection from "@/components/sections/globalsection";
import MVVSection from "@/components/sections/mvvsection";
import EventSection from "@/components/sections/eventsection";
import WhyParticipateSection from "@/components/sections/whyparticipatesection";
import CTASection from "@/components/sections/ctasection";
import CTAWithCountdown from "@/components/sections/CTAWithCountdown";

export default function Home() {
  return (
    <div>
      {/* <ButtonCta/> */}
      <Hero />
      <Partners/>
      <GlobalSection/>
      <MVVSection/>
      <EventSection/>
      <WhyParticipateSection/>
      <CTAWithCountdown/>
      <CTASection/>
    </div>
  );
}
