"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav 
            variants={{
                visible: { y: 0 },
                hidden: { y: "-150%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-6 left-0 right-0 z-50 mx-auto max-w-7xl px-6"
        >
            <div className="flex items-center justify-between rounded-full border border-white/10 bg-mehfilDark/80 px-6 py-3 backdrop-blur-md shadow-2xl transition-all hover:bg-mehfilDark/95">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="font-playfair text-2xl font-bold text-gold-gradient">
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

                {/* Collections Dropdown */}
                <div 
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    <Button 
                        variant="gold" 
                        className="rounded-full px-6 font-semibold flex items-center gap-2"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        Our Collections
                        <motion.svg 
                            animate={{ rotate: dropdownOpen ? 180 : 0 }}
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <path d="M6 9l6 6 6-6"/>
                        </motion.svg>
                    </Button>

                    <AnimatePresence>
                        {dropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-mehfilDark/95 border border-white/10 backdrop-blur-xl p-2 shadow-xl overflow-hidden"
                            >
                                <Link 
                                    href="#grand-mehfil" 
                                    className="block px-4 py-3 text-sm text-white/80 hover:text-mehfilGold hover:bg-white/5 rounded-xl transition-all"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Grand Mehfil
                                </Link>
                                <Link 
                                    href="#mehfil-inn" 
                                    className="block px-4 py-3 text-sm text-white/80 hover:text-mehfilGold hover:bg-white/5 rounded-xl transition-all"
                                    onClick={() => setDropdownOpen(false)}
                                >
                                    Mehfil Inn
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.nav>
    );
}
