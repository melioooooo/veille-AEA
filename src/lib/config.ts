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

    // === RÉGLEMENTAIRE & INSTITUTIONNEL ===
    // France Esports — fédération officielle, actualités réglementaires
    {
        id: 'france-esports',
        name: 'France Esports',
        url: 'https://www.france-esports.org/feed/',
        category: 'regulation',
        enabled: true,
    },
    // SELL — Syndicat des Éditeurs de Logiciels de Loisirs
    {
        id: 'sell-jeu-video',
        name: 'SELL',
        url: 'https://www.sell.fr/feed',
        category: 'regulation',
        enabled: true,
    },

    // === MARKETING & COMMUNICATION ESPORT ===
    // The Esports Observer — stratégies marketing et business esport
    {
        id: 'esports-observer',
        name: 'The Esports Observer',
        url: 'https://archive.esportsobserver.com/feed/',
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

export const FILTER_CONFIG: FilterConfig = {
    // Terms to completely exclude — hard filter
    blacklist: [
        // Consumer gaming content
        'meltdown',
        'meltdown bar',
        'meltdown bars',
        'fortnite skin',
        'patch notes',
        'tier list',
        'tier-list',
        'build guide',
        'skin reveal',
        'battle pass',
        'season pass',
        'character unlock',
        'cosmetic',
        'mod',
        'mods',
        'best mods',
        'nexus mod',
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
        'best settings',
        'gameplay tips',
        'cheat',
        'exploit',
        'glitch',
        'ranking guide',
        'tier list update',

        // Traditional sports — NOT esport
        'hockey',
        'ice hockey',
        'football américain',
        'nfl',
        'nba',
        'nhl',
        'mlb',
        'baseball',
        'cricket',
        'rugby',
        'tennis',
        'golf',
        'boxing',
        'mma',
        'ufc',
        'wrestling',
        'olympic',
        'olympics',
        'jeux olympiques',
        'premier league',
        'champions league',
        'world cup',
        'coupe du monde',
        'ligue 1',
        'bundesliga',
        'la liga',
        'serie a',
        'ballon d\'or',

        // Automobile / Mobilité
        'conduite autonome',
        'self-driving',
        'autonomous driving',
        'autonomous vehicle',
        'véhicule électrique',
        'electric vehicle',
        'voiture électrique',
        'tesla model',
        'waymo',
        'wayve',

        // Non-gaming tech / lifestyle
        'recette',
        'cuisine',
        'fashion',
        'real estate',
        'immobilier',
        'crypto trading',
        'nft marketplace',
        'dating app',

        // Entertainment non-gaming
        'netflix',
        'disney+',
        'hbo',
        'movie review',
        'box office',

        // Specific games with no esport scene
        'stardew valley',
        'elden ring',
        'animal crossing',
        'zelda',
        'hogwarts legacy',

        // Consumer tech apps / services unrelated to gaming
        'google maps',
        'apple maps',
        'waze',
        'uber',
        'lyft',
        'airbnb',
        'tiktok shop',
        'instagram reels',
        'snapchat',
        'whatsapp',
        'telegram channel',
    ],

    // Keywords that boost relevance score — focused on AEA business environment
    boostKeywords: [
        // ===== DIRECT AEA BUSINESS (highest weight) =====
        { keyword: 'arena', weight: 25 },
        { keyword: 'alsace', weight: 30 },
        { keyword: 'strasbourg', weight: 25 },
        { keyword: 'gaming center', weight: 22 },
        { keyword: 'gaming centre', weight: 22 },
        { keyword: 'esport venue', weight: 22 },
        { keyword: 'lan center', weight: 20 },
        { keyword: 'lan party', weight: 18 },
        { keyword: 'gaming lounge', weight: 20 },
        { keyword: 'gaming cafe', weight: 20 },
        { keyword: 'gaming bar', weight: 18 },
        { keyword: 'bar esport', weight: 18 },
        { keyword: 'salle de jeux', weight: 20 },
        { keyword: 'espace gaming', weight: 22 },
        { keyword: 'cybercafé', weight: 18 },
        { keyword: 'watch party', weight: 20 },

        // ===== COMPETITOR INTELLIGENCE =====
        { keyword: 'espot', weight: 18 },
        { keyword: 'v.hive', weight: 18 },
        { keyword: 'team vitality', weight: 15 },
        { keyword: 'mces', weight: 15 },
        { keyword: 'lyon esport', weight: 12 },
        { keyword: 'gaming campus', weight: 12 },
        { keyword: 'gaming house', weight: 12 },

        // ===== BUSINESS STRATEGY & OPERATIONS =====
        { keyword: 'business model', weight: 15 },
        { keyword: 'modèle économique', weight: 18 },
        { keyword: 'model économique', weight: 18 },
        { keyword: 'rentabilité', weight: 18 },
        { keyword: 'profitability', weight: 18 },
        { keyword: 'revenue', weight: 15 },
        { keyword: 'chiffre d\'affaires', weight: 15 },
        { keyword: 'monetization', weight: 12 },
        { keyword: 'investissement', weight: 12 },
        { keyword: 'financement', weight: 12 },
        { keyword: 'levée de fonds', weight: 12 },
        { keyword: 'franchise', weight: 10 },
        { keyword: 'ouverture', weight: 8 },

        // ===== ESPORT INDUSTRY & MARKET =====
        { keyword: 'esport market', weight: 15 },
        { keyword: 'marché esport', weight: 15 },
        { keyword: 'esport industry', weight: 15 },
        { keyword: 'industrie esport', weight: 15 },
        { keyword: 'market report', weight: 12 },
        { keyword: 'étude de marché', weight: 12 },
        { keyword: 'industry growth', weight: 10 },
        { keyword: 'audience growth', weight: 10 },
        { keyword: 'viewership', weight: 10 },
        { keyword: 'market size', weight: 10 },
        { keyword: 'market growth', weight: 10 },
        { keyword: 'sponsoring', weight: 12 },
        { keyword: 'sponsorship', weight: 12 },
        { keyword: 'partnership', weight: 12 },
        { keyword: 'partenariat', weight: 12 },

        // ===== ESPORT COMPETITIONS (for watch parties & events) =====
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
        { keyword: 'worlds', weight: 8 },
        { keyword: 'lec', weight: 10 },
        { keyword: 'lfl', weight: 15 },
        { keyword: 'major', weight: 6 },
        { keyword: 'championship', weight: 8 },
        { keyword: 'tournament', weight: 8 },
        { keyword: 'tournoi', weight: 8 },
        { keyword: 'compétition', weight: 8 },
        { keyword: 'grand final', weight: 10 },
        { keyword: 'playoffs', weight: 8 },
        { keyword: 'qualifier', weight: 6 },
        { keyword: 'roster change', weight: 8 },
        { keyword: 'transfer', weight: 6 },

        // ===== VENUE TECHNOLOGY =====
        { keyword: 'cloud gaming', weight: 15 },
        { keyword: 'game streaming', weight: 10 },
        { keyword: 'vr gaming', weight: 12 },
        { keyword: 'réalité virtuelle', weight: 10 },
        { keyword: 'pc gaming', weight: 8 },
        { keyword: 'gaming setup', weight: 10 },
        { keyword: 'esport equipment', weight: 12 },
        { keyword: 'sim racing', weight: 12 },
        { keyword: 'simulateur', weight: 10 },

        // ===== REGULATION & LEGAL =====
        { keyword: 'réglementation', weight: 18 },
        { keyword: 'législation', weight: 18 },
        { keyword: 'regulation', weight: 12 },
        { keyword: 'mineurs', weight: 10 },
        { keyword: 'age restriction', weight: 10 },
        { keyword: 'france esports', weight: 18 },
        { keyword: 'fédération', weight: 10 },
        { keyword: 'gaming law', weight: 15 },
        { keyword: 'loi', weight: 12 },
        { keyword: 'légal', weight: 12 },
        { keyword: 'gdpr', weight: 10 },
        { keyword: 'rgpd', weight: 10 },
        { keyword: 'subvention', weight: 15 },

        // ===== EVENTS & COMMUNITY =====
        { keyword: 'team building', weight: 18 },
        { keyword: 'corporate gaming', weight: 18 },
        { keyword: 'esport event', weight: 12 },
        { keyword: 'community', weight: 6 },
        { keyword: 'local esports', weight: 15 },
        { keyword: 'grassroots', weight: 12 },
        { keyword: 'événement gaming', weight: 15 },
        { keyword: 'animation', weight: 8 },
        { keyword: 'anniversaire', weight: 10 },

        // ===== SOCIAL & AUDIENCE TRENDS =====
        { keyword: 'gen z', weight: 15 },
        { keyword: 'millennials', weight: 10 },
        { keyword: 'habitudes de consommation', weight: 12 },
        { keyword: 'inclusion', weight: 10 },
        { keyword: 'diversité', weight: 10 },
        { keyword: 'mixité', weight: 10 },

        // ===== ENVIRONMENTAL / RSE =====
        { keyword: 'rse', weight: 12 },
        { keyword: 'sobriété énergétique', weight: 15 },
        { keyword: 'durable', weight: 8 },
        { keyword: 'carbone', weight: 8 },
    ],

    // Keywords that REDUCE score — for ambiguous content that could be off-topic
    penaltyKeywords: [
        // Traditional sport spillover
        { keyword: 'jersey', weight: -15 },
        { keyword: 'maillot', weight: -12 },
        { keyword: 'coach sportif', weight: -15 },
        { keyword: 'stade', weight: -10 },
        { keyword: 'stadium', weight: -10 },
        { keyword: 'athlete', weight: -10 },
        { keyword: 'athlète', weight: -10 },

        // Auto/mobility
        { keyword: 'automobile', weight: -20 },
        { keyword: 'voiture', weight: -15 },
        { keyword: 'car manufacturer', weight: -20 },
        { keyword: 'electric car', weight: -15 },

        // Non-gaming tech
        { keyword: 'smartphone', weight: -12 },
        { keyword: 'iphone', weight: -12 },
        { keyword: 'android phone', weight: -10 },
        { keyword: 'tablette', weight: -10 },
        { keyword: 'wearable', weight: -10 },

        // Entertainment / media
        { keyword: 'film', weight: -8 },
        { keyword: 'série tv', weight: -8 },
        { keyword: 'cinéma', weight: -8 },
        { keyword: 'musique', weight: -8 },

        // Generic consumer
        { keyword: 'promo', weight: -8 },
        { keyword: 'bon plan', weight: -10 },
        { keyword: 'comparatif', weight: -8 },
        { keyword: 'test produit', weight: -10 },
        { keyword: 'unboxing', weight: -10 },

        // Consumer tech apps / branding (no gaming relevance)
        { keyword: 'google maps', weight: -20 },
        { keyword: 'apple maps', weight: -15 },
        { keyword: 'waze', weight: -15 },
        { keyword: 'icône', weight: -8 },
        { keyword: 'logo redesign', weight: -12 },
        { keyword: 'rebranding', weight: -10 },
        { keyword: 'satellite', weight: -12 },
        { keyword: 'photovoltaïque', weight: -12 },
        { keyword: 'agriculture', weight: -12 },
        { keyword: 'médecine', weight: -10 },
        { keyword: 'santé numérique', weight: -10 },
        { keyword: 'fintech', weight: -10 },
        { keyword: 'insurtech', weight: -10 },
    ],

    // Category importance weights
    categoryWeights: {
        business: 1.6,
        regulation: 1.5,
        local: 1.4,
        esport: 1.3,
        tech: 1.1,     // reduced from 1.2 — too many off-topic tech articles
        industry: 1.0,
    },

    // Minimum score to include in the feed — below this, article is dropped
    minimumScoreThreshold: 20,
};

// Dashboard configuration
export const DASHBOARD_CONFIG = {
    recommendationsPerWeek: 5,
    maxNewsItems: 200,
    refreshIntervalMs: 60 * 60 * 1000, // 1 hour
    dateFormat: 'dd MMM yyyy HH:mm',
};
