"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function StoryText() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Text 1: 0% - 20%
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const scale1 = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

    // Text 2: 25% - 45%
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);
    const scale2 = useTransform(scrollYProgress, [0.2, 0.5], [0.9, 1]);

    // Text 3: 50% - 70%
    const opacity3 = useTransform(scrollYProgress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.45, 0.75], [50, -50]);

    // Text 4: 75% - 100%
    const opacity4 = useTransform(scrollYProgress, [0.7, 0.8, 1], [0, 1, 1]);
    const y4 = useTransform(scrollYProgress, [0.7, 1], [50, 0]);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[700vh] pointer-events-none z-10">
            <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">

                {/* Section 1 */}
                <motion.div style={{ opacity: opacity1, y: y1, scale: scale1 }} className="absolute text-center px-4">
                    <h1 className="text-5xl md:text-8xl font-playfair font-bold text-white drop-shadow-2xl mb-4">
                        Welcome to <span className="text-gold-gradient">Mehfil</span>
                    </h1>
                    <p className="text-xl text-white/80 font-inter max-w-xl mx-auto">
                        Experience the art of luxury living.
                    </p>
                </motion.div>

                {/* Section 2 */}
                <motion.div style={{ opacity: opacity2, y: y2, scale: scale2 }} className="absolute text-center px-4">
                    <h2 className="text-4xl md:text-7xl font-playfair font-bold text-white drop-shadow-2xl mb-4">
                        Where Heritage Meets <br /><span className="text-mehfilGold">Modernity</span>
                    </h2>
                    <p className="text-lg text-white/80 font-inter max-w-lg mx-auto">
                        Every corner tells a story of royalty and elegance.
                    </p>
                </motion.div>

                {/* Section 3 */}
                <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute text-center px-4">
                    <h2 className="text-4xl md:text-7xl font-playfair font-bold text-white drop-shadow-2xl mb-4">
                        Crafted for <span className="italic text-mehfilGold">Comfort</span>
                    </h2>
                    <p className="text-lg text-white/80 font-inter max-w-lg mx-auto bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                        Immerse yourself in spaces designed for tranquility.
                    </p>
                </motion.div>

                {/* Section 4 */}
                <motion.div style={{ opacity: opacity4, y: y4 }} className="absolute text-center px-4">

                    <div className="animate-bounce text-mehfilGold mt-8">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5" /></svg>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
