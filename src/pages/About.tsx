import React from 'react';
import { Sparkles, Heart, Shield, Lock, Eye, Code2, Server, Database } from 'lucide-react';
import { Button } from '../components/common/Button';

interface AboutProps {
  onNavigateToCreate: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigateToCreate }) => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16 text-left">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold text-amber-400 tracking-widest bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
          About The Initiative
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-cinzel">
          BhaktiVision AI
        </h1>
        <p className="text-base text-amber-300 font-cinzel">
          "Your Face. Your Identity. Your Devotional Form."
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-amber-500/25 space-y-4 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-cinzel flex items-center gap-2">
          <Heart className="w-6 h-6 text-amber-400" />
          Our Sacred Mission
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          For thousands of years, Indian devotional traditions have celebrated the divine within every being. Through classical iconography, sacred poetry, and temple sculptures, devotees have meditated upon the divine forms of Lord Krishna and Lord Sri Ram.
        </p>
        <p className="text-sm text-slate-300 leading-relaxed">
          BhaktiVision AI was founded to unite state-of-the-art computer vision with profound cultural reverence. Our goal is not to produce disposable generic fantasy art, but to enable every devotee to witness their recognizable self adorned in timeless sacred textiles, crowns, and sanctified surroundings.
        </p>
      </div>

      {/* Privacy Pledge (Section 30) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-emerald-500/25 space-y-4 shadow-xl">
        <h2 className="text-2xl font-bold text-white font-cinzel flex items-center gap-2 text-emerald-300">
          <Shield className="w-6 h-6 text-emerald-400" />
          Our Privacy & Data Stewardship Pledge
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Because our users upload personal and family photographs, privacy is our highest technical and ethical priority:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs">
            <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Private By Default
            </span>
            <p className="text-slate-400">
              Uploaded photos and generated transformations are never made publicly visible without explicit user export.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs">
            <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              User Ownership
            </span>
            <p className="text-slate-400">
              Your generated images belong to your personal account. You can download and permanently delete them at any time.
            </p>
          </div>
        </div>
      </div>

      {/* Technology Stack Breakdown (Section 2) */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <h2 className="text-2xl font-bold text-white font-cinzel flex items-center gap-2">
          <Code2 className="w-6 h-6 text-amber-400" />
          Modern Engineering Architecture
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-850 space-y-2">
            <span className="font-bold text-amber-300 uppercase tracking-wider block">
              Frontend Client
            </span>
            <ul className="text-slate-400 space-y-1">
              <li>• React 19 & TypeScript</li>
              <li>• Tailwind CSS & Cinzel typography</li>
              <li>• Motion interactive animations</li>
              <li>• Client-side aspect ratio validation</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-850 space-y-2">
            <span className="font-bold text-amber-300 uppercase tracking-wider block">
              Server & AI Engine
            </span>
            <ul className="text-slate-400 space-y-1">
              <li>• Node.js & Express API</li>
              <li>• Gemini Image Generation API</li>
              <li>• Identity Protection Prompt Engine</li>
              <li>• Automatic fallback to Mock provider</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-850 space-y-2">
            <span className="font-bold text-amber-300 uppercase tracking-wider block">
              Persistence & Auth
            </span>
            <ul className="text-slate-400 space-y-1">
              <li>• Firebase Authentication</li>
              <li>• Firebase Firestore metadata</li>
              <li>• Resilient local fallback storage</li>
              <li>• Zero frontend API key exposure</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Action Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 to-indigo-950/40 border border-amber-500/30 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white font-cinzel">
          Ready to See Your Devotional Form?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Begin your transformation now with our intuitive, identity-preserving workflow.
        </p>
        <div className="pt-2">
          <Button
            size="lg"
            onClick={onNavigateToCreate}
            icon={<Sparkles className="w-5 h-5 text-slate-950" />}
          >
            Create Your Image
          </Button>
        </div>
      </div>
    </div>
  );
};
