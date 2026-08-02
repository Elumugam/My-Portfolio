import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import profileHero from "../assets/profile-hero.png";
import logoImg from "../assets/logo.png";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "TripO", href: "#tripo" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Active section highlighting on Home page
            if (location.pathname === "/" || location.pathname === "") {
                const sectionIds = ["about", "projects", "tripo", "contact"];
                let current = "";
                for (const id of sectionIds) {
                    const el = document.getElementById(id);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        if (rect.top <= 200 && rect.bottom >= 200) {
                            current = id;
                            break;
                        }
                    }
                }
                setActiveSection(current);
            } else {
                setActiveSection("");
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const id = href.replace("#", "");

        if (location.pathname !== "/" && location.pathname !== "") {
            navigate("/#" + id);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
                window.history.pushState(null, "", `#${id}`);
                setActiveSection(id);
            }
        }
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4 md:pt-6 pointer-events-none">
                <nav className={clsx(
                    "max-w-6xl mx-auto w-full pointer-events-auto rounded-full transition-all duration-500 border border-white/10 px-6 py-3 md:py-3.5 flex items-center justify-between shadow-2xl",
                    scrolled ? "bg-black/80 backdrop-blur-xl border-white/15" : "bg-black/40 backdrop-blur-md"
                )}>
                    {/* Logo on Left */}
                    <a
                        href="#hero"
                        onClick={(e) => handleNavClick(e, "#hero")}
                        className="flex items-center group cursor-pointer"
                    >
                        <img
                            src={logoImg}
                            alt="Logo"
                            className="h-10 md:h-[36px] w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
                        />
                    </a>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex gap-8 items-center">
                        {navLinks.map((link) => {
                            const linkId = link.href.replace("#", "");
                            const isActive = activeSection === linkId;
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={`text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 relative py-1 ${
                                        isActive
                                            ? "text-white font-bold"
                                            : "text-white/60 hover:text-white"
                                    }`}
                                >
                                    {link.name}
                                    {isActive && (
                                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full animate-fadeIn" />
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    {/* Connect Button on Right */}
                    <div className="hidden md:flex items-center">
                        <a
                            href="#contact"
                            onClick={(e) => handleNavClick(e, "#contact")}
                            className="px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.04] text-[10px] font-bold tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            Connect
                        </a>
                    </div>

                    {/* Mobile Hamburger Icon */}
                    <button
                        className="md:hidden text-white focus:outline-none p-1.5 hover:opacity-80 transition-opacity"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </nav>
            </header>

            {/* Mobile Hamburger Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
                            className="absolute top-0 right-0 bottom-0 w-[70vw] border-l border-white/10 shadow-2xl flex flex-col"
                            style={{ backgroundColor: "rgba(0,0,0,0.95)", backdropFilter: "blur(10px)", padding: "30px" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="self-end text-white/50 hover:text-white mb-12 focus:outline-none"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <X size={32} />
                            </button>
                            <div className="flex flex-col gap-8">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => {
                                            setIsMobileMenuOpen(false);
                                            handleNavClick(e, link.href);
                                        }}
                                        className="text-lg font-medium text-white/80 hover:text-white tracking-widest uppercase transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Profile Image Modal (Interactive Flip Card) */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="profile-modal fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md md:p-12"
                        onClick={() => {
                            setIsModalOpen(false);
                            // reset flip state on close after a small delay
                            setTimeout(() => setIsFlipped(false), 300);
                        }}
                    >
                        <button
                            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors focus:outline-none z-50"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(false);
                                setTimeout(() => setIsFlipped(false), 300);
                            }}
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="profile-card-container profile-card w-[90vw] md:max-w-[460px] min-h-[420px] h-auto md:h-[580px] rounded-[24px] md:rounded-3xl m-0 z-[9999]"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsFlipped(!isFlipped);
                            }}
                        >
                            <motion.div
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.7, ease: "easeInOut" }}
                                style={{ transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d" }}
                                className="w-full h-full absolute inset-0 cursor-pointer"
                            >
                                {/* Front Face */}
                                <div
                                    className="profile-front front-side absolute inset-0 rounded-[24px] md:rounded-3xl border border-white/10 flex flex-col items-center justify-center p-6 md:p-8 shadow-2xl overflow-hidden"
                                    style={{
                                        backgroundColor: "rgba(15,15,15,0.95)",
                                        backdropFilter: "blur(15px)",
                                        WebkitBackdropFilter: "blur(15px)",
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                        transform: "rotateY(0deg)",
                                        WebkitTransform: "rotateY(0deg)"
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
                                    <div className="w-[100px] h-[100px] md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/20 mb-4 bg-white/5 flex items-center justify-center flex-shrink-0 relative z-10">
                                        <img
                                            src={profileHero}
                                            alt="EM Profile"
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white relative z-10 mb-2 md:mb-0">EM</h2>

                                    <button
                                        className="absolute bottom-8 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all z-20 md:hidden pointer-events-none"
                                    >
                                        View Details
                                    </button>
                                    <p className="text-white/50 mt-4 text-xs uppercase tracking-widest relative z-20 md:hidden pointer-events-none">
                                        Tap to view profile
                                    </p>
                                    <p className="text-white/40 mt-2 text-xs uppercase tracking-widest absolute bottom-8 opacity-50 hidden md:block pointer-events-none">
                                        Click or drag to view profile ➔
                                    </p>
                                </div>

                                {/* Back Face */}
                                <div
                                    className="profile-back back-side profile-card-back absolute inset-0 rounded-[24px] md:rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl overflow-hidden"
                                    style={{
                                        backgroundColor: "rgba(15,15,15,0.95)",
                                        backdropFilter: "blur(15px)",
                                        WebkitBackdropFilter: "blur(15px)",
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                        WebkitTransform: "rotateY(180deg)"
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
                                    <div className="relative z-10 w-full flex flex-col items-center justify-center text-center gap-4 md:gap-[18px]" style={{ lineHeight: 1.3 }}>
                                        <h2 className="text-[clamp(24px,2vw,42px)] font-bold text-white mb-0">
                                            Hey Hi! 👋<br />I'm Elumugam
                                        </h2>
                                        <div className="w-12 h-[1px] bg-white/20 mx-auto" />
                                        <div className="text-muted text-sm md:text-lg flex flex-col items-center gap-2 md:gap-3">
                                            <span className="font-medium text-white/90">Founder @TripO</span>
                                            <span>Software Developer</span>
                                            <span className="mt-2">Building AI-Powered Products &amp;</span>
                                            <span>Backend Systems</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
