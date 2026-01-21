import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col font-sans text-foreground selection:bg-primary/10 selection:text-primary">
            {/* Subtle Gradient Background */}
            <div className="fixed inset-0 z-[-1] bg-white pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[120%] h-[60%] bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.03)_0%,_transparent_70%)] rounded-[100%]" />
            </div>

            <Navbar />
            <main className="flex-grow pt-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

