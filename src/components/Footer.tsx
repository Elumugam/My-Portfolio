import Reveal from "./Reveal";

export default function Footer() {
    return (
        <footer className="border-t border-white/5 py-10 sm:py-12 bg-black">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
                <Reveal className="flex flex-col md:flex-row justify-between items-start gap-8 lg:gap-12" y={24}>
                    <div className="space-y-6 sm:space-y-8">
                        <div className="text-2xl font-bold tracking-tighter text-white">
                            E<span className="text-muted">.</span>
                        </div>
                        <p className="text-muted text-xs sm:text-sm font-medium max-w-xs leading-relaxed">
                            Crafting high-precision digital products with a focus on impact and scalability.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8 md:gap-16">
                        <div className="space-y-6">
                            <h4 className="section-label text-white/50">Social</h4>
                            <div className="flex flex-col gap-4">
                                <a href="https://www.instagram.com/_ezhumugam?igsh=NGM0bzJsdGdpN3lm&utm_source=qr" target="_blank" rel="noreferrer" className="nav-link normal-case tracking-normal">Instagram</a>
                                <a href="https://www.facebook.com/share/1CBTK16MsN/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="nav-link normal-case tracking-normal">Facebook</a>
                                <a href="https://www.linkedin.com/in/elumugam-r-201b06292?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noreferrer" className="nav-link normal-case tracking-normal">LinkedIn</a>
                                <a href="https://github.com/Elumugam" target="_blank" rel="noreferrer" className="nav-link normal-case tracking-normal">GitHub</a>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h4 className="section-label text-white/50">Location</h4>
                            <p className="text-muted text-[11px] font-bold tracking-widest uppercase">
                                Coimbatore <br /> India
                            </p>
                        </div>
                    </div>
                </Reveal>

                <Reveal className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6" y={16} delay={0.1}>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} R Elumugam. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">

                        <span className="text-white/10">&bull;</span>
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                            Designed for precision.
                        </p>
                    </div>
                </Reveal>
            </div>
        </footer>
    );
}
