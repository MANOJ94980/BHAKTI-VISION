import { GoogleGenAI } from '@google/genai';
import {
  ImageGenerationOptions,
  ImageGenerationProvider,
  ImagePayload,
  GeneratedImageResult
} from './ImageGenerationProvider';

function cleanBase64(input: string): string {
  if (!input) return '';
  const commaIdx = input.indexOf(',');
  if (commaIdx !== -1 && input.substring(0, commaIdx).includes('base64')) {
    return input.substring(commaIdx + 1);
  }
  return input;
}

export class GeminiImageProvider implements ImageGenerationProvider {
  name = 'GeminiImageProvider';
  private ai: GoogleGenAI | null = null;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      this.ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
  }

  hasApiKey(): boolean {
    return Boolean(process.env.GEMINI_API_KEY);
  }

  async generateImage(
    sourceImage: ImagePayload,
    referenceImages: ImagePayload[],
    prompt: string,
    options: ImageGenerationOptions
  ): Promise<GeneratedImageResult> {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured on the server');
    }

    if (!this.ai) {
      this.ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }

    const parts: any[] = [];

    // Add source image (primary face source)
    const srcBase64 = cleanBase64(sourceImage.data);
    parts.push({
      inlineData: {
        data: srcBase64,
        mimeType: sourceImage.mimeType || 'image/jpeg',
      },
    });

    // Add reference photos if provided
    if (referenceImages && referenceImages.length > 0) {
      for (const ref of referenceImages) {
        const refBase64 = cleanBase64(ref.data);
        if (refBase64) {
          parts.push({
            inlineData: {
              data: refBase64,
              mimeType: ref.mimeType || 'image/jpeg',
            },
          });
        }
      }
    }

    // Add comprehensive transformation prompt
    parts.push({
      text: prompt,
    });

    const validAspectRatios = ['1:1', '3:4', '4:3', '9:16', '16:9'];
    const selectedAspectRatio = validAspectRatios.includes(options.aspectRatio || '')
      ? options.aspectRatio
      : '3:4';

    const selectedImageSize = options.resolution || '2K';

    // Try primary high-quality model: gemini-3.1-flash-image
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3.1-flash-image',
        contents: {
          parts,
        },
        config: {
          imageConfig: {
            aspectRatio: selectedAspectRatio,
            imageSize: selectedImageSize,
          },
        },
      });

      const candidates = response.candidates;
      if (candidates && candidates.length > 0) {
        for (const part of candidates[0].content?.parts || []) {
          if (part.inlineData && part.inlineData.data) {
            const mime = part.inlineData.mimeType || 'image/png';
            return {
              imageUrl: `data:${mime};base64,${part.inlineData.data}`,
              modelUsed: 'gemini-3.1-flash-image',
            };
          }
        }
      }
    } catch (primaryErr: any) {
      console.warn('gemini-3.1-flash-image attempt error, trying gemini-3.1-flash-lite-image:', primaryErr?.message);
      
      // Fallback to flash-lite-image
      const fallbackResponse = await this.ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts,
        },
      });

      const candidates = fallbackResponse.candidates;
      if (candidates && candidates.length > 0) {
        for (const part of candidates[0].content?.parts || []) {
          if (part.inlineData && part.inlineData.data) {
            const mime = part.inlineData.mimeType || 'image/png';
            return {
              imageUrl: `data:${mime};base64,${part.inlineData.data}`,
              modelUsed: 'gemini-3.1-flash-lite-image',
            };
          }
        }
      }
    }

    throw new Error('Gemini API did not return an image part. Please try again with adjusted parameters.');
  }
}
