// Keyword extraction for trending topics

const FRENCH_STOPWORDS = new Set([
    'le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'en', 'au', 'aux',
    'ce', 'ces', 'cette', 'son', 'sa', 'ses', 'leur', 'leurs', 'notre', 'nos',
    'votre', 'vos', 'que', 'qui', 'quoi', 'dont', 'où', 'par', 'pour', 'avec',
    'sans', 'sous', 'sur', 'dans', 'entre', 'vers', 'chez', 'plus', 'moins',
    'très', 'bien', 'mal', 'peu', 'trop', 'aussi', 'comme', 'tout', 'tous',
    'toute', 'toutes', 'autre', 'autres', 'même', 'mêmes', 'être', 'avoir',
    'fait', 'faire', 'dit', 'dire', 'peut', 'pouvoir', 'doit', 'devoir',
    'été', 'sont', 'ont', 'sera', 'seront', 'était', 'après', 'avant',
    'alors', 'ainsi', 'cela', 'car', 'mais', 'donc', 'puis', 'tant',
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
    'has', 'have', 'had', 'will', 'would', 'could', 'should', 'may', 'might',
    'this', 'that', 'these', 'those', 'it', 'its', 'new', 'all', 'first',
    'via', 'how', 'why', 'what', 'when', 'where', 'which', 'who', 'whom',
]);

const MIN_WORD_LENGTH = 3;

export interface KeywordCount {
    word: string;
    count: number;
    score: number; // normalized 0-1
}

export function extractKeywords(texts: string[]): KeywordCount[] {
    const wordCounts = new Map<string, number>();

    for (const text of texts) {
        // Normalize and split
        const words = text
            .toLowerCase()
            .replace(/[^\w\sàâäéèêëïîôùûüÿç-]/g, ' ')
            .split(/\s+/)
            .filter(word =>
                word.length >= MIN_WORD_LENGTH &&
                !FRENCH_STOPWORDS.has(word) &&
                !/^\d+$/.test(word)
            );

        // Count unique words per text to avoid spam
        const uniqueWords = new Set(words);
        for (const word of uniqueWords) {
            wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
        }
    }

    // Convert to array and sort by count
    const sorted = Array.from(wordCounts.entries())
        .map(([word, count]) => ({ word, count, score: 0 }))
        .sort((a, b) => b.count - a.count);

    // Normalize scores
    if (sorted.length > 0) {
        const maxCount = sorted[0].count;
        for (const item of sorted) {
            item.score = item.count / maxCount;
        }
    }

    return sorted;
}

export function getTopKeywords(texts: string[], limit = 20): KeywordCount[] {
    return extractKeywords(texts).slice(0, limit);
}

export function getTrendingByCategory(
    items: Array<{ title: string; description: string; sourceCategory: string }>
): Record<string, KeywordCount[]> {
    const byCategory: Record<string, string[]> = {};

    for (const item of items) {
        const cat = item.sourceCategory;
        if (!byCategory[cat]) byCategory[cat] = [];
        byCategory[cat].push(`${item.title} ${item.description}`);
    }

    const result: Record<string, KeywordCount[]> = {};
    for (const [category, texts] of Object.entries(byCategory)) {
        result[category] = getTopKeywords(texts, 10);
    }

    return result;
}
