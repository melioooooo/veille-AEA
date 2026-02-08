'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
        if (stored) {
            setTheme(stored);
            document.documentElement.setAttribute('data-theme', stored);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    if (!mounted) return null;

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0a0a0a] hover:bg-[#1a1a1a] transition-colors"
            title={theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            >
                {theme === 'dark' ? (
                    <Moon className="w-4 h-4 text-[#666]" />
                ) : (
                    <Sun className="w-4 h-4 text-[#fbbf24]" />
                )}
            </motion.div>
        </motion.button>
    );
}
