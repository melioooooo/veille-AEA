// Types for the Strategic Intelligence Dashboard

// PESTEL classification axes
export type PestelCategory = 'politique' | 'economique' | 'social' | 'technologique' | 'environnemental' | 'legal';

// Impact qualification for strategic decision-making
export type ImpactType = 'opportunity' | 'threat' | 'neutral';

// How relevant this article is to AEA's business
export type RelevanceTier = 'high' | 'medium' | 'low';

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
  pestelCategory?: PestelCategory; // PESTEL axis classification
  impactType?: ImpactType; // Opportunity, threat, or neutral
  relevance?: RelevanceTier; // How relevant to AEA's business
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
  penaltyKeywords: { keyword: string; weight: number }[];
  categoryWeights: Record<string, number>;
  minimumScoreThreshold: number;
}
