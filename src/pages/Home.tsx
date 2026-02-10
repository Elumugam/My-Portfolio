import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import profilePic from "../assets/profile.jpg";

export default function Home() {
    return (
        <div className="flex flex-col w-full bg-black noise-bg relative">
            {/* HERO SECTION */}
            <section id="hero" className="relative min-h-screen flex flex-col justify-center px-8 lg:px-24 overflow-hidden">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-8 space-y-12"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center gap-4"
                            >
                                <span className="w-8 h-[1px] bg-white opacity-20" />
                                <p className="section-label text-white/60">Fullstack Engineer — AI Specialist</p>
                            </motion.div>
                            <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-[0.85] text-white">
                                Design. <br />
                                Develop. <br />
                                <span className="text-white/10 italic">Scale.</span>
                            </h1>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col md:flex-row gap-12 md:items-end"
                        >
                            <p className="text-2xl text-muted font-medium leading-relaxed max-w-md">
                                Python Developer and AI Engineer building intelligent, data-driven applications and scalable backend systems.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Profile Picture Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                        className="lg:col-span-4 relative flex justify-center lg:justify-end"
                    >
                        <div className="relative group">
                            {/* Decorative frame elements */}
                            <div className="absolute -inset-4 border border-white/5 group-hover:border-white/10 transition-colors duration-500" />
                            <div className="absolute -inset-px bg-gradient-to-tr from-white/5 to-transparent opacity-50" />

                            <div className="relative w-80 h-[32rem] overflow-hidden grayscale contrast-125 filter group-hover:grayscale-0 transition-all duration-1000">
                                <img
                                    src={profilePic}
                                    alt="Profile"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                            </div>

                            {/* Noir Accents */}
                            <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-white/20 -mt-2 -mr-2 shadow-[20px_-20px_40px_-20px_rgba(255,255,255,0.05)]" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-white/20 -mb-2 -ml-2 shadow-[-20px_20px_40px_-20px_rgba(255,255,255,0.05)]" />
                        </div>
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

                {/* Unique Background Elements */}
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-white/[0.02] blur-[150px] rounded-full" />
                    <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-white/[0.01] blur-[120px] rounded-full" />
                    {/* Floating grid pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                </div>
            </section >

            {/* SECTIONS */}
            < div className="relative" >
                <section id="about" className="py-12 border-t border-white/5">
                    <About />
                </section>
                <section id="projects" className="py-12 border-t border-white/5">
                    <Projects />
                </section>
                <section id="contact" className="py-12 border-t border-white/5">
                    <Contact />
                </section>
            </div >
        </div >
    );
}
