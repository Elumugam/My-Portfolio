const skills = [
    { category: "Core", items: ["Python", "SQL", "JavaScript", "REST APIs"] },
    { category: "AI/ML", items: ["Machine Learning", "Scikit-learn", "Pandas", "NumPy", "Feature Engineering", "Model Evaluation", "Exploratory Data Analysis (EDA)", "Generative AI (LLMs, Prompt Engineering, RAG)"] },
    { category: "Infrastructure", items: ["Git & GitHub", "Docker (Basic)", "Cloud Deployment", "MongoDB", "Relational Databases"] },
];

export default function About() {
    return (
        <div className="max-w-7xl mx-auto px-8 lg:px-24 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                <div className="lg:col-span-4">
                    <h2 className="section-label mb-8 text-white">About</h2>
                    <p className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-white mb-12">
                        Engineering with <br />
                        clinical precision.
                    </p>
                    <div className="space-y-4">
                        <div className="line-accent bg-white w-12 h-[1px] opacity-30" />
                        <p className="text-muted text-xs font-bold tracking-widest uppercase">EST. 2022</p>
                    </div>
                </div>

                <div className="lg:col-span-8 space-y-12">
                    <p className="text-2xl text-muted font-medium leading-relaxed max-w-2xl">
                        I build scalable backend systems and production-grade AI solutions with a strong focus on performance, reliability,
                        and clean architecture. I care about systems that don’t just work — they scale, last, and create real impact.

                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-16">
                        {skills.map((skill) => (
                            <div key={skill.category} className="space-y-6">
                                <h3 className="section-label text-white/50">{skill.category}</h3>
                                <ul className="space-y-3">
                                    {skill.items.map((item) => (
                                        <li key={item} className="text-muted font-bold text-[10px] tracking-widest uppercase">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="pt-16 border-t border-white/5">
                        <h3 className="section-label mb-12 text-white/50">Trajectory</h3>
                        <div className="space-y-12">
                            {[
                                { role: "Software Engineer", company: "Portfolio Ventures", period: "2024 — Pres." },
                                { role: "Data Science Intern", company: "Tech Dynamic", period: "2023 — 2024" },
                            ].map((job) => (
                                <div key={job.company} className="flex justify-between items-end group cursor-default">
                                    <div className="space-y-1">
                                        <p className="text-xl font-bold text-white group-hover:text-muted transition-colors">{job.role}</p>
                                        <p className="text-[10px] text-muted uppercase tracking-widest font-bold">{job.company}</p>
                                    </div>
                                    <p className="text-[10px] text-muted font-bold tracking-widest">{job.period}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
