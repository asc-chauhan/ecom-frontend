import { FaEnvelope, FaMapMarkedAlt, FaPhone, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
    return (
        <div className="lg:px-14 sm:px-8 px-4 py-16">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider">
                        Get in Touch
                    </span>
                    <h1 className="text-4xl font-bold text-slate-800 dark:text-white mt-3">
                        Contact Us
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-md mx-auto">
                        Have a question or feedback? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-10">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
                            <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <FaPhone className="text-indigo-300" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Phone</p>
                                        <span className="font-medium">+91 7386253324</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <FaEnvelope className="text-indigo-300" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Email</p>
                                        <span className="font-medium text-sm">anshulasc151976@gmail.com</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <FaMapMarkedAlt className="text-indigo-300" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Location</p>
                                        <span className="font-medium">Bengaluru, Karnataka</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                            <form className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                            placeholder="John"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        Message
                                    </label>
                                    <textarea
                                        rows="5"
                                        required
                                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-700 transition duration-200 active:scale-[0.98]">
                                    <FaPaperPlane className="text-sm" />
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
