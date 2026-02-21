"use client";

import { useInView, useMotionValue, useSpring, motion, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export default function CountUp({
    to,
    from = 0,
    duration = 2,
    className
}: {
    to: number;
    from?: number;
    duration?: number;
    className?: string;
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const motionValue = useMotionValue(from);
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
        duration: duration * 1000
    });
    const roundedValue = useTransform(springValue, (value) => Math.floor(value));

    useEffect(() => {
        if (inView) {
            motionValue.set(to);
        }
    }, [inView, motionValue, to]);

    return (
        <span ref={ref} className={className}>
            {/* @ts-ignore */}
            <motion.span>{roundedValue}</motion.span>
        </span>
    );
}
