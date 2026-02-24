// Types for the Strategic Intelligence Dashboard

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  category: 'industry' | 'regulation' | 'tech' | 'business' | 'local' | 'esport';
  enabled: boolean;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  sourceCategory: NewsSource['category'];
  score: number;
  isRecommendation: boolean;
  tags: string[];
  businessInsight?: string;
  businessJustification?: string; // WHY this is relevant for Alsace Esport Arena
}

export interface DashboardStats {
  totalNews: number;
  newsToday: number;
  topCategories: { category: string; count: number }[];
  lastUpdate: string;
}

export interface FilterConfig {
  blacklist: string[];
  boostKeywords: { keyword: string; weight: number }[];
  categoryWeights: Record<string, number>;
}
