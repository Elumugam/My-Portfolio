import { useState, useEffect, useRef, FormEvent } from "react";
import { Link } from "react-router-dom";
import {
    Star, ChevronLeft, ChevronRight, Image as ImageIcon, MoreVertical,
    Send, Code, Globe, Settings, Database, Workflow, Terminal,
    CheckCircle2, User, Building, Mail, Phone, Calendar, ArrowRight,
    Award, Folder, MessageSquare, Rocket, Wrench, Briefcase, ChevronDown, ChevronUp
} from "lucide-react";
import {
    portfolioStore, ClientProject, OngoingProject, CompletedProject, ClientReview, FreelancingHeroSettings
} from "../services/portfolioStore";

export default function Freelancing() {
    const [heroSettings, setHeroSettings] = useState<FreelancingHeroSettings>(() =>
        portfolioStore.getFreelancingHero()
    );
    const [featuredProjects, setFeaturedProjects] = useState<ClientProject[]>([]);
    const [ongoingProjects, setOngoingProjects] = useState<OngoingProject[]>([]);
    const [completedProjects, setCompletedProjects] = useState<CompletedProject[]>([]);
    const [clientReviews, setClientReviews] = useState<ClientReview[]>([]);

    // Collapsible Booking Section State
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    // Carousel Scroll State Refs
    const featuredScrollRef = useRef<HTMLDivElement>(null);
    const completedScrollRef = useRef<HTMLDivElement>(null);
    const reviewsScrollRef = useRef<HTMLDivElement>(null);

    // Form State
    const [formData, setFormData] = useState({
        clientName: "",
        companyName: "",
        email: "",
        phone: "",
        country: "",
        projectTitle: "",
        projectCategory: "AI / Machine Learning",
        budget: "$3,000 - $5,000",
        timeline: "1 Month",
        projectDescription: "",
        preferredContactMethod: "Email",
        attachmentName: ""
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [bookingSuccess, setBookingSuccess] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadData = () => {
        setHeroSettings(portfolioStore.getFreelancingHero());
        setFeaturedProjects(portfolioStore.getFeaturedClientProjects());
        setOngoingProjects(portfolioStore.getOngoingProjects());
        setCompletedProjects(portfolioStore.getCompletedProjects());
        setClientReviews(portfolioStore.getClientReviews());
    };

    useEffect(() => {
        loadData();
        window.scrollTo(0, 0);

        const handleUpdate = () => loadData();
        const syncEvents = [
            "portfolio-store-updated",
            "portfolio-freelancing-updated",
            "storage",
            "focus",
            "pageshow"
        ];

        syncEvents.forEach((evt) => window.addEventListener(evt, handleUpdate));
        document.addEventListener("visibilitychange", handleUpdate);

        return () => {
            syncEvents.forEach((evt) => window.removeEventListener(evt, handleUpdate));
            document.removeEventListener("visibilitychange", handleUpdate);
        };
    }, []);

    const scrollToBooking = () => {
        setIsBookingOpen(true);
        setTimeout(() => {
            const el = document.getElementById("book-project-section");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }, 50);
    };

    const handleScrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
        if (ref.current) {
            const scrollAmount = direction === "left" ? -340 : 340;
            ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};
        if (!formData.clientName.trim()) errors.clientName = "Your Name is required.";
        if (!formData.email.trim()) {
            errors.email = "Email Address is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Please enter a valid email address.";
        }
        if (!formData.phone.trim()) errors.phone = "Phone Number is required.";
        if (!formData.projectTitle.trim()) errors.projectTitle = "Project Title is required.";
        if (!formData.projectDescription.trim()) errors.projectDescription = "Project Description is required.";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        setBookingSuccess("");
        if (!validateForm()) return;

        setIsSubmitting(true);
        setTimeout(() => {
            portfolioStore.addBooking({
                clientName: formData.clientName,
                companyName: formData.companyName,
                email: formData.email,
                phone: formData.phone,
                country: formData.country,
                projectTitle: formData.projectTitle,
                projectCategory: formData.projectCategory,
                budget: formData.budget,
                timeline: formData.timeline,
                projectDescription: formData.projectDescription,
                preferredContactMethod: formData.preferredContactMethod,
                attachmentName: formData.attachmentName
            });

            setIsSubmitting(false);
            setBookingSuccess("Your project request has been submitted! I will get back to you shortly.");
            setFormData({
                clientName: "",
                companyName: "",
                email: "",
                phone: "",
                country: "",
                projectTitle: "",
                projectCategory: "AI / Machine Learning",
                budget: "$3,000 - $5,000",
                timeline: "1 Month",
                projectDescription: "",
                preferredContactMethod: "Email",
                attachmentName: ""
            });
            setFormErrors({});
            setIsBookingOpen(false); // Collapse form automatically after successful submission
        }, 600);
    };

    // Kanban status columns grouping for Desktop/Tablet
    const planningTasks = ongoingProjects.filter((p) => p.status === "Planning");
    const developmentTasks = ongoingProjects.filter((p) => p.status === "Development");
    const testingTasks = ongoingProjects.filter((p) => p.status === "Testing");
    const completedTasks = ongoingProjects.filter((p) => p.status === "Completed");

    return (
        <div className="flex flex-col w-full bg-[#050505] min-h-screen text-white selection:bg-white selection:text-black pt-20 sm:pt-24 pb-16 sm:pb-20 font-sans overflow-x-hidden">
            <div className="max-w-6xl mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-16 space-y-8 sm:space-y-12 lg:space-y-16">
                
                {/* 1. HERO SECTION */}
                <section className="pt-4 sm:pt-10 pb-8 sm:pb-12 border-b border-white/10 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Side: Breadcrumb + Heading + Subtitle + CTA */}
                        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                            {/* Breadcrumb */}
                            <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-white/40 flex items-center gap-2">
                                <Link to="/" className="hover:text-white transition-colors focus:outline-none focus:underline">HOME</Link>
                                <span>/</span>
                                <span className="text-white/80">FREELANCING</span>
                            </div>

                            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95] break-words">
                                {heroSettings.title || "FREELANCE SERVICES"}
                            </h1>

                            <p className="text-xs sm:text-base md:text-lg text-white/60 font-light max-w-xl leading-relaxed">
                                {heroSettings.subtitle || "Helping startups and businesses build scalable AI, Web, Backend and Full-Stack solutions."}
                            </p>

                            <div className="pt-2">
                                <button
                                    onClick={scrollToBooking}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 rounded-full border border-white/30 bg-transparent text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] focus:ring-2 focus:ring-white/40 focus:outline-none min-h-[44px]"
                                    aria-label="Book A Project"
                                >
                                    <span>{heroSettings.buttonText || "BOOK A PROJECT"}</span>
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Right Side: Minimalist Line-Art Developer Illustration */}
                        <div className="lg:col-span-5 flex items-center justify-center relative py-4 sm:py-6">
                            <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[4/3] rounded-3xl border border-white/10 bg-black/60 backdrop-blur-md p-4 sm:p-6 flex flex-col justify-between overflow-hidden shadow-2xl group">
                                {/* SVG Sweeping Sweep Lines background */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/10 fill-none">
                                    <path d="M0 40 Q 200 10 400 120" strokeWidth="1" />
                                    <path d="M0 140 Q 200 80 400 200" strokeWidth="1" strokeDasharray="4 4" />
                                </svg>

                                {/* Top Titlebar */}
                                <div className="flex items-center justify-between border-b border-white/10 pb-2 sm:pb-3 relative z-10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                                    </div>
                                    <span className="text-[9px] sm:text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1">
                                        <Terminal size={12} /> dev_environment.ts
                                    </span>
                                </div>

                                {/* Central Line Art Laptop & Floating Graphic Badges */}
                                <div className="relative z-10 flex items-center justify-center my-3 sm:my-4">
                                    {/* Main Laptop Frame */}
                                    <div className="relative flex flex-col items-center">
                                        <div className="w-40 sm:w-56 h-28 sm:h-36 rounded-t-xl border-2 border-white/40 bg-black/80 flex items-center justify-center relative shadow-xl overflow-hidden">
                                            <span className="text-xl sm:text-2xl font-mono tracking-widest text-white/90 font-bold flex items-center gap-2">
                                                &lt;/&gt;
                                            </span>

                                            {/* Floating Mini Window overlay */}
                                            <div className="absolute bottom-2 right-2 w-16 sm:w-20 h-11 sm:h-14 rounded-lg border border-white/20 bg-black/90 p-1.5 flex flex-col justify-between animate-pulse">
                                                <div className="h-1 bg-white/30 rounded w-3/4" />
                                                <div className="flex items-end justify-between gap-1">
                                                    <div className="w-1.5 sm:w-2 h-3 sm:h-4 bg-white/50 rounded-t" />
                                                    <div className="w-1.5 sm:w-2 h-5 sm:h-7 bg-white rounded-t" />
                                                    <div className="w-1.5 sm:w-2 h-2 sm:h-3 bg-white/40 rounded-t" />
                                                    <div className="w-1.5 sm:w-2 h-4 sm:h-5 bg-white/70 rounded-t" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Laptop Base */}
                                        <div className="w-48 sm:w-64 h-2.5 sm:h-3 rounded-b-lg border-2 border-t-0 border-white/40 bg-white/10 flex items-center justify-center">
                                            <div className="w-8 sm:w-10 h-1 bg-white/30 rounded-full" />
                                        </div>
                                    </div>

                                    {/* Globe floating icon left */}
                                    <div className="absolute -left-1 sm:-left-2 top-2 p-2 sm:p-2.5 rounded-2xl border border-white/20 bg-black/80 text-white shadow-lg animate-bounce">
                                        <Globe size={16} />
                                    </div>

                                    {/* Settings Gear right */}
                                    <div className="absolute -right-1 sm:-right-2 top-4 p-2 sm:p-2.5 rounded-2xl border border-white/20 bg-black/80 text-white shadow-lg">
                                        <Settings size={16} />
                                    </div>

                                    {/* Workflow gear bottom left */}
                                    <div className="absolute left-2 sm:left-4 -bottom-2 p-2 sm:p-2.5 rounded-2xl border border-white/20 bg-black/80 text-white shadow-lg">
                                        <Workflow size={16} />
                                    </div>
                                </div>

                                {/* Bottom Tech Row */}
                                <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-white/50 border-t border-white/10 pt-2 sm:pt-3 relative z-10">
                                    <span className="flex items-center gap-1"><Code size={12} /> Scalable Full-Stack</span>
                                    <span className="flex items-center gap-1"><Database size={12} /> AI &amp; Cloud</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. FEATURED PROJECTS SECTION */}
                <section className="space-y-6">
                    <div className="flex items-end justify-between border-b border-white/10 pb-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                                <Award size={22} className="text-amber-400" />
                                FEATURED PROJECTS
                            </h2>
                            <p className="text-xs text-white/50 font-light mt-1">
                                Handpicked projects that deliver exceptional results.
                            </p>
                        </div>

                        {/* Carousel Arrows */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleScrollCarousel(featuredScrollRef, "left")}
                                className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full border border-white/20 bg-white/[0.03] text-white flex items-center justify-center hover:bg-white hover:text-black transition-all focus:ring-2 focus:ring-white/40 focus:outline-none"
                                aria-label="Previous Featured Project"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => handleScrollCarousel(featuredScrollRef, "right")}
                                className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full border border-white/20 bg-white/[0.03] text-white flex items-center justify-center hover:bg-white hover:text-black transition-all focus:ring-2 focus:ring-white/40 focus:outline-none"
                                aria-label="Next Featured Project"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Horizontal Scroll / Carousel Container */}
                    <div
                        ref={featuredScrollRef}
                        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 snap-x snap-mandatory"
                    >
                        {featuredProjects.map((proj) => (
                            <div
                                key={proj.id}
                                className="w-full sm:w-[340px] md:w-[calc(50%-12px)] lg:w-[340px] flex-shrink-0 snap-start p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#0a0a0a] flex flex-col justify-between space-y-4 hover:border-white/30 transition-all duration-300 group"
                            >
                                <div className="space-y-3">
                                    {/* Thumbnail Placeholder / Image Box */}
                                    <div className="w-full h-36 sm:h-40 rounded-xl border border-white/10 bg-black/60 flex items-center justify-center relative overflow-hidden">
                                        <div className="absolute top-3 left-3 z-10">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-amber-500/40 bg-amber-500/10 text-amber-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">
                                                <Award size={10} className="text-amber-400" /> FEATURED
                                            </span>
                                        </div>
                                        {proj.imageUrl || proj.clientLogo || proj.websiteUrl ? (
                                            <img 
                                                src={proj.imageUrl || proj.clientLogo || proj.websiteUrl} 
                                                alt={proj.projectName} 
                                                loading="lazy"
                                                className="w-full h-full object-cover" 
                                            />
                                        ) : (
                                            <ImageIcon size={32} className="text-white/20" />
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-1 gap-2">
                                        <h3 className="text-sm sm:text-base font-bold uppercase text-white tracking-tight truncate max-w-[180px] sm:max-w-[200px]">
                                            {proj.projectName}
                                        </h3>
                                        <span className="text-[9px] sm:text-[10px] font-mono text-white/50 px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] truncate">
                                            {proj.category}
                                        </span>
                                    </div>

                                    <p className="text-xs text-white/60 font-light line-clamp-2 leading-relaxed">
                                        {proj.description}
                                    </p>
                                </div>

                                {/* Tech stack chips */}
                                <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                                    {(proj.technologies && proj.technologies.length > 0 ? proj.technologies : ["React", "Node.js", "Python"]).map((tech) => (
                                        <span key={tech} className="px-2 sm:px-2.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-[9px] sm:text-[10px] font-mono text-white/70">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. ONGOING PROJECTS (KANBAN BOARD FOR DESKTOP/TABLET & STACKED CARDS FOR MOBILE) */}
                <section className="space-y-6">
                    <div className="border-b border-white/10 pb-4">
                        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                            <Rocket size={22} className="text-white/80" />
                            ONGOING PROJECTS
                        </h2>
                        <p className="text-xs text-white/50 font-light mt-1">
                            Current projects in progress.
                        </p>
                    </div>

                    {/* Tablet & Desktop: 4-Column Kanban Grid (2-column on tablet, 4-column on desktop) */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-2">
                        {/* COLUMN 1: PLANNING */}
                        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#080808] p-4 flex flex-col min-h-[400px]">
                            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                <span className="text-xs font-extrabold uppercase tracking-wider text-white">PLANNING</span>
                                <span className="w-5 h-5 rounded-full bg-white/10 text-white text-[10px] font-mono font-bold flex items-center justify-center">
                                    {planningTasks.length}
                                </span>
                            </div>

                            <div className="space-y-4 flex-1">
                                {planningTasks.map((task) => (
                                    <div key={task.id} className="p-4 rounded-xl border border-white/10 bg-black/60 space-y-3 relative hover:border-white/30 transition-all">
                                        <div className="flex items-start justify-between">
                                            <h4 className="text-xs font-bold uppercase text-white tracking-tight">{task.projectName}</h4>
                                            <MoreVertical size={14} className="text-white/40 cursor-pointer" />
                                        </div>

                                        <div className="text-[10px] font-mono text-white/50 space-y-0.5">
                                            <div>Client: <span className="text-white/80">{task.clientName}</span></div>
                                            <div>Start: {task.startDate}</div>
                                            <div>Due: {task.expectedCompletion}</div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex justify-end text-[9px] font-mono text-white/40">
                                                {task.progress}%
                                            </div>
                                            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                                                <div className="h-full bg-white rounded-full" style={{ width: `${task.progress}%` }} />
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border border-blue-500/30 bg-blue-500/10 text-blue-400">
                                                Planning
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* COLUMN 2: DEVELOPMENT */}
                        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#080808] p-4 flex flex-col min-h-[400px]">
                            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                <span className="text-xs font-extrabold uppercase tracking-wider text-white">DEVELOPMENT</span>
                                <span className="w-5 h-5 rounded-full bg-white/10 text-white text-[10px] font-mono font-bold flex items-center justify-center">
                                    {developmentTasks.length}
                                </span>
                            </div>

                            <div className="space-y-4 flex-1">
                                {developmentTasks.map((task) => (
                                    <div key={task.id} className="p-4 rounded-xl border border-white/10 bg-black/60 space-y-3 relative hover:border-white/30 transition-all">
                                        <div className="flex items-start justify-between">
                                            <h4 className="text-xs font-bold uppercase text-white tracking-tight">{task.projectName}</h4>
                                            <MoreVertical size={14} className="text-white/40 cursor-pointer" />
                                        </div>

                                        <div className="text-[10px] font-mono text-white/50 space-y-0.5">
                                            <div>Client: <span className="text-white/80">{task.clientName}</span></div>
                                            <div>Start: {task.startDate}</div>
                                            <div>Due: {task.expectedCompletion}</div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex justify-end text-[9px] font-mono text-white/40">
                                                {task.progress}%
                                            </div>
                                            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                                                <div className="h-full bg-white rounded-full" style={{ width: `${task.progress}%` }} />
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400">
                                                Development
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* COLUMN 3: TESTING */}
                        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#080808] p-4 flex flex-col min-h-[400px]">
                            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                <span className="text-xs font-extrabold uppercase tracking-wider text-white">TESTING</span>
                                <span className="w-5 h-5 rounded-full bg-white/10 text-white text-[10px] font-mono font-bold flex items-center justify-center">
                                    {testingTasks.length}
                                </span>
                            </div>

                            <div className="space-y-4 flex-1">
                                {testingTasks.map((task) => (
                                    <div key={task.id} className="p-4 rounded-xl border border-white/10 bg-black/60 space-y-3 relative hover:border-white/30 transition-all">
                                        <div className="flex items-start justify-between">
                                            <h4 className="text-xs font-bold uppercase text-white tracking-tight">{task.projectName}</h4>
                                            <MoreVertical size={14} className="text-white/40 cursor-pointer" />
                                        </div>

                                        <div className="text-[10px] font-mono text-white/50 space-y-0.5">
                                            <div>Client: <span className="text-white/80">{task.clientName}</span></div>
                                            <div>Start: {task.startDate}</div>
                                            <div>Due: {task.expectedCompletion}</div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex justify-end text-[9px] font-mono text-white/40">
                                                {task.progress}%
                                            </div>
                                            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                                                <div className="h-full bg-white rounded-full" style={{ width: `${task.progress}%` }} />
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border border-purple-500/30 bg-purple-500/10 text-purple-400">
                                                Testing
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* COLUMN 4: COMPLETED */}
                        <div className="space-y-4 rounded-2xl border border-white/10 bg-[#080808] p-4 flex flex-col min-h-[400px]">
                            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                                <span className="text-xs font-extrabold uppercase tracking-wider text-white">COMPLETED</span>
                                <span className="w-5 h-5 rounded-full bg-white/10 text-white text-[10px] font-mono font-bold flex items-center justify-center">
                                    {completedTasks.length}
                                </span>
                            </div>

                            <div className="space-y-4 flex-1">
                                {completedTasks.map((task) => (
                                    <div key={task.id} className="p-4 rounded-xl border border-white/10 bg-black/60 space-y-3 relative hover:border-white/30 transition-all">
                                        <div className="flex items-start justify-between">
                                            <h4 className="text-xs font-bold uppercase text-white tracking-tight">{task.projectName}</h4>
                                            <MoreVertical size={14} className="text-white/40 cursor-pointer" />
                                        </div>

                                        <div className="text-[10px] font-mono text-white/50 space-y-0.5">
                                            <div>Client: <span className="text-white/80">{task.clientName}</span></div>
                                            <div>Start: {task.startDate}</div>
                                            <div>Due: {task.expectedCompletion}</div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex justify-end text-[9px] font-mono text-white/40">
                                                {task.progress}%
                                            </div>
                                            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                                                <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${task.progress}%` }} />
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                                                Completed
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Only: Stacked Vertical Responsive Cards */}
                    <div className="block md:hidden space-y-4">
                        {ongoingProjects.map((task) => (
                            <div key={task.id} className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#080808] space-y-3 relative hover:border-white/30 transition-all">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h3 className="text-sm sm:text-base font-bold uppercase text-white tracking-tight">{task.projectName}</h3>
                                        <p className="text-[11px] text-white/60 font-mono mt-0.5">Client: <span className="text-white/90 font-semibold">{task.clientName}</span></p>
                                    </div>
                                    <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md border ${
                                        task.status === "Planning" ? "border-blue-500/40 bg-blue-500/10 text-blue-400" :
                                        task.status === "Development" ? "border-amber-500/40 bg-amber-500/10 text-amber-400" :
                                        task.status === "Testing" ? "border-purple-500/40 bg-purple-500/10 text-purple-400" :
                                        "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                                    }`}>
                                        {task.status}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-[11px] font-mono text-white/50 pt-1">
                                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-white/40" /> Due: {task.expectedCompletion}</span>
                                    <span className="font-bold text-white/80">{task.progress}%</span>
                                </div>

                                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-500 ${
                                            task.status === "Completed" ? "bg-emerald-400" : "bg-white"
                                        }`} 
                                        style={{ width: `${task.progress}%` }} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. COMPLETED PROJECTS SECTION */}
                <section className="space-y-6">
                    <div className="flex items-end justify-between border-b border-white/10 pb-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                                <Folder size={22} className="text-white/80" />
                                COMPLETED PROJECTS
                            </h2>
                            <p className="text-xs text-white/50 font-light mt-1">
                                Successfully delivered projects.
                            </p>
                        </div>

                        {/* Carousel Arrows */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleScrollCarousel(completedScrollRef, "left")}
                                className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full border border-white/20 bg-white/[0.03] text-white flex items-center justify-center hover:bg-white hover:text-black transition-all focus:ring-2 focus:ring-white/40 focus:outline-none"
                                aria-label="Previous Completed Project"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => handleScrollCarousel(completedScrollRef, "right")}
                                className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full border border-white/20 bg-white/[0.03] text-white flex items-center justify-center hover:bg-white hover:text-black transition-all focus:ring-2 focus:ring-white/40 focus:outline-none"
                                aria-label="Next Completed Project"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={completedScrollRef}
                        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 snap-x snap-mandatory"
                    >
                        {completedProjects.map((proj) => (
                            <div
                                key={proj.id}
                                className="w-full sm:w-[320px] md:w-[calc(50%-12px)] lg:w-[320px] flex-shrink-0 snap-start p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#0a0a0a] flex flex-col justify-between space-y-4 hover:border-white/30 transition-all duration-300"
                            >
                                <div className="space-y-3">
                                    <div className="w-full h-36 rounded-xl border border-white/10 bg-black/60 flex items-center justify-center overflow-hidden">
                                        {proj.imageUrl ? (
                                            <img src={proj.imageUrl} alt={proj.title} loading="lazy" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon size={32} className="text-white/20" />
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between pt-1 gap-2">
                                        <h3 className="text-sm sm:text-base font-bold uppercase text-white tracking-tight truncate max-w-[180px]">
                                            {proj.title}
                                        </h3>
                                        <span className="text-[9px] sm:text-[10px] font-mono text-white/50 px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] truncate">
                                            {proj.category}
                                        </span>
                                    </div>

                                    <p className="text-xs text-white/60 font-light line-clamp-2 leading-relaxed">
                                        {proj.description}
                                    </p>
                                </div>

                                <div className="pt-2 border-t border-white/10 flex flex-wrap gap-1.5">
                                    {proj.technologies.map((tech) => (
                                        <span key={tech} className="px-2.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-[9px] sm:text-[10px] font-mono text-white/70">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. CLIENT REVIEWS SECTION */}
                <section className="space-y-6">
                    <div className="flex items-end justify-between border-b border-white/10 pb-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                                <MessageSquare size={22} className="text-white/80" />
                                CLIENT REVIEWS
                            </h2>
                            <p className="text-xs text-white/50 font-light mt-1">
                                What my clients say about my work.
                            </p>
                        </div>

                        {/* Carousel Arrows */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleScrollCarousel(reviewsScrollRef, "left")}
                                className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full border border-white/20 bg-white/[0.03] text-white flex items-center justify-center hover:bg-white hover:text-black transition-all focus:ring-2 focus:ring-white/40 focus:outline-none"
                                aria-label="Previous Review"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => handleScrollCarousel(reviewsScrollRef, "right")}
                                className="w-10 h-10 min-h-[44px] min-w-[44px] rounded-full border border-white/20 bg-white/[0.03] text-white flex items-center justify-center hover:bg-white hover:text-black transition-all focus:ring-2 focus:ring-white/40 focus:outline-none"
                                aria-label="Next Review"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={reviewsScrollRef}
                        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 snap-x snap-mandatory"
                    >
                        {clientReviews.map((rev) => (
                            <div
                                key={rev.id}
                                className="w-full sm:w-[380px] md:w-[calc(50%-12px)] lg:w-[380px] flex-shrink-0 snap-start p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#0a0a0a] flex flex-col justify-between space-y-4"
                            >
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        {rev.clientPhoto ? (
                                            <img src={rev.clientPhoto} alt={rev.clientName} loading="lazy" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center font-bold text-xs text-white">
                                                <User size={18} className="text-white/70" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="text-xs sm:text-sm font-bold uppercase text-white tracking-wider">{rev.clientName}</h3>
                                            <p className="text-[10px] sm:text-xs text-white/50">{rev.designation || "CEO"}, {rev.company}</p>
                                        </div>
                                    </div>

                                    {/* 5 Gold Stars */}
                                    <div className="flex items-center gap-1 text-amber-400">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>

                                    <p className="text-xs sm:text-sm text-white/80 font-light italic leading-relaxed">
                                        "{rev.review}"
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-white/10 text-[10px] sm:text-xs font-mono text-white/40 space-y-0.5">
                                    <div>Project: <span className="text-white/70">{rev.projectName}</span></div>
                                    <div>{rev.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6 & 7. BOOK A PROJECT SECTION & MOBILE BOOKING FORM */}
                <section id="book-project-section" className="space-y-6 pt-4">
                    <div className="p-6 sm:p-10 rounded-3xl border border-white/10 bg-[#080808] space-y-8 transition-all duration-300">
                        {/* Section Header & Collapsible Toggle Button */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                            <div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
                                    <Briefcase size={24} className="text-white/80" />
                                    BOOK A PROJECT
                                </h2>
                                <p className="text-xs sm:text-sm text-white/60 font-light mt-1">
                                    Have a project in mind? Let's work together.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsBookingOpen(!isBookingOpen)}
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] focus:ring-2 focus:ring-white/50 focus:outline-none min-h-[44px] self-start sm:self-auto"
                                aria-expanded={isBookingOpen}
                                aria-controls="booking-form-container"
                            >
                                <span>{isBookingOpen ? "CLOSE FORM" : "BOOK A PROJECT"}</span>
                                {isBookingOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                        </div>

                        {bookingSuccess && (
                            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm flex items-center gap-3">
                                <CheckCircle2 size={18} className="flex-shrink-0" />
                                <span>{bookingSuccess}</span>
                            </div>
                        )}

                        {/* Collapsible Form Container */}
                        {isBookingOpen && (
                            <div id="booking-form-container" className="pt-2 transition-all duration-500">
                                <form onSubmit={handleFormSubmit} className="space-y-6">
                                    {/* Grid: Mobile 1 column, Tablet 2 columns, Desktop 4 columns */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                                        {/* Row 1 */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                                                <User size={13} className="text-white/40" />
                                                Your Name <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.clientName}
                                                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                                placeholder="Enter your name"
                                                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-white/10 bg-black text-white text-xs sm:text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                                            />
                                            {formErrors.clientName && <p className="text-[10px] sm:text-xs text-red-400">{formErrors.clientName}</p>}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                                                <Building size={13} className="text-white/40" />
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.companyName}
                                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                                placeholder="Enter company name"
                                                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-white/10 bg-black text-white text-xs sm:text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                                                <Mail size={13} className="text-white/40" />
                                                Email Address <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="Enter your email"
                                                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-white/10 bg-black text-white text-xs sm:text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                                            />
                                            {formErrors.email && <p className="text-[10px] sm:text-xs text-red-400">{formErrors.email}</p>}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                                                <Phone size={13} className="text-white/40" />
                                                Phone Number <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="Enter your phone number"
                                                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-white/10 bg-black text-white text-xs sm:text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                                            />
                                            {formErrors.phone && <p className="text-[10px] sm:text-xs text-red-400">{formErrors.phone}</p>}
                                        </div>

                                        {/* Row 2 */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                                                <Globe size={13} className="text-white/40" />
                                                Country
                                            </label>
                                            <select
                                                value={formData.country}
                                                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-white/10 bg-black text-white text-xs sm:text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                                            >
                                                <option value="">Select your country</option>
                                                <option value="United States">United States</option>
                                                <option value="India">India</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Germany">Germany</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                                                <Folder size={13} className="text-white/40" />
                                                Project Title <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.projectTitle}
                                                onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                                                placeholder="Enter project title"
                                                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-white/10 bg-black text-white text-xs sm:text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                                            />
                                            {formErrors.projectTitle && <p className="text-[10px] sm:text-xs text-red-400">{formErrors.projectTitle}</p>}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                                                <Wrench size={13} className="text-white/40" />
                                                Project Category <span className="text-red-400">*</span>
                                            </label>
                                            <select
                                                value={formData.projectCategory}
                                                onChange={(e) => setFormData({ ...formData, projectCategory: e.target.value })}
                                                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-white/10 bg-black text-white text-xs sm:text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                                            >
                                                <option value="AI / Machine Learning">AI / Machine Learning</option>
                                                <option value="Web App">Web App</option>
                                                <option value="Full-Stack System">Full-Stack System</option>
                                                <option value="SaaS Platform">SaaS Platform</option>
                                                <option value="Mobile App">Mobile App</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                                                <Award size={13} className="text-white/40" />
                                                Budget (USD) <span className="text-red-400">*</span>
                                            </label>
                                            <select
                                                value={formData.budget}
                                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-white/10 bg-black text-white text-xs sm:text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                                            >
                                                <option value="$1,000 - $3,000">$1,000 - $3,000</option>
                                                <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                                                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                                                <option value="$10,000+">$10,000+</option>
                                            </select>
                                        </div>

                                        {/* Row 3 */}
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                                                <Calendar size={13} className="text-white/40" />
                                                Timeline <span className="text-red-400">*</span>
                                            </label>
                                            <select
                                                value={formData.timeline}
                                                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                                                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-white/10 bg-black text-white text-xs sm:text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                                            >
                                                <option value="Select timeline">Select timeline</option>
                                                <option value="1-2 Weeks">1-2 Weeks</option>
                                                <option value="1 Month">1 Month</option>
                                                <option value="2-3 Months">2-3 Months</option>
                                                <option value="Ongoing">Ongoing</option>
                                            </select>
                                        </div>

                                        <div className="md:col-span-2 space-y-1.5">
                                            <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                                                <MessageSquare size={13} className="text-white/40" />
                                                Project Description <span className="text-red-400">*</span>
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={formData.projectDescription}
                                                onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                                                placeholder="Describe your project in detail..."
                                                className="w-full min-h-[80px] px-4 py-2.5 rounded-xl border border-white/10 bg-black text-white text-xs sm:text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                                            />
                                            {formErrors.projectDescription && <p className="text-[10px] sm:text-xs text-red-400">{formErrors.projectDescription}</p>}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                                                <Mail size={13} className="text-white/40" />
                                                Preferred Contact Method <span className="text-red-400">*</span>
                                            </label>
                                            <select
                                                value={formData.preferredContactMethod}
                                                onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value })}
                                                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-white/10 bg-black text-white text-xs sm:text-sm focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/20 transition-all"
                                            >
                                                <option value="Email">Email</option>
                                                <option value="Phone">Phone</option>
                                                <option value="WhatsApp">WhatsApp</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex flex-col sm:flex-row justify-end pt-4 gap-3">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full sm:w-auto min-h-[44px] px-8 py-3.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 disabled:opacity-50 focus:ring-2 focus:ring-white/50 focus:outline-none"
                                        >
                                            <span>SUBMIT REQUEST</span>
                                            <Send size={14} />
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
