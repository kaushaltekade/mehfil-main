"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function SectionTransitionWipes() {
    const { scrollYProgress } = useScroll();

    // Create wipes at specific scroll points (e.g., between Hero and Properties)
    // Adjust these ranges based on your actual content height
    const wipe1 = useTransform(scrollYProgress, [0.15, 0.2, 0.25], ["-100vw", "0vw", "100vw"]);

    return (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-x-clip">
            {/* Wipe 1 - After Hero */}
            <motion.div
                style={{ x: wipe1 }}
                className="absolute top-0 left-0 w-full h-full bg-mehfilGold/10 backdrop-blur-sm"
            />
            <motion.div
                style={{ x: wipe1, opacity: 0.5 }}
                className="absolute top-0 left-0 w-1/2 h-full bg-mehfilGold/20 transform -skew-x-12"
            />
        </div>
    );
}
