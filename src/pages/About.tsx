import Reveal from "../components/Reveal";

const skills = [
    { category: "Core", items: ["Python", "SQL", "JavaScript", "REST APIs"] },
    { category: "AI/ML", items: ["Machine Learning", "Scikit-learn", "Pandas", "NumPy", "Feature Engineering", "Model Evaluation", "Exploratory Data Analysis (EDA)", "Generative AI (LLMs, Prompt Engineering, RAG)"] },
    { category: "Infrastructure", items: ["Git & GitHub", "Docker (Basic)", "Cloud Deployment", "MongoDB", "Relational Databases"] },
];

export default function About() {
    return (
        <div className="max-w-6xl mx-auto px-6 lg:px-16 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                <Reveal className="lg:col-span-4">
                    <h2 className="section-label mb-8 text-white">About</h2>
                    <p className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-white mb-12">
                        Engineering with <br />
                        clinical precision.
                    </p>
                    <div className="space-y-4">
                        <div className="line-accent bg-white w-12 h-[1px] opacity-30" />
                        <p className="text-muted text-xs font-bold tracking-widest uppercase">EST. 2022</p>
                    </div>
                </Reveal>

                <div className="lg:col-span-8 space-y-12">
                    <Reveal delay={0.15}>
                        <p className="text-2xl text-muted font-medium leading-relaxed max-w-2xl">
                            I build scalable backend systems and production-grade AI solutions with a strong focus on performance, reliability,
                            and clean architecture. I care about systems that don’t just work — they scale, last, and create real impact.

                        </p>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-16">
                        {skills.map((skill, i) => (
                            <Reveal key={skill.category} className="space-y-6" delay={i * 0.12}>
                                <h3 className="section-label text-white/50">{skill.category}</h3>
                                <ul className="space-y-3">
                                    {skill.items.map((item) => (
                                        <li key={item} className="text-muted font-bold text-[10px] tracking-widest uppercase">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        ))}
                    </div>

                    <div className="pt-16 border-t border-white/5">
                        <Reveal>
                            <h3 className="section-label mb-12 text-white/50">Trajectory</h3>
                        </Reveal>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                            <div className="md:col-span-7 space-y-12">
                                {[
                                    { role: "Software Engineer", company: "Portfolio Ventures", period: "2024 — Pres." },
                                    { role: "Data Science Intern", company: "Tech Dynamic", period: "2023 — 2024" },
                                ].map((job, i) => (
                                    <Reveal key={job.company} delay={i * 0.12}>
                                        <div className="flex justify-between items-end group cursor-default relative">
                                            <div className="space-y-1">
                                                <p className="text-xl font-bold text-white group-hover:text-muted transition-colors">{job.role}</p>
                                                <p className="text-[10px] text-muted uppercase tracking-widest font-bold">{job.company}</p>
                                            </div>
                                            <p className="text-[10px] text-muted font-bold tracking-widest">{job.period}</p>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                            
                            {/* Empty Space Filler: Minimal Tech Illustration */}
                            <Reveal className="hidden md:flex md:col-span-5 relative items-center justify-center pl-12" delay={0.2}>
                                <div className="absolute left-0 top-4 bottom-4 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent" />
                                
                                <div className="flex flex-col gap-10 w-full">
                                    <div className="flex items-center gap-6 group">
                                        <div className="relative">
                                            <div className="w-2 h-2 rounded-full bg-white relative z-10" />
                                            <div className="absolute inset-0 bg-white rounded-full blur-[4px] opacity-60 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute top-1/2 right-full w-12 h-[1px] bg-white/10 -translate-y-1/2" />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono">Full_Stack_Scale</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-6 ml-12 group">
                                        <div className="relative">
                                            <div className="w-2 h-2 rounded-full bg-white/40 relative z-10" />
                                            <div className="absolute inset-0 bg-white/40 rounded-full blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute top-1/2 right-full w-24 h-[1px] bg-white/10 -translate-y-1/2" />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-mono">AI_Integration</span>
                                    </div>

                                    <div className="flex items-center gap-6 ml-4 group">
                                        <div className="relative">
                                            <div className="w-2 h-2 rounded-full bg-white/20 relative z-10" />
                                            <div className="absolute inset-0 bg-white/20 rounded-full blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute top-1/2 right-full w-16 h-[1px] bg-white/10 -translate-y-1/2" />
                                        </div>
                                        <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-mono">Data_Pipeline</span>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
