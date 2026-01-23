import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Link2, Wallet, Sparkles, MapPin, Layout, X, ExternalLink, Cloud, Moon, Sun, Compass, Map as MapIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const projects = [
    {
        id: 1,
        title: "CLASSMATE+",
        desc: "A SaaS education platform that provides complete guidance to students.",
        fullDesc: "A SaaS education platform that provides complete guidance to students, helps track daily homework, tasks, and academic progress.",
        link: "https://github.com/Elumugam/Classmate-.git",
        icon: GraduationCap,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        rotate: -2
    },
    {
        id: 2,
        title: "FILEDROP",
        desc: "A tool that converts any file into a secure, shareable link.",
        fullDesc: "A tool that converts any file into a secure, shareable link.",
        link: "https://github.com/Elumugam/FILE.DROP.git",
        icon: Link2,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        rotate: 3
    },
    {
        id: 3,
        title: "MTRACK",
        desc: "A personal money-tracking application for expenses.",
        fullDesc: "A personal money-tracking application to monitor expenses and financial activity.",
        link: "https://github.com/Elumugam/M-Tracker.git",
        icon: Wallet,
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        rotate: -1
    },
    {
        id: 4,
        title: "GENZART",
        desc: "An AI-powered Gen-Z art platform for image generation.",
        fullDesc: "An AI-powered Gen-Z art platform that breaks down photo edits, converts images into prompts, and generates new images.",
        link: "https://github.com/Elumugam/genz-art-magic.git",
        icon: Sparkles,
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-200",
        rotate: 2
    },
    {
        id: 5,
        title: "TRIPO",
        desc: "A travel website that helps users explore destinations.",
        fullDesc: "A travel website that helps users explore destinations and plan trips.",
        link: "https://github.com/Elumugam/TripO.git",
        icon: MapPin,
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
        rotate: -3
    },
    {
        id: 6,
        title: "MATERIAL APP",
        desc: "An educational app designed using Material Design.",
        fullDesc: "An educational app designed using Material Design principles for student learning.",
        link: "https://github.com/Elumugam/TripO.git",
        icon: Layout,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        border: "border-indigo-200",
        rotate: 1
    }
];

interface JourneyMapProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ProjectJourneyMap = ({ isOpen, onClose }: JourneyMapProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#fdfbf7] font-sans"
                >
                    {/* Subtle Grid Background Pattern */}
                    <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
                        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                    />

                    {/* Decorative Background Icons */}
                    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-10">
                        <Cloud size={120} className="absolute top-20 left-10 text-gray-400" />
                        <Sun size={80} className="absolute top-10 right-20 text-yellow-500" />
                        <Compass size={150} className="absolute bottom-20 right-10 text-gray-400 rotate-12" />
                        <Moon size={60} className="absolute bottom-40 left-20 text-blue-400" />
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="fixed top-6 right-6 z-50 p-2.5 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
                    >
                        <X size={24} className="text-gray-500 group-hover:rotate-90 transition-transform" />
                    </button>

                    <div className="min-h-screen w-full flex flex-col items-center py-20 px-4 md:px-10 relative z-10">
                        {/* Header Banner Style */}
                        <motion.div
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, type: "spring" }}
                            className="relative mb-24 text-center"
                        >
                            <div className="absolute inset-0 bg-yellow-100/50 blur-2xl rounded-full opacity-50 -z-10" />
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight relative inline-block">
                                <span className="relative z-10">PROJECT MAP</span>
                                <span className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-300/30 -rotate-1 z-0 rounded-full" />
                            </h2>
                            <p className="text-gray-500 font-medium max-w-lg mx-auto text-lg">
                                Your interactive guide through my development journey.
                            </p>
                        </motion.div>

                        <div className="relative w-full max-w-6xl pb-20">
                            {/* The Path (Desktop vs Mobile) */}

                            {!isMobile ? (
                                <div className="relative h-[600px] w-full hidden lg:block select-none">
                                    {/* Winding SVG Path */}
                                    <svg className="absolute top-24 left-0 w-full h-[400px] pointer-events-none overflow-visible">
                                        <defs>
                                            <filter id="pencil" filterUnits="objectBoundingBox">
                                                <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="5" stitchTiles="stitch" result="f1"></feTurbulence>
                                                <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" in="f1" result="f2"></feColorMatrix>
                                                <feComposite operator="in" in2="f2" in="SourceGraphic" result="f3"></feComposite>
                                            </filter>
                                        </defs>
                                        <motion.path
                                            d="M 50 150 C 250 150, 250 350, 550 250 S 950 350, 1100 100"
                                            fill="none"
                                            stroke="#d4d4d8"
                                            strokeWidth="4"
                                            strokeDasharray="16 12"
                                            strokeLinecap="round"
                                            filter="url(#pencil)"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 2, ease: "easeInOut" }}
                                        />
                                    </svg>

                                    {/* Start Label */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: 'spring' }}
                                        className="absolute top-[160px] left-[0%] bg-gray-900 text-white px-3 py-1 text-xs font-bold rounded-md rotate-[-10deg] shadow-md border-2 border-white z-20"
                                    >
                                        START
                                    </motion.div>

                                    {/* Nodes positioned along the path */}
                                    <JourneyNode project={projects[0]} style={{ top: '110px', left: '8%' }} delay={0.4} />
                                    <JourneyNode project={projects[1]} style={{ top: '210px', left: '25%' }} delay={0.5} />
                                    <JourneyNode project={projects[2]} style={{ top: '230px', left: '42%' }} delay={0.6} />
                                    <JourneyNode project={projects[3]} style={{ top: '160px', left: '59%' }} delay={0.7} />
                                    <JourneyNode project={projects[4]} style={{ top: '200px', left: '76%' }} delay={0.8} />
                                    <JourneyNode project={projects[5]} style={{ top: '60px', left: '90%' }} delay={0.9} />
                                </div>
                            ) : (
                                // Mobile Vertical Journey
                                <div className="relative flex flex-col gap-12 pl-8 border-l-2 border-dashed border-gray-300 ml-4">
                                    {projects.map((project, index) => (
                                        <motion.div
                                            key={project.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="relative"
                                        >
                                            {/* Timeline Dot */}
                                            <div className={`absolute -left-[45px] top-6 w-8 h-8 rounded-full border-4 border-[#fdfbf7] shadow-sm flex items-center justify-center bg-white z-10`}>
                                                <div className={`w-3 h-3 rounded-full ${project.color.replace('text-', 'bg-')}`} />
                                            </div>

                                            <ProjectCard project={project} />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="mt-10 text-center"
                        >
                            <button
                                onClick={onClose}
                                className="px-10 py-4 rounded-xl bg-gray-900 text-white font-bold tracking-wider hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                CONTINUE EXPLORING
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const JourneyNode = ({ project, style, delay }: { project: any, style: any, delay: number }) => (
    <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay }}
        className="absolute group z-20"
        style={style}
    >
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block text-center relative">
            {/* Hover Floating Animation */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
            >
                <div
                    className={`
                        w-24 h-24 md:w-28 md:h-28 mx-auto 
                        rounded-2xl rotate-3
                        bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)] 
                        border-2 ${project.border} 
                        flex items-center justify-center relative z-20 transition-all 
                        group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)] 
                        group-hover:-translate-y-1
                        cursor-pointer
                    `}
                    style={{ transform: `rotate(${project.rotate}deg)` }}
                >
                    <div className={`absolute inset-1 rounded-xl bg-opacity-30 ${project.bg} -z-10`} />
                    <project.icon size={36} className={`${project.color} transition-colors opacity-90`} />
                </div>
            </motion.div>

            {/* Label */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 opacity-100 transition-opacity">
                <div className="font-bold text-gray-800 text-sm bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm border border-gray-100 inline-block whitespace-nowrap transform -rotate-1 hover:rotate-0 transition-transform">
                    {project.title}
                </div>
            </div>

            {/* Tooltip on Hover */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-72 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-4 group-hover:translate-y-0 z-50">
                <div className="bg-white text-gray-800 p-5 rounded-xl text-sm font-medium shadow-2xl border border-gray-100 relative text-left">
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 border-8 border-transparent border-t-white" />
                    <h4 className="font-bold text-base mb-1 flex items-center gap-2">
                        {project.title}
                        <ExternalLink size={12} className="text-gray-400" />
                    </h4>
                    <p className="leading-relaxed text-gray-500 text-xs mb-3">{project.fullDesc}</p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-md border border-gray-200 text-xs font-semibold text-gray-600">
                        <MapIcon size={12} />
                        <span>View Project</span>
                    </div>
                </div>
            </div>
        </a>
    </motion.div>
);

const ProjectCard = ({ project }: { project: any }) => (
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block group">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all">
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${project.bg} ${project.color}`}>
                    <project.icon size={24} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1 flex items-center gap-2 group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        {project.fullDesc}
                    </p>
                </div>
            </div>
        </div>
    </a>
);

export default ProjectJourneyMap;
