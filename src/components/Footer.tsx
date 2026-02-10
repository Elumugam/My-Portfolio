export default function Footer() {
    return (
        <footer className="border-t border-white/5 py-12 bg-black">
            <div className="max-w-7xl mx-auto px-8 lg:px-24">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="space-y-8">
                        <div className="text-2xl font-bold tracking-tighter text-white">
                            E<span className="text-muted">.</span>
                        </div>
                        <p className="text-muted text-sm font-medium max-w-xs leading-relaxed">
                            Crafting high-precision digital products with a focus on impact and scalability.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-16 md:gap-32">
                        <div className="space-y-6">
                            <h4 className="section-label text-white/50">Social</h4>
                            <div className="flex flex-col gap-4">
                                <a href="https://github.com/Elumugam" className="nav-link normal-case tracking-normal">GitHub</a>
                                <a href="https://linkedin.com/in/elumugam-r-201b06292" className="nav-link normal-case tracking-normal">LinkedIn</a>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h4 className="section-label text-white/50">Location</h4>
                            <p className="text-muted text-[11px] font-bold tracking-widest uppercase">
                                Coimbatore <br /> India
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} R Elumugam. All rights reserved.
                    </p>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                        Designed for precision.
                    </p>
                </div>
            </div>
        </footer>
    );
}
