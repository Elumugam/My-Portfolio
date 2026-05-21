import { useState, useEffect } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import profileHero from "../assets/profile-hero.png";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "TripO", href: "#tripo" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const id = href.substring(1); // strip the '#'
        const element = document.getElementById(id);
        if (element) {
            // scroll-margin-top in CSS handles the 80px navbar offset
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <>
            <nav className={clsx(
                "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
                scrolled ? "py-4 bg-black/80 backdrop-blur-sm" : "py-8 bg-transparent"
            )}>
                <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
                    
                    {/* Left Side: Profile Area */}
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 md:gap-3 group hover:opacity-80 transition-opacity focus:outline-none"
                    >
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors bg-white/5 flex items-center justify-center flex-shrink-0">
                            <img 
                                src={profileHero} 
                                alt="Profile" 
                                className="w-full h-full object-cover object-top"
                            />
                        </div>
                        <span className="text-lg md:text-xl font-bold tracking-tighter text-white">
                            EM
                        </span>
                    </button>

                    {/* Right Side: Navigation */}
                    <div className="flex gap-4 sm:gap-6 md:gap-8 items-center text-sm md:text-base overflow-x-auto no-scrollbar">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="nav-link"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Profile Image Modal (Interactive Flip Card) */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12"
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
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-[85vw] max-w-[340px] md:max-w-[440px] min-h-[450px] md:h-[540px] flex flex-col items-center justify-center"
                            style={{ perspective: 1500 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                                <motion.div
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={(e, { offset }) => {
                                        if (offset.x < -50) setIsFlipped(true); // swipe left
                                        else if (offset.x > 50) setIsFlipped(false); // swipe right
                                    }}
                                    onClick={() => setIsFlipped(!isFlipped)}
                                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                                    transition={{ duration: 0.7, type: "spring", stiffness: 150, damping: 20 }}
                                    style={{ transformStyle: "preserve-3d" }}
                                    className="w-full h-full relative cursor-grab active:cursor-grabbing md:cursor-pointer"
                                >
                                    {/* Front Face */}
                                <div 
                                    className="absolute inset-0 rounded-3xl bg-[#0a0a0a] border border-white/10 flex flex-col items-center justify-center p-6 md:p-8 shadow-2xl overflow-hidden"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
                                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/20 mb-6 bg-white/5 flex items-center justify-center flex-shrink-0 relative z-10">
                                        <img 
                                            src={profileHero} 
                                            alt="EM Profile" 
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white relative z-10 mb-8 md:mb-0">EM</h2>
                                    
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsFlipped(true);
                                        }}
                                        className="absolute bottom-8 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all z-20 md:hidden"
                                    >
                                        View Details
                                    </button>
                                    <p className="text-white/40 mt-2 text-xs uppercase tracking-widest absolute bottom-8 opacity-50 hidden md:block">
                                        Click or drag to view profile ➔
                                    </p>
                                </div>

                                {/* Back Face */}
                                <div 
                                    className="absolute inset-0 rounded-3xl bg-[#0a0a0a] border border-white/10 flex flex-col items-center justify-center p-6 md:p-10 shadow-2xl overflow-hidden"
                                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
                                    <div className="text-center space-y-4 md:space-y-6 relative z-10 w-full mb-8 md:mb-0">
                                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                                            Hey Hi! 👋<br />I'm Elumugam
                                        </h2>
                                        <div className="w-12 h-[1px] bg-white/20 mx-auto" />
                                        <div className="text-muted leading-relaxed text-sm md:text-lg flex flex-col items-center gap-1">
                                            <span className="font-medium">Founder @TripO</span>
                                            <span>Software Developer</span>
                                            <span>Building AI-Powered Products &amp;</span>
                                            <span>Backend Systems</span>
                                        </div>
                                    </div>
                                    
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsFlipped(false);
                                        }}
                                        className="absolute bottom-8 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all z-20 md:hidden"
                                    >
                                        Back
                                    </button>
                                    <p className="text-white/40 mt-2 text-xs uppercase tracking-widest absolute bottom-8 opacity-50 hidden md:block">
                                        &larr; Click or drag to return
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
