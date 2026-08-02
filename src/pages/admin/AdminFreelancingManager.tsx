import { useState, useEffect, ChangeEvent } from "react";
import {
    Briefcase, Star, Clock, CheckCircle2, MessageSquare, Send, Plus, Trash2, Edit3, Save, Check, X, ShieldAlert, Type, Upload, Image as ImageIcon, AlertTriangle, Copy, ArrowUp, ArrowDown, Building
} from "lucide-react";
import {
    portfolioStore, ClientProject, OngoingProject, CompletedProject, ClientReview, BookingRequest, FreelancingHeroSettings
} from "../../services/portfolioStore";

type SubTab = "client-projects" | "featured" | "ongoing" | "completed" | "reviews" | "bookings" | "hero";

export default function AdminFreelancingManager() {
    const [activeSubTab, setActiveSubTab] = useState<SubTab>("client-projects");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus] = useState("all");

    // Notifications
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    // Hero CMS state
    const [heroForm, setHeroForm] = useState<FreelancingHeroSettings>(() =>
        portfolioStore.getFreelancingHero()
    );

    // Data States
    const [clientProjects, setClientProjects] = useState<ClientProject[]>([]);
    const [ongoingProjects, setOngoingProjects] = useState<OngoingProject[]>([]);
    const [completedProjects, setCompletedProjects] = useState<CompletedProject[]>([]);
    const [reviews, setReviews] = useState<ClientReview[]>([]);
    const [bookings, setBookings] = useState<BookingRequest[]>([]);

    // Delete Confirmation Target Modal States
    const [deleteClientTarget, setDeleteClientTarget] = useState<string | null>(null);
    const [deleteOngoingTarget, setDeleteOngoingTarget] = useState<string | null>(null);
    const [deleteCompletedTarget, setDeleteCompletedTarget] = useState<string | null>(null);
    const [deleteReviewTarget, setDeleteReviewTarget] = useState<string | null>(null);
    const [deleteBookingTarget, setDeleteBookingTarget] = useState<string | null>(null);

    // Selected booking modal state
    const [selectedBooking, setSelectedBooking] = useState<BookingRequest | null>(null);

    // Form Modal States for Add/Edit
    const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
    const [editingClientProject, setEditingClientProject] = useState<ClientProject | null>(null);

    const [isAddOngoingModalOpen, setIsAddOngoingModalOpen] = useState(false);
    const [editingOngoing, setEditingOngoing] = useState<OngoingProject | null>(null);

    const [isAddCompletedModalOpen, setIsAddCompletedModalOpen] = useState(false);
    const [editingCompleted, setEditingCompleted] = useState<CompletedProject | null>(null);

    const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
    const [editingReview, setEditingReview] = useState<ClientReview | null>(null);

    // Client Project Form State
    const [clientForm, setClientForm] = useState({
        projectName: "",
        clientName: "",
        industry: "IT & Software",
        category: "Web Application",
        description: "",
        technologiesStr: "React, Node.js, PostgreSQL",
        websiteUrl: "",
        completionDate: "2024",
        status: "Completed" as ClientProject["status"],
        featured: true,
        published: true,
        imageUrl: "",
        clientLogo: ""
    });

    const [ongoingForm, setOngoingForm] = useState({
        projectName: "",
        category: "Web App",
        clientName: "",
        status: "Development" as OngoingProject["status"],
        startDate: "10 May 2024",
        expectedCompletion: "25 Jun 2024",
        description: "",
        technologiesStr: "React, TypeScript, Node.js",
        progress: 50,
        priority: "Medium" as "Low" | "Medium" | "High",
        imageUrl: ""
    });

    const [completedForm, setCompletedForm] = useState({
        title: "",
        category: "Web App",
        description: "",
        technologiesStr: "React, Node.js",
        completionDate: "2024",
        imageUrl: "",
        githubLink: "https://github.com/Elumugam",
        liveDemoLink: "",
        caseStudyLink: ""
    });

    const [reviewForm, setReviewForm] = useState({
        clientName: "",
        company: "",
        designation: "CEO",
        rating: 5,
        review: "",
        projectName: "",
        date: "May 20, 2024",
        clientPhoto: "",
        pinned: true
    });

    const loadAll = () => {
        setHeroForm(portfolioStore.getFreelancingHero());
        setClientProjects(portfolioStore.getClientProjects());
        setOngoingProjects(portfolioStore.getOngoingProjects());
        setCompletedProjects(portfolioStore.getCompletedProjects());
        setReviews(portfolioStore.getClientReviews());
        setBookings(portfolioStore.getBookings());
    };

    useEffect(() => {
        loadAll();
        const handleUpdate = () => loadAll();
        window.addEventListener("portfolio-freelancing-updated", handleUpdate);
        return () => {
            window.removeEventListener("portfolio-freelancing-updated", handleUpdate);
        };
    }, []);

    const notifySuccess = (msg: string) => {
        setSuccessMsg(msg);
        setErrorMsg("");
        setTimeout(() => setSuccessMsg(""), 4000);
    };

    // Helper Image Reader
    const handleFileRead = (e: ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];
        if (!allowedTypes.includes(file.type.toLowerCase())) {
            setErrorMsg("Unsupported image format. Allowed: PNG, JPG, JPEG, WEBP, SVG.");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setErrorMsg("File size exceeds maximum limit of 10MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (evt) => {
            if (evt.target?.result) {
                callback(evt.target.result as string);
                notifySuccess("Image uploaded successfully.");
            }
        };
        reader.onerror = () => setErrorMsg("Failed to read image file.");
        reader.readAsDataURL(file);
    };

    // Hero Save
    const handleSaveHero = () => {
        portfolioStore.saveFreelancingHero(heroForm);
        notifySuccess("Freelancing Hero header content saved!");
    };

    // Client Project CRUD Handlers
    const handleOpenAddClientModal = () => {
        setEditingClientProject(null);
        setClientForm({
            projectName: "",
            clientName: "",
            industry: "IT & Software",
            category: "Web Application",
            description: "",
            technologiesStr: "React, Node.js, PostgreSQL",
            websiteUrl: "",
            completionDate: "2024",
            status: "Completed",
            featured: true,
            published: true,
            imageUrl: "",
            clientLogo: ""
        });
        setIsAddClientModalOpen(true);
    };

    const handleOpenEditClientModal = (project: ClientProject) => {
        setEditingClientProject(project);
        setClientForm({
            projectName: project.projectName,
            clientName: project.clientName,
            industry: project.industry || "IT & Software",
            category: project.category,
            description: project.description,
            technologiesStr: project.technologies ? project.technologies.join(", ") : "React, Node.js",
            websiteUrl: project.websiteUrl || "",
            completionDate: project.completionDate || "2024",
            status: project.status,
            featured: project.featured,
            published: project.published,
            imageUrl: project.imageUrl || "",
            clientLogo: project.clientLogo || ""
        });
        setIsAddClientModalOpen(true);
    };

    const handleSaveClientForm = () => {
        if (!clientForm.projectName.trim()) {
            setErrorMsg("Project Name is required.");
            return;
        }
        if (!clientForm.clientName.trim()) {
            setErrorMsg("Client Name is required.");
            return;
        }
        if (!clientForm.description.trim()) {
            setErrorMsg("Project Description is required.");
            return;
        }

        const techArray = clientForm.technologiesStr.split(",").map((t) => t.trim()).filter(Boolean);

        const payload = {
            projectName: clientForm.projectName,
            clientName: clientForm.clientName,
            industry: clientForm.industry,
            category: clientForm.category,
            description: clientForm.description,
            technologies: techArray,
            websiteUrl: clientForm.websiteUrl,
            completionDate: clientForm.completionDate,
            status: clientForm.status,
            featured: clientForm.featured,
            published: clientForm.published,
            imageUrl: clientForm.imageUrl,
            clientLogo: clientForm.clientLogo
        };

        if (editingClientProject) {
            portfolioStore.updateClientProject(editingClientProject.id, payload);
            notifySuccess(`Client project "${clientForm.projectName}" updated successfully.`);
        } else {
            portfolioStore.addClientProject(payload);
            notifySuccess(`Client project "${clientForm.projectName}" created successfully.`);
        }

        setIsAddClientModalOpen(false);
        setEditingClientProject(null);
        loadAll();
    };

    const confirmDeleteClientProject = () => {
        if (deleteClientTarget) {
            portfolioStore.deleteClientProject(deleteClientTarget);
            notifySuccess("Client project deleted successfully.");
            setDeleteClientTarget(null);
            loadAll();
        }
    };

    const handleDuplicateClientProject = (id: string) => {
        const dup = portfolioStore.duplicateClientProject(id);
        if (dup) {
            notifySuccess(`Duplicated project as "${dup.projectName}".`);
            loadAll();
        }
    };

    const handleMoveClientUp = (id: string) => {
        portfolioStore.moveClientProjectUp(id);
        loadAll();
    };

    const handleMoveClientDown = (id: string) => {
        portfolioStore.moveClientProjectDown(id);
        loadAll();
    };

    const handleTogglePublishClient = (id: string) => {
        portfolioStore.togglePublishClientProject(id);
        loadAll();
    };

    const handleToggleFeaturedClient = (id: string) => {
        portfolioStore.toggleFeaturedClientProject(id);
        loadAll();
    };

    // Ongoing Projects Handlers
    const handleSaveOngoingForm = () => {
        if (!ongoingForm.projectName.trim()) {
            setErrorMsg("Project Name is required.");
            return;
        }
        const techArray = ongoingForm.technologiesStr.split(",").map((t) => t.trim()).filter(Boolean);
        const payload = {
            projectName: ongoingForm.projectName,
            category: ongoingForm.category,
            clientName: ongoingForm.clientName,
            status: ongoingForm.status,
            startDate: ongoingForm.startDate,
            expectedCompletion: ongoingForm.expectedCompletion,
            description: ongoingForm.description,
            technologies: techArray,
            progress: Number(ongoingForm.progress),
            priority: ongoingForm.priority,
            imageUrl: ongoingForm.imageUrl
        };

        if (editingOngoing) {
            portfolioStore.updateOngoingProject(editingOngoing.id, payload);
            notifySuccess("Ongoing project task updated.");
        } else {
            portfolioStore.addOngoingProject(payload);
            notifySuccess("Ongoing project task added.");
        }
        setIsAddOngoingModalOpen(false);
        setEditingOngoing(null);
        loadAll();
    };

    const confirmDeleteOngoing = () => {
        if (deleteOngoingTarget) {
            portfolioStore.deleteOngoingProject(deleteOngoingTarget);
            notifySuccess("Ongoing project task removed.");
            setDeleteOngoingTarget(null);
            loadAll();
        }
    };

    // Completed Projects Handlers
    const handleSaveCompletedForm = () => {
        if (!completedForm.title.trim()) {
            setErrorMsg("Project Title is required.");
            return;
        }
        const techArray = completedForm.technologiesStr.split(",").map((t) => t.trim()).filter(Boolean);
        const payload = {
            title: completedForm.title,
            category: completedForm.category,
            description: completedForm.description,
            technologies: techArray,
            completionDate: completedForm.completionDate,
            imageUrl: completedForm.imageUrl,
            githubLink: completedForm.githubLink,
            liveDemoLink: completedForm.liveDemoLink,
            caseStudyLink: completedForm.caseStudyLink
        };

        if (editingCompleted) {
            portfolioStore.updateCompletedProject(editingCompleted.id, payload);
            notifySuccess("Completed project updated.");
        } else {
            portfolioStore.addCompletedProject(payload);
            notifySuccess("Completed project added.");
        }
        setIsAddCompletedModalOpen(false);
        setEditingCompleted(null);
        loadAll();
    };

    const confirmDeleteCompleted = () => {
        if (deleteCompletedTarget) {
            portfolioStore.deleteCompletedProject(deleteCompletedTarget);
            notifySuccess("Completed project deleted.");
            setDeleteCompletedTarget(null);
            loadAll();
        }
    };

    // Client Reviews Handlers
    const handleSaveReviewForm = () => {
        if (!reviewForm.clientName.trim() || !reviewForm.review.trim()) {
            setErrorMsg("Client Name and Review Body text are required.");
            return;
        }
        const payload = {
            clientName: reviewForm.clientName,
            company: reviewForm.company,
            designation: reviewForm.designation,
            rating: Number(reviewForm.rating),
            review: reviewForm.review,
            projectName: reviewForm.projectName,
            date: reviewForm.date,
            clientPhoto: reviewForm.clientPhoto,
            pinned: reviewForm.pinned
        };

        if (editingReview) {
            portfolioStore.updateClientReview(editingReview.id, payload);
            notifySuccess("Client review updated.");
        } else {
            portfolioStore.addClientReview(payload);
            notifySuccess("Client review added.");
        }
        setIsAddReviewModalOpen(false);
        setEditingReview(null);
        loadAll();
    };

    const confirmDeleteReview = () => {
        if (deleteReviewTarget) {
            portfolioStore.deleteClientReview(deleteReviewTarget);
            notifySuccess("Review deleted.");
            setDeleteReviewTarget(null);
            loadAll();
        }
    };

    // Booking Status & Delete
    const handleBookingStatus = (id: string, status: BookingRequest["status"]) => {
        portfolioStore.updateBookingStatus(id, status);
        notifySuccess(`Booking ${id} set to ${status}.`);
        loadAll();
    };

    const confirmDeleteBooking = () => {
        if (deleteBookingTarget) {
            portfolioStore.deleteBooking(deleteBookingTarget);
            if (selectedBooking?.id === deleteBookingTarget) setSelectedBooking(null);
            notifySuccess("Booking deleted.");
            setDeleteBookingTarget(null);
            loadAll();
        }
    };

    // Search Filtering
    const filteredClientProjects = clientProjects.filter((p) =>
        p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const featuredClientProjects = clientProjects.filter((p) => p.featured);

    const filteredOngoing = ongoingProjects.filter((p) => {
        const matchesSearch = p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || p.clientName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || p.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const filteredCompleted = completedProjects.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredReviews = reviews.filter((r) =>
        r.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || r.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredBookings = bookings.filter((b) => {
        const matchesSearch = b.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || b.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) || b.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || b.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold uppercase tracking-tighter text-white flex items-center gap-3">
                    <Briefcase size={28} /> Freelancing Manager (Client Projects Only)
                </h1>
                <p className="text-xs uppercase tracking-widest text-white/40 mt-1">
                    Manage Client Projects, Featured Works, Ongoing Kanban, Completed Projects, Reviews, and Bookings
                </p>
            </div>

            {/* Notifications */}
            {errorMsg && (
                <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <ShieldAlert size={18} /> <span>{errorMsg}</span>
                    </div>
                    <button onClick={() => setErrorMsg("")}><X size={16} /></button>
                </div>
            )}
            {successMsg && (
                <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Check size={18} /> <span>{successMsg}</span>
                    </div>
                    <button onClick={() => setSuccessMsg("")}><X size={16} /></button>
                </div>
            )}

            {/* Subtab Buttons Navigation */}
            <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
                {[
                    { id: "client-projects", label: "Client Projects", icon: Briefcase, count: clientProjects.length },
                    { id: "featured", label: "Featured Client Projects", icon: Star, count: featuredClientProjects.length },
                    { id: "ongoing", label: "Ongoing Kanban", icon: Clock, count: ongoingProjects.length },
                    { id: "completed", label: "Completed Work", icon: CheckCircle2, count: completedProjects.length },
                    { id: "reviews", label: "Client Reviews", icon: MessageSquare, count: reviews.length },
                    { id: "bookings", label: "Client Bookings", icon: Send, count: bookings.length },
                    { id: "hero", label: "Hero Header", icon: Type, count: 1 }
                ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeSubTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveSubTab(tab.id as SubTab);
                                setSearchTerm("");
                            }}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                                isActive ? "bg-white text-black shadow-lg" : "text-white/60 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            <Icon size={16} />
                            <span>{tab.label}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] ${isActive ? "bg-black/10 text-black" : "bg-white/10 text-white/60"}`}>
                                {tab.count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* SEARCH FILTER BAR */}
            {activeSubTab !== "hero" && (
                <div className="flex items-center justify-between gap-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search items..."
                        className="px-4 py-2.5 rounded-xl border border-white/10 bg-black text-white text-xs w-full max-w-xs focus:border-white/40 focus:outline-none"
                    />
                </div>
            )}

            {/* SUBTAB 1: CLIENT PROJECTS MANAGEMENT (DEDICATED CRUD) */}
            {activeSubTab === "client-projects" && (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                                Dedicated Client Projects CMS
                            </h2>
                            <p className="text-xs text-white/40">Full CRUD management for Freelancing Client Projects</p>
                        </div>
                        <button
                            onClick={handleOpenAddClientModal}
                            className="px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-all flex items-center gap-2 shadow-lg self-start sm:self-auto"
                        >
                            <Plus size={16} /> Add Client Project
                        </button>
                    </div>

                    {/* Table View */}
                    <div className="hidden lg:block border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl overflow-hidden shadow-2xl">
                        <table className="w-full text-left text-sm text-white">
                            <thead className="border-b border-white/10 bg-white/[0.03] text-[10px] font-bold uppercase tracking-widest text-white/60">
                                <tr>
                                    <th className="py-4 px-6">Order</th>
                                    <th className="py-4 px-6">Image</th>
                                    <th className="py-4 px-6">Project Name</th>
                                    <th className="py-4 px-6">Client Name</th>
                                    <th className="py-4 px-6">Industry / Category</th>
                                    <th className="py-4 px-6">Status &amp; Flags</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-xs">
                                {filteredClientProjects.map((project, index) => (
                                    <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 px-6 font-mono text-white/40">
                                            <div className="flex items-center gap-2">
                                                <div className="flex flex-col gap-1">
                                                    <button
                                                        onClick={() => handleMoveClientUp(project.id)}
                                                        disabled={index === 0}
                                                        className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20"
                                                        title="Move Up"
                                                    >
                                                        <ArrowUp size={12} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleMoveClientDown(project.id)}
                                                        disabled={index === filteredClientProjects.length - 1}
                                                        className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20"
                                                        title="Move Down"
                                                    >
                                                        <ArrowDown size={12} />
                                                    </button>
                                                </div>
                                                <span>#{index + 1}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {project.imageUrl ? (
                                                <img src={project.imageUrl} alt={project.projectName} className="w-12 h-10 object-cover rounded-lg border border-white/10" />
                                            ) : (
                                                <div className="w-12 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/30">
                                                    <ImageIcon size={16} />
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 font-bold uppercase tracking-tight text-white">
                                            {project.projectName}
                                        </td>
                                        <td className="py-4 px-6 text-white/80 font-medium">
                                            {project.clientName}
                                        </td>
                                        <td className="py-4 px-6 text-white/60 text-[11px]">
                                            <div>{project.category}</div>
                                            <div className="text-[10px] text-white/40 uppercase">{project.industry}</div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                    {project.status}
                                                </span>
                                                <button
                                                    onClick={() => handleTogglePublishClient(project.id)}
                                                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                                                        project.published ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-white/5 text-white/40 border-white/10"
                                                    }`}
                                                >
                                                    {project.published ? "Published" : "Draft"}
                                                </button>
                                                <button
                                                    onClick={() => handleToggleFeaturedClient(project.id)}
                                                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase border ${
                                                        project.featured ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-white/5 text-white/40 border-white/10"
                                                    }`}
                                                >
                                                    <Star size={9} className="inline mr-1" />
                                                    {project.featured ? "Featured" : "Standard"}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleDuplicateClientProject(project.id)}
                                                    className="p-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white"
                                                    title="Duplicate Project"
                                                >
                                                    <Copy size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenEditClientModal(project)}
                                                    className="p-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white"
                                                    title="Edit Project"
                                                >
                                                    <Edit3 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => setDeleteClientTarget(project.id)}
                                                    className="p-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                                                    title="Delete Project"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
                        {filteredClientProjects.map((project, index) => (
                            <div key={project.id} className="p-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-mono text-white/40">#{index + 1}</span>
                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                        {project.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    {project.imageUrl ? (
                                        <img src={project.imageUrl} alt={project.projectName} className="w-14 h-12 object-cover rounded-xl border border-white/10" />
                                    ) : (
                                        <div className="w-14 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/30">
                                            <ImageIcon size={18} />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-base font-bold uppercase text-white tracking-tight">{project.projectName}</h3>
                                        <p className="text-xs text-white/60">Client: {project.clientName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                                    <button
                                        onClick={() => handleMoveClientUp(project.id)}
                                        disabled={index === 0}
                                        className="px-2 py-1 rounded border border-white/10 text-white text-xs disabled:opacity-20"
                                    >
                                        Up
                                    </button>
                                    <button
                                        onClick={() => handleMoveClientDown(project.id)}
                                        disabled={index === filteredClientProjects.length - 1}
                                        className="px-2 py-1 rounded border border-white/10 text-white text-xs disabled:opacity-20"
                                    >
                                        Down
                                    </button>
                                    <button
                                        onClick={() => handleDuplicateClientProject(project.id)}
                                        className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white text-xs"
                                    >
                                        Copy
                                    </button>
                                    <button
                                        onClick={() => handleOpenEditClientModal(project)}
                                        className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white text-xs font-bold uppercase"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => setDeleteClientTarget(project.id)}
                                        className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-bold uppercase"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SUBTAB 2: FEATURED CLIENT PROJECTS ONLY */}
            {activeSubTab === "featured" && (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                                Featured Client Projects
                            </h2>
                            <p className="text-xs text-white/40">Displays ONLY client projects marked as Featured (e.g. Seenalam Foods, Apex CRM, Travel Booking Platform)</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featuredClientProjects.map((proj) => (
                            <div key={proj.id} className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4 hover:border-white/20 transition-all">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{proj.category}</span>
                                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                        <Star size={9} className="inline mr-1" /> Featured
                                    </span>
                                </div>

                                <div className="flex items-center gap-4">
                                    {proj.imageUrl ? (
                                        <img src={proj.imageUrl} alt={proj.projectName} className="w-16 h-14 object-cover rounded-xl border border-white/10" />
                                    ) : (
                                        <div className="w-16 h-14 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/30">
                                            <ImageIcon size={24} />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-lg font-bold uppercase text-white tracking-tight">{proj.projectName}</h3>
                                        <p className="text-xs text-white/70 font-medium">Client: {proj.clientName}</p>
                                        <p className="text-xs text-white/50 line-clamp-2 mt-0.5">{proj.description}</p>
                                    </div>
                                </div>

                                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                                    <span className="text-[10px] font-mono text-white/40">Order #{proj.order}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleOpenEditClientModal(proj)}
                                            className="p-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white"
                                            title="Edit"
                                        >
                                            <Edit3 size={14} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteClientTarget(proj.id)}
                                            className="p-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                                            title="Delete"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SUBTAB 3: ONGOING PROJECTS (KANBAN CMS) */}
            {activeSubTab === "ongoing" && (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                            Ongoing Client Projects Kanban
                        </h2>
                        <button
                            onClick={() => {
                                setEditingOngoing(null);
                                setOngoingForm({ projectName: "", category: "Web App", clientName: "", status: "Development", startDate: "10 May 2024", expectedCompletion: "25 Jun 2024", description: "", technologiesStr: "React, TypeScript, Node.js", progress: 50, priority: "Medium", imageUrl: "" });
                                setIsAddOngoingModalOpen(true);
                            }}
                            className="px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-all flex items-center gap-2 shadow-lg"
                        >
                            <Plus size={16} /> Add Ongoing Task
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredOngoing.map((item) => (
                            <div key={item.id} className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase text-white/50">{item.category}</span>
                                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                        {item.status}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold uppercase text-white tracking-tight">{item.projectName}</h3>
                                    <p className="text-xs text-white/60">Client: {item.clientName}</p>
                                    <p className="text-xs text-white/50 line-clamp-2 mt-1">{item.description}</p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] text-white/60 font-mono">
                                        <span>Progress</span>
                                        <span>{item.progress}%</span>
                                    </div>
                                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                                        <div className="h-full bg-white transition-all duration-300" style={{ width: `${item.progress}%` }} />
                                    </div>
                                </div>

                                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                                    <span className="text-[10px] text-white/40 font-mono">{item.expectedCompletion}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingOngoing(item);
                                                setOngoingForm({ projectName: item.projectName, category: item.category, clientName: item.clientName, status: item.status, startDate: item.startDate, expectedCompletion: item.expectedCompletion, description: item.description, technologiesStr: item.technologies ? item.technologies.join(", ") : "React, Node.js", progress: item.progress, priority: item.priority || "Medium", imageUrl: item.imageUrl || "" });
                                                setIsAddOngoingModalOpen(true);
                                            }}
                                            className="p-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white"
                                            title="Edit"
                                        >
                                            <Edit3 size={14} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteOngoingTarget(item.id)}
                                            className="p-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                                            title="Delete"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SUBTAB 4: COMPLETED WORK */}
            {activeSubTab === "completed" && (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                            Completed Client Work
                        </h2>
                        <button
                            onClick={() => {
                                setEditingCompleted(null);
                                setCompletedForm({ title: "", category: "Web App", description: "", technologiesStr: "React, Node.js", completionDate: "2024", imageUrl: "", githubLink: "https://github.com/Elumugam", liveDemoLink: "", caseStudyLink: "" });
                                setIsAddCompletedModalOpen(true);
                            }}
                            className="px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-all flex items-center gap-2 shadow-lg"
                        >
                            <Plus size={16} /> Add Completed Project
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredCompleted.map((comp) => (
                            <div key={comp.id} className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase text-white/50">{comp.category}</span>
                                    <span className="text-[10px] font-mono text-white/40">{comp.completionDate}</span>
                                </div>
                                <h3 className="text-lg font-bold uppercase text-white tracking-tight">{comp.title}</h3>
                                <p className="text-xs text-white/60 line-clamp-2">{comp.description}</p>
                                <div className="pt-2 flex items-center justify-end gap-2 border-t border-white/10">
                                    <button
                                        onClick={() => {
                                            setEditingCompleted(comp);
                                            setCompletedForm({ title: comp.title, category: comp.category, description: comp.description, technologiesStr: comp.technologies ? comp.technologies.join(", ") : "React, Node.js", completionDate: comp.completionDate, imageUrl: comp.imageUrl || "", githubLink: comp.githubLink || "", liveDemoLink: comp.liveDemoLink || "", caseStudyLink: comp.caseStudyLink || "" });
                                            setIsAddCompletedModalOpen(true);
                                        }}
                                        className="p-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white"
                                        title="Edit"
                                    >
                                        <Edit3 size={14} />
                                    </button>
                                    <button
                                        onClick={() => setDeleteCompletedTarget(comp.id)}
                                        className="p-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SUBTAB 5: CLIENT REVIEWS */}
            {activeSubTab === "reviews" && (
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                            Client Reviews CMS
                        </h2>
                        <button
                            onClick={() => {
                                setEditingReview(null);
                                setReviewForm({ clientName: "", company: "", designation: "CEO", rating: 5, review: "", projectName: "", date: "May 20, 2024", clientPhoto: "", pinned: true });
                                setIsAddReviewModalOpen(true);
                            }}
                            className="px-4 py-2.5 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-all flex items-center gap-2 shadow-lg"
                        >
                            <Plus size={16} /> Add Review
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredReviews.map((rev) => (
                            <div key={rev.id} className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-base font-bold text-white uppercase">{rev.clientName}</h3>
                                        <p className="text-xs text-white/50">{rev.designation} • {rev.company}</p>
                                    </div>
                                    <div className="flex items-center text-amber-400 gap-1">
                                        <Star size={14} fill="currentColor" />
                                        <span className="text-xs font-bold">{rev.rating}</span>
                                    </div>
                                </div>
                                <p className="text-xs text-white/70 italic leading-relaxed">"{rev.review}"</p>
                                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                                    <span className="text-[10px] text-white/40">{rev.projectName} • {rev.date}</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingReview(rev);
                                                setReviewForm({ clientName: rev.clientName, company: rev.company, designation: rev.designation || "CEO", rating: rev.rating, review: rev.review, projectName: rev.projectName, date: rev.date, clientPhoto: rev.clientPhoto || "", pinned: rev.pinned || false });
                                                setIsAddReviewModalOpen(true);
                                            }}
                                            className="p-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white"
                                            title="Edit"
                                        >
                                            <Edit3 size={14} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteReviewTarget(rev.id)}
                                            className="p-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                                            title="Delete"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SUBTAB 6: CLIENT BOOKINGS */}
            {activeSubTab === "bookings" && (
                <div className="space-y-6">
                    <h2 className="text-lg font-bold uppercase tracking-wider text-white">
                        Client Bookings &amp; Inquiries
                    </h2>

                    <div className="border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl overflow-hidden">
                        <table className="w-full text-left text-sm text-white">
                            <thead className="border-b border-white/10 bg-white/[0.03] text-[10px] font-bold uppercase tracking-widest text-white/60">
                                <tr>
                                    <th className="py-4 px-6">ID</th>
                                    <th className="py-4 px-6">Client Name</th>
                                    <th className="py-4 px-6">Project Title</th>
                                    <th className="py-4 px-6">Budget</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-xs">
                                {filteredBookings.map((bkg) => (
                                    <tr key={bkg.id} className="hover:bg-white/[0.02]">
                                        <td className="py-4 px-6 font-mono text-white/40">{bkg.id}</td>
                                        <td className="py-4 px-6 font-bold">{bkg.clientName}</td>
                                        <td className="py-4 px-6 text-white/80">{bkg.projectTitle}</td>
                                        <td className="py-4 px-6 font-mono text-white/60">{bkg.budget}</td>
                                        <td className="py-4 px-6">
                                            <select
                                                value={bkg.status}
                                                onChange={(e) => handleBookingStatus(bkg.id, e.target.value as any)}
                                                className="px-2 py-1 rounded-lg border border-white/20 bg-black text-[10px] font-bold uppercase text-white cursor-pointer"
                                            >
                                                <option value="New">New</option>
                                                <option value="Contacted">Contacted</option>
                                                <option value="In Discussion">In Discussion</option>
                                                <option value="Accepted">Accepted</option>
                                                <option value="Rejected">Rejected</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button
                                                onClick={() => setDeleteBookingTarget(bkg.id)}
                                                className="p-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* SUBTAB 7: HERO HEADER */}
            {activeSubTab === "hero" && (
                <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6 max-w-3xl">
                    <h2 className="text-lg font-bold uppercase text-white flex items-center gap-2">
                        <Type size={18} /> Freelancing Hero Header Content
                    </h2>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                                Main Title
                            </label>
                            <input
                                type="text"
                                value={heroForm.title}
                                onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                                placeholder="FREELANCE SERVICES"
                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black text-white text-sm focus:border-white/40 focus:outline-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                                Subtitle Description
                            </label>
                            <textarea
                                rows={3}
                                value={heroForm.subtitle}
                                onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                                placeholder="Helping startups and businesses build scalable AI, Web, Backend and Full-Stack solutions."
                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black text-white text-sm focus:border-white/40 focus:outline-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                                CTA Button Text
                            </label>
                            <input
                                type="text"
                                value={heroForm.buttonText}
                                onChange={(e) => setHeroForm({ ...heroForm, buttonText: e.target.value })}
                                placeholder="BOOK A PROJECT"
                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black text-white text-sm focus:border-white/40 focus:outline-none"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSaveHero}
                        className="px-6 py-3.5 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-all flex items-center gap-2 shadow-lg"
                    >
                        <Save size={16} /> Save Hero Content
                    </button>
                </div>
            )}

            {/* DEDICATED ADD / EDIT CLIENT PROJECT MODAL (REQUIREMENT 7) */}
            {isAddClientModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="w-full max-w-3xl bg-black border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 my-8 shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h2 className="text-xl font-bold uppercase tracking-tight text-white flex items-center gap-2">
                                <Briefcase size={20} />
                                {editingClientProject ? "Edit Client Project" : "ADD CLIENT PROJECT"}
                            </h2>
                            <button
                                onClick={() => setIsAddClientModalOpen(false)}
                                className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Images Upload */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70 block">
                                        Project Image
                                    </label>
                                    <div className="flex items-center gap-3">
                                        {clientForm.imageUrl ? (
                                            <div className="relative w-20 h-16 rounded-xl border border-white/10 overflow-hidden group">
                                                <img src={clientForm.imageUrl} alt="Project" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => setClientForm({ ...clientForm, imageUrl: "" })}
                                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 font-bold text-xs"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="w-20 h-16 rounded-xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center text-white/30">
                                                <ImageIcon size={20} />
                                            </div>
                                        )}
                                        <label className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase cursor-pointer flex items-center gap-2">
                                            <Upload size={14} /> Upload Image
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileRead(e, (base64) => setClientForm({ ...clientForm, imageUrl: base64 }))}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70 block">
                                        Client Logo (Optional)
                                    </label>
                                    <div className="flex items-center gap-3">
                                        {clientForm.clientLogo ? (
                                            <div className="relative w-20 h-16 rounded-xl border border-white/10 overflow-hidden group">
                                                <img src={clientForm.clientLogo} alt="Logo" className="w-full h-full object-contain p-1 bg-white/10" />
                                                <button
                                                    type="button"
                                                    onClick={() => setClientForm({ ...clientForm, clientLogo: "" })}
                                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 font-bold text-xs"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="w-20 h-16 rounded-xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center text-white/30">
                                                <Building size={20} />
                                            </div>
                                        )}
                                        <label className="px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase cursor-pointer flex items-center gap-2">
                                            <Upload size={14} /> Upload Logo
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleFileRead(e, (base64) => setClientForm({ ...clientForm, clientLogo: base64 }))}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                        Project Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={clientForm.projectName}
                                        onChange={(e) => setClientForm({ ...clientForm, projectName: e.target.value })}
                                        placeholder="e.g. Seenalam Foods"
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                        Client Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={clientForm.clientName}
                                        onChange={(e) => setClientForm({ ...clientForm, clientName: e.target.value })}
                                        placeholder="e.g. Apex Global Inc."
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                        Industry
                                    </label>
                                    <input
                                        type="text"
                                        value={clientForm.industry}
                                        onChange={(e) => setClientForm({ ...clientForm, industry: e.target.value })}
                                        placeholder="e.g. Food & Agriculture"
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        value={clientForm.category}
                                        onChange={(e) => setClientForm({ ...clientForm, category: e.target.value })}
                                        placeholder="e.g. Food Ordering Platform"
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                    Project Description *
                                </label>
                                <textarea
                                    value={clientForm.description}
                                    onChange={(e) => setClientForm({ ...clientForm, description: e.target.value })}
                                    rows={3}
                                    placeholder="Summary of client work..."
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                        Tech Stack (Comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={clientForm.technologiesStr}
                                        onChange={(e) => setClientForm({ ...clientForm, technologiesStr: e.target.value })}
                                        placeholder="e.g. React, Node.js, PostgreSQL"
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                        Website URL
                                    </label>
                                    <input
                                        type="url"
                                        value={clientForm.websiteUrl}
                                        onChange={(e) => setClientForm({ ...clientForm, websiteUrl: e.target.value })}
                                        placeholder="https://client-site.com"
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                        Completion Date
                                    </label>
                                    <input
                                        type="text"
                                        value={clientForm.completionDate}
                                        onChange={(e) => setClientForm({ ...clientForm, completionDate: e.target.value })}
                                        placeholder="e.g. 2024"
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                        Status
                                    </label>
                                    <select
                                        value={clientForm.status}
                                        onChange={(e) => setClientForm({ ...clientForm, status: e.target.value as any })}
                                        className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                    >
                                        <option value="Planning">Planning</option>
                                        <option value="Development">Development</option>
                                        <option value="Testing">Testing</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wider text-white">
                                    <input
                                        type="checkbox"
                                        checked={clientForm.featured}
                                        onChange={(e) => setClientForm({ ...clientForm, featured: e.target.checked })}
                                        className="w-4 h-4 rounded bg-white/10 border-white/20 text-white"
                                    />
                                    Featured Client Project
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wider text-white">
                                    <input
                                        type="checkbox"
                                        checked={clientForm.published}
                                        onChange={(e) => setClientForm({ ...clientForm, published: e.target.checked })}
                                        className="w-4 h-4 rounded bg-white/10 border-white/20 text-white"
                                    />
                                    Published / Visible
                                </label>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddClientModalOpen(false)}
                                    className="px-5 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSaveClientForm}
                                    className="px-6 py-3 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 shadow-lg flex items-center gap-2"
                                >
                                    <Check size={16} />
                                    Save Client Project
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE CLIENT PROJECT MODAL */}
            {deleteClientTarget && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-black border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center">
                        <div className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold uppercase text-white">Delete Client Project</h3>
                            <p className="text-xs text-white/50 mt-2">Are you sure? This will remove this client project permanently from Freelancing.</p>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => setDeleteClientTarget(null)}
                                className="px-5 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase text-white/70"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteClientProject}
                                className="px-6 py-3 rounded-xl bg-red-500 text-white text-xs font-bold uppercase"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE ONGOING MODAL */}
            {deleteOngoingTarget && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-black border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center">
                        <div className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold uppercase text-white">Delete Ongoing Task</h3>
                            <p className="text-xs text-white/50 mt-2">Are you sure you want to remove this ongoing project task?</p>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <button onClick={() => setDeleteOngoingTarget(null)} className="px-5 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase text-white/70">Cancel</button>
                            <button onClick={confirmDeleteOngoing} className="px-6 py-3 rounded-xl bg-red-500 text-white text-xs font-bold uppercase">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE COMPLETED MODAL */}
            {deleteCompletedTarget && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-black border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center">
                        <div className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold uppercase text-white">Delete Completed Project</h3>
                            <p className="text-xs text-white/50 mt-2">Are you sure you want to delete this completed project?</p>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <button onClick={() => setDeleteCompletedTarget(null)} className="px-5 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase text-white/70">Cancel</button>
                            <button onClick={confirmDeleteCompleted} className="px-6 py-3 rounded-xl bg-red-500 text-white text-xs font-bold uppercase">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ADD / EDIT ONGOING PROJECT MODAL */}
            {isAddOngoingModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="w-full max-w-xl bg-black border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h2 className="text-xl font-bold uppercase text-white">
                                {editingOngoing ? "Edit Ongoing Task" : "Add Ongoing Task"}
                            </h2>
                            <button onClick={() => setIsAddOngoingModalOpen(false)} className="p-2 rounded-full text-white/60 hover:text-white"><X size={20} /></button>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={ongoingForm.projectName}
                                onChange={(e) => setOngoingForm({ ...ongoingForm, projectName: e.target.value })}
                                placeholder="Project Name *"
                                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    value={ongoingForm.clientName}
                                    onChange={(e) => setOngoingForm({ ...ongoingForm, clientName: e.target.value })}
                                    placeholder="Client Name"
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none"
                                />
                                <select
                                    value={ongoingForm.status}
                                    onChange={(e) => setOngoingForm({ ...ongoingForm, status: e.target.value as any })}
                                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-sm text-white focus:outline-none"
                                >
                                    <option value="Planning">Planning</option>
                                    <option value="Development">Development</option>
                                    <option value="Testing">Testing</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                            <textarea
                                value={ongoingForm.description}
                                onChange={(e) => setOngoingForm({ ...ongoingForm, description: e.target.value })}
                                placeholder="Task description..."
                                rows={3}
                                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none"
                            />
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                                <button type="button" onClick={() => setIsAddOngoingModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-white/10 text-xs text-white/60">Cancel</button>
                                <button type="button" onClick={handleSaveOngoingForm} className="px-6 py-2.5 rounded-xl bg-white text-black text-xs font-bold uppercase">Save Task</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ADD / EDIT COMPLETED PROJECT MODAL */}
            {isAddCompletedModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="w-full max-w-xl bg-black border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h2 className="text-xl font-bold uppercase text-white">
                                {editingCompleted ? "Edit Completed Project" : "Add Completed Project"}
                            </h2>
                            <button onClick={() => setIsAddCompletedModalOpen(false)} className="p-2 rounded-full text-white/60 hover:text-white"><X size={20} /></button>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={completedForm.title}
                                onChange={(e) => setCompletedForm({ ...completedForm, title: e.target.value })}
                                placeholder="Project Title *"
                                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none"
                            />
                            <input
                                type="text"
                                value={completedForm.category}
                                onChange={(e) => setCompletedForm({ ...completedForm, category: e.target.value })}
                                placeholder="Category"
                                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none"
                            />
                            <textarea
                                value={completedForm.description}
                                onChange={(e) => setCompletedForm({ ...completedForm, description: e.target.value })}
                                placeholder="Project description..."
                                rows={3}
                                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none"
                            />
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                                <button type="button" onClick={() => setIsAddCompletedModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-white/10 text-xs text-white/60">Cancel</button>
                                <button type="button" onClick={handleSaveCompletedForm} className="px-6 py-2.5 rounded-xl bg-white text-black text-xs font-bold uppercase">Save Project</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ADD / EDIT REVIEW MODAL */}
            {isAddReviewModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="w-full max-w-xl bg-black border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h2 className="text-xl font-bold uppercase text-white">
                                {editingReview ? "Edit Client Review" : "Add Client Review"}
                            </h2>
                            <button onClick={() => setIsAddReviewModalOpen(false)} className="p-2 rounded-full text-white/60 hover:text-white"><X size={20} /></button>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    value={reviewForm.clientName}
                                    onChange={(e) => setReviewForm({ ...reviewForm, clientName: e.target.value })}
                                    placeholder="Client Name *"
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none"
                                />
                                <input
                                    type="text"
                                    value={reviewForm.company}
                                    onChange={(e) => setReviewForm({ ...reviewForm, company: e.target.value })}
                                    placeholder="Company Name"
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none"
                                />
                            </div>
                            <textarea
                                value={reviewForm.review}
                                onChange={(e) => setReviewForm({ ...reviewForm, review: e.target.value })}
                                placeholder="Review content..."
                                rows={3}
                                className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none"
                            />
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                                <button type="button" onClick={() => setIsAddReviewModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-white/10 text-xs text-white/60">Cancel</button>
                                <button type="button" onClick={handleSaveReviewForm} className="px-6 py-2.5 rounded-xl bg-white text-black text-xs font-bold uppercase">Save Review</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE BOOKING MODAL */}
            {deleteBookingTarget && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-black border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center">
                        <div className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold uppercase text-white">Delete Booking Request</h3>
                            <p className="text-xs text-white/50 mt-2">Are you sure you want to delete this client booking request?</p>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <button onClick={() => setDeleteBookingTarget(null)} className="px-5 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase text-white/70">Cancel</button>
                            <button onClick={confirmDeleteBooking} className="px-6 py-3 rounded-xl bg-red-500 text-white text-xs font-bold uppercase">Delete</button>
                        </div>
                    </div>
                </div>
            )}

            {/* DELETE REVIEW MODAL */}
            {deleteReviewTarget && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-black border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center">
                        <div className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold uppercase text-white">Delete Review</h3>
                            <p className="text-xs text-white/50 mt-2">Are you sure you want to delete this review?</p>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <button onClick={() => setDeleteReviewTarget(null)} className="px-5 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase text-white/70">Cancel</button>
                            <button onClick={confirmDeleteReview} className="px-6 py-3 rounded-xl bg-red-500 text-white text-xs font-bold uppercase">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
