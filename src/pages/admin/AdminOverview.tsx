import { FolderKanban, CheckCircle2, Image as ImageIcon, Megaphone, Briefcase, ArrowUpRight } from "lucide-react";
import { portfolioStore } from "../../services/portfolioStore";

interface AdminOverviewProps {
    onNavigate: (tab: "projects" | "hero" | "announcement" | "freelancing") => void;
}

export default function AdminOverview({ onNavigate }: AdminOverviewProps) {
    const projects = portfolioStore.getProjects();
    const publishedCount = projects.filter((p) => p.published).length;
    const announcement = portfolioStore.getAnnouncement();
    const bookings = portfolioStore.getBookings();

    const stats = [
        {
            title: "Total Projects",
            value: projects.length,
            description: "All portfolio works registered",
            icon: FolderKanban,
            color: "text-blue-400",
            bg: "bg-blue-500/10 border-blue-500/20"
        },
        {
            title: "Published Projects",
            value: publishedCount,
            description: "Visible on live portfolio site",
            icon: CheckCircle2,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10 border-emerald-500/20"
        },
        {
            title: "Client Bookings",
            value: `${bookings.length} Total`,
            description: `${bookings.filter(b => b.status === "New").length} New Request(s)`,
            icon: Briefcase,
            color: "text-purple-400",
            bg: "bg-purple-500/10 border-purple-500/20"
        },
        {
            title: "Announcement Status",
            value: announcement.enabled ? "Active (ON)" : "Hidden (OFF)",
            description: announcement.enabled ? announcement.text : "Banner display disabled",
            icon: Megaphone,
            color: announcement.enabled ? "text-emerald-400" : "text-gray-400",
            bg: announcement.enabled ? "bg-emerald-500/10 border-emerald-500/20" : "bg-white/[0.03] border-white/10"
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold uppercase tracking-tighter text-white">
                    Dashboard Overview
                </h1>
                <p className="text-xs uppercase tracking-widest text-white/40 mt-1">
                    Portfolio Status &amp; Real-time Metrics
                </p>
            </div>

            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={i}
                            className={`p-6 rounded-2xl border backdrop-blur-xl bg-black/40 ${stat.bg} flex flex-col justify-between space-y-4`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                                    {stat.title}
                                </span>
                                <div className={`p-2.5 rounded-xl border border-white/10 bg-black/40 ${stat.color}`}>
                                    <Icon size={20} />
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white truncate">
                                    {stat.value}
                                </div>
                                <div className="text-[11px] text-white/50 mt-1 truncate">
                                    {stat.description}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions / Shortcuts Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col justify-between space-y-6">
                    <div>
                        <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white mb-3">
                            <FolderKanban size={20} />
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                            Project Manager
                        </h3>
                        <p className="text-xs text-white/50 leading-relaxed mt-1">
                            Add, edit, reorder, or update project details.
                        </p>
                    </div>
                    <button
                        onClick={() => onNavigate("projects")}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-white/80 transition-colors pt-2"
                    >
                        Manage Projects <ArrowUpRight size={14} />
                    </button>
                </div>

                <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col justify-between space-y-6">
                    <div>
                        <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white mb-3">
                            <ImageIcon size={20} />
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                            Hero Manager
                        </h3>
                        <p className="text-xs text-white/50 leading-relaxed mt-1">
                            Hero transforms, scale, text &amp; live preview.
                        </p>
                    </div>
                    <button
                        onClick={() => onNavigate("hero")}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-white/80 transition-colors pt-2"
                    >
                        Manage Hero <ArrowUpRight size={14} />
                    </button>
                </div>

                <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col justify-between space-y-6">
                    <div>
                        <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white mb-3">
                            <Megaphone size={20} />
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                            Announcement Bar
                        </h3>
                        <p className="text-xs text-white/50 leading-relaxed mt-1">
                            Toggle banner, custom link &amp; theme colors.
                        </p>
                    </div>
                    <button
                        onClick={() => onNavigate("announcement")}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-white/80 transition-colors pt-2"
                    >
                        Manage Announcement <ArrowUpRight size={14} />
                    </button>
                </div>

                <div className="p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl flex flex-col justify-between space-y-6">
                    <div>
                        <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-white mb-3">
                            <Briefcase size={20} />
                        </div>
                        <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                            Freelancing Manager
                        </h3>
                        <p className="text-xs text-white/50 leading-relaxed mt-1">
                            Ongoing &amp; completed work, reviews &amp; bookings.
                        </p>
                    </div>
                    <button
                        onClick={() => onNavigate("freelancing")}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-white/80 transition-colors pt-2"
                    >
                        Manage Freelancing <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
