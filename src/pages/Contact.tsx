
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
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

        // NOTE: You need to replace 'YOUR_TEMPLATE_ID' with your actual EmailJS template ID
        emailjs.sendForm('service_8ql61u7', 'template_8169yuk', form.current!, '1btQ7TAUxStg0LzXZ')
            .then((result) => {
                console.log(result.text);
                setIsSent(true);
                setFormState({ name: "", email: "", message: "" });
                alert("Message sent successfully!");
                setTimeout(() => setIsSent(false), 3000);
            }, (error) => {
                console.log(error.text);
                alert("Failed to send message. Please check if your EmailJS Template ID is correct.");
            })
            .finally(() => {
                setIsSending(false);
            });
    };


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[calc(100vh-8rem)] flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl font-bold mb-6">
                        Let&apos;s <span className="gradient-text">Connect</span>
                    </h1>
                    <p className="text-gray-400 mb-8 max-w-md">
                        I&apos;m currently looking for new opportunities in Python Development, AI, Full-Stack Development, and Data Science. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="p-3 glass rounded-full text-primary">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <a href="mailto:elumugam.dev@gmail.com" className="hover:text-white transition-colors">
                                    elumugam.dev@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="p-3 glass rounded-full text-secondary">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <a href="tel:+919585155367" className="hover:text-white transition-colors">
                                    +91 8667795510
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-gray-300">
                            <div className="p-3 glass rounded-full text-accent">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Location</p>
                                <p>Coimbatore, Tamil Nadu, India</p>
                            </div>
                        </div>

                        <div className="pt-6 flex gap-4">
                            <a href="https://linkedin.com/in/elumugam-r-201b06292" target="_blank" className="p-3 glass rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                <Linkedin size={24} />
                            </a>
                            <a href="https://github.com/Elumugam" target="_blank" className="p-3 glass rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                                <Github size={24} />
                            </a>
                        </div>
                    </div>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass p-8 rounded-2xl border border-white/10"
                >
                    <form ref={form} onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="user_name"

                                required
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-600 focus:border-transparent transition-all"
                                placeholder="Your Name"
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="user_email"

                                required
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-600 focus:border-transparent transition-all"
                                placeholder="your.email@example.com"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                            <textarea
                                id="message"
                                name="message"

                                required
                                rows={4}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-gray-600 focus:border-transparent transition-all resize-none"
                                placeholder="How can I help you?"
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSending}
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSent ? "Message Sent!" : isSending ? "Sending..." : (

                                <>
                                    Send Message <Send size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
