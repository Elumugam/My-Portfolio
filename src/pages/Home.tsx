import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, Instagram, Facebook, Linkedin } from "lucide-react";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import TripO from "./TripO";

const words = ["Develop.", "Create.", "Build.", "Innovate.", "Launch.", "Transform."];

export default function Home() {
    const [currentWord, setCurrentWord] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWord((prev) => (prev + 1) % words.length);
        }, 1800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col w-full bg-black noise-bg relative">
            {/* HERO SECTION */}
            <section id="hero" className="relative min-h-screen flex flex-col justify-center px-8 lg:px-24 overflow-hidden">
                <div className="max-w-7xl mx-auto w-full flex justify-center items-center z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full max-w-4xl flex flex-col items-center text-center space-y-12"
                    >
                        <h1 className="font-bold tracking-tighter leading-[0.85] text-white" style={{ fontSize: 'clamp(60px, 14vw, 120px)' }}>
                            <span id="word-design" className="anim-platform inline-block">Design</span> <br />
                            <span
                                id="word-develop"
                                className="anim-platform relative inline-block align-baseline overflow-hidden whitespace-nowrap"
                                style={{ width: '10.5ch', minHeight: '1em' }}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.span
                                        key={words[currentWord]}
                                        className="absolute inset-0 block"
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -18 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                    >
                                        {words[currentWord]}
                                    </motion.span>
                                </AnimatePresence>
                            </span> <br />
                            <span id="word-scale" className="text-white/10 italic anim-platform inline-block">Scale</span>
                        </h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex items-center justify-center flex-wrap gap-6 md:gap-8 mt-6 md:mt-4 relative z-20 w-full"
                        >
                            <a 
                                href="https://www.instagram.com/_ezhumugam?igsh=NGM0bzJsdGdpN3lm&utm_source=qr" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="social-icon-link"
                            >
                                <Instagram size={28} />
                            </a>
                            <a 
                                href="https://www.facebook.com/share/1CBTK16MsN/?mibextid=wwXIfr" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="social-icon-link"
                            >
                                <Facebook size={28} />
                            </a>
                            <a 
                                href="https://www.linkedin.com/in/elumugam-r-201b06292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="social-icon-link"
                            >
                                <Linkedin size={28} />
                            </a>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 2 }}
                    className="absolute bottom-12 left-8 text-muted flex items-center gap-6"
                >
                    <ArrowDown size={20} strokeWidth={1} className="animate-bounce" />
                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40"></span>
                </motion.div>

                {/* Background Elements — UNTOUCHED */}
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
                    <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-white/[0.01] blur-[120px] rounded-full" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                </div>
            </section>

            {/* SECTIONS — UNTOUCHED except TripO added */}
            <div className="relative">
                <section id="about" className="py-12 border-t border-white/5">
                    <About />
                </section>
                <section id="projects" className="py-12 border-t border-white/5">
                    <Projects />
                </section>
                <section id="tripo" className="py-12 border-t border-white/5">
                    <TripO />
                </section>
                <section id="contact" className="py-12 border-t border-white/5">
                    <Contact />
                </section>
            </div>
        </div>
    );
}
