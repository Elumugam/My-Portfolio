
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial="hidden"
                animate="visible"
                transition={{ staggerChildren: 0.1 }}
            >
                <motion.h1 variants={variants} className="text-4xl font-bold mb-8">
                    <span className="gradient-text">About Me</span>
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <motion.div variants={variants} className="lg:col-span-2 space-y-8">
                        <div className="glass p-8 rounded-2xl">
                            <p className="text-gray-300 leading-relaxed text-lg mb-6">
                                I’m R Elumugam, an aspiring Data Scientist, Python Developer, Artificial Intelligence enthusiast, and Full Stack Developer with a strong interest in building intelligent, data-driven applications using AI. I’m currently pursuing a B.Tech in Artificial Intelligence and Data Science, where I’ve developed a solid foundation in programming, data analysis, machine learning, and modern web development.
                            </p>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                I have hands-on experience working with Python, React, Node.js, and MongoDB, and I actively use AI-powered tools and platforms like Orange Data Mining, n8n, and Google Antigravity to streamline development and automate workflows. I enjoy creating scalable, real-world solutions that combine intelligent systems with clean, user-focused design.
                            </p>
                        </div>


                        {/* Experience */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold flex items-center gap-2">
                                <Briefcase className="text-secondary" /> Experience
                            </h2>
                            <div className="glass p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                                <h3 className="text-xl font-medium text-white">Full Stack Developer Intern</h3>
                                <p className="text-gray-400 mt-1">Gaining experience in building full-stack web applications.</p>
                            </div>
                            <div className="glass p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
                                <h3 className="text-xl font-medium text-white">Data Science Intern</h3>
                                <p className="text-gray-400 mt-1">Working on data analysis and machine learning projects.</p>
                            </div>
                        </div>

                        {/* Projects */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold flex items-center gap-2">
                                <Code className="text-primary" /> Projects
                            </h2>

                            {/* Sales Prediction */}
                            <div className="glass p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors group">
                                <h3 className="text-xl font-medium text-white group-hover:text-primary transition-colors">Sales Prediction using Machine Learning</h3>
                                <p className="text-sm text-secondary mb-2">Data Science & Predictive Analytics Project</p>
                                <p className="text-gray-400 mb-4">
                                    Created a machine-learning model to forecast sales using data analysis, EDA, and predictive modeling techniques.
                                </p>
                            </div>

                            {/* TripO */}
                            <div className="glass p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors group">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-medium text-white group-hover:text-primary transition-colors">TripO</h3>
                                        <p className="text-sm text-secondary mb-2">Travel Website</p>
                                    </div>
                                    <a href="https://github.com/Elumugam/TripO.git" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                        <span className="sr-only">GitHub</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                                <p className="text-gray-400">
                                    A travel website specifically designed to showcase traditional events around India.
                                </p>
                            </div>

                            {/* M-Tracker */}
                            <div className="glass p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors group">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-medium text-white group-hover:text-primary transition-colors">M-Tracker</h3>
                                        <p className="text-sm text-secondary mb-2">Expense Tracking Application</p>
                                    </div>
                                    <a href="https://github.com/Elumugam/M-Tracker.git" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                        <span className="sr-only">GitHub</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                                <p className="text-gray-400">
                                    A comprehensive expense tracking web application to manage personal finances.
                                </p>
                            </div>

                            {/* Genz art */}
                            <div className="glass p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors group">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-medium text-white group-hover:text-primary transition-colors">Genz art</h3>
                                        <p className="text-sm text-secondary mb-2">AI Image Editing & Generation</p>
                                    </div>
                                    <a href="https://github.com/Elumugam/genz-art-magic.git" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                        <span className="sr-only">GitHub</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                                <p className="text-gray-400">
                                    A web application that breaks down image edits and provides prompts to create new images or convert image styles.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div variants={variants} className="space-y-8">
                        {/* Education */}
                        <div className="glass p-6 rounded-xl">
                            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                                <GraduationCap className="text-primary" /> Education
                            </h2>
                            <div className="mb-2">
                                <h3 className="text-white font-medium">B.Tech in AI & Data Science</h3>
                                <p className="text-gray-400 text-sm">Coimbatore, Tamil Nadu, India</p>
                                <div className="mt-2 inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold">
                                    CGPA: 8.0
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="glass p-6 rounded-xl">
                            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                                <Code className="text-accent" /> Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map(skill => (
                                    <span key={skill} className="px-3 py-1 rounded-md bg-white/5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Tools */}
                        <div className="glass p-6 rounded-xl">
                            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                                <Wrench className="text-green-400" /> Tools
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {tools.map(tool => (
                                    <span key={tool} className="px-3 py-1 rounded-md bg-white/5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-default">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Interests */}
                        <div className="glass p-6 rounded-xl">
                            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                                <Brain className="text-purple-400" /> Interests
                            </h2>
                            <ul className="text-gray-400 text-sm space-y-2 list-disc list-inside">
                                <li>AI & Data Science</li>
                                <li>Full Stack Development</li>
                                <li>Building Scalable Solutions</li>
                                <li>AI Automation</li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
