"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function BookingCTA() {
    return (
        <section className="py-32 bg-mehfilDark relative overflow-hidden flex items-center justify-center">
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-mehfilGold/10 to-transparent" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-8xl font-playfair font-bold text-white mb-8">
                        Your Royal <br /> <span className="text-gold-gradient">Journey Awaits</span>
                    </h2>
                    <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">
                        Book your stay today and experience the timeless elegance of Mehfil Hotels.
                    </p>
                    <Link href="#properties">
                        <Button variant="gold" size="lg" className="rounded-full px-12 py-8 text-xl shadow-2xl shadow-mehfilGold/20 hover:shadow-mehfilGold/40">
                            Start Your Journey
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
