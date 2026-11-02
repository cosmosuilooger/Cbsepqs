import React from 'react';
import { Eye, Sun, Moon, BookOpen, X, Check, Sliders, Sparkles, Shield } from 'lucide-react';
import { EyeCareSettings, ThemeMode, WarmthLevel, TextScale } from '../types';

interface EyeCareSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: EyeCareSettings;
  onUpdateSettings: (newSettings: Partial<EyeCareSettings>) => void;
}

export const EyeCareSettingsModal: React.FC<EyeCareSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const themes: { id: ThemeMode; label: string; desc: string; icon: React.ReactNode; previewBg: string }[] = [
    {
      id: 'eyecare',
      label: 'Eye Care Sepia',
      desc: 'Warm paperwhite calibrated to reduce blue-light glare (Default)',
      icon: <Eye className="w-4 h-4 text-[#b45309]" />,
      previewBg: 'bg-[#fbf7ef] border-[#e8ddc7]',
    },
    {
      id: 'midnight',
      label: 'Midnight Scholar',
      desc: 'Soft OLED-safe charcoal for late-night intensive revisions',
      icon: <Moon className="w-4 h-4 text-amber-400" />,
      previewBg: 'bg-[#12100e] border-[#302b25]',
    },
    {
      id: 'parchment',
      label: 'Vintage Parchment',
      desc: 'Classic antique book tone with subtle earthy organic ink',
      icon: <BookOpen className="w-4 h-4 text-[#78350f]" />,
      previewBg: 'bg-[#f4ecdc] border-[#dccbb0]',
    },
    {
      id: 'studio',
      label: 'Studio Daylight',
      desc: 'Clean, neutral architectural light with crisp modern contrast',
      icon: <Sun className="w-4 h-4 text-slate-700" />,
      previewBg: 'bg-[#f9fafb] border-[#e5e7eb]',
    },
  ];

  const warmthOptions: { id: WarmthLevel; label: string; kelvin: string }[] = [
    { id: 'mild', label: 'Mild Warmth', kelvin: '3200K' },
    { id: 'deep', label: 'Deep Amber', kelvin: '2800K' },
    { id: 'candlelight', label: 'Candlelight', kelvin: '2400K' },
  ];

  const textScales: { id: TextScale; label: string; size: string }[] = [
    { id: 'sm', label: 'Compact', size: '14px' },
    { id: 'base', label: 'Standard', size: '15px' },
    { id: 'lg', label: 'Comfortable', size: '17px' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div
        className="w-full max-w-lg rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] p-6 shadow-xl transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <Eye className="w-5 h-5 text-[var(--accent-amber)]" />
            </div>
            <div>
              <h3 className="text-base font-serif font-semibold text-[var(--text-primary)]">
                Eye Care & Reading Settings
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-sans">
                Calibrated optical comfort for extended syllabus study sessions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-5 space-y-5">
          {/* Theme Palette Modes */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2.5">
              Atmospheric Reading Themes
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onUpdateSettings({ mode: t.id })}
                  className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    settings.mode === t.id
                      ? 'border-[var(--accent)] bg-[var(--bg-surface)] ring-1 ring-[var(--accent)]'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded border flex items-center justify-center shrink-0 ${t.previewBg}`}>
                    {t.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[var(--text-primary)]">
                        {t.label}
                      </span>
                      {settings.mode === t.id && (
                        <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] leading-tight mt-0.5 line-clamp-2">
                      {t.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Warmth Spectrum (when in eyecare or parchment mode) */}
          {(settings.mode === 'eyecare' || settings.mode === 'parchment') && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                  Warmth Spectrum (Circadian Balance)
                </label>
                <span className="text-xs font-mono text-[var(--accent-amber)]">
                  {warmthOptions.find((w) => w.id === settings.warmth)?.kelvin}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {warmthOptions.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => onUpdateSettings({ warmth: w.id })}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer ${
                      settings.warmth === w.id
                        ? 'border-[var(--accent-amber)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs'
                        : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <div>{w.label}</div>
                    <div className="text-[10px] text-[var(--text-muted)] font-mono">{w.kelvin}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Typography Text Scale */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] mb-2">
              Typography Measure & Scale
            </label>
            <div className="grid grid-cols-3 gap-2">
              {textScales.map((ts) => (
                <button
                  key={ts.id}
                  onClick={() => onUpdateSettings({ textScale: ts.id })}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer ${
                    settings.textScale === ts.id
                      ? 'border-[var(--accent)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs font-semibold'
                      : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <div>{ts.label}</div>
                  <div className="text-[10px] text-[var(--text-muted)] font-mono">{ts.size}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Reading Ruler Toggle */}
          <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
            <div>
              <div className="text-xs font-semibold text-[var(--text-primary)]">
                Focus Reading Line Guide
              </div>
              <div className="text-[11px] text-[var(--text-muted)]">
                Highlights the currently hovered table row or paper card
              </div>
            </div>
            <button
              onClick={() => onUpdateSettings({ readingRuler: !settings.readingRuler })}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-hidden ${
                settings.readingRuler ? 'bg-[var(--accent)]' : 'bg-[var(--border-strong)]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                  settings.readingRuler ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Scientific Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[11px] text-[var(--text-secondary)] leading-relaxed">
            <Shield className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
            <div>
              <strong>Academic Eye-Care Constitution:</strong> Eliminates excessive high-contrast whites and harsh blues that trigger asthenopia (visual fatigue). Recommended for multi-hour revision and paper solving.
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-[var(--border-subtle)]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg text-white bg-[var(--accent)] hover:opacity-90 transition-opacity cursor-pointer"
          >
            Apply & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
