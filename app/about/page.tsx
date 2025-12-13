"use client";

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
