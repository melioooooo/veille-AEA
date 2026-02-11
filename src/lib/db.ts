
import { sql } from '@vercel/postgres';
import { NewsItem, DashboardStats } from './types';

export async function getHistoryDates() {
    try {
        const { rows } = await sql`
            SELECT date FROM recommendations_history 
            ORDER BY date DESC 
            LIMIT 30;
        `;
        return rows.map(r => r.date);
    } catch (error) {
        console.error('Failed to fetch history dates:', error);
        return [];
    }
}

export async function getHistoryByDate(date: string) {
    try {
        // Ensure date is in YYYY-MM-DD format
        const { rows } = await sql`
            SELECT items, stats FROM recommendations_history 
            WHERE date::text LIKE ${date + '%'}
            LIMIT 1;
        `;
        if (rows.length > 0) {
            return {
                news: [], // We might not store full news history, only recos
                recommendations: rows[0].items as NewsItem[],
                stats: rows[0].stats as DashboardStats,
                sources: [] // Sources are static/config based usually
            };
        }
        return null;
    } catch (error) {
        console.error('Failed to fetch history for date:', date, error);
        return null;
    }
}

export async function saveDailySnapshot(items: NewsItem[], stats: DashboardStats) {
    try {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        await sql`
            INSERT INTO recommendations_history (date, items, stats)
            VALUES (${today}, ${JSON.stringify(items)}, ${JSON.stringify(stats)})
            ON CONFLICT (date) 
            DO UPDATE SET 
                items = ${JSON.stringify(items)}, 
                stats = ${JSON.stringify(stats)};
        `;
        console.log(`Saved snapshot for ${today}`);
        return true;
    } catch (error) {
        console.error('Failed to save daily snapshot:', error);
        return false;
    }
}
