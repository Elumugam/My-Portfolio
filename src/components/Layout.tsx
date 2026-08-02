import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { motion, useScroll } from "framer-motion";

export default function Layout() {
    const { scrollYProgress } = useScroll();

    return (
        <div className="min-h-screen flex flex-col bg-[#030712]">
            <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
