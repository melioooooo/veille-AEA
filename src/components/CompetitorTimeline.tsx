'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Calendar, Newspaper } from 'lucide-react';
import { Competitor } from '@/lib/config';
import { EsportsEvent } from '@/lib/events';
import { NewsItem } from '@/lib/types';
import { format, parseISO, isAfter, isBefore, addMonths } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TimelineEvent {
    id: string;
    date: string;
    type: 'event' | 'news';
    title: string;
    competitor?: string;
    color: string;
}

interface CompetitorTimelineProps {
    competitors: Competitor[];
    events: EsportsEvent[];
    news: NewsItem[];
}

const COMPETITOR_COLORS: Record<string, string> = {
    'meltdown': '#8b5cf6',
    'ltc': '#3b82f6',
    'gamepod': '#10b981',
    'comet': '#f59e0b',
    'default': '#666',
};

export default function CompetitorTimeline({ competitors, events, news }: CompetitorTimelineProps) {
    const timelineEvents = useMemo(() => {
        const items: TimelineEvent[] = [];
        const now = new Date();
        const futureLimit = addMonths(now, 6);
        const pastLimit = addMonths(now, -3);

        // Add esports events (France only, as they're most relevant)
        for (const event of events) {
            const eventDate = parseISO(event.startDate);
            if (isAfter(eventDate, pastLimit) && isBefore(eventDate, futureLimit)) {
                items.push({
                    id: `event-${event.id}`,
                    date: event.startDate,
                    type: 'event',
                    title: event.name,
                    color: '#d4a574',
                });
            }
        }

        // Add news that mention competitors
        for (const item of news.slice(0, 50)) {
            const titleLower = item.title.toLowerCase();
            for (const comp of competitors) {
                if (titleLower.includes(comp.name.toLowerCase())) {
                    items.push({
                        id: `news-${item.id}`,
                        date: item.pubDate,
                        type: 'news',
                        title: item.title,
                        competitor: comp.name,
                        color: COMPETITOR_COLORS[comp.id] || COMPETITOR_COLORS.default,
                    });
                    break;
                }
            }
        }

        return items.sort((a, b) => a.date.localeCompare(b.date));
    }, [competitors, events, news]);

    // Group by month
    const byMonth = useMemo(() => {
        const grouped: Record<string, TimelineEvent[]> = {};
        for (const item of timelineEvents) {
            const monthKey = format(parseISO(item.date), 'yyyy-MM');
            if (!grouped[monthKey]) grouped[monthKey] = [];
            grouped[monthKey].push(item);
        }
        return grouped;
    }, [timelineEvents]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
            className="card p-3 sm:p-5"
        >
            <div className="flex items-center gap-2 mb-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" as const, stiffness: 500 }}
                >
                    <GitBranch className="w-4 h-4 text-[#60a5fa]" />
                </motion.div>
                <h2 className="text-sm font-medium">Timeline</h2>
                <span className="text-xs text-[#666]">({timelineEvents.length})</span>
            </div>

            <div className="relative max-h-[400px] overflow-y-auto pr-2">
                {/* Timeline Line */}
                <div className="absolute left-3 top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]" />

                {Object.entries(byMonth).map(([monthKey, items], monthIndex) => (
                    <motion.div
                        key={monthKey}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: monthIndex * 0.1 }}
                        className="mb-4"
                    >
                        <div className="text-[10px] uppercase tracking-wider text-[#666] mb-2 pl-8">
                            {format(parseISO(`${monthKey}-01`), 'MMMM yyyy', { locale: fr })}
                        </div>

                        {items.map((item, itemIndex) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: monthIndex * 0.1 + itemIndex * 0.02 }}
                                className="relative pl-8 pb-3"
                            >
                                {/* Dot */}
                                <motion.div
                                    whileHover={{ scale: 1.5 }}
                                    className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full border-2 bg-black"
                                    style={{ borderColor: item.color }}
                                />

                                <div className="p-2 rounded-lg hover:bg-[#0a0a0a] transition-colors">
                                    <div className="flex items-center gap-2 text-[10px] text-[#666] mb-1">
                                        {item.type === 'event' ? (
                                            <Calendar className="w-3 h-3" />
                                        ) : (
                                            <Newspaper className="w-3 h-3" />
                                        )}
                                        <span>{format(parseISO(item.date), 'dd MMM', { locale: fr })}</span>
                                        {item.competitor && (
                                            <span
                                                className="px-1.5 py-0.5 rounded text-[9px]"
                                                style={{ backgroundColor: `${item.color}20`, color: item.color }}
                                            >
                                                {item.competitor}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs line-clamp-2">{item.title}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ))}

                {timelineEvents.length === 0 && (
                    <div className="text-center py-8 text-[#666] text-sm">
                        Aucun événement à afficher
                    </div>
                )}
            </div>
        </motion.div>
    );
}
