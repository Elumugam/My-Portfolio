import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { portfolioStore, Project } from "../services/portfolioStore";

export default function TripO() {
    const [tripoData, setTripoData] = useState<Project | null>(() => {
        const found = portfolioStore.getProjects().find((p) => p.title.toLowerCase().includes("tripo"));
        return found || null;
    });

    useEffect(() => {
        const handleUpdate = () => {
            const found = portfolioStore.getProjects().find((p) => p.title.toLowerCase().includes("tripo"));
            setTripoData(found || null);
        };

        window.addEventListener("portfolio-projects-updated", handleUpdate);
        window.addEventListener("storage", handleUpdate);
        return () => {
            window.removeEventListener("portfolio-projects-updated", handleUpdate);
            window.removeEventListener("storage", handleUpdate);
        };
    }, []);

    const title = tripoData?.title || "TripO";
    const description = tripoData?.description || "TripO is an AI-powered travel platform designed to help users discover places, plan trips, explore destinations, and connect with communities through a smarter travel experience.";
    const link = tripoData?.liveUrl || tripoData?.link || "https://tripoapp.in/";
    const isPublished = tripoData ? tripoData.published : true;

    if (!isPublished) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-10 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
                {/* Left — label + title */}
                <Reveal className="lg:col-span-4">
                    <h2 className="section-label mb-6 sm:mb-8 text-white">Featured Project</h2>
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-white mb-4 sm:mb-6">
                        {title}
                    </p>
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted mb-8 sm:mb-10">
                        Travel · Explore · Connect
                    </p>
                    <div className="space-y-4">
                        <div className="line-accent bg-white w-12 h-[1px] opacity-30" />
                        <p className="text-muted text-xs font-bold tracking-widest uppercase">AI-Powered</p>
                    </div>
                </Reveal>

                {/* Right — description + button */}
                <Reveal className="lg:col-span-8 flex flex-col justify-center space-y-6 sm:space-y-8" delay={0.15}>
                    <p className="text-base sm:text-lg md:text-xl text-muted font-medium leading-relaxed max-w-2xl">
                        {description}
                    </p>

                    <div className="flex items-center gap-6">
                        <motion.a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-minimal inline-block"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                        >
                            Visit {title}
                        </motion.a>

                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted opacity-40">
                            {link.replace("https://", "").replace("http://", "").replace("/", "")}
                        </span>
                    </div>
                </Reveal>
            </div>
        </div>
    );
}
