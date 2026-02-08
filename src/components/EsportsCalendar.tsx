'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Trophy, ChevronDown, Flag } from 'lucide-react';
import { EsportsEvent, EsportGame, GAME_INFO, getEventsByMonth, getEventsByGame, getFrenchEvents } from '@/lib/events';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

interface EsportsCalendarProps {
    events: EsportsEvent[];
}

type ViewMode = 'month' | 'game';

const eventVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.98 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.03,
            type: "spring" as const,
            stiffness: 400,
            damping: 25,
        }
    })
};

export default function EsportsCalendar({ events }: EsportsCalendarProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('month');
    const [showFranceOnly, setShowFranceOnly] = useState(false);
    const [expandedMonth, setExpandedMonth] = useState<string | null>(null);
    const [expandedGame, setExpandedGame] = useState<EsportGame | null>(null);

    const filteredEvents = showFranceOnly ? getFrenchEvents(events) : events;
    const eventsByMonth = getEventsByMonth(filteredEvents);
    const eventsByGame = getEventsByGame(filteredEvents);

    const getTierStyle = (tier: EsportsEvent['tier']) => {
        const styles: Record<string, string> = {
            'S': 'bg-[#f87171]/10 text-[#f87171]',
            'A': 'bg-[#fbbf24]/10 text-[#fbbf24]',
            'B': 'bg-[#60a5fa]/10 text-[#60a5fa]',
            'C': 'bg-[#666]/10 text-[#666]',
        };
        return styles[tier];
    };

    const formatMonth = (monthKey: string) => {
        const [year, month] = monthKey.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1, 1);
        return format(date, 'MMMM yyyy', { locale: fr });
    };

    const formatDateRange = (start: string, end: string) => {
        const startDate = parseISO(start);
        const endDate = parseISO(end);
        if (start === end) {
            return format(startDate, 'dd MMM', { locale: fr });
        }
        return `${format(startDate, 'dd')} - ${format(endDate, 'dd MMM', { locale: fr })}`;
    };

    const renderEvent = (event: EsportsEvent, index: number) => (
        <motion.div
            key={event.id}
            custom={index}
            variants={eventVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
                x: 3,
                backgroundColor: 'rgba(255,255,255,0.02)',
                transition: { type: "spring", stiffness: 400 }
            }}
            className={`p-3 rounded-lg bg-[#0a0a0a] ${event.isFrance ? 'border-l-2 border-l-[#4ade80]' : ''}`}
        >
            <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                    {event.isFrance && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, delay: index * 0.03 + 0.1 }}
                        >
                            <Flag className="w-3 h-3 text-[#4ade80]" />
                        </motion.div>
                    )}
                    <span className="text-sm font-medium">{event.name}</span>
                </div>
                <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 + 0.05 }}
                    className={`text-[10px] px-1.5 py-0.5 rounded ${getTierStyle(event.tier)}`}
                >
                    {event.tier}
                </motion.span>
            </div>

            <div className="flex items-center gap-3 text-[10px] text-[#666] mb-1">
                <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDateRange(event.startDate, event.endDate)}
                </span>
                <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                </span>
            </div>

            <div className="flex items-center gap-2">
                <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-[10px] px-1.5 py-0.5 rounded"
                    style={{
                        backgroundColor: `${GAME_INFO[event.game].color}15`,
                        color: GAME_INFO[event.game].color,
                    }}
                >
                    {GAME_INFO[event.game].label}
                </motion.span>
                {event.prizePool && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-1 text-[10px] text-[#4ade80]"
                    >
                        <Trophy className="w-3 h-3" />
                        {event.prizePool}
                    </motion.span>
                )}
            </div>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
            }}
            className="card p-5"
        >
            <motion.div
                className="flex items-center justify-between mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
            >
                <div className="flex items-center gap-2">
                    <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 500, delay: 0.15 }}
                    >
                        <Calendar className="w-4 h-4 text-[#d4a574]" />
                    </motion.div>
                    <h2 className="text-sm font-medium">Calendrier 2026</h2>
                    <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="text-xs text-[#666]"
                    >
                        ({filteredEvents.length})
                    </motion.span>
                </div>
            </motion.div>

            {/* Controls */}
            <motion.div
                className="flex items-center gap-2 mb-4 flex-wrap"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="flex rounded-lg bg-[#0a0a0a] p-0.5">
                    {(['month', 'game'] as const).map((mode) => (
                        <motion.button
                            key={mode}
                            onClick={() => setViewMode(mode)}
                            whileHover={{ backgroundColor: viewMode !== mode ? 'rgba(255,255,255,0.05)' : undefined }}
                            whileTap={{ scale: 0.97 }}
                            className={`px-3 py-1.5 rounded text-xs transition-colors ${viewMode === mode ? 'bg-[#1a1a1a] text-white' : 'text-[#666]'
                                }`}
                        >
                            {mode === 'month' ? 'Par mois' : 'Par jeu'}
                        </motion.button>
                    ))}
                </div>

                <motion.button
                    onClick={() => setShowFranceOnly(!showFranceOnly)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs transition-all ${showFranceOnly
                        ? 'bg-[#4ade80]/10 text-[#4ade80]'
                        : 'bg-[#0a0a0a] text-[#666] hover:text-white'
                        }`}
                >
                    <Flag className="w-3 h-3" />
                    France
                </motion.button>
            </motion.div>

            {/* Events */}
            <div className="space-y-1 max-h-[500px] overflow-y-auto pr-1">
                {viewMode === 'month' ? (
                    Object.entries(eventsByMonth)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([monthKey, monthEvents], idx) => (
                            <motion.div
                                key={monthKey}
                                className="rounded-lg overflow-hidden"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                            >
                                <motion.button
                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                                    whileTap={{ scale: 0.995 }}
                                    onClick={() => setExpandedMonth(expandedMonth === monthKey ? null : monthKey)}
                                    className="w-full flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg"
                                >
                                    <span className="text-sm capitalize">{formatMonth(monthKey)}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-[#666]">{monthEvents.length}</span>
                                        <motion.div
                                            animate={{ rotate: expandedMonth === monthKey ? 180 : 0 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        >
                                            <ChevronDown className="w-4 h-4 text-[#666]" />
                                        </motion.div>
                                    </div>
                                </motion.button>
                                <AnimatePresence>
                                    {expandedMonth === monthKey && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 35,
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-2 space-y-2">
                                                {monthEvents
                                                    .sort((a, b) => a.startDate.localeCompare(b.startDate))
                                                    .map((event, i) => renderEvent(event, i))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                ) : (
                    Object.entries(eventsByGame)
                        .filter(([, gameEvents]) => gameEvents && gameEvents.length > 0)
                        .sort(([, a], [, b]) => (b?.length || 0) - (a?.length || 0))
                        .map(([game, gameEvents], idx) => (
                            <motion.div
                                key={game}
                                className="rounded-lg overflow-hidden"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                            >
                                <motion.button
                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                                    whileTap={{ scale: 0.995 }}
                                    onClick={() => setExpandedGame(expandedGame === game ? null : game as EsportGame)}
                                    className="w-full flex items-center justify-between p-3 bg-[#0a0a0a] rounded-lg"
                                >
                                    <span
                                        className="text-sm"
                                        style={{ color: GAME_INFO[game as EsportGame].color }}
                                    >
                                        {GAME_INFO[game as EsportGame].label}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-[#666]">{gameEvents?.length || 0}</span>
                                        <motion.div
                                            animate={{ rotate: expandedGame === game ? 180 : 0 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                        >
                                            <ChevronDown className="w-4 h-4 text-[#666]" />
                                        </motion.div>
                                    </div>
                                </motion.button>
                                <AnimatePresence>
                                    {expandedGame === game && gameEvents && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                type: "spring",
                                                stiffness: 400,
                                                damping: 35,
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-2 space-y-2">
                                                {gameEvents
                                                    .sort((a, b) => a.startDate.localeCompare(b.startDate))
                                                    .map((event, i) => renderEvent(event, i))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))
                )}
            </div>
        </motion.div>
    );
}
