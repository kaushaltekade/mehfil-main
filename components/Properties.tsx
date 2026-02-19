"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const PropertyCard = ({ 
    title, 
    description, 
    image, 
    alignment = "left",
    index
}: { 
    title: string; 
    description: string; 
    image: string; 
    alignment?: "left" | "right";
    index: number;
}) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const isLeft = alignment === "left";
    const x = useTransform(scrollYProgress, [0, 1], [0, isLeft ? -20 : 20]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
            <motion.div 
                style={{ opacity }}
                className={`container mx-auto px-6 flex flex-col ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-24 relative z-10`}
            >
                {/* Image Section */}
                <motion.div 
                    style={{ scale: imageScale }}
                    className="w-full md:w-3/5 h-[60vh] md:h-[80vh] relative group"
                >
                    <div className="absolute inset-0 bg-mehfilGold/10 transform translate-x-4 translate-y-4 -z-10 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
                    <div 
                        className="w-full h-full bg-cover bg-center shadow-2xl transition-all duration-700 filter grayscale-[0.2] group-hover:grayscale-0"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                    
                    {/* Floating Number */}
                    <div className={`absolute -top-10 ${isLeft ? "-right-10" : "-left-10"} text-9xl font-playfair font-bold text-white/5 select-none pointer-events-none`}>
                        0{index}
                    </div>
                </motion.div>

                {/* Content Section */}
                <div className="w-full md:w-2/5 text-center md:text-left relative">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-mehfilGold font-inter tracking-[0.2em] text-sm uppercase mb-4">Discover Luxury</h3>
                        <h2 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-8 leading-tight">
                            {title}
                        </h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-10 font-light">
                            {description}
                        </p>
                        
                        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                            <Button 
                                variant="gold" 
                                className="h-14 px-8 text-lg rounded-none hover:scale-105 transition-transform duration-300"
                            >
                                Explore Residence
                            </Button>
                            <Button 
                                variant="outline" 
                                className="h-14 px-8 text-lg rounded-none border-white/20 text-white hover:bg-white hover:text-black transition-colors duration-300"
                            >
                                Book Your Stay
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default function Properties() {
    return (
        <section id="properties" className="relative bg-gradient-to-b from-mehfilDark via-mehfilDark to-mehfilSurface py-20 overflow-hidden">
            {/* Moving Light Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1],
                        rotate: [0, 45, 0]
                    }}
                    transition={{ 
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut" 
                    }}
                    className="absolute top-[-50%] left-[-20%] w-[100vw] h-[100vw] rounded-full bg-gradient-radial from-mehfilGold/10 to-transparent blur-[100px]"
                />
                <motion.div 
                    animate={{ 
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.1, 1],
                        x: [0, 100, 0]
                    }}
                    transition={{ 
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-gradient-radial from-white/5 to-transparent blur-[120px]"
                />
            </div>

            <div className="container mx-auto px-6 mb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <span className="text-mehfilGold/80 uppercase tracking-widest text-sm font-semibold mb-4 block">Our Collection</span>
                    <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6">
                        Curated <span className="italic font-light text-mehfilGold">Sanctuaries</span>
                    </h2>
                </motion.div>
            </div>

            <div className="flex flex-col gap-0">
                <PropertyCard 
                    index={1}
                    title="Grand Mehfil"
                    description="The epitome of royal luxury in the heart of the city. Grand Mehfil stands as a beacon of heritage, offering an experience that transcends time."
                    image="/sequence/frame_191.jpg"
                    alignment="left"
                />
                
                <PropertyCard 
                    index={2}
                    title="Mehfil Inn"
                    description="Contemporary elegance for the modern traveler. Mehfil Inn blends sophistication with comfort, creating a perfect retreat for business and leisure."
                    image="/main-photos/mehfil-inn2.jpg"
                    alignment="right"
                />
            </div>
        </section>
    );
}
