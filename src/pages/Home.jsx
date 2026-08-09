import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import OurMenu from "../components/OurMenu";
import PopularFoods from "../components/PopularFoods";
import OfferBanner from "../components/OfferBanner";
import WhyChoose from "../components/WhyChoose";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF7ED] font-sans text-slate-800 selection:bg-orange-500 selection:text-white overflow-x-hidden">
      
      {/* 1. Navigation Bar */}
      <Navbar />

      {/* 2. Main Content with Big Gaps between sections */}
      <main className="space-y-20 md:space-y-32 pt-20">
        
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8">
          <Hero />
        </section>

        {/* Menu Section */}
        <section className="py-12 bg-white/50 backdrop-blur-sm rounded-[40px] shadow-sm">
          <OurMenu />
        </section>

        {/* Popular Foods */}
        <section className="py-8">
          <PopularFoods />
        </section>

        {/* Special Offer Banner */}
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OfferBanner />
        </section>

        {/* Why Choose Us */}
        <section className="py-12 bg-white/50 backdrop-blur-sm rounded-[40px] shadow-sm">
          <WhyChoose />
        </section>

        {/* Reviews */}
        <section className="py-8">
          <Reviews />
        </section>

      </main>

      {/* 3. Footer with Extra Top Margin */}
      <div className="mt-28 md:mt-40">
        <Footer />
      </div>

    </div>
  );
}