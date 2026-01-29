
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Download } from "lucide-react";

export default function Home() {
    const baseUrl = import.meta.env.BASE_URL;
    const getImageUrl = (path: string) => {
        return `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;
    };

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="lg:col-span-7 flex flex-col space-y-10 order-2 lg:order-1 text-center lg:text-left"
                >
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 tracking-tight leading-none mb-4">
                                Hi!, I'm <br className="hidden md:block lg:hidden" />
                                <span className="text-primary">Elumugam</span>
                            </h2>
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-500 tracking-tight leading-relaxed">
                                <span className="gradient-text">Python Developer & AI Engineer</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium"
                        >
                            I build scalable Python systems and intelligent AI solutions with real-world impact. Specialized in data-driven applications that bridge complex algorithms with seamless user experiences.
                        </motion.p>
                    </div>

                    {/* Actions Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-wrap gap-5 justify-center lg:justify-start pt-6"
                    >
                        {[
                            {
                                icon: Download,
                                label: 'Download CV',
                                href: getImageUrl('Elumugam_Python_Software_Developer.pdf'),
                                primary: true
                            },
                            {
                                icon: Github,
                                label: 'Github',
                                href: 'https://github.com/Elumugam'
                            },
                            {
                                icon: Linkedin,
                                label: 'LinkedIn',
                                href: 'https://linkedin.com/in/elumugam-r-201b06292'
                            },
                            {
                                icon: Mail,
                                label: 'Contact',
                                href: '/contact',
                                isInternal: true
                            }
                        ].map((btn, index) => (
                            <motion.div
                                key={btn.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + (index * 0.1), duration: 0.5 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {btn.isInternal ? (
                                    <Link
                                        to={btn.href}
                                        className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase transition-all duration-300 shadow-xl ${btn.primary
                                            ? 'bg-gray-900 text-white hover:bg-primary shadow-gray-200 hover:shadow-primary/30'
                                            : 'bg-white border border-gray-100 text-gray-900 hover:border-primary hover:text-primary shadow-gray-100/50 hover:shadow-primary/10'
                                            }`}
                                    >
                                        <btn.icon size={18} className={`transition-colors ${btn.primary ? 'group-hover:text-white' : ''}`} />
                                        {btn.label}
                                    </Link>
                                ) : (
                                    <a
                                        href={btn.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[11px] tracking-[0.2em] uppercase transition-all duration-300 shadow-xl ${btn.primary
                                            ? 'bg-gray-900 text-white hover:bg-primary shadow-gray-200 hover:shadow-primary/30'
                                            : 'bg-white border border-gray-100 text-gray-900 hover:border-primary hover:text-primary shadow-gray-100/50 hover:shadow-primary/10'
                                            }`}
                                    >
                                        <btn.icon size={18} className={`transition-colors ${btn.primary ? 'group-hover:text-white' : ''}`} />
                                        {btn.label}
                                    </a>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Content - Profile Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="lg:col-span-5 order-1 lg:order-2 flex justify-center items-center relative"
                >
                    <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
                        {/* Decorative background elements */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-[100px] rounded-full opacity-50" />

                        {/* Rotating Rings */}
                        <div className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-primary/30 animate-[spin_20s_linear_infinite]" />
                        <div className="absolute -inset-8 rounded-full border-[1px] border-gray-100 animate-[spin_30s_linear_infinite_reverse]" />

                        {/* Main Image Container */}
                        <div className="relative z-10 w-full h-full rounded-full overflow-hidden border-[12px] border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] group">
                            <img
                                src={getImageUrl('images/profile-pic-side.jpg')}
                                alt="Elumugam"
                                className="w-full h-full object-cover object-center scale-[1.05] group-hover:scale-110 transition-transform duration-[2s] ease-out"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="absolute -bottom-4 -right-4 md:bottom-8 md:-right-8 z-20 bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-white/50 flex items-center gap-4 hover:-translate-y-2 transition-transform duration-500"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <ArrowUpRight className="text-primary" size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">Status</span>
                                <span className="text-sm font-black text-gray-900 tracking-tight">Available For Work</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
