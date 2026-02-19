"use client";

import { motion } from "framer-motion";
import { GlowBorder } from "@/components/ui/glow-border";

const amenities = [
    {
        title: "Fine Dining",
        description: "World-class culinary experiences crafted by master chefs.",
        colSpan: "md:col-span-2",
    },
    {
        title: "Spa & Wellness",
        description: "Rejuvenate your senses in our award-winning spa.",
        colSpan: "md:col-span-1",
    },
    {
        title: "Infinity Pool",
        description: "Swim above the city skyline.",
        colSpan: "md:col-span-1",
    },
    {
        title: "Concierge",
        description: "24/7 personalized service for your every need.",
        colSpan: "md:col-span-2",
    },
];

export default function Amenities() {
    return (
        <section id="amenities" className="py-32 bg-mehfilSurface relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-mehfilGold/5 blur-3xl rounded-full translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6">
                        World-Class <span className="text-gold-gradient">Amenities</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {amenities.map((item, index) => (
                        <motion.div
                            key={index}
                            className={item.colSpan}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <GlowBorder className="h-full min-h-[250px] flex flex-col justify-end group">
                                <div className="p-2">
                                    <h3 className="text-2xl font-playfair font-bold text-white mb-2 group-hover:text-mehfilGold transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/60 group-hover:text-white/90 transition-colors">
                                        {item.description}
                                    </p>
                                </div>
                            </GlowBorder>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
