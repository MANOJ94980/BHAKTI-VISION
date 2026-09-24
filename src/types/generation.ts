import { StyleCustomizationOptions } from './style';

export type GenerationState = 
  | 'idle'
  | 'preparing'
  | 'analyzing'
  | 'preserving_identity'
  | 'applying_devotional_styling'
  | 'creating_environment'
  | 'refining_details'
  | 'finalizing'
  | 'success'
  | 'error';

export interface GenerationProgressStep {
  key: GenerationState;
  label: string;
  detail: string;
}

export interface GenerationMetadata {
  id: string;
  uid?: string;
  styleId: string;
  styleName: string;
  deity: string;
  sourceImageUrl: string;
  resultImageUrl: string;
  customization: StyleCustomizationOptions;
  resolution: '1K' | '2K' | '4K';
  aspectRatio: string;
  createdAt: string;
  modelUsed?: string;
  identityScoreNote?: string;
  needsRegeneration?: boolean;
}

export interface GenerateImageApiRequest {
  image: string; // base64
  mimeType?: string;
  references?: Array<{
    data: string;
    mimeType: string;
    angle?: string;
  }>;
  styleId: string;
  customization: Partial<StyleCustomizationOptions>;
  preserveIdentity?: boolean;
}

export interface GenerateImageApiResponse {
  success: boolean;
  imageUrl?: string;
  generationId?: string;
  styleId?: string;
  createdAt?: string;
  modelUsed?: string;
  error?: string;
  needsRegeneration?: boolean;
}
