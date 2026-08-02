import { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Freelancing from "./pages/Freelancing";
import Preloader from "./components/Preloader";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    // Skip preloader if accessing admin hash path
    const isHashAdminPath = window.location.hash.startsWith("#/admin");
    const [preloaderDone, setPreloaderDone] = useState(isHashAdminPath);

    return (
        <>
            {!preloaderDone && (
                <Preloader onComplete={() => setPreloaderDone(true)} />
            )}
            {preloaderDone && (
                <Router>
                    <Routes>
                        {/* Main Portfolio Routes */}
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="about" element={<About />} />
                            <Route path="projects" element={<Projects />} />
                            <Route path="contact" element={<Contact />} />
                            <Route path="freelancing" element={<Freelancing />} />
                        </Route>

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />

                        {/* Fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Router>
            )}
        </>
    );
}
