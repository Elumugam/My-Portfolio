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
        return () => window.removeEventListener("portfolio-projects-updated", handleUpdate);
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-6 lg:px-16">
            <div className="space-y-12">
                <Reveal>
                    <h2 className="section-label mb-8 text-white">Selection</h2>
                    <p className="text-4xl font-bold tracking-tighter text-white">Featured Works.</p>
                </Reveal>

                <div className="divide-y divide-white/5 border-t border-b border-white/5">
                    {projects.map((project, i) => (
                        <Reveal key={project.id || project.title} delay={i * 0.1}>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block py-12 flex flex-col md:flex-row md:items-center justify-between gap-12 hover:px-8 transition-all duration-500 ease-in-out cursor-pointer"
                            >
                                <div className="space-y-2 max-w-xl">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{project.category}</span>
                                        <span className="text-[10px] font-bold text-white/20">{project.year}</span>
                                    </div>
                                    <h3 className="text-5xl font-bold text-white group-hover:text-muted transition-colors tracking-tighter uppercase">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted text-lg font-medium leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 text-white opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                    <span className="text-[10px] font-bold tracking-widest uppercase">Visit Project</span>
                                    <ArrowUpRight size={24} strokeWidth={1} />
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
}
