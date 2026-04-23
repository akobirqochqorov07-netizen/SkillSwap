'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Code, ShieldCheck, Trash2, Code2, Sparkles, GraduationCap, Trophy, Cpu } from 'lucide-react';
import { useLanguage } from '@/lib/providers/LanguageProvider';

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [skills, setSkills] = useState<any[]>([]);
    const [newSkill, setNewSkill] = useState({ name: '', type: 'HAVE' });
    const [githubUrl, setGithubUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [isVerifying, setIsVerifying] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const u = await api.users.getProfile();
                setUser(u);
                const s = await api.skills.getAll();
                setSkills(s);
            } catch (err: any) {
                if (err.message === 'Unauthorized' || err.message === 'Something went wrong') {
                    router.push('/login');
                } else {
                    console.error("Failed to load profile", err);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleAddSkill = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSkill.name.trim()) return;
        try {
            const s = await api.skills.create(newSkill);
            setSkills([...skills, s]);
            setNewSkill({ name: '', type: 'HAVE' });
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleVerify = async (skillId: string) => {
        if (!githubUrl) return alert('Please enter a GitHub URL for verification');
        setIsVerifying(true);
        try {
            await api.skills.verify(skillId, githubUrl);
            await new Promise(r => setTimeout(r, 600));
            const s = await api.skills.getAll();
            setSkills(s);
            setGithubUrl('');
        } catch (err: any) {
            alert(err.message);
        } finally {
            setIsVerifying(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 pt-6 flex flex-col gap-6 w-full">
                <div className="h-48 w-full rounded-3xl animate-pulse bg-surface-hover border border-border" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="h-64 rounded-3xl animate-pulse bg-surface-hover border border-border lg:col-span-1" />
                    <div className="h-96 rounded-3xl animate-pulse bg-surface-hover border border-border lg:col-span-2" />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex-1 pt-6 flex flex-col gap-8 pb-12">
            <header className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold tracking-tight text-gradient mb-2">{t('my_profile')}</h1>
                <p className="text-muted text-sm md:text-base">Manage your personal information, skills, and verifications.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Identity Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-1 liquid-panel overflow-hidden flex flex-col p-0 border-0 shadow-glass"
                >
                    <div className="h-40 bg-gradient-to-br from-primary/30 via-accent/20 to-surface relative border-b border-white/5">
                        <div className="absolute -bottom-12 left-6">
                            <div className="w-28 h-28 rounded-[1.25rem] bg-surface border-4 border-background flex items-center justify-center shadow-lg rotate-[4deg] hover:rotate-0 transition-transform duration-300">
                                <span className="text-5xl text-gradient font-bold">{user?.name?.charAt(0)}</span>
                            </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-background/50 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-2 shadow-sm">
                            <Trophy size={16} className="text-yellow-500" />
                            <span className="text-white text-xs font-bold tracking-tight">{user?.skillScore} Rep</span>
                        </div>
                    </div>
                    <div className="pt-16 px-6 pb-6 flex-1 flex flex-col gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-text-main tracking-tight">{user?.name}</h2>
                            <div className="flex items-center gap-2 text-primary font-medium text-sm mt-1 mb-2">
                                <GraduationCap size={18} />
                                <span>{user?.university || 'University Not Set'}</span>
                            </div>
                            <p className="text-sm text-muted">{user?.bio || 'You have not added a bio yet. Your bio helps matches know you better.'}</p>
                        </div>
                        <div className="w-full h-px bg-border my-2" />
                        <div className="flex-1 bg-primary/5 rounded-2xl p-4 border border-primary/10">
                            <h3 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                                <Sparkles size={16} /> AI Verification Factor
                            </h3>
                            <p className="text-xs text-muted leading-relaxed font-medium">
                                We scan your GitHub repositories with AI to verify coding skills. Verified maps push you up in the match algorithms by 3x.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Intelligent Skills Interface */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* Action Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="liquid-panel p-6"
                    >
                        <h2 className="text-xl font-bold text-text-main mb-5 flex items-center gap-2">
                            <Plus size={22} className="text-primary" /> Add Skill
                        </h2>
                        <form onSubmit={handleAddSkill} className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Code2 size={18} className="text-muted" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="e.g. Next.js, Python, Figma"
                                    className="input-liquid pl-12"
                                    value={newSkill.name}
                                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="relative min-w-[150px]">
                                <select
                                    className="input-liquid appearance-none pr-10 bg-surface!"
                                    value={newSkill.type}
                                    onChange={(e) => setNewSkill({ ...newSkill, type: e.target.value })}
                                >
                                    <option value="HAVE">Can Teach</option>
                                    <option value="WANT">Want to Learn</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                    <span className="text-muted text-[10px]">▼</span>
                                </div>
                            </div>
                            <button type="submit" className="btn-liquid px-6">
                                Add
                            </button>
                        </form>
                    </motion.div>

                    {/* Skill List View */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col gap-3"
                    >
                        <h2 className="text-lg font-bold text-text-main mt-2 mb-2 px-1">Portfolio Map</h2>

                        <AnimatePresence>
                            {skills.map((skill, i) => (
                                <motion.div
                                    key={skill.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="liquid-panel rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 overflow-hidden"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner-glow ${skill.type === 'HAVE' ? 'bg-secondary/10 text-secondary border border-secondary/20' : 'bg-accent/10 text-accent border border-accent/20'
                                            }`}>
                                            <Code2 size={26} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="text-text-main font-bold text-xl tracking-tight">{skill.name}</h3>
                                                {skill.verified && (
                                                    <span className="flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-secondary/15 text-secondary border border-secondary/20 shadow-sm">
                                                        <ShieldCheck size={12} strokeWidth={3} /> Verified
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-muted uppercase tracking-widest font-bold">
                                                {skill.type === 'HAVE' ? 'Teaching Output' : 'Learning Target'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t border-border md:border-t-0">
                                        {skill.type === 'HAVE' && !skill.verified && (
                                            <div className="flex flex-1 md:flex-none items-center gap-2 bg-background p-1.5 rounded-xl border border-border shadow-inner">
                                                <div className="px-2">
                                                    <Code size={18} className="text-muted" />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="github.com/user/repo"
                                                    className="bg-transparent border-none text-sm text-text-main focus:outline-none w-32 md:w-48 placeholder:text-muted/50 h-8"
                                                    value={githubUrl}
                                                    onChange={(e) => setGithubUrl(e.target.value)}
                                                />
                                                <button
                                                    disabled={isVerifying}
                                                    onClick={() => handleVerify(skill.id)}
                                                    className="btn-glass py-1.5 px-4 text-xs h-8 flex items-center"
                                                >
                                                    {isVerifying ? <Cpu className="animate-spin text-primary" size={16} /> : 'Verify'}
                                                </button>
                                            </div>
                                        )}
                                        <button
                                            onClick={async () => { await api.skills.delete(skill.id); setSkills(skills.filter(s => s.id !== skill.id)); }}
                                            className="p-3 rounded-xl bg-surface-hover hover:bg-red-500/10 text-muted hover:text-red-500 border border-transparent hover:border-red-500/20 transition-all flex-shrink-0"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {skills.length === 0 && (
                            <div className="p-10 liquid-panel border-dashed text-center flex flex-col items-center justify-center">
                                <Cpu size={40} className="text-muted mb-4 opacity-50" />
                                <h3 className="text-lg font-bold text-text-main mb-2">Portfolio Empty</h3>
                                <p className="text-muted text-sm max-w-sm">No skills found. Start adding skills above to enable the AI matching engine.</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
