import { GenerateImageApiRequest, GenerateImageApiResponse } from '../types/generation';
import { DevotionalStyle } from '../types/style';
import { DEVOTIONAL_STYLES } from '../data/devotionalStyles';

export async function generateDevotionalImage(
  request: GenerateImageApiRequest
): Promise<GenerateImageApiResponse> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Failed to generate devotional image');
  }

  return data;
}

export async function fetchServerConfig(): Promise<{
  hasGeminiKey: boolean;
  stylesCount: number;
  maxUploadSizeBytes: number;
  supportedFormats: string[];
}> {
  try {
    const res = await fetch('/api/config');
    if (!res.ok) throw new Error('Config fetch failed');
    return await res.json();
  } catch {
    return {
      hasGeminiKey: false,
      stylesCount: 8,
      maxUploadSizeBytes: 15 * 1024 * 1024,
      supportedFormats: ['image/jpeg', 'image/png', 'image/webp'],
    };
  }
}

export async function fetchDevotionalStyles(): Promise<DevotionalStyle[]> {
  try {
    const res = await fetch('/api/styles');
    if (!res.ok) throw new Error('Styles fetch failed');
    const data = await res.json();
    return data.styles;
  } catch {
    return DEVOTIONAL_STYLES;
  }
}
