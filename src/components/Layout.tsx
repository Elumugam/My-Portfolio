import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import GlobalAnimation from "./GlobalAnimation";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-[#030712]">
            <GlobalAnimation />
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}



