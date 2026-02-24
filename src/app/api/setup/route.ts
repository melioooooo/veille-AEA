
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS recommendations_history (
                id SERIAL PRIMARY KEY,
                date DATE UNIQUE NOT NULL,
                items JSONB NOT NULL,
                stats JSONB NOT NULL,
                news JSONB DEFAULT '[]'::jsonb,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `;

        // Migration: add news column if it doesn't exist (for existing databases)
        await sql`
            ALTER TABLE recommendations_history 
            ADD COLUMN IF NOT EXISTS news JSONB DEFAULT '[]'::jsonb;
        `;

        return NextResponse.json({
            success: true,
            message: 'Database schema created/verified successfully'
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
