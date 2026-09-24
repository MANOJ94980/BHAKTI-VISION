import React from 'react';
import { DevotionalStyle, StyleCustomizationOptions } from '../../types/style';
import { Sliders, Sparkles, Feather, Sun, Trees, Check } from 'lucide-react';

interface CustomizationPanelProps {
  style: DevotionalStyle;
  customization: StyleCustomizationOptions;
  onChange: (updated: StyleCustomizationOptions) => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  style,
  customization,
  onChange,
}) => {
  const isKrishna = style.deity === 'Krishna';
  const isRam = style.deity === 'Ram';

  const updateField = <K extends keyof StyleCustomizationOptions>(
    key: K,
    val: StyleCustomizationOptions[K]
  ) => {
    onChange({
      ...customization,
      [key]: val,
    });
  };

  const toggleAnimal = (animal: keyof StyleCustomizationOptions['animals']) => {
    onChange({
      ...customization,
      animals: {
        ...customization.animals,
        [animal]: !customization.animals[animal],
      },
    });
  };

  return (
    <div className="bg-slate-900/85 border border-amber-500/25 rounded-3xl p-6 sm:p-7 space-y-7 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-semibold text-white font-cinzel">
              Transformation Settings
            </h4>
            <p className="text-xs text-slate-400">
              Personalize sacred visual parameters without manual prompts
            </p>
          </div>
        </div>
        <span className="text-xs text-amber-300 font-medium px-2.5 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
          {style.name}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Crown Style */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Feather className="w-3.5 h-3.5 text-amber-400" />
            Crown Design (Mukut)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['simple', 'traditional', 'ornate'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => updateField('crown', opt)}
                className={`py-2 px-3 text-xs font-medium rounded-xl capitalize transition-all border ${
                  customization.crown === opt
                    ? 'bg-amber-500/20 text-amber-200 border-amber-400 shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Hairstyle */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Hair Volume & Texture
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['natural', 'moderate', 'fuller'] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => updateField('hair', opt)}
                className={`py-2 px-3 text-xs font-medium rounded-xl capitalize transition-all border ${
                  customization.hair === opt
                    ? 'bg-amber-500/20 text-amber-200 border-amber-400 shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Sacred Environment */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Trees className="w-3.5 h-3.5 text-amber-400" />
            Environment & Scenery
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['vrindavan', 'forest', 'sunset', 'ayodhya', 'temple', 'garden'] as const).map((env) => (
              <button
                key={env}
                type="button"
                onClick={() => updateField('environment', env)}
                className={`py-2 px-2.5 text-xs font-medium rounded-xl capitalize transition-all border ${
                  customization.environment === env
                    ? 'bg-amber-500/20 text-amber-200 border-amber-400 shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {env}
              </button>
            ))}
          </div>
        </div>

        {/* Lighting Atmosphere */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            Divine Lighting
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { id: 'natural', label: 'Natural Daylight' },
                { id: 'golden', label: 'Golden Hour' },
                { id: 'divine_glow', label: 'Celestial Radiance' },
                { id: 'cinematic', label: 'Cinematic Mood' },
              ] as const
            ).map((light) => (
              <button
                key={light.id}
                type="button"
                onClick={() => updateField('lighting', light.id)}
                className={`py-2 px-3 text-xs font-medium rounded-xl transition-all border ${
                  customization.lighting === light.id
                    ? 'bg-amber-500/20 text-amber-200 border-amber-400 shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                {light.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Flute Pose (Krishna) or Bow Pose (Ram) */}
      {isKrishna && (
        <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2">
          <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider block">
            Sacred Flute (Bansuri) Pose
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => updateField('fluteAction', 'play')}
              className={`flex-1 py-2 px-4 rounded-xl text-xs font-medium border transition-all ${
                customization.fluteAction === 'play'
                  ? 'bg-amber-500/20 text-amber-200 border-amber-400'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              Play Flute to Lips (Anatomical Hands)
            </button>
            <button
              type="button"
              onClick={() => updateField('fluteAction', 'hold')}
              className={`flex-1 py-2 px-4 rounded-xl text-xs font-medium border transition-all ${
                customization.fluteAction === 'hold'
                  ? 'bg-amber-500/20 text-amber-200 border-amber-400'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
            >
              Hold Flute Poised Gently Near Chest
            </button>
          </div>
        </div>
      )}

      {/* Sacred Wildlife Integration */}
      <div className="space-y-2.5">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Sacred Animals & Wildlife Elements
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {(
            [
              { key: 'cow', label: 'Sacred Cow' },
              { key: 'peacock', label: 'Peacock' },
              { key: 'deer', label: 'Gentle Deer' },
              { key: 'rabbit', label: 'Rabbits' },
              { key: 'birds', label: 'Songbirds' },
              { key: 'butterflies', label: 'Butterflies' },
            ] as const
          ).map((item) => {
            const isChecked = Boolean(customization.animals[item.key]);
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => toggleAnimal(item.key)}
                className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium border transition-all ${
                  isChecked
                    ? 'bg-amber-500/15 text-amber-200 border-amber-500/40'
                    : 'bg-slate-950/60 text-slate-500 border-slate-800 hover:text-slate-400'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                    isChecked ? 'bg-amber-400 text-slate-950 font-bold' : 'border border-slate-700'
                  }`}
                >
                  {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Resolution & Aspect Ratio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5">
            Output Resolution
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['1K', '2K', '4K'] as const).map((res) => (
              <button
                key={res}
                type="button"
                onClick={() => updateField('outputResolution', res)}
                className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                  customization.outputResolution === res
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                    : 'bg-slate-950/60 text-slate-500 border-slate-800'
                }`}
              >
                {res}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-400 block mb-1.5">
            Output Aspect Ratio
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {(['1:1', '3:4', '4:3', '9:16', '16:9'] as const).map((ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => updateField('aspectRatio', ratio)}
                className={`py-1.5 text-[11px] font-semibold rounded-lg border transition-all ${
                  customization.aspectRatio === ratio
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                    : 'bg-slate-950/60 text-slate-500 border-slate-800'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
