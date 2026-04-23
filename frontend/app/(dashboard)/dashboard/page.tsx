'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Users, ChevronRight, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/providers/LanguageProvider';

export default function DashboardPage() {
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const data = await api.matches.discover();
                setMatches(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, []);

    const handleMatchRequest = async (userId: string) => {
        try {
            await api.matches.request(userId);
            setMatches(prev => prev.filter(m => m.id !== userId));
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="w-full flex-1 pt-6 flex flex-col gap-8 pb-12">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gradient mb-2">{t('dashboard')} Overview</h1>
                    <p className="text-muted text-sm md:text-base">Find university peers mapping perfectly to your skills.</p>
                </div>
                <div className="flex items-center gap-3 bg-surface p-1.5 rounded-xl border border-border shadow-soft">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-lg">
                        <Zap size={16} className="text-primary" />
                        <span className="text-primary font-semibold text-sm">AI Matching Active</span>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="relative min-h-[400px]">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-64 rounded-2xl animate-pulse bg-surface-hover border border-border" />
                        ))}
                    </div>
                ) : (
                    <AnimatePresence>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.1 }
                                }
                            }}
                        >
                            {matches.map((match) => (
                                <motion.div
                                    key={match.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                    className="liquid-panel p-6 flex flex-col"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center shadow-[0_8px_16px_rgba(0,112,243,0.3)] flex-shrink-0 border border-white/20">
                                                <span className="text-white font-bold text-xl">{match.name.charAt(0)}</span>
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-text-main font-bold text-lg truncate">{match.name}</h3>
                                                <p className="text-muted text-xs capitalize truncate">{match.university}</p>
                                            </div>
                                        </div>
                                        {/* Relevance Badge */}
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 shadow-sm">
                                            <Sparkles size={12} className="text-secondary" />
                                            <span className="text-secondary font-bold text-xs">{Math.round(match.relevanceScore)}%</span>
                                        </div>
                                    </div>

                                    {/* Skills Display */}
                                    <div className="flex-1 flex flex-col gap-4">
                                        <div>
                                            <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">Can Teach</p>
                                            <div className="flex flex-wrap gap-2">
                                                {match.skills.filter((s: any) => s.type === 'HAVE').map((s: any) => (
                                                    <span key={s.id} className="px-3 py-1.5 bg-surface-hover border border-border rounded-lg text-xs font-semibold text-text-main shadow-sm">
                                                        {s.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[11px] font-bold text-muted uppercase tracking-wider mb-2">Wants to Learn</p>
                                            <div className="flex flex-wrap gap-2">
                                                {match.skills.filter((s: any) => s.type === 'WANT').map((s: any) => (
                                                    <span key={s.id} className="px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg text-xs font-semibold text-primary shadow-sm">
                                                        {s.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <hr className="border-border my-5" />

                                    {/* Action Button */}
                                    <button
                                        onClick={() => handleMatchRequest(match.id)}
                                        className="btn-liquid w-full group py-3.5"
                                    >
                                        <span className="z-10 font-bold text-sm text-white">Request Match</span>
                                        <ChevronRight size={18} className="z-10 text-white opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}

                {!loading && matches.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full flex flex-col items-center justify-center p-12 bg-surface/50 border border-border rounded-3xl border-dashed"
                    >
                        <div className="w-20 h-20 rounded-full bg-surface-hover flex items-center justify-center mb-6 shadow-soft">
                            <Users size={36} className="text-muted" />
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-gradient mb-3">{t('no_matches')}</h3>
                        <p className="text-muted text-center max-w-md">Our algorithm couldn't find a perfect pairing right now. Enhance your profile by adding more specific skills.</p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
