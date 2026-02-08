// Bookmark system with localStorage persistence

export interface Bookmark {
    id: string;
    articleId: string;
    title: string;
    link: string;
    source: string;
    category: string;
    note: string;
    createdAt: string;
    isActionItem: boolean;
    actionStatus: 'pending' | 'done';
}

const STORAGE_KEY = 'veille-bookmarks';

export function getBookmarks(): Bookmark[] {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function saveBookmark(bookmark: Omit<Bookmark, 'id' | 'createdAt'>): Bookmark {
    const bookmarks = getBookmarks();
    const newBookmark: Bookmark = {
        ...bookmark,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    bookmarks.unshift(newBookmark);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    return newBookmark;
}

export function removeBookmark(id: string): void {
    const bookmarks = getBookmarks().filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

export function updateBookmark(id: string, updates: Partial<Bookmark>): Bookmark | null {
    const bookmarks = getBookmarks();
    const index = bookmarks.findIndex(b => b.id === id);
    if (index === -1) return null;

    bookmarks[index] = { ...bookmarks[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    return bookmarks[index];
}

export function isBookmarked(articleId: string): boolean {
    return getBookmarks().some(b => b.articleId === articleId);
}

export function getBookmarkByArticle(articleId: string): Bookmark | undefined {
    return getBookmarks().find(b => b.articleId === articleId);
}

export function toggleActionStatus(id: string): Bookmark | null {
    const bookmark = getBookmarks().find(b => b.id === id);
    if (!bookmark) return null;

    return updateBookmark(id, {
        actionStatus: bookmark.actionStatus === 'pending' ? 'done' : 'pending'
    });
}
