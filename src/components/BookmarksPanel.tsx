'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark as BookmarkIcon, Trash2, Check, Circle, StickyNote, ExternalLink } from 'lucide-react';
import { Bookmark, getBookmarks, removeBookmark, toggleActionStatus } from '@/lib/bookmarks';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface BookmarksPanelProps {
    onClose?: () => void;
}

export default function BookmarksPanel({ onClose }: BookmarksPanelProps) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setBookmarks(getBookmarks());
    }, []);

    const handleRemove = (id: string) => {
        removeBookmark(id);
        setBookmarks(getBookmarks());
    };

    const handleToggleStatus = (id: string) => {
        toggleActionStatus(id);
        setBookmarks(getBookmarks());
    };

    const filteredBookmarks = bookmarks.filter(b => {
        if (filter === 'all') return true;
        if (filter === 'pending') return b.isActionItem && b.actionStatus === 'pending';
        if (filter === 'done') return b.isActionItem && b.actionStatus === 'done';
        return true;
    });

    const pendingCount = bookmarks.filter(b => b.isActionItem && b.actionStatus === 'pending').length;

    if (!mounted) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
            className="card p-5"
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" as const, stiffness: 500 }}
                    >
                        <BookmarkIcon className="w-4 h-4 text-[#d4a574]" />
                    </motion.div>
                    <h2 className="text-sm font-medium">Favoris</h2>
                    <span className="text-xs text-[#666]">({bookmarks.length})</span>
                    {pendingCount > 0 && (
                        <span className="px-1.5 py-0.5 bg-[#fbbf24]/10 text-[#fbbf24] text-[10px] rounded-full">
                            {pendingCount} à faire
                        </span>
                    )}
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-[#666] hover:text-white">
                        ✕
                    </button>
                )}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 mb-4 p-0.5 bg-[#0a0a0a] rounded-lg">
                {(['all', 'pending', 'done'] as const).map((f) => (
                    <motion.button
                        key={f}
                        whileHover={{ backgroundColor: filter !== f ? 'rgba(255,255,255,0.05)' : undefined }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setFilter(f)}
                        className={`flex-1 px-3 py-1.5 rounded text-xs transition-colors ${filter === f ? 'bg-[#1a1a1a] text-white' : 'text-[#666]'
                            }`}
                    >
                        {f === 'all' ? 'Tous' : f === 'pending' ? 'À faire' : 'Terminés'}
                    </motion.button>
                ))}
            </div>

            {/* Bookmarks List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                <AnimatePresence mode="popLayout">
                    {filteredBookmarks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-8 text-[#666] text-sm"
                        >
                            {filter === 'all' ? 'Aucun favori' : 'Aucun élément'}
                        </motion.div>
                    ) : (
                        filteredBookmarks.map((bookmark, index) => (
                            <motion.div
                                key={bookmark.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ delay: index * 0.02, type: "spring" as const }}
                                whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                                className="p-3 rounded-lg bg-[#0a0a0a] group"
                            >
                                <div className="flex items-start gap-3">
                                    {bookmark.isActionItem && (
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleToggleStatus(bookmark.id)}
                                            className={`mt-0.5 ${bookmark.actionStatus === 'done' ? 'text-[#4ade80]' : 'text-[#666]'
                                                }`}
                                        >
                                            {bookmark.actionStatus === 'done' ? (
                                                <Check className="w-4 h-4" />
                                            ) : (
                                                <Circle className="w-4 h-4" />
                                            )}
                                        </motion.button>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <a
                                            href={bookmark.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`text-sm font-medium line-clamp-1 hover:text-[#d4a574] transition-colors flex items-center gap-1 ${bookmark.actionStatus === 'done' ? 'line-through text-[#666]' : ''
                                                }`}
                                        >
                                            {bookmark.title}
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 shrink-0" />
                                        </a>

                                        <div className="flex items-center gap-2 mt-1 text-[10px] text-[#666]">
                                            <span>{bookmark.source}</span>
                                            <span>•</span>
                                            <span>{format(new Date(bookmark.createdAt), 'dd MMM', { locale: fr })}</span>
                                        </div>

                                        {bookmark.note && (
                                            <div className="mt-2 flex items-start gap-1.5 text-xs text-[#a1a1a1]">
                                                <StickyNote className="w-3 h-3 text-[#fbbf24] shrink-0 mt-0.5" />
                                                <span className="line-clamp-2">{bookmark.note}</span>
                                            </div>
                                        )}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleRemove(bookmark.id)}
                                        className="opacity-0 group-hover:opacity-100 text-[#666] hover:text-[#f87171] transition-opacity"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
