import { useState, ChangeEvent, DragEvent } from "react";
import {
    Upload, Trash2, Save, Image as ImageIcon, ShieldAlert, Check, RefreshCw, Sliders, Type, RotateCcw, Smartphone, Monitor, Menu
} from "lucide-react";
import {
    portfolioStore,
    getHeroImageStyle,
    HeroImageData,
    HeroTransformSettings,
    HeroTextSettings,
    DEFAULT_HERO_TRANSFORM,
    DEFAULT_HERO_MOBILE_TRANSFORM,
    DEFAULT_HERO_TEXT
} from "../../services/portfolioStore";
import defaultHeroPhoto from "../../assets/hero-transparent.png";
import logoImg from "../../assets/logo.png";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
const SEPARATOR_PRESETS = ["•", "|", "/", "-", "★"];

export default function AdminHeroManager() {
    const existingHero = portfolioStore.getHeroImage();
    const [previewImage, setPreviewImage] = useState<string | null>(existingHero ? existingHero.imageUrl : null);
    const [pendingFileData, setPendingFileData] = useState<{
        fileName: string;
        fileSize: number;
        imageUrl: string;
    } | null>(null);

    // Desktop Hero Image Transform Settings State
    const [heroTransform, setHeroTransform] = useState<HeroTransformSettings>(() =>
        portfolioStore.getHeroTransform()
    );

    // Mobile Hero Image Transform Settings State
    const [heroMobileTransform, setHeroMobileTransform] = useState<HeroTransformSettings>(() =>
        portfolioStore.getMobileHeroTransform()
    );

    // Hero Text Settings State
    const [heroText, setHeroText] = useState<HeroTextSettings>(() =>
        portfolioStore.getHeroText()
    );

    const [activePreviewMode, setActivePreviewMode] = useState<"desktop" | "mobile">("desktop");
    const [error, setError] = useState<string>("");
    const [successMsg, setSuccessMsg] = useState<string>("");
    const [isDragging, setIsDragging] = useState(false);

    const validateAndProcessFile = (file: File) => {
        setError("");
        setSuccessMsg("");

        if (!ALLOWED_TYPES.includes(file.type.toLowerCase())) {
            setError("Invalid file format. Please upload a PNG, JPG, JPEG, or WEBP image.");
            return;
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
            setError("File size exceeds 10 MB limit. Please select a smaller image.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Url = e.target?.result as string;
            setPreviewImage(base64Url);
            setPendingFileData({
                fileName: file.name,
                fileSize: file.size,
                imageUrl: base64Url
            });
        };
        reader.onerror = () => {
            setError("Failed to read file.");
        };
        reader.readAsDataURL(file);
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            validateAndProcessFile(e.target.files[0]);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndProcessFile(e.dataTransfer.files[0]);
        }
    };

    const handleSaveImageChanges = () => {
        if (!pendingFileData) {
            setError("No image changes pending save.");
            return;
        }

        const heroData: HeroImageData = {
            imageUrl: pendingFileData.imageUrl,
            fileName: pendingFileData.fileName,
            fileSize: pendingFileData.fileSize,
            updatedAt: new Date().toISOString()
        };

        portfolioStore.saveHeroImage(heroData);
        setPendingFileData(null);
        setSuccessMsg("Hero section image saved successfully!");
    };

    const handleDeleteHeroImage = () => {
        portfolioStore.deleteHeroImage();
        setPreviewImage(null);
        setPendingFileData(null);
        setError("");
        setSuccessMsg("Hero image reset to default asset.");
    };

    // Desktop Hero Transform Controllers
    const handleTransformChange = (key: keyof HeroTransformSettings, value: number) => {
        setHeroTransform((prev) => ({ ...prev, [key]: value }));
    };

    const handleSaveHeroTransform = () => {
        portfolioStore.saveHeroTransform(heroTransform);
        setSuccessMsg("Desktop Hero image size & position settings saved!");
    };

    const handleResetHeroTransform = () => {
        portfolioStore.resetHeroTransform();
        setHeroTransform(DEFAULT_HERO_TRANSFORM);
        setSuccessMsg("Desktop Hero image controls reset to default.");
    };

    // Mobile Hero Transform Controllers
    const handleMobileTransformChange = (key: keyof HeroTransformSettings, value: number) => {
        setHeroMobileTransform((prev) => ({ ...prev, [key]: value }));
    };

    const handleSaveMobileHeroTransform = () => {
        portfolioStore.saveMobileHeroTransform(heroMobileTransform);
        setSuccessMsg("Mobile Hero image size & position settings saved!");
    };

    const handleResetMobileHeroTransform = () => {
        portfolioStore.resetMobileHeroTransform();
        setHeroMobileTransform(DEFAULT_HERO_MOBILE_TRANSFORM);
        setSuccessMsg("Mobile Hero image controls reset to default.");
    };

    // Hero Text Controllers
    const handleTextChange = (key: keyof HeroTextSettings, value: string) => {
        setHeroText((prev) => ({ ...prev, [key]: value }));
    };

    const handleSaveHeroText = () => {
        portfolioStore.saveHeroText(heroText);
        setSuccessMsg("Hero text content saved successfully!");
    };

    const handleResetHeroText = () => {
        portfolioStore.resetHeroText();
        setHeroText(DEFAULT_HERO_TEXT);
        setSuccessMsg("Hero text reset to default.");
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024 * 1024) {
            return (bytes / 1024).toFixed(1) + " KB";
        }
        return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold uppercase tracking-tighter text-white">
                    Hero Manager
                </h1>
                <p className="text-xs uppercase tracking-widest text-white/40 mt-1">
                    Independent Controls for Desktop &amp; Mobile Hero Section Image, Transforms &amp; Text
                </p>
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

            {/* Main Manager Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column (7 cols): Image Upload + Desktop Controls + Mobile Controls + Text Manager */}
                <div className="lg:col-span-7 space-y-8">
                    {/* 1. HERO IMAGE UPLOADER */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
                        <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                            <ImageIcon size={18} className="text-white/60" />
                            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                                Hero Image Upload &amp; Status
                            </h2>
                        </div>

                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-3 bg-black/40 ${
                                isDragging
                                    ? "border-white bg-white/10 scale-[1.01]"
                                    : "border-white/20 hover:border-white/40"
                            }`}
                        >
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                onChange={handleFileSelect}
                                className="hidden"
                                id="hero-file-input"
                            />
                            <label htmlFor="hero-file-input" className="cursor-pointer flex flex-col items-center space-y-3">
                                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/[0.05] flex items-center justify-center text-white">
                                    <Upload size={22} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold uppercase tracking-wider text-white">
                                        Click or Drag &amp; Drop Hero Image
                                    </p>
                                    <p className="text-[10px] text-white/40">
                                        PNG, JPG, JPEG, WEBP (Max 10 MB)
                                    </p>
                                </div>
                            </label>
                        </div>

                        {/* File Details & Save */}
                        <div className="flex items-center justify-between pt-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                                Active Image Status
                            </span>
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                                existingHero || pendingFileData
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                    : "bg-white/10 text-white/60"
                            }`}>
                                {pendingFileData ? "Unsaved Changes" : existingHero ? "Custom Image Active" : "Default Image Active"}
                            </span>
                        </div>

                        {(pendingFileData || existingHero) && (
                            <div className="text-xs text-white/70 space-y-1 font-mono p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                <div><span className="text-white/40">File:</span> {pendingFileData?.fileName || existingHero?.fileName}</div>
                                <div><span className="text-white/40">Size:</span> {formatFileSize(pendingFileData?.fileSize || existingHero?.fileSize || 0)}</div>
                            </div>
                        )}

                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={handleSaveImageChanges}
                                disabled={!pendingFileData}
                                className="flex-1 py-2.5 px-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Save size={16} /> Save Image
                            </button>
                            <label
                                htmlFor="hero-file-input"
                                className="py-2.5 px-4 rounded-xl border border-white/20 bg-white/[0.05] text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                                <RefreshCw size={16} /> Replace
                            </label>
                            {(existingHero || previewImage) && (
                                <button
                                    onClick={handleDeleteHeroImage}
                                    className="py-2.5 px-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 2. DESKTOP HERO IMAGE CONTROLS */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <Sliders size={18} className="text-white/60" />
                                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                                    Desktop Hero Image Controls
                                </h2>
                            </div>
                            <span className="text-[10px] text-white/40 uppercase tracking-widest">
                                Desktop View
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Width Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-white/70">Width</span>
                                    <span className="text-white">{heroTransform.width}px</span>
                                </div>
                                <input
                                    type="range"
                                    min="100"
                                    max="900"
                                    value={heroTransform.width}
                                    onChange={(e) => handleTransformChange("width", Number(e.target.value))}
                                    className="w-full accent-white bg-white/10 rounded-lg h-2 cursor-pointer"
                                />
                            </div>

                            {/* Height Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-white/70">Height</span>
                                    <span className="text-white">{heroTransform.height}px</span>
                                </div>
                                <input
                                    type="range"
                                    min="100"
                                    max="900"
                                    value={heroTransform.height}
                                    onChange={(e) => handleTransformChange("height", Number(e.target.value))}
                                    className="w-full accent-white bg-white/10 rounded-lg h-2 cursor-pointer"
                                />
                            </div>

                            {/* Scale Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-white/70">Scale</span>
                                    <span className="text-white">{heroTransform.scale}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="50"
                                    max="150"
                                    value={heroTransform.scale}
                                    onChange={(e) => handleTransformChange("scale", Number(e.target.value))}
                                    className="w-full accent-white bg-white/10 rounded-lg h-2 cursor-pointer"
                                />
                            </div>

                            {/* Rotation Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-white/70">Rotation</span>
                                    <span className="text-white">{heroTransform.rotation}°</span>
                                </div>
                                <input
                                    type="range"
                                    min="-180"
                                    max="180"
                                    value={heroTransform.rotation}
                                    onChange={(e) => handleTransformChange("rotation", Number(e.target.value))}
                                    className="w-full accent-white bg-white/10 rounded-lg h-2 cursor-pointer"
                                />
                            </div>

                            {/* Position X Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-white/70">X Position</span>
                                    <span className="text-white">{heroTransform.positionX}px</span>
                                </div>
                                <input
                                    type="range"
                                    min="-300"
                                    max="300"
                                    value={heroTransform.positionX}
                                    onChange={(e) => handleTransformChange("positionX", Number(e.target.value))}
                                    className="w-full accent-white bg-white/10 rounded-lg h-2 cursor-pointer"
                                />
                            </div>

                            {/* Position Y Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-white/70">Y Position</span>
                                    <span className="text-white">{heroTransform.positionY}px</span>
                                </div>
                                <input
                                    type="range"
                                    min="-300"
                                    max="300"
                                    value={heroTransform.positionY}
                                    onChange={(e) => handleTransformChange("positionY", Number(e.target.value))}
                                    className="w-full accent-white bg-white/10 rounded-lg h-2 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-white/10">
                            <button
                                onClick={handleSaveHeroTransform}
                                className="flex-1 py-3 px-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                <Save size={16} /> Save Desktop Settings
                            </button>
                            <button
                                onClick={handleResetHeroTransform}
                                className="py-3 px-4 rounded-xl border border-white/20 bg-white/[0.05] text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={16} /> Reset Desktop
                            </button>
                        </div>
                    </div>

                    {/* 3. MOBILE HERO IMAGE CONTROLS */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <Smartphone size={18} className="text-white/60" />
                                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                                    Mobile Hero Image Controls
                                </h2>
                            </div>
                            <span className="text-[10px] text-white/40 uppercase tracking-widest">
                                Mobile View (&lt;768px)
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Width Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-white/70">Mobile Width</span>
                                    <span className="text-white">{heroMobileTransform.width}px</span>
                                </div>
                                <input
                                    type="range"
                                    min="100"
                                    max="600"
                                    value={heroMobileTransform.width}
                                    onChange={(e) => handleMobileTransformChange("width", Number(e.target.value))}
                                    className="w-full accent-white bg-white/10 rounded-lg h-2 cursor-pointer"
                                />
                            </div>

                            {/* Height Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-white/70">Mobile Height</span>
                                    <span className="text-white">{heroMobileTransform.height}px</span>
                                </div>
                                <input
                                    type="range"
                                    min="100"
                                    max="600"
                                    value={heroMobileTransform.height}
                                    onChange={(e) => handleMobileTransformChange("height", Number(e.target.value))}
                                    className="w-full accent-white bg-white/10 rounded-lg h-2 cursor-pointer"
                                />
                            </div>

                            {/* Scale Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-white/70">Mobile Scale</span>
                                    <span className="text-white">{heroMobileTransform.scale}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="50"
                                    max="150"
                                    value={heroMobileTransform.scale}
                                    onChange={(e) => handleMobileTransformChange("scale", Number(e.target.value))}
                                    className="w-full accent-white bg-white/10 rounded-lg h-2 cursor-pointer"
                                />
                            </div>

                            {/* Rotation Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-white/70">Mobile Rotation</span>
                                    <span className="text-white">{heroMobileTransform.rotation}°</span>
                                </div>
                                <input
                                    type="range"
                                    min="-180"
                                    max="180"
                                    value={heroMobileTransform.rotation}
                                    onChange={(e) => handleMobileTransformChange("rotation", Number(e.target.value))}
                                    className="w-full accent-white bg-white/10 rounded-lg h-2 cursor-pointer"
                                />
                            </div>

                            {/* Position X Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-white/70">Mobile X Position</span>
                                    <span className="text-white">{heroMobileTransform.positionX}px</span>
                                </div>
                                <input
                                    type="range"
                                    min="-200"
                                    max="200"
                                    value={heroMobileTransform.positionX}
                                    onChange={(e) => handleMobileTransformChange("positionX", Number(e.target.value))}
                                    className="w-full accent-white bg-white/10 rounded-lg h-2 cursor-pointer"
                                />
                            </div>

                            {/* Position Y Slider */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                    <span className="text-white/70">Mobile Y Position</span>
                                    <span className="text-white">{heroMobileTransform.positionY}px</span>
                                </div>
                                <input
                                    type="range"
                                    min="-200"
                                    max="200"
                                    value={heroMobileTransform.positionY}
                                    onChange={(e) => handleMobileTransformChange("positionY", Number(e.target.value))}
                                    className="w-full accent-white bg-white/10 rounded-lg h-2 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-white/10">
                            <button
                                onClick={handleSaveMobileHeroTransform}
                                className="flex-1 py-3 px-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                <Save size={16} /> Save Mobile Settings
                            </button>
                            <button
                                onClick={handleResetMobileHeroTransform}
                                className="py-3 px-4 rounded-xl border border-white/20 bg-white/[0.05] text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={16} /> Reset Mobile
                            </button>
                        </div>
                    </div>

                    {/* 4. HERO TEXT MANAGER */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                            <div className="flex items-center gap-2">
                                <Type size={18} className="text-white/60" />
                                <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                                    Hero Text Manager
                                </h2>
                            </div>
                            <span className="text-[10px] text-white/40 uppercase tracking-widest">
                                Text Content
                            </span>
                        </div>

                        <div className="space-y-4">
                            {/* Hero Name */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                                    Hero Name
                                </label>
                                <input
                                    type="text"
                                    value={heroText.name}
                                    onChange={(e) => handleTextChange("name", e.target.value)}
                                    placeholder="e.g. RELUMUGAM"
                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm focus:outline-none focus:border-white/40 transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Role 1 */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                                        Role 1
                                    </label>
                                    <input
                                        type="text"
                                        value={heroText.role1}
                                        onChange={(e) => handleTextChange("role1", e.target.value)}
                                        placeholder="e.g. Python Developer"
                                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm focus:outline-none focus:border-white/40 transition-all"
                                    />
                                </div>

                                {/* Role 2 */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                                        Role 2
                                    </label>
                                    <input
                                        type="text"
                                        value={heroText.role2}
                                        onChange={(e) => handleTextChange("role2", e.target.value)}
                                        placeholder="e.g. AI Engineer"
                                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm focus:outline-none focus:border-white/40 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Separator Selector & Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                                    Separator
                                </label>
                                <div className="flex flex-wrap items-center gap-2">
                                    {SEPARATOR_PRESETS.map((preset) => (
                                        <button
                                            key={preset}
                                            type="button"
                                            onClick={() => handleTextChange("separator", preset)}
                                            className={`w-9 h-9 rounded-xl border text-sm font-bold flex items-center justify-center transition-all ${
                                                heroText.separator === preset
                                                    ? "bg-white text-black border-white"
                                                    : "bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/10"
                                            }`}
                                        >
                                            {preset}
                                        </button>
                                    ))}
                                    <input
                                        type="text"
                                        value={heroText.separator}
                                        onChange={(e) => handleTextChange("separator", e.target.value)}
                                        placeholder="Custom"
                                        maxLength={5}
                                        className="flex-1 min-w-[80px] max-w-[120px] px-3 py-2 rounded-xl border border-white/10 bg-black/50 text-white text-xs text-center focus:outline-none focus:border-white/40 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Button Text */}
                            <div className="space-y-1.5 pt-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-white/70 block">
                                    Primary Button Text
                                </label>
                                <input
                                    type="text"
                                    value={heroText.buttonText}
                                    onChange={(e) => handleTextChange("buttonText", e.target.value)}
                                    placeholder="e.g. VIEW PROJECTS"
                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm focus:outline-none focus:border-white/40 transition-all"
                                />
                            </div>
                        </div>

                        {/* Save & Reset Text */}
                        <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-white/10">
                            <button
                                onClick={handleSaveHeroText}
                                className="flex-1 py-3 px-4 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                <Save size={16} /> Save Hero Text
                            </button>
                            <button
                                onClick={handleResetHeroText}
                                className="py-3 px-4 rounded-xl border border-white/20 bg-white/[0.05] text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={16} /> Reset Text
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column (5 cols): LIVE PREVIEWS WITH PREVIEW MODE TOGGLE */}
                <div className="lg:col-span-5 space-y-4">
                    {/* Mode Toggle Bar */}
                    <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl">
                        <button
                            onClick={() => setActivePreviewMode("desktop")}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                                activePreviewMode === "desktop"
                                    ? "bg-white text-black shadow-md"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            <Monitor size={14} /> Desktop Preview
                        </button>
                        <button
                            onClick={() => setActivePreviewMode("mobile")}
                            className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                                activePreviewMode === "mobile"
                                    ? "bg-white text-black shadow-md"
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            <Smartphone size={14} /> Mobile Phone Preview
                        </button>
                    </div>

                    {/* DESKTOP PREVIEW FRAME */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-black/80 backdrop-blur-xl flex flex-col justify-between min-h-[480px] relative overflow-hidden space-y-6">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-1.5">
                                <Monitor size={14} />
                                Desktop Live Preview
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Instant Real-Time
                            </span>
                        </div>

                        {/* Live Text Preview Box */}
                        <div className="space-y-3 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                            <h3 className="text-xl font-extrabold uppercase tracking-tighter text-white leading-none break-words">
                                {heroText.name || "R ELUMUGAM"}
                            </h3>

                            <div className="flex flex-wrap items-center gap-2 text-xs text-white/50 font-light">
                                <span>{heroText.role1 || "Role 1"}</span>
                                {heroText.separator && (
                                    <span className="text-white/20">{heroText.separator}</span>
                                )}
                                <span>{heroText.role2 || "Role 2"}</span>
                            </div>

                            <div>
                                <span className="inline-block px-3 py-1.5 rounded-full border border-white/20 bg-white/[0.03] text-[9px] font-bold uppercase tracking-widest text-white">
                                    {heroText.buttonText || "VIEW PROJECTS"}
                                </span>
                            </div>
                        </div>

                        {/* Live Image Container Preview */}
                        <div className="relative flex items-center justify-center p-4 rounded-2xl border border-white/5 bg-black/60 min-h-[220px]">
                            <div className="absolute w-[140px] h-[140px] rounded-full bg-white/[0.05] blur-[30px] pointer-events-none" />

                            <div className="w-[170px] h-[170px] aspect-square rounded-full bg-white border-none overflow-hidden flex items-center justify-center pointer-events-none relative shadow-2xl">
                                <img
                                    src={previewImage || defaultHeroPhoto}
                                    alt="Live Desktop Preview"
                                    style={getHeroImageStyle(heroTransform, 170, false)}
                                    className="object-cover object-top pointer-events-none transition-transform duration-75 max-w-none max-h-none"
                                />
                            </div>
                        </div>

                        {/* Transform Summary Overlay */}
                        <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-white/40 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                            <div>W: {heroTransform.width}px</div>
                            <div>H: {heroTransform.height}px</div>
                            <div>Scale: {heroTransform.scale}%</div>
                            <div>X: {heroTransform.positionX}px</div>
                            <div>Y: {heroTransform.positionY}px</div>
                            <div>Rot: {heroTransform.rotation}°</div>
                        </div>
                    </div>

                    {/* MOBILE PHONE MOCKUP PREVIEW FRAME */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center min-h-[520px] relative overflow-hidden space-y-4">
                        <div className="w-full flex items-center justify-between border-b border-white/10 pb-3">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-1.5">
                                <Smartphone size={14} />
                                Dedicated Mobile Live Preview
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Real-Time Device
                            </span>
                        </div>

                        {/* Smartphone Device Frame Mockup */}
                        <div className="w-[300px] rounded-[36px] border-4 border-white/20 bg-black p-4 space-y-3 relative shadow-2xl overflow-hidden text-left">
                            {/* Speaker Notch Bar */}
                            <div className="w-24 h-3.5 bg-white/10 rounded-b-xl mx-auto -mt-4 mb-1 flex items-center justify-center">
                                <div className="w-8 h-1 bg-white/20 rounded-full" />
                            </div>

                            {/* Top Header (Logo + Menu) */}
                            <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                <img src={logoImg} alt="Logo" className="h-5 w-auto object-contain" />
                                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-white">
                                    <Menu size={12} />
                                </div>
                            </div>

                            {/* Announcement Bar (If Enabled) */}
                            {portfolioStore.getSectionAnnouncement("hero").enabled && (
                                <div
                                    className="w-full text-[8px] font-bold uppercase tracking-wider py-1 px-2 text-center rounded-lg shadow-sm truncate"
                                    style={{
                                        backgroundColor: portfolioStore.getSectionAnnouncement("hero").bgColor,
                                        color: portfolioStore.getSectionAnnouncement("hero").textColor
                                    }}
                                >
                                    {portfolioStore.getSectionAnnouncement("hero").text}
                                </div>
                            )}

                            {/* 2-Column Responsive Hero Section Mockup */}
                            <div className="grid grid-cols-12 gap-2 items-center py-1">
                                {/* Left Content */}
                                <div className="col-span-7 space-y-1.5">
                                    <h3 className="text-xs font-extrabold uppercase tracking-tighter text-white leading-tight break-words">
                                        {heroText.name || "R ELUMUGAM"}
                                    </h3>
                                    <div className="text-[8px] text-white/50 font-light flex flex-col gap-0.5">
                                        <span>{heroText.role1}</span>
                                        <span>{heroText.role2}</span>
                                    </div>
                                    <div>
                                        <span className="inline-block px-2 py-0.5 rounded-full border border-white/20 bg-white/[0.03] text-[7px] font-bold uppercase tracking-wider text-white">
                                            {heroText.buttonText || "VIEW PROJECTS"}
                                        </span>
                                    </div>
                                    {/* Social Icons */}
                                    <div className="flex items-center gap-1 pt-1">
                                        <div className="w-4 h-4 rounded-md bg-white/10 flex items-center justify-center text-white/70 text-[7px] font-bold">GH</div>
                                        <div className="w-4 h-4 rounded-md bg-white/10 flex items-center justify-center text-white/70 text-[7px] font-bold">LN</div>
                                        <div className="w-4 h-4 rounded-md bg-white/10 flex items-center justify-center text-white/70 text-[7px] font-bold">IG</div>
                                        <div className="w-4 h-4 rounded-md bg-white/10 flex items-center justify-center text-white/70 text-[7px] font-bold">EM</div>
                                    </div>
                                </div>

                                {/* Right Circle Image */}
                                <div className="col-span-5 flex items-center justify-end">
                                    <div className="w-[100px] h-[100px] aspect-square rounded-full bg-white border-none overflow-hidden flex items-center justify-center pointer-events-none shadow-xl">
                                        <img
                                            src={previewImage || defaultHeroPhoto}
                                            alt="Live Mobile Preview"
                                            style={getHeroImageStyle(heroMobileTransform, 100, true)}
                                            className="object-cover object-top pointer-events-none transition-transform duration-75 max-w-none max-h-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Nav Bar Indicator */}
                            <div className="w-16 h-1 bg-white/20 rounded-full mx-auto mt-1" />
                        </div>

                        {/* Mobile Transform Summary */}
                        <div className="w-full grid grid-cols-3 gap-2 text-[10px] font-mono text-white/40 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                            <div>MW: {heroMobileTransform.width}px</div>
                            <div>MH: {heroMobileTransform.height}px</div>
                            <div>MScale: {heroMobileTransform.scale}%</div>
                            <div>MX: {heroMobileTransform.positionX}px</div>
                            <div>MY: {heroMobileTransform.positionY}px</div>
                            <div>MRot: {heroMobileTransform.rotation}°</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
