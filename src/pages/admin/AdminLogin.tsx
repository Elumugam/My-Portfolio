import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { Lock, User, ArrowLeft, ShieldAlert } from "lucide-react";
import logoImg from "../../assets/logo.png";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!username.trim() || !password) {
            setError("Please enter both username and password.");
            return;
        }

        setLoading(true);
        try {
            const success = await login(username.trim(), password);
            if (success) {
                navigate("/admin", { replace: true });
            } else {
                setError("Invalid username or password.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("An error occurred during authentication.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#030712] text-white flex flex-col justify-between relative overflow-hidden selection:bg-white selection:text-black">
            {/* Background vector accents */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-white/[0.015] rounded-full blur-2xl pointer-events-none" />

            {/* Header / Back Link */}
            <div className="p-6 md:p-10 flex items-center justify-between z-10">
                <a
                    href="#/"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/");
                    }}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Portfolio
                </a>
            </div>

            {/* Login Form Container */}
            <div className="flex-1 flex items-center justify-center px-4 py-12 z-10">
                <div className="w-full max-w-md bg-black/60 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-3">
                        <div className="flex justify-center mb-4">
                            <img src={logoImg} alt="Logo" className="h-10 w-auto object-contain" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-white">
                            Admin Portal
                        </h1>
                        <p className="text-xs uppercase tracking-widest text-white/40">
                            Authentication Required
                        </p>
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs flex items-center gap-3 animate-shake">
                            <ShieldAlert size={18} className="flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-white/70 block">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-white/70 block">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full pl-11 pr-4 py-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl border border-white/20 bg-white text-black font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/90 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            ) : (
                                "Authenticate"
                            )}
                        </button>
                    </form>

                    <div className="text-center text-[10px] uppercase tracking-widest text-white/30">
                        Secure Portfolio Control System
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-6 text-center text-xs text-white/20 uppercase tracking-widest z-10">
                &copy; {new Date().getFullYear()} Elumugam R &bull; All Rights Reserved
            </div>
        </div>
    );
}
