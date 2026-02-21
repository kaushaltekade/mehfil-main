"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import CountUp from "@/components/CountUp";

export default function StoryText() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const [showStats, setShowStats] = useState(true);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Show stats from the very first frame (scroll = 0) up to 18%
        if (latest >= 0 && latest < 0.18) {
            setShowStats(true);
        } else {
            setShowStats(false);
        }
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



    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[600vh] pointer-events-none z-10">
            <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">

                {/* Section 1 */}
                <AnimatePresence>
                    {showStats && (
                        <motion.div
                            key="section1-stats"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.5 }}
                            style={{ opacity: opacity1, y: y1, scale: scale1 }}
                            className="absolute text-center px-4"
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-8xl font-playfair font-bold text-white drop-shadow-2xl mb-4">
                                Welcome to <span className="text-gold-gradient">Mehfil</span>
                            </h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-base sm:text-xl text-white/80 font-inter max-w-sm sm:max-w-xl mx-auto mb-8 px-2"
                            >
                                Experience hospitality that has been perfected over generations.
                                At Mehfil, you are not just a guest, you are royalty.
                            </motion.p>

                            <div className="grid grid-cols-3 gap-3 sm:gap-8 mt-8 w-full max-w-xs sm:max-w-3xl border-t border-white/10 pt-6">
                                <div>
                                    <div className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-mehfilGold mb-1 flex justify-center">
                                        <CountUp to={15} />+
                                    </div>
                                    <div className="text-white/60 text-[10px] sm:text-sm uppercase tracking-widest">Years of Legacy</div>
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-mehfilGold mb-1 flex justify-center">
                                        <CountUp to={500} />+
                                    </div>
                                    <div className="text-white/60 text-[10px] sm:text-sm uppercase tracking-widest">Rooms & Suites</div>
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-mehfilGold mb-1 flex justify-center">
                                        <CountUp to={2} />
                                    </div>
                                    <div className="text-white/60 text-[10px] sm:text-sm uppercase tracking-widest">Iconic Locations</div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Section 2 */}
                <motion.div style={{ opacity: opacity2, y: y2, scale: scale2 }} className="absolute text-center px-6">
                    <h2 className="text-3xl sm:text-4xl md:text-7xl font-playfair font-bold text-white drop-shadow-2xl mb-4">
                        Where Heritage Meets <br /><span className="text-mehfilGold">Modernity</span>
                    </h2>
                    <p className="text-base sm:text-lg text-white/80 font-inter max-w-lg mx-auto">
                        Every corner tells a story of royalty and elegance.
                    </p>
                </motion.div>

                {/* Section 3 */}
                <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute text-center px-6">
                    <h2 className="text-3xl sm:text-4xl md:text-7xl font-playfair font-bold text-white drop-shadow-2xl mb-4">
                        Crafted for <span className="italic text-mehfilGold">Comfort</span>
                    </h2>
                    <p className="text-base sm:text-lg text-white/80 font-inter max-w-lg mx-auto bg-black/30 backdrop-blur-sm p-4 rounded-xl border border-white/5">
                        Immerse yourself in spaces designed for tranquility.
                    </p>
                </motion.div>



            </div>
        </div>
    );
}
