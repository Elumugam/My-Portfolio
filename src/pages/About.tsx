
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Code, Wrench, Brain } from "lucide-react";

export default function About() {
    const skills = [
        "Python", "JavaScript", "React.js", "MongoDB", "SQL",
        "Data Analysis", "Machine Learning", "API Integration", "Automation", "Git"
    ];

    const tools = [
        "Orange Data Mining", "n8n", "Google Antigravity",
        "GitHub", "VS Code", "Excel", "AI Tools (ChatGPT, Gemini, Veo3)"
    ];

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1 }}
            >
                <motion.div variants={variants} className="flex flex-col items-center mb-24 text-center">
                    <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
                        Identity
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 tracking-tight">
                        About <span className="gradient-text">Me</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl">
                        A bridge between data science and full-stack engineering.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Info */}
                    <motion.div variants={variants} className="lg:col-span-2 space-y-12">
                        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]">
                            <h2 className="text-2xl font-black mb-6 text-gray-900 tracking-tight">Biography</h2>
                            <p className="text-muted-foreground leading-[1.8] text-lg font-medium">
                                I’m R Elumugam, a Python Developer and AI-focused Full-Stack Engineer currently pursuing a B.Tech in Artificial Intelligence and Data Science. I architect scalable, data-driven applications that combine intelligent backend systems with elegant user interfaces.
                            </p>
                            <p className="text-muted-foreground leading-[1.8] text-lg font-medium mt-6">
                                My approach leverages modern automation tools (n8n, Google Antigravity) and machine learning pipelines to solve complex problems efficiently. I believe in creating solutions that are not just technically sound, but practically impactful.
                            </p>
                        </div>

                        {/* Experience */}
                        <div className="space-y-8">
                            <h2 className="text-2xl font-black flex items-center gap-4 text-gray-900 tracking-tight">
                                <span className="p-3 bg-secondary/10 rounded-2xl text-secondary"><Briefcase size={22} /></span>
                                Professional Experience
                            </h2>
                            <div className="grid gap-6">
                                {[
                                    { title: "Full Stack Developer Intern", desc: "Developing production-grade web applications using React and Node.js." },
                                    { title: "Data Science Intern", desc: "Implementing predictive models and performing deep data analysis to drive insights." }
                                ].map((exp, i) => (
                                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-500 group">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-secondary transition-colors">{exp.title}</h3>
                                        <p className="text-muted-foreground mt-2 font-medium leading-relaxed">{exp.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* High Impact Highlights */}
                        <div className="space-y-8">
                            <h2 className="text-2xl font-black flex items-center gap-4 text-gray-900 tracking-tight">
                                <span className="p-3 bg-primary/10 rounded-2xl text-primary"><Code size={22} /></span>
                                Technical Highlights
                            </h2>
                            <div className="grid gap-6">
                                {[
                                    { title: "AI Predictive Analytics", desc: "Built end-to-end ML pipelines for sales forecasting with automated data preprocessing." },
                                    { title: "Workflow Orchestration", desc: "Automated complex professional certification workflows via WhatsApp and LinkedIn integration." }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{item.title}</h3>
                                        <p className="text-muted-foreground mt-2 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div variants={variants} className="space-y-10">
                        {/* Education */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-black flex items-center gap-3 mb-6 text-gray-900 tracking-tight">
                                <span className="p-2.5 bg-primary/10 rounded-xl text-primary"><GraduationCap size={20} /></span> Education
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-gray-900 font-bold">B.Tech in AI & Data Science</h3>
                                    <p className="text-muted-foreground text-sm font-medium">Coimbatore, India</p>
                                    <div className="mt-3 inline-flex px-4 py-1.5 bg-primary/5 text-primary rounded-full text-xs font-bold ring-1 ring-primary/20">
                                        GPA: 8.0 / 10
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Technical Arsenal */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-black flex items-center gap-3 mb-6 text-gray-900 tracking-tight">
                                <span className="p-2.5 bg-accent/10 rounded-xl text-accent"><Code size={20} /></span> Skills
                            </h2>
                            <div className="flex flex-wrap gap-2.5">
                                {skills.map(skill => (
                                    <span key={skill} className="px-4 py-2 rounded-xl bg-gray-50 text-[11px] font-bold tracking-wider text-gray-600 hover:bg-white hover:shadow-md hover:text-primary border border-gray-100 transition-all cursor-default uppercase">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Digital Tools */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-black flex items-center gap-3 mb-6 text-gray-900 tracking-tight">
                                <span className="p-2.5 bg-green-50 rounded-xl text-green-600"><Wrench size={20} /></span> Tools
                            </h2>
                            <div className="flex flex-wrap gap-2.5">
                                {tools.map(tool => (
                                    <span key={tool} className="px-4 py-2 rounded-xl bg-gray-50 text-[11px] font-bold tracking-wider text-gray-600 hover:bg-white hover:shadow-md hover:text-green-600 border border-gray-100 transition-all cursor-default uppercase">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Specializations */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-black flex items-center gap-3 mb-6 text-gray-900 tracking-tight">
                                <span className="p-2.5 bg-purple-50 rounded-xl text-purple-600"><Brain size={20} /></span> Focus
                            </h2>
                            <div className="space-y-3">
                                {["Deep Learning Pipelines", "Scalable Backend Arch", "AI Workflow Automation", "Full Stack Strategy"].map(item => (
                                    <div key={item} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-300" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

