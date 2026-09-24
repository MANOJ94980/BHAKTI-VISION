export interface DemoPortrait {
  id: string;
  name: string;
  label: string;
  url: string;
  gender: 'male' | 'female';
  recommendedStyle: string;
}

export const DEMO_PORTRAITS: DemoPortrait[] = [
  {
    id: 'demo-1',
    name: 'Aarav (Front portrait)',
    label: 'Warm natural light, front view',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80',
    gender: 'male',
    recommendedStyle: 'krishna-vrindavan-flute'
  },
  {
    id: 'demo-2',
    name: 'Devan (Studio portrait)',
    label: 'Clean lighting, slight 3/4 angle',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
    gender: 'male',
    recommendedStyle: 'ram-royal-ayodhya'
  },
  {
    id: 'demo-3',
    name: 'Rohan (Outdoor portrait)',
    label: 'Natural outdoor setting, neutral expression',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80',
    gender: 'male',
    recommendedStyle: 'krishna-forest-flute'
  },
  {
    id: 'demo-4',
    name: 'Priya (Front portrait)',
    label: 'Soft lighting, front-facing devotional portrait',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80',
    gender: 'female',
    recommendedStyle: 'krishna-divine-sunset'
  }
];

export interface BeforeAfterShowcase {
  id: string;
  styleName: string;
  deity: string;
  beforeImage: string;
  afterImage: string;
  caption: string;
  featuresPreserved: string[];
}

export const BEFORE_AFTER_SHOWCASES: BeforeAfterShowcase[] = [
  {
    id: 'showcase-1',
    styleName: 'Krishna — Vrindavan Flute',
    deity: 'Krishna',
    beforeImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80',
    caption: 'User facial structure, eyes, and natural smile faithfully preserved while transforming clothing into yellow silk dhoti, peacock-feather crown, and sacred cow beside.',
    featuresPreserved: ['Eyes & eyebrows', 'Jawline structure', 'Natural skin tone', 'Facial asymmetry']
  },
  {
    id: 'showcase-2',
    styleName: 'Ram — Royal Ayodhya',
    deity: 'Ram',
    beforeImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    caption: 'Facial identity and noble expression retained while Ayodhya royal palace architecture, ruby-inlaid gold crown, and saffron silk angavastra are applied.',
    featuresPreserved: ['Nose & lip contours', 'Facial proportions', 'Eye shape & gaze', 'Natural complexion']
  },
  {
    id: 'showcase-3',
    styleName: 'Krishna — Forest Flute',
    deity: 'Krishna',
    beforeImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    caption: 'Cinematic dappled sunlight through Vrindavan forest, flute in hand, with accurate anatomical hands and full facial geometry preservation.',
    featuresPreserved: ['Bone structure', 'Cheekbones', 'Eye distance', 'Age appearance']
  }
];
