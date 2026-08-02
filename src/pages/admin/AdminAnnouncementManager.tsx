import { useState } from "react";
import { Megaphone, Save, RotateCcw, Check, ShieldAlert, Palette, Link as LinkIcon, Type } from "lucide-react";
import {
    portfolioStore, AnnouncementSettings, AnnouncementSectionKey, DEFAULT_SECTION_ANNOUNCEMENTS
} from "../../services/portfolioStore";

const SECTIONS: { key: AnnouncementSectionKey; label: string; description: string }[] = [
    { key: "hero", label: "Hero Announcement", description: "Displays banner directly below the Hero section" },
    { key: "about", label: "About Announcement", description: "Displays banner directly below the About section" },
    { key: "projects", label: "Projects Announcement", description: "Displays banner directly below the Projects section" },
    { key: "connect", label: "Connect Announcement", description: "Displays banner directly below the Contact section" },
];

export default function AdminAnnouncementManager() {
    const [activeSection, setActiveSection] = useState<AnnouncementSectionKey>("hero");

    const [announcements, setAnnouncements] = useState<Record<AnnouncementSectionKey, AnnouncementSettings>>(() => ({
        hero: portfolioStore.getSectionAnnouncement("hero"),
        about: portfolioStore.getSectionAnnouncement("about"),
        projects: portfolioStore.getSectionAnnouncement("projects"),
        connect: portfolioStore.getSectionAnnouncement("connect"),
    }));

    const [error, setError] = useState<string>("");
    const [successMsg, setSuccessMsg] = useState<string>("");

    const currentAnnouncement = announcements[activeSection];

    const handleChange = <K extends keyof AnnouncementSettings>(key: K, value: AnnouncementSettings[K]) => {
        setAnnouncements((prev) => ({
            ...prev,
            [activeSection]: {
                ...prev[activeSection],
                [key]: value
            }
        }));
    };

    const handleSaveAnnouncement = () => {
        portfolioStore.saveSectionAnnouncement(activeSection, currentAnnouncement);
        setError("");
        const sectionName = SECTIONS.find((s) => s.key === activeSection)?.label || "Section";
        setSuccessMsg(`${sectionName} saved successfully! Changes are live on your portfolio.`);
    };

    const handleResetAnnouncement = () => {
        portfolioStore.resetSectionAnnouncement(activeSection);
        const defaultVal = DEFAULT_SECTION_ANNOUNCEMENTS[activeSection];
        setAnnouncements((prev) => ({
            ...prev,
            [activeSection]: defaultVal
        }));
        setError("");
        const sectionName = SECTIONS.find((s) => s.key === activeSection)?.label || "Section";
        setSuccessMsg(`${sectionName} reset to default settings.`);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold uppercase tracking-tighter text-white">
                    Announcement Bar Manager
                </h1>
                <p className="text-xs uppercase tracking-widest text-white/40 mt-1">
                    Manage independent banner announcements for Hero, About, Projects, and Connect sections
                </p>
            </div>

            {/* Section Selection Tabs */}
            <div className="flex flex-wrap gap-3 border-b border-white/10 pb-4">
                {SECTIONS.map((sec) => {
                    const isSelected = activeSection === sec.key;
                    const isEnabled = announcements[sec.key].enabled;
                    return (
                        <button
                            key={sec.key}
                            onClick={() => {
                                setActiveSection(sec.key);
                                setSuccessMsg("");
                                setError("");
                            }}
                            className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                                isSelected
                                    ? "bg-white text-black border-white shadow-lg"
                                    : "bg-black/40 text-white/70 border-white/10 hover:border-white/20 hover:text-white"
                            }`}
                        >
                            <Megaphone size={14} />
                            <span>{sec.label}</span>
                            <span className={`w-2 h-2 rounded-full ${isEnabled ? "bg-emerald-500" : "bg-white/20"}`} />
                        </button>
                    );
                })}
            </div>

            {/* Notifications */}
            {error && (
                <div className="p-4 rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs flex items-center gap-3">
                    <ShieldAlert size={18} className="flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {successMsg && (
                <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-3">
                    <Check size={18} className="flex-shrink-0" />
                    <span>{successMsg}</span>
                </div>
            )}

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Control Form (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                    {/* Toggle Card */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-white">
                                    <Megaphone size={20} />
                                </div>
                                <div>
                                    <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                                        Enable {SECTIONS.find((s) => s.key === activeSection)?.label}
                                    </h2>
                                    <p className="text-xs text-white/40">
                                        {SECTIONS.find((s) => s.key === activeSection)?.description}
                                    </p>
                                </div>
                            </div>

                            {/* ON/OFF Switch */}
                            <button
                                type="button"
                                onClick={() => handleChange("enabled", !currentAnnouncement.enabled)}
                                className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                    currentAnnouncement.enabled ? "bg-emerald-500" : "bg-white/20"
                                }`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        currentAnnouncement.enabled ? "translate-x-7" : "translate-x-0"
                                    }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Announcement Content Card */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
                        <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                            <Type size={18} className="text-white/60" />
                            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                                Announcement Content &amp; Details
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {/* Announcement Text */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                                    Announcement Text
                                </label>
                                <input
                                    type="text"
                                    value={currentAnnouncement.text}
                                    onChange={(e) => handleChange("text", e.target.value)}
                                    placeholder="e.g. Special section update or notification"
                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm focus:outline-none focus:border-white/40 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Button Text */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                                        Button Text
                                    </label>
                                    <input
                                        type="text"
                                        value={currentAnnouncement.buttonText}
                                        onChange={(e) => handleChange("buttonText", e.target.value)}
                                        placeholder="e.g. Learn More"
                                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm focus:outline-none focus:border-white/40 transition-all"
                                    />
                                </div>

                                {/* Optional Link */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-white/70 flex items-center gap-1">
                                        <LinkIcon size={12} /> Optional Link
                                    </label>
                                    <input
                                        type="text"
                                        value={currentAnnouncement.link}
                                        onChange={(e) => handleChange("link", e.target.value)}
                                        placeholder="e.g. #projects or /freelancing"
                                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm focus:outline-none focus:border-white/40 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Color Styling Card */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
                        <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                            <Palette size={18} className="text-white/60" />
                            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                                Color Customization
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Background Color Picker */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                                    Background Color
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={currentAnnouncement.bgColor}
                                        onChange={(e) => handleChange("bgColor", e.target.value)}
                                        className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border border-white/20 p-1"
                                    />
                                    <input
                                        type="text"
                                        value={currentAnnouncement.bgColor}
                                        onChange={(e) => handleChange("bgColor", e.target.value)}
                                        placeholder="#000000"
                                        className="flex-1 px-3 py-2 rounded-xl border border-white/10 bg-black/50 text-white text-xs font-mono focus:outline-none focus:border-white/40"
                                    />
                                </div>
                            </div>

                            {/* Text Color Picker */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                                    Text Color
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={currentAnnouncement.textColor}
                                        onChange={(e) => handleChange("textColor", e.target.value)}
                                        className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border border-white/20 p-1"
                                    />
                                    <input
                                        type="text"
                                        value={currentAnnouncement.textColor}
                                        onChange={(e) => handleChange("textColor", e.target.value)}
                                        placeholder="#ffffff"
                                        className="flex-1 px-3 py-2 rounded-xl border border-white/10 bg-black/50 text-white text-xs font-mono focus:outline-none focus:border-white/40"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Presets */}
                        <div className="space-y-2 pt-2 border-t border-white/5">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                                Theme Presets
                            </span>
                            <div className="flex flex-wrap items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleChange("bgColor", "#000000");
                                        handleChange("textColor", "#ffffff");
                                    }}
                                    className="px-3 py-1.5 rounded-lg border border-white/20 bg-black text-white text-xs font-medium hover:scale-105 transition-transform"
                                >
                                    Dark Minimal
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleChange("bgColor", "#0a0a0a");
                                        handleChange("textColor", "#e5e5e5");
                                    }}
                                    className="px-3 py-1.5 rounded-lg border border-white/10 bg-[#0a0a0a] text-[#e5e5e5] text-xs font-medium hover:scale-105 transition-transform"
                                >
                                    Matte Black
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleChange("bgColor", "#ffffff");
                                        handleChange("textColor", "#000000");
                                    }}
                                    className="px-3 py-1.5 rounded-lg border border-white/40 bg-white text-black text-xs font-medium hover:scale-105 transition-transform"
                                >
                                    Monochrome Light
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Actions: Save & Reset */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                            onClick={handleSaveAnnouncement}
                            className="flex-1 py-3 px-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <Save size={16} /> Save Panel
                        </button>
                        <button
                            onClick={handleResetAnnouncement}
                            className="py-3 px-4 rounded-xl border border-white/20 bg-white/[0.05] text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={16} /> Reset Panel
                        </button>
                    </div>
                </div>

                {/* Live Preview (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="p-6 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl flex flex-col justify-between min-h-[400px] relative overflow-hidden space-y-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-1.5">
                                <Megaphone size={14} />
                                Live {SECTIONS.find((s) => s.key === activeSection)?.label} Preview
                            </div>
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                                currentAnnouncement.enabled
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }`}>
                                {currentAnnouncement.enabled ? "Active (ON)" : "Hidden (OFF)"}
                            </span>
                        </div>

                        {/* Interactive Banner Preview */}
                        <div className="space-y-4">
                            <p className="text-xs text-white/40 uppercase tracking-widest">
                                Portfolio Banner Mockup
                            </p>

                            {currentAnnouncement.enabled ? (
                                <div
                                    className="w-full border border-white/10 rounded-2xl py-4 px-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-center transition-all shadow-xl"
                                    style={{
                                        backgroundColor: currentAnnouncement.bgColor || "#000000",
                                        color: currentAnnouncement.textColor || "#ffffff"
                                    }}
                                >
                                    <span className="text-xs font-medium tracking-wide">
                                        {currentAnnouncement.text || "Announcement text sample"}
                                    </span>
                                    {currentAnnouncement.buttonText && (
                                        <span className="px-3 py-1 rounded-full border border-current text-[10px] font-bold uppercase tracking-wider">
                                            {currentAnnouncement.buttonText}
                                        </span>
                                    )}
                                </div>
                            ) : (
                                <div className="p-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.01] text-center text-white/40 text-xs font-mono">
                                    This Announcement Bar is currently OFF. It will be hidden on the portfolio site.
                                </div>
                            )}
                        </div>

                        {/* Color Summary */}
                        <div className="grid grid-cols-2 gap-3 text-xs font-mono text-white/50 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div>
                                <span className="text-white/30 text-[10px] block uppercase">Background</span>
                                {currentAnnouncement.bgColor}
                            </div>
                            <div>
                                <span className="text-white/30 text-[10px] block uppercase">Text Color</span>
                                {currentAnnouncement.textColor}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
