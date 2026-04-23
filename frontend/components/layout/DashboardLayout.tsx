"use client";

import React from 'react';
import Sidebar from './Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary/30 selection:text-white">
            {/* Sidebar Component */}
            <Sidebar />

            {/* Main Work Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden relative">
                <div className="flex-1 w-full max-w-[1400px] mx-auto p-4 md:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full"
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
