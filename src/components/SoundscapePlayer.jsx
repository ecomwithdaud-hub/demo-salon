import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, SkipForward, Music2, ChevronDown, ChevronUp } from 'lucide-react';
import { useSanctuary } from '../context/SanctuaryContext';

export default function SoundscapePlayer() {
  const {
    theme,
    isPlayingAudio,
    toggleAudio,
    trackIndex,
    changeTrack,
    volume,
    updateVolume,
    tracks,
  } = useSanctuary();

  const [expanded, setExpanded] = useState(false);
  const currentTrack = tracks[trackIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="fixed bottom-5 left-5 z-40"
    >
      <div
        className="rounded-2xl border backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: theme.isDark ? 'rgba(29, 25, 23, 0.9)' : 'rgba(251, 248, 243, 0.92)',
          borderColor: theme.border,
          color: theme.text,
          width: expanded ? '300px' : 'auto',
        }}
      >
        {/* Compact Bar */}
        <div className="px-3.5 py-2.5 flex items-center gap-3">
          <button
            onClick={toggleAudio}
            aria-label={isPlayingAudio ? 'Pause spa soundscape' : 'Play spa soundscape'}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-105 cursor-pointer shrink-0"
            style={{
              backgroundColor: isPlayingAudio ? theme.accent : theme.surface,
              color: isPlayingAudio ? '#FFFFFF' : theme.text,
            }}
          >
            {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          <div className="min-w-0 pr-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: theme.muted }}>
                Soundscape
              </span>
              {isPlayingAudio && (
                <div className="flex items-end gap-[2px] h-3">
                  {[0, 0.25, 0.5, 0.15].map((delay, i) => (
                    <span
                      key={i}
                      className="w-[2px] h-full rounded-full eq-bar"
                      style={{
                        backgroundColor: theme.accent,
                        animationDelay: `${delay}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="text-xs font-medium truncate max-w-[145px]">
              {currentTrack.title}
            </div>
          </div>

          <button
            onClick={() => setExpanded((e) => !e)}
            className="p-1.5 rounded-full hover:opacity-75 cursor-pointer ml-auto"
            aria-label="Toggle soundscape controls"
          >
            {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Expanded Deck */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-4 pt-2 border-t space-y-3"
              style={{ borderColor: theme.border }}
            >
              <div className="flex items-center justify-between text-[11px]" style={{ color: theme.muted }}>
                <span className="flex items-center gap-1.5">
                  <Music2 className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                  {currentTrack.mood}
                </span>
                <button
                  onClick={() => changeTrack(trackIndex + 1)}
                  className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-medium hover:underline cursor-pointer"
                  style={{ color: theme.text }}
                >
                  Next <SkipForward className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-1">
                {tracks.map((trk, idx) => (
                  <button
                    key={trk.id}
                    onClick={() => {
                      changeTrack(idx);
                      if (!isPlayingAudio) toggleAudio();
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between cursor-pointer"
                    style={{
                      backgroundColor: idx === trackIndex ? theme.surface : 'transparent',
                      fontWeight: idx === trackIndex ? 600 : 400,
                    }}
                  >
                    <span className="truncate">{trk.title}</span>
                    {idx === trackIndex && (
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: theme.accent }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                {volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 shrink-0" style={{ color: theme.muted }} />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 shrink-0" style={{ color: theme.accent }} />
                )}
                <input
                  type="range"
                  min="0"
                  max="0.8"
                  step="0.05"
                  value={volume}
                  onChange={(e) => updateVolume(parseFloat(e.target.value))}
                  className="w-full accent-[#C88E83] cursor-pointer h-1"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
