"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-7xl w-full">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="order-2 md:order-1 text-center md:text-left"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium mb-4">
            Welcome to my portfolio
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Hi, I&apos;m <span className="gradient-text">R Elumugam</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-6 font-light">
            Aspiring Python Developer | AI, Full-Stack Development & Data Science
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
            I build intelligent, data-driven applications. Passionate about Artificial Intelligence, Data Science, and creating scalable real-world solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              href="/contact"
              className="px-8 py-3 rounded-full bg-primary hover:bg-primary/90 text-white font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2"
            >
              Contact Me <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 rounded-full glass hover:bg-white/10 text-white font-medium transition-all flex items-center justify-center gap-2"
            >
              More About Me
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center md:justify-start gap-6 text-gray-400">
            <a href="https://github.com/Elumugam" target="_blank" className="hover:text-white transition-colors" aria-label="GitHub"><Github /></a>
            <a href="https://linkedin.com/in/elumugam-r-201b06292" target="_blank" className="hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin /></a>
          </div>
        </motion.div>

        {/* Image Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="order-1 md:order-2 flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden glass border-2 border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/images/profile-pic.jpg"
                alt="R Elumugam"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
