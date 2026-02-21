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
            y = ch - h; // Align to bottom
        } else {
            w = ch * imageRatio;
            h = ch;
            x = (cw - w) / 2; // Center horizontally
            y = 0;
        }

        ctx.clearRect(0, 0, cw, ch);
        // Fill canvas with hotel background color (just in case)
        ctx.fillStyle = "#0F172A";
        ctx.fillRect(0, 0, cw, ch);
        ctx.drawImage(img, x, y, w, h);
    }

    // ─── Image preloading & Render Loop ─────────────────────────────────────────
    useEffect(() => {
        let cancelled = false;
        let loaded = 0;
        const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);

        imagesRef.current = imgs; // Assign early so draw loops can read

        // Initialize Render Loop immediately to pick up frames as they load
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
            const dpr = window.devicePixelRatio || 1;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        let frameHandle: number;
        const tick = () => {
            if (!canvas || !ctx) {
                frameHandle = requestAnimationFrame(tick);
                return;
            }

            const container = containerRef.current;
            if (!container) {
                frameHandle = requestAnimationFrame(tick);
                return;
            }

            const containerTop = container.offsetTop;
            const scrolled = window.scrollY - containerTop;
            const scrollLength = container.offsetHeight - window.innerHeight;

            const progress = scrollLength > 0 ? Math.min(Math.max(scrolled / scrollLength, 0), 1) : 0;
            const frameIdx = Math.min(Math.round(progress * LAST_FRAME), LAST_FRAME);

            if (frameIdx !== lastFrameRef.current) {
                // Only commit and draw the frame if it's completely loaded
                const img = imagesRef.current[frameIdx];
                if (img && img.complete && img.naturalWidth > 0) {
                    lastFrameRef.current = frameIdx;
                    drawFrame(canvas, ctx, frameIdx);
                }
            }

            frameHandle = requestAnimationFrame(tick);
        };
        frameHandle = requestAnimationFrame(tick);
        rafRef.current = frameHandle;

        // Start loading frames sequentially: Frame 0 first
        const onSettled = (i: number) => {
            if (cancelled) return;
            loaded += 1;
            setLoadedCount(loaded);

            if (loaded === FRAME_COUNT) {
                isLoadedRef.current = true;
                setAllLoaded(true);
                console.log("[HeroSequence] ✅ All 192 images loaded");
            }
        };

        const loadFrameZero = () => {
            const img = new Image();
            img.src = getFramePath(0);

            const handleFrameZeroLoaded = () => {
                if (cancelled) return;
                imgs[0] = img;

                // Draw frame 0 immediately as background if not scrolled yet
                if (canvas && ctx && lastFrameRef.current === -1) {
                    lastFrameRef.current = 0;
                    drawFrame(canvas, ctx, 0);
                }

                onSettled(0);

                // Now trigger network requests for the remaining frames
                // This prevents network queue congestion so frame 0 loads instantly!
                for (let i = 1; i < FRAME_COUNT; i++) {
                    const nextImg = new Image();
                    nextImg.decoding = "async";
                    nextImg.src = getFramePath(i);
                    nextImg.onload = () => onSettled(i);
                    nextImg.onerror = () => onSettled(i);
                    imgs[i] = nextImg;
                }
            };

            img.onload = handleFrameZeroLoaded;
            img.onerror = handleFrameZeroLoaded; // proceed on success/fail
        };

        loadFrameZero();

        return () => {
            cancelled = true;
            cancelAnimationFrame(frameHandle);
            rafRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ─── Canvas resize listener ────────────────────────────────────────────────
    useEffect(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, [resizeCanvas]);

    const pct = Math.round((loadedCount / FRAME_COUNT) * 100);

    return (
        <div
            ref={containerRef}
            className="relative h-[600vh]"
            style={{ backgroundColor: "#0F172A" }}
        >
            {/* Sticky canvas — this is the ONLY visual element in the hero */}
            <canvas
                ref={canvasRef}
                className="sticky top-0 left-0 block w-full h-[100vh] object-cover"
            />


        </div>
    );
}
