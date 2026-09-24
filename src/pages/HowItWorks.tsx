import React from 'react';
import {
  Upload,
  Crown,
  ShieldCheck,
  Sparkles,
  Download,
  Eye,
  Feather,
  Sun,
  Lock,
  Layers,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '../components/common/Button';

interface HowItWorksProps {
  onNavigateToCreate: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigateToCreate }) => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs uppercase font-bold text-amber-400 tracking-widest bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
          Identity Architecture
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-cinzel">
          How BhaktiVision AI Preserves You
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Discover the technology, mathematical landmark preservation, and cultural sensitivity behind our devotional transformation pipeline.
        </p>
      </div>

      {/* 5-Step Visual Flow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          {
            num: '01',
            title: 'Upload Your Photo',
            desc: 'You provide a clear portrait photograph. We validate resolution, lighting, and framing without altering your facial data.',
            icon: Upload,
          },
          {
            num: '02',
            title: 'Choose Devotional Style',
            desc: 'Select a sacred archetype (Vrindavan Flute, Royal Ayodhya, etc.) with pre-configured classical attire and iconography.',
            icon: Crown,
          },
          {
            num: '03',
            title: 'AI Preserves Identity',
            desc: 'Our engine computes key facial geometries (eyes, nose, jaw, skin tones) and locks them from modification.',
            icon: ShieldCheck,
          },
          {
            num: '04',
            title: 'Generate Transformation',
            desc: 'The model weaves divine silk dhotis, ornate crowns, sacred wildlife, and celestial sunbeams organically around your person.',
            icon: Sparkles,
          },
          {
            num: '05',
            title: 'Download & Share',
            desc: 'Inspect your result with an interactive slider, confirm facial recognition, and download lossless 2K or 4K files.',
            icon: Download,
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 text-left space-y-3 relative group hover:border-amber-500/40 transition-all"
          >
            <span className="text-3xl font-extrabold text-amber-500/20 font-cinzel group-hover:text-amber-500/40 transition-colors">
              {item.num}
            </span>
            <item.icon className="w-6 h-6 text-amber-400" />
            <h3 className="text-base font-semibold text-white font-cinzel">
              {item.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* The 4 Disconnected Visual Streams (Section 44) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-amber-500/25 space-y-8 text-left shadow-2xl">
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
            Computer-Vision Separation of Concerns
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-cinzel">
            The 4-Stream Visual Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            The fundamental flaw in typical generative AI is conflating facial identity with scene style. BhaktiVision enforces strict mathematical separation across four decoupled channels:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-emerald-500/30 space-y-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Stream 1: Identity
            </span>
            <p className="text-xs text-slate-300">
              Sourced <strong>exclusively</strong> from your uploaded portrait and multi-angle references. Governs bone structure, eye contours, nose bridge, jawline, and natural skin undertones.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-blue-500/30 space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
              Stream 2: Pose
            </span>
            <p className="text-xs text-slate-300">
              Governs body stance (playing sacred flute or holding Kodanda bow). Ensures authentic finger placement and relaxed wrists without copying another human's face.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-amber-500/30 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Stream 3: Style
            </span>
            <p className="text-xs text-slate-300">
              Governs devotional garments: traditional mukut crown, yellow silk pitambari, angavastram drapes, pearl necklaces, kundalas, and peacock plumes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-purple-500/30 space-y-2">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
              Stream 4: Environment
            </span>
            <p className="text-xs text-slate-300">
              Governs background setting: ancient Vrindavan Kadamba groves, Yamuna ghats, Ayodhya marble pillars, peaceful Surabhi cows, and celestial twilight illumination.
            </p>
          </div>
        </div>
      </div>

      {/* Priority Hierarchy & Do-Not-Over-Edit Philosophy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        {/* Priority Hierarchy */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
              Execution Logic
            </span>
            <h3 className="text-xl font-bold text-white font-cinzel">
              Face Preservation Priority Hierarchy
            </h3>
            <p className="text-xs text-slate-400">
              When styling conflicts arise between decorative ornaments and facial recognition, our engine strictly resolves them using this priority rule:
            </p>
          </div>

          <div className="space-y-2.5">
            {[
              { rank: 'Priority 1', title: 'User Identity & Recognizable Face', desc: 'Face shape, eye spacing, nose, lips, natural asymmetry, and complexion are locked.' },
              { rank: 'Priority 2', title: 'Facial Geometry & Proportions', desc: 'No artificial face slimming, eye enlargement, or cosmetic facial distortion.' },
              { rank: 'Priority 3', title: 'Natural Anatomy & Hand Integrity', desc: 'Flute is held with authentic 5-finger anatomical hands, not distorted or floating.' },
              { rank: 'Priority 4', title: 'Selected Devotional Pose', desc: 'Flute playing posture or noble standing pose.' },
              { rank: 'Priority 5', title: 'Devotional Attire & Jewelry', desc: 'Crown, dhoti, necklaces, and sacred ornaments.' },
              { rank: 'Priority 6', title: 'Sacred Wildlife & Scenery', desc: 'Cow, deer, peacocks, trees, and riverbanks.' },
              { rank: 'Priority 7', title: 'Atmospheric Lighting', desc: 'Celestial rim light, divine halo, and golden hour warmth.' },
            ].map((p, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3 text-xs"
              >
                <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-semibold font-mono text-[10px] whitespace-nowrap">
                  {p.rank}
                </span>
                <div>
                  <strong className="text-slate-200 block">{p.title}</strong>
                  <span className="text-slate-400">{p.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy: Do Not Over-Edit */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
              Core Philosophy
            </span>
            <h3 className="text-xl font-bold text-white font-cinzel">
              "Change Only What Needs to Be Changed"
            </h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Many AI generators excessively beautify, cartoonize, or reconstruct human faces. If you upload a warm portrait, BhaktiVision does not reshape your cheekbones, flatten your skin into plastic wax, or replace your age expression.
          </p>

          <div className="space-y-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 space-y-1">
              <span className="font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                What We Preserve:
              </span>
              <p className="text-slate-300">
                Exact facial contours, laugh lines, natural skin pore realism, facial asymmetry, and age integrity.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 space-y-1">
              <span className="font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                What We Strictly Avoid:
              </span>
              <p className="text-slate-300">
                Plastic smoothing, exaggerated fantasy eyes, altered ethnicities, extra fingers, or synthetic doll faces.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Button
              className="w-full"
              onClick={onNavigateToCreate}
              icon={<Sparkles className="w-4 h-4 text-slate-950" />}
            >
              Start Your Transformation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
