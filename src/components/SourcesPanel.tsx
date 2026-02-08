'use client';

import { motion } from 'framer-motion';
import { Rss, Check } from 'lucide-react';
import { NewsSource } from '@/lib/types';

interface SourcesPanelProps {
    sources: NewsSource[];
}

export default function SourcesPanel({ sources }: SourcesPanelProps) {
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

    // Group by category
    const grouped = sources.reduce((acc, source) => {
        if (!acc[source.category]) acc[source.category] = [];
        acc[source.category].push(source);
        return acc;
    }, {} as Record<string, NewsSource[]>);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="card p-5"
        >
            <div className="flex items-center gap-2 mb-4">
                <Rss className="w-4 h-4 text-[#666]" />
                <h2 className="text-sm font-medium">Sources</h2>
                <span className="text-xs text-[#666]">({sources.length})</span>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {Object.entries(grouped).map(([category, categorySources]) => (
                    <div key={category}>
                        <p className="text-[10px] uppercase tracking-wider text-[#666] mb-2">
                            {getCategoryLabel(category)}
                        </p>
                        <div className="space-y-1">
                            {categorySources.map((source) => (
                                <div
                                    key={source.id}
                                    className="flex items-center gap-2 py-1.5 px-2 rounded bg-[#0a0a0a]"
                                >
                                    <Check className="w-3 h-3 text-[#4ade80]" />
                                    <span className="text-xs text-[#a1a1a1] truncate">{source.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
