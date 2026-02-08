import { NextResponse } from 'next/server';
import { fetchAllNews, getRecommendations, getSources } from '@/lib/engine';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const news = await fetchAllNews();
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

        return NextResponse.json({
            success: true,
            data: {
                news,
                recommendations,
                sources,
                stats: {
                    totalNews: news.length,
                    newsToday,
                    topCategories,
                    lastUpdate: new Date().toISOString(),
                },
            },
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch news' },
            { status: 500 }
        );
    }
}
