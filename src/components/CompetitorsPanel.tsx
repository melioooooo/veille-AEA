'use client';

import { motion } from 'framer-motion';
import { Building2, MapPin, ExternalLink } from 'lucide-react';
import { Competitor } from '@/lib/config';

interface CompetitorsPanelProps {
    competitors: Competitor[];
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.03,
            delayChildren: 0.1,
        }
    }
};

const itemVariant = {
    hidden: { opacity: 0, y: 10 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 400,
            damping: 25,
        }
    }
};

export default function CompetitorsPanel({ competitors }: CompetitorsPanelProps) {
    // Group by region
    const regions: Record<string, Competitor[]> = {
        'Paris / IDF': competitors.filter(c =>
            c.location.toLowerCase().includes('paris') ||
            c.location.toLowerCase().includes('idf') ||
            c.location.toLowerCase().includes('levallois') ||
            c.location.toLowerCase().includes('bussy')
        ),
        'Lyon': competitors.filter(c => c.location.toLowerCase().includes('lyon')),
        'Marseille': competitors.filter(c => c.location.toLowerCase().includes('marseille')),
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: 0.15
            }}
            className="card p-5"
        >
            <motion.div
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.25 }}
                >
                    <Building2 className="w-4 h-4 text-[#666]" />
                </motion.div>
                <h2 className="text-sm font-medium">Concurrence</h2>
                <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-xs text-[#666]"
                >
                    ({competitors.length})
                </motion.span>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4 max-h-[400px] overflow-y-auto pr-1"
            >
                {Object.entries(regions).map(([region, regionCompetitors], regionIndex) => (
                    regionCompetitors.length > 0 && (
                        <motion.div
                            key={region}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 + regionIndex * 0.1 }}
                        >
                            <motion.p
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 + regionIndex * 0.1 }}
                                className="text-[10px] uppercase tracking-wider text-[#666] mb-2"
                            >
                                {region}
                            </motion.p>
                            <div className="space-y-2">
                                {regionCompetitors.map((competitor) => (
                                    <motion.div
                                        key={competitor.id}
                                        variants={itemVariant}
                                        whileHover={{
                                            backgroundColor: 'rgba(255,255,255,0.03)',
                                            x: 3,
                                            transition: { type: "spring", stiffness: 400, damping: 25 }
                                        }}
                                        whileTap={{ scale: 0.99 }}
                                        className="p-3 rounded-lg bg-[#0a0a0a] group"
                                    >
                                        <div className="flex items-start justify-between mb-1">
                                            <a
                                                href={competitor.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium group-hover:text-[#d4a574] transition-colors duration-200 flex items-center gap-1"
                                            >
                                                {competitor.name}
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                                                    whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
                                                    className="opacity-0 group-hover:opacity-100"
                                                >
                                                    <ExternalLink className="w-3 h-3" />
                                                </motion.div>
                                            </a>
                                            {competitor.size && (
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="text-[10px] text-[#666] bg-[#141414] px-1.5 py-0.5 rounded"
                                                >
                                                    {competitor.size}
                                                </motion.span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1 text-[10px] text-[#666] mb-2">
                                            <MapPin className="w-3 h-3" />
                                            {competitor.location}
                                        </div>

                                        <p className="text-xs text-[#666] leading-relaxed line-clamp-2">
                                            {competitor.description}
                                        </p>

                                        {competitor.features && competitor.features.length > 0 && (
                                            <motion.div
                                                className="flex flex-wrap gap-1 mt-2"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                {competitor.features.slice(0, 3).map((feature, i) => (
                                                    <motion.span
                                                        key={feature}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.05 * i }}
                                                        whileHover={{ scale: 1.05 }}
                                                        className="text-[10px] px-1.5 py-0.5 rounded bg-[#141414] text-[#a1a1a1]"
                                                    >
                                                        {feature}
                                                    </motion.span>
                                                ))}
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )
                ))}
            </motion.div>
        </motion.div>
    );
}
