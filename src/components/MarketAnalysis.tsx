'use client';

import { motion } from 'framer-motion';
import { Target, Check, X, AlertCircle } from 'lucide-react';
import { Competitor } from '@/lib/config';

interface MarketAnalysisProps {
    competitors: Competitor[];
}

// Feature categories and items for market analysis
const FEATURE_MATRIX = {
    'Services': [
        { id: 'pc-gaming', label: 'PC Gaming', icon: '🖥️' },
        { id: 'console', label: 'Consoles', icon: '🎮' },
        { id: 'vr', label: 'Réalité virtuelle', icon: '🥽' },
        { id: 'streaming', label: 'Studio streaming', icon: '📺' },
        { id: 'sim-racing', label: 'Sim Racing', icon: '🏎️' },
    ],
    'Équipements': [
        { id: 'high-end-pc', label: 'PC Haut de gamme', icon: '💻' },
        { id: 'peripherals', label: 'Périphériques pro', icon: '🎧' },
        { id: 'bootcamp', label: 'Salle bootcamp', icon: '🏆' },
    ],
    'Services+': [
        { id: 'bar', label: 'Bar/Restaurant', icon: '🍔' },
        { id: 'events', label: 'Événements esport', icon: '🎪' },
        { id: 'coaching', label: 'Coaching', icon: '📚' },
        { id: 'membership', label: 'Abonnements', icon: '💳' },
    ],
};

// Map competitor features to our matrix
function hasFeature(competitor: Competitor, featureId: string): boolean | null {
    const features = competitor.features?.map(f => f.toLowerCase()) || [];
    const desc = competitor.description.toLowerCase();

    const mappings: Record<string, string[]> = {
        'pc-gaming': ['pc', 'gaming', 'ordinateur'],
        'console': ['console', 'ps5', 'xbox', 'playstation', 'nintendo'],
        'vr': ['vr', 'réalité virtuelle', 'virtual'],
        'streaming': ['stream', 'twitch', 'studio'],
        'sim-racing': ['racing', 'simulation', 'sim'],
        'high-end-pc': ['haut de gamme', 'rtx', 'high-end', 'premium'],
        'peripherals': ['périphérique', 'casque', 'clavier', 'souris'],
        'bootcamp': ['bootcamp', 'équipe', 'team', 'esport'],
        'bar': ['bar', 'restaurant', 'snack', 'boisson'],
        'events': ['événement', 'tournoi', 'compétition', 'lan'],
        'coaching': ['coaching', 'formation', 'cours'],
        'membership': ['abonnement', 'membership', 'forfait'],
    };

    const keywords = mappings[featureId] || [];
    const text = `${features.join(' ')} ${desc}`;

    return keywords.some(kw => text.includes(kw)) ? true : null;
}

export default function MarketAnalysis({ competitors }: MarketAnalysisProps) {
    // Find gaps (features no competitor has)
    const gaps: string[] = [];

    for (const category of Object.values(FEATURE_MATRIX)) {
        for (const feature of category) {
            const anyHas = competitors.some(c => hasFeature(c, feature.id));
            if (!anyHas) {
                gaps.push(feature.label);
            }
        }
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
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" as const, stiffness: 500 }}
                >
                    <Target className="w-4 h-4 text-[#f87171]" />
                </motion.div>
                <h2 className="text-sm font-medium">Analyse de marché</h2>
            </div>

            {/* Feature Matrix */}
            <div className="overflow-x-auto mb-4">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="border-b border-[rgba(255,255,255,0.06)]">
                            <th className="text-left py-2 pr-4 text-[#666] font-medium">Service</th>
                            {competitors.slice(0, 4).map(c => (
                                <th key={c.id} className="text-center py-2 px-2 text-[#666] font-medium">
                                    {c.name.split(' ')[0]}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(FEATURE_MATRIX).map(([category, features]) => (
                            <>
                                <tr key={category}>
                                    <td colSpan={5} className="pt-3 pb-1 text-[10px] uppercase tracking-wider text-[#666]">
                                        {category}
                                    </td>
                                </tr>
                                {features.map((feature, fIndex) => (
                                    <motion.tr
                                        key={feature.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: fIndex * 0.02 }}
                                        className="border-b border-[rgba(255,255,255,0.03)]"
                                    >
                                        <td className="py-2 pr-4">
                                            <span className="mr-1">{feature.icon}</span>
                                            {feature.label}
                                        </td>
                                        {competitors.slice(0, 4).map(c => {
                                            const has = hasFeature(c, feature.id);
                                            return (
                                                <td key={c.id} className="text-center py-2">
                                                    {has === true ? (
                                                        <Check className="w-4 h-4 text-[#4ade80] mx-auto" />
                                                    ) : has === false ? (
                                                        <X className="w-4 h-4 text-[#f87171] mx-auto" />
                                                    ) : (
                                                        <span className="text-[#666]">—</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </motion.tr>
                                ))}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Market Gaps */}
            {gaps.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-3 rounded-lg bg-[#4ade80]/5 border border-[#4ade80]/20"
                >
                    <div className="flex items-center gap-2 text-[#4ade80] text-xs font-medium mb-2">
                        <AlertCircle className="w-3 h-3" />
                        Opportunités identifiées
                    </div>
                    <p className="text-xs text-[#a1a1a1]">
                        Services peu couverts par la concurrence : {gaps.join(', ')}
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}
