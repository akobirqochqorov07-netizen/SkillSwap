"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/providers/ThemeProvider';
import { useLanguage } from '@/lib/providers/LanguageProvider';
import { Settings as SettingsIcon, Moon, Sun, Monitor, Globe, Bell, Shield, Wallet } from 'lucide-react';

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const { locale, setLocale, t } = useLanguage();

    const themes = [
        { id: 'system', name: t('theme_system'), icon: Monitor },
        { id: 'light', name: t('theme_light'), icon: Sun },
        { id: 'dark', name: t('theme_dark'), icon: Moon },
    ];

    const languages = [
        { id: 'en', name: 'English', flag: '🇺🇸' },
        { id: 'uz', name: 'O\'zbekcha', flag: '🇺🇿' },
        { id: 'ru', name: 'Русский', flag: '🇷🇺' },
    ];

    const cardVariants: any = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <div className="flex flex-col gap-8 max-w-4xl mx-auto py-8">
            <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glass border border-white/20">
                    <SettingsIcon size={28} className="text-white" />
                </div>
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gradient mb-1">{t('settings')}</h1>
                    <p className="text-muted text-lg">Manage your app preferences and settings</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Theme Settings */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    className="liquid-panel p-6 flex flex-col gap-6"
                >
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Moon size={20} className="text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold">Appearance</h2>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        {themes.map((tItem) => (
                            <button
                                key={tItem.id}
                                onClick={() => setTheme(tItem.id as any)}
                                className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-300 ${theme === tItem.id
                                    ? 'bg-primary/10 border-primary text-primary shadow-[inset_0_0_0_1px_rgba(0,112,243,1)]'
                                    : 'bg-surface hover:bg-surface-hover border-border text-muted hover:text-text-main'
                                    }`}
                            >
                                <tItem.icon size={24} />
                                <span className="text-sm font-medium">{tItem.name}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Language Settings */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.1 }}
                    className="liquid-panel p-6 flex flex-col gap-6"
                >
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                        <div className="p-2 bg-accent/10 rounded-xl">
                            <Globe size={20} className="text-accent" />
                        </div>
                        <h2 className="text-xl font-semibold">Language</h2>
                    </div>
                    <div className="flex flex-col gap-3">
                        {languages.map((lang) => (
                            <button
                                key={lang.id}
                                onClick={() => setLocale(lang.id as any)}
                                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${locale === lang.id
                                    ? 'bg-accent/10 border-accent text-text-main shadow-soft'
                                    : 'bg-surface hover:bg-surface-hover border-border text-muted hover:text-text-main'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{lang.flag}</span>
                                    <span className={`font-semibold ${locale === lang.id ? 'text-accent' : ''}`}>
                                        {lang.name}
                                    </span>
                                </div>
                                {locale === lang.id && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(99,102,241,1)]" />
                                )}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Notification Setting Mock */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.2 }}
                    className="liquid-panel p-6 flex flex-col gap-6"
                >
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                        <div className="p-2 bg-rose-500/10 rounded-xl">
                            <Bell size={20} className="text-rose-500" />
                        </div>
                        <h2 className="text-xl font-semibold">Notifications</h2>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-text-main">Push Notifications</p>
                            <p className="text-sm text-muted">Receive matches and message alerts instantly.</p>
                        </div>
                        <div className="h-6 w-11 rounded-full bg-primary relative cursor-pointer shadow-inner-glow transition-colors">
                            <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform" />
                        </div>
                    </div>
                </motion.div>

                {/* Security Mock */}
                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 }}
                    className="liquid-panel p-6 flex flex-col gap-6"
                >
                    <div className="flex items-center gap-3 border-b border-border pb-4">
                        <div className="p-2 bg-secondary/10 rounded-xl">
                            <Shield size={20} className="text-secondary" />
                        </div>
                        <h2 className="text-xl font-semibold">Security</h2>
                    </div>
                    <button className="btn-glass w-full text-left justify-start">Change Password</button>
                    <button className="btn-glass w-full text-left justify-start">Two-Factor Authentication</button>
                </motion.div>
            </div>

            <div className="flex justify-end mt-4">
                <button className="btn-liquid">
                    <Wallet size={18} />
                    <span>{t('save')}</span>
                </button>
            </div>
        </div>
    );
}
