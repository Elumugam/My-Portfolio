
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
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-primary uppercase bg-primary/5 rounded-full">
                        Get In Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                        Let&apos;s <span className="gradient-text">Connect</span>
                    </h1>
                    <p className="text-muted-foreground mb-10 max-w-md leading-relaxed">
                        I&apos;m currently looking for new opportunities in Python Development, AI, Full-Stack Development, and Data Science. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-primary">
                                <Mail size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500 mb-1">EMAIL</p>
                                <a href="mailto:elumugam.dev@gmail.com" className="text-lg font-medium text-gray-900 hover:text-primary transition-colors">
                                    elumugam.dev@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-secondary">
                                <Phone size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500 mb-1">PHONE</p>
                                <a href="tel:+919585155367" className="text-lg font-medium text-gray-900 hover:text-primary transition-colors">
                                    +91 8667795510
                                </a>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-accent">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500 mb-1">LOCATION</p>
                                <p className="text-lg font-medium text-gray-900">Coimbatore, Tamil Nadu, India</p>
                            </div>
                        </div>

                        <div className="pt-8 flex gap-4">
                            <a href="https://linkedin.com/in/elumugam-r-201b06292" target="_blank" className="p-3 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-primary hover:border-primary/30 hover:shadow-lg transition-all">
                                <Linkedin size={24} />
                            </a>
                            <a href="https://github.com/Elumugam" target="_blank" className="p-3 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-primary hover:border-primary/30 hover:shadow-lg transition-all">
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
                    className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl shadow-primary/5"
                >
                    <form ref={form} onSubmit={handleSubmit} className="space-y-6">

                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="user_name"
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400"
                                placeholder="John Doe"
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="user_email"
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder-gray-400"
                                placeholder="john@example.com"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none placeholder-gray-400"
                                placeholder="Tell me about your project..."
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSending}
                            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
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

