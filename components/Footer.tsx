import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <footer id="contact" className="bg-[#050912] pt-24 pb-12 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-3xl font-playfair font-bold text-white mb-6">Mehfil</h3>
                        <p className="text-white/40 mb-6">
                            Luxury hospitality redefined. Experience the gold standard of comfort and elegance.
                        </p>
                        <div className="flex gap-4">
                            {/* Social placeholders */}
                            <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-mehfilGold hover:text-mehfilDark transition-colors flex items-center justify-center cursor-pointer">
                                Fb
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-mehfilGold hover:text-mehfilDark transition-colors flex items-center justify-center cursor-pointer">
                                In
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-mehfilGold hover:text-mehfilDark transition-colors flex items-center justify-center cursor-pointer">
                                Tw
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Explore</h4>
                        <ul className="space-y-4 text-white/60">
                            <li><Link href="#" className="hover:text-mehfilGold transition-colors">Our Story</Link></li>
                            <li><Link href="#" className="hover:text-mehfilGold transition-colors">Properties</Link></li>
                            <li><Link href="#" className="hover:text-mehfilGold transition-colors">Dining</Link></li>
                            <li><Link href="#" className="hover:text-mehfilGold transition-colors">Wellness</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Contact</h4>
                        <ul className="space-y-4 text-white/60">
                            <li>123 Luxury Avenue, Gold City</li>
                            <li>contact@mehfilhotels.com</li>
                            <li>+1 (555) 123-4567</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Newsletter</h4>
                        <p className="text-white/40 mb-4 text-sm">Subscribe to receive exclusive offers.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white text-sm w-full focus:outline-none focus:border-mehfilGold"
                            />
                            <Button variant="gold" size="sm">Go</Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-white/20 text-sm">
                    <p>&copy; {new Date().getFullYear()} Mehfil Hotels. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
