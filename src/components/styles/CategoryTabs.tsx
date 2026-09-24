import React from 'react';
import { DeityCategory } from '../../types/style';

interface CategoryTabsProps {
  selectedCategory: DeityCategory;
  onSelectCategory: (cat: DeityCategory) => void;
  counts: Record<DeityCategory, number>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
  counts,
}) => {
  const categories: { id: DeityCategory; label: string }[] = [
    { id: 'All', label: 'All Devotional Forms' },
    { id: 'Krishna', label: 'Lord Krishna' },
    { id: 'Ram', label: 'Lord Sri Ram' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {categories.map((cat) => {
        const isSelected = selectedCategory === cat.id;
        const count = counts[cat.id] || 0;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              isSelected
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 scale-[1.02]'
                : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                isSelected
                  ? 'bg-slate-950/30 text-slate-950 font-bold'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
