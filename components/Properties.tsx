"use client";

import { motion } from "framer-motion";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Properties() {
    return (
        <section id="properties" className="relative py-32 bg-mehfilDark">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mehfilSurface/50 to-mehfilDark pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6">
                        Our <span className="text-gold-gradient">Properties</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto text-lg">
                        Choose your sanctuary. Each property is a masterpiece of design and comfort.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Property 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-[600px] group overflow-hidden relative border-white/5 hover:border-mehfilGold/30 transition-colors duration-500">
                            <div className="absolute inset-0 bg-[url('/sequence/frame_191.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent pt-32">
                                <CardTitle className="text-4xl text-white mb-2">Grand Mehfil</CardTitle>
                                <CardDescription className="text-white/80 text-lg mb-6">
                                    The epitome of royal luxury in the heart of the city.
                                </CardDescription>
                                <div className="flex gap-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                    <Button variant="gold">Explore</Button>
                                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">Book Now</Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    {/* Property 2 */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <Card className="h-[600px] group overflow-hidden relative border-white/5 hover:border-mehfilGold/30 transition-colors duration-500">
                            <div className="absolute inset-0 bg-[url('/sequence/frame_150.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent pt-32">
                                <CardTitle className="text-4xl text-white mb-2">Mehfil Inn</CardTitle>
                                <CardDescription className="text-white/80 text-lg mb-6">
                                    Contemporary elegance for the modern traveler.
                                </CardDescription>
                                <div className="flex gap-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                    <Button variant="gold">Explore</Button>
                                    <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">Book Now</Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
