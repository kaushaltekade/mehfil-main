"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Tilt } from "react-tilt";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PropertyProps {
    title: string;
    description: string;
    image: string;
    features: string[];
}

const PropertyCard = ({ property, index }: { property: PropertyProps, index: number }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);



    // Default options for react-tilt
    const defaultOptions = {
        reverse:        false,
        max:            15,
        perspective:    1000,
        scale:          1.02,
        speed:          1000,
        transition:     true,
        axis:           null,
        reset:          true,
        easing:         "cubic-bezier(.03,.98,.52,.99)",
    };

    const CardContent = (
        <div className="group relative w-full overflow-hidden rounded-3xl bg-mehfilSurface border border-white/5 shadow-2xl transition-all duration-500 hover:shadow-mehfilGold/10 hover:border-mehfilGold/30">
            {/* Image Section */}
            <div className="relative h-[400px] w-full overflow-hidden">
                <Image
                    src={property.image}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mehfilDark via-transparent to-transparent opacity-80" />
            </div>

            {/* Content Section */}
            <div className="relative -mt-20 p-8 bg-gradient-to-t from-mehfilSurface via-mehfilSurface to-transparent">
                <h3 className="mb-2 font-playfair text-3xl font-bold text-white group-hover:text-mehfilGold transition-colors">
                    {property.title}
                </h3>
                <p className="mb-6 text-white/70 font-light">
                    {property.description}
                </p>

                {/* Features Grid */}
                <div className="mb-8 grid grid-cols-2 gap-4">
                    {property.features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-white/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-mehfilGold" />
                            <span className="text-sm">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <Button variant="gold" className="flex-1">
                        Book Your Stay
                    </Button>
                    <Button variant="outline" className="flex-1 text-white border-white/20 hover:bg-white/10 hover:border-white/40">
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full max-w-xl mx-auto"
        >
            {isMobile ? (
                CardContent
            ) : (
                <Tilt options={defaultOptions}>
                    {CardContent}
                </Tilt>
            )}
        </motion.div>
    );
};

export default function Properties() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const propertiesData = [
        {
            title: "Grand Mehfil",
            description: "The epitome of royal luxury in the heart of the city. Grand Mehfil stands as a beacon of heritage, offering an experience that transcends time.",
            image: "/main-photos/mehfil-hotel.jpg",
            features: ["Spacious Suites", "Fine Dining", "Spa & Wellness", "Concierge Service"]
        },
        {
            title: "Mehfil Inn",
            description: "Contemporary elegance for the modern traveler. Mehfil Inn blends sophistication with comfort, creating a perfect retreat for business and leisure.",
            image: "/main-photos/mehfil-inn2.jpg",
            features: ["Modern Rooms", "Business Center", "Fitness Gym", "Casual Dining"]
        }
    ];

    return (
        <section ref={containerRef} id="properties" className="relative bg-gradient-to-b from-mehfilDark via-mehfilDark to-mehfilSurface py-20 overflow-hidden">
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

            <div className="flex flex-col gap-24 px-6 mb-24">
                {propertiesData.map((property, index) => (
                    <div key={index} id={property.title.toLowerCase().replace(" ", "-")}>
                        <PropertyCard 
                            index={index}
                            property={property}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
