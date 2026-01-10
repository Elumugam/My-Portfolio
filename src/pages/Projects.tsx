
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Rocket, Clock, Code2, ExternalLink } from "lucide-react";
import clsx from "clsx";

interface Project {
    title: string;
    description: string;
    tech: string[];
    status: "Completed" | "In Progress" | "Upcoming";
    link: string;
    thumbnail: string;
}

const projects: Project[] = [
    {
        title: "Portfolio Website",
        description: "A professional portfolio website showcasing my skills, projects, and experience with a modern UI.",
        tech: ["React", "GitHub Pages", "Tailwind CSS", "Framer Motion"],
        status: "Completed",
        link: "https://www.linkedin.com/posts/elumugam-r-201b06292_portfolio-webdevelopment-githubpages-activity-7408142141690150913-mXg9?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEb_zaEBDSQ5tSDee33WJeDpP1JCMc7wWz4",
        thumbnail: "images/project-portfolio.png"
    },
    {
        title: "Genz Art",
        description: "An AI-powered art generation platform designed for the creative community to explore AI creativity.",
        tech: ["React", "Node.js", "MongoDB", "AI Models"],
        status: "Completed",
        link: "https://www.linkedin.com/posts/elumugam-r-201b06292_ai-genzart-aicreativity-activity-7404883952756396033-2-iU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEb_zaEBDSQ5tSDee33WJeDpP1JCMc7wWz4",
        thumbnail: "images/project-genz-art.png"
    },
    {
        title: "ClassMates+",
        description: "A collaborative learning platform with AI-integrated study tools, resources, and shared documents.",
        tech: ["React", "Node.js", "MongoDB", "AI APIs"],
        status: "Completed",
        link: "https://www.linkedin.com/posts/elumugam-r-201b06292_ai-genzart-aicreativity-activity-7404883952756396033-2-iU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEb_zaEBDSQ5tSDee33WJeDpP1JCMc7wWz4",
        thumbnail: "images/project-classmates-plus.png"
    },
    {
        title: "Whatsaapp LinkedIn Post Automation",
        description: "Automation that triggers LinkedIn post creation and certificate uploads directly from WhatsApp, streamlining professional updates using workflow automation.",
        tech: ["WhatsApp Automation", "LinkedIn Automation", "Make (Integromat)", "Webhooks", "APIs"],
        status: "Upcoming",
        link: "#",
        thumbnail: "images/project-whatsapp-automation.png"
    }
];

const tabs = [
    { id: "Completed", title: "Completed Projects", icon: <Rocket size={18} /> },
    { id: "In Progress", title: "In Progress", icon: <Clock size={18} /> },
    { id: "Upcoming", title: "Upcoming / Planned", icon: <Code2 size={18} /> }
];

export default function Projects() {
    const [activeTab, setActiveTab] = useState("Completed");
    const baseUrl = import.meta.env.BASE_URL;

    const getImageUrl = (path: string) => {
        return `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;
    };

    const filteredProjects = projects.filter(p => p.status === activeTab);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        My <span className="gradient-text">Projects</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        A showcase of my recent work, including AI applications, full-stack platforms, and creative web solutions.
                    </p>
                </motion.div>

                {/* Status Switcher */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex p-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-x-auto no-scrollbar max-w-full">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={clsx(
                                    "px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap",
                                    activeTab === tab.id
                                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <span className={clsx(
                                    activeTab === tab.id ? "text-white" : "text-gray-500"
                                )}>
                                    {tab.icon}
                                </span>
                                {tab.title}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Row-Based Layout (Grid) */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredProjects.length > 0 ? (
                                filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.title}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className="glass rounded-xl overflow-hidden hover:border-primary/50 transition-all group flex flex-col h-full"
                                    >
                                        {/* Thumbnail Area */}
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={getImageUrl(project.thumbnail)}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
                                                >
                                                    <Play fill="currentColor" size={20} />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Project Info */}
                                        <div className="p-5 flex flex-col flex-grow">
                                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                                                {project.description}
                                            </p>

                                            {/* Tech tags */}
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {project.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-white/5 rounded-md border border-white/10 text-gray-400"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="mt-auto">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-primary text-white text-sm font-medium transition-all flex items-center justify-center gap-2 group/btn"
                                                >
                                                    <Play size={16} className="group-hover/btn:fill-current" />
                                                    Watch Demo
                                                    <ExternalLink size={14} className="opacity-50" />
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-1 md:col-span-2 lg:col-span-3 border border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-gray-500">
                                        <Code2 size={32} />
                                    </div>
                                    <h4 className="text-gray-300 font-medium mb-1">No Projects Found</h4>
                                    <p className="text-sm text-gray-500 italic">No projects are currently in this category.</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
