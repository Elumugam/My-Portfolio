import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Preloader from "./components/Preloader";

export default function App() {
    const [preloaderDone, setPreloaderDone] = useState(false);

    return (
        <>
            {!preloaderDone && (
                <Preloader onComplete={() => setPreloaderDone(true)} />
            )}
            {preloaderDone && (
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="about" element={<About />} />
                            <Route path="projects" element={<Projects />} />
                            <Route path="contact" element={<Contact />} />
                        </Route>
                    </Routes>
                </Router>
            )}
        </>
    );
}
