'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Hash } from 'lucide-react';
import { getTopKeywords, KeywordCount } from '@/lib/keywords';

interface TrendingTopicsProps {
    texts: string[];
    onKeywordClick?: (keyword: string) => void;
}

export default function TrendingTopics({ texts, onKeywordClick }: TrendingTopicsProps) {
    const keywords = useMemo(() => getTopKeywords(texts, 15), [texts]);

    if (keywords.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
            className="card p-5"
        >
            <div className="flex items-center gap-2 mb-4">
                <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring" as const, stiffness: 500 }}
                >
                    <TrendingUp className="w-4 h-4 text-[#4ade80]" />
                </motion.div>
                <h2 className="text-sm font-medium">Tendances</h2>
            </div>

            {/* Word Cloud */}
            <div className="flex flex-wrap gap-2 mb-4">
                {keywords.slice(0, 10).map((kw, index) => (
                    <WordBubble
                        key={kw.word}
                        keyword={kw}
                        index={index}
                        onClick={() => onKeywordClick?.(kw.word)}
                    />
                ))}
            </div>

            {/* Top Keywords List */}
            <div className="space-y-1">
                {keywords.slice(0, 5).map((kw, index) => (
                    <motion.div
                        key={kw.word}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 2 }}
                        onClick={() => onKeywordClick?.(kw.word)}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-[#0a0a0a] cursor-pointer group"
                    >
                        <div className="flex items-center gap-2">
                            <Hash className="w-3 h-3 text-[#666]" />
                            <span className="text-sm group-hover:text-[#d4a574] transition-colors">
                                {kw.word}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-[#0a0a0a] rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${kw.score * 100}%` }}
                                    transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                                    className="h-full bg-[#4ade80] rounded-full"
                                />
                            </div>
                            <span className="text-xs text-[#666] w-6 text-right">{kw.count}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

interface WordBubbleProps {
    keyword: KeywordCount;
    index: number;
    onClick?: () => void;
}

function WordBubble({ keyword, index, onClick }: WordBubbleProps) {
    // Size based on score (0.5 - 1.0 scale)
    const scale = 0.5 + keyword.score * 0.5;
    const fontSize = 10 + keyword.score * 6;

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03, type: "spring" as const, stiffness: 400 }}
            whileHover={{ scale: scale * 1.1, y: -2 }}
            whileTap={{ scale: scale * 0.95 }}
            onClick={onClick}
            className="px-3 py-1.5 rounded-full bg-[#0a0a0a] text-[#a1a1a1] hover:text-white hover:bg-[#1a1a1a] transition-colors"
            style={{ fontSize: `${fontSize}px` }}
        >
            {keyword.word}
        </motion.button>
    );
}
