
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Rocket, Code2, ExternalLink } from "lucide-react";
import clsx from "clsx";
import ProjectJourneyMap from "../components/ProjectJourneyMap";

interface Project {
    title: string;
    description: string;
    tech: string[];
    status: "Completed" | "In Progress" | "Upcoming";
    link: string;
    github?: string;
    thumbnail: string;
}

const projects: Project[] = [
    {
        title: "The Classmate+",
        description: "An AI-powered academic hub that streamlines student workflows with automated task management and intelligent PDF analysis. Engineered for high-performance and seamless UX.",
        tech: ["React", "Node.js", "MongoDB", "OpenAI", "Google OAuth"],
        status: "Completed",
        link: "https://github.com/Elumugam/Classmate-.git",
        github: "https://github.com/Elumugam/Classmate-.git",
        thumbnail: "images/project-classmates-plus.png"
    },
    {
        title: "Genz Art Magic",
        description: "A creative AI engine designed for generative art exploring. Features advanced prompt decomposition and style conversion pipelines to empower digital artists.",
        tech: ["React", "AI Models", "Vite", "Tailwind"],
        status: "Completed",
        link: "https://github.com/Elumugam/genz-art-magic.git",
        github: "https://github.com/Elumugam/genz-art-magic.git",
        thumbnail: "images/project-genz-art.png"
    },
    {
        title: "Portfolio 2.0",
        description: "A best-in-class developer portfolio architected with performance and high-end design in mind. Highlights technical expertise through a refined, minimal interface.",
        tech: ["React", "Framer Motion", "Tailwind", "Vite"],
        status: "Completed",
        link: "https://elumugam.github.io/My-Portfolio/",
        github: "https://github.com/Elumugam/My-Portfolio",
        thumbnail: "images/project-portfolio.png"
    },
    {
        title: "WhatsApp Post Automation",
        description: "A specialized automation workflow that bridges professional networking and mobile communication, enabling instant LinkedIn updates via WhatsApp triggers.",
        tech: ["Workflow Automation", "Integromat", "Webhooks", "LinkedIn API"],
        status: "Upcoming",
        link: "#",
        github: "#",
        thumbnail: "images/project-whatsapp-automation.png"
    }
];

const tabs = [
    { id: "Completed", title: "Live Projects", icon: <Rocket size={18} /> },
    { id: "Upcoming", title: "Future Roadmap", icon: <Code2 size={18} /> }
];

export default function Projects() {
    const [activeTab, setActiveTab] = useState("Completed");
    const [showJourney, setShowJourney] = useState(false);
    const baseUrl = import.meta.env.BASE_URL;

    const getImageUrl = (path: string) => {
        return `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;
    };

    const filteredProjects = projects.filter(p => p.status === activeTab || (activeTab === "Completed" && p.status === "Completed"));

    return (
        <div className="min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center mb-20"
            >
                <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
                    Portfolio
                </div>
                <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 tracking-tight">
                    Selected <span className="gradient-text">Works</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg font-medium">
                    A curated collection of production-ready applications, AI experiments, and technical solutions.
                </p>
            </motion.div>

            {/* Status Switcher */}
            <div className="flex justify-center mb-16">
                <div className="inline-flex p-1.5 bg-gray-100 rounded-2xl border border-gray-200 shadow-inner">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={clsx(
                                "px-8 py-3 rounded-xl text-xs font-bold tracking-widest transition-all flex items-center gap-2 whitespace-nowrap",
                                activeTab === tab.id
                                    ? "bg-white text-primary shadow-sm ring-1 ring-black/5"
                                    : "text-gray-400 hover:text-gray-600"
                            )}
                        >
                            {tab.icon}
                            {tab.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Journey Map Trigger */}
            <div className="flex justify-center mb-16 -mt-8">
                <button
                    onClick={() => setShowJourney(true)}
                    className="group relative px-8 py-3 bg-white text-gray-500 rounded-full text-xs font-bold tracking-widest shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 hover:border-primary/20 hover:text-primary hover:shadow-lg hover:shadow-primary/5 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    VIEW PROJECT JOURNEY MAP
                </button>
            </div>

            {/* Grid Layout */}
            <div className="relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
                    >
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.08)] transition-all duration-500 group flex flex-col h-full"
                                >
                                    {/* Thumbnail Area */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 border-b border-gray-100">
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-10 transition-opacity z-10" />
                                        <img
                                            src={getImageUrl(project.thumbnail)}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                                        />
                                        <div className="absolute top-6 right-6 z-20">
                                            <span className="px-4 py-1.5 rounded-full bg-white/95 backdrop-blur shadow-lg border border-gray-100 text-[10px] font-bold text-gray-900 tracking-wider">
                                                {project.status.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-10 flex flex-col flex-grow">
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-black mb-3 text-gray-900 tracking-tight group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed font-medium">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Tech tags */}
                                        <div className="flex flex-wrap gap-2 mb-10 mt-auto">
                                            {project.tech.map((t) => (
                                                <span
                                                    key={t}
                                                    className="text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 text-gray-400 group-hover:border-primary/20 group-hover:text-primary transition-colors"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-4">
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 py-4 rounded-2xl bg-gray-900 text-white text-xs font-bold tracking-widest transition-all hover:bg-gray-800 flex items-center justify-center gap-2 shadow-lg shadow-gray-200"
                                            >
                                                <Play size={14} fill="currentColor" />
                                                LIVE DEMO
                                            </a>
                                            {project.github && project.github !== "#" && (
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-14 h-14 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-900 transition-all flex-shrink-0"
                                                >
                                                    <ExternalLink size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full border-2 border-dashed border-gray-100 rounded-[3rem] p-24 flex flex-col items-center justify-center text-center bg-gray-50/20">
                                <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 text-gray-300">
                                    <Code2 size={40} />
                                </div>
                                <h4 className="text-gray-900 font-bold text-xl mb-2 tracking-tight">Innovating in the lab</h4>
                                <p className="text-muted-foreground font-medium">New experimental projects are currently under development.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <ProjectJourneyMap isOpen={showJourney} onClose={() => setShowJourney(false)} />
        </div>
    );
}

