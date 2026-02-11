
import { NextResponse } from 'next/server';
import { fetchAllNews, getRecommendations, getSources } from '@/lib/engine';
import { saveDailySnapshot } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
    // Determine if this is a legitimate cron request
    // Vercel sends `Authorization` header for crons
    // For hobby plan without secret management, we can be lenient or check for the header
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) { ... }

    // For now, we allow the run. It's safe as it just updates the daily snapshot idempotently.

    try {
        console.log('Starting CRON job...');
        const news = await fetchAllNews();
        console.log(`Fetched ${news.length} news items.`);

        const recommendations = getRecommendations(news);
        const sources = getSources();

        // Calculate stats
        const today = new Date().toDateString();
        const newsToday = news.filter(item =>
            new Date(item.pubDate).toDateString() === today
        ).length;

        // Category breakdown
        const categoryCount: Record<string, number> = {};
        for (const item of news) {
            categoryCount[item.sourceCategory] = (categoryCount[item.sourceCategory] || 0) + 1;
        }

        const topCategories = Object.entries(categoryCount)
            .map(([category, count]) => ({ category, count }))
            .sort((a, b) => b.count - a.count);

        const stats = {
            totalNews: news.length,
            newsToday,
            topCategories,
            lastUpdate: new Date().toISOString(),
        };

        // Save daily snapshot
        const success = await saveDailySnapshot(recommendations, stats);

        if (success) {
            console.log('CRON job completed successfully.');
            return NextResponse.json({ success: true, message: 'Cron executed successfully' });
        } else {
            console.error('CRON job failed to save data.');
            return NextResponse.json({ success: false, error: 'Database save failed' }, { status: 500 });
        }

    } catch (error) {
        console.error('CRON API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Cron Failed' },
            { status: 500 }
        );
    }
}
