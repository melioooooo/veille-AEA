'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { NewsItem } from '@/lib/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface RecommendationCardProps {
    item: NewsItem;
    index: number;
}

export default function RecommendationCard({ item, index }: RecommendationCardProps) {
    const getCategoryClass = (category: string) => {
        const classes: Record<string, string> = {
            industry: 'cat-industry',
            business: 'cat-business',
            tech: 'cat-tech',
            regulation: 'cat-regulation',
            local: 'cat-local',
            esport: 'cat-esport',
        };
        return classes[category] || 'cat-industry';
    };

    const formattedDate = (() => {
        try {
            return format(new Date(item.pubDate), 'dd MMM', { locale: fr });
        } catch {
            return '';
        }
    })();

    return (
        <motion.article
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                delay: index * 0.08,
                type: "spring",
                stiffness: 400,
                damping: 30,
            }}
            whileHover={{
                y: -4,
                transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open(item.link, '_blank')}
            className="card p-5 cursor-pointer group"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <motion.div
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 + 0.1 }}
                >
                    <span className={`badge ${getCategoryClass(item.sourceCategory)}`}>
                        {item.sourceCategory}
                    </span>
                    <span className="text-xs text-[#666]">{formattedDate}</span>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                    whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    className="opacity-0 group-hover:opacity-100"
                >
                    <ArrowUpRight className="w-4 h-4 text-[#666]" />
                </motion.div>
            </div>

            {/* Title */}
            <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.08 + 0.15 }}
                className="text-sm font-medium leading-snug mb-2 line-clamp-2 group-hover:text-[#d4a574] transition-colors duration-300"
            >
                {item.title}
            </motion.h3>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.08 + 0.2 }}
                className="text-xs text-[#666] mb-4 line-clamp-2 leading-relaxed"
            >
                {item.description}
            </motion.p>

            {/* Business Insight */}
            {item.businessInsight && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 + 0.25, type: "spring" }}
                    whileHover={{ scale: 1.01 }}
                    className="insight-box p-3"
                >
                    <div className="flex items-start gap-2">
                        <motion.div
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                repeat: Infinity,
                                repeatDelay: 3,
                                duration: 0.5,
                            }}
                        >
                            <Sparkles className="w-3.5 h-3.5 text-[#d4a574] mt-0.5 shrink-0" />
                        </motion.div>
                        <div>
                            <p className="text-xs font-medium text-[#d4a574] mb-1">
                                {item.businessInsight}
                            </p>
                            {item.businessJustification && (
                                <p className="text-xs text-[#a1a1a1] leading-relaxed">
                                    {item.businessJustification}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Footer */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.08 + 0.3 }}
                className="flex items-center justify-between mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]"
            >
                <span className="text-xs text-[#666]">{item.source}</span>
                <motion.span
                    whileHover={{ scale: 1.1 }}
                    className={`text-xs font-medium ${item.score >= 30 ? 'text-[#4ade80]' :
                        item.score >= 20 ? 'text-[#fbbf24]' :
                            'text-[#666]'
                        }`}
                >
                    Score {item.score}
                </motion.span>
            </motion.div>
        </motion.article>
    );
}
