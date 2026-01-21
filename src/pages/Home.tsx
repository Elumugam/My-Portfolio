
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
    const baseUrl = import.meta.env.BASE_URL;
    const getImageUrl = (path: string) => {
        return `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;
    };

    return (
        <div className="flex flex-col items-center justify-start pt-16 md:pt-28 min-h-[calc(100vh-5rem)] px-4 sm:px-6 max-w-7xl mx-auto overflow-x-hidden">

            {/* Intro Tag */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/10 bg-primary/5 shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-primary uppercase">
                        Available for new opportunities
                    </span>
                </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-center mb-8 tracking-tighter leading-[1.05] text-gray-900"
            >
                Python Developer <br className="hidden md:block" />
                <span className="gradient-text">& AI Engineer</span>
            </motion.h1>

            {/* Sub-headline / Bio */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground text-center max-w-3xl mb-14 leading-relaxed font-medium"
            >
                I architect robust Python systems and intelligent AI solutions that drive real-world impact. Currently specializing in building scalable, data-driven applications that bridge the gap between complex algorithms and seamless user experiences.
            </motion.p>

            {/* Hero Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[400px] mb-16 group"
            >
                <div className="absolute inset-x-0 -bottom-10 h-20 bg-primary/20 blur-[80px] -z-10 rounded-full opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative aspect-square md:aspect-[4/5] rounded-[2.5rem] overflow-hidden border-[6px] border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group-hover:shadow-[0_48px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700">
                    <img
                        src={getImageUrl('images/profile-pic.jpg')}
                        alt="R Elumugam"
                        className="w-full h-full object-cover object-top scale-[1.02] group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2.5rem]" />
                </div>
            </motion.div>

            {/* Bottom Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-6 md:gap-10 mb-24 w-full justify-center"
            >
                {/* CV Button */}
                <a
                    href={getImageUrl('Elumugam_Python_Software_Developer.pdf')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-10 py-5 bg-gray-900 rounded-full text-white shadow-xl hover:bg-gray-800 hover:shadow-primary/20 transition-all duration-300 flex items-center gap-3 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative font-bold text-sm tracking-widest">DOWNLOAD CV</span>
                    <ArrowUpRight size={20} className="relative group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>

                {/* Social Links */}
                <div className="flex items-center gap-10">
                    {[
                        { label: 'Github', href: 'https://github.com/Elumugam' },
                        { label: 'LinkedIn', href: 'https://linkedin.com/in/elumugam-r-201b06292' },
                        { label: 'Contact', href: '/contact', isInternal: true }
                    ].map((link, i) => (
                        <div key={link.label} className="flex items-center">
                            {link.isInternal ? (
                                <Link
                                    to={link.href}
                                    className="text-xs font-bold tracking-[0.15em] text-gray-400 hover:text-primary transition-all uppercase hover:translate-y-[-2px] block"
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-bold tracking-[0.15em] text-gray-400 hover:text-gray-900 transition-all uppercase hover:translate-y-[-2px] block"
                                >
                                    {link.label}
                                </a>
                            )}
                            {i < 2 && <div className="ml-10 w-1 h-1 rounded-full bg-gray-200 hidden md:block" />}
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
