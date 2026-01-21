
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
    const baseUrl = import.meta.env.BASE_URL;
    const getImageUrl = (path: string) => {
        return `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;
    };

    return (
        <div className="flex flex-col items-center justify-start pt-12 md:pt-20 min-h-[calc(100vh-5rem)] px-4 sm:px-6 max-w-7xl mx-auto">

            {/* Intro Tag */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <span className="inline-block px-5 py-2 rounded-full border border-gray-200 bg-white shadow-sm text-xs font-bold tracking-widest text-primary uppercase">
                    Hello! I am R Elumugam
                </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-center mb-6 tracking-tight leading-tight text-gray-900"
            >
                Python Developer <br className="hidden md:block" />
                <span className="gradient-text">& AI Engineer</span>
            </motion.h1>

            {/* Sub-headline / Bio */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground text-center max-w-2xl mb-12 leading-relaxed"
            >
                I build scalable Python and AI-powered applications with real-world impact. Example of expertise in Full-Stack development and intelligent systems.
            </motion.p>

            {/* Hero Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full max-w-md aspect-[4/5] md:aspect-square mb-12 group"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2rem] blur-3xl opacity-50 -z-10 group-hover:opacity-75 transition-opacity duration-500" />
                <div className="w-full h-full rounded-[2rem] overflow-hidden border border-white/50 shadow-2xl bg-white relative">
                    <div className="absolute inset-0 bg-gray-100/50 animate-pulse" /> {/* Placeholder while loading */}
                    <img
                        src={getImageUrl('images/profile-pic.jpg')}
                        alt="R Elumugam"
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out relative z-10"
                    />
                </div>
            </motion.div>

            {/* Bottom Actions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-20"
            >
                {/* CV Button */}
                <a
                    href={getImageUrl('Elumugam_Python_Software_Developer.pdf')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative px-8 py-4 bg-white rounded-full border border-gray-200 shadow-lg shadow-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
                >
                    <span className="font-bold text-sm tracking-widest text-gray-900">DOWNLOAD CV</span>
                    <ArrowUpRight size={18} className="text-primary group-hover:rotate-45 transition-transform" />
                </a>

                {/* Social Links */}
                <div className="flex items-center gap-8">
                    <a
                        href="https://github.com/Elumugam"
                        target="_blank"
                        className="text-xs font-bold tracking-widest text-gray-500 hover:text-gray-900 transition-colors uppercase"
                    >
                        Github
                    </a>
                    <a
                        href="https://linkedin.com/in/elumugam-r-201b06292"
                        target="_blank"
                        className="text-xs font-bold tracking-widest text-gray-500 hover:text-gray-900 transition-colors uppercase"
                    >
                        LinkedIn
                    </a>
                    <Link
                        to="/contact"
                        className="text-xs font-bold tracking-widest text-gray-500 hover:text-gray-900 transition-colors uppercase"
                    >
                        Contact
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
