import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Clock, Bell, CheckCircle } from 'lucide-react';

interface ExamTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExamTimerModal: React.FC<ExamTimerModalProps> = ({ isOpen, onClose }) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(180 * 60); // 3 hours in seconds
  const [timeLeft, setTimeLeft] = useState<number>(180 * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [modeTitle, setModeTitle] = useState<string>('Standard 3-Hour Board Examination');

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      // Play soft chime or alert
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  if (!isOpen) return null;

  const handleSelectMode = (seconds: number, title: string) => {
    setIsActive(false);
    setSelectedDuration(seconds);
    setTimeLeft(seconds);
    setModeTitle(title);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(selectedDuration);
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((selectedDuration - timeLeft) / selectedDuration) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div
        className="w-full max-w-md rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <Clock className="w-5 h-5 text-[var(--accent)]" />
            </div>
            <div>
              <h3 className="text-base font-serif font-semibold text-[var(--text-primary)]">
                CBSE Exam Condition Simulator
              </h3>
              <p className="text-xs text-[var(--text-muted)] font-sans">
                Real-time invigilation pacing & sprint timer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-3 gap-2 my-5">
          <button
            onClick={() => handleSelectMode(180 * 60, 'CBSE 3-Hour Board Examination')}
            className={`py-2 px-2.5 text-xs font-mono rounded-lg border transition-all text-center cursor-pointer ${
              selectedDuration === 180 * 60
                ? 'border-[var(--accent)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-xs'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <div>3 Hours</div>
            <div className="text-[10px] text-[var(--text-muted)]">Official Board</div>
          </button>

          <button
            onClick={() => handleSelectMode(195 * 60, '15m Reading + 3h Writing')}
            className={`py-2 px-2.5 text-xs font-mono rounded-lg border transition-all text-center cursor-pointer ${
              selectedDuration === 195 * 60
                ? 'border-[var(--accent)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-xs'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <div>3h 15m</div>
            <div className="text-[10px] text-[var(--text-muted)]">+ Reading Time</div>
          </button>

          <button
            onClick={() => handleSelectMode(25 * 60, 'Pomodoro Revision Sprint')}
            className={`py-2 px-2.5 text-xs font-mono rounded-lg border transition-all text-center cursor-pointer ${
              selectedDuration === 25 * 60
                ? 'border-[var(--accent)] bg-[var(--bg-surface)] text-[var(--text-primary)] font-semibold shadow-xs'
                : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <div>25 Mins</div>
            <div className="text-[10px] text-[var(--text-muted)]">Sprint Revision</div>
          </button>
        </div>

        {/* Big Display Clock */}
        <div className="text-center py-6 px-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] my-2">
          <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
            {modeTitle}
          </div>
          <div className="text-5xl sm:text-6xl font-mono font-bold tracking-tight text-[var(--text-primary)] tabular-nums">
            {formatTime(timeLeft)}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[var(--border-strong)]/30 h-1.5 rounded-full mt-5 overflow-hidden">
            <div
              className="bg-[var(--accent)] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all shadow-sm cursor-pointer ${
              isActive ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[var(--accent)] hover:opacity-90'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isActive ? 'Pause Timer' : 'Start Simulation'}</span>
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[var(--border-strong)] text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Tips footer */}
        <p className="text-[11px] text-center text-[var(--text-muted)] mt-5 pt-3 border-t border-[var(--border-subtle)]">
          Tip: Open your selected question paper in split-screen or a second window while the timer runs to practice genuine exam tempo.
        </p>
      </div>
    </div>
  );
};
