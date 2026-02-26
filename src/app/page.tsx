'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { format, isAfter, subDays, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Sparkles, Calendar as CalendarIcon, BarChart3,
  Bookmark, Bell, Download, FileText, FileSpreadsheet, Clock
} from 'lucide-react';

import Header from '@/components/Header';
import StatsGrid from '@/components/StatsGrid';
import RecommendationCard from '@/components/RecommendationCard';
import NewsFeed from '@/components/NewsFeed';
import SourcesPanel from '@/components/SourcesPanel';
import CompetitorsPanel from '@/components/CompetitorsPanel';
import EsportsCalendar from '@/components/EsportsCalendar';
import SearchFilters, { FilterState } from '@/components/SearchFilters';
import BookmarksPanel from '@/components/BookmarksPanel';
import TrendingTopics from '@/components/TrendingTopics';
import CompetitorTimeline from '@/components/CompetitorTimeline';
import MarketAnalysis from '@/components/MarketAnalysis';
import ROICalculator from '@/components/ROICalculator';
import AlertSettings from '@/components/AlertSettings';
import ThemeToggle from '@/components/ThemeToggle';
import HistoryPanel from '@/components/HistoryPanel';
import PESTELRadar from '@/components/PESTELRadar';
import SWOTAnalysis from '@/components/SWOTAnalysis';

import { NewsItem, NewsSource, DashboardStats } from '@/lib/types';
import { COMPETITORS } from '@/lib/config';
import { ESPORTS_EVENTS_2026 } from '@/lib/events';
import { exportToCSV, exportToPDF } from '@/lib/export';

interface DashboardData {
  news: NewsItem[];
  recommendations: NewsItem[];
  sources: NewsSource[];
  stats: DashboardStats;
}

type TabId = 'news' | 'calendar' | 'analytics' | 'history';

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15 }
  }
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('news');
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    dateRange: 'all',
    categories: [],
    sources: [],
    minScore: 0,
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/news');
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Erreur lors du chargement');
      }
    } catch (err) {
      setError('Impossible de se connecter au serveur');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter news based on current filters
  const filteredNews = useMemo(() => {
    if (!data) return [];

    let items = [...data.news];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      items = items.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      );
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const cutoff = filters.dateRange === 'today' ? subDays(now, 1) :
        filters.dateRange === 'week' ? subDays(now, 7) :
          subMonths(now, 1);
      items = items.filter(item => isAfter(new Date(item.pubDate), cutoff));
    }

    // Category filter
    if (filters.categories.length > 0) {
      items = items.filter(item => filters.categories.includes(item.sourceCategory));
    }

    // Score filter
    if (filters.minScore > 0) {
      items = items.filter(item => item.score >= filters.minScore);
    }

    return items;
  }, [data, filters]);

  const filteredRecommendations = useMemo(() => {
    if (!data) return [];
    return data.recommendations.filter(item => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!item.title.toLowerCase().includes(searchLower)) return false;
      }
      if (filters.minScore > 0 && item.score < filters.minScore) return false;
      return true;
    });
  }, [data, filters]);

  const availableCategories = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.news.map(n => n.sourceCategory))];
  }, [data]);

  const trendingTexts = useMemo(() => {
    if (!data) return [];
    return data.news.map(n => `${n.title} ${n.description}`);
  }, [data]);

  const formatLastUpdate = (isoDate: string) => {
    try {
      return format(new Date(isoDate), "dd MMM 'à' HH:mm", { locale: fr });
    } catch {
      return 'Inconnu';
    }
  };

  const handleExport = (type: 'pdf' | 'csv') => {
    if (!data) return;
    if (type === 'csv') {
      exportToCSV([...data.recommendations, ...filteredNews]);
    } else {
      exportToPDF([...data.recommendations, ...filteredNews], data.stats);
    }
    setShowExportMenu(false);
  };

  const handleKeywordClick = (keyword: string) => {
    setFilters(prev => ({ ...prev, search: keyword }));
    setActiveTab('news');
  };

  if (isLoading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
          className="text-center"
        >
          <motion.div
            className="loader mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
          <p className="text-sm text-[#666]">Chargement...</p>
        </motion.div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="text-center card p-8"
        >
          <p className="text-[#f87171] mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={fetchData}
            className="btn btn-secondary"
          >
            Réessayer
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!data) return null;

  const tabs = [
    { id: 'news' as const, label: 'Veille', icon: Sparkles },
    { id: 'calendar' as const, label: 'Calendrier', icon: CalendarIcon },
    { id: 'analytics' as const, label: 'Analyse', icon: BarChart3 },
    { id: 'history' as const, label: 'Historique', icon: Clock },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-3 sm:p-6 max-w-7xl mx-auto safe-area-x"
    >
      {/* Header with extra actions */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
        <Header
          lastUpdate={formatLastUpdate(data.stats.lastUpdate)}
          isLoading={isLoading}
          onRefresh={fetchData}
          sourcesCount={data.sources.length}
        />

        <div className="flex items-center gap-2 sm:mt-6">
          <ThemeToggle />

          {/* Bookmarks */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowBookmarks(!showBookmarks)}
            className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${showBookmarks ? 'bg-[#d4a574]/10 text-[#d4a574]' : 'bg-[#0a0a0a] text-[#666] hover:text-white'
              }`}
          >
            <Bookmark className="w-4 h-4" />
          </motion.button>

          {/* Alerts */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAlerts(!showAlerts)}
            className={`flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${showAlerts ? 'bg-[#fbbf24]/10 text-[#fbbf24]' : 'bg-[#0a0a0a] text-[#666] hover:text-white'
              }`}
          >
            <Bell className="w-4 h-4" />
          </motion.button>

          {/* Export */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0a0a0a] text-[#666] hover:text-white transition-colors"
            >
              <Download className="w-4 h-4" />
            </motion.button>

            <AnimatePresence>
              {showExportMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded-lg overflow-hidden z-50"
                >
                  <button
                    onClick={() => handleExport('pdf')}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#1a1a1a] w-full text-left"
                  >
                    <FileText className="w-4 h-4" /> PDF
                  </button>
                  <button
                    onClick={() => handleExport('csv')}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-[#1a1a1a] w-full text-left"
                  >
                    <FileSpreadsheet className="w-4 h-4" /> CSV
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bookmarks / Alerts Overlay */}
      <AnimatePresence>
        {showBookmarks && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <BookmarksPanel onClose={() => setShowBookmarks(false)} />
          </motion.div>
        )}
        {showAlerts && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <AlertSettings onClose={() => setShowAlerts(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <StatsGrid stats={data.stats} />

      {/* Tab Navigation */}
      <LayoutGroup>
        <div className="scroll-x-mobile gap-1 mb-4 sm:mb-6 border-b border-[rgba(255,255,255,0.06)]">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-3 sm:px-4 py-3 text-sm font-medium whitespace-nowrap shrink-0"
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                animate={{ color: activeTab === tab.id ? '#fafafa' : '#666' }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 sm:gap-2"
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden xs:inline sm:inline">{tab.label}</span>
              </motion.span>

              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  transition={{ type: "spring" as const, stiffness: 500, damping: 35 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </LayoutGroup>

      <AnimatePresence mode="wait">
        {activeTab === 'news' && (
          <motion.div
            key="news"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Search & Filters */}
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableCategories={availableCategories}
            />

            {/* Recommendations — grouped by theme */}
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-sm font-medium">Recommandations</h2>
                <span className="badge badge-accent">{filteredRecommendations.length}</span>
              </div>
              {filteredRecommendations.length > 0 ? (
                (() => {
                  const groupConfig: { key: string; label: string; emoji: string; pestelCategories?: string[]; categories?: string[] }[] = [
                    { key: 'economique', label: 'Économique', emoji: '📊', pestelCategories: ['economique'] },
                    { key: 'technologique', label: 'Technologique', emoji: '💡', pestelCategories: ['technologique'] },
                    { key: 'legal', label: 'Réglementaire & Légal', emoji: '⚖️', pestelCategories: ['legal', 'politique'] },
                    { key: 'social', label: 'Social & Tendances', emoji: '👥', pestelCategories: ['social'] },
                    { key: 'environnemental', label: 'Environnemental', emoji: '🌱', pestelCategories: ['environnemental'] },
                    { key: 'other', label: 'Autres tendances', emoji: '📰' },
                  ];

                  const groups = groupConfig
                    .map(g => ({
                      ...g,
                      items: filteredRecommendations.filter(item => {
                        if (g.pestelCategories) {
                          return g.pestelCategories.includes(item.pestelCategory || '');
                        }
                        // 'other' group: items that don't match any PESTEL group
                        return !groupConfig.some(gc => gc.pestelCategories?.includes(item.pestelCategory || ''));
                      }),
                    }))
                    .filter(g => g.items.length > 0);

                  let globalIndex = 0;

                  return (
                    <div className="space-y-6">
                      {groups.map(group => (
                        <div key={group.key}>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm">{group.emoji}</span>
                            <h3 className="text-xs font-medium text-[#a1a1a1] uppercase tracking-wider">
                              {group.label}
                            </h3>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {group.items.map((item) => {
                              const idx = globalIndex++;
                              return <RecommendationCard key={item.id} item={item} index={idx} />;
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()
              ) : (
                <p className="text-sm text-[#666] py-4">Aucune recommandation trouvée</p>
              )}
            </section>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <NewsFeed news={filteredNews} />
              </div>
              <div className="space-y-4">
                <TrendingTopics texts={trendingTexts} onKeywordClick={handleKeywordClick} />
                <CompetitorsPanel competitors={COMPETITORS} />
                <SourcesPanel sources={data.sources} />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'calendar' && (
          <motion.div
            key="calendar"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <EsportsCalendar events={ESPORTS_EVENTS_2026} />
              </div>
              <div className="space-y-4">
                <CompetitorTimeline
                  competitors={COMPETITORS}
                  events={ESPORTS_EVENTS_2026}
                  news={data.news}
                />
                <CompetitorsPanel competitors={COMPETITORS} />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PESTELRadar news={data.news} />
              <SWOTAnalysis news={data.news} />
              <MarketAnalysis competitors={COMPETITORS} news={data.news} />
              <ROICalculator />
              <div className="lg:col-span-2">
                <CompetitorTimeline
                  competitors={COMPETITORS}
                  events={ESPORTS_EVENTS_2026}
                  news={data.news}
                />
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            key="history"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <HistoryPanel />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 sm:mt-12 pt-4 sm:pt-6 pb-4 text-center text-xs text-[#666] border-t border-[rgba(255,255,255,0.06)] safe-area-bottom"
      >
        <p>
          {data.sources.length} sources • {COMPETITORS.length} concurrents • {ESPORTS_EVENTS_2026.length} événements
        </p>
      </motion.footer>
    </motion.div>
  );
}
