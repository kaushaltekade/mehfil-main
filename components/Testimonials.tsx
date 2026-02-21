"use client";

import { motion } from "framer-motion";
import { GlowBorder } from "@/components/ui/glow-border";

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Luxury Traveler",
        quote: "An absolute marvel. The attention to detail in every room is breathtaking.",
        location: "London, UK"
    },
    {
        name: "Rajiv Malhotra",
        role: "Business Executive",
        quote: "The perfect blend of modern amenities and traditional royal hospitality.",
        location: "Mumbai, India"
    },
    {
        name: "Elena Rossi",
        role: "Architect",
        quote: "Structurally magnificent. A true masterpiece of design and comfort.",
        location: "Milan, Italy"
    },
    {
        name: "David Chen",
        role: "Food Critic",
        quote: "The dining experience was nothing short of world-class. Five stars.",
        location: "Singapore"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-mehfilDark relative overflow-hidden">
            <div className="container mx-auto px-6 mb-12">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-playfair font-bold text-center text-white"
                >
                    Guest <span className="text-gold-gradient">Experiences</span>
                </motion.h2>
            </div>

            {/* Scrolling container */}
            <div className="flex overflow-x-auto pb-12 px-6 gap-6 no-scrollbar snap-x snap-mandatory">
                {testimonials.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="min-w-[300px] md:min-w-[400px] snap-center"
                    >
                        <GlowBorder className="h-full p-8 flex flex-col justify-between bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                            <div>
                                <div className="text-mehfilGold text-4xl font-serif mb-4">"</div>
                                <p className="text-white/80 text-lg italic mb-6 font-light leading-relaxed">
                                    {item.quote}
                                </p>
                            </div>
                            <div className="flex items-center gap-4 mt-4 border-t border-white/10 pt-4">
                                <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                                    {item.name[0]}
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">{item.name}</h4>
                                    <p className="text-white/40 text-sm">{item.role} • {item.location}</p>
                                </div>
                            </div>
                        </GlowBorder>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
