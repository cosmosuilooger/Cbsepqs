import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Compass, Globe, Landmark, TrendingUp, Feather, Eye, ArrowRight, ShieldCheck } from 'lucide-react';
import { ALL_SUBJECTS, SUBJECT_METADATA } from '../data/papers';

interface EntranceAnimationProps {
  onEnter: () => void;
}

export const EntranceAnimation: React.FC<EntranceAnimationProps> = ({ onEnter }) => {
  const [skipFuture, setSkipFuture] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleProceed();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [skipFuture]);

  const handleProceed = () => {
    if (skipFuture) {
      localStorage.setItem('cbse_skip_intro', 'true');
    }
    onEnter();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
      style={{
        backgroundColor: '#fbf7ef',
        backgroundImage: 'radial-gradient(#e8ddc7 0.8px, transparent 0.8px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="absolute top-6 right-6">
        <button
          onClick={handleProceed}
          className="text-xs font-mono uppercase tracking-widest text-[#8b7c6c] hover:text-[#2a221b] transition-colors py-1.5 px-3 rounded border border-[#e8ddc7] bg-[#fdfaf3]/80 hover:bg-[#fffdf8]"
        >
          Skip Intro [Esc/Enter]
        </button>
      </div>

      <div className="w-full max-w-3xl my-auto text-center py-8">
        {/* Archival Seal & Emblem */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center justify-center mb-6"
        >
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full border border-[#d5c6a5] bg-[#f5eedf] shadow-sm">
            <div className="absolute inset-1 rounded-full border border-dashed border-[#e8ddc7]" />
            <BookOpen className="w-8 h-8 text-[#9a3412]" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Academic Hierarchy Headers */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#8b7c6c]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#9a3412]" />
            <span>Central Board of Secondary Education · Class XII</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-[#2a221b] tracking-tight leading-tight">
            Humanities Papers Archive
          </h1>

          <p className="text-sm sm:text-base font-serif italic text-[#5e5043] max-w-xl mx-auto">
            Comprehensive digital repository of official question papers, set variants & solutions spanning 2012 through 2026.
          </p>
        </motion.div>

        {/* Eye Care Callout Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#d5c6a5] bg-[#fdfaf3] text-[#2a221b] text-xs font-sans shadow-xs"
        >
          <Eye className="w-3.5 h-3.5 text-[#b45309]" />
          <span className="font-medium">Eye Care Mode Active by Default:</span>
          <span className="text-[#5e5043]">Warm sepia anti-glare paperwhite calibrated for long study sessions</span>
        </motion.div>

        {/* 5 Subjects Staggered Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 mt-8 mb-8 text-left"
        >
          {ALL_SUBJECTS.map((sub, idx) => {
            const meta = SUBJECT_METADATA[sub];
            const iconMap: Record<string, React.ReactNode> = {
              Globe: <Globe className="w-4 h-4 text-[#9a3412]" strokeWidth={1.5} />,
              Landmark: <Landmark className="w-4 h-4 text-[#9a3412]" strokeWidth={1.5} />,
              TrendingUp: <TrendingUp className="w-4 h-4 text-[#9a3412]" strokeWidth={1.5} />,
              BookOpen: <BookOpen className="w-4 h-4 text-[#9a3412]" strokeWidth={1.5} />,
              Feather: <Feather className="w-4 h-4 text-[#9a3412]" strokeWidth={1.5} />,
            };

            const paperCountMap: Record<string, number> = {
              Geography: 314,
              History: 347,
              Economics: 350,
              Hindi: 695,
              English: 386,
            };

            return (
              <motion.div
                key={sub}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 + idx * 0.08 }}
                className="p-3 sm:p-3.5 rounded-lg border border-[#e8ddc7] bg-[#fdfaf3] hover:bg-[#fffdf8] hover:border-[#d5c6a5] transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="p-1 rounded bg-[#f5eedf]">
                    {iconMap[meta.icon]}
                  </div>
                  <span className="text-[10px] font-mono text-[#8b7c6c]">Code {meta.code.split('/')[0].trim()}</span>
                </div>
                <div className="text-sm font-serif font-semibold text-[#2a221b] group-hover:text-[#9a3412] transition-colors">
                  {meta.name}
                </div>
                <div className="text-[11px] text-[#8b7c6c] mt-0.5 font-sans">
                  {meta.hindiName}
                </div>
                <div className="text-xs font-mono font-medium text-[#5e5043] mt-2 pt-1.5 border-t border-[#f5eedf]">
                  {paperCountMap[sub]} Papers
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Aggregate Stats Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-[#5e5043] py-2 border-y border-[#e8ddc7] mb-8"
        >
          <div>
            <span className="font-bold text-[#2a221b]">2,092</span> Total Papers
          </div>
          <span className="text-[#d5c6a5]">·</span>
          <div>
            <span className="font-bold text-[#2a221b]">15</span> Academic Years
          </div>
          <span className="text-[#d5c6a5]">·</span>
          <div>
            <span className="font-bold text-[#2a221b]">100%</span> Authentic Official Links
          </div>
          <span className="text-[#d5c6a5]">·</span>
          <div>
            <span className="font-bold text-[#2a221b]">Core & Elective</span> Coverage
          </div>
        </motion.div>

        {/* Enter Action & Skip Checkbox */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={handleProceed}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-lg text-sm font-medium tracking-wide text-white bg-[#9a3412] hover:bg-[#852d0f] transition-all shadow-md hover:shadow-lg active:scale-[0.99] cursor-pointer"
          >
            <span>Enter Humanities Archive</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <label className="flex items-center gap-2 text-xs text-[#8b7c6c] hover:text-[#5e5043] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={skipFuture}
              onChange={(e) => setSkipFuture(e.target.checked)}
              className="rounded border-[#d5c6a5] text-[#9a3412] focus:ring-[#9a3412]"
            />
            <span>Remember preference & skip this welcome on future visits</span>
          </label>
        </motion.div>
      </div>
    </motion.div>
  );
};
