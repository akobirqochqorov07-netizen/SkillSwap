'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Zap, ArrowRight, User, GraduationCap } from 'lucide-react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        university: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const res = await api.auth.register(formData);
            localStorage.setItem('token', res.access_token);
            localStorage.setItem('user', JSON.stringify(res.user));
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-background selection:bg-primary/30 selection:text-white">
            {/* Left Splash/Brand Side (Hidden on Mobile) */}
            <div className="hidden lg:flex flex-1 flex-col justify-between p-12 bg-surface border-r border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-accent/10 via-background to-background" />

                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glass">
                        <Zap size={20} className="text-white" />
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-white">SkillSwap</span>
                </div>

                <div className="relative z-10 max-w-md">
                    <h1 className="text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Knowledge is <br />
                        <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">currency.</span>
                    </h1>
                    <p className="text-lg text-muted">Join Thousands of students across Uzbekistan. Why pay for a tutor when you can trade your skills?</p>
                </div>

                <div className="relative z-10 text-sm text-muted">
                    © {new Date().getFullYear()} SkillSwap Inc. System Status: Online.
                </div>
            </div>

            {/* Right Form Side */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden">
                {/* Mobile Header */}
                <div className="lg:hidden absolute top-8 left-8 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Zap size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-white">SkillSwap</span>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-[400px]"
                >
                    <div className="mb-8 p-1">
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Create Account</h2>
                        <p className="text-muted">Fill out the details below to join the community.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium flex items-center gap-3"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User size={18} className="text-muted group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                name="name"
                                placeholder="Full Name"
                                className="w-full pl-11 pr-4 py-3 bg-surface border border-white/10 rounded-xl text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted/60 text-sm font-medium"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <GraduationCap size={18} className="text-muted group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                name="university"
                                placeholder="University Name (e.g. WIUT)"
                                className="w-full pl-11 pr-4 py-3 bg-surface border border-white/10 rounded-xl text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted/60 text-sm font-medium"
                                value={formData.university}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex items-center gap-4 my-2">
                            <div className="flex-1 h-px bg-white/5" />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail size={18} className="text-muted group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                name="email"
                                type="email"
                                placeholder="University Email"
                                className="w-full pl-11 pr-4 py-3 bg-surface border border-white/10 rounded-xl text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted/60 text-sm font-medium"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={18} className="text-muted group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                name="password"
                                type="password"
                                placeholder="Secure Password"
                                className="w-full pl-11 pr-4 py-3 bg-surface border border-white/10 rounded-xl text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted/60 text-sm font-medium"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full relative group overflow-hidden rounded-xl bg-primary hover:bg-[#0056b3] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 py-3 flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(0,112,243,0.3)] hover:shadow-[0_0_25px_rgba(0,112,243,0.5)]"
                        >
                            <span className="font-semibold text-sm text-white">{isLoading ? 'Creating account...' : 'Create Account'}</span>
                            {!isLoading && <ArrowRight size={16} className="text-white opacity-80 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-muted">
                        Already a member?{' '}
                        <Link href="/login" className="font-medium text-white hover:text-primary transition-colors underline decoration-white/20 hover:decoration-primary/50 underline-offset-4">
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
