import React, { useState } from 'react';
import { DEVOTIONAL_STYLES, FUTURE_CATEGORIES } from '../data/devotionalStyles';
import { CategoryTabs } from '../components/styles/CategoryTabs';
import { StyleGrid } from '../components/styles/StyleGrid';
import { DevotionalStyle, DeityCategory } from '../types/style';
import { Modal } from '../components/common/Modal';
import { BeforeAfterSlider } from '../components/result/BeforeAfterSlider';
import { Button } from '../components/common/Button';
import { Sparkles, Crown, Feather, Trees, Sun, Clock } from 'lucide-react';

interface StylesProps {
  onSelectStyleForCreation: (styleId: string) => void;
}

export const Styles: React.FC<StylesProps> = ({ onSelectStyleForCreation }) => {
  const [selectedCategory, setSelectedCategory] = useState<DeityCategory>('All');
  const [previewStyle, setPreviewStyle] = useState<DevotionalStyle | null>(null);

  const filteredStyles = DEVOTIONAL_STYLES.filter((s) => {
    if (selectedCategory === 'All') return true;
    return s.deity === selectedCategory;
  });

  const categoryCounts: Record<DeityCategory, number> = {
    All: DEVOTIONAL_STYLES.length,
    Krishna: DEVOTIONAL_STYLES.filter((s) => s.deity === 'Krishna').length,
    Ram: DEVOTIONAL_STYLES.filter((s) => s.deity === 'Ram').length,
    Shiva: 0,
    Devi: 0,
    Vishnu: 0,
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase font-bold text-amber-400 tracking-widest bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
          Devotional Catalog
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-cinzel">
          Devotional Styles Library
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Explore curated sacred templates designed to transform your attire, adornments, and environment while faithfully preserving your recognizable identity.
        </p>

        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          counts={categoryCounts}
        />
      </div>

      {/* Main Styles Grid */}
      <StyleGrid
        styles={filteredStyles}
        onSelectStyle={(style) => setPreviewStyle(style)}
        onPreviewSample={(style) => setPreviewStyle(style)}
      />

      {/* Future Categories Teaser (Section 13) */}
      <div className="pt-12 border-t border-slate-800 space-y-6">
        <div className="text-center space-y-1.5">
          <span className="text-xs uppercase font-bold text-amber-500/80 tracking-widest">
            Future Expansions
          </span>
          <h3 className="text-2xl font-bold text-white font-cinzel">
            Upcoming Devotional Traditions
          </h3>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Our modular architecture is built to seamlessly support additional Vedic and classical traditions in forthcoming releases.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FUTURE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="p-5 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-left space-y-2 opacity-70 hover:opacity-100 transition-opacity"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-200 font-cinzel">
                  {cat.name}
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {cat.count}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Style Details Modal */}
      {previewStyle && (
        <Modal
          isOpen={Boolean(previewStyle)}
          onClose={() => setPreviewStyle(null)}
          title={previewStyle.name}
          subtitle={previewStyle.description}
          maxWidth="4xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Visual Preview */}
            <div className="space-y-4">
              {previewStyle.sampleBeforeAfter ? (
                <div className="rounded-2xl overflow-hidden border border-amber-500/30">
                  <BeforeAfterSlider
                    beforeImage={previewStyle.sampleBeforeAfter.before}
                    afterImage={previewStyle.sampleBeforeAfter.after}
                    beforeLabel="Source Portrait"
                    afterLabel={previewStyle.name}
                    aspectRatioClass="aspect-[4/3]"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={previewStyle.thumbnail}
                    alt={previewStyle.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Style Breakdown */}
            <div className="space-y-5 text-left text-xs">
              {/* Preserved list */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/20 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase tracking-wider block">
                  Preserved Elements:
                </span>
                <p className="text-slate-300">
                  {previewStyle.preserve.join(', ')}
                </p>
              </div>

              {/* Transformation list */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/20 space-y-1.5">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">
                  Devotional Transformation:
                </span>
                <ul className="text-slate-300 space-y-1">
                  {previewStyle.transformation.map((t, i) => (
                    <li key={i}>• {t}</li>
                  ))}
                </ul>
              </div>

              {/* Environment */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                <span className="text-slate-300 font-bold uppercase tracking-wider block">
                  Sacred Environment:
                </span>
                <p className="text-slate-400">
                  {previewStyle.environment.join(', ')}
                </p>
              </div>

              <div className="pt-2">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    const sid = previewStyle.id;
                    setPreviewStyle(null);
                    onSelectStyleForCreation(sid);
                  }}
                  icon={<Sparkles className="w-4 h-4 text-slate-950" />}
                >
                  Create With This Style
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
