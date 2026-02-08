// Alert system with localStorage preferences

export interface AlertPreferences {
    enabled: boolean;
    scoreThreshold: number;
    keywords: string[];
    notifyOnNewRecommendation: boolean;
}

export interface Alert {
    id: string;
    articleId: string;
    title: string;
    reason: string;
    createdAt: string;
    read: boolean;
}

const PREFS_KEY = 'veille-alert-prefs';
const ALERTS_KEY = 'veille-alerts';
const SEEN_KEY = 'veille-seen-articles';

export function getAlertPreferences(): AlertPreferences {
    if (typeof window === 'undefined') {
        return { enabled: true, scoreThreshold: 25, keywords: [], notifyOnNewRecommendation: true };
    }
    try {
        const stored = localStorage.getItem(PREFS_KEY);
        return stored ? JSON.parse(stored) : {
            enabled: true,
            scoreThreshold: 25,
            keywords: [],
            notifyOnNewRecommendation: true,
        };
    } catch {
        return { enabled: true, scoreThreshold: 25, keywords: [], notifyOnNewRecommendation: true };
    }
}

export function saveAlertPreferences(prefs: AlertPreferences): void {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

export function getAlerts(): Alert[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(ALERTS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function addAlert(alert: Omit<Alert, 'id' | 'createdAt' | 'read'>): Alert {
    const alerts = getAlerts();
    const newAlert: Alert = {
        ...alert,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        read: false,
    };
    alerts.unshift(newAlert);
    // Keep only last 50 alerts
    const trimmed = alerts.slice(0, 50);
    localStorage.setItem(ALERTS_KEY, JSON.stringify(trimmed));
    return newAlert;
}

export function markAlertRead(id: string): void {
    const alerts = getAlerts();
    const alert = alerts.find(a => a.id === id);
    if (alert) {
        alert.read = true;
        localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
    }
}

export function markAllAlertsRead(): void {
    const alerts = getAlerts().map(a => ({ ...a, read: true }));
    localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
}

export function clearAlerts(): void {
    localStorage.setItem(ALERTS_KEY, JSON.stringify([]));
}

export function getUnreadCount(): number {
    return getAlerts().filter(a => !a.read).length;
}

// Track seen articles to avoid duplicate alerts
export function getSeenArticles(): Set<string> {
    if (typeof window === 'undefined') return new Set();
    try {
        const stored = localStorage.getItem(SEEN_KEY);
        return new Set(stored ? JSON.parse(stored) : []);
    } catch {
        return new Set();
    }
}

export function markArticleSeen(articleId: string): void {
    const seen = getSeenArticles();
    seen.add(articleId);
    // Keep only last 500 seen articles
    const arr = Array.from(seen).slice(-500);
    localStorage.setItem(SEEN_KEY, JSON.stringify(arr));
}

// Check if article should trigger alert
export function shouldAlert(
    article: { id: string; title: string; score: number; isRecommendation?: boolean },
    prefs: AlertPreferences
): { shouldAlert: boolean; reason: string } {
    if (!prefs.enabled) return { shouldAlert: false, reason: '' };

    const seen = getSeenArticles();
    if (seen.has(article.id)) return { shouldAlert: false, reason: '' };

    // High score
    if (article.score >= prefs.scoreThreshold) {
        return { shouldAlert: true, reason: `Score élevé: ${article.score}` };
    }

    // Keyword match
    const titleLower = article.title.toLowerCase();
    for (const keyword of prefs.keywords) {
        if (titleLower.includes(keyword.toLowerCase())) {
            return { shouldAlert: true, reason: `Mot-clé: "${keyword}"` };
        }
    }

    // New recommendation
    if (prefs.notifyOnNewRecommendation && article.isRecommendation) {
        return { shouldAlert: true, reason: 'Nouvelle recommandation' };
    }

    return { shouldAlert: false, reason: '' };
}

// Browser notification (if permission granted)
export async function requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied') return false;

    const result = await Notification.requestPermission();
    return result === 'granted';
}

export function showNotification(title: string, body: string): void {
    if (Notification.permission === 'granted') {
        new Notification(title, { body, icon: '/favicon.ico' });
    }
}
