'use client';

import { motion } from 'framer-motion';
import { NewsItem } from '@/lib/types';
import { useMemo } from 'react';
import { Radar } from 'lucide-react';

interface PESTELRadarProps {
    news: NewsItem[];
}

export default function PESTELRadar({ news }: PESTELRadarProps) {
    const pestelData = useMemo(() => {
        const counts = {
            'Politique': 0,
            'Économique': 0,
            'Social': 0,
            'Technologique': 0,
            'Environnemental': 0,
            'Légal': 0,
        };

        // Map backend pestelCategory to display labels
        const categoryMap: Record<string, keyof typeof counts> = {
            'politique': 'Politique',
            'economique': 'Économique',
            'social': 'Social',
            'technologique': 'Technologique',
            'environnemental': 'Environnemental',
            'legal': 'Légal',
        };

        news.forEach(item => {
            if (item.pestelCategory && categoryMap[item.pestelCategory]) {
                counts[categoryMap[item.pestelCategory]]++;
            } else {
                // Fallback for old items without pestelCategory
                const text = (item.title + ' ' + item.description).toLowerCase();
                const keywords: Record<keyof typeof counts, string[]> = {
                    'Politique': ['politique', 'gouvernement', 'état', 'ministère', 'subvention'],
                    'Économique': ['économie', 'marché', 'financement', 'investissement', 'croissance'],
                    'Social': ['social', 'jeunes', 'inclusion', 'communauté', 'audience'],
                    'Technologique': ['tech', 'ia', 'ai', 'virtuel', 'innovation', 'hardware'],
                    'Environnemental': ['écologie', 'durable', 'carbone', 'énergie', 'rse'],
                    'Légal': ['loi', 'règle', 'juridique', 'régulation', 'décret', 'rgpd'],
                };
                for (const [category, words] of Object.entries(keywords)) {
                    if (words.some(w => text.includes(w))) {
                        counts[category as keyof typeof counts]++;
                        break;
                    }
                }
            }
        });

        const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;

        return Object.entries(counts).map(([category, count]) => ({
            category,
            count,
            percentage: Math.round((count / total) * 100)
        }));
    }, [news]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-5"
        >
            <div className="flex items-center gap-2 mb-6">
                <Radar className="w-4 h-4 text-[#8b5cf6]" />
                <h2 className="text-sm font-medium">Analyse PESTEL</h2>
            </div>

            <div className="space-y-4">
                {pestelData.map((item, index) => (
                    <div key={item.category} className="group">
                        <div className="flex justify-between items-center mb-1 text-xs">
                            <span className="text-[#a1a1a1] group-hover:text-white transition-colors">
                                {item.category}
                            </span>
                            <span className="font-medium">{item.count} articles</span>
                        </div>
                        <div className="h-1.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.max(item.percentage, 5)}%` }} // Min 5% for visibility
                                transition={{ duration: 1, delay: index * 0.1 }}
                                className={`h-full rounded-full ${item.category === 'Technologique' ? 'bg-blue-500' :
                                    item.category === 'Économique' ? 'bg-emerald-500' :
                                        item.category === 'Légal' ? 'bg-red-500' :
                                            item.category === 'Social' ? 'bg-yellow-500' :
                                                item.category === 'Environnemental' ? 'bg-green-500' :
                                                    'bg-purple-500'
                                    }`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 p-3 bg-[rgba(255,255,255,0.03)] rounded-lg">
                <p className="text-[10px] text-[#666] leading-snug">
                    Cette analyse répartit les articles de veille selon les 6 piliers PESTEL pour identifier les facteurs d'influence majeurs sur la période.
                </p>
            </div>
        </motion.div>
    );
}
