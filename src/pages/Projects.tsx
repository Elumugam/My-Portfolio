import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        title: "FILEDROP",
        category: "Storage / Security",
        year: "2026",
        description: "Cloud-native platform that converts any file into a secure, shareable link with instant delivery.",
        link: "https://github.com/Elumugam/FILE.DROP.git"
    },
    {
        title: "Classmate+",
        category: "AI / Productivity",
        year: "2026",
        description: "Intelligence-driven study companion featuring automated task management.",
        link: "https://classmate-plus.onrender.com"
    },
    {
        title: "Gen z Art",
        category: "Generative AI",
        year: "2025",
        description: "Creative exploration platform leveraging stable diffusion pipelines.",
        link: "https://github.com/Elumugam/genz-art-magic"
    }
];

export default function Projects() {
    return (
        <div className="max-w-7xl mx-auto px-8 lg:px-24">
            <div className="space-y-12">
                <div>
                    <h2 className="section-label mb-8 text-white">Selection</h2>
                    <p className="text-4xl font-bold tracking-tighter text-white">Featured Works.</p>
                </div>

                <div className="divide-y divide-white/5 border-t border-b border-white/5">
                    {projects.map((project) => (
                        <a
                            key={project.title}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block py-12 flex flex-col md:flex-row md:items-center justify-between gap-12 hover:px-8 transition-all duration-500 ease-in-out"
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
                    ))}
                </div>
            </div>
        </div>
    );
}
