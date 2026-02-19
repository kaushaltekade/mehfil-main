import Navbar from "@/components/Navbar";
import HeroSequence from "@/components/HeroSequence";
import StoryText from "@/components/StoryText";
import Properties from "@/components/Properties";
import Amenities from "@/components/Amenities";
import BookingCTA from "@/components/BookingCTA";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="bg-mehfilDark min-h-screen text-white selection:bg-mehfilGold selection:text-mehfilDark">
            <Navbar />

            {/* Scroll Sequence Wrapper */}
            <div className="relative">
                <HeroSequence />
                <StoryText />
            </div>

            <div className="relative z-20 bg-mehfilDark shadow-[0_-20px_50px_rgba(15,23,42,1)]">
                <Properties />
                <Amenities />
                <BookingCTA />
                <Footer />
            </div>
        </main>
    );
}
