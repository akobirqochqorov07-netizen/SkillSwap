'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Zap, ArrowRight, Code } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const res = await api.auth.login({ email, password });
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
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glass">
                        <Zap size={20} className="text-white" />
                    </div>
                    <span className="font-bold text-2xl tracking-tight text-white">SkillSwap</span>
                </div>

                <div className="relative z-10 max-w-md">
                    <h1 className="text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                        Exchange skills. <br />
                        <span className="text-muted">Grow infinitely.</span>
                    </h1>
                    <p className="text-lg text-muted">Join the premier student peer-to-peer network. Trade your expertise, bypass currency, and level up your career.</p>
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
                        <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome back</h2>
                        <p className="text-muted">Enter your credentials to access your dashboard.</p>
                    </div>

                    <button className="w-full mb-6 relative group overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 py-3 flex items-center justify-center gap-3">
                        <Code size={18} className="text-white" />
                        <span className="font-medium text-sm text-white">Continue with SSO</span>
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-xs text-muted font-medium uppercase tracking-wider">Or continue with email</span>
                        <div className="flex-1 h-px bg-white/10" />
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
                                <Mail size={18} className="text-muted group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                type="email"
                                placeholder="University Email"
                                className="w-full pl-11 pr-4 py-3 bg-surface border border-white/10 rounded-xl text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted/60 text-sm font-medium"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock size={18} className="text-muted group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full pl-11 pr-4 py-3 bg-surface border border-white/10 rounded-xl text-white outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted/60 text-sm font-medium"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between mt-2 mb-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="w-4 h-4 rounded border border-white/20 bg-surface flex items-center justify-center group-hover:border-primary/50 transition-colors">
                                    {/* Custom Checkbox visual placeholder */}
                                </div>
                                <span className="text-sm text-muted group-hover:text-white transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="flex-1 text-right text-sm text-primary hover:text-primary/80 transition-colors font-medium">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full relative group overflow-hidden rounded-xl bg-primary hover:bg-[#0056b3] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 py-3 flex items-center justify-center gap-2 mt-2 shadow-[0_0_20px_rgba(0,112,243,0.3)] hover:shadow-[0_0_25px_rgba(0,112,243,0.5)]"
                        >
                            <span className="font-semibold text-sm text-white">{isLoading ? 'Signing in...' : 'Sign In'}</span>
                            {!isLoading && <ArrowRight size={16} className="text-white opacity-80 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-muted">
                        Don't have an account?{' '}
                        <Link href="/register" className="font-medium text-white hover:text-primary transition-colors underline decoration-white/20 hover:decoration-primary/50 underline-offset-4">
                            Sign up
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
