
import { NextResponse } from 'next/server';
import { getHistoryDates, getHistoryByDate } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const date = searchParams.get('date');

        if (date) {
            // Fetch specific date
            const data = await getHistoryByDate(date);
            if (!data) {
                return NextResponse.json({ success: false, error: 'No data found for this date' }, { status: 404 });
            }
            return NextResponse.json({ success: true, data });
        } else {
            // Fetch list of available dates
            const dates = await getHistoryDates();
            return NextResponse.json({ success: true, dates });
        }
    } catch (error) {
        console.error('History API Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch history' },
            { status: 500 }
        );
    }
}
