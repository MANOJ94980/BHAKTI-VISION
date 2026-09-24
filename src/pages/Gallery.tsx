import React, { useState, useEffect } from 'react';
import { databaseService, AppUser } from '../services/firebase';
import { GenerationMetadata } from '../types/generation';
import { DeityCategory } from '../types/style';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { BeforeAfterSlider } from '../components/result/BeforeAfterSlider';
import { downloadImage, sanitizeFilename } from '../../src/services/storage';
import {
  Download,
  Trash2,
  Eye,
  Sparkles,
  Calendar,
  Image as ImageIcon,
  ShieldAlert,
} from 'lucide-react';

interface GalleryProps {
  currentUser: AppUser | null;
  onOpenAuth: () => void;
  onNavigateToCreate: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  currentUser,
  onOpenAuth,
  onNavigateToCreate,
}) => {
  const [generations, setGenerations] = useState<GenerationMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<DeityCategory>('All');
  const [inspectItem, setInspectItem] = useState<GenerationMetadata | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<GenerationMetadata | null>(null);

  const loadGenerations = async () => {
    setLoading(true);
    try {
      const items = await databaseService.getGenerations(currentUser?.uid);
      setGenerations(items);
    } catch (err) {
      console.error('Failed to load generations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGenerations();
  }, [currentUser]);

  const handleDelete = async () => {
    if (!deleteCandidate) return;
    try {
      await databaseService.deleteGeneration(deleteCandidate.id, currentUser?.uid);
      setGenerations((prev) => prev.filter((g) => g.id !== deleteCandidate.id));
      if (inspectItem?.id === deleteCandidate.id) {
        setInspectItem(null);
      }
      setDeleteCandidate(null);
    } catch (e) {
      console.error('Delete error:', e);
    }
  };

  const handleDownload = async (item: GenerationMetadata, format: 'png' | 'jpg' = 'png') => {
    const filename = sanitizeFilename(item.styleName, format);
    await downloadImage(item.resultImageUrl, filename, format);
  };

  const filteredItems = generations.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.deity === selectedCategory;
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2 text-left">
          <span className="text-xs uppercase font-bold text-amber-400 tracking-widest bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-full">
            Personal History
          </span>
          <h1 className="text-4xl font-extrabold text-white font-cinzel">
            My Devotional Transformations
          </h1>
          <p className="text-sm text-slate-400">
            Review, download, and manage your preserved sacred portraits.
          </p>
        </div>

        <Button
          onClick={onNavigateToCreate}
          icon={<Sparkles className="w-4 h-4 text-slate-950" />}
          className="self-start sm:self-auto text-xs"
        >
          Create New Image
        </Button>
      </div>

      {/* Guest Notice if not signed in */}
      {!currentUser && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-amber-200">
          <div>
            <strong className="text-amber-300">Signed in as Guest: </strong>
            Your images are stored locally in your current browser session. Sign in to permanently save them to your account.
          </div>
          <Button size="sm" variant="secondary" onClick={onOpenAuth}>
            Sign In / Register
          </Button>
        </div>
      )}

      {/* Category Filter */}
      {generations.length > 0 && (
        <div className="flex items-center gap-2">
          {(['All', 'Krishna', 'Ram'] as DeityCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Gallery Cards */}
      {loading ? (
        <div className="text-center py-20 text-slate-500">
          <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs">Loading your sacred creations...</p>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col rounded-3xl overflow-hidden bg-slate-900/70 border border-slate-800 hover:border-amber-500/30 transition-all shadow-xl"
            >
              {/* Image Preview */}
              <div
                className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => setInspectItem(item)}
              >
                <img
                  src={item.resultImageUrl}
                  alt={item.styleName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />

                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-[10px] text-amber-300 font-semibold">
                  {item.deity}
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteCandidate(item);
                    }}
                    className="p-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md text-slate-400 hover:text-red-400 border border-slate-800 hover:border-red-500/40 transition-colors"
                    title="Delete image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                  <span className="font-semibold truncate">{item.styleName}</span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-amber-400" />
                    Inspect
                  </span>
                </div>
              </div>

              {/* Actions Area */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    {new Date(item.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 font-mono text-[10px]">
                    {item.resolution}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleDownload(item, 'png')}
                    icon={<Download className="w-3.5 h-3.5 text-slate-950" />}
                    className="w-full text-xs font-semibold"
                  >
                    PNG
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDownload(item, 'jpg')}
                    icon={<Download className="w-3.5 h-3.5 text-amber-300" />}
                    className="w-full text-xs"
                  >
                    JPG
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 p-8 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center">
            <ImageIcon className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-white font-cinzel">
              No Devotional Portraits Yet
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              You haven't generated any transformations yet. Upload your first photograph to begin your sacred journey.
            </p>
          </div>
          <div className="pt-2">
            <Button onClick={onNavigateToCreate} icon={<Sparkles className="w-4 h-4 text-slate-950" />}>
              Create Your First Transformation
            </Button>
          </div>
        </div>
      )}

      {/* Inspect / Before-After Comparison Modal */}
      {inspectItem && (
        <Modal
          isOpen={Boolean(inspectItem)}
          onClose={() => setInspectItem(null)}
          title={inspectItem.styleName}
          subtitle={`Created on ${new Date(inspectItem.createdAt).toLocaleDateString()} • ${inspectItem.resolution} Quality`}
          maxWidth="2xl"
        >
          <div className="space-y-4">
            <BeforeAfterSlider
              beforeImage={inspectItem.sourceImageUrl}
              afterImage={inspectItem.resultImageUrl}
              beforeLabel="Original Portrait"
              afterLabel={inspectItem.styleName}
              aspectRatioClass="aspect-[3/4]"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setDeleteCandidate(inspectItem);
                }}
                icon={<Trash2 className="w-3.5 h-3.5" />}
              >
                Delete
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDownload(inspectItem, 'jpg')}
                  icon={<Download className="w-3.5 h-3.5" />}
                >
                  Download JPG
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleDownload(inspectItem, 'png')}
                  icon={<Download className="w-3.5 h-3.5 text-slate-950" />}
                >
                  Download PNG
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <Modal
          isOpen={Boolean(deleteCandidate)}
          onClose={() => setDeleteCandidate(null)}
          title="Delete Transformation?"
          subtitle="This action will permanently remove this image from your gallery."
          maxWidth="sm"
        >
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-xs text-red-300">
              <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span>Are you sure you want to delete {deleteCandidate.styleName}?</span>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" size="sm" onClick={() => setDeleteCandidate(null)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                Confirm Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
