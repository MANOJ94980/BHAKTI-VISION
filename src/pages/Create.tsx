import React, { useState, useEffect } from 'react';
import {
  Upload,
  UserCheck,
  Crown,
  Sliders,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { ImageUploader } from '../components/upload/ImageUploader';
import { ImagePreview } from '../components/upload/ImagePreview';
import { ReferenceUploader } from '../components/upload/ReferenceUploader';
import { CategoryTabs } from '../components/styles/CategoryTabs';
import { StyleGrid } from '../components/styles/StyleGrid';
import { CustomizationPanel } from '../components/editor/CustomizationPanel';
import { IdentityProtection } from '../components/editor/IdentityProtection';
import { GenerationProgress } from '../components/editor/GenerationProgress';
import { BeforeAfterSlider } from '../components/result/BeforeAfterSlider';
import { ResultActions } from '../components/result/ResultActions';
import { Modal } from '../components/common/Modal';

import { UploadedImageInfo, FaceReferenceInfo } from '../types/image';
import { DevotionalStyle, DeityCategory, StyleCustomizationOptions } from '../types/style';
import { GenerationState, GenerationMetadata } from '../types/generation';
import { DEVOTIONAL_STYLES } from '../data/devotionalStyles';
import { generateDevotionalImage } from '../services/api';
import { databaseService, AppUser } from '../services/firebase';

interface CreateProps {
  currentUser: AppUser | null;
  onOpenAuth: () => void;
  initialStyleId?: string;
  onNavigate: (page: string) => void;
}

export const Create: React.FC<CreateProps> = ({
  currentUser,
  onOpenAuth,
  initialStyleId,
  onNavigate,
}) => {
  // Step tracker: 1=Upload, 2=Identity, 3=Style, 4=Customize, 5=Generate, 6=Result
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Core State
  const [uploadedImage, setUploadedImage] = useState<UploadedImageInfo | null>(null);
  const [references, setReferences] = useState<FaceReferenceInfo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<DeityCategory>('All');
  const [selectedStyle, setSelectedStyle] = useState<DevotionalStyle>(
    DEVOTIONAL_STYLES.find((s) => s.id === initialStyleId) || DEVOTIONAL_STYLES[0]
  );
  const [customization, setCustomization] = useState<StyleCustomizationOptions>(
    selectedStyle.defaultCustomization
  );

  // Generation State
  const [generationState, setGenerationState] = useState<GenerationState>('idle');
  const [generationResult, setGenerationResult] = useState<GenerationMetadata | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Sample Modal
  const [sampleModalStyle, setSampleModalStyle] = useState<DevotionalStyle | null>(null);

  // Set initial style if passed via prop
  useEffect(() => {
    if (initialStyleId) {
      const match = DEVOTIONAL_STYLES.find((s) => s.id === initialStyleId);
      if (match) {
        setSelectedStyle(match);
        setCustomization(match.defaultCustomization);
      }
    }
  }, [initialStyleId]);

  // Keep customization in sync when style changes
  const handleSelectStyle = (style: DevotionalStyle) => {
    setSelectedStyle(style);
    setCustomization(style.defaultCustomization);
  };

  // Filter styles
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

  // Multi-angle references handlers
  const handleAddReference = (ref: FaceReferenceInfo) => {
    setReferences((prev) => [...prev, ref]);
  };

  const handleRemoveReference = (id: string) => {
    setReferences((prev) => prev.filter((r) => r.id !== id));
  };

  const handleUpdateReferenceAngle = (
    id: string,
    angle: 'front' | 'left' | 'right' | 'other'
  ) => {
    setReferences((prev) =>
      prev.map((r) => (r.id === id ? { ...r, angle } : r))
    );
  };

  // Step Nav validation
  const canProceed = () => {
    if (currentStep === 1) return Boolean(uploadedImage);
    if (currentStep === 2) return Boolean(uploadedImage);
    if (currentStep === 3) return Boolean(selectedStyle);
    if (currentStep === 4) return true;
    return true;
  };

  // Start Generation
  const handleGenerate = async () => {
    if (!uploadedImage) {
      setCurrentStep(1);
      return;
    }

    setGenerationError(null);
    setGenerationState('preparing');
    setCurrentStep(5);

    try {
      const response = await generateDevotionalImage({
        image: uploadedImage.dataUrl,
        mimeType: uploadedImage.mimeType,
        references: references.map((r) => ({
          data: r.dataUrl,
          mimeType: r.mimeType,
          angle: r.angle,
        })),
        styleId: selectedStyle.id,
        customization,
        preserveIdentity: true,
      });

      if (!response.success || !response.imageUrl) {
        throw new Error(response.error || 'Transformation could not be completed.');
      }

      const meta: GenerationMetadata = {
        id: response.generationId || `gen_${Date.now()}`,
        uid: currentUser?.uid,
        styleId: selectedStyle.id,
        styleName: selectedStyle.name,
        deity: selectedStyle.deity,
        sourceImageUrl: uploadedImage.dataUrl,
        resultImageUrl: response.imageUrl,
        customization,
        resolution: customization.outputResolution,
        aspectRatio: customization.aspectRatio,
        createdAt: response.createdAt || new Date().toISOString(),
        modelUsed: response.modelUsed,
      };

      // Save to Firestore and Local history
      await databaseService.saveGeneration(meta);

      setGenerationResult(meta);
      setGenerationState('success');
      setCurrentStep(6);
    } catch (err: any) {
      console.error('Generation error:', err);
      setGenerationError(
        err?.message || 'Your devotional image could not be generated this time. Please try again.'
      );
      setGenerationState('error');
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  const handleChangeStyle = () => {
    setCurrentStep(3);
  };

  const handleStartNew = () => {
    setUploadedImage(null);
    setReferences([]);
    setGenerationResult(null);
    setGenerationError(null);
    setCurrentStep(1);
  };

  const stepLabels = [
    { num: 1, label: 'Upload Photo', icon: Upload },
    { num: 2, label: 'Identity Ref', icon: UserCheck },
    { num: 3, label: 'Devotional Style', icon: Crown },
    { num: 4, label: 'Customize', icon: Sliders },
    { num: 5, label: 'Generate', icon: Sparkles },
    { num: 6, label: 'Result', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Step Progress Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5 backdrop-blur-md">
        <div className="flex items-center justify-between overflow-x-auto gap-2 sm:gap-4 no-scrollbar">
          {stepLabels.map((s) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => {
                  if (s.num < currentStep || (s.num <= 4 && uploadedImage)) {
                    setCurrentStep(s.num);
                  }
                }}
                disabled={s.num > currentStep && !uploadedImage}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isCurrent
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : isCompleted
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-500 hover:text-slate-400 disabled:opacity-40'
                }`}
              >
                <s.icon className="w-3.5 h-3.5" />
                <span>
                  {s.num}. {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Body */}
      <div className="relative">
        {/* STEP 1: Upload Photo */}
        {currentStep === 1 && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
                Step 1 of 5
              </span>
              <h2 className="text-3xl font-bold text-white font-cinzel">
                Upload Your Portrait Photograph
              </h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Your uploaded photograph is the primary source of identity. We will preserve your facial features.
              </p>
            </div>

            {uploadedImage ? (
              <div className="space-y-6">
                <ImagePreview
                  imageInfo={uploadedImage}
                  onRemove={() => setUploadedImage(null)}
                  onReplace={() => setUploadedImage(null)}
                />
                <div className="flex justify-end">
                  <Button
                    size="lg"
                    onClick={() => setCurrentStep(2)}
                    icon={<ArrowRight className="w-5 h-5 text-slate-950" />}
                  >
                    Continue to Identity Reference
                  </Button>
                </div>
              </div>
            ) : (
              <ImageUploader onImageSelected={(img) => setUploadedImage(img)} />
            )}
          </div>
        )}

        {/* STEP 2: Identity Reference */}
        {currentStep === 2 && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
                Step 2 of 5
              </span>
              <h2 className="text-3xl font-bold text-white font-cinzel">
                Identity Reference Settings
              </h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Review your primary identity portrait and optionally provide multi-angle reference photos.
              </p>
            </div>

            {uploadedImage && (
              <div className="space-y-6">
                <ImagePreview
                  imageInfo={uploadedImage}
                  onRemove={() => {
                    setUploadedImage(null);
                    setCurrentStep(1);
                  }}
                  onReplace={() => setCurrentStep(1)}
                />

                <ReferenceUploader
                  references={references}
                  onAddReference={handleAddReference}
                  onRemoveReference={handleRemoveReference}
                  onUpdateAngle={handleUpdateReferenceAngle}
                />

                <IdentityProtection />

                <div className="flex items-center justify-between pt-4">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentStep(1)}
                    icon={<ArrowLeft className="w-4 h-4" />}
                  >
                    Back to Upload
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => setCurrentStep(3)}
                    icon={<ArrowRight className="w-5 h-5 text-slate-950" />}
                  >
                    Choose Devotional Style
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Choose Devotional Style */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
                Step 3 of 5
              </span>
              <h2 className="text-3xl font-bold text-white font-cinzel">
                Select Your Devotional Transformation
              </h2>
              <p className="text-sm text-slate-400">
                Choose a sacred visual theme inspired by Lord Krishna or Lord Sri Ram.
              </p>

              <CategoryTabs
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                counts={categoryCounts}
              />
            </div>

            <StyleGrid
              styles={filteredStyles}
              selectedStyleId={selectedStyle.id}
              onSelectStyle={(s) => {
                handleSelectStyle(s);
              }}
              onPreviewSample={(s) => setSampleModalStyle(s)}
            />

            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep(2)}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Identity Ref
              </Button>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Selected: <strong className="text-amber-300">{selectedStyle.name}</strong>
                </span>
                <Button
                  size="lg"
                  onClick={() => setCurrentStep(4)}
                  icon={<ArrowRight className="w-5 h-5 text-slate-950" />}
                >
                  Customize Styling
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Customize & Review */}
        {currentStep === 4 && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-widest">
                Step 4 of 5
              </span>
              <h2 className="text-3xl font-bold text-white font-cinzel">
                Customize Sacred Attributes
              </h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Fine-tune hair texture, crown design, divine environment, and lighting without prompt engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Customization Controls */}
              <div className="lg:col-span-8 space-y-6">
                <CustomizationPanel
                  style={selectedStyle}
                  customization={customization}
                  onChange={setCustomization}
                />
              </div>

              {/* Right Column: Source summary & Identity preview */}
              <div className="lg:col-span-4 space-y-6">
                {uploadedImage && (
                  <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      Target Identity Source
                    </span>
                    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-amber-500/20">
                      <img
                        src={uploadedImage.dataUrl}
                        alt="Target face"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-xs text-slate-400 flex items-center justify-between">
                      <span>{uploadedImage.filename}</span>
                      <span className="text-amber-400 font-semibold">Face Locked</span>
                    </div>
                  </div>
                )}

                <div className="p-4 rounded-3xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
                  <p className="text-amber-200 font-medium font-cinzel">
                    Transformation Summary
                  </p>
                  <p>
                    Style: <span className="text-white">{selectedStyle.name}</span>
                  </p>
                  <p>
                    Resolution: <span className="text-white">{customization.outputResolution}</span>
                  </p>
                  <p>
                    Aspect Ratio: <span className="text-white">{customization.aspectRatio}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep(3)}
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Styles
              </Button>

              <Button
                size="lg"
                onClick={handleGenerate}
                icon={<Sparkles className="w-5 h-5 text-slate-950" />}
                className="text-base font-bold shadow-xl shadow-amber-500/20"
              >
                Generate Devotional Image
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: Generating State (or Error) */}
        {currentStep === 5 && (
          <div className="py-12">
            {generationError ? (
              <div className="max-w-md mx-auto p-8 rounded-3xl bg-slate-900/95 border border-red-500/40 text-center space-y-5 shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 mx-auto flex items-center justify-center">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white font-cinzel">
                    Transformation Failed
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {generationError}
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2.5">
                  <Button onClick={handleRegenerate} icon={<RefreshCw className="w-4 h-4" />}>
                    Try Again
                  </Button>
                  <Button variant="secondary" onClick={() => setCurrentStep(3)}>
                    Change Style
                  </Button>
                  <Button variant="ghost" onClick={handleStartNew}>
                    Upload New Photo
                  </Button>
                </div>
              </div>
            ) : (
              <GenerationProgress
                currentState={generationState}
                styleName={selectedStyle.name}
              />
            )}
          </div>
        )}

        {/* STEP 6: Result / Preview / Download */}
        {currentStep === 6 && generationResult && uploadedImage && (
          <div className="space-y-8 max-w-6xl mx-auto">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-widest bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
                Transformation Complete
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-cinzel pt-2">
                Your Devotional Form
              </h2>
              <p className="text-sm text-slate-400 max-w-lg mx-auto">
                Drag the slider below to verify identity preservation between your source portrait and final artwork.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Interactive Comparison Slider */}
              <div className="lg:col-span-7">
                <div className="p-1 rounded-[32px] bg-gradient-to-r from-amber-500/30 via-slate-800 to-indigo-500/30 border border-amber-500/30 shadow-2xl">
                  <BeforeAfterSlider
                    beforeImage={uploadedImage.dataUrl}
                    afterImage={generationResult.resultImageUrl}
                    beforeLabel="Your Original Photo"
                    afterLabel={generationResult.styleName}
                    aspectRatioClass="aspect-[3/4]"
                  />
                </div>
              </div>

              {/* Actions & Download */}
              <div className="lg:col-span-5 space-y-6">
                <ResultActions
                  resultImageUrl={generationResult.resultImageUrl}
                  styleName={generationResult.styleName}
                  resolution={generationResult.resolution}
                  createdAt={generationResult.createdAt}
                  modelUsed={generationResult.modelUsed}
                  onRegenerate={handleRegenerate}
                  onChangeStyle={handleChangeStyle}
                  onStartNew={handleStartNew}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sample Before/After Modal */}
      {sampleModalStyle && sampleModalStyle.sampleBeforeAfter && (
        <Modal
          isOpen={Boolean(sampleModalStyle)}
          onClose={() => setSampleModalStyle(null)}
          title={`Sample: ${sampleModalStyle.name}`}
          subtitle="Reference demonstration showing how facial identity is locked while devotional attire is styled."
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <BeforeAfterSlider
              beforeImage={sampleModalStyle.sampleBeforeAfter.before}
              afterImage={sampleModalStyle.sampleBeforeAfter.after}
              beforeLabel="User Demo Portrait"
              afterLabel={sampleModalStyle.name}
              aspectRatioClass="aspect-[4/3]"
            />
            <div className="flex justify-end pt-2">
              <Button
                onClick={() => {
                  handleSelectStyle(sampleModalStyle);
                  setSampleModalStyle(null);
                  setCurrentStep(4);
                }}
              >
                Use This Style Now
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
