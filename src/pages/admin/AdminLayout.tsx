import { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import { LayoutDashboard, FolderKanban, Image as ImageIcon, Megaphone, Briefcase, ExternalLink, LogOut, Menu, X } from "lucide-react";
import logoImg from "../../assets/logo.png";

interface AdminLayoutProps {
    children: ReactNode;
    activeTab: "overview" | "projects" | "hero" | "announcement" | "freelancing";
    setActiveTab: (tab: "overview" | "projects" | "hero" | "announcement" | "freelancing") => void;
}

export default function AdminLayout({ children, activeTab, setActiveTab }: AdminLayoutProps) {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: "overview", label: "Dashboard", icon: LayoutDashboard },
        { id: "projects", label: "Project Management", icon: FolderKanban },
        { id: "hero", label: "Hero Manager", icon: ImageIcon },
        { id: "announcement", label: "Announcement Bar", icon: Megaphone },
        { id: "freelancing", label: "Freelancing Manager", icon: Briefcase },
    ] as const;

    const handleLogout = () => {
        logout();
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-[#030712] text-white flex flex-col md:flex-row selection:bg-white selection:text-black">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl p-6 justify-between flex-shrink-0 min-h-screen sticky top-0 h-screen">
                <div className="space-y-8">
                    {/* Brand */}
                    <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                        <img src={logoImg} alt="Logo" className="h-8 w-auto object-contain" />
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Admin Console</h2>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">Portfolio 2.0</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeTab === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                                        isActive
                                            ? "bg-white text-black shadow-lg"
                                            : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                                    }`}
                                >
                                    <Icon size={18} />
                                    <span>{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Footer Controls */}
                <div className="space-y-3 pt-6 border-t border-white/10">
                    <a
                        href="#/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/[0.06] transition-all"
                    >
                        <span className="flex items-center gap-2">
                            <ExternalLink size={16} />
                            View Site
                        </span>
                    </a>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-40">
                <div className="flex items-center gap-3">
                    <img src={logoImg} alt="Logo" className="h-7 w-auto object-contain" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Admin Console</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-white/80 hover:text-white focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Mobile Navigation Drawer */}
            {isMobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-6"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <span className="text-xs font-bold uppercase tracking-widest text-white/60">Navigation</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white/60 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveTab(item.id);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                                            isActive
                                                ? "bg-white text-black shadow-lg"
                                                : "text-white/70 hover:text-white hover:bg-white/[0.05]"
                                        }`}
                                    >
                                        <Icon size={20} />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="space-y-3 pt-6 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                        <a
                            href="#/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-white/80"
                        >
                            <span className="flex items-center gap-2">
                                <ExternalLink size={18} />
                                View Portfolio Site
                            </span>
                        </a>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-red-500/20 bg-red-500/10 text-xs font-bold uppercase tracking-wider text-red-400"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-7xl mx-auto w-full overflow-x-hidden">
                {children}
            </main>
        </div>
    );
}
