import React, { useEffect, useState } from 'react';
import { Sparkles, Shield, Compass, Palette, Sun, CheckCircle } from 'lucide-react';
import { GenerationState } from '../../types/generation';

interface GenerationProgressProps {
  currentState: GenerationState;
  styleName: string;
}

const STEPS = [
  { key: 'preparing', label: 'Preparing your image...', icon: Sparkles, detail: 'Validating resolution and portrait framing' },
  { key: 'analyzing', label: 'Analyzing the reference...', icon: Compass, detail: 'Mapping facial landmarks and geometry' },
  { key: 'preserving_identity', label: 'Preserving facial identity...', icon: Shield, detail: 'Locking facial contours, eyes, nose and skin tone' },
  { key: 'applying_devotional_styling', label: 'Applying devotional styling...', icon: Palette, detail: 'Weaving sacred silk attire, crown and ornaments' },
  { key: 'creating_environment', label: 'Creating the environment...', icon: Sun, detail: 'Composing sacred landscape and divine wildlife' },
  { key: 'refining_details', label: 'Refining details...', icon: Sparkles, detail: 'Balancing celestial illumination and realistic anatomy' },
  { key: 'finalizing', label: 'Finalizing your image...', icon: CheckCircle, detail: 'Executing quality control checks' },
];

export const GenerationProgress: React.FC<GenerationProgressProps> = ({
  currentState,
  styleName,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Progressive auto-advancer for visual pacing during generation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const currentStep = STEPS[activeStepIndex] || STEPS[0];
  const progressPercent = Math.min(100, Math.round(((activeStepIndex + 1) / STEPS.length) * 100));

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Radiant Animated Aura */}
      <div className="relative w-28 h-28 mx-auto mb-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-amber-400/40 animate-ping opacity-30" />
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-amber-500/60 animate-spin" style={{ animationDuration: '10s' }} />
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-600 to-indigo-900 p-0.5 shadow-xl shadow-amber-500/30 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
            <currentStep.icon className="w-8 h-8 text-amber-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main State Label */}
      <div className="space-y-2 mb-6">
        <span className="text-xs uppercase font-bold text-amber-400 tracking-widest bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
          Devotional Transformation In Progress
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold text-white font-cinzel pt-2">
          {currentStep.label}
        </h3>
        <p className="text-sm text-slate-400">
          Transforming into <span className="text-amber-300 font-semibold">{styleName}</span> while locking your facial identity.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto mb-8">
        <div className="flex justify-between text-xs text-slate-400 mb-2">
          <span>{currentStep.detail}</span>
          <span className="text-amber-400 font-semibold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-full transition-all duration-700 shadow-sm shadow-amber-400/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-left">
        {STEPS.slice(0, 4).map((step, idx) => {
          const isDone = idx < activeStepIndex;
          const isCurrent = idx === activeStepIndex;
          return (
            <div
              key={step.key}
              className={`p-2.5 rounded-xl border text-[11px] transition-all ${
                isCurrent
                  ? 'bg-amber-500/15 border-amber-400/60 text-amber-200'
                  : isDone
                  ? 'bg-slate-950/70 border-emerald-500/30 text-emerald-300'
                  : 'bg-slate-950/40 border-slate-850 text-slate-500'
              }`}
            >
              <div className="flex items-center gap-1.5 font-medium">
                {isDone ? (
                  <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                ) : (
                  <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-amber-400 animate-ping' : 'bg-slate-600'}`} />
                )}
                <span className="truncate">{step.label.replace('...', '')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
