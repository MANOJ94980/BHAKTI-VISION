import { Request, Response } from 'express';
import { DEVOTIONAL_STYLES } from '../../src/data/devotionalStyles';
import { buildTransformationPrompt } from '../prompt/promptEngine';
import { GeminiImageProvider } from '../providers/GeminiImageProvider';
import { MockImageProvider } from '../providers/MockImageProvider';
import { ImageGenerationProvider } from '../providers/ImageGenerationProvider';

const geminiProvider = new GeminiImageProvider();
const mockProvider = new MockImageProvider();

function getActiveProvider(): ImageGenerationProvider {
  if (geminiProvider.hasApiKey()) {
    return geminiProvider;
  }
  return mockProvider;
}

export async function handleGenerateImage(req: Request, res: Response) {
  try {
    const { image, references = [], styleId, customization = {}, preserveIdentity = true } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        error: 'A primary portrait photograph is required for identity-preserved transformation.',
      });
    }

    if (!styleId) {
      return res.status(400).json({
        success: false,
        error: 'Devotional styleId must be specified.',
      });
    }

    const selectedStyle = DEVOTIONAL_STYLES.find((s) => s.id === styleId);
    if (!selectedStyle) {
      return res.status(404).json({
        success: false,
        error: `Devotional style "${styleId}" was not found in the style catalog.`,
      });
    }

    // Dynamic prompt construction
    const constructedPrompt = buildTransformationPrompt({
      style: selectedStyle,
      customization,
      hasReferenceImages: Array.isArray(references) && references.length > 0,
      preserveIdentity,
    });

    // Detect MIME type of source
    let mimeType = 'image/jpeg';
    if (typeof image === 'string') {
      const mimeMatch = image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);
      if (mimeMatch) {
        mimeType = mimeMatch[1];
      }
    }

    const sourcePayload = {
      data: image,
      mimeType,
    };

    const refPayloads = Array.isArray(references)
      ? references.map((r: any) => ({
          data: r.data || r,
          mimeType: r.mimeType || 'image/jpeg',
        }))
      : [];

    let provider = getActiveProvider();
    let result;

    try {
      result = await provider.generateImage(sourcePayload, refPayloads, constructedPrompt, {
        resolution: customization.outputResolution || '2K',
        aspectRatio: customization.aspectRatio || '3:4',
      });
    } catch (primaryErr: any) {
      console.error('Primary provider error:', primaryErr?.message);
      // If real provider failed (e.g. quota, key, or network issue), fallback gracefully to mock provider with a clear note
      if (provider.name !== 'MockImageProvider') {
        console.warn('Falling back to MockImageProvider for seamless user experience...');
        result = await mockProvider.generateImage(sourcePayload, refPayloads, constructedPrompt, {
          resolution: customization.outputResolution || '2K',
          aspectRatio: customization.aspectRatio || '3:4',
        });
      } else {
        throw primaryErr;
      }
    }

    // Quality check layer (Section 36)
    if (!result.imageUrl || result.imageUrl.length < 50) {
      return res.status(500).json({
        success: false,
        error: 'Generated output did not pass image validation checks. Please try again.',
        needsRegeneration: true,
      });
    }

    const generationId = `gen_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    return res.status(200).json({
      success: true,
      imageUrl: result.imageUrl,
      generationId,
      styleId: selectedStyle.id,
      styleName: selectedStyle.name,
      createdAt: new Date().toISOString(),
      modelUsed: result.modelUsed,
      isMock: result.isMock || false,
    });
  } catch (error: any) {
    console.error('Error in handleGenerateImage:', error);
    return res.status(500).json({
      success: false,
      error: 'Your devotional image could not be generated at this time. Please try again or choose another style.',
      needsRegeneration: true,
    });
  }
}

export function handleGetConfig(_req: Request, res: Response) {
  const hasGeminiKey = geminiProvider.hasApiKey();
  res.json({
    hasGeminiKey,
    stylesCount: DEVOTIONAL_STYLES.length,
    maxUploadSizeBytes: 15 * 1024 * 1024, // 15MB
    supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
  });
}
