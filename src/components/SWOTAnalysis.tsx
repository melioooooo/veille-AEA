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

        // Simplified keyword matching for demonstration
        // In a real app, this would use more advanced NLP or tagged data
        const keywords = {
            strengths: ['croissance', 'succès', 'partenariat', 'innovation', 'leader', 'profit'],
            weaknesses: ['baisse', 'perte', 'retard', 'fermeture', 'déficit', 'plainte'],
            opportunities: ['nouveau marché', 'expansion', 'fusions', 'tendance', 'jeunes', 'subvention'],
            threats: ['régulation', 'taxe', 'concurrence', 'inflation', 'interdiction', 'procès'],
        };

        const titles = news.map(n => n.title.toLowerCase());

        // Extract customized insights based on news content
        titles.forEach(title => {
            if (keywords.strengths.some(k => title.includes(k))) {
                if (swot.strengths.length < 3) swot.strengths.push(title);
            } else if (keywords.weaknesses.some(k => title.includes(k))) {
                if (swot.weaknesses.length < 3) swot.weaknesses.push(title);
            } else if (keywords.opportunities.some(k => title.includes(k))) {
                if (swot.opportunities.length < 3) swot.opportunities.push(title);
            } else if (keywords.threats.some(k => title.includes(k))) {
                if (swot.threats.length < 3) swot.threats.push(title);
            }
        });

        // Fallbacks if no news matches
        if (swot.strengths.length === 0) swot.strengths = ["Positionnement local fort", "Communauté engagée"];
        if (swot.weaknesses.length === 0) swot.weaknesses = ["Dépendance aux éditeurs de jeux", "Coûts énergétiques"];
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
