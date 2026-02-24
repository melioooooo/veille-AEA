import { NewsSource, FilterConfig } from './types';

// ============================================
// RSS SOURCES - Industry News
// ============================================
export const NEWS_SOURCES: NewsSource[] = [
    // === ESPORT BUSINESS & INDUSTRY ===
    {
        id: 'esports-insider',
        name: 'Esports Insider',
        url: 'https://esportsinsider.com/feed/',
        category: 'business',
        enabled: true,
    },
    {
        id: 'gamesindustry',
        name: 'GamesIndustry.biz',
        url: 'https://www.gamesindustry.biz/feed',
        category: 'business',
        enabled: true,
    },
    {
        id: 'venturebeat-games',
        name: 'VentureBeat Gaming',
        url: 'https://venturebeat.com/category/games/feed/',
        category: 'business',
        enabled: true,
    },
    {
        id: 'gamedeveloper',
        name: 'Game Developer',
        url: 'https://www.gamedeveloper.com/rss.xml',
        category: 'business',
        enabled: true,
    },
    // NEW: Esport data & viewership analytics
    {
        id: 'esports-charts',
        name: 'Esports Charts',
        url: 'https://escharts.com/blog/rss',
        category: 'business',
        enabled: true,
    },
    // NEW: Esport news business-oriented
    {
        id: 'esports-net',
        name: 'Esports.net',
        url: 'https://www.esports.net/news/feed/',
        category: 'business',
        enabled: true,
    },
    // NEW: Data-driven esport tech & infrastructure
    {
        id: 'grid-esports',
        name: 'GRID Esports',
        url: 'https://grid.gg/blog/rss',
        category: 'business',
        enabled: true,
    },
    // NEW: Startup, levées de fonds gaming
    {
        id: 'techcrunch-gaming',
        name: 'TechCrunch Gaming',
        url: 'https://techcrunch.com/category/gaming/feed/',
        category: 'business',
        enabled: true,
    },

    // === TECHNOLOGY & INNOVATION ===
    {
        id: 'usine-digitale',
        name: 'Usine Digitale',
        url: 'https://www.usine-digitale.fr/rss',
        category: 'tech',
        enabled: true,
    },
    {
        id: 'the-verge-gaming',
        name: 'The Verge Gaming',
        url: 'https://www.theverge.com/rss/games/index.xml',
        category: 'tech',
        enabled: true,
    },
    {
        id: 'ars-technica-gaming',
        name: 'Ars Technica Gaming',
        url: 'https://feeds.arstechnica.com/arstechnica/gaming',
        category: 'tech',
        enabled: true,
    },
    // NEW: Innovation & tendances tech gaming
    {
        id: 'wired-gaming',
        name: 'Wired Gaming',
        url: 'https://www.wired.com/feed/tag/gaming/latest/rss',
        category: 'tech',
        enabled: true,
    },

    // === ESPORT COMPÉTITIONS ===
    {
        id: 'hltv',
        name: 'HLTV',
        url: 'https://www.hltv.org/rss/news',
        category: 'esport',
        enabled: true,
    },
    {
        id: 'vlr-gg',
        name: 'VLR.gg',
        url: 'https://vlr.gg/rss',
        category: 'esport',
        enabled: true,
    },
    {
        id: 'estnn',
        name: 'ESTNN',
        url: 'https://estnn.com/feed/',
        category: 'esport',
        enabled: true,
    },
    {
        id: 'win-gg',
        name: 'WIN.gg',
        url: 'https://win.gg/feed/',
        category: 'esport',
        enabled: true,
    },
    {
        id: 'dexerto',
        name: 'Dexerto',
        url: 'https://www.dexerto.com/feed/',
        category: 'esport',
        enabled: true,
    },
    {
        id: 'dot-esports',
        name: 'Dot Esports',
        url: 'https://dotesports.com/feed',
        category: 'esport',
        enabled: true,
    },

    // === ESPORT NEWS & COVERAGE ===
    {
        id: 'polygon',
        name: 'Polygon',
        url: 'https://www.polygon.com/rss/index.xml',
        category: 'industry',
        enabled: true,
    },
    // DISABLED: Very high volume, mostly consumer content (reviews, guides)
    {
        id: 'kotaku',
        name: 'Kotaku',
        url: 'https://kotaku.com/rss',
        category: 'industry',
        enabled: false,
    },
    {
        id: 'gamekult',
        name: 'Gamekult',
        url: 'https://www.gamekult.com/feed.xml',
        category: 'industry',
        enabled: true,
    },
    // DISABLED: Very high volume, mostly consumer content
    {
        id: 'ign',
        name: 'IGN',
        url: 'https://feeds.feedburner.com/ign/all',
        category: 'industry',
        enabled: false,
    },
    // DISABLED: Very high volume, mostly consumer content
    {
        id: 'gamespot',
        name: 'GameSpot',
        url: 'https://www.gamespot.com/feeds/mashup/',
        category: 'industry',
        enabled: false,
    },
    {
        id: 'pcgamer',
        name: 'PC Gamer',
        url: 'https://www.pcgamer.com/rss/',
        category: 'industry',
        enabled: true,
    },
    {
        id: 'eurogamer',
        name: 'Eurogamer',
        url: 'https://www.eurogamer.net/feed',
        category: 'industry',
        enabled: true,
    },
    // DISABLED: Mostly indie PC gaming, little esport relevance
    {
        id: 'rockpapershotgun',
        name: 'Rock Paper Shotgun',
        url: 'https://www.rockpapershotgun.com/feed',
        category: 'industry',
        enabled: false,
    },

    // === FRENCH SOURCES ===
    {
        id: 'numerama-tech',
        name: 'Numerama',
        url: 'https://www.numerama.com/feed/',
        category: 'tech',
        enabled: true,
    },
    {
        id: 'frandroid',
        name: 'Frandroid',
        url: 'https://www.frandroid.com/feed',
        category: 'tech',
        enabled: true,
    },
    // NEW: Seul média FR 100% esport business
    {
        id: '1pvfr',
        name: '1pv.fr',
        url: 'https://www.1pv.fr/feed/',
        category: 'business',
        enabled: true,
    },
    // NEW: Gros média FR esport — compétitions, transferts, scène FR
    {
        id: 'millenium',
        name: 'Millenium',
        url: 'https://www.millenium.org/rss/feed.xml',
        category: 'industry',
        enabled: true,
    },

    // === STREAMING & MEDIA DATA ===
    // NEW: Viewership analytics pour streaming & esport
    {
        id: 'streamhatchet',
        name: 'Stream Hatchet',
        url: 'https://streamhatchet.com/feed/',
        category: 'business',
        enabled: true,
    },
    // NEW: Market intelligence gaming global (Newzoo)
    {
        id: 'newzoo',
        name: 'Newzoo',
        url: 'https://newzoo.com/resources/blog/feed',
        category: 'business',
        enabled: true,
    },
];

// ============================================
// COMPETITOR GAMING CENTERS - France
// ============================================
export interface Competitor {
    id: string;
    name: string;
    location: string;
    website: string;
    socialLinks: {
        instagram?: string;
        twitter?: string;
        facebook?: string;
        linkedin?: string;
    };
    description: string;
    size?: string;
    features?: string[];
}

export const COMPETITORS: Competitor[] = [
    // === PARIS / ILE-DE-FRANCE ===
    {
        id: 'espot-paris',
        name: 'Espot Paris',
        location: 'Paris (face au Louvre)',
        website: 'https://espot.fr',
        socialLinks: {
            instagram: 'https://instagram.com/espotparis',
            twitter: 'https://twitter.com/EspotParis',
        },
        description: 'Plus grand espace gaming de Paris avec 2000m², 120+ PC, 50 consoles, simulateurs Alpine, arène 150 places',
        size: '2000m²',
        features: ['120+ PC', '50 consoles', 'Sim racing', 'Arène 150 places', '2 bars'],
    },
    {
        id: 'vhive-vitality',
        name: 'V.Hive (Team Vitality)',
        location: 'Paris',
        website: 'https://vitality.gg',
        socialLinks: {
            instagram: 'https://instagram.com/teamvitality',
            twitter: 'https://twitter.com/TeamVitality',
        },
        description: 'QG de Team Vitality - espace esport, cybercafé et events. Équipement haut de gamme, boutique Team Vitality',
        size: '1000m²',
        features: ['Cybercafé', 'Events esport', 'Boutique Vitality', 'Masterclasses'],
    },
    {
        id: 'esportbox-paris',
        name: 'eSportBox',
        location: 'Paris (plusieurs adresses)',
        website: 'https://esportbox.co',
        socialLinks: {
            instagram: 'https://instagram.com/esportbox',
        },
        description: 'Salles de gaming privées réservables à Paris. Concept de boxes privatifs',
        features: ['Boxes privatifs', 'Réservation en ligne', 'Multi-sites'],
    },
    {
        id: 'gaming-house-bussy',
        name: 'Gaming House',
        location: 'Bussy-Saint-Georges (IDF)',
        website: 'https://gaming-house.fr',
        socialLinks: {},
        description: 'Nouvel espace gaming ouvert en 2025 avec tournois, formations et café gaming. Héberge équipe Ici Japon Corp',
        features: ['Tournois', 'Formations', 'Café gaming', 'Équipe résidente'],
    },

    // === LYON ===
    {
        id: 'lyon-esport',
        name: 'Lyon e-Sport',
        location: 'Lyon',
        website: 'https://lyon-esport.fr',
        socialLinks: {
            twitter: 'https://twitter.com/LyoneSport',
            instagram: 'https://instagram.com/lyonesport',
        },
        description: 'Association organisatrice de LANs majeures à Lyon. Prochaine LAN: Nov 2025 (Valorant 15K€, SSBU 1.5K€)',
        features: ['LAN majeure annuelle', 'Tournois Valorant', 'Tournois SSBU'],
    },

    // === MARSEILLE ===
    {
        id: 'mces-gaming-center',
        name: 'MCES Gaming Center',
        location: 'Marseille (Sainte-Marthe)',
        website: 'https://mces.gg',
        socialLinks: {
            twitter: 'https://twitter.com/maboratory',
            instagram: 'https://instagram.com/maboratory',
        },
        description: 'Gaming center de MCES à Marseille avec PC gaming et événements réguliers',
        features: ['PC Gaming', 'Événements', 'Équipe pro MCES'],
    },
    {
        id: 'nexus-marseille',
        name: 'The Nexus',
        location: 'Marseille',
        website: 'https://thenexus.fr',
        socialLinks: {},
        description: 'Bar esport à Marseille avec PC, consoles et diffusion de compétitions',
        features: ['Bar', 'PC/Consoles', 'Diffusion compétitions'],
    },

    // === AUTRES RÉGIONS ===
    {
        id: 'webedia-gaming-house',
        name: 'Webedia Gaming House',
        location: 'Levallois-Perret',
        website: 'https://webedia-group.com',
        socialLinks: {},
        description: 'Studio gaming de Webedia avec streameurs et créateurs de contenu',
        features: ['Studio streaming', 'Créateurs contenu'],
    },
    {
        id: 'game-one-studio',
        name: 'Game One Studio',
        location: 'Paris',
        website: 'https://gameone.net',
        socialLinks: {
            twitter: 'https://twitter.com/GameOneTV',
        },
        description: 'Studio de la chaîne Game One avec événements et émissions gaming',
        features: ['Studio TV', 'Émissions gaming'],
    },
    {
        id: 'gaming-campus',
        name: 'Gaming Campus',
        location: 'Lyon, Paris',
        website: 'https://gamingcampus.fr',
        socialLinks: {
            instagram: 'https://instagram.com/gamingcampus',
        },
        description: 'École esport et gaming avec campus équipés et équipes étudiantes',
        features: ['Formation esport', 'Campus équipés', 'Équipes étudiantes'],
    },
    // === LILLE ===
    {
        id: 'hall-u-need-lille',
        name: 'Hall U Need',
        location: 'Saint-André-lez-Lille',
        website: 'https://halluneed.com',
        socialLinks: {
            instagram: 'https://instagram.com/halluneed',
            facebook: 'https://facebook.com/halluneed',
        },
        description: 'Complexe de loisirs indoor 7000m² avec arcade, bowling, VR, karaoké et restaurant-bar',
        size: '7000m²',
        features: ['Arcade', 'VR', 'Bowling', 'Restaurant', 'Bar', 'Karaoké'],
    },
    {
        id: 'atom-city-lille',
        name: 'Atom City',
        location: 'Lille',
        website: 'https://atom-city.fr',
        socialLinks: {
            facebook: 'https://facebook.com/atomcity.arcade',
        },
        description: 'Association dédiée à l\'arcade et au retrogaming, 150m² de bornes authentiques',
        size: '150m²',
        features: ['Arcade authentique', 'Retrogaming', 'Association'],
    },

    // === RENNES ===
    {
        id: 'station-35-rennes',
        name: 'Station 35',
        location: 'Rennes (Cesson-Sévigné)',
        website: 'https://stationesport.fr',
        socialLinks: {
            instagram: 'https://instagram.com/station35_esport',
        },
        description: 'Bar esport et gaming avec PC, consoles, et diffusion de matchs. Ambiance communautaire',
        features: ['Bar Esport', 'PC Gaming', 'Consoles', 'Tournois'],
    },
    {
        id: 'meltdown-rennes',
        name: 'Meltdown Rennes',
        location: 'Rennes',
        website: 'https://meltdown.bar/rennes',
        socialLinks: {
            facebook: 'https://facebook.com/MeltdownRennes',
        },
        description: 'Bar esport de la franchise Meltdown. Cocktails gaming et PC en libre accès',
        features: ['Bar Esport', 'PC Gaming', 'Cocktails'],
    },

    // === AIX-EN-PROVENCE ===
    {
        id: 'meltdown-aix',
        name: 'Meltdown Aix',
        location: 'Aix-en-Provence',
        website: 'https://meltdown.bar/aix',
        socialLinks: {
            facebook: 'https://facebook.com/MeltdownAix',
        },
        description: 'Bar esport au cœur d\'Aix. Soirées à thèmes et tournois fun',
        features: ['Bar Esport', 'PC Gaming', 'Soirées à thème'],
    },

    // === BORDEAUX ===
    {
        id: 'meltdown-bordeaux',
        name: 'Meltdown Bordeaux',
        location: 'Bordeaux',
        website: 'https://meltdown.bar/bordeaux',
        socialLinks: {},
        description: 'Bar esport incontournable à Bordeaux',
        features: ['Bar Esport', 'PC Gaming'],
    },
    {
        id: 'level-bar-bordeaux',
        name: 'Level Bar',
        location: 'Bordeaux',
        website: 'https://levelbar.fr',
        socialLinks: {},
        description: 'Bar gaming et culture geek. Jeux de société et jeux vidéo',
        features: ['Bar Gaming', 'Jeux de société', 'Consoles'],
    },

    // === TOULOUSE ===
    {
        id: 'meltdown-toulouse',
        name: 'Meltdown Toulouse',
        location: 'Toulouse',
        website: 'https://meltdown.bar/toulouse',
        socialLinks: {},
        description: 'Le spot esport de la ville rose',
        features: ['Bar Esport', 'PC Gaming'],
    },
    {
        id: 'games-factory-toulouse',
        name: 'Games Factory',
        location: 'Toulouse',
        website: 'https://gamesfactory.fr',
        socialLinks: {},
        description: 'Complexe multi-loisirs : Bowling, Laser Game, VR et Arcade',
        features: ['Bowling', 'Laser Game', 'VR', 'Arcade'],
    },
];

// ============================================
// FILTER CONFIGURATION
// ============================================
export const FILTER_CONFIG: FilterConfig = {
    // Terms to completely exclude
    // Terms to completely exclude
    blacklist: [
        'meltdown',
        'meltdown bar',
        'meltdown bars',
        'fortnite skin',
        'patch notes',
        'tier list',
        'build guide',
        'tier-list',
        'skin reveal',
        'battle pass',
        'season pass',
        'character unlock',
        'cosmetic',
        // New exclusions for better relevance
        'mod',
        'mods',
        'best mods',
        'nexus mod',
        'stardew valley',
        'elden ring',
        'pokemon',
        'guide',
        'walkthrough',
        'how to',
        'how-to',
        'soluce',
        'solution',
        'best deck',
        'meta deck',
        'free game',
        'giveaway',
        'deals',
        'sales',
        'discount',
        'bundle',
        'steam sale',
        'epic free',
        'twitch drop',
    ],

    // Keywords that boost relevance score for Alsace Esport Arena business
    boostKeywords: [
        // Direct Business Relevance
        { keyword: 'arena', weight: 20 },
        { keyword: 'alsace', weight: 25 },
        { keyword: 'strasbourg', weight: 20 },
        { keyword: 'gaming center', weight: 18 },
        { keyword: 'esport venue', weight: 18 },
        { keyword: 'lan center', weight: 15 },
        { keyword: 'lan party', weight: 12 },
        { keyword: 'gaming lounge', weight: 15 },
        { keyword: 'gaming cafe', weight: 15 },

        // Competitor mentions (for competitive intel)
        { keyword: 'espot', weight: 15 },
        { keyword: 'vitality', weight: 12 },
        { keyword: 'v.hive', weight: 15 },
        { keyword: 'mces', weight: 12 },
        { keyword: 'lyon esport', weight: 10 },
        { keyword: 'gaming campus', weight: 10 },

        // Business Strategy
        { keyword: 'revenue', weight: 12 },
        { keyword: 'business model', weight: 12 },
        { keyword: 'monetization', weight: 10 },
        { keyword: 'franchise', weight: 8 },
        { keyword: 'investissement', weight: 10 },
        { keyword: 'financement', weight: 10 },
        { keyword: 'levée de fonds', weight: 12 },
        { keyword: 'startup', weight: 8 },
        { keyword: 'expansion', weight: 10 },
        { keyword: 'market size', weight: 10 },
        { keyword: 'market growth', weight: 10 },
        { keyword: 'strategy', weight: 12 },
        { keyword: 'stratégie', weight: 12 },
        { keyword: 'management', weight: 10 },
        { keyword: 'gestion', weight: 10 },
        { keyword: 'model économique', weight: 15 },
        { keyword: 'rentabilité', weight: 15 },
        { keyword: 'profitability', weight: 15 },

        // Technology & Infrastructure
        { keyword: 'cloud gaming', weight: 12 },
        { keyword: 'game streaming', weight: 10 },
        { keyword: 'réalité virtuelle', weight: 8 },
        { keyword: 'vr gaming', weight: 10 },
        { keyword: 'xr', weight: 8 },
        { keyword: 'hardware', weight: 6 },
        { keyword: 'nvidia', weight: 5 },
        { keyword: 'amd', weight: 5 },
        { keyword: 'pc gaming', weight: 8 },
        { keyword: 'gaming setup', weight: 8 },
        { keyword: 'esport equipment', weight: 10 },

        // Regulation & Legal
        { keyword: 'réglementation', weight: 15 },
        { keyword: 'législation', weight: 15 },
        { keyword: 'regulation', weight: 12 },
        { keyword: 'mineurs', weight: 10 },
        { keyword: 'age restriction', weight: 10 },
        { keyword: 'france esports', weight: 15 },
        { keyword: 'fédération', weight: 10 },
        { keyword: 'gaming law', weight: 12 },

        // Market & Trends
        { keyword: 'market report', weight: 12 },
        { keyword: 'étude de marché', weight: 12 },
        { keyword: 'industry growth', weight: 10 },
        { keyword: 'audience growth', weight: 10 },
        { keyword: 'sponsoring', weight: 10 },
        { keyword: 'sponsorship', weight: 10 },
        { keyword: 'partnership', weight: 10 },
        { keyword: 'partenariat', weight: 10 },
        { keyword: 'viewership', weight: 8 },

        // Events & Community
        { keyword: 'tournament', weight: 8 },
        { keyword: 'tournoi', weight: 8 },
        { keyword: 'compétition', weight: 8 },
        { keyword: 'team building', weight: 15 },
        { keyword: 'corporate gaming', weight: 15 },
        { keyword: 'esport event', weight: 10 },
        { keyword: 'community', weight: 8 },
        { keyword: 'local esports', weight: 12 },
        { keyword: 'grassroots', weight: 10 },

        // Esport Compétitions
        { keyword: 'major', weight: 10 },
        { keyword: 'championship', weight: 10 },
        { keyword: 'qualifier', weight: 8 },
        { keyword: 'playoffs', weight: 10 },
        { keyword: 'grand final', weight: 12 },
        { keyword: 'roster', weight: 8 },
        { keyword: 'roster change', weight: 10 },
        { keyword: 'transfer', weight: 8 },
        { keyword: 'signed', weight: 6 },
        { keyword: 'benched', weight: 8 },
        { keyword: 'standings', weight: 6 },
        { keyword: 'bracket', weight: 6 },
        { keyword: 'counter-strike', weight: 10 },
        { keyword: 'cs2', weight: 10 },
        { keyword: 'valorant', weight: 10 },
        { keyword: 'league of legends', weight: 10 },
        { keyword: 'dota 2', weight: 8 },
        { keyword: 'champions tour', weight: 10 },
        { keyword: 'vct', weight: 10 },
        { keyword: 'blast', weight: 8 },
        { keyword: 'esl', weight: 8 },
        { keyword: 'iem', weight: 10 },
        { keyword: 'pgl', weight: 8 },
        { keyword: 'worlds', weight: 10 },
        { keyword: 'msi', weight: 8 },
        { keyword: 'lec', weight: 10 },
        { keyword: 'lfl', weight: 12 },
        { keyword: 'watch party', weight: 15 },

        // === PESTEL ANALYSIS KEYWORDS ===
        // Political & Legal
        { keyword: 'loi', weight: 15 },
        { keyword: 'légal', weight: 15 },
        { keyword: 'gdpr', weight: 12 },
        { keyword: 'rgpd', weight: 12 },
        { keyword: 'décret', weight: 12 },
        { keyword: 'subvention', weight: 12 },
        { keyword: 'politique publique', weight: 12 },

        // Economic
        { keyword: 'inflation', weight: 10 },
        { keyword: 'pouvoir d\'achat', weight: 10 },
        { keyword: 'crise économique', weight: 10 },
        { keyword: 'budget', weight: 8 },
        { keyword: 'rentabilité', weight: 10 },

        // Social & Consumer Insights
        { keyword: 'gen z', weight: 15 },
        { keyword: 'millennials', weight: 12 },
        { keyword: 'habitudes de consommation', weight: 15 },
        { keyword: 'comportement', weight: 12 },
        { keyword: 'tendance sociale', weight: 12 },
        { keyword: 'inclusion', weight: 12 },
        { keyword: 'diversité', weight: 12 },
        { keyword: 'mixité', weight: 12 },
        { keyword: 'santé mentale', weight: 12 },

        // Technological
        { keyword: 'ai', weight: 12 },
        { keyword: 'ia', weight: 12 },
        { keyword: 'intelligence artificielle', weight: 12 },
        { keyword: 'blockchain', weight: 10 },
        { keyword: 'web3', weight: 10 },
        { keyword: '5g', weight: 8 },
        { keyword: 'innovation', weight: 10 },

        // Environmental
        { keyword: 'écologie', weight: 12 },
        { keyword: 'rse', weight: 15 },
        { keyword: 'carbone', weight: 12 },
        { keyword: 'durable', weight: 12 },
        { keyword: 'sobriété énergétique', weight: 15 },
        { keyword: 'green', weight: 10 },
    ],

    // Category importance weights
    categoryWeights: {
        business: 1.6,
        regulation: 1.5,
        local: 1.4,
        esport: 1.3,
        tech: 1.2,
        industry: 1.0,
    },
};

// Dashboard configuration
export const DASHBOARD_CONFIG = {
    recommendationsPerWeek: 5,
    maxNewsItems: 200,
    refreshIntervalMs: 60 * 60 * 1000, // 1 hour
    dateFormat: 'dd MMM yyyy HH:mm',
};
