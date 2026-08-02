import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { portfolioStore, Project } from "../services/portfolioStore";

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>(() => portfolioStore.getPublishedProjects());

    useEffect(() => {
        const handleUpdate = () => {
            setProjects(portfolioStore.getPublishedProjects());
        };

        window.addEventListener("portfolio-projects-updated", handleUpdate);
        window.addEventListener("storage", handleUpdate);
        return () => {
            window.removeEventListener("portfolio-projects-updated", handleUpdate);
            window.removeEventListener("storage", handleUpdate);
        };
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-10 lg:py-12">
            <div className="space-y-8 sm:space-y-10">
                <Reveal>
                    <h2 className="section-label mb-4 sm:mb-6 text-white">Selection</h2>
                    <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-white">Featured Works.</p>
                </Reveal>

                <div className="divide-y divide-white/5 border-t border-b border-white/5">
                    {projects.map((project, i) => (
                        <Reveal key={project.id || project.title} delay={i * 0.1}>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 hover:px-4 sm:hover:px-6 transition-all duration-500 ease-in-out cursor-pointer"
                            >
                                <div className="space-y-2 max-w-xl">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{project.category}</span>
                                        <span className="text-[10px] font-bold text-white/20">{project.year}</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white group-hover:text-muted transition-colors tracking-tighter uppercase">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted text-xs sm:text-sm md:text-base font-medium leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 text-white opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Visit Project</span>
                                    <ArrowUpRight size={20} strokeWidth={1} />
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
