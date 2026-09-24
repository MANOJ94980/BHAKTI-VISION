import React from 'react';
import { Lock, Sparkles, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const IdentityProtection: React.FC = () => {
  const lockedItems = [
    'Facial geometry & bone structure',
    'Eye shape, spacing & iris placement',
    'Nose bridge, width & tip contours',
    'Lip contour & mouth corners',
    'Jawline & chin anatomy',
    'Natural skin tone & texture',
    'Facial asymmetry & distinctive marks',
  ];

  const transformedItems = [
    'Traditional crown (mukut) & ornaments',
    'Sacred silk dhoti & angavastram',
    'Hairstyle & divine curls',
    'Classical jewelry & pearl necklaces',
    'Sacred flute (bansuri) / Kodanda bow',
    'Divine Vrindavan / Ayodhya landscape',
    'Atmospheric celestial lighting & rays',
  ];

  return (
    <div className="bg-slate-900/80 border border-amber-500/25 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white font-cinzel">
              Identity Protection Architecture
            </h4>
            <p className="text-xs text-slate-400">
              Designed to preserve your recognizable facial features while transforming devotional styling
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold rounded-full items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Identity Guard Active
        </span>
      </div>

      {/* Side-by-side Locked vs Editable regions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Locked Regions */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/20 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Locked / Protected Regions</span>
          </div>
          <p className="text-[11px] text-slate-400">
            The AI strictly preserves these attributes directly from your source portrait:
          </p>
          <ul className="space-y-1.5 pt-1">
            {lockedItems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Transformed Regions */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/20 space-y-2.5">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transformed Devotional Styling</span>
          </div>
          <p className="text-[11px] text-slate-400">
            The AI seamlessly integrates these sacred elements around your person:
          </p>
          <ul className="space-y-1.5 pt-1">
            {transformedItems.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ethical Language Callout */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200/90 leading-relaxed">
        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-amber-300">Responsible AI Commitment: </strong>
          BhaktiVision AI does not promise exact pixel-perfect biological replication, but implements advanced image conditioning designed to preserve your recognizable identity and natural features faithfully.
        </p>
      </div>
    </div>
  );
};
