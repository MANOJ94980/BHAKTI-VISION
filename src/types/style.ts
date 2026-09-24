export type DeityCategory = 'All' | 'Krishna' | 'Ram' | 'Shiva' | 'Devi' | 'Vishnu';

export interface StyleCustomizationOptions {
  hair: 'natural' | 'moderate' | 'fuller';
  crown: 'simple' | 'traditional' | 'ornate';
  environment: 'forest' | 'river' | 'vrindavan' | 'temple' | 'sunset' | 'garden' | 'ayodhya';
  lighting: 'natural' | 'golden' | 'divine_glow' | 'cinematic';
  animals: {
    cow: boolean;
    peacock: boolean;
    deer: boolean;
    rabbit: boolean;
    birds: boolean;
    butterflies: boolean;
  };
  fluteAction?: 'hold' | 'play';
  bowHolding?: boolean;
  outputResolution: '1K' | '2K' | '4K';
  aspectRatio: '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
}

export interface DevotionalStyle {
  id: string;
  name: string;
  deity: 'Krishna' | 'Ram' | 'Shiva' | 'Devi';
  description: string;
  thumbnail: string;
  sampleBeforeAfter?: {
    before: string;
    after: string;
  };
  identityPreservation: true;
  preserve: string[];
  transformation: string[];
  environment: string[];
  composition: string;
  lighting: string;
  negativeConstraints: string[];
  defaultCustomization: StyleCustomizationOptions;
  active: boolean;
  featured?: boolean;
}
