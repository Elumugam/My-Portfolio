
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "PROJECTS", href: "/projects" },
    { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
    const location = useLocation();
    const pathname = location.pathname;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group transition-transform hover:scale-[1.02]">
                        <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center group-hover:bg-primary transition-colors duration-500 shadow-xl shadow-gray-200">
                            <span className="text-white font-black text-lg">E</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tight text-gray-900 leading-none">
                                Elumugam
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 mt-1 uppercase">Portfolio</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden lg:flex items-center space-x-12 absolute left-1/2 -translate-x-1/2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={clsx(
                                    "relative text-[11px] font-extrabold tracking-[0.2em] transition-all hover:text-primary hover:-translate-y-0.5",
                                    pathname === link.href ? "text-primary" : "text-gray-400"
                                )}
                            >
                                {link.name}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link
                            to="/contact"
                            className="group px-8 py-3.5 bg-gray-900 rounded-2xl text-[11px] font-black tracking-[0.2em] text-white flex items-center gap-2 hover:bg-gray-800 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300"
                        >
                            HIRE ME
                            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-gray-50 p-3 rounded-2xl text-gray-500 hover:text-gray-900 border border-gray-100 transition-all"
                        >
                            {isOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden bg-white border-t border-gray-50 shadow-2xl overflow-hidden"
                    >
                        <div className="px-6 py-10 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={clsx(
                                        "block px-6 py-5 rounded-[1.5rem] text-sm font-black tracking-[0.15em] transition-all",
                                        pathname === link.href
                                            ? "text-primary bg-primary/5 shadow-sm"
                                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to="/contact"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center mt-8 bg-gray-900 py-6 rounded-[1.5rem] text-sm font-black tracking-[0.2em] text-white shadow-xl shadow-gray-200"
                            >
                                HIRE ME
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

