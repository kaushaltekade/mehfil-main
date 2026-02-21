"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const galleryImages = [
    "/main-photos/mehfil-hotel.jpg",
    "/main-photos/mehfil-inn2.jpg",
    "/main-photos/mehfil-hotel.jpg", // Repeating for grid
    "/main-photos/mehfil-inn2.jpg",
];

export default function Gallery() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedIndex !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selectedIndex]);

    return (
        <section className="py-20 bg-mehfilDark relative z-10">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-mehfilGold/80 uppercase tracking-widest text-sm font-semibold mb-4 block">Visual Journey</span>
                    <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white">
                        Capturing <span className="italic font-light text-mehfilGold">Moments</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages.map((src, index) => (
                        <motion.div
                            key={index}
                            layoutId={`gallery-image-${index}`}
                            onClick={() => setSelectedIndex(index)}
                            whileHover={{ scale: 1.02 }}
                            className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                        >
                            <Image
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-playfair italic text-lg">View</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedIndex(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                    >
                        <motion.div
                            layoutId={`gallery-image-${selectedIndex}`}
                            className="relative w-full max-w-5xl aspect-[16/9] rounded-xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={galleryImages[selectedIndex]}
                                alt="Selected gallery image"
                                fill
                                className="object-contain"
                            />
                            <Button
                                variant="ghost"
                                className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-full p-2 z-10"
                                onClick={() => setSelectedIndex(null)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
