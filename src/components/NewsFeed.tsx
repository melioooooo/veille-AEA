'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Newspaper } from 'lucide-react';
import { NewsItem } from '@/lib/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface NewsFeedProps {
    news: NewsItem[];
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.02,
            delayChildren: 0.1,
        }
    }
} as const;

const itemVariant = {
    hidden: { opacity: 0, x: -10 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 500,
            damping: 30,
        }
    }
} as const;

export default function NewsFeed({ news }: NewsFeedProps) {
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

    // Filter out recommendations
    const feedNews = news.filter(item => !item.isRecommendation);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
            }}
            className="card p-3 sm:p-5"
        >
            <motion.div
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <motion.div
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.15 }}
                >
                    <Newspaper className="w-4 h-4 text-[#666]" />
                </motion.div>
                <h2 className="text-sm font-medium">Fil d&apos;actualités</h2>
                <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-xs text-[#666]"
                >
                    ({feedNews.length})
                </motion.span>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-1 max-h-[70vh] overflow-y-auto pr-1 sm:pr-2"
            >
                {feedNews.map((newsItem) => {
                    const formattedDate = (() => {
                        try {
                            return format(new Date(newsItem.pubDate), 'dd MMM', { locale: fr });
                        } catch {
                            return '';
                        }
                    })();

                    return (
                        <motion.article
                            key={newsItem.id}
                            variants={itemVariant}
                            whileHover={{
                                backgroundColor: 'rgba(255,255,255,0.03)',
                                x: 4,
                                transition: { type: "spring", stiffness: 400, damping: 25 }
                            }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => window.open(newsItem.link, '_blank')}
                            className="p-3 rounded-lg cursor-pointer group"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm line-clamp-1 group-hover:text-[#d4a574] transition-colors duration-200">
                                        {newsItem.title}
                                    </h3>
                                    <p className="text-xs text-[#666] mt-1 line-clamp-1">
                                        {newsItem.description}
                                    </p>
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                    whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    <ArrowUpRight className="w-3.5 h-3.5 text-[#666] shrink-0 mt-0.5" />
                                </motion.div>
                            </div>

                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <span className={`badge text-[10px] py-0 ${getCategoryClass(newsItem.sourceCategory)}`}>
                                    {newsItem.sourceCategory}
                                </span>
                                {newsItem.pestelCategory && (
                                    <span className="text-[10px] px-1.5 py-0 rounded bg-[rgba(139,92,246,0.1)] text-[#a78bfa]">
                                        {newsItem.pestelCategory}
                                    </span>
                                )}
                                {newsItem.impactType && newsItem.impactType !== 'neutral' && (
                                    <span className={`text-[10px] ${newsItem.impactType === 'opportunity' ? 'text-emerald-400' : 'text-red-400'
                                        }`}>
                                        {newsItem.impactType === 'opportunity' ? '↗' : '↘'}
                                    </span>
                                )}
                                <span className="text-[10px] text-[#666]">{newsItem.source}</span>
                                <span className="text-[10px] text-[#666]">•</span>
                                <span className="text-[10px] text-[#666]">{formattedDate}</span>
                                <motion.span
                                    whileHover={{ scale: 1.15 }}
                                    className="flex items-center gap-1 ml-auto"
                                >
                                    {newsItem.relevance && (
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${newsItem.relevance === 'high' ? 'bg-emerald-400' :
                                                    newsItem.relevance === 'medium' ? 'bg-amber-400' :
                                                        'bg-[#444]'
                                                }`}
                                            title={
                                                newsItem.relevance === 'high' ? 'Très pertinent pour AEA' :
                                                    newsItem.relevance === 'medium' ? 'Pertinence modérée' :
                                                        'Pertinence faible'
                                            }
                                        />
                                    )}
                                    <span className={`text-[10px] ${newsItem.score >= 30 ? 'text-[#4ade80]' :
                                        newsItem.score >= 20 ? 'text-[#fbbf24]' :
                                            'text-[#666]'
                                        }`}
                                    >
                                        {newsItem.score}
                                    </span>
                                </motion.span>
                            </div>
                        </motion.article>
                    );
                })}

                {feedNews.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-8 text-[#666] text-sm"
                    >
                        Aucune actualité disponible
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
