import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Numbers from "@/components/Numbers";
import WorkIndex from "@/components/WorkIndex";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Quote from "@/components/Quote";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Numbers />
      <WorkIndex />
      <Services />
      <Process />
      <Quote />
      <Contact />
      <Footer />
      <ThemeSwitcher />
    </>
  );
}
