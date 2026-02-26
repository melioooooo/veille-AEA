'use client';

import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Shield, Zap } from 'lucide-react';
import { NewsItem } from '@/lib/types';
import { useMemo } from 'react';

interface SWOTAnalysisProps {
    news: NewsItem[];
}

export default function SWOTAnalysis({ news }: SWOTAnalysisProps) {
    const swotData = useMemo(() => {
        const swot = {
            strengths: [] as string[],
            weaknesses: [] as string[],
            opportunities: [] as string[],
            threats: [] as string[],
        };

        // Use backend impactType for opportunities and threats
        for (const item of news) {
            const title = item.title;
            if (item.impactType === 'opportunity' && swot.opportunities.length < 4) {
                swot.opportunities.push(title);
            } else if (item.impactType === 'threat' && swot.threats.length < 4) {
                swot.threats.push(title);
            }
        }

        // Strengths & Weaknesses are internal factors — curated for AEA
        swot.strengths = [
            "Positionnement local fort en Alsace",
            "Communauté gaming engagée",
            "Outil de veille automatisé (avantage opérationnel)",
        ];
        swot.weaknesses = [
            "Dépendance aux éditeurs de jeux",
            "Coûts énergétiques élevés",
            "Marché local limité en taille",
        ];

        // Fallbacks if no news data
        if (swot.opportunities.length === 0) swot.opportunities = ["Diversification B2B", "Événementiel d'entreprise"];
        if (swot.threats.length === 0) swot.threats = ["Régulation accrue", "Volatilité du marché esport"];

        return swot;
    }, [news]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
            <div className="card p-4 bg-green-500/5 border-green-500/20">
                <div className="flex items-center gap-2 mb-3 text-green-500">
                    <Zap className="w-5 h-5" />
                    <h3 className="font-semibold">Forces (Strengths)</h3>
                </div>
                <ul className="space-y-2">
                    {swotData.strengths.map((item, i) => (
                        <li key={i} className="text-xs text-[#a1a1a1] list-disc ml-4">{item}</li>
                    ))}
                </ul>
            </div>

            <div className="card p-4 bg-red-500/5 border-red-500/20">
                <div className="flex items-center gap-2 mb-3 text-red-500">
                    <AlertTriangle className="w-5 h-5" />
                    <h3 className="font-semibold">Faiblesses (Weaknesses)</h3>
                </div>
                <ul className="space-y-2">
                    {swotData.weaknesses.map((item, i) => (
                        <li key={i} className="text-xs text-[#a1a1a1] list-disc ml-4">{item}</li>
                    ))}
                </ul>
            </div>

            <div className="card p-4 bg-blue-500/5 border-blue-500/20">
                <div className="flex items-center gap-2 mb-3 text-blue-500">
                    <TrendingUp className="w-5 h-5" />
                    <h3 className="font-semibold">Opportunités (Opportunities)</h3>
                </div>
                <ul className="space-y-2">
                    {swotData.opportunities.map((item, i) => (
                        <li key={i} className="text-xs text-[#a1a1a1] list-disc ml-4">{item}</li>
                    ))}
                </ul>
            </div>

            <div className="card p-4 bg-orange-500/5 border-orange-500/20">
                <div className="flex items-center gap-2 mb-3 text-orange-500">
                    <Shield className="w-5 h-5" />
                    <h3 className="font-semibold">Menaces (Threats)</h3>
                </div>
                <ul className="space-y-2">
                    {swotData.threats.map((item, i) => (
                        <li key={i} className="text-xs text-[#a1a1a1] list-disc ml-4">{item}</li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}
