import {
  ImageGenerationOptions,
  ImageGenerationProvider,
  ImagePayload,
  GeneratedImageResult
} from './ImageGenerationProvider';
import { DEVOTIONAL_STYLES } from '../../src/data/devotionalStyles';

export class MockImageProvider implements ImageGenerationProvider {
  name = 'MockImageProvider';

  async generateImage(
    sourceImage: ImagePayload,
    _referenceImages: ImagePayload[],
    prompt: string,
    _options: ImageGenerationOptions
  ): Promise<GeneratedImageResult> {
    // Artificial latency to mirror real AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Determine style from prompt
    let matchedStyle = DEVOTIONAL_STYLES[0];
    for (const style of DEVOTIONAL_STYLES) {
      if (prompt.includes(style.name) || prompt.includes(style.id)) {
        matchedStyle = style;
        break;
      }
    }

    // In mock mode, if sourceImage has dataUrl, we can use the style's sample result or thumbnail
    // to provide a stunning preview
    const resultImageUrl = matchedStyle.sampleBeforeAfter?.after || matchedStyle.thumbnail;

    return {
      imageUrl: resultImageUrl,
      modelUsed: 'mock-devotional-engine (demo mode)',
      isMock: true,
    };
  }
}
