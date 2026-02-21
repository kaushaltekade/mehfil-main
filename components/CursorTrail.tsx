"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorTrail() {
    const [isVisible, setIsVisible] = useState(false);
    
    // Mouse position values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the cursor follower
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // 1. Accessibility & Performance Check
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        // 2. Device Check (Touch devices usually don't need cursor effects)
        const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

        if (prefersReducedMotion || isTouchDevice) {
            return;
        }

        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-mehfilGold/60 pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: springX,
                y: springY,
                translateX: "-50%",
                translateY: "-50%",
            }}
        >
            <div className="absolute inset-0 bg-mehfilGold/20 rounded-full blur-[2px]" />
        </motion.div>
    );
}
