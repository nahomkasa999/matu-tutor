"use client";

import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";

export default async function Home() {

  return (
    <div >
     <Hero/>
     <Benefits/>
     <Pricing/>
     <FAQ/>
     <Footer/>
    </div>
  );
}
