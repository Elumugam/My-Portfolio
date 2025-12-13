"use client";

import { Github, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="glass mt-12 py-8 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center bg-transparent">
                    <div className="mb-4 md:mb-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} R Elumugam. All rights reserved.
                        </p>
                    </div>

                    <div className="flex space-x-6">
                        <a
                            href="https://github.com/Elumugam"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary transition-colors"
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/in/elumugam-r-201b06292"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-primary transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="mailto:elumugam.dev@gmail.com"
                            className="text-gray-400 hover:text-primary transition-colors"
                            aria-label="Email"
                        >
                            <Mail size={20} />
                        </a>
                        <a
                            href="tel:+919585155367"
                            className="text-gray-400 hover:text-primary transition-colors"
                            aria-label="Phone"
                        >
                            <Phone size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
