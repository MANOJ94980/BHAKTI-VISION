export interface ImagePayload {
  data: string; // base64 without prefix or with prefix
  mimeType: string;
}

export interface ImageGenerationOptions {
  resolution?: '1K' | '2K' | '4K';
  aspectRatio?: '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
  seed?: number;
}

export interface GeneratedImageResult {
  imageUrl: string; // data:image/png;base64,... or https://...
  modelUsed: string;
  isMock?: boolean;
}

export interface ImageGenerationProvider {
  name: string;
  generateImage(
    sourceImage: ImagePayload,
    referenceImages: ImagePayload[],
    prompt: string,
    options: ImageGenerationOptions
  ): Promise<GeneratedImageResult>;
}
