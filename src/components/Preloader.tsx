import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["DESIGN.", "DEVELOP.", "SCALE."];

interface PreloaderProps {
    onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [done, setDone] = useState(false);
    const completeCalled = useRef(false);

    useEffect(() => {
        // Each word displays for 800ms; animation in/out = 450ms each
        const WORD_DURATION = 900;

        if (currentIndex < words.length - 1) {
            const t = setTimeout(() => setCurrentIndex((i) => i + 1), WORD_DURATION);
            return () => clearTimeout(t);
        } else {
            // Last word: hold 600ms then fade out screen
            const t = setTimeout(() => {
                setDone(true);
                const t2 = setTimeout(() => {
                    if (!completeCalled.current) {
                        completeCalled.current = true;
                        onComplete();
                    }
                }, 800); // fade-out duration
                return () => clearTimeout(t2);
            }, 600);
            return () => clearTimeout(t);
        }
    }, [currentIndex, onComplete]);

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    key="preloader"
                    className="preloader-overlay"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
                >
                    {/* Matching grid from hero */}
                    <div className="preloader-grid" />

                    {/* Animated word */}
                    <div className="preloader-word-container">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={words[currentIndex]}
                                className="preloader-word"
                                initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -32, filter: "blur(6px)" }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {words[currentIndex]}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Progress indicators */}
                    <div className="preloader-progress">
                        {words.map((_, i) => (
                            <motion.div
                                key={i}
                                className="preloader-bar"
                                initial={{ scaleX: 0, opacity: 0.2 }}
                                animate={{
                                    scaleX: i === currentIndex ? 1 : i < currentIndex ? 1 : 0,
                                    opacity: i <= currentIndex ? 1 : 0.2,
                                }}
                                transition={{ duration: i === currentIndex ? 0.85 : 0.3, ease: "easeOut" }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
