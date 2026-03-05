import Parser from 'rss-parser';
import { NewsItem, NewsSource, PestelCategory, ImpactType, RelevanceTier } from './types';
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

// ============================================================
// AEA RELEVANCE DETECTION
// Determines how relevant an article is to AEA's business.
// This is the PRIMARY gate that prevents false positives.
// ============================================================

// Terms that prove direct AEA relevance (gaming venue / esport business)
const HIGH_RELEVANCE_TERMS = [
    'arena', 'gaming center', 'gaming centre', 'lan center', 'lan party',
    'gaming lounge', 'gaming cafe', 'cybercafé', 'bar esport', 'gaming bar',
    'salle de jeux', 'espace gaming', 'watch party', 'esport venue',
    'alsace', 'strasbourg',
    // Competitor names
    'espot', 'v.hive', 'team vitality', 'mces', 'lyon esport', 'gaming campus',
    'gaming house', 'meltdown',
    // Esport business specific
    'esport market', 'marché esport', 'esport industry', 'industrie esport',
    'france esports', 'fédération esport',
];

// Terms that indicate medium relevance (gaming/esport ecosystem)
const MEDIUM_RELEVANCE_TERMS = [
    'esport', 'e-sport', 'esports', 'gaming', 'gamer', 'lan',
    'cs2', 'counter-strike', 'valorant', 'vct', 'league of legends', 'lol',
    'lec', 'lfl', 'dota', 'roster', 'playoffs', 'grand final',
    'tournoi', 'tournament', 'compétition',
    'cloud gaming', 'vr gaming', 'réalité virtuelle', 'sim racing', 'simulateur',
    'pc gaming', 'gaming setup', 'gpu', 'nvidia', 'amd',
    'streaming', 'twitch', 'viewership',
    'sponsoring', 'sponsorship',
    'team building', 'corporate gaming',
    'gen z', 'jeu vidéo', 'jeux vidéo', 'video game', 'video games',
    'réglementation gaming', 'regulation gaming', 'mineurs',
    'gaming law', 'loi gaming', 'loi esport',
];

function calculateRelevance(text: string): RelevanceTier {
    const lower = text.toLowerCase();

    // Check for high relevance (direct AEA business)
    for (const term of HIGH_RELEVANCE_TERMS) {
        if (lower.includes(term)) return 'high';
    }

    // Check for medium relevance (gaming/esport ecosystem)
    let mediumHits = 0;
    for (const term of MEDIUM_RELEVANCE_TERMS) {
        if (lower.includes(term)) mediumHits++;
    }
    // Need at least 1 gaming/esport term to be considered medium
    if (mediumHits >= 1) return 'medium';

    return 'low';
}

// Calculate relevance score for a news item
function calculateScore(title: string, description: string, category: NewsSource['category'], relevance: RelevanceTier): number {
    const text = `${title} ${description}`.toLowerCase();
    let score = 10; // Base score

    // Apply keyword boosts
    for (const { keyword, weight } of FILTER_CONFIG.boostKeywords) {
        if (text.includes(keyword.toLowerCase())) {
            score += weight;
        }
    }

    // Apply penalty keywords (negative weights)
    for (const { keyword, weight } of FILTER_CONFIG.penaltyKeywords) {
        if (text.includes(keyword.toLowerCase())) {
            score += weight; // weight is negative
        }
    }

    // Ensure score doesn't go below 0
    score = Math.max(0, score);

    // Apply category weight
    const categoryWeight = FILTER_CONFIG.categoryWeights[category] || 1;
    score *= categoryWeight;

    // ===== RELEVANCE PENALTY =====
    // Articles with no gaming/esport connection get heavily penalized
    if (relevance === 'low') {
        score *= 0.3;
    } else if (relevance === 'medium') {
        score *= 0.85;
    }
    // high relevance = no penalty (1.0)

    return Math.round(score);
}

// Generate business justification - WHY this is relevant for Alsace Esport Arena
function generateBusinessJustification(title: string, description: string, sourceCategory: string, relevance: RelevanceTier): { insight: string; justification: string } {
    const text = `${title} ${description}`.toLowerCase();

    // If article has low relevance to AEA, don't generate a confident justification
    if (relevance === 'low') {
        return {
            insight: "Contexte général",
            justification: "Article d'actualité généraliste. Pertinence indirecte pour l'Arena — à considérer uniquement si un lien avec le gaming ou l'esport émerge."
        };
    }

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

    // Regulation & Legal — require gaming/esport context to avoid false positives
    const hasGamingContext = ['gaming', 'esport', 'jeu vidéo', 'jeux vidéo', 'mineurs'].some(t => text.includes(t));
    if (hasGamingContext && (text.includes('regulation') || text.includes('réglementation') || text.includes('loi') || text.includes('law') || text.includes('legal'))) {
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

    // Esport Competitions — require at least 1 esport-specific term in the text
    const esportSpecificTerms = ['cs2', 'counter-strike', 'valorant', 'vct', 'lec', 'lfl', 'lol',
        'league of legends', 'dota', 'roster', 'qualifier', 'playoffs', 'grand final',
        'esport', 'e-sport', 'esports', 'lan', 'gaming', 'gamer'];
    const esportHits = esportSpecificTerms.filter(term => text.includes(term)).length;
    if (esportHits >= 1 && (sourceCategory === 'esport' || esportHits >= 2)) {
        return {
            insight: "Programmation esport",
            justification: "Compétition ou actualité esport à suivre pour organiser des watch parties, tournois locaux ou événements thématiques à l'Arena. Opportunité de fédérer la communauté locale autour des grandes compétitions."
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
        justification: "Évolution du marché gaming/esport à surveiller pour adapter la stratégie de l'Arena et identifier les opportunités émergentes."
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

// Classify article into PESTEL axis based on content
function classifyPestel(title: string, description: string, sourceCategory: string): PestelCategory {
    const text = `${title} ${description}`.toLowerCase();

    // Keyword maps for each PESTEL axis (ordered by specificity)
    const pestelKeywords: Record<PestelCategory, string[]> = {
        'legal': [
            'loi', 'réglementation', 'régulation', 'juridique', 'droit', 'décret',
            'interdiction', 'rgpd', 'gdpr', 'restriction', 'légal', 'législation',
            'compliance', 'conformité', 'mineurs', 'age restriction', 'gaming law',
            'france esports', 'fédération',
        ],
        'politique': [
            'gouvernement', 'ministère', 'politique publique', 'subvention', 'état',
            'élection', 'public', 'municipalité', 'collectivité', 'région',
            'politique', 'sénat', 'assemblée', 'mairie',
        ],
        'environnemental': [
            'écologie', 'rse', 'carbone', 'durable', 'énergie', 'climat',
            'sobriété énergétique', 'empreinte', 'green', 'recyclage',
            'environnement', 'planète',
        ],
        'social': [
            'gen z', 'millennials', 'jeunes', 'inclusion', 'diversité', 'mixité',
            'communauté', 'audience', 'comportement', 'habitudes', 'social',
            'santé mentale', 'éducation', 'femmes', 'accessibilité', 'engagement',
            'consumer', 'consommateur', 'tendance sociale',
        ],
        'technologique': [
            'ia', 'ai', 'intelligence artificielle', 'vr', 'réalité virtuelle',
            'cloud gaming', 'streaming', 'hardware', 'innovation', 'tech',
            'logiciel', 'blockchain', 'web3', '5g', 'gpu', 'nvidia', 'amd',
            'sim racing', 'simulateur', 'pc gaming', 'infrastructure',
        ],
        'economique': [
            'marché', 'financement', 'investissement', 'levée de fonds', 'revenue',
            'chiffre', 'croissance', 'inflation', 'budget', 'rentabilité',
            'business model', 'modèle économique', 'expansion', 'startup',
            'sponsoring', 'sponsorship', 'partenariat', 'partnership',
            'monetization', 'franchise', 'ouverture',
        ],
    };

    // Score each axis and pick the best match
    let bestCategory: PestelCategory = 'economique'; // default
    let bestScore = 0;

    for (const [category, keywords] of Object.entries(pestelKeywords) as [PestelCategory, string[]][]) {
        let score = 0;
        for (const kw of keywords) {
            if (text.includes(kw)) score++;
        }
        if (score > bestScore) {
            bestScore = score;
            bestCategory = category;
        }
    }

    // Fallback based on sourceCategory if no keyword matched
    if (bestScore === 0) {
        const sourceFallbacks: Record<string, PestelCategory> = {
            'tech': 'technologique',
            'business': 'economique',
            'regulation': 'legal',
            'esport': 'economique',
            'industry': 'economique',
            'local': 'social',
        };
        return sourceFallbacks[sourceCategory] || 'economique';
    }

    return bestCategory;
}

// Classify article impact as opportunity, threat, or neutral
// IMPORTANT: requires relevance gating — irrelevant articles are ALWAYS neutral
function classifyImpact(title: string, description: string, relevance: RelevanceTier): ImpactType {
    // Gate: if the article has no gaming/esport relevance, it cannot be a threat or opportunity for AEA
    if (relevance === 'low') return 'neutral';

    const text = `${title} ${description}`.toLowerCase();

    // Opportunity signals — focused on gaming/esport/venue context
    const opportunitySignals = [
        'croissance', 'growth', 'expansion', 'partenariat', 'partnership',
        'innovation', 'subvention', 'lancement',
        'ouverture', 'investissement', 'investment', 'funding', 'levée de fonds',
        'record', 'succès', 'success', 'hausse', 'augmentation',
        'opportunité', 'opportunity',
        'collaboration', 'sponsoring', 'sponsor',
    ];

    // Threat signals — removed overly generic terms like 'concurrence', 'competition', 'risk'
    const threatSignals = [
        'interdiction', 'ban',
        'baisse', 'decline', 'fermeture', 'shutdown', 'closing',
        'taxe', 'tax', 'procès', 'lawsuit',
        'amende', 'fine', 'restriction', 'pénurie', 'shortage',
        'crise', 'crisis', 'faillite', 'bankruptcy', 'licenciement',
        'perte', 'loss',
    ];

    let oppScore = 0;
    let threatScore = 0;

    for (const signal of opportunitySignals) {
        if (text.includes(signal)) oppScore++;
    }
    for (const signal of threatSignals) {
        if (text.includes(signal)) threatScore++;
    }

    // Require a minimum margin to avoid noisy classification
    if (oppScore > threatScore && oppScore >= 2) return 'opportunity';
    if (threatScore > oppScore && threatScore >= 2) return 'threat';
    // For medium-relevance articles, be more conservative
    if (relevance === 'medium') return 'neutral';
    // High relevance: allow single-signal classification
    if (oppScore > threatScore && oppScore >= 1) return 'opportunity';
    if (threatScore > oppScore && threatScore >= 1) return 'threat';
    return 'neutral';
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

            // Calculate AEA relevance FIRST — this gates everything else
            const fullText = `${title} ${description}`;
            const relevance = calculateRelevance(fullText);

            const score = calculateScore(title, description, source.category, relevance);

            // Skip articles below minimum relevance threshold
            if (score < FILTER_CONFIG.minimumScoreThreshold) {
                continue;
            }
            const { insight, justification } = generateBusinessJustification(title, description, source.category, relevance);
            const pestelCategory = classifyPestel(title, description, source.category);
            const impactType = classifyImpact(title, description, relevance);

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
                pestelCategory,
                impactType,
                relevance,
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

    // Category-balanced recommendations: pick top items per thematic group
    // Each group gets up to 2 recommendations, total capped by config
    const recoGroups: Record<string, string[]> = {
        business: ['business'],
        esport: ['esport'],
        tech: ['tech'],
        industry: ['industry', 'regulation', 'local'],
    };

    const groupCounts: Record<string, number> = {};
    const maxPerGroup = 2;
    let totalRecos = 0;
    const maxTotal = DASHBOARD_CONFIG.recommendationsPerWeek + 1; // allow 6 total for better coverage

    // First pass: recent items only (this week)
    for (const item of allItems) {
        if (totalRecos >= maxTotal) break;
        if (!isWithinLastWeek(item.pubDate)) continue;

        // Find which group this item belongs to
        const group = Object.entries(recoGroups).find(
            ([, cats]) => cats.includes(item.sourceCategory)
        )?.[0] || 'industry';

        if ((groupCounts[group] || 0) < maxPerGroup) {
            item.isRecommendation = true;
            groupCounts[group] = (groupCounts[group] || 0) + 1;
            totalRecos++;
        }
    }

    // Second pass: fill remaining slots from any category if needed
    if (totalRecos < maxTotal) {
        for (const item of allItems) {
            if (totalRecos >= maxTotal) break;
            if (item.isRecommendation) continue;

            const group = Object.entries(recoGroups).find(
                ([, cats]) => cats.includes(item.sourceCategory)
            )?.[0] || 'industry';

            if ((groupCounts[group] || 0) < maxPerGroup) {
                item.isRecommendation = true;
                groupCounts[group] = (groupCounts[group] || 0) + 1;
                totalRecos++;
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
