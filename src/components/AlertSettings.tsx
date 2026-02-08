'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Plus, X, Volume2, VolumeX } from 'lucide-react';
import { AlertPreferences, getAlertPreferences, saveAlertPreferences, requestNotificationPermission } from '@/lib/alerts';

interface AlertSettingsProps {
    onClose?: () => void;
}

export default function AlertSettings({ onClose }: AlertSettingsProps) {
    const [prefs, setPrefs] = useState<AlertPreferences>({
        enabled: true,
        scoreThreshold: 25,
        keywords: [],
        notifyOnNewRecommendation: true,
    });
    const [newKeyword, setNewKeyword] = useState('');
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setPrefs(getAlertPreferences());
        if ('Notification' in window) {
            setNotificationPermission(Notification.permission);
        }
    }, []);

    const updatePrefs = (updates: Partial<AlertPreferences>) => {
        const newPrefs = { ...prefs, ...updates };
        setPrefs(newPrefs);
        saveAlertPreferences(newPrefs);
    };

    const addKeyword = () => {
        if (newKeyword.trim() && !prefs.keywords.includes(newKeyword.trim())) {
            updatePrefs({ keywords: [...prefs.keywords, newKeyword.trim()] });
            setNewKeyword('');
        }
    };

    const removeKeyword = (keyword: string) => {
        updatePrefs({ keywords: prefs.keywords.filter(k => k !== keyword) });
    };

    const handleRequestPermission = async () => {
        const granted = await requestNotificationPermission();
        setNotificationPermission(granted ? 'granted' : 'denied');
    };

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
                        <Bell className="w-4 h-4 text-[#fbbf24]" />
                    </motion.div>
                    <h2 className="text-sm font-medium">Alertes</h2>
                </div>
                {onClose && (
                    <button onClick={onClose} className="text-[#666] hover:text-white">
                        ✕
                    </button>
                )}
            </div>

            <div className="space-y-4">
                {/* Enable/Disable */}
                <div className="flex items-center justify-between">
                    <span className="text-sm">Alertes activées</span>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updatePrefs({ enabled: !prefs.enabled })}
                        className={`w-12 h-6 rounded-full transition-colors ${prefs.enabled ? 'bg-[#4ade80]' : 'bg-[#333]'
                            }`}
                    >
                        <motion.div
                            animate={{ x: prefs.enabled ? 24 : 2 }}
                            transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
                            className="w-5 h-5 bg-white rounded-full"
                        />
                    </motion.button>
                </div>

                {/* Browser Notifications */}
                <div className="p-3 rounded-lg bg-[#0a0a0a]">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#666]">Notifications navigateur</span>
                        {notificationPermission === 'granted' ? (
                            <span className="flex items-center gap-1 text-[10px] text-[#4ade80]">
                                <Volume2 className="w-3 h-3" /> Activées
                            </span>
                        ) : notificationPermission === 'denied' ? (
                            <span className="flex items-center gap-1 text-[10px] text-[#f87171]">
                                <VolumeX className="w-3 h-3" /> Bloquées
                            </span>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleRequestPermission}
                                className="text-[10px] px-2 py-1 bg-[#d4a574] text-black rounded"
                            >
                                Activer
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Score Threshold */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs text-[#666]">Score minimum pour alerte</label>
                        <span className="text-sm font-medium">{prefs.scoreThreshold}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="50"
                        value={prefs.scoreThreshold}
                        onChange={e => updatePrefs({ scoreThreshold: parseInt(e.target.value) })}
                        className="w-full accent-[#d4a574]"
                    />
                </div>

                {/* New Recommendations */}
                <div className="flex items-center justify-between">
                    <span className="text-xs text-[#666]">Alerter sur nouvelles recommandations</span>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updatePrefs({ notifyOnNewRecommendation: !prefs.notifyOnNewRecommendation })}
                        className={`w-10 h-5 rounded-full transition-colors ${prefs.notifyOnNewRecommendation ? 'bg-[#4ade80]' : 'bg-[#333]'
                            }`}
                    >
                        <motion.div
                            animate={{ x: prefs.notifyOnNewRecommendation ? 20 : 2 }}
                            transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
                            className="w-4 h-4 bg-white rounded-full"
                        />
                    </motion.button>
                </div>

                {/* Keyword Watchlist */}
                <div>
                    <label className="text-xs text-[#666] mb-2 block">Mots-clés surveillés</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={newKeyword}
                            onChange={e => setNewKeyword(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addKeyword()}
                            placeholder="Ajouter un mot-clé..."
                            className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-[rgba(255,255,255,0.06)] rounded text-sm placeholder:text-[#666]"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={addKeyword}
                            className="px-3 py-2 bg-[#1a1a1a] rounded hover:bg-[#222]"
                        >
                            <Plus className="w-4 h-4" />
                        </motion.button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {prefs.keywords.map(keyword => (
                            <motion.span
                                key={keyword}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-1 px-2 py-1 bg-[#0a0a0a] rounded text-xs group"
                            >
                                {keyword}
                                <button
                                    onClick={() => removeKeyword(keyword)}
                                    className="text-[#666] hover:text-[#f87171]"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </motion.span>
                        ))}
                        {prefs.keywords.length === 0 && (
                            <span className="text-xs text-[#666]">Aucun mot-clé</span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
