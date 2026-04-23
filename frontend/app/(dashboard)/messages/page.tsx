"use client";

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { api } from '@/lib/api';
import { io, Socket } from 'socket.io-client';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Search, Phone, Video, Info, ArrowLeft, Users, Zap, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/providers/LanguageProvider';

function MessagesContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialMatchId = searchParams.get('matchId');
    const { t } = useLanguage();

    const [user, setUser] = useState<any>(null);
    const [contacts, setContacts] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMatch, setSelectedMatch] = useState<any | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const [loadingContacts, setLoadingContacts] = useState(true);

    const socketRef = useRef<Socket | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial Load - Get User and Matches (Contacts)
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const u = JSON.parse(localStorage.getItem('user') || '{}');
                setUser(u);

                const data = await api.matches.getMyMatches();
                // Filter only ACCEPTED matches to show as 'Contacts'
                const accepted = data.filter((m: any) => m.status === 'ACCEPTED');
                setContacts(accepted);

                if (initialMatchId) {
                    const matchToSelect = accepted.find((m: any) => m.id === initialMatchId);
                    if (matchToSelect) {
                        setSelectedMatch(matchToSelect);
                    }
                }
            } catch (err: any) {
                if (err.message === 'Unauthorized' || err.message === 'Something went wrong') {
                    router.push('/login');
                } else {
                    console.error("Failed to load contacts", err);
                }
            } finally {
                setLoadingContacts(false);
            }
        };

        loadInitialData();
    }, [initialMatchId]);

    // WebSocket Management
    useEffect(() => {
        if (!selectedMatch || !user) return;

        // Clear previous messages when switching contacts
        setMessages([]);

        // Initialize socket
        socketRef.current = io('http://localhost:3001');
        socketRef.current.emit('joinMatch', selectedMatch.id);

        socketRef.current.on('receiveMessage', (message) => {
            setMessages((prev) => {
                // Prevent duplicate generic appends if backend sends back the same message we just created optimistically (some architectures do this)
                if (prev.find(m => m.id === message.id)) return prev;
                return [...prev, message];
            });
        });

        // Some Backends send full history on join, or we can fetch via REST.
        // Assuming socket.on('history') exists or we fetch REST here if supported.
        // For now relying on standard flow.

        return () => {
            socketRef.current?.disconnect();
        };
    }, [selectedMatch, user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !user || !selectedMatch) return;

        const data = {
            matchId: selectedMatch.id,
            senderId: user.id,
            content: input,
        };

        // Optimistic UI update
        const tempMsg = { ...data, id: Date.now().toString(), createdAt: new Date() };
        setMessages(prev => [...prev, tempMsg]);

        socketRef.current?.emit('sendMessage', data);
        setInput('');
    };

    const getPartner = (match: any) => {
        return match.userAId === user?.id ? match.userB : match.userA;
    };

    const filteredContacts = contacts.filter(match => {
        const partner = getPartner(match);
        if (!partner) return false;
        return partner.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className="flex h-[calc(100vh-2rem)] bg-background rounded-[2rem] border border-border shadow-glass overflow-hidden my-4 relative">

            {/* Sidebar Data Layer (Contacts) */}
            <div className={`w-full md:w-[380px] flex-shrink-0 flex flex-col bg-surface-hover border-r border-border ${selectedMatch ? 'hidden md:flex' : 'flex'}`}>
                {/* Contacts Header */}
                <div className="p-6 pb-4 border-b border-border/50">
                    <div className="flex items-center justify-between mb-5">
                        <h1 className="text-2xl font-bold tracking-tight text-text-main">{t('messages')}</h1>
                        <button onClick={() => router.push('/dashboard')} className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors" title="Discover new contacts">
                            <Zap size={18} />
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                            <Search size={16} className="text-muted" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            className="w-full bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-main focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Contacts List */}
                <div className="flex-1 overflow-y-auto hide-scrollbar p-3 flex flex-col gap-1.5">
                    {loadingContacts ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="h-20 rounded-xl bg-surface animate-pulse" />
                        ))
                    ) : (
                        <AnimatePresence>
                            {filteredContacts.map(match => {
                                const partner = getPartner(match);
                                const isSelected = selectedMatch?.id === match.id;
                                return (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={match.id}
                                        onClick={() => setSelectedMatch(match)}
                                        className={`w-full text-left p-3 rounded-xl flex items-center gap-4 transition-all duration-300 relative overflow-hidden ${isSelected
                                            ? 'bg-primary/10 border border-primary/20 shadow-sm'
                                            : 'hover:bg-surface border border-transparent'
                                            }`}
                                    >
                                        {/* Contact Avatar */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center text-white font-bold text-lg shadow-md border border-white/10">
                                                {partner.name.charAt(0)}
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-background rounded-full"></div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-0.5">
                                                <h3 className={`font-bold truncate text-[15px] ${isSelected ? 'text-primary' : 'text-text-main'}`}>
                                                    {partner.name}
                                                </h3>
                                                <span className="text-[10px] uppercase font-bold text-muted whitespace-nowrap">Active</span>
                                            </div>
                                            <p className="text-xs text-muted truncate">{partner.university}</p>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </AnimatePresence>
                    )}

                    {!loadingContacts && filteredContacts.length === 0 && (
                        <div className="flex flex-col items-center justify-center mt-10 text-center p-4">
                            <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center mb-3">
                                <Users size={24} className="text-muted" />
                            </div>
                            <p className="text-sm text-text-main font-semibold mb-1">No contacts found</p>
                            <p className="text-xs text-muted">Use the Discover matched page to add peers to your network.</p>
                            <button onClick={() => router.push('/dashboard')} className="mt-4 btn-glass py-1.5 px-4 text-xs font-semibold">
                                Find Peers
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Chat Interface */}
            <div className={`flex-1 flex col relative bg-surface ${!selectedMatch ? 'hidden md:flex items-center justify-center' : 'flex flex-col'}`}>
                {!selectedMatch ? (
                    <div className="flex flex-col items-center justify-center text-center p-8 max-w-sm">
                        <div className="w-24 h-24 rounded-3xl bg-surface-hover border border-border shadow-glass flex items-center justify-center mb-6">
                            <Send size={40} className="text-primary opacity-80" />
                        </div>
                        <h2 className="text-2xl font-bold text-text-main mb-2">Your Messages</h2>
                        <p className="text-muted text-sm">Select a contact from the sidebar to start exchanging skills and ideas.</p>
                    </div>
                ) : (
                    <>
                        <header className="px-6 py-4 bg-surface-hover/80 backdrop-blur-xl border-b border-border flex items-center justify-between z-10 sticky top-0">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSelectedMatch(null)}
                                    className="md:hidden p-2 rounded-xl bg-surface border border-border text-text-main hover:bg-surface-hover"
                                >
                                    <ArrowLeft size={18} />
                                </button>
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center shadow-lg border border-white/20">
                                            <span className="text-white font-bold text-lg">{getPartner(selectedMatch).name.charAt(0)}</span>
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-surface rounded-full shadow-sm"></div>
                                    </div>
                                    <div className="flex flex-col">
                                        <h2 className="text-text-main font-bold text-[16px] leading-tight">
                                            {getPartner(selectedMatch).name}
                                        </h2>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                            <span className="text-[11px] text-emerald-500 font-bold uppercase tracking-wider">Online</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="p-2.5 rounded-xl hover:bg-white/5 text-muted hover:text-text-main transition-colors">
                                    <Phone size={20} />
                                </button>
                                <button className="p-2.5 rounded-xl hover:bg-white/5 text-muted hover:text-text-main transition-colors hidden sm:flex">
                                    <Video size={20} />
                                </button>
                                <div className="w-px h-6 bg-border mx-1" />
                                <button className="p-2.5 rounded-xl hover:bg-white/5 text-muted hover:text-text-main transition-colors">
                                    <Info size={20} />
                                </button>
                            </div>
                        </header>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-4 scroll-smooth bg-gradient-to-b from-background to-surface">
                            {messages.length === 0 && (
                                <div className="flex-1 flex flex-col items-center justify-center h-full">
                                    <div className="text-center p-8 liquid-panel max-w-sm rounded-[2rem]">
                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20 shadow-inner-glow">
                                            <span className="text-2xl">👋</span>
                                        </div>
                                        <h3 className="text-text-main font-bold mb-2">Say Hello!</h3>
                                        <p className="text-muted text-sm leading-relaxed">
                                            You are now connected with {getPartner(selectedMatch).name}. Start the conversation by discussing how you can exchange skills!
                                        </p>
                                    </div>
                                </div>
                            )}

                            <AnimatePresence initial={false}>
                                {messages.map((msg, index) => {
                                    const isMe = msg.senderId === user?.id;
                                    return (
                                        <motion.div
                                            key={msg.id || index}
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            layout
                                            className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                                        >
                                            <div
                                                className={`max-w-[85%] md:max-w-[70%] px-5 py-3.5 shadow-sm ${isMe
                                                    ? 'bg-primary text-white rounded-[1.25rem] rounded-tr-[0.25rem] shadow-[0_4px_12px_rgba(0,112,243,0.3)]'
                                                    : 'bg-surface-hover border border-border text-text-main rounded-[1.25rem] rounded-tl-[0.25rem]'
                                                    }`}
                                            >
                                                <p className="text-[15px] leading-relaxed break-words whitespace-pre-wrap">{msg.content}</p>
                                            </div>
                                            <div className="flex items-center gap-1 mt-1.5 px-2">
                                                <span className="text-[10px] text-muted font-semibold uppercase tracking-wider">
                                                    {new Date(msg.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                {isMe && <CheckCircle2 size={10} className="text-primary" />}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                            <div ref={messagesEndRef} className="h-1 text-transparent">-</div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 md:p-6 bg-surface-hover/80 backdrop-blur-xl border-t border-border mt-auto">
                            <form onSubmit={handleSendMessage} className="flex gap-3">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        className="w-full bg-surface border border-border rounded-2xl px-5 py-4 text-[15px] text-text-main placeholder:text-muted/60 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-inner-glow transition-all pr-12"
                                        placeholder={t('type_message')}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!input.trim()}
                                    className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-b from-primary to-[#0056b3] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_8px_16px_rgba(0,112,243,0.4)] hover:shadow-[0_12px_24px_rgba(0,112,243,0.6)] active:translate-y-1 group"
                                >
                                    <Send size={20} className="text-white ml-0.5 group-hover:scale-110 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function MessagesPage() {
    return (
        <React.Suspense fallback={<div className="flex h-full items-center justify-center p-8 liquid-panel"><div className="animate-pulse">Loading Messages...</div></div>}>
            <MessagesContent />
        </React.Suspense>
    );
}
