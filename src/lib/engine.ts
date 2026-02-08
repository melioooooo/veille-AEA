import Parser from 'rss-parser';
import { NewsItem, NewsSource } from './types';
import { NEWS_SOURCES, FILTER_CONFIG, DASHBOARD_CONFIG } from './config';

const parser = new Parser({
    timeout: 10000,
    headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VeilleAEA/1.0)',
    },
});

// Generate a unique ID for news items
function generateId(title: string, source: string): string {
    const str = `${title}-${source}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

// Check if text contains blacklisted terms
function isBlacklisted(text: string): boolean {
    const lowerText = text.toLowerCase();
    return FILTER_CONFIG.blacklist.some(term => lowerText.includes(term.toLowerCase()));
}

// Calculate relevance score for a news item
function calculateScore(title: string, description: string, category: NewsSource['category']): number {
    const text = `${title} ${description}`.toLowerCase();
    let score = 10; // Base score

    // Apply keyword boosts
    for (const { keyword, weight } of FILTER_CONFIG.boostKeywords) {
        if (text.includes(keyword.toLowerCase())) {
            score += weight;
        }
    }

    // Apply category weight
    const categoryWeight = FILTER_CONFIG.categoryWeights[category] || 1;
    score *= categoryWeight;

    return Math.round(score);
}

// Generate business justification - WHY this is relevant for Alsace Esport Arena
function generateBusinessJustification(title: string, description: string): { insight: string; justification: string } {
    const text = `${title} ${description}`.toLowerCase();

    // Venue & Infrastructure
    if (text.includes('arena') || text.includes('venue') || text.includes('gaming center') || text.includes('lan center')) {
        return {
            insight: "Benchmark concurrentiel",
            justification: "Permet d'analyser les modèles opérationnels de structures similaires et d'identifier les meilleures pratiques à adapter pour optimiser l'expérience client et la rentabilité de l'Arena."
        };
    }

    // Revenue & Monetization
    if (text.includes('revenue') || text.includes('monetization') || text.includes('business model') || text.includes('subscription')) {
        return {
            insight: "Diversification des revenus",
            justification: "Opportunité d'explorer de nouvelles sources de revenus (abonnements, services premium, partenariats B2B) pour renforcer la stabilité financière et réduire la dépendance aux revenus traditionnels."
        };
    }

    // Regulation & Legal
    if (text.includes('regulation') || text.includes('réglementation') || text.includes('loi') || text.includes('law') || text.includes('legal')) {
        return {
            insight: "Veille réglementaire",
            justification: "Essentiel pour anticiper les évolutions légales impactant l'exploitation (restrictions d'âge, horaires, licences) et assurer la conformité de l'établissement."
        };
    }

    // Partnership & Sponsorship
    if (text.includes('partnership') || text.includes('partenariat') || text.includes('sponsoring') || text.includes('sponsor')) {
        return {
            insight: "Développement partenariats",
            justification: "Modèle de collaboration à étudier pour développer le réseau de sponsors et partenaires locaux/nationaux, augmentant la visibilité et les ressources de l'Arena."
        };
    }

    // Tournament & Events
    if (text.includes('tournament') || text.includes('tournoi') || text.includes('event') || text.includes('championship') || text.includes('league')) {
        return {
            insight: "Programmation événementielle",
            justification: "Format d'événement à considérer pour enrichir le calendrier de l'Arena, attirer de nouveaux publics et créer des temps forts de communication."
        };
    }

    // Cloud Gaming & Streaming
    if (text.includes('cloud gaming') || text.includes('streaming') || text.includes('geforce now') || text.includes('xbox cloud')) {
        return {
            insight: "Infrastructure technologique",
            justification: "Technologie à évaluer pour optimiser les coûts d'infrastructure hardware ou proposer de nouveaux services différenciants aux visiteurs."
        };
    }

    // VR/XR
    if (text.includes('vr') || text.includes('virtual reality') || text.includes('réalité virtuelle') || text.includes('xr') || text.includes('metaverse')) {
        return {
            insight: "Expériences immersives",
            justification: "Opportunité de diversification avec des expériences VR/XR exclusives, créant un avantage concurrentiel face au gaming à domicile."
        };
    }

    // Community & Audience
    if (text.includes('community') || text.includes('audience') || text.includes('engagement') || text.includes('viewership')) {
        return {
            insight: "Stratégie communautaire",
            justification: "Insights sur les méthodes d'engagement à appliquer pour fidéliser la communauté locale et développer une base de clients réguliers."
        };
    }

    // Corporate & Team Building
    if (text.includes('team building') || text.includes('corporate') || text.includes('enterprise') || text.includes('b2b')) {
        return {
            insight: "Offre entreprises",
            justification: "Segment B2B à fort potentiel : les activités corporate gaming permettent des marges supérieures et une utilisation optimale des créneaux hors-pic."
        };
    }

    // Market Growth & Investment
    if (text.includes('investment') || text.includes('funding') || text.includes('growth') || text.includes('market size') || text.includes('billion')) {
        return {
            insight: "Analyse de marché",
            justification: "Données stratégiques pour les business plans, les discussions avec investisseurs potentiels, et l'évaluation du positionnement de l'Arena sur le marché."
        };
    }

    // Hardware & Equipment
    if (text.includes('hardware') || text.includes('nvidia') || text.includes('amd') || text.includes('gpu') || text.includes('gaming pc')) {
        return {
            insight: "Veille équipements",
            justification: "Information à considérer pour la planification des investissements matériels et le maintien d'un parc machines compétitif."
        };
    }

    // Default
    return {
        insight: "Tendance sectorielle",
        justification: "Évolution du marché à surveiller pour adapter la stratégie de l'Arena et identifier les opportunités émergentes."
    };
}

// Extract relevant tags from content
function extractTags(title: string, description: string): string[] {
    const text = `${title} ${description}`.toLowerCase();
    const tags: string[] = [];

    const tagKeywords = [
        'esport', 'gaming', 'tournament', 'arena', 'streaming',
        'cloud gaming', 'vr', 'hardware', 'regulation', 'business',
        'france', 'investment', 'partnership', 'revenue',
        'community', 'event', 'sponsor', 'b2b'
    ];

    for (const keyword of tagKeywords) {
        if (text.includes(keyword)) {
            tags.push(keyword);
        }
    }

    return tags.slice(0, 4);
}

// Fetch news from a single RSS source
async function fetchFromSource(source: NewsSource): Promise<NewsItem[]> {
    try {
        const feed = await parser.parseURL(source.url);
        const items: NewsItem[] = [];

        for (const item of feed.items || []) {
            const title = item.title || '';
            const description = item.contentSnippet || item.content || '';

            // Skip blacklisted items
            if (isBlacklisted(title) || isBlacklisted(description)) {
                continue;
            }

            const score = calculateScore(title, description, source.category);
            const { insight, justification } = generateBusinessJustification(title, description);

            items.push({
                id: generateId(title, source.id),
                title,
                description: description.slice(0, 300) + (description.length > 300 ? '...' : ''),
                link: item.link || '',
                pubDate: item.pubDate || item.isoDate || new Date().toISOString(),
                source: source.name,
                sourceCategory: source.category,
                score,
                isRecommendation: false,
                tags: extractTags(title, description),
                businessInsight: insight,
                businessJustification: justification,
            });
        }

        return items;
    } catch (error) {
        console.error(`Error fetching from ${source.name}:`, error);
        return [];
    }
}

// Check if date is within the last 7 days
function isWithinLastWeek(dateString: string): boolean {
    const itemDate = new Date(dateString);
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return itemDate >= weekAgo;
}

// Fetch news from all enabled sources
export async function fetchAllNews(): Promise<NewsItem[]> {
    const enabledSources = NEWS_SOURCES.filter(s => s.enabled);
    const allItems: NewsItem[] = [];

    // Fetch from all sources in parallel
    const results = await Promise.allSettled(
        enabledSources.map(source => fetchFromSource(source))
    );

    for (const result of results) {
        if (result.status === 'fulfilled') {
            allItems.push(...result.value);
        }
    }

    // Sort by score (highest first)
    allItems.sort((a, b) => b.score - a.score);

    // Mark top items from this week as recommendations
    let recommendationsCount = 0;

    for (const item of allItems) {
        if (isWithinLastWeek(item.pubDate) && recommendationsCount < DASHBOARD_CONFIG.recommendationsPerWeek) {
            item.isRecommendation = true;
            recommendationsCount++;
        }
    }

    // If we don't have enough recommendations from this week, use top scoring items
    if (recommendationsCount < DASHBOARD_CONFIG.recommendationsPerWeek) {
        for (const item of allItems) {
            if (!item.isRecommendation && recommendationsCount < DASHBOARD_CONFIG.recommendationsPerWeek) {
                item.isRecommendation = true;
                recommendationsCount++;
            }
        }
    }

    return allItems.slice(0, DASHBOARD_CONFIG.maxNewsItems);
}

// Get weekly top recommendations
export function getRecommendations(news: NewsItem[]): NewsItem[] {
    return news.filter(item => item.isRecommendation).slice(0, DASHBOARD_CONFIG.recommendationsPerWeek);
}

// Get sources list
export function getSources(): NewsSource[] {
    return NEWS_SOURCES;
}
