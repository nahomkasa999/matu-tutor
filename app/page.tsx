"use client";

import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";

export default async function Home() {

  return (
    <div >
     <Hero/>
     <Benefits/>
     <Pricing/>
     <FAQ/>
    </div>
  );
}
