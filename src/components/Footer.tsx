
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white pb-12 pt-16 border-t border-gray-100 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <span className="text-lg font-bold text-gray-900 block mb-1">Elumugam.Dev</span>
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} R Elumugam. All rights reserved.
                        </p>
                    </div>

                    <div className="flex space-x-8">
                        <a
                            href="https://github.com/Elumugam"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-900 transition-colors"
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/in/elumugam-r-201b06292"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="mailto:elumugam.dev@gmail.com"
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Email"
                        >
                            <Mail size={20} />
                        </a>
                        <a
                            href="tel:+919585155367"
                            className="text-gray-400 hover:text-green-500 transition-colors"
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
