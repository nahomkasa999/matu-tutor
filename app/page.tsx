"use client";

import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Forcing from "@/components/forcing";

export default async function Home() {

  return (
    <div >
     <Hero/>
     <Benefits/>
     <Pricing/>
     <Forcing />
     <FAQ/>
     <Footer/>
    </div>
  );
}
