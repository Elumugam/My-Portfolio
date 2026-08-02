export interface Project {
    id: string;
    title: string;
    category: string;
    year: string;
    description: string;
    link: string;
    liveUrl?: string;
    published: boolean;
    featured: boolean;
    order: number;
    thumbnailUrl?: string;
    bannerUrl?: string;
    technologies?: string[];
}

export interface ClientProject {
    id: string;
    projectName: string;
    clientName: string;
    industry?: string;
    category: string;
    description: string;
    technologies: string[];
    websiteUrl?: string;
    completionDate?: string;
    status: "Planning" | "Development" | "Testing" | "Completed";
    featured: boolean;
    published: boolean;
    order: number;
    imageUrl?: string;
    clientLogo?: string;
}

export interface HeroImageData {
    imageUrl: string;
    fileName: string;
    fileSize: number;
    updatedAt: string;
}

export interface HeroTransformSettings {
    width: number;
    height: number;
    scale: number;
    positionX: number;
    positionY: number;
    rotation: number;
}

export interface HeroTextSettings {
    name: string;
    role1: string;
    role2: string;
    separator: string;
    buttonText: string;
}

export interface AnnouncementSettings {
    enabled: boolean;
    text: string;
    buttonText: string;
    link: string;
    bgColor: string;
    textColor: string;
}

export type AnnouncementSectionKey = "hero" | "about" | "projects" | "connect";

const ANNOUNCEMENT_SECTION_KEYS: Record<AnnouncementSectionKey, string> = {
    hero: "portfolio_announcement_hero",
    about: "portfolio_announcement_about",
    projects: "portfolio_announcement_projects",
    connect: "portfolio_announcement_connect",
};

export const DEFAULT_SECTION_ANNOUNCEMENTS: Record<AnnouncementSectionKey, AnnouncementSettings> = {
    hero: {
        enabled: true,
        text: "Available for freelance projects & full-time roles.",
        buttonText: "Book A Project",
        link: "/freelancing",
        bgColor: "#000000",
        textColor: "#ffffff",
    },
    about: {
        enabled: false,
        text: "Exploring new AI/ML technologies & scalable systems.",
        buttonText: "View Skills",
        link: "#about",
        bgColor: "#000000",
        textColor: "#ffffff",
    },
    projects: {
        enabled: false,
        text: "Check out my latest full-stack & AI projects.",
        buttonText: "See All Projects",
        link: "#projects",
        bgColor: "#000000",
        textColor: "#ffffff",
    },
    connect: {
        enabled: false,
        text: "Let's build something amazing together.",
        buttonText: "Get In Touch",
        link: "#contact",
        bgColor: "#000000",
        textColor: "#ffffff",
    },
};

export interface OngoingProject {
    id: string;
    projectName: string;
    category: string;
    clientName: string;
    status: "Planning" | "Development" | "Testing" | "Completed";
    startDate: string;
    expectedCompletion: string;
    description: string;
    technologies: string[];
    progress: number; // 0 - 100
    imageUrl?: string;
    priority?: "Low" | "Medium" | "High";
}

export interface CompletedProject {
    id: string;
    title: string;
    category: string;
    description: string;
    technologies: string[];
    completionDate: string;
    imageUrl?: string;
    githubLink?: string;
    liveDemoLink?: string;
    caseStudyLink?: string;
}

export interface ClientReview {
    id: string;
    clientPhoto?: string;
    clientName: string;
    company: string;
    designation?: string;
    rating: number; // 1 - 5
    review: string;
    projectName: string;
    date: string;
    pinned?: boolean;
    reviewTitle?: string;
    order?: number;
    visible?: boolean;
}

export interface BookingRequest {
    id: string;
    date: string;
    clientName: string;
    companyName?: string;
    email: string;
    phone: string;
    country?: string;
    projectTitle: string;
    projectCategory: string;
    budget: string;
    timeline: string;
    projectDescription: string;
    preferredContactMethod?: string;
    attachmentName?: string;
    status: "New" | "Contacted" | "In Discussion" | "Accepted" | "Rejected" | "Completed";
}

export interface FreelancingHeroSettings {
    title: string;
    subtitle: string;
    buttonText: string;
}

export const HERO_MOBILE_TRANSFORM_STORAGE_KEY = "portfolio_hero_mobile_transform_settings";

export const DEFAULT_HERO_TRANSFORM: HeroTransformSettings = {
    width: 480,
    height: 580,
    scale: 100,
    positionX: 0,
    positionY: 0,
    rotation: 0
};

export const DEFAULT_HERO_MOBILE_TRANSFORM: HeroTransformSettings = {
    width: 280,
    height: 340,
    scale: 100,
    positionX: 0,
    positionY: 0,
    rotation: 0
};

export const DEFAULT_HERO_TEXT: HeroTextSettings = {
    name: "R ELUMUGAM",
    role1: "Python Developer",
    role2: "AI Engineer",
    separator: "•",
    buttonText: "VIEW PROJECTS"
};

export const DEFAULT_ANNOUNCEMENT: AnnouncementSettings = {
    enabled: false,
    text: "Available for Freelance Projects",
    buttonText: "Learn More",
    link: "/freelancing",
    bgColor: "#000000",
    textColor: "#ffffff"
};

export const DEFAULT_FREELANCING_HERO: FreelancingHeroSettings = {
    title: "FREELANCE SERVICES",
    subtitle: "Helping startups and businesses build scalable AI, Web, Backend and Full-Stack solutions.",
    buttonText: "BOOK A PROJECT"
};

const PROJECTS_STORAGE_KEY = "portfolio_projects_v4";
const CLIENT_PROJECTS_STORAGE_KEY = "freelancing_client_projects_v1";

const HERO_IMAGE_STORAGE_KEY = "portfolio_hero_image_v2";
const HERO_TRANSFORM_STORAGE_KEY = "portfolio_hero_transform_v1";
const HERO_TEXT_STORAGE_KEY = "portfolio_hero_text_v1";
const ANNOUNCEMENT_STORAGE_KEY = "portfolio_announcement_v1";
const FREELANCING_HERO_STORAGE_KEY = "portfolio_freelancing_hero_v1";
const LAST_UPDATED_KEY = "portfolio_last_updated_v2";
const ONGOING_PROJECTS_KEY = "portfolio_ongoing_projects_v1";
const COMPLETED_PROJECTS_KEY = "portfolio_completed_projects_v1";
const CLIENT_REVIEWS_KEY = "portfolio_client_reviews_v1";
const BOOKINGS_KEY = "portfolio_bookings_v1";

export const DEFAULT_PROJECTS: Project[] = [
    {
        id: "tripo-1",
        title: "TripO",
        category: "AI / Travel",
        year: "2026",
        description: "AI-powered travel platform designed to help users discover places, plan trips, explore destinations, and connect with communities.",
        link: "https://tripoapp.in/",
        liveUrl: "https://tripoapp.in/",
        published: true,
        featured: true,
        order: 1
    },
    {
        id: "7desk-1",
        title: "7DESK",
        category: "SaaS / Business Management",
        year: "2026",
        description: "Modern AI-powered business management platform featuring CRM, project management, invoicing, documentation, analytics, and workflow automation.",
        link: "https://7-desk-mauve.vercel.app/",
        liveUrl: "https://7-desk-mauve.vercel.app/",
        published: true,
        featured: true,
        order: 2
    },
    {
        id: "filedrop-1",
        title: "FILEDROP",
        category: "Storage / Security",
        year: "2026",
        description: "Cloud-native platform that converts any file into a secure, shareable link with instant delivery.",
        link: "https://github.com/Elumugam/FILE.DROP",
        published: true,
        featured: true,
        order: 3
    },
    {
        id: "classmate-1",
        title: "Classmate+",
        category: "AI / Productivity",
        year: "2026",
        description: "Intelligence-driven study companion featuring automated task management.",
        link: "https://github.com/Elumugam/Classmate-.git",
        published: true,
        featured: true,
        order: 4
    },
    {
        id: "genz-1",
        title: "Gen z Art",
        category: "Generative AI",
        year: "2025",
        description: "Creative exploration platform leveraging stable diffusion pipelines.",
        link: "https://github.com/Elumugam/genz-art-magic.git",
        published: true,
        featured: true,
        order: 5
    }
];

export const DEFAULT_CLIENT_PROJECTS: ClientProject[] = [
    {
        id: "client-1",
        projectName: "Seenalam Foods",
        clientName: "Seenalam Foods Inc.",
        industry: "Food & Agriculture",
        category: "Food Ordering Platform",
        description: "Full-scale custom digital ordering and distribution platform for traditional food brand.",
        technologies: ["React", "Node.js", "PostgreSQL"],
        websiteUrl: "https://seenalamfoods.com",
        completionDate: "2024",
        status: "Completed",
        featured: true,
        published: true,
        order: 1
    },
    {
        id: "client-2",
        projectName: "Travel Booking Platform",
        clientName: "TripO Client Systems",
        industry: "Travel Tech",
        category: "Web App",
        description: "Comprehensive travel reservation engine with live inventory management.",
        technologies: ["React", "TypeScript", "Node.js"],
        websiteUrl: "https://tripoapp.in",
        completionDate: "2024",
        status: "Completed",
        featured: true,
        published: true,
        order: 2
    },
    {
        id: "client-3",
        projectName: "Hotel Booking Website",
        clientName: "StayEase Group",
        industry: "Hospitality",
        category: "Web Application",
        description: "Direct reservation portal for luxury hotel chain with payment integration.",
        technologies: ["Next.js", "Tailwind", "Stripe"],
        websiteUrl: "https://stayease.io",
        completionDate: "2024",
        status: "Completed",
        featured: true,
        published: true,
        order: 3
    },
    {
        id: "client-4",
        projectName: "Food Ordering Platform",
        clientName: "QuickBite Express",
        industry: "Food Tech",
        category: "Web & Mobile App",
        description: "Real-time multi-restaurant ordering system with live order tracking.",
        technologies: ["React Native", "Express", "MongoDB"],
        websiteUrl: "https://quickbite.com",
        completionDate: "2024",
        status: "Completed",
        featured: true,
        published: true,
        order: 4
    },
    {
        id: "client-5",
        projectName: "Neural Vision Assistant",
        clientName: "VisionTech Labs",
        industry: "AI & Computer Vision",
        category: "AI / Vision System",
        description: "Industrial visual quality checking tool with OpenCV and PyTorch backend.",
        technologies: ["Python", "PyTorch", "FastAPI"],
        websiteUrl: "https://visiontech.ai",
        completionDate: "2024",
        status: "Completed",
        featured: true,
        published: true,
        order: 5
    },
    {
        id: "client-6",
        projectName: "Apex CRM",
        clientName: "Apex Global",
        industry: "Enterprise SaaS",
        category: "Enterprise SaaS",
        description: "Custom customer relationship management tool built for high-growth sales teams.",
        technologies: ["React", "Go", "Docker"],
        websiteUrl: "https://apexcrm.io",
        completionDate: "2024",
        status: "Completed",
        featured: true,
        published: true,
        order: 6
    }
];

export const DEFAULT_ONGOING_PROJECTS: OngoingProject[] = [
    {
        id: "ong-1",
        projectName: "Travel Booking Platform",
        category: "Web App",
        clientName: "TripO Client Systems",
        status: "Planning",
        startDate: "10 May 2024",
        expectedCompletion: "25 Jun 2024",
        description: "Comprehensive travel reservation engine with live inventory management.",
        technologies: ["React", "TypeScript", "Node.js"],
        progress: 15,
        priority: "High"
    },
    {
        id: "ong-2",
        projectName: "School Management System",
        category: "Web App",
        clientName: "EduTech",
        status: "Planning",
        startDate: "12 May 2024",
        expectedCompletion: "28 Jun 2024",
        description: "Student portal, grade processing, and automated reporting system.",
        technologies: ["React", "Express", "PostgreSQL"],
        progress: 20,
        priority: "Medium"
    },
    {
        id: "ong-3",
        projectName: "AI Resume Analyzer",
        category: "AI / NLP",
        clientName: "CareerBoost",
        status: "Development",
        startDate: "01 May 2024",
        expectedCompletion: "15 Jun 2024",
        description: "Automated candidate resume parsing and keyword matching engine.",
        technologies: ["Python", "FastAPI", "OpenAI"],
        progress: 80,
        priority: "High"
    },
    {
        id: "ong-4",
        projectName: "Real-time Chat Application",
        category: "Web App",
        clientName: "OneChat",
        status: "Development",
        startDate: "05 May 2024",
        expectedCompletion: "18 Jun 2024",
        description: "Low-latency WebSocket messaging platform with file sharing.",
        technologies: ["Node.js", "Socket.io", "React"],
        progress: 65,
        priority: "Medium"
    },
    {
        id: "ong-5",
        projectName: "Inventory Management System",
        category: "Web App",
        clientName: "Stockify",
        status: "Development",
        startDate: "08 May 2024",
        expectedCompletion: "20 Jun 2024",
        description: "Multi-warehouse tracking system with barcode integration.",
        technologies: ["React", "Node.js", "MongoDB"],
        progress: 55,
        priority: "Low"
    },
    {
        id: "ong-6",
        projectName: "Learning Management System",
        category: "Web App",
        clientName: "LearnHub",
        status: "Testing",
        startDate: "15 Apr 2024",
        expectedCompletion: "12 Jun 2024",
        description: "Interactive video course streaming platform with progress tracking.",
        technologies: ["Next.js", "Tailwind CSS", "Supabase"],
        progress: 90,
        priority: "High"
    },
    {
        id: "ong-7",
        projectName: "Food Delivery Web App",
        category: "Web App",
        clientName: "Foodies",
        status: "Testing",
        startDate: "20 Apr 2024",
        expectedCompletion: "10 Jun 2024",
        description: "On-demand food ordering system with live driver GPS tracking.",
        technologies: ["React Native", "Node.js", "Firebase"],
        progress: 70,
        priority: "Medium"
    },
    {
        id: "ong-8",
        projectName: "Landing Page Redesign",
        category: "Web Design",
        clientName: "Brandify",
        status: "Completed",
        startDate: "10 Apr 2024",
        expectedCompletion: "30 Apr 2024",
        description: "High-converting dark mode marketing landing page.",
        technologies: ["HTML", "CSS", "JavaScript"],
        progress: 100,
        priority: "Low"
    }
];

export const DEFAULT_COMPLETED_PROJECTS: CompletedProject[] = [
    {
        id: "comp-1",
        title: "Clinic Appointment System",
        category: "Web App",
        description: "Web application for managing clinic appointments and patient history.",
        technologies: ["PHP", "MySQL", "Bootstrap"],
        completionDate: "2024",
        githubLink: "https://github.com/Elumugam"
    },
    {
        id: "comp-2",
        title: "Blogging Platform",
        category: "Web App",
        description: "Full-stack blogging platform with dynamic markdown editing and admin panel.",
        technologies: ["Next.js", "MongoDB", "Tailwind"],
        completionDate: "2024",
        githubLink: "https://github.com/Elumugam"
    },
    {
        id: "comp-3",
        title: "Weather Dashboard",
        category: "Web App",
        description: "Weather forecasting dashboard with live interactive maps and historical data.",
        technologies: ["React", "API", "Chart.js"],
        completionDate: "2024",
        githubLink: "https://github.com/Elumugam"
    }
];

export const DEFAULT_CLIENT_REVIEWS: ClientReview[] = [
    {
        id: "rev-1",
        clientName: "Rohit Sharma",
        company: "TripO Client Systems",
        designation: "CEO",
        rating: 5,
        review: "Excellent work! Delivered the project on time with clean code and great support.",
        projectName: "Travel Booking Platform",
        date: "May 20, 2024",
        pinned: true
    },
    {
        id: "rev-2",
        clientName: "Anjali Mehta",
        company: "EduTech",
        designation: "Founder",
        rating: 5,
        review: "Very professional and skilled developer. Communication was smooth throughout.",
        projectName: "School Management System",
        date: "June 02, 2024",
        pinned: true
    },
    {
        id: "rev-3",
        clientName: "Karthik R",
        company: "FinTrack",
        designation: "CTO",
        rating: 5,
        review: "Highly recommended! Understood requirements perfectly and delivered more than expected.",
        projectName: "FinTrack – Expense Tracker",
        date: "June 10, 2024",
        pinned: true
    }
];

export const DEFAULT_BOOKINGS: BookingRequest[] = [
    {
        id: "BKG-101",
        date: "2026-02-28",
        clientName: "Marcus Vance",
        companyName: "Vance Media",
        email: "marcus@vancemedia.io",
        phone: "+1 (555) 234-5678",
        country: "United States",
        projectTitle: "AI Content Automation Engine",
        projectCategory: "Generative AI",
        budget: "$5,000 - $10,000",
        timeline: "1 Month",
        projectDescription: "Looking to build a custom LLM pipeline for automated multi-channel content publishing.",
        preferredContactMethod: "Email",
        status: "New"
    }
];

const syncChannel = typeof window !== "undefined" && "BroadcastChannel" in window
    ? new BroadcastChannel("portfolio_cms_channel")
    : null;

if (syncChannel) {
    syncChannel.onmessage = (event) => {
        if (event.data && event.data.type) {
            window.dispatchEvent(new Event(event.data.type));
            window.dispatchEvent(new Event("portfolio-store-updated"));
        }
    };
}

class PortfolioStore {
    constructor() {
        if (typeof window !== "undefined" && window.localStorage) {
            const legacyKeys = [
                "portfolio_announcement_v1",
                "portfolio_hero_mobile_transform_settings",
                "portfolio_projects_v1",
                "portfolio_projects_v2",
                "portfolio_projects_v3"
            ];
            legacyKeys.forEach((key) => {
                try {
                    localStorage.removeItem(key);
                } catch {
                    // ignore
                }
            });
        }
    }

    private updateTimestamp(): void {
        const now = new Date().toISOString();
        localStorage.setItem(LAST_UPDATED_KEY, now);
    }

    private notifyUpdate(eventName: string): void {
        this.updateTimestamp();
        window.dispatchEvent(new Event(eventName));
        window.dispatchEvent(new Event("portfolio-store-updated"));
        if (syncChannel) {
            try {
                syncChannel.postMessage({ type: eventName, timestamp: Date.now() });
            } catch {
                // ignore
            }
        }
    }

    public getLastUpdated(): string {
        const stored = localStorage.getItem(LAST_UPDATED_KEY);
        if (!stored) {
            return new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric"
            });
        }
        try {
            return new Date(stored).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
        } catch {
            return stored;
        }
    }

    // ==========================================
    // 1. PERSONAL PORTFOLIO PROJECTS (portfolioProjects[])
    // ==========================================
    public getProjects(): Project[] {
        const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
        if (stored === null) {
            this.saveProjects(DEFAULT_PROJECTS, false);
            return DEFAULT_PROJECTS;
        }
        try {
            const parsed = JSON.parse(stored) as Project[];
            return parsed.sort((a, b) => (a.order || 0) - (b.order || 0));
        } catch (err) {
            console.error("Failed to parse projects from storage:", err);
            return DEFAULT_PROJECTS;
        }
    }

    public getPublishedProjects(): Project[] {
        return this.getProjects().filter((p) => p.published);
    }

    public getFeaturedProjects(): Project[] {
        return this.getPublishedProjects().filter((p) => p.featured);
    }

    public saveProjects(projects: Project[], notify = true): void {
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
        if (notify) {
            this.notifyUpdate("portfolio-projects-updated");
        }
    }

    public addProject(project: Omit<Project, "id" | "order">): Project {
        const projects = this.getProjects();
        const maxOrder = projects.reduce((max, p) => Math.max(max, p.order || 0), 0);
        const newProject: Project = {
            ...project,
            id: "proj-" + Date.now(),
            order: maxOrder + 1
        };
        projects.push(newProject);
        this.saveProjects(projects);
        return newProject;
    }

    public updateProject(id: string, updatedData: Partial<Project>): void {
        const projects = this.getProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index !== -1) {
            projects[index] = { ...projects[index], ...updatedData };
            this.saveProjects(projects);
        }
    }

    public deleteProject(id: string): void {
        const projects = this.getProjects().filter((p) => p.id !== id);
        const reordered = projects.map((p, idx) => ({ ...p, order: idx + 1 }));
        this.saveProjects(reordered);
    }

    public togglePublish(id: string): void {
        const projects = this.getProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index !== -1) {
            projects[index].published = !projects[index].published;
            this.saveProjects(projects);
        }
    }

    public toggleFeatured(id: string): void {
        const projects = this.getProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index !== -1) {
            projects[index].featured = !projects[index].featured;
            this.saveProjects(projects);
        }
    }

    public reorderProjects(reorderedProjects: Project[]): void {
        const updated = reorderedProjects.map((p, idx) => ({ ...p, order: idx + 1 }));
        this.saveProjects(updated);
    }

    public moveProjectUp(id: string): void {
        const projects = this.getProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index > 0) {
            const temp = projects[index];
            projects[index] = projects[index - 1];
            projects[index - 1] = temp;
            this.reorderProjects(projects);
        }
    }

    public moveProjectDown(id: string): void {
        const projects = this.getProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index !== -1 && index < projects.length - 1) {
            const temp = projects[index];
            projects[index] = projects[index + 1];
            projects[index + 1] = temp;
            this.reorderProjects(projects);
        }
    }

    // ==========================================
    // 2. FREELANCING CLIENT PROJECTS (clientProjects[])
    // ==========================================
    public getClientProjects(): ClientProject[] {
        const stored = localStorage.getItem(CLIENT_PROJECTS_STORAGE_KEY);
        if (stored === null) {
            this.saveClientProjects(DEFAULT_CLIENT_PROJECTS, false);
            return DEFAULT_CLIENT_PROJECTS;
        }
        try {
            const parsed = JSON.parse(stored) as ClientProject[];
            return parsed.sort((a, b) => (a.order || 0) - (b.order || 0));
        } catch {
            return DEFAULT_CLIENT_PROJECTS;
        }
    }

    public getPublishedClientProjects(): ClientProject[] {
        return this.getClientProjects().filter((p) => p.published);
    }

    public getFeaturedClientProjects(): ClientProject[] {
        return this.getPublishedClientProjects().filter((p) => p.featured);
    }

    public saveClientProjects(projects: ClientProject[], notify = true): void {
        localStorage.setItem(CLIENT_PROJECTS_STORAGE_KEY, JSON.stringify(projects));
        if (notify) {
            this.notifyUpdate("portfolio-freelancing-updated");
        }
    }

    public addClientProject(project: Omit<ClientProject, "id" | "order">): ClientProject {
        const projects = this.getClientProjects();
        const maxOrder = projects.reduce((max, p) => Math.max(max, p.order || 0), 0);
        const newProj: ClientProject = {
            ...project,
            id: "client-" + Date.now(),
            order: maxOrder + 1
        };
        projects.push(newProj);
        this.saveClientProjects(projects);
        return newProj;
    }

    public updateClientProject(id: string, updatedData: Partial<ClientProject>): void {
        const projects = this.getClientProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index !== -1) {
            projects[index] = { ...projects[index], ...updatedData };
            this.saveClientProjects(projects);
        }
    }

    public deleteClientProject(id: string): void {
        const projects = this.getClientProjects().filter((p) => p.id !== id);
        const reordered = projects.map((p, idx) => ({ ...p, order: idx + 1 }));
        this.saveClientProjects(reordered);
    }

    public duplicateClientProject(id: string): ClientProject | null {
        const projects = this.getClientProjects();
        const target = projects.find((p) => p.id === id);
        if (!target) return null;

        const maxOrder = projects.reduce((max, p) => Math.max(max, p.order || 0), 0);
        const duplicated: ClientProject = {
            ...target,
            id: "client-" + Date.now(),
            projectName: `${target.projectName} (Copy)`,
            order: maxOrder + 1
        };

        projects.push(duplicated);
        this.saveClientProjects(projects);
        return duplicated;
    }

    public togglePublishClientProject(id: string): void {
        const projects = this.getClientProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index !== -1) {
            projects[index].published = !projects[index].published;
            this.saveClientProjects(projects);
        }
    }

    public toggleFeaturedClientProject(id: string): void {
        const projects = this.getClientProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index !== -1) {
            projects[index].featured = !projects[index].featured;
            this.saveClientProjects(projects);
        }
    }

    public reorderClientProjects(reorderedProjects: ClientProject[]): void {
        const updated = reorderedProjects.map((p, idx) => ({ ...p, order: idx + 1 }));
        this.saveClientProjects(updated);
    }

    public moveClientProjectUp(id: string): void {
        const projects = this.getClientProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index > 0) {
            const temp = projects[index];
            projects[index] = projects[index - 1];
            projects[index - 1] = temp;
            this.reorderClientProjects(projects);
        }
    }

    public moveClientProjectDown(id: string): void {
        const projects = this.getClientProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index !== -1 && index < projects.length - 1) {
            const temp = projects[index];
            projects[index] = projects[index + 1];
            projects[index + 1] = temp;
            this.reorderClientProjects(projects);
        }
    }

    // Legacy wrappers for backward compatibility if needed
    public getFreelancingProjects(): ClientProject[] {
        return this.getClientProjects();
    }

    public saveFreelancingProjects(projects: any[], notify = true): void {
        this.saveClientProjects(projects, notify);
    }

    // ==========================================
    // 3. HERO & ANNOUNCEMENT SETTINGS
    // ==========================================
    public getHeroImage(): HeroImageData | null {
        const stored = localStorage.getItem(HERO_IMAGE_STORAGE_KEY);
        if (!stored) return null;
        try {
            return JSON.parse(stored) as HeroImageData;
        } catch {
            return null;
        }
    }

    public saveHeroImage(heroData: HeroImageData): void {
        localStorage.setItem(HERO_IMAGE_STORAGE_KEY, JSON.stringify(heroData));
        this.notifyUpdate("portfolio-hero-updated");
    }

    public deleteHeroImage(): void {
        localStorage.removeItem(HERO_IMAGE_STORAGE_KEY);
        this.notifyUpdate("portfolio-hero-updated");
    }

    public getHeroTransform(): HeroTransformSettings {
        const stored = localStorage.getItem(HERO_TRANSFORM_STORAGE_KEY);
        if (!stored) return DEFAULT_HERO_TRANSFORM;
        try {
            return { ...DEFAULT_HERO_TRANSFORM, ...JSON.parse(stored) };
        } catch {
            return DEFAULT_HERO_TRANSFORM;
        }
    }

    public saveHeroTransform(settings: HeroTransformSettings): void {
        localStorage.setItem(HERO_TRANSFORM_STORAGE_KEY, JSON.stringify(settings));
        this.notifyUpdate("portfolio-hero-updated");
    }

    public resetHeroTransform(): void {
        localStorage.removeItem(HERO_TRANSFORM_STORAGE_KEY);
        this.notifyUpdate("portfolio-hero-updated");
    }

    public getMobileHeroTransform(): HeroTransformSettings {
        return this.getHeroTransform();
    }

    public saveMobileHeroTransform(settings: HeroTransformSettings): void {
        this.saveHeroTransform(settings);
    }

    public resetMobileHeroTransform(): void {
        this.resetHeroTransform();
    }

    public getHeroText(): HeroTextSettings {
        const stored = localStorage.getItem(HERO_TEXT_STORAGE_KEY);
        if (!stored) return DEFAULT_HERO_TEXT;
        try {
            return { ...DEFAULT_HERO_TEXT, ...JSON.parse(stored) };
        } catch {
            return DEFAULT_HERO_TEXT;
        }
    }

    public saveHeroText(settings: HeroTextSettings): void {
        localStorage.setItem(HERO_TEXT_STORAGE_KEY, JSON.stringify(settings));
        this.notifyUpdate("portfolio-hero-updated");
    }

    public resetHeroText(): void {
        localStorage.removeItem(HERO_TEXT_STORAGE_KEY);
        this.notifyUpdate("portfolio-hero-updated");
    }

    public getAnnouncement(): AnnouncementSettings {
        return this.getSectionAnnouncement("hero");
    }

    public saveAnnouncement(settings: AnnouncementSettings): void {
        this.saveSectionAnnouncement("hero", settings);
    }

    public resetAnnouncement(): void {
        this.resetSectionAnnouncement("hero");
    }

    public getSectionAnnouncement(section: AnnouncementSectionKey): AnnouncementSettings {
        const key = ANNOUNCEMENT_SECTION_KEYS[section];
        const stored = localStorage.getItem(key);
        if (!stored) {
            if (section === "hero") {
                const legacy = localStorage.getItem(ANNOUNCEMENT_STORAGE_KEY);
                if (legacy) {
                    try {
                        return { ...DEFAULT_SECTION_ANNOUNCEMENTS.hero, ...JSON.parse(legacy) };
                    } catch {
                        // ignore
                    }
                }
            }
            return DEFAULT_SECTION_ANNOUNCEMENTS[section];
        }
        try {
            return { ...DEFAULT_SECTION_ANNOUNCEMENTS[section], ...JSON.parse(stored) };
        } catch {
            return DEFAULT_SECTION_ANNOUNCEMENTS[section];
        }
    }

    public saveSectionAnnouncement(section: AnnouncementSectionKey, settings: AnnouncementSettings): void {
        const key = ANNOUNCEMENT_SECTION_KEYS[section];
        localStorage.setItem(key, JSON.stringify(settings));
        if (section === "hero") {
            localStorage.setItem(ANNOUNCEMENT_STORAGE_KEY, JSON.stringify(settings));
        }
        this.notifyUpdate("portfolio-announcement-updated");
    }

    public resetSectionAnnouncement(section: AnnouncementSectionKey): void {
        const key = ANNOUNCEMENT_SECTION_KEYS[section];
        localStorage.removeItem(key);
        if (section === "hero") {
            localStorage.removeItem(ANNOUNCEMENT_STORAGE_KEY);
        }
        this.notifyUpdate("portfolio-announcement-updated");
    }

    // ==========================================
    // 4. ONGOING CLIENT PROJECTS (ongoingClientProjects[])
    // ==========================================
    public getOngoingProjects(): OngoingProject[] {
        const stored = localStorage.getItem(ONGOING_PROJECTS_KEY);
        if (!stored) {
            this.saveOngoingProjects(DEFAULT_ONGOING_PROJECTS, false);
            return DEFAULT_ONGOING_PROJECTS;
        }
        try {
            return JSON.parse(stored) as OngoingProject[];
        } catch {
            return DEFAULT_ONGOING_PROJECTS;
        }
    }

    public saveOngoingProjects(projects: OngoingProject[], notify = true): void {
        localStorage.setItem(ONGOING_PROJECTS_KEY, JSON.stringify(projects));
        if (notify) {
            this.notifyUpdate("portfolio-freelancing-updated");
        }
    }

    public addOngoingProject(project: Omit<OngoingProject, "id">): OngoingProject {
        const projects = this.getOngoingProjects();
        const newProj: OngoingProject = { ...project, id: "ong-" + Date.now() };
        projects.push(newProj);
        this.saveOngoingProjects(projects);
        return newProj;
    }

    public updateOngoingProject(id: string, data: Partial<OngoingProject>): void {
        const projects = this.getOngoingProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index !== -1) {
            projects[index] = { ...projects[index], ...data };
            this.saveOngoingProjects(projects);
        }
    }

    public deleteOngoingProject(id: string): void {
        const projects = this.getOngoingProjects().filter((p) => p.id !== id);
        this.saveOngoingProjects(projects);
    }

    // ==========================================
    // 5. COMPLETED CLIENT PROJECTS (completedClientProjects[])
    // ==========================================
    public getCompletedProjects(): CompletedProject[] {
        const stored = localStorage.getItem(COMPLETED_PROJECTS_KEY);
        if (!stored) {
            this.saveCompletedProjects(DEFAULT_COMPLETED_PROJECTS, false);
            return DEFAULT_COMPLETED_PROJECTS;
        }
        try {
            return JSON.parse(stored) as CompletedProject[];
        } catch {
            return DEFAULT_COMPLETED_PROJECTS;
        }
    }

    public saveCompletedProjects(projects: CompletedProject[], notify = true): void {
        localStorage.setItem(COMPLETED_PROJECTS_KEY, JSON.stringify(projects));
        if (notify) {
            this.notifyUpdate("portfolio-freelancing-updated");
        }
    }

    public addCompletedProject(project: Omit<CompletedProject, "id">): CompletedProject {
        const projects = this.getCompletedProjects();
        const newProj: CompletedProject = { ...project, id: "comp-" + Date.now() };
        projects.push(newProj);
        this.saveCompletedProjects(projects);
        return newProj;
    }

    public updateCompletedProject(id: string, data: Partial<CompletedProject>): void {
        const projects = this.getCompletedProjects();
        const index = projects.findIndex((p) => p.id === id);
        if (index !== -1) {
            projects[index] = { ...projects[index], ...data };
            this.saveCompletedProjects(projects);
        }
    }

    public deleteCompletedProject(id: string): void {
        const projects = this.getCompletedProjects().filter((p) => p.id !== id);
        this.saveCompletedProjects(projects);
    }

    // ==========================================
    // 6. CLIENT REVIEWS & BOOKINGS
    // ==========================================
    public getClientReviews(): ClientReview[] {
        const stored = localStorage.getItem(CLIENT_REVIEWS_KEY);
        if (!stored) {
            this.saveClientReviews(DEFAULT_CLIENT_REVIEWS, false);
            return DEFAULT_CLIENT_REVIEWS;
        }
        try {
            return JSON.parse(stored) as ClientReview[];
        } catch {
            return DEFAULT_CLIENT_REVIEWS;
        }
    }

    public saveClientReviews(reviews: ClientReview[], notify = true): void {
        localStorage.setItem(CLIENT_REVIEWS_KEY, JSON.stringify(reviews));
        if (notify) {
            this.notifyUpdate("portfolio-freelancing-updated");
        }
    }

    public addClientReview(review: Omit<ClientReview, "id">): ClientReview {
        const reviews = this.getClientReviews();
        const newRev: ClientReview = { ...review, id: "rev-" + Date.now() };
        reviews.push(newRev);
        this.saveClientReviews(reviews);
        return newRev;
    }

    public updateClientReview(id: string, data: Partial<ClientReview>): void {
        const reviews = this.getClientReviews();
        const index = reviews.findIndex((r) => r.id === id);
        if (index !== -1) {
            reviews[index] = { ...reviews[index], ...data };
            this.saveClientReviews(reviews);
        }
    }

    public deleteClientReview(id: string): void {
        const reviews = this.getClientReviews().filter((r) => r.id !== id);
        this.saveClientReviews(reviews);
    }

    public getBookings(): BookingRequest[] {
        const stored = localStorage.getItem(BOOKINGS_KEY);
        if (!stored) {
            this.saveBookings(DEFAULT_BOOKINGS, false);
            return DEFAULT_BOOKINGS;
        }
        try {
            return JSON.parse(stored) as BookingRequest[];
        } catch {
            return DEFAULT_BOOKINGS;
        }
    }

    public saveBookings(bookings: BookingRequest[], notify = true): void {
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
        if (notify) {
            this.notifyUpdate("portfolio-freelancing-updated");
        }
    }

    public addBooking(booking: Omit<BookingRequest, "id" | "date" | "status">): BookingRequest {
        const bookings = this.getBookings();
        const newBooking: BookingRequest = {
            ...booking,
            id: "BKG-" + Math.floor(100 + Math.random() * 900),
            date: new Date().toISOString().split("T")[0],
            status: "New"
        };
        bookings.unshift(newBooking);
        this.saveBookings(bookings);
        return newBooking;
    }

    public updateBookingStatus(id: string, status: BookingRequest["status"]): void {
        const bookings = this.getBookings();
        const index = bookings.findIndex((b) => b.id === id);
        if (index !== -1) {
            bookings[index].status = status;
            this.saveBookings(bookings);
        }
    }

    public deleteBooking(id: string): void {
        const bookings = this.getBookings().filter((b) => b.id !== id);
        this.saveBookings(bookings);
    }

    public getFreelancingHero(): FreelancingHeroSettings {
        const stored = localStorage.getItem(FREELANCING_HERO_STORAGE_KEY);
        if (!stored) return DEFAULT_FREELANCING_HERO;
        try {
            return { ...DEFAULT_FREELANCING_HERO, ...JSON.parse(stored) };
        } catch {
            return DEFAULT_FREELANCING_HERO;
        }
    }

    public saveFreelancingHero(settings: FreelancingHeroSettings): void {
        localStorage.setItem(FREELANCING_HERO_STORAGE_KEY, JSON.stringify(settings));
        this.notifyUpdate("portfolio-freelancing-updated");
    }
}

export const portfolioStore = new PortfolioStore();

export function getHeroImageStyle(
    transform: HeroTransformSettings,
    containerDiameter: number,
    isMobile: boolean
): { width: string; height: string; transform: string } {
    if (isMobile) {
        const scaleFactor = containerDiameter / 100;
        const width = (transform.width / 480) * 90 * scaleFactor;
        const height = (transform.height / 580) * 110 * scaleFactor;
        const posX = transform.positionX * 0.3 * scaleFactor;
        const posY = transform.positionY * 0.3 * scaleFactor;

        return {
            width: `${width}px`,
            height: `${height}px`,
            transform: `translate(${posX}px, ${posY}px) scale(${transform.scale / 100}) rotate(${transform.rotation}deg)`,
        };
    } else {
        const scaleFactor = containerDiameter / 170;
        const width = (transform.width / 480) * 160 * scaleFactor;
        const height = (transform.height / 580) * 190 * scaleFactor;
        const posX = transform.positionX * 0.35 * scaleFactor;
        const posY = transform.positionY * 0.35 * scaleFactor;

        return {
            width: `${width}px`,
            height: `${height}px`,
            transform: `translate(${posX}px, ${posY}px) scale(${transform.scale / 100}) rotate(${transform.rotation}deg)`,
        };
    }
}
