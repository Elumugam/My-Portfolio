
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";
import clsx from "clsx";
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 min-h-[calc(100vh-5rem)] flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 w-full items-start">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] text-primary uppercase bg-primary/5 rounded-full border border-primary/10">
                        Inquiry
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-8 text-gray-900 tracking-tight leading-tight">
                        Let's build something <br />
                        <span className="gradient-text">Extraordinary</span>
                    </h1>
                    <p className="text-muted-foreground mb-12 max-w-md leading-relaxed text-lg font-medium">
                        Currently open to select Python, AI, and Full-Stack opportunities. Drop me a line and let's discuss your next breakthrough.
                    </p>

                    <div className="space-y-10">
                        {[
                            { icon: <Mail size={22} />, label: "EMAIL", value: "elumugam.dev@gmail.com", href: "mailto:elumugam.dev@gmail.com", color: "text-primary", bg: "bg-primary/5" },
                            { icon: <Phone size={22} />, label: "PHONE", value: "+91 8667795510", href: "tel:+918667795510", color: "text-secondary", bg: "bg-secondary/5" },
                            { icon: <MapPin size={22} />, label: "LOCATION", value: "Coimbatore, Tamil Nadu, India", color: "text-accent", bg: "bg-accent/5" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-5 group">
                                <div className={clsx("p-4 rounded-2xl shadow-sm border border-gray-100 transition-all group-hover:scale-110 group-hover:shadow-lg bg-white", item.color)}>
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 tracking-widest mb-1.5">{item.label}</p>
                                    {item.href ? (
                                        <a href={item.href} className="text-xl font-bold text-gray-900 hover:text-primary transition-colors tracking-tight">
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-xl font-bold text-gray-900 tracking-tight">{item.value}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="pt-10 flex gap-6">
                            {[
                                { icon: <Linkedin size={22} />, href: "https://linkedin.com/in/elumugam-r-201b06292" },
                                { icon: <Github size={22} />, href: "https://github.com/Elumugam" }
                            ].map((social, i) => (
                                <a key={i} href={social.href} target="_blank" className="w-14 h-14 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-primary hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all flex items-center justify-center">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100%] -mr-10 -mt-10" />
                    <form ref={form} onSubmit={handleSubmit} className="relative space-y-8">
                        <div>
                            <label htmlFor="name" className="block text-xs font-bold text-gray-400 tracking-widest uppercase mb-3 ml-1">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="user_name"
                                required
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-gray-300 font-medium"
                                placeholder="E.g. Howard Stark"
                                value={formState.name}
                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs font-bold text-gray-400 tracking-widest uppercase mb-3 ml-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="user_email"
                                required
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all placeholder:text-gray-300 font-medium"
                                placeholder="name@company.com"
                                value={formState.email}
                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-xs font-bold text-gray-400 tracking-widest uppercase mb-3 ml-1">Message Content</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={4}
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all resize-none placeholder:text-gray-300 font-medium"
                                placeholder="How can I help you today?"
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSending}
                            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-gray-200 hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isSent ? "Message Sent!" : isSending ? "Sending Experience..." : (
                                <>
                                    Dispatch Message
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}

