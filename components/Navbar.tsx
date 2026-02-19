import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <nav className="fixed top-6 left-0 right-0 z-50 mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between rounded-full border border-white/10 bg-mehfilSurface/70 px-6 py-3 backdrop-blur-md shadow-2xl transition-all hover:bg-mehfilSurface/90">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="font-playfair text-2xl font-bold bg-gradient-to-r from-mehfilGold to-white bg-clip-text text-transparent">
                        Mehfil
                    </span>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
                    <Link href="/" className="hover:text-mehfilGold transition-colors">
                        Home
                    </Link>
                    <Link href="#properties" className="hover:text-mehfilGold transition-colors">
                        Properties
                    </Link>
                    <Link href="#amenities" className="hover:text-mehfilGold transition-colors">
                        Amenities
                    </Link>
                    <Link href="#contact" className="hover:text-mehfilGold transition-colors">
                        Contact
                    </Link>
                </div>

                {/* CTA */}
                <div>
                    <Button variant="gold" className="rounded-full px-6 font-semibold">
                        Book Now
                    </Button>
                </div>
            </div>
        </nav>
    );
}
