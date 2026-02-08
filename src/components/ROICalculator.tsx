'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Users, Ticket, Trophy } from 'lucide-react';

interface ROIInputs {
    tier: 'S' | 'A' | 'B' | 'C';
    capacity: number;
    ticketPrice: number;
    sponsorship: number;
    staffCost: number;
    equipmentCost: number;
    marketingCost: number;
}

// Average attendance rates by tier
const TIER_ATTENDANCE_RATES: Record<string, number> = {
    'S': 0.95,
    'A': 0.85,
    'B': 0.70,
    'C': 0.50,
};

const TIER_LABELS: Record<string, string> = {
    'S': 'Major (S-Tier)',
    'A': 'Premier (A-Tier)',
    'B': 'Challenger (B-Tier)',
    'C': 'Local (C-Tier)',
};

export default function ROICalculator() {
    const [inputs, setInputs] = useState<ROIInputs>({
        tier: 'B',
        capacity: 100,
        ticketPrice: 15,
        sponsorship: 2000,
        staffCost: 1500,
        equipmentCost: 500,
        marketingCost: 500,
    });

    const updateInput = <K extends keyof ROIInputs>(key: K, value: ROIInputs[K]) => {
        setInputs(prev => ({ ...prev, [key]: value }));
    };

    // Calculate projections
    const attendanceRate = TIER_ATTENDANCE_RATES[inputs.tier];
    const estimatedAttendance = Math.round(inputs.capacity * attendanceRate);
    const ticketRevenue = estimatedAttendance * inputs.ticketPrice;
    const totalRevenue = ticketRevenue + inputs.sponsorship;
    const totalCosts = inputs.staffCost + inputs.equipmentCost + inputs.marketingCost;
    const profit = totalRevenue - totalCosts;
    const roi = totalCosts > 0 ? ((profit / totalCosts) * 100) : 0;
    const revenuePerAttendee = estimatedAttendance > 0 ? totalRevenue / estimatedAttendance : 0;

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
                    <Calculator className="w-4 h-4 text-[#fbbf24]" />
                </motion.div>
                <h2 className="text-sm font-medium">Calculateur ROI</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Tier Selection */}
                <div className="col-span-2">
                    <label className="text-[10px] uppercase tracking-wider text-[#666] mb-2 block">
                        Type d&apos;événement
                    </label>
                    <div className="grid grid-cols-4 gap-1">
                        {(['S', 'A', 'B', 'C'] as const).map(tier => (
                            <motion.button
                                key={tier}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => updateInput('tier', tier)}
                                className={`px-3 py-2 rounded text-xs transition-colors ${inputs.tier === tier
                                        ? tier === 'S' ? 'bg-[#f87171]/20 text-[#f87171]' :
                                            tier === 'A' ? 'bg-[#fbbf24]/20 text-[#fbbf24]' :
                                                tier === 'B' ? 'bg-[#60a5fa]/20 text-[#60a5fa]' :
                                                    'bg-[#666]/20 text-[#666]'
                                        : 'bg-[#0a0a0a] text-[#666]'
                                    }`}
                            >
                                {tier}
                            </motion.button>
                        ))}
                    </div>
                    <p className="text-[10px] text-[#666] mt-1">{TIER_LABELS[inputs.tier]}</p>
                </div>

                {/* Inputs */}
                <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#666] mb-1 flex items-center gap-1">
                        <Users className="w-3 h-3" /> Capacité
                    </label>
                    <input
                        type="number"
                        value={inputs.capacity}
                        onChange={e => updateInput('capacity', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded text-sm"
                    />
                </div>

                <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#666] mb-1 flex items-center gap-1">
                        <Ticket className="w-3 h-3" /> Prix ticket (€)
                    </label>
                    <input
                        type="number"
                        value={inputs.ticketPrice}
                        onChange={e => updateInput('ticketPrice', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded text-sm"
                    />
                </div>

                <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#666] mb-1 flex items-center gap-1">
                        <Trophy className="w-3 h-3" /> Sponsoring (€)
                    </label>
                    <input
                        type="number"
                        value={inputs.sponsorship}
                        onChange={e => updateInput('sponsorship', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded text-sm"
                    />
                </div>

                <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#666] mb-1">
                        Staff (€)
                    </label>
                    <input
                        type="number"
                        value={inputs.staffCost}
                        onChange={e => updateInput('staffCost', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded text-sm"
                    />
                </div>

                <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#666] mb-1">
                        Équipement (€)
                    </label>
                    <input
                        type="number"
                        value={inputs.equipmentCost}
                        onChange={e => updateInput('equipmentCost', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded text-sm"
                    />
                </div>

                <div>
                    <label className="text-[10px] uppercase tracking-wider text-[#666] mb-1">
                        Marketing (€)
                    </label>
                    <input
                        type="number"
                        value={inputs.marketingCost}
                        onChange={e => updateInput('marketingCost', parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded text-sm"
                    />
                </div>
            </div>

            {/* Results */}
            <div className="p-4 rounded-lg bg-[#0a0a0a] space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-[#666]">Participants estimés</span>
                    <span className="text-sm font-medium">
                        {estimatedAttendance} <span className="text-[#666]">({Math.round(attendanceRate * 100)}%)</span>
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xs text-[#666]">Revenus billetterie</span>
                    <span className="text-sm">{ticketRevenue.toLocaleString()}€</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xs text-[#666]">Revenus totaux</span>
                    <span className="text-sm font-medium text-[#4ade80]">{totalRevenue.toLocaleString()}€</span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xs text-[#666]">Coûts totaux</span>
                    <span className="text-sm text-[#f87171]">-{totalCosts.toLocaleString()}€</span>
                </div>

                <div className="border-t border-[rgba(255,255,255,0.06)] pt-3 flex items-center justify-between">
                    <span className="text-xs font-medium">Profit net</span>
                    <span className={`text-lg font-semibold ${profit >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                        {profit >= 0 ? '+' : ''}{profit.toLocaleString()}€
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xs text-[#666] flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> ROI
                    </span>
                    <span className={`text-sm font-medium ${roi >= 0 ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                        {roi.toFixed(1)}%
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-xs text-[#666]">Revenu / participant</span>
                    <span className="text-sm">{revenuePerAttendee.toFixed(2)}€</span>
                </div>
            </div>
        </motion.div>
    );
}
