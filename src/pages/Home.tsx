import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import TripO from "./TripO";
import defaultHeroPhoto from "../assets/hero-transparent.png";
import { portfolioStore, getHeroImageStyle, HeroTransformSettings, HeroTextSettings, AnnouncementSettings } from "../services/portfolioStore";

/* Subtle Dot Matrix Grid Component (6x6) */
const DotGrid = ({ className = "" }: { className?: string }) => (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className={className}>
        {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
                <circle
                    key={`${row}-${col}`}
                    cx={12 + col * 20}
                    cy={12 + row * 20}
                    r="1.5"
                    fill="white"
                    fillOpacity="0.15"
                />
            ))
        )}
    </svg>
);

const socials = [
    { Icon: Github, href: "https://github.com/Elumugam", label: "GitHub" },
    { Icon: Linkedin, href: "https://www.linkedin.com/in/elumugam-r-201b06292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", label: "LinkedIn" },
    { Icon: Instagram, href: "https://www.instagram.com/_ezhumugam?igsh=NGM0bzJsdGdpN3lm&utm_source=qr", label: "Instagram" },
    { Icon: Mail, href: "mailto:elumugame@gmail.com", label: "Email" },
];

const SectionAnnouncementBar = ({ settings }: { settings: AnnouncementSettings }) => {
    if (!settings || !settings.enabled) return null;
    const isExternal = settings.link && (settings.link.startsWith("http://") || settings.link.startsWith("https://"));
    return (
        <div
            className="w-full border-y border-white/10 py-3.5 px-6 flex items-center justify-center transition-all duration-300 z-20"
            style={{
                backgroundColor: settings.bgColor || "#000000",
                color: settings.textColor || "#ffffff"
            }}
        >
            <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-center text-xs sm:text-sm font-medium tracking-wide">
                <span>{settings.text}</span>
                {settings.buttonText && (
                    isExternal ? (
                        <a
                            href={settings.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-current text-[11px] font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
                        >
                            {settings.buttonText}
                        </a>
                    ) : (
                        <Link
                            to={settings.link || "/freelancing"}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-current text-[11px] font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
                        >
                            {settings.buttonText}
                        </Link>
                    )
                )}
            </div>
        </div>
    );
};

export default function Home() {
    const heroRef = useRef<HTMLElement>(null);
    const [currentHeroPhoto, setCurrentHeroPhoto] = useState<string>(() => {
        const customHero = portfolioStore.getHeroImage();
        return customHero ? customHero.imageUrl : defaultHeroPhoto;
    });
    const [heroTransform, setHeroTransform] = useState<HeroTransformSettings>(() =>
        portfolioStore.getHeroTransform()
    );
    const [heroMobileTransform, setHeroMobileTransform] = useState<HeroTransformSettings>(() =>
        portfolioStore.getMobileHeroTransform()
    );
    const [heroText, setHeroText] = useState<HeroTextSettings>(() =>
        portfolioStore.getHeroText()
    );

    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window === "undefined") return false;
        return window.matchMedia("(max-width: 767px)").matches;
    });

    // Independent 4 Section Announcement States
    const [heroAnnouncement, setHeroAnnouncement] = useState<AnnouncementSettings>(() =>
        portfolioStore.getSectionAnnouncement("hero")
    );
    const [aboutAnnouncement, setAboutAnnouncement] = useState<AnnouncementSettings>(() =>
        portfolioStore.getSectionAnnouncement("about")
    );
    const [projectsAnnouncement, setProjectsAnnouncement] = useState<AnnouncementSettings>(() =>
        portfolioStore.getSectionAnnouncement("projects")
    );
    const [connectAnnouncement, setConnectAnnouncement] = useState<AnnouncementSettings>(() =>
        portfolioStore.getSectionAnnouncement("connect")
    );

    const imageContainerRef = useRef<HTMLDivElement>(null);
    const [containerDiameter, setContainerDiameter] = useState<number>(() =>
        typeof window !== "undefined" && window.innerWidth < 768 ? (window.innerWidth < 360 ? 160 : 180) : 380
    );

    useEffect(() => {
        const updateDiameter = () => {
            if (imageContainerRef.current && imageContainerRef.current.offsetWidth > 0) {
                setContainerDiameter(imageContainerRef.current.offsetWidth);
            } else {
                const isMob = window.matchMedia("(max-width: 767px)").matches;
                setContainerDiameter(isMob ? (window.innerWidth < 360 ? 160 : 180) : 380);
            }
        };

        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
            setIsMobile(e.matches);
            updateDiameter();
        };

        handleMediaChange(mediaQuery);

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleMediaChange);
        } else {
            mediaQuery.addListener(handleMediaChange);
        }

        const handleHeroUpdate = () => {
            const customHero = portfolioStore.getHeroImage();
            setCurrentHeroPhoto(customHero ? customHero.imageUrl : defaultHeroPhoto);
            setHeroTransform(portfolioStore.getHeroTransform());
            setHeroMobileTransform(portfolioStore.getMobileHeroTransform());
            setHeroText(portfolioStore.getHeroText());
            setIsMobile(window.matchMedia("(max-width: 767px)").matches);
            updateDiameter();
        };

        const handleAnnouncementUpdate = () => {
            setHeroAnnouncement(portfolioStore.getSectionAnnouncement("hero"));
            setAboutAnnouncement(portfolioStore.getSectionAnnouncement("about"));
            setProjectsAnnouncement(portfolioStore.getSectionAnnouncement("projects"));
            setConnectAnnouncement(portfolioStore.getSectionAnnouncement("connect"));
        };

        const handleGlobalUpdate = () => {
            handleHeroUpdate();
            handleAnnouncementUpdate();
        };

        window.addEventListener("portfolio-hero-updated", handleHeroUpdate);
        window.addEventListener("portfolio-announcement-updated", handleAnnouncementUpdate);
        window.addEventListener("storage", handleGlobalUpdate);
        window.addEventListener("resize", handleHeroUpdate);

        updateDiameter();

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener("change", handleMediaChange);
            } else {
                mediaQuery.removeListener(handleMediaChange);
            }
            window.removeEventListener("portfolio-hero-updated", handleHeroUpdate);
            window.removeEventListener("portfolio-announcement-updated", handleAnnouncementUpdate);
            window.removeEventListener("storage", handleGlobalUpdate);
            window.removeEventListener("resize", handleHeroUpdate);
        };
    }, []);

    return (
        <div className="flex flex-col w-full bg-black relative selection:bg-white selection:text-black">
            {/* HERO SECTION */}
            <section
                ref={heroRef}
                id="hero"
                className="relative w-full min-h-[85vh] lg:min-h-screen max-h-[920px] bg-black overflow-hidden flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 pt-20 sm:pt-24 pb-8 sm:pb-12"
            >
                {/* Subtle Background Vector Elements */}
                <DotGrid className="absolute top-28 right-8 md:right-16 pointer-events-none z-0" />
                <DotGrid className="absolute bottom-12 left-8 md:left-16 pointer-events-none z-0" />

                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                    <path
                        d="M -60, 480 Q 360, 160 480, 780"
                        stroke="white"
                        strokeOpacity="0.08"
                        strokeWidth="1.2"
                        fill="none"
                    />
                    <circle cx="260" cy="285" r="3" fill="#ffffff" />
                    <circle cx="260" cy="285" r="9" fill="#ffffff" fillOpacity="0.2" className="animate-pulse" />
                    <circle cx="455" cy="690" r="3" fill="#ffffff" />
                    <circle cx="455" cy="690" r="9" fill="#ffffff" fillOpacity="0.2" className="animate-pulse" />
                </svg>

                {/* Main Hero Content Grid (2-Column Layout on Desktop & Mobile down to 360px) */}
                <div className="max-w-6xl mx-auto w-full flex flex-col min-[360px]:grid min-[360px]:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 items-center z-10">
                    {/* Left Side Column (Content: 55% width -> col-span-7) */}
                    <div className="order-2 min-[360px]:order-1 min-[360px]:col-span-7 flex flex-col justify-center items-start text-left pt-2 lg:pt-0">
                        {/* Name */}
                        <h1 className="font-extrabold tracking-tighter text-white uppercase text-2xl min-[360px]:text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-[0.95] break-words">
                            {heroText.name || "R ELUMUGAM"}
                        </h1>

                        {/* Roles */}
                        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-start gap-1 sm:gap-4 text-white/50 text-[11px] min-[360px]:text-xs sm:text-base md:text-lg font-light tracking-wide">
                            <span>{heroText.role1}</span>
                            {heroText.separator && (
                                <span className="hidden sm:inline text-white/20">{heroText.separator}</span>
                            )}
                            <span>{heroText.role2}</span>
                        </div>

                        {/* Primary Button */}
                        <div className="mt-4 sm:mt-8">
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-7 py-2.5 sm:py-3 rounded-full border border-white/20 bg-white/[0.03] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.03)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] focus:ring-2 focus:ring-white/40 focus:outline-none min-h-[38px] sm:min-h-[44px]"
                            >
                                {heroText.buttonText || "VIEW PROJECTS"}
                            </a>
                        </div>

                        {/* Social Icons */}
                        <div className="flex items-center justify-start gap-2.5 sm:gap-4 mt-6 sm:mt-8 lg:mt-14">
                            {socials.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/[0.08] hover:scale-105 transition-all duration-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
                                >
                                    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Side Column (Hero Image: 45% width -> col-span-5) */}
                    <div className="order-1 min-[360px]:order-2 min-[360px]:col-span-5 relative flex items-center justify-center min-[360px]:justify-end h-full py-2 lg:py-6">
                        <div className="relative z-10 flex items-center justify-center">
                            <div className="relative flex items-center justify-center">
                                {/* Solid White Circular Hero Container (#FFFFFF) */}
                                <div ref={imageContainerRef} className="w-[160px] h-[160px] min-[360px]:w-[180px] min-[360px]:h-[180px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] xl:w-[440px] xl:h-[440px] aspect-square rounded-full bg-white border-none overflow-hidden flex items-center justify-center pointer-events-none shadow-2xl">
                                    {/* Hero Portrait Image */}
                                    <img
                                        src={currentHeroPhoto}
                                        alt={heroText.name || "R Elumugam"}
                                        style={getHeroImageStyle(isMobile ? heroMobileTransform : heroTransform, containerDiameter, isMobile)}
                                        className="object-cover object-top pointer-events-none transition-transform duration-75 max-w-none max-h-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* HERO ANNOUNCEMENT BAR */}
            <SectionAnnouncementBar settings={heroAnnouncement} />

            {/* SECTIONS */}
            <div className="relative">
                <section id="about" className="py-12 border-t border-white/5">
                    <About />
                </section>
                {/* ABOUT ANNOUNCEMENT BAR */}
                <SectionAnnouncementBar settings={aboutAnnouncement} />

                <section id="projects" className="py-12 border-t border-white/5">
                    <Projects />
                </section>
                {/* PROJECTS ANNOUNCEMENT BAR */}
                <SectionAnnouncementBar settings={projectsAnnouncement} />

                <section id="tripo" className="py-12 border-t border-white/5">
                    <TripO />
                </section>

                <section id="contact" className="py-12 border-t border-white/5">
                    <Contact />
                </section>
                {/* CONNECT ANNOUNCEMENT BAR */}
                <SectionAnnouncementBar settings={connectAnnouncement} />
            </div>
        </div>
    );
}
