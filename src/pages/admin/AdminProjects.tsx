import { useState, FormEvent, ChangeEvent } from "react";
import { Plus, Edit2, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, X, AlertTriangle, Check, Upload, Image as ImageIcon, Star } from "lucide-react";
import { portfolioStore, Project } from "../../services/portfolioStore";

export default function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>(() => portfolioStore.getProjects());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [imageError, setImageError] = useState("");

    // Form state - Personal Portfolio Project ONLY
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        year: new Date().getFullYear().toString(),
        description: "",
        link: "",
        liveUrl: "",
        published: true,
        featured: true,
        thumbnailUrl: "",
        bannerUrl: "",
        technologiesStr: "React, Node.js"
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    const refreshProjects = () => {
        setProjects(portfolioStore.getProjects());
    };

    const validateUrl = (url: string): boolean => {
        if (!url.trim()) return false;
        try {
            const parsed = new URL(url);
            return parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch {
            return false;
        }
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, targetField: "thumbnailUrl" | "bannerUrl") => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageError("");

        const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];
        if (!allowedTypes.includes(file.type.toLowerCase())) {
            setImageError("Unsupported image type. Use PNG, JPG, JPEG, WEBP, or SVG.");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setImageError("Image file size exceeds 10MB limit.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (evt) => {
            if (evt.target?.result) {
                setFormData((prev) => ({ ...prev, [targetField]: evt.target?.result as string }));
            }
        };
        reader.onerror = () => setImageError("Failed to read image file.");
        reader.readAsDataURL(file);
    };

    const handleOpenAddModal = () => {
        setEditingProject(null);
        setImageError("");
        setFormData({
            title: "",
            category: "",
            year: new Date().getFullYear().toString(),
            description: "",
            link: "",
            liveUrl: "",
            published: true,
            featured: true,
            thumbnailUrl: "",
            bannerUrl: "",
            technologiesStr: "React, Node.js"
        });
        setFormErrors({});
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (project: Project) => {
        setEditingProject(project);
        setImageError("");
        setFormData({
            title: project.title,
            category: project.category,
            year: project.year,
            description: project.description,
            link: project.link,
            liveUrl: project.liveUrl || "",
            published: project.published,
            featured: project.featured,
            thumbnailUrl: project.thumbnailUrl || "",
            bannerUrl: project.bannerUrl || "",
            technologiesStr: project.technologies ? project.technologies.join(", ") : "React, Node.js"
        });
        setFormErrors({});
        setIsModalOpen(true);
    };

    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault();
        const errors: Record<string, string> = {};

        if (!formData.title.trim()) errors.title = "Project title is required.";
        if (!formData.category.trim()) errors.category = "Category is required.";
        if (!formData.year.trim()) errors.year = "Year is required.";
        if (!formData.description.trim()) errors.description = "Description is required.";

        if (!formData.link.trim()) {
            errors.link = "Repository / Project Link is required.";
        } else if (!validateUrl(formData.link)) {
            errors.link = "Please enter a valid HTTP/HTTPS URL.";
        }

        if (formData.liveUrl && !validateUrl(formData.liveUrl)) {
            errors.liveUrl = "Please enter a valid HTTP/HTTPS URL.";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const techArray = formData.technologiesStr.split(",").map((t) => t.trim()).filter(Boolean);

        const projectPayload = {
            title: formData.title,
            category: formData.category,
            year: formData.year,
            description: formData.description,
            link: formData.link,
            liveUrl: formData.liveUrl,
            published: formData.published,
            featured: formData.featured,
            thumbnailUrl: formData.thumbnailUrl,
            bannerUrl: formData.bannerUrl,
            technologies: techArray
        };

        if (editingProject) {
            portfolioStore.updateProject(editingProject.id, projectPayload);
        } else {
            portfolioStore.addProject(projectPayload);
        }

        refreshProjects();
        setIsModalOpen(false);
    };

    const handleDeleteProject = (id: string) => {
        portfolioStore.deleteProject(id);
        refreshProjects();
        setDeleteConfirmId(null);
    };

    const handleTogglePublish = (id: string) => {
        portfolioStore.togglePublish(id);
        refreshProjects();
    };

    const handleToggleFeatured = (id: string) => {
        portfolioStore.toggleFeatured(id);
        refreshProjects();
    };

    const handleMoveUp = (id: string) => {
        portfolioStore.moveProjectUp(id);
        refreshProjects();
    };

    const handleMoveDown = (id: string) => {
        portfolioStore.moveProjectDown(id);
        refreshProjects();
    };

    return (
        <div className="space-y-8">
            {/* Header & Add Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-tighter text-white">
                        Project Management
                    </h1>
                    <p className="text-xs uppercase tracking-widest text-white/40 mt-1">
                        Personal Portfolio Projects Only (TripO, 7DESK, FILE.DROP, ClassMates+, GENZ ART)
                    </p>
                </div>

                <button
                    onClick={handleOpenAddModal}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all shadow-lg self-start sm:self-auto"
                >
                    <Plus size={18} /> Add Personal Project
                </button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block border border-white/10 rounded-2xl bg-black/40 backdrop-blur-xl overflow-hidden shadow-2xl">
                <table className="w-full text-left text-sm text-white">
                    <thead className="border-b border-white/10 bg-white/[0.03] text-[10px] font-bold uppercase tracking-widest text-white/60">
                        <tr>
                            <th className="py-4 px-6">Order</th>
                            <th className="py-4 px-6">Thumbnail</th>
                            <th className="py-4 px-6">Project Title</th>
                            <th className="py-4 px-6">Category</th>
                            <th className="py-4 px-6">Year</th>
                            <th className="py-4 px-6">Visibility</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs">
                        {projects.map((project, index) => (
                            <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                                <td className="py-4 px-6 font-mono text-white/40">
                                    <div className="flex items-center gap-2">
                                        <div className="flex flex-col gap-1">
                                            <button
                                                onClick={() => handleMoveUp(project.id)}
                                                disabled={index === 0}
                                                className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                                                title="Move Up"
                                            >
                                                <ArrowUp size={12} />
                                            </button>
                                            <button
                                                onClick={() => handleMoveDown(project.id)}
                                                disabled={index === projects.length - 1}
                                                className="p-1 rounded hover:bg-white/10 text-white/60 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
                                                title="Move Down"
                                            >
                                                <ArrowDown size={12} />
                                            </button>
                                        </div>
                                        <span>#{index + 1}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    {project.thumbnailUrl ? (
                                        <img src={project.thumbnailUrl} alt={project.title} className="w-12 h-10 object-cover rounded-lg border border-white/10" />
                                    ) : (
                                        <div className="w-12 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/30">
                                            <ImageIcon size={16} />
                                        </div>
                                    )}
                                </td>
                                <td className="py-4 px-6 font-bold uppercase tracking-tight text-white">
                                    {project.title}
                                </td>
                                <td className="py-4 px-6 text-white/60 uppercase tracking-widest text-[11px]">
                                    {project.category}
                                </td>
                                <td className="py-4 px-6 text-white/40 font-mono">
                                    {project.year}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleTogglePublish(project.id)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                                                project.published
                                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                    : "bg-white/5 text-white/40 border border-white/10"
                                            }`}
                                        >
                                            {project.published ? (
                                                <>
                                                    <Eye size={12} /> Published
                                                </>
                                            ) : (
                                                <>
                                                    <EyeOff size={12} /> Draft
                                                </>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => handleToggleFeatured(project.id)}
                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                                                project.featured
                                                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                    : "bg-white/5 text-white/40 border-white/10"
                                            }`}
                                        >
                                            <Star size={10} /> {project.featured ? "Featured" : "Standard"}
                                        </button>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => handleOpenEditModal(project)}
                                            className="p-2 rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white transition-colors"
                                            title="Edit Project"
                                        >
                                            <Edit2 size={14} />
                                        </button>
                                        <button
                                            onClick={() => setDeleteConfirmId(project.id)}
                                            className="p-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
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

            {/* Mobile & Tablet Card List View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-4">
                {projects.map((project, index) => (
                    <div key={project.id} className="p-5 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-white/40">#{index + 1}</span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleTogglePublish(project.id)}
                                    className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                                        project.published ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-white/5 text-white/40 border-white/10"
                                    }`}
                                >
                                    {project.published ? "Published" : "Draft"}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {project.thumbnailUrl ? (
                                <img src={project.thumbnailUrl} alt={project.title} className="w-14 h-12 object-cover rounded-xl border border-white/10" />
                            ) : (
                                <div className="w-14 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-white/30">
                                    <ImageIcon size={18} />
                                </div>
                            )}
                            <div>
                                <h3 className="text-base font-bold uppercase text-white tracking-tight">{project.title}</h3>
                                <p className="text-xs text-white/50">{project.category} • {project.year}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                            <button
                                onClick={() => handleMoveUp(project.id)}
                                disabled={index === 0}
                                className="px-2 py-1 rounded border border-white/10 text-white text-xs disabled:opacity-20"
                            >
                                Up
                            </button>
                            <button
                                onClick={() => handleMoveDown(project.id)}
                                disabled={index === projects.length - 1}
                                className="px-2 py-1 rounded border border-white/10 text-white text-xs disabled:opacity-20"
                            >
                                Down
                            </button>
                            <button
                                onClick={() => handleOpenEditModal(project)}
                                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white text-xs font-bold uppercase"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => setDeleteConfirmId(project.id)}
                                className="px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-bold uppercase"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Add / Edit Personal Project */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="w-full max-w-2xl bg-black border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 my-8 shadow-2xl relative">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <h2 className="text-xl font-bold uppercase tracking-tight text-white">
                                {editingProject ? "Edit Personal Project" : "Add Personal Project"}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {imageError && (
                            <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs">
                                {imageError}
                            </div>
                        )}

                        <form onSubmit={handleSubmitForm} className="space-y-4">
                            {/* Image Upload Area */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70 block">
                                        Thumbnail Image (PNG, JPG, WEBP, SVG)
                                    </label>
                                    <div className="flex items-center gap-3">
                                        {formData.thumbnailUrl ? (
                                            <div className="relative w-20 h-16 rounded-xl border border-white/10 overflow-hidden group">
                                                <img src={formData.thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, thumbnailUrl: "" })}
                                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 font-bold text-xs transition-all"
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
                                                onChange={(e) => handleImageUpload(e, "thumbnailUrl")}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70 block">
                                        Banner Image (Optional)
                                    </label>
                                    <div className="flex items-center gap-3">
                                        {formData.bannerUrl ? (
                                            <div className="relative w-20 h-16 rounded-xl border border-white/10 overflow-hidden group">
                                                <img src={formData.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, bannerUrl: "" })}
                                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 font-bold text-xs transition-all"
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
                                            <Upload size={14} /> Upload Banner
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, "bannerUrl")}
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
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. 7DESK"
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                    />
                                    {formErrors.title && <p className="text-[11px] text-red-400">{formErrors.title}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                        Category *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="e.g. Web App"
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                    />
                                    {formErrors.category && <p className="text-[11px] text-red-400">{formErrors.category}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                        Year *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        placeholder="e.g. 2026"
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                    />
                                    {formErrors.year && <p className="text-[11px] text-red-400">{formErrors.year}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                        Technologies (Comma separated)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.technologiesStr}
                                        onChange={(e) => setFormData({ ...formData, technologiesStr: e.target.value })}
                                        placeholder="e.g. React, TypeScript, Node.js"
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                    Description *
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    placeholder="Enter project summary..."
                                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                />
                                {formErrors.description && <p className="text-[11px] text-red-400">{formErrors.description}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                        GitHub URL *
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        placeholder="https://github.com/..."
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                    />
                                    {formErrors.link && <p className="text-[11px] text-red-400">{formErrors.link}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/70">
                                        Live Demo URL (Optional)
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.liveUrl}
                                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                        placeholder="https://live-app.com"
                                        className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-6 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wider text-white">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-4 h-4 rounded bg-white/10 border-white/20 text-white"
                                    />
                                    Featured Project
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer text-xs uppercase tracking-wider text-white">
                                    <input
                                        type="checkbox"
                                        checked={formData.published}
                                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                        className="w-4 h-4 rounded bg-white/10 border-white/20 text-white"
                                    />
                                    Published / Visible
                                </label>
                            </div>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-5 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 shadow-lg flex items-center gap-2"
                                >
                                    <Check size={16} />
                                    {editingProject ? "Save Changes" : "Create Project"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirmId && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="w-full max-w-md bg-black border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center">
                        <div className="w-12 h-12 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
                            <AlertTriangle size={24} />
                        </div>

                        <div>
                            <h3 className="text-xl font-bold uppercase tracking-tight text-white">
                                Confirm Personal Project Deletion
                            </h3>
                            <p className="text-xs text-white/50 mt-2 leading-relaxed">
                                Are you sure you want to delete this personal project? This will remove it permanently from Portfolio Projects.
                            </p>
                        </div>

                        <div className="flex items-center justify-center gap-3 pt-2">
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-5 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-wider text-white/70 hover:text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDeleteProject(deleteConfirmId)}
                                className="px-6 py-3 rounded-xl bg-red-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-600 shadow-lg"
                            >
                                Delete Project
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
