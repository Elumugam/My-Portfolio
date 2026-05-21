import { motion } from "framer-motion";

export default function TripO() {
    return (
        <div className="max-w-7xl mx-auto px-8 lg:px-24 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                {/* Left — label + title */}
                <div className="lg:col-span-4">
                    <h2 className="section-label mb-8 text-white">Featured Project</h2>
                    <p className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-white mb-6">
                        TripO
                    </p>
                    <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted mb-12">
                        Travel · Explore · Connect
                    </p>
                    <div className="space-y-4">
                        <div className="line-accent bg-white w-12 h-[1px] opacity-30" />
                        <p className="text-muted text-xs font-bold tracking-widest uppercase">AI-Powered</p>
                    </div>
                </div>

                {/* Right — description + button */}
                <div className="lg:col-span-8 flex flex-col justify-center space-y-12">
                    <p className="text-2xl text-muted font-medium leading-relaxed max-w-2xl">
                        TripO is an AI-powered travel platform designed to help users discover places,
                        plan trips, explore destinations, and connect with communities through a smarter
                        travel experience.
                    </p>

                    <div className="flex items-center gap-8">
                        <motion.a
                            href="https://tripoapp.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-minimal inline-block"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                        >
                            Visit TripO
                        </motion.a>

                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted opacity-40">
                            tripoapp.in
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
