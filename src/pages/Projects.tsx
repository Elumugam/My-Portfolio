
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
                    className="flex flex-col items-center text-center mb-16"
                >
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-primary uppercase bg-primary/5 rounded-full">
                        What I've Built
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                        My <span className="gradient-text">Projects</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        A showcase of my recent work, including AI applications, full-stack platforms, and creative web solutions.
                    </p>
                </motion.div>

                {/* Status Switcher */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex p-1 bg-gray-100 rounded-2xl overflow-x-auto no-scrollbar max-w-full">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={clsx(
                                    "px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap",
                                    activeTab === tab.id
                                        ? "bg-white text-primary shadow-sm"
                                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                                )}
                            >
                                <span className={clsx(
                                    "transition-colors",
                                    activeTab === tab.id ? "text-primary" : "text-gray-400"
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
                                        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col h-full"
                                    >
                                        {/* Thumbnail Area */}
                                        <div className="relative aspect-video overflow-hidden bg-gray-100">
                                            <img
                                                src={getImageUrl(project.thumbnail)}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl hover:scale-110 transition-transform"
                                                >
                                                    <Play fill="currentColor" size={24} className="ml-1" />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Project Info */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                                                {project.description}
                                            </p>

                                            {/* Tech tags */}
                                            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                                                {project.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 bg-gray-50 rounded-md border border-gray-100 text-gray-500"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="border-t border-gray-50 pt-4 mt-2">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full py-3 rounded-xl bg-gray-50 hover:bg-primary text-gray-900 hover:text-white text-sm font-bold transition-all flex items-center justify-center gap-2 group/btn"
                                                >
                                                    <Play size={16} className="group-hover/btn:fill-current" />
                                                    View Project
                                                    <ExternalLink size={14} className="opacity-50" />
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-1 md:col-span-2 lg:col-span-3 border-2 border-dashed border-gray-200 rounded-3xl p-16 flex flex-col items-center justify-center text-center bg-gray-50/50">
                                    <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-gray-400">
                                        <Code2 size={32} />
                                    </div>
                                    <h4 className="text-gray-900 font-bold mb-1">No Projects Found</h4>
                                    <p className="text-sm text-muted-foreground">No projects are currently in this category.</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

