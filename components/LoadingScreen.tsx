"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
    // Determine total animation time (approx 2s) + buffer
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 2200); // 1.6s animation + 0.6s pause

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-mehfilDark flex flex-col items-center justify-center p-4 cursor-wait"
        >
            {/* Logo Animation */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative mb-8"
            >
                <h1 className="text-6xl md:text-9xl font-playfair font-bold text-gold-gradient tracking-tighter">
                    Mehfil
                </h1>
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                    className="h-1 bg-mehfilGold absolute -bottom-2 md:-bottom-4 left-0"
                />
            </motion.div>

            {/* Tagline Reveal */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-white/60 text-sm md:text-lg uppercase tracking-[0.4em] font-light"
            >
                Luxury Redefined
            </motion.p>
        </motion.div>
    );
}
