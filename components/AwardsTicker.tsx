"use client";

import { motion } from "framer-motion";

const awards = [
    "Winner - Best Luxury Hotel 2024",
    "★ ★ ★ ★ ★ Forbes Travel Guide",
    "Condé Nast Traveler Gold List",
    "Michelin Star Dining",
    "World Travel Awards - Leading Heritage Hotel",
    "Travel + Leisure - World's Best",
    "Architectural Digest Design Award"
];

export default function AwardsTicker() {
    return (
        <div className="w-full bg-mehfilGold/10 border-y border-mehfilGold/20 py-4 overflow-x-clip relative group">
            {/* Gradient fade on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-mehfilDark to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-mehfilDark to-transparent z-10 pointer-events-none" />

            <div className="flex w-max">
                <motion.div
                    className="flex gap-16 py-8 items-center min-w-max hover:animation-play-state-paused group-hover:[animation-play-state:paused]"
                    animate={{
                        x: ["0%", "-50%"]
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop"
                    }}
                    // Pause on hover
                    whileHover={{ animationPlayState: "paused" }}
                >
                    {[...awards, ...awards, ...awards].map((award, i) => (
                        <span key={i} className="text-mehfilGold/60 text-sm md:text-base whitespace-nowrap uppercase tracking-[0.2em] font-medium flex items-center gap-4">
                            {award}
                            <span className="w-1.5 h-1.5 rounded-full bg-mehfilGold/40" />
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
