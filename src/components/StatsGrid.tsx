'use client';

import { motion } from 'framer-motion';
import { Newspaper, TrendingUp, Layers, Activity } from 'lucide-react';
import { DashboardStats } from '@/lib/types';

interface StatsGridProps {
    stats: DashboardStats;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.08,
            type: "spring" as const,
            stiffness: 400,
            damping: 25,
        }
    })
};

const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: (i: number) => ({
        scale: 1,
        rotate: 0,
        transition: {
            delay: i * 0.08 + 0.1,
            type: "spring" as const,
            stiffness: 500,
            damping: 20,
        }
    })
};

export default function StatsGrid({ stats }: StatsGridProps) {
    const getCategoryLabel = (category: string) => {
        const labels: Record<string, string> = {
            industry: 'Industrie',
            business: 'Business',
            tech: 'Tech',
            regulation: 'Réglementation',
            local: 'Local',
        };
        return labels[category] || category;
    };

    const statCards = [
        {
            label: 'Articles',
            value: stats.totalNews,
            icon: Newspaper,
        },
        {
            label: 'Cette semaine',
            value: stats.newsToday,
            icon: Activity,
        },
        {
            label: 'Top catégorie',
            value: getCategoryLabel(stats.topCategories[0]?.category || 'N/A'),
            icon: TrendingUp,
        },
        {
            label: 'Catégories',
            value: stats.topCategories.length,
            icon: Layers,
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
            {statCards.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    whileHover={{
                        y: -2,
                        transition: { type: "spring", stiffness: 400 }
                    }}
                    className="card p-3 sm:p-4"
                >
                    <div className="flex items-center gap-3">
                        <motion.div
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={iconVariants}
                            whileHover={{
                                rotate: 10,
                                scale: 1.1,
                                transition: { type: "spring", stiffness: 400 }
                            }}
                            className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1a1a1a]"
                        >
                            <stat.icon className="w-4 h-4 text-[#666]" />
                        </motion.div>
                        <div>
                            <motion.p
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.08 + 0.15 }}
                                className="text-lg sm:text-xl font-semibold tracking-tight"
                            >
                                {stat.value}
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.08 + 0.2 }}
                                className="text-xs text-[#666]"
                            >
                                {stat.label}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
