import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAME = "ELUMUGAM";
const PHASES = ["DESIGN", "DEVELOP", "SCALE"];
const EASE = [0.76, 0, 0.24, 1] as const;

interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);
    const completeCalled = useRef(false);

    useEffect(() => {
        const DURATION = 2400;
        const start = performance.now();
        let raf = 0;
        let hold = 0;
        let finished = false;

        const update = () => {
            const t = Math.min((performance.now() - start) / DURATION, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(Math.round(eased * 100));
            if (t >= 1 && !finished) {
                finished = true;
                clearInterval(interval);
                hold = window.setTimeout(() => {
                    setDone(true);
                    // In a hidden tab the exit animation can't play (rAF is
                    // paused), so hand off immediately instead of stalling.
                    if (document.hidden && !completeCalled.current) {
                        completeCalled.current = true;
                        onComplete();
                    }
                }, 400);
            }
            return t;
        };

        const tick = () => {
            if (update() < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        // rAF pauses in backgrounded tabs; this keeps progress moving there.
        const interval = window.setInterval(update, 250);

        return () => {
            cancelAnimationFrame(raf);
            clearInterval(interval);
            clearTimeout(hold);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const phase = PHASES[Math.min(Math.floor(progress / 34), PHASES.length - 1)];

    return (
        <AnimatePresence
            onExitComplete={() => {
                if (!completeCalled.current) {
                    completeCalled.current = true;
                    onComplete();
                }
            }}
        >
            {!done && (
                <motion.div
                    key="preloader"
                    className="preloader-overlay"
                    exit={{ y: "-100%", transition: { duration: 0.9, ease: EASE } }}
                >
                    {/* Matching grid from hero */}
                    <div className="preloader-grid" />

                    {/* Top frame labels */}
                    <motion.div
                        className="preloader-header"
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    >
                        <span>Portfolio</span>
                        <span>&copy; 2026</span>
                    </motion.div>

                    {/* Center: staggered name reveal + phase word */}
                    <div className="preloader-center">
                        <div className="preloader-name" aria-label={NAME}>
                            {NAME.split("").map((letter, i) => (
                                <span key={i} className="preloader-letter-mask">
                                    <motion.span
                                        className="preloader-letter"
                                        initial={{ y: "115%" }}
                                        animate={{ y: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.22, 1, 0.36, 1],
                                            delay: 0.35 + i * 0.055,
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                </span>
                            ))}
                        </div>

                        <motion.div
                            className="preloader-phase-row"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                        >
                            <span className="preloader-phase-line" />
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={phase}
                                    className="preloader-phase"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                >
                                    {phase}
                                </motion.span>
                            </AnimatePresence>
                            <span className="preloader-phase-line" />
                        </motion.div>
                    </div>

                    {/* Bottom frame: status + live counter */}
                    <motion.div
                        className="preloader-footer"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    >
                        <span className="preloader-status">Loading Experience</span>
                        <span className="preloader-percent">{progress}%</span>
                    </motion.div>

                    {/* Progress line pinned to bottom edge */}
                    <motion.div
                        className="preloader-line"
                        style={{ scaleX: progress / 100 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
