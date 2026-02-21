'use client';

import { RefreshCw, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
    lastUpdate: string;
    isLoading: boolean;
    onRefresh: () => void;
    sourcesCount: number;
}

export default function Header({ lastUpdate, isLoading, onRefresh, sourcesCount }: HeaderProps) {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
            }}
            className="flex items-center justify-between py-4 sm:py-6 mb-4 sm:mb-8 border-b border-[rgba(255,255,255,0.06)]"
        >
            <div className="flex items-center gap-3">
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                        delay: 0.1
                    }}
                    whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { type: "spring", stiffness: 400 }
                    }}
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1a1a1a]"
                >
                    <Zap className="w-4 h-4 text-[#d4a574]" />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                >
                    <h1 className="text-lg font-semibold tracking-tight">Veille Stratégique</h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        className="text-xs text-[#666]"
                    >
                        <a
                            href="https://alsacearena.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#a1a1a1] transition-colors duration-200"
                        >
                            Alsace Esport Arena
                        </a>
                    </motion.p>
                </motion.div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="hidden sm:flex items-center gap-4 text-xs text-[#666]"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        {sourcesCount} sources
                    </motion.span>
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="w-1 h-1 rounded-full bg-[#333]"
                    />
                    <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                    >
                        Mis à jour {lastUpdate}
                    </motion.span>
                </motion.div>

                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, type: "spring" }}
                    whileHover={{
                        scale: 1.03,
                        transition: { type: "spring", stiffness: 400 }
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onRefresh}
                    disabled={isLoading}
                    className="btn btn-secondary text-xs disabled:opacity-50"
                >
                    <motion.div
                        animate={isLoading ? { rotate: 360 } : { rotate: 0 }}
                        transition={isLoading ? { repeat: Infinity, duration: 1, ease: "linear" } : {}}
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                    </motion.div>
                    <span className="hidden sm:inline">Actualiser</span>
                </motion.button>
            </div>
        </motion.header>
    );
}
