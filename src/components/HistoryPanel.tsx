
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { NewsItem, DashboardStats } from '@/lib/types';
import RecommendationCard from './RecommendationCard';
import StatsGrid from './StatsGrid';

interface HistoryData {
    recommendations: NewsItem[];
    stats: DashboardStats;
}

export default function HistoryPanel() {
    const [dates, setDates] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [historyData, setHistoryData] = useState<HistoryData | null>(null);
    const [isLoadingDates, setIsLoadingDates] = useState(true);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch available dates on mount
    useEffect(() => {
        const fetchDates = async () => {
            try {
                const res = await fetch('/api/history');
                const result = await res.json();
                if (result.success) {
                    setDates(result.dates);
                } else {
                    setError('Impossible de charger l\'historique');
                }
            } catch (err) {
                setError('Erreur de connexion');
            } finally {
                setIsLoadingDates(false);
            }
        };
        fetchDates();
    }, []);

    // Fetch data when a date is selected
    useEffect(() => {
        if (!selectedDate) return;

        const fetchData = async () => {
            setIsLoadingData(true);
            setError(null);
            try {
                const res = await fetch(`/api/history?date=${selectedDate}`);
                const result = await res.json();
                if (result.success) {
                    setHistoryData(result.data);
                } else {
                    setError(result.error || 'Erreur lors du chargement des données');
                }
            } catch (err) {
                setError('Erreur de connexion');
            } finally {
                setIsLoadingData(false);
            }
        };
        fetchData();
    }, [selectedDate]);

    const formatDate = (dateStr: string) => {
        try {
            return format(new Date(dateStr), 'dd MMMM yyyy', { locale: fr });
        } catch {
            return dateStr;
        }
    };

    if (isLoadingDates) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="w-6 h-6 animate-spin text-[#d4a574]" />
            </div>
        );
    }

    if (dates.length === 0) {
        return (
            <div className="text-center p-8 text-[#666]">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Aucun historique disponible pour le moment.</p>
                <p className="text-xs mt-1">L'historique se construira au fil des jours.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar - Date List */}
            <div className="lg:col-span-1 space-y-2">
                <h3 className="text-sm font-medium text-[#666] mb-3 uppercase tracking-wider">Archives</h3>
                <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                    {dates.map((date) => (
                        <motion.button
                            key={date}
                            onClick={() => setSelectedDate(date)}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full text-left px-4 py-3 rounded-lg text-sm flex items-center justify-between transition-colors ${selectedDate === date
                                ? 'bg-[#d4a574]/10 text-[#d4a574] border border-[#d4a574]/20'
                                : 'hover:bg-[#1a1a1a] text-[#a1a1a1] border border-transparent'
                                }`}
                        >
                            <span className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(date)}
                            </span>
                            {selectedDate === date && <ChevronRight className="w-3.5 h-3.5" />}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Main Content - Selected Date Data */}
            <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                    {!selectedDate ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="h-full flex flex-col items-center justify-center text-[#666] min-h-[300px] border border-dashed border-[rgba(255,255,255,0.06)] rounded-xl"
                        >
                            <Calendar className="w-12 h-12 mb-4 opacity-20" />
                            <p>Sélectionnez une date pour voir l'historique</p>
                        </motion.div>
                    ) : isLoadingData ? (
                        <div className="flex justify-center p-12">
                            <Loader2 className="w-8 h-8 animate-spin text-[#d4a574]" />
                        </div>
                    ) : historyData ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Header for the historical view */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-white">
                                    Rapport du {formatDate(selectedDate)}
                                </h2>
                            </div>

                            {/* Stats Snapshot */}
                            <div className="opacity-80 scale-95 origin-top-left">
                                <StatsGrid stats={historyData.stats} />
                            </div>

                            {/* Recommendations Snapshot */}
                            <div>
                                <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4a574]" />
                                    Recommandations archivées
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {historyData.recommendations.map((item, index) => (
                                        <RecommendationCard key={item.id} item={item} index={index} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="text-center p-12 text-[#666]">
                            <p>{error || 'Données non disponibles'}</p>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
