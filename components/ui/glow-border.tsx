"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GlowBorderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function GlowBorder({ children, className, ...props }: GlowBorderProps) {
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const box = boxRef.current;
        if (!box) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            box.style.setProperty("--mouse-x", `${x}px`);
            box.style.setProperty("--mouse-y", `${y}px`);
        };

        box.addEventListener("mousemove", handleMouseMove);

        return () => {
            box.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={boxRef}
            className={cn(
                "group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1",
                className
            )}
            {...props}
        >
            <div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(201, 162, 77, 0.4), transparent 40%)`,
                }}
            />
            <div className="relative h-full w-full rounded-lg bg-mehfilSurface/90 p-4">
                {children}
            </div>
        </div>
    );
}
