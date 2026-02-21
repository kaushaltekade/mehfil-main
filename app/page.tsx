"use client";

import Navbar from "@/components/Navbar";
import HeroSequence from "@/components/HeroSequence";
import StoryText from "@/components/StoryText";
import Properties from "@/components/Properties";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Testimonials from "@/components/Testimonials";
import Gallery from "@/components/Gallery";
import AwardsTicker from "@/components/AwardsTicker";
import SectionTransitionWipes from "@/components/SectionTransitionWipes";

export default function Home() {
    return (
        <main className="bg-mehfilDark min-h-screen text-white selection:bg-mehfilGold selection:text-mehfilDark">
            <ScrollProgress />
            <BackToTop />
            <SectionTransitionWipes />
            <Navbar />

            {/* Scroll Sequence Wrapper — NO overflow on this or any parent */}
            <div className="relative">
                <HeroSequence />
                <StoryText />
            </div>

            {/* Post-hero sections — safe to clip overflow here */}
            <div className="relative z-20 bg-mehfilDark shadow-[0_-20px_50px_rgba(15,23,42,1)] overflow-x-clip">
                <AwardsTicker />
                <Properties />
                <Gallery />
                <Testimonials />
                <BookingCTA />
                <Footer />
            </div>
        </main>
    );
}
