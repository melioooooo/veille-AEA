// 2026 Esports Events Calendar
export interface EsportsEvent {
    id: string;
    name: string;
    game: EsportGame;
    startDate: string; // ISO format
    endDate: string;
    location: string;
    country: string;
    isFrance: boolean;
    tier: 'S' | 'A' | 'B' | 'C'; // S = World Championship, A = Major, B = Regional, C = Local
    prizePool?: string;
    url?: string;
}

export type EsportGame =
    | 'valorant'
    | 'lol'
    | 'cs2'
    | 'rocket-league'
    | 'ea-fc'
    | 'rainbow-six'
    | 'call-of-duty'
    | 'fighting'
    | 'smash'
    | 'fortnite'
    | 'multi';

export const GAME_INFO: Record<EsportGame, { label: string; color: string }> = {
    'valorant': { label: 'VALORANT', color: '#ff4655' },
    'lol': { label: 'League of Legends', color: '#0bc6e3' },
    'cs2': { label: 'Counter-Strike 2', color: '#f0b232' },
    'rocket-league': { label: 'Rocket League', color: '#0088ff' },
    'ea-fc': { label: 'EA Sports FC', color: '#1db954' },
    'rainbow-six': { label: 'Rainbow Six Siege', color: '#4a90d9' },
    'call-of-duty': { label: 'Call of Duty', color: '#ff6b00' },
    'fighting': { label: 'Jeux de combat', color: '#9b59b6' },
    'smash': { label: 'Super Smash Bros', color: '#e74c3c' },
    'fortnite': { label: 'Fortnite', color: '#9d4dbb' },
    'multi': { label: 'Multi-jeux', color: '#8899a6' },
};

export const ESPORTS_EVENTS_2026: EsportsEvent[] = [
    // ========== JANVIER 2026 ==========
    {
        id: 'vct-emea-kickoff',
        name: 'VCT EMEA Kickoff',
        game: 'valorant',
        startDate: '2026-01-20',
        endDate: '2026-02-15',
        location: 'Berlin',
        country: 'Allemagne',
        isFrance: false,
        tier: 'A',
    },
    {
        id: 'blast-bounty-s1',
        name: 'BLAST Bounty Season 1',
        game: 'cs2',
        startDate: '2026-01-13',
        endDate: '2026-01-25',
        location: 'Malte',
        country: 'Malte',
        isFrance: false,
        tier: 'B',
    },
    {
        id: 'winter-lan',
        name: 'Winter LAN is Coming',
        game: 'multi',
        startDate: '2026-01-17',
        endDate: '2026-01-17',
        location: 'Moselle',
        country: 'France',
        isFrance: true,
        tier: 'C',
    },
    {
        id: 'iem-krakow',
        name: 'IEM Krakow',
        game: 'cs2',
        startDate: '2026-01-28',
        endDate: '2026-02-08',
        location: 'Cracovie',
        country: 'Pologne',
        isFrance: false,
        tier: 'A',
    },
    {
        id: 'lck-spring',
        name: 'LCK Spring 2026',
        game: 'lol',
        startDate: '2026-01-14',
        endDate: '2026-03-15',
        location: 'Séoul',
        country: 'Corée du Sud',
        isFrance: false,
        tier: 'A',
    },
    {
        id: 'lec-winter',
        name: 'LEC Winter 2026',
        game: 'lol',
        startDate: '2026-01-17',
        endDate: '2026-03-10',
        location: 'Berlin',
        country: 'Allemagne',
        isFrance: false,
        tier: 'A',
    },

    // ========== FEVRIER 2026 ==========
    {
        id: 'six-invitational',
        name: 'Six Invitational 2026',
        game: 'rainbow-six',
        startDate: '2026-02-13',
        endDate: '2026-02-15',
        location: 'Paris - Adidas Arena',
        country: 'France',
        isFrance: true,
        tier: 'S',
        prizePool: '$3M',
    },
    {
        id: 'pgl-cluj',
        name: 'PGL Cluj-Napoca',
        game: 'cs2',
        startDate: '2026-02-14',
        endDate: '2026-02-22',
        location: 'Cluj-Napoca',
        country: 'Roumanie',
        isFrance: false,
        tier: 'A',
    },
    {
        id: 'brave-the-world',
        name: 'Brave the World 2',
        game: 'smash',
        startDate: '2026-02-21',
        endDate: '2026-02-22',
        location: 'Suresnes (Paris)',
        country: 'France',
        isFrance: true,
        tier: 'B',
    },
    {
        id: 'vct-masters-santiago',
        name: 'VALORANT Masters Santiago',
        game: 'valorant',
        startDate: '2026-02-28',
        endDate: '2026-03-15',
        location: 'Santiago',
        country: 'Chili',
        isFrance: false,
        tier: 'S',
    },

    // ========== MARS 2026 ==========
    {
        id: 'oregami-lan',
        name: 'Oregami LAN',
        game: 'multi',
        startDate: '2026-03-07',
        endDate: '2026-03-08',
        location: 'Orléans',
        country: 'France',
        isFrance: true,
        tier: 'C',
    },
    {
        id: 'esl-pro-league-23',
        name: 'ESL Pro League Season 23',
        game: 'cs2',
        startDate: '2026-03-05',
        endDate: '2026-03-15',
        location: 'Stockholm',
        country: 'Suède',
        isFrance: false,
        tier: 'A',
        prizePool: '$750K',
    },
    {
        id: 'lol-first-stand',
        name: 'LoL First Stand',
        game: 'lol',
        startDate: '2026-03-16',
        endDate: '2026-03-22',
        location: 'São Paulo',
        country: 'Brésil',
        isFrance: false,
        tier: 'S',
    },
    {
        id: 'blast-rotterdam',
        name: 'BLAST Open Rotterdam',
        game: 'cs2',
        startDate: '2026-03-18',
        endDate: '2026-03-29',
        location: 'Rotterdam',
        country: 'Pays-Bas',
        isFrance: false,
        tier: 'A',
    },
    {
        id: 'hello-nexen',
        name: 'Hello!Nexen Championship',
        game: 'multi',
        startDate: '2026-03-21',
        endDate: '2026-03-22',
        location: 'Lille',
        country: 'France',
        isFrance: true,
        tier: 'C',
    },

    // ========== AVRIL 2026 ==========
    {
        id: 'gamers-assembly',
        name: 'Gamers Assembly Festival',
        game: 'multi',
        startDate: '2026-04-04',
        endDate: '2026-04-06',
        location: 'Poitiers',
        country: 'France',
        isFrance: true,
        tier: 'B',
    },
    {
        id: 'pgl-bucharest',
        name: 'PGL Bucharest',
        game: 'cs2',
        startDate: '2026-04-03',
        endDate: '2026-04-11',
        location: 'Bucarest',
        country: 'Roumanie',
        isFrance: false,
        tier: 'A',
    },
    {
        id: 'chaponost-cs2',
        name: 'Chaponost Counter-Strike',
        game: 'cs2',
        startDate: '2026-04-25',
        endDate: '2026-04-26',
        location: 'Chaponost (Lyon)',
        country: 'France',
        isFrance: true,
        tier: 'C',
    },

    // ========== MAI 2026 ==========
    {
        id: 'iem-atlanta',
        name: 'IEM Atlanta',
        game: 'cs2',
        startDate: '2026-05-11',
        endDate: '2026-05-17',
        location: 'Atlanta',
        country: 'USA',
        isFrance: false,
        tier: 'A',
    },
    {
        id: 'rlcs-major-paris',
        name: 'RLCS Major 2 - Paris',
        game: 'rocket-league',
        startDate: '2026-05-20',
        endDate: '2026-05-24',
        location: 'Paris La Défense Arena',
        country: 'France',
        isFrance: true,
        tier: 'S',
    },

    // ========== JUIN 2026 ==========
    {
        id: 'iem-cologne-major',
        name: 'IEM Cologne Major 2026',
        game: 'cs2',
        startDate: '2026-06-02',
        endDate: '2026-06-21',
        location: 'Cologne',
        country: 'Allemagne',
        isFrance: false,
        tier: 'S',
        prizePool: '$1.25M',
    },
    {
        id: 'vct-masters-london',
        name: 'VALORANT Masters London',
        game: 'valorant',
        startDate: '2026-06-06',
        endDate: '2026-06-21',
        location: 'Londres',
        country: 'Royaume-Uni',
        isFrance: false,
        tier: 'S',
    },
    {
        id: 'the-mixup-lyon',
        name: 'The MIXUP 2026',
        game: 'fighting',
        startDate: '2026-06-13',
        endDate: '2026-06-14',
        location: 'Lyon',
        country: 'France',
        isFrance: true,
        tier: 'B',
    },
    {
        id: 'cdl-stage4-major',
        name: 'Call of Duty League Stage 4 Major',
        game: 'call-of-duty',
        startDate: '2026-06-25',
        endDate: '2026-06-28',
        location: 'Paris',
        country: 'France',
        isFrance: true,
        tier: 'S',
    },
    {
        id: 'lol-msi',
        name: 'Mid-Season Invitational 2026',
        game: 'lol',
        startDate: '2026-06-26',
        endDate: '2026-07-12',
        location: 'Daejeon',
        country: 'Corée du Sud',
        isFrance: false,
        tier: 'S',
    },

    // ========== JUILLET 2026 ==========
    {
        id: 'eafc-world-championship',
        name: 'EA Sports FC Pro World Championship',
        game: 'ea-fc',
        startDate: '2026-07-22',
        endDate: '2026-07-26',
        location: 'Riyad (Esports World Cup)',
        country: 'Arabie Saoudite',
        isFrance: false,
        tier: 'S',
    },

    // ========== AOÛT 2026 ==========
    {
        id: 'esports-world-cup',
        name: 'Esports World Cup',
        game: 'multi',
        startDate: '2026-08-12',
        endDate: '2026-08-23',
        location: 'Riyad',
        country: 'Arabie Saoudite',
        isFrance: false,
        tier: 'S',
        prizePool: '$60M+',
    },

    // ========== SEPTEMBRE 2026 ==========
    {
        id: 'vct-champions',
        name: 'VALORANT Champions 2026',
        game: 'valorant',
        startDate: '2026-09-24',
        endDate: '2026-10-18',
        location: 'Shanghai',
        country: 'Chine',
        isFrance: false,
        tier: 'S',
        prizePool: '$2.5M',
    },

    // ========== OCTOBRE 2026 ==========
    {
        id: 'esl-pro-league-24',
        name: 'ESL Pro League Season 24',
        game: 'cs2',
        startDate: '2026-10-03',
        endDate: '2026-10-11',
        location: 'Katowice',
        country: 'Pologne',
        isFrance: false,
        tier: 'A',
    },
    {
        id: 'lol-worlds',
        name: 'LoL World Championship 2026',
        game: 'lol',
        startDate: '2026-10-16',
        endDate: '2026-11-14',
        location: 'Texas & New York',
        country: 'USA',
        isFrance: false,
        tier: 'S',
        prizePool: '$2M+',
    },
    {
        id: 'paris-games-week',
        name: 'Paris Games Week 2026',
        game: 'multi',
        startDate: '2026-10-28',
        endDate: '2026-11-01',
        location: 'Paris Expo Porte de Versailles',
        country: 'France',
        isFrance: true,
        tier: 'A',
    },

    // ========== NOVEMBRE 2026 ==========
    {
        id: 'lyon-esport-lan',
        name: 'Lyon e-Sport LAN',
        game: 'multi',
        startDate: '2026-11-07',
        endDate: '2026-11-08',
        location: 'Lyon',
        country: 'France',
        isFrance: true,
        tier: 'B',
        prizePool: '€16.5K',
    },
    {
        id: 'pgl-major-singapore',
        name: 'PGL Major Singapore 2026',
        game: 'cs2',
        startDate: '2026-11-25',
        endDate: '2026-12-13',
        location: 'Singapour',
        country: 'Singapour',
        isFrance: false,
        tier: 'S',
        prizePool: '$1.25M',
    },
];

// Function to get events by month
export function getEventsByMonth(events: EsportsEvent[]): Record<string, EsportsEvent[]> {
    const months: Record<string, EsportsEvent[]> = {};

    events.forEach(event => {
        const date = new Date(event.startDate);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        if (!months[monthKey]) {
            months[monthKey] = [];
        }
        months[monthKey].push(event);
    });

    return months;
}

// Function to get events by game
export function getEventsByGame(events: EsportsEvent[]): Record<EsportGame, EsportsEvent[]> {
    const games: Partial<Record<EsportGame, EsportsEvent[]>> = {};

    events.forEach(event => {
        if (!games[event.game]) {
            games[event.game] = [];
        }
        games[event.game]!.push(event);
    });

    return games as Record<EsportGame, EsportsEvent[]>;
}

// Get French events only
export function getFrenchEvents(events: EsportsEvent[]): EsportsEvent[] {
    return events.filter(e => e.isFrance);
}
