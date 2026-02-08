'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Filter, X, ChevronDown } from 'lucide-react';

export interface FilterState {
    search: string;
    dateRange: 'all' | 'today' | 'week' | 'month';
    categories: string[];
    sources: string[];
    minScore: number;
}

interface SearchFiltersProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    availableCategories: string[];
    availableSources: string[];
}

const DATE_OPTIONS = [
    { value: 'all', label: 'Tout' },
    { value: 'today', label: "Aujourd'hui" },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
];

export default function SearchFilters({
    filters,
    onFiltersChange,
    availableCategories,
    availableSources,
}: SearchFiltersProps) {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    const toggleCategory = (cat: string) => {
        const cats = filters.categories.includes(cat)
            ? filters.categories.filter(c => c !== cat)
            : [...filters.categories, cat];
        updateFilter('categories', cats);
    };

    const activeFiltersCount = [
        filters.search,
        filters.dateRange !== 'all',
        filters.categories.length > 0,
        filters.sources.length > 0,
        filters.minScore > 0,
    ].filter(Boolean).length;

    const clearFilters = () => {
        onFiltersChange({
            search: '',
            dateRange: 'all',
            categories: [],
            sources: [],
            minScore: 0,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
        >
            {/* Search Bar */}
            <div className="flex gap-2 mb-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666]" />
                    <input
                        type="text"
                        placeholder="Rechercher dans les actualités..."
                        value={filters.search}
                        onChange={(e) => updateFilter('search', e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-lg text-sm placeholder:text-[#666] focus:outline-none focus:border-[#d4a574]/50 transition-colors"
                    />
                    {filters.search && (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            onClick={() => updateFilter('search', '')}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            <X className="w-4 h-4 text-[#666] hover:text-white" />
                        </motion.button>
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-colors ${showAdvanced || activeFiltersCount > 0
                            ? 'bg-[#d4a574]/10 text-[#d4a574]'
                            : 'bg-[#0a0a0a] text-[#666] hover:text-white'
                        }`}
                >
                    <Filter className="w-4 h-4" />
                    <span>Filtres</span>
                    {activeFiltersCount > 0 && (
                        <span className="px-1.5 py-0.5 bg-[#d4a574] text-black text-[10px] rounded-full font-medium">
                            {activeFiltersCount}
                        </span>
                    )}
                    <motion.div
                        animate={{ rotate: showAdvanced ? 180 : 0 }}
                        transition={{ type: "spring" as const, stiffness: 400 }}
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.div>
                </motion.button>
            </div>

            {/* Advanced Filters */}
            <AnimatePresence>
                {showAdvanced && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 bg-[#0a0a0a] rounded-lg border border-[rgba(255,255,255,0.06)] space-y-4">
                            {/* Date Range */}
                            <div>
                                <label className="text-xs text-[#666] mb-2 block">
                                    <Calendar className="w-3 h-3 inline mr-1" />
                                    Période
                                </label>
                                <div className="flex gap-2 flex-wrap">
                                    {DATE_OPTIONS.map(opt => (
                                        <motion.button
                                            key={opt.value}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => updateFilter('dateRange', opt.value as FilterState['dateRange'])}
                                            className={`px-3 py-1.5 rounded text-xs transition-colors ${filters.dateRange === opt.value
                                                    ? 'bg-white text-black'
                                                    : 'bg-[#141414] text-[#a1a1a1] hover:text-white'
                                                }`}
                                        >
                                            {opt.label}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <label className="text-xs text-[#666] mb-2 block">Catégories</label>
                                <div className="flex gap-2 flex-wrap">
                                    {availableCategories.map(cat => (
                                        <motion.button
                                            key={cat}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => toggleCategory(cat)}
                                            className={`px-3 py-1.5 rounded text-xs transition-colors ${filters.categories.includes(cat)
                                                    ? 'bg-[#d4a574] text-black'
                                                    : 'bg-[#141414] text-[#a1a1a1] hover:text-white'
                                                }`}
                                        >
                                            {cat}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Score Threshold */}
                            <div>
                                <label className="text-xs text-[#666] mb-2 flex items-center justify-between">
                                    <span>Score minimum</span>
                                    <span className="text-white font-medium">{filters.minScore}</span>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    value={filters.minScore}
                                    onChange={(e) => updateFilter('minScore', parseInt(e.target.value))}
                                    className="w-full accent-[#d4a574]"
                                />
                            </div>

                            {/* Clear Filters */}
                            {activeFiltersCount > 0 && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={clearFilters}
                                    className="w-full py-2 text-xs text-[#f87171] hover:bg-[#f87171]/10 rounded transition-colors"
                                >
                                    Effacer tous les filtres
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
