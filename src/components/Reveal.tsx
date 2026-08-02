import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    y?: number;
}

/* Scroll-triggered reveal — fades and slides content up as it enters the viewport */
export default function Reveal({ children, className, delay = 0, y = 40 }: RevealProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay }}
        >
            {children}
        </motion.div>
    );
}
