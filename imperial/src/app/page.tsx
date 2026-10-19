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
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:border focus:border-line focus:bg-surface focus:px-4 focus:py-2.5 focus:text-[0.78rem] focus:tracking-[0.14em] focus:text-ink focus:uppercase"
      >
        Skip to content
      </a>

      <main id="content">
        <Hero />
        <Marquee />
        <Numbers />
        <WorkIndex />
        <Services />
        <Process />
        <Quote />
        <Contact />
      </main>

      <Footer />
      <ThemeSwitcher />
    </>
  );
}
