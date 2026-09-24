import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Eye,
  Sliders,
  Download,
  Image as ImageIcon,
  CheckCircle2,
  ChevronDown,
  Layers,
  Heart,
  Crown
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { DivineParticles } from '../components/common/Particles';
import { BeforeAfterSlider } from '../components/result/BeforeAfterSlider';
import { BEFORE_AFTER_SHOWCASES } from '../data/demoImages';
import { DEVOTIONAL_STYLES } from '../data/devotionalStyles';
import { StyleCard } from '../components/styles/StyleCard';
import { DevotionalStyle } from '../types/style';

interface HomeProps {
  onNavigate: (page: string, styleId?: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const showcase = BEFORE_AFTER_SHOWCASES[0];

  const featuredStyles = DEVOTIONAL_STYLES.filter((s) => s.featured).slice(0, 4);

  const toggleFaq = (idx: number) => {
    setActiveFaqIndex(activeFaqIndex === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'How does BhaktiVision preserve my recognizable facial identity?',
      a: 'Unlike generic text-to-image generators that invent random faces, BhaktiVision treats your uploaded portrait as the immutable primary source. Our backend identity engine locks your facial geometry, eye shape, nose bridge, jawline contours, and natural skin tone while exclusively transforming surrounding attire, crown, jewelry, and sacred environment.',
    },
    {
      q: 'Do you guarantee a 100% identical facial replication?',
      a: 'We practice responsible AI and do not promise 100% identical or pixel-perfect biological replication. However, our system is strictly conditioned to prioritize recognizable facial likeness above all ornamental elements.',
    },
    {
      q: 'Are my private photographs kept safe and secure?',
      a: 'Yes. Your uploaded photographs are utilized strictly to generate your requested transformations. We do not sell your personal data or publicly expose your portraits without your consent.',
    },
    {
      q: 'Can I add multiple face angles for better consistency?',
      a: 'Yes! While a single front-facing photo is completely sufficient, you can optionally provide up to three additional reference angles (e.g. slight left or right 3/4 profiles) to enhance 3D facial consistency.',
    },
    {
      q: 'What resolution are the downloaded portraits?',
      a: 'You can choose between 1K, 2K, and 4K resolutions in lossless PNG and high-quality JPG formats, ready for printing, framing, or sacred digital displays.',
    },
  ];

  return (
    <div className="relative overflow-hidden min-h-screen">
      <DivineParticles count={28} />

      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-20 sm:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>AI-Powered Identity-Preserving Devotional Art</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-cinzel leading-[1.15]">
              Transform Your Photo Into a{' '}
              <span className="divine-gold-text">Devotional Masterpiece</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Preserve your recognizable identity while experiencing beautifully crafted devotional transformations inspired by Indian spiritual traditions.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                size="lg"
                onClick={() => onNavigate('create')}
                icon={<ArrowRight className="w-5 h-5 text-slate-950" />}
                className="text-base font-bold shadow-xl shadow-amber-500/25"
              >
                Create Your Image
              </Button>

              <Button
                size="lg"
                variant="secondary"
                onClick={() => onNavigate('styles')}
                className="text-base"
              >
                Explore Styles
              </Button>
            </div>

            {/* Micro trust indicators */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Facial Geometry Locked</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Natural Skin Realism</span>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Sacred Aesthetics</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual: Before/After Interactive Split Screen */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative glow frame */}
              <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-amber-500/40 via-amber-600/20 to-indigo-600/40 blur-xl opacity-75 animate-pulse-glow" />

              <div className="relative rounded-3xl overflow-hidden p-1 bg-slate-900 border border-amber-500/40 shadow-2xl">
                <BeforeAfterSlider
                  beforeImage={showcase.beforeImage}
                  afterImage={showcase.afterImage}
                  beforeLabel="Your Original Photo"
                  afterLabel="Krishna — Vrindavan Flute"
                  aspectRatioClass="aspect-[4/5]"
                />
              </div>

              {/* Identity preservation callout chip */}
              <div className="absolute -bottom-5 -left-4 sm:left-4 z-30 p-3 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-amber-500/40 shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-white">Identity Preserved</p>
                  <p className="text-[10px] text-amber-300/80">Facial bone structure & contours locked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 sm:py-28 bg-slate-950/60 border-y border-amber-500/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
              Simple 5-Step Sacred Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-cinzel">
              How BhaktiVision Works
            </h2>
            <p className="text-sm text-slate-400">
              A seamless, dignified process that honors your identity and Indian devotional traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Upload Your Photo',
                desc: 'Upload a clear front-facing portrait photograph with natural lighting.',
                icon: ImageIcon,
              },
              {
                step: '02',
                title: 'Choose Devotional Style',
                desc: 'Select from sacred templates inspired by Lord Krishna and Lord Sri Ram.',
                icon: Crown,
              },
              {
                step: '03',
                title: 'AI Preserves Identity',
                desc: 'Our engine locks your facial geometry, eyes, nose, and complexion.',
                icon: ShieldCheck,
              },
              {
                step: '04',
                title: 'Generate Transformation',
                desc: 'Sacred silks, crowns, jewelry, and environments are organically styled.',
                icon: Sparkles,
              },
              {
                step: '05',
                title: 'Download Your Image',
                desc: 'Preview with interactive before/after slider and download in 2K/4K.',
                icon: Download,
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all text-left group"
              >
                <span className="text-3xl font-extrabold text-amber-500/25 group-hover:text-amber-500/50 transition-colors font-cinzel block mb-3">
                  {card.step}
                </span>
                <card.icon className="w-6 h-6 text-amber-400 mb-3" />
                <h3 className="text-base font-semibold text-white mb-2 font-cinzel">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DEVOTIONAL STYLES */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-2 text-left">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
              Sacred Gallery
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-cinzel">
              Featured Devotional Styles
            </h2>
            <p className="text-sm text-slate-400">
              Each style is meticulously configured with traditional iconography, garments, and sacred surroundings.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => onNavigate('styles')}
            icon={<ArrowRight className="w-4 h-4" />}
            className="self-start sm:self-auto text-xs"
          >
            View All 8 Styles
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredStyles.map((style) => (
            <StyleCard
              key={style.id}
              style={style}
              onSelect={() => onNavigate('create', style.id)}
            />
          ))}
        </div>
      </section>

      {/* IDENTITY PRESERVATION DEEP DIVE */}
      <section className="py-20 sm:py-28 bg-slate-950/70 border-y border-amber-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
                Our Primary Differentiator
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-cinzel leading-tight">
                "Preserve Your Recognizable Face While Transforming Your Devotional Appearance"
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Most AI image tools replace you with an idealized fictional face. BhaktiVision is engineered from the ground up to keep <em>YOU</em> at the center of the sacred experience.
              </p>

              <div className="space-y-3.5 pt-2">
                {[
                  'Facial Geometry Protected: Cheekbones, jawline, eye spacing and nose bridge remain untouched.',
                  'Natural Complexion: No synthetic plastic smoothing or altered skin tones.',
                  'Anatomical Integrity: Realistic five-finger hands poised gracefully on the flute or bow.',
                  'Subtle Divine Light: Celestial backlighting that harmonizes with your original contours.',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Button onClick={() => onNavigate('create')}>
                  Experience Your Transformation
                </Button>
              </div>
            </div>

            {/* Visual breakdown diagram */}
            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/30 shadow-2xl space-y-6">
                <h4 className="text-base font-semibold text-white font-cinzel pb-3 border-b border-slate-800 text-left">
                  Visual Segmentation Engine
                </h4>

                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase">
                      <ShieldCheck className="w-4 h-4" />
                      Locked Layer
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1">
                      <li>• Eyes & Eyebrows</li>
                      <li>• Nose & Mouth Contours</li>
                      <li>• Jaw & Chin Shape</li>
                      <li>• Natural Skin Undertone</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-2">
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase">
                      <Sparkles className="w-4 h-4" />
                      Styled Layer
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1">
                      <li>• Sacred Crown & Plume</li>
                      <li>• Silk Dhoti & Angavastram</li>
                      <li>• Flute / Kodanda Bow</li>
                      <li>• Sacred Surroundings</li>
                    </ul>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400 text-left">
                  <p>
                    <strong className="text-amber-300">Separation of Sources: </strong>
                    Identity is sourced strictly from your face. Pose and divine attire are sourced from the devotional template.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
            Production-Grade Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-cinzel">
            Crafted for Quality & Trust
          </h2>
          <p className="text-sm text-slate-400">
            A comprehensive suite of modern computer-vision and AI features built for devotees worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              title: 'Identity-Focused Transformation',
              desc: 'Engineered specifically to transform existing persons without inventing random faces or applying synthetic beauty filters.',
              icon: Eye,
            },
            {
              title: 'Predefined Devotional Styles',
              desc: 'Curated templates for Krishna and Ram with traditional iconography, garments, jewels, and wildlife.',
              icon: Crown,
            },
            {
              title: 'Multiple Reference Angles',
              desc: 'Upload optional 3/4 left, right, and front photos to give the AI comprehensive perspective on your facial structure.',
              icon: Layers,
            },
            {
              title: 'Customizable Settings',
              desc: 'Tailor hair volume, crown complexity, lighting ambiance, wildlife presence, and flute posture without writing prompts.',
              icon: Sliders,
            },
            {
              title: 'High-Resolution 2K/4K Output',
              desc: 'Pristine clarity suitable for framing, digital puja altars, family keepsakes, and social celebrations.',
              icon: Download,
            },
            {
              title: 'Private & Secure Gallery',
              desc: 'Your uploaded photos and creations are kept private by default. Access history and delete anytime.',
              icon: ShieldCheck,
            },
          ].map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/30 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center text-amber-400">
                <feat.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white font-cinzel">
                {feat.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 sm:py-28 bg-slate-950/70 border-t border-amber-500/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white font-cinzel">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-400">
              Clear answers regarding privacy, identity preservation, and our technology.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="text-sm font-semibold text-slate-200">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 border border-amber-500/40 text-center space-y-6 shadow-2xl">
          <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-cinzel">
            Experience Your Devotional Form Today
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Upload your portrait and see yourself in the timeless grace of Vrindavan or the royal majesty of Ayodhya.
          </p>
          <div className="pt-2">
            <Button
              size="lg"
              onClick={() => onNavigate('create')}
              icon={<Sparkles className="w-5 h-5 text-slate-950" />}
              className="text-base font-bold shadow-xl shadow-amber-500/25"
            >
              Transform Your Photo Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
