import React from 'react';
import { Sparkles, Shield, Heart, Eye } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-amber-500/20 bg-slate-950 text-slate-400 relative overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 to-indigo-900 p-0.5 shadow-md shadow-amber-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-cinzel">
                Bhakti<span className="text-amber-400">Vision</span> AI
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              "Your Face. Your Identity. Your Devotional Form." Built with profound respect for Indian spiritual heritage, combining advanced AI identity preservation with divine artistic traditions.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-amber-300/80">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                Private & Secure
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                Identity Preserved
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-amber-400" />
                Culturally Reverent
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-200 font-cinzel">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('create')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Create Transformation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('styles')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Devotional Styles Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Personal Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Identity Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-300 transition-colors"
                >
                  About the Project
                </button>
              </li>
            </ul>
          </div>

          {/* Ethical AI & Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-200 font-cinzel">
              Ethical Standard
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed to preserve your recognizable facial identity while creating sacred devotional styling. We do not promise 100% exact biological replication, but prioritize faithful preservation of facial geometry, eyes, nose, and natural skin tone.
            </p>
            <p className="text-xs text-slate-500 pt-1">
              Your uploaded photographs are processed for your requested transformation and remain under your account control.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} BhaktiVision AI. All sacred traditions respected.</p>
          <div className="flex items-center gap-6">
            <span>Powered by Gemini AI</span>
            <span>Identity Protection Engine v2.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
