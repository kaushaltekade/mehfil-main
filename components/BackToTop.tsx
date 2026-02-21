"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function BackToTop() {
    const { scrollY } = useScroll();
    const [isVisible, setIsVisible] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > window.innerHeight) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    });

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-8 right-8 z-50"
                >
                    <Button
                        onClick={scrollToTop}
                        variant="gold"
                        size="icon"
                        className="rounded-full shadow-2xl shadow-mehfilGold/20 hover:scale-110 active:scale-95 transition-transform"
                        aria-label="Back to top"
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <path d="M18 15l-6-6-6 6"/>
                        </svg>
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
