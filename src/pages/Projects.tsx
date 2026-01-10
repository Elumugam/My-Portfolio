
import { motion } from "framer-motion";
import { Play, Code2, Rocket, Clock, ExternalLink } from "lucide-react";

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
    }
];

const columns = [
    { id: "Completed", title: "Completed Projects", icon: <Rocket className="text-green-400" size={20} /> },
    { id: "In Progress", title: "In Progress", icon: <Clock className="text-blue-400" size={20} /> },
    { id: "Upcoming", title: "Upcoming / Planned", icon: <Code2 className="text-purple-400" size={20} /> }
];

export default function Projects() {
    const baseUrl = import.meta.env.BASE_URL;
    const getImageUrl = (path: string) => {
        return `${baseUrl}${path.startsWith('/') ? path.slice(1) : path}`;
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        My <span className="gradient-text">Projects</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        A showcase of my recent work, including AI applications, full-stack platforms, and creative web solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {columns.map((column) => (
                        <div key={column.id} className="flex flex-col space-y-6">
                            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-lg border border-white/10">
                                {column.icon}
                                <h2 className="font-semibold text-gray-200">{column.title}</h2>
                                <span className="ml-auto bg-white/10 px-2 py-0.5 rounded text-xs text-gray-400">
                                    {projects.filter(p => p.status === column.id).length}
                                </span>
                            </div>

                            <div className="flex flex-col space-y-4">
                                {projects
                                    .filter((p) => p.status === column.id)
                                    .map((project, index) => (
                                        <motion.div
                                            key={project.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="glass rounded-xl overflow-hidden hover:border-primary/50 transition-all group"
                                        >
                                            {/* Thumbnail / Video Preview */}
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

                                            {/* Content */}
                                            <div className="p-5">
                                                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </h3>
                                                <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                                                    {project.description}
                                                </p>

                                                {/* Tech Stack */}
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
                                        </motion.div>
                                    ))}

                                {projects.filter(p => p.status === column.id).length === 0 && (
                                    <div className="border border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                                        <p className="text-sm text-gray-500 italic">No projects in this stage yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
