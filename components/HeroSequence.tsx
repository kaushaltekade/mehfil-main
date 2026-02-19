"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 192;
const LAST_FRAME = FRAME_COUNT - 1; // 191

function getFramePath(index: number): string {
    const id = String(index).padStart(3, "0");
    return `/sequence/frame_${id}.jpg`;
}

export default function HeroSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const lastFrameRef = useRef<number>(-1);
    const rafRef = useRef<number | null>(null);
    const isLoadedRef = useRef<boolean>(false);
    const [loadedCount, setLoadedCount] = useState(0);
    const [allLoaded, setAllLoaded] = useState(false);

    // ─── Canvas resize ─────────────────────────────────────────────────────────
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;

        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;

        // Re-draw current frame after resize so the canvas isn't blank
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const frameIdx = lastFrameRef.current >= 0 ? lastFrameRef.current : 0;
        drawFrame(canvas, ctx, frameIdx);
    }, []);

    // ─── Frame draw helper ─────────────────────────────────────────────────────
    function drawFrame(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        frameIdx: number
    ) {
        const img = imagesRef.current[frameIdx];
        if (!img || !img.complete || img.naturalWidth === 0) return;

        const dpr = window.devicePixelRatio || 1;
        const cw = canvas.width / dpr;
        const ch = canvas.height / dpr;

        const imageRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = cw / ch;

        let w: number, h: number, x: number, y: number;

        // Cover: fill canvas while preserving aspect ratio
        if (canvasRatio > imageRatio) {
            w = cw;
            h = cw / imageRatio;
            x = 0;
            y = (ch - h) / 2;
        } else {
            w = ch * imageRatio;
            h = ch;
            x = (cw - w) / 2;
            y = 0;
        }

        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(img, x, y, w, h);
    }

    // ─── Image preloading ──────────────────────────────────────────────────────
    useEffect(() => {
        let cancelled = false;
        let loaded = 0;
        const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);

        const onSettled = (i: number) => {
            if (cancelled) return;
            loaded += 1;
            setLoadedCount(loaded);

            if (loaded === FRAME_COUNT) {
                imagesRef.current = imgs;
                isLoadedRef.current = true;
                setAllLoaded(true);
                console.log(
                    "[HeroSequence] ✅ All 192 images loaded — render loop ready"
                );

                // Draw frame 0 immediately so canvas isn't blank
                const canvas = canvasRef.current;
                const ctx = canvas?.getContext("2d");
                if (canvas && ctx) {
                    const dpr = window.devicePixelRatio || 1;
                    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                    lastFrameRef.current = 0;
                    drawFrame(canvas, ctx, 0);
                }
            }
        };

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            // Hint the browser to decode this image without blocking
            img.decoding = "async";
            img.src = getFramePath(i);

            img.onload = () => onSettled(i);
            img.onerror = () => {
                if (!cancelled) {
                    console.error(`[HeroSequence] ❌ Failed: ${getFramePath(i)}`);
                    onSettled(i);
                }
            };

            imgs[i] = img;
        }

        // Set ref immediately so any early scroll events can still access partially
        // loaded array (we guard with img.complete inside drawFrame)
        imagesRef.current = imgs;

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ─── Canvas resize listener ────────────────────────────────────────────────
    useEffect(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, [resizeCanvas]);

    // ─── Scroll → frame render loop ───────────────────────────────────────────
    useEffect(() => {
        if (!allLoaded) return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const dpr = window.devicePixelRatio || 1;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        console.log("[HeroSequence] 🎬 Render loop started");

        let frameHandle: number;

        const tick = () => {
            const container = containerRef.current;
            if (!container) {
                frameHandle = requestAnimationFrame(tick);
                return;
            }

            const rect = container.getBoundingClientRect();
            // How far the container's top edge has scrolled above the viewport
            const scrolled = -rect.top;
            // Total scrollable distance = full height minus one viewport
            const scrollLength = container.offsetHeight - window.innerHeight;

            // Clamp progress to [0, 1]
            const progress =
                scrollLength > 0
                    ? Math.min(Math.max(scrolled / scrollLength, 0), 1)
                    : 0;

            // Exact mapping: scrollProgress 0→1 maps to frame 0→191
            const frameIdx = Math.min(
                Math.floor(progress * FRAME_COUNT),
                LAST_FRAME
            );

            if (frameIdx !== lastFrameRef.current) {
                lastFrameRef.current = frameIdx;
                console.log(`[HeroSequence] Frame: ${frameIdx}`);
                drawFrame(canvas, ctx, frameIdx);
            }

            frameHandle = requestAnimationFrame(tick);
        };

        frameHandle = requestAnimationFrame(tick);
        rafRef.current = frameHandle;

        return () => {
            cancelAnimationFrame(frameHandle);
            rafRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allLoaded]);

    const pct = Math.round((loadedCount / FRAME_COUNT) * 100);

    return (
        <div
            ref={containerRef}
            className="relative h-[700vh]"
            style={{ backgroundColor: "#0F172A" }}
        >
            {/* Sticky canvas — this is the ONLY visual element in the hero */}
            <canvas
                ref={canvasRef}
                className="sticky top-0 left-0 block"
                style={{ width: "100vw", height: "100vh" }}
            />

            {/* Loading overlay */}
            {!allLoaded && (
                <div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center"
                    style={{ backgroundColor: "rgba(15,23,42,0.92)" }}
                >
                    {/* Gold progress bar */}
                    <div
                        className="w-64 h-[2px] rounded-full overflow-hidden"
                        style={{ backgroundColor: "rgba(201,162,77,0.2)" }}
                    >
                        <div
                            className="h-full rounded-full transition-all duration-200"
                            style={{
                                width: `${pct}%`,
                                backgroundColor: "#C9A24D",
                            }}
                        />
                    </div>
                    <p
                        className="mt-4 text-sm tracking-[0.3em] uppercase"
                        style={{ color: "#C9A24D", fontFamily: "var(--font-playfair-display, serif)" }}
                    >
                        Loading Experience&nbsp;&nbsp;{pct}%
                    </p>
                </div>
            )}
        </div>
    );
}
