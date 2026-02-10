import { Send, CheckCircle2 } from "lucide-react";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

export default function Contact() {
    const form = useRef<HTMLFormElement>(null);
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [isSent, setIsSent] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);

        emailjs.sendForm('service_8ql61u7', 'template_8169yuk', form.current!, '1btQ7TAUxStg0LzXZ')
            .then(() => {
                setIsSent(true);
                setFormState({ name: "", email: "", message: "" });
                setTimeout(() => setIsSent(false), 5000);
            }, (error) => {
                console.log(error.text);
                alert("Failed to send message.");
            })
            .finally(() => {
                setIsSending(false);
            });
    };

    return (
        <div className="max-w-7xl mx-auto px-8 lg:px-24 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                <div className="lg:col-span-5 space-y-12">
                    <div>
                        <h2 className="section-label mb-8 text-white">Contact</h2>
                        <p className="text-6xl font-bold tracking-tighter text-white">Let's connect.</p>
                    </div>

                    <div className="space-y-8">
                        <p className="text-xl text-muted font-medium leading-relaxed">
                            Actively looking for entry-level Python and AI engineering roles.
                        </p>

                        <div className="space-y-4">
                            <a href="mailto:elumugam.dev@gmail.com" className="block text-2xl font-bold text-white hover:text-muted transition-colors">
                                elumugam.dev@gmail.com
                            </a>
                            <p className="text-muted text-[10px] font-bold tracking-widest uppercase">Coimbatore, India</p>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7">
                    <form ref={form} onSubmit={handleSubmit} className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4 border-b border-white/10 pb-4 focus-within:border-white transition-colors">
                                <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Name</label>
                                <input
                                    type="text"
                                    name="user_name"
                                    required
                                    className="w-full bg-transparent text-white font-medium outline-none placeholder:text-white/10"
                                    placeholder="Full Name"
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-4 border-b border-white/10 pb-4 focus-within:border-white transition-colors">
                                <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Email</label>
                                <input
                                    type="email"
                                    name="user_email"
                                    required
                                    className="w-full bg-transparent text-white font-medium outline-none placeholder:text-white/10"
                                    placeholder="Email Address"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4 border-b border-white/10 pb-4 focus-within:border-white transition-colors">
                            <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Message</label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                className="w-full bg-transparent text-white font-medium outline-none placeholder:text-white/10 resize-none"
                                placeholder="Describe your project"
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSending}
                            className="btn-minimal w-full"
                        >
                            {isSent ? (
                                <span className="flex items-center justify-center gap-3">
                                    Message Sent <CheckCircle2 size={16} />
                                </span>
                            ) : isSending ? (
                                "Sending..."
                            ) : (
                                <span className="flex items-center justify-center gap-3">
                                    Send Message <Send size={16} strokeWidth={1.5} />
                                </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Technology Marquee Section */}
            <div className="mt-16 w-full overflow-hidden border-t border-white/5 pt-16">
                <style>
                    {`
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .marquee-container {
                        display: flex;
                        overflow: hidden;
                        mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                        -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
                    }
                    .marquee-content {
                        display: flex;
                        gap: 6rem;
                        animation: marquee 40s linear infinite;
                        padding: 2rem 0;
                    }
                    .marquee-container:hover .marquee-content {
                        animation-play-state: paused;
                    }
                    .tech-icon {
                        height: 40px;
                        width: auto;
                        opacity: 0.4;
                        filter: grayscale(1);
                        transition: opacity 0.3s ease;
                    }
                    .tech-icon:hover {
                        opacity: 1;
                    }
                    `}
                </style>

                <p className="section-label mb-16 text-center text-white/40">Technologies I Work With</p>

                <div className="marquee-container">
                    <div className="marquee-content">
                        {/* First Set of Icons */}
                        <TechIcons />
                        {/* Second Set for Infinite Loop */}
                        <TechIcons />
                    </div>
                </div>
            </div>
        </div>
    );
}

function TechIcons() {
    return (
        <div className="flex gap-[6rem] items-center shrink-0">
            {/* Python */}
            <svg className="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.28.59.35.45.45.34.54.2.73.06.9v1.2H12.2V3.1h2.45v.35h-3.15v2.3h2.1v2.3h-2.1v-.35h.35v-.7h-.7v.7h-.35v1.2H12.2v1.2l-.06.9-.2.73-.34.54-.45.45-.59.35-.73.28-.9.2-.9-.2-.73-.28-.59-.35-.45-.45-.34-.54-.2-.73-.06-.9V8.5h2.1v-.35H9.7V5.85H11.8V3.55H9.7v.35h-.35v.7h.7v-.7h.35v-1.2h.7v-1.2l.06-.9.2-.73.34-.54.45-.45.59-.35.73-.28.9-.2zm0 1.2a.525.525 0 1 0 0 1.05.525.525 0 0 0 0-1.05zm-4.55 12a.525.525 0 1 0 0 1.05.525.525 0 0 0 0-1.05z" /></svg>
            {/* FastAPI */}
            <svg className="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L1.5 15h10.5L12 24l10.5-15H12z" /></svg>
            {/* Flask */}
            <svg className="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18.8 11.2c-.8 0-1.5.2-2.1.5l-.2-.2c1-1.3 1.5-2.8 1.5-4.4 0-3.9-3.1-7-7-7s-7 3.1-7 7c0 1.6.5 3.1 1.5 4.4l-.2.2c-.6-.3-1.3-.5-2.1-.5C1.5 11.2 0 12.7 0 14.5c0 1.8 1.5 3.3 3.3 3.3.4 0 .7-.1 1-.2l1.6 3.1c.3.5.8.8 1.4.8.6 0 1.1-.3 1.4-.8l.2-.4c.7.4 1.5.7 2.3.7s1.6-.3 2.3-.7l.2.4c.3.5.8.8 1.4.8s1.1-.3 1.4-.8l1.6-3.1ce.3.1.6.2 1 .2 1.8 0 3.3-1.5 3.3-3.3s-1.5-3.3-3.3-3.3zM11.2 2.1c2.7 0 4.9 2.2 4.9 4.9 0 1.1-.4 2.1-1 3-1.1-.8-2.4-1.2-3.9-1.2s-2.8.4-3.9 1.2c-.6-.9-1-1.9-1-3 0-2.7 2.2-4.9 4.9-4.9zm-7.9 13.5c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2.9.2 1.1.4l-.8 1.5c-.2.3-.1.5.1.5h-.4zm2.1 4.5l-1.3-2.5c.3-.1.6-.2.9-.4l1 1.9c.2.4.6.6 1 .6.4 0 .8-.2 1-.6l.3-.6c.2.1.5.2.7.3l.3.6c.3.5.8.8 1.4.8s1.1-.3 1.4-.8l.3-.6c.2-.1.5-.2.7-.3l.3.6c.2.4.6.6 1 .6.4 0 .8-.2 1-.6l1-1.9c.3.2.6.3.9.4l-1.3 2.5c-.2.4-.6.6-1 .6s-.8-.2-1-.6l-.3-.6c-.2.1-.5.3-.8.4V21c0 .2-.1.3-.3.3s-.3-.1-.3-.3v-1.1c-.3-.1-.6-.3-.8-.4l-.3.6c-.2.4-.6.6-1 .6s-.8-.2-1-.6l-.3-.6c-.2.1-.5.3-.8.4V21c0 .2-.1.3-.3.3s-.3-.1-.3-.3v-1.1c-.3-.1-.6-.3-.8-.4l-.3.6c-.2.4-.6.6-1 .6s-.8-.2-1-.6zm13.7-5.7c0 .7-.5 1.2-1.2 1.2h-.4c.2 0 .3-.2.1-.5l-.8-1.5c.2-.2.5-.4 1.1-.4.7 0 1.2.5 1.2 1.2z" /></svg>
            {/* Machine Learning (Brain icon) */}
            <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4.5V2" /><path d="M12 22v-2.5" /><path d="m4.9 4.9 1.3 1.3" /><path d="m17.8 17.8 1.3 1.3" /><path d="M2.5 12h2" /><path d="M19.5 12h2" /><path d="m4.9 19.1 1.3-1.3" /><path d="m17.8 6.2 1.3-1.3" /><circle cx="12" cy="12" r="5" /><path d="M12 9v6" /><path d="M9 12h6" /></svg>
            {/* Pandas */}
            <svg className="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4c-3.3 0-6 2.7-6 6 0 1.5.6 2.9 1.5 3.9L5.3 17c-.4.7-.2 1.6.5 2 .7.4 1.6.2 2-.5l2.2-3.1c.6.3 1.3.4 2 .4s1.4-.1 2-.4l2.2 3.1c.4.7 1.3.9 2 .5.7-.4.9-1.3.5-2l-2.2-3.1c.9-1 1.5-2.4 1.5-3.9 0-3.3-2.7-6-6-6zm3 6c0 .6-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1zm-5 0c0 .6-.4 1-1 1s-1-.4-1-1 .4-1 1-1 1 .4 1 1z" /></svg>
            {/* NumPy */}
            <svg className="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5l6 3.75v7.5l-6 3.75-6-3.75v-7.5l6-3.75zM12 8l4 2.5v3L12 16l-4-2.5v-3L12 8z" /></svg>
            {/* SQL */}
            <svg className="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></svg>
            {/* Git */}
            <svg className="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 11.4l-11-11c-.5-.5-1.3-.5-1.8 0l-3 3 2.1 2.1V10c0 .7-.5 1.2-1.2 1.2s-1.2-.5-1.2-1.2V5.5L7.4 3.4 1.4 9.4c-.5.5-.5 1.4 0 1.8l11 11c.5.5 1.3.5 1.8 0l11-11c.5-.5.5-1.4 0-1.8zM12.6 15.6c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1c.6-.6 1.5-.6 2.1 0s.6 1.5 0 2.1z" /></svg>
            {/* Docker */}
            <svg className="tech-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M13.96 11.6c0-.1.01-.1.02-.1h1.4c.01 0 .02.01.02.1v1.4c0 .01-.01.02-.02.02h-1.4c-.01 0-.02-.01-.02-.02v-1.4zM16.5 11.6c0-.1.01-.1.02-.1h1.4c.01 0 .02.01.02.1v1.4c0 .01-.01.02-.02.02h-1.4c-.01 0-.02-.01-.02-.02v-1.4zM11.4 11.6c0-.1.01-.1.02-.1h1.4c.01 0 .02.01.02.1v1.4c0 .01-.01.02-.02.02h-1.4c-.01 0-.02-.01-.02-.02v-1.4zM8.8 11.6c0-.1.01-.1.02-.1h1.4c.01 0 .02.01.02.1v1.4c0 .01-.01.02-.02.02h-1.4c-.01 0-.02-.01-.02-.02v-1.4zM6.2 11.6c0-.1.01-.1.02-.1H7.6c.01 0 .02.01.02.1v1.4c0 .01-.01.02-.02.02H6.2c-.01 0-.02-.01-.02-.02v-1.4zM11.4 9c0-.1.01-.1.02-.1h1.4c.01 0 .02.01.02.1v1.4c0 .01-.01.02-.02.02h-1.4c-.01 0-.02-.01-.02-.02v-1.4zM8.8 9c0-.1.01-.1.02-.1h1.4c.01 0 .02.01.02.1v1.4c0 .01-.01.02-.02.02h-1.4c-.01 0-.02-.01-.02-.02v-1.4zM11.4 6.4c0-.1.01-.1.02-.1h1.4c.01 0 .02.01.02.1v1.4c0 .01-.01.02-.02.02h-1.4c-.01 0-.02-.01-.02-.02v-1.4zM3.6 11.6c0-.1.01-.1.02-.1H5c.01 0 .02.01.02.1v1.4c0 .01-.01.02-.02.02H3.6c-.01 0-.02-.01-.02-.02v-1.4zm20.4-1.2c-.4 0-1.1-.3-1.1-.3-.4-.2-.8-.2-1.2 0s-.8.5-.8 1c0 3.1-2.5 5.6-5.6 5.6H0c0 1.1 1.2 2.1 3 2.1h13.9c3.1 0 5.6-2.5 5.6-5.6 0-.8.2-1.5.7-2 .4-.5.8-.8.8-.8z" /></svg>
        </div>
    );
}
