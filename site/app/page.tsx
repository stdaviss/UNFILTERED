import AgeGate from "@/components/AgeGate";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import NightFlow from "@/components/NightFlow";
import CardCarousel from "@/components/CardCarousel";
import HeatSystem from "@/components/HeatSystem";
import GroupChat from "@/components/GroupChat";
import InTheBox from "@/components/InTheBox";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import StickyBuyBar from "@/components/StickyBuyBar";

export default function HomePage() {
  return (
    <>
      <AgeGate />
      <Nav />
      <main>
        <Hero />
        <NightFlow />
        <CardCarousel />
        <HeatSystem />
        <GroupChat />
        <InTheBox />
        <Faq />
      </main>
      <Footer />
      <StickyBuyBar />
    </>
  );
}
