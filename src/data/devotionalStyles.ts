import { DevotionalStyle } from '../types/style';

export const DEVOTIONAL_STYLES: DevotionalStyle[] = [
  {
    id: 'krishna-vrindavan-flute',
    name: 'Krishna — Vrindavan Flute',
    deity: 'Krishna',
    description: 'Peaceful Krishna-inspired devotional transformation with flute, sacred cow, peacocks and Vrindavan scenery.',
    thumbnail: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=800&q=80',
    sampleBeforeAfter: {
      before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=600&q=80',
    },
    identityPreservation: true,
    preserve: [
      'face',
      'identity',
      'facial geometry',
      'eyes and eyebrows',
      'nose and lips',
      'jawline and chin',
      'forehead',
      'natural skin tone',
      'body proportions'
    ],
    transformation: [
      'traditional Krishna-inspired crown (mukut)',
      'single vibrant peacock feather',
      'moderate curly black hair with natural wave',
      'yellow silk pitambari dhoti',
      'blue and gold drape (angavastram)',
      'traditional gold and gemstone jewelry',
      'pearl necklaces',
      'kundala earrings',
      'gold armlets (bajuband)',
      'bracelets',
      'classical wooden flute (bansuri)'
    ],
    environment: [
      'peaceful Vrindavan-inspired landscape',
      'resting gentle Surabhi cow',
      'peacocks displaying plumage',
      'peaceful deer',
      'rabbits',
      'sweet chirping birds',
      'butterflies',
      'lotus flowers and Kadamba trees',
      'Yamuna river waters',
      'warm golden sunset'
    ],
    composition: 'The person peacefully playing the flute in a natural devotional pose, face gently angled, fingers gracefully holding the flute, with the cow resting peacefully nearby.',
    lighting: 'Warm golden twilight, soft celestial backlight, gentle glow around crown and ornaments',
    negativeConstraints: [
      'different identity',
      'facial distortion',
      'plastic skin',
      'cartoon face',
      'extra fingers',
      'missing fingers',
      'floating flute',
      'distorted hands',
      'excessive beauty filter'
    ],
    defaultCustomization: {
      hair: 'moderate',
      crown: 'traditional',
      environment: 'vrindavan',
      lighting: 'golden',
      animals: {
        cow: true,
        peacock: true,
        deer: true,
        rabbit: false,
        birds: true,
        butterflies: true
      },
      fluteAction: 'play',
      outputResolution: '2K',
      aspectRatio: '3:4'
    },
    active: true,
    featured: true
  },
  {
    id: 'krishna-forest-flute',
    name: 'Krishna — Forest Flute',
    deity: 'Krishna',
    description: 'A cinematic forest devotional transformation with sunbeams through dense ancient trees and wildlife.',
    thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    sampleBeforeAfter: {
      before: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      after: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80',
    },
    identityPreservation: true,
    preserve: [
      'face',
      'identity',
      'facial geometry',
      'natural skin tone',
      'age appearance'
    ],
    transformation: [
      'Krishna-inspired crown with gold filigree',
      'peacock feather ornament',
      'moderate natural wavy black hair',
      'golden yellow dhoti with emerald borders',
      'cerulean blue drape',
      'traditional gold jewelry',
      'flute held naturally'
    ],
    environment: [
      'lush sacred forest (Nidhivan)',
      'ancient mossy Kadamba trees',
      'wild jasmine and forest flowers',
      'sunbeams filtering through canopy',
      'peacocks resting on branches',
      'gentle forest deer',
      'songbirds and butterflies'
    ],
    composition: 'Person standing or sitting gracefully beside an ancient tree, flute held in playing position with natural anatomical hands.',
    lighting: 'Cinematic dappled sunlight through tree leaves, atmospheric forest mist, warm divine luminescence',
    negativeConstraints: [
      'distorted face',
      'extra limbs',
      'oversaturated neon lights',
      'loss of source facial features',
      'oversized crown'
    ],
    defaultCustomization: {
      hair: 'natural',
      crown: 'traditional',
      environment: 'forest',
      lighting: 'cinematic',
      animals: {
        cow: false,
        peacock: true,
        deer: true,
        rabbit: true,
        birds: true,
        butterflies: true
      },
      fluteAction: 'play',
      outputResolution: '2K',
      aspectRatio: '3:4'
    },
    active: true,
    featured: true
  },
  {
    id: 'krishna-divine-sunset',
    name: 'Krishna — Divine Sunset',
    deity: 'Krishna',
    description: 'Warm cinematic Krishna-inspired transformation during golden hour along tranquil waters.',
    thumbnail: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    identityPreservation: true,
    preserve: [
      'face',
      'identity',
      'facial proportions',
      'natural skin tone',
      'facial asymmetry'
    ],
    transformation: [
      'subtle Krishna crown with radiant peacock plume',
      'yellow traditional silk garment',
      'deep blue and gold embroidery drape',
      'gold necklace with kaustubha gem motif',
      'earrings and armlets',
      'flute held poised'
    ],
    environment: [
      'warm sunset over the sacred Yamuna ghats',
      'calm waters reflecting orange and purple hues',
      'drifting lotus petals',
      'distant silhouettes of temples',
      'water birds and flying cranes'
    ],
    composition: 'Cinematic devotional portrait at riverbank, gentle contemplative expression, holding flute near chest.',
    lighting: 'Low-angle golden hour sunset glow, warm rim lighting on hair and crown, soft divine ambience',
    negativeConstraints: [
      'over-smoothed skin',
      'unnatural eye colors',
      'loss of identity',
      'distorted hands'
    ],
    defaultCustomization: {
      hair: 'moderate',
      crown: 'ornate',
      environment: 'sunset',
      lighting: 'golden',
      animals: {
        cow: false,
        peacock: true,
        deer: false,
        rabbit: false,
        birds: true,
        butterflies: false
      },
      fluteAction: 'hold',
      outputResolution: '2K',
      aspectRatio: '3:4'
    },
    active: true
  },
  {
    id: 'krishna-cow-vrindavan',
    name: 'Krishna — Cow & Vrindavan',
    deity: 'Krishna',
    description: 'Deeply peaceful devotional scene centered around Krishna, the sacred cow, and pastoral Vrindavan meadows.',
    thumbnail: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    identityPreservation: true,
    preserve: [
      'face',
      'identity',
      'eyes',
      'nose',
      'lips',
      'chin',
      'natural skin tone'
    ],
    transformation: [
      'traditional Krishna crown with peacock feather',
      'yellow dhoti with silk sash',
      'natural curly hair',
      'flute held gently',
      'tulsi garland and pearl mala'
    ],
    environment: [
      'rolling green Vrindavan pastures',
      'gentle white sacred cow affectionately beside person',
      'grazing calves',
      'flowering creepers and Kadamba groves',
      'soft morning clouds and warm sunlight'
    ],
    composition: 'Person standing lovingly with one hand gently resting on or near the peaceful cow, flute in the other hand.',
    lighting: 'Soft morning devotional light, fresh dew shimmer, warm gentle aura',
    negativeConstraints: [
      'distorted animal anatomy',
      'floating horns',
      'altered human identity',
      'harsh lighting'
    ],
    defaultCustomization: {
      hair: 'moderate',
      crown: 'traditional',
      environment: 'vrindavan',
      lighting: 'divine_glow',
      animals: {
        cow: true,
        peacock: false,
        deer: true,
        rabbit: false,
        birds: true,
        butterflies: true
      },
      fluteAction: 'hold',
      outputResolution: '2K',
      aspectRatio: '3:4'
    },
    active: true
  },
  {
    id: 'ram-forest-journey',
    name: 'Ram — Forest Journey',
    deity: 'Ram',
    description: 'Ram-inspired devotional transformation in the serene Panchavati forest with bow and quiver.',
    thumbnail: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    identityPreservation: true,
    preserve: [
      'face',
      'identity',
      'facial geometry',
      'jawline',
      'eyes and eyebrows',
      'natural skin tone'
    ],
    transformation: [
      'traditional dignified crown (mukut) of Sri Ram',
      'saffron-orange and warm ochre royal ascetic garments',
      'dignified gold ornaments and rudraksha beads',
      'divine Kodanda bow in hand',
      'quiver with golden arrows resting on shoulder',
      'natural flowing dark hair tied in ascetic matted knot adorned with gems'
    ],
    environment: [
      'ancient serene forest of Dandakaranya',
      'majestic Shal and Banyan trees',
      'gentle stream with crystal water',
      'calm deer drinking from stream',
      'spiritual hermitage aura in background'
    ],
    composition: 'Noble standing pose with divine bow held poised, calm resolute and compassionate gaze, person clearly identifiable.',
    lighting: 'Warm natural sun filtering through leaves, subtle celestial rays from above, divine spiritual presence',
    negativeConstraints: [
      'aggressive expression',
      'fantasy weapons',
      'face alteration',
      'extra arms or fingers',
      'excessive jewelry'
    ],
    defaultCustomization: {
      hair: 'natural',
      crown: 'traditional',
      environment: 'forest',
      lighting: 'natural',
      animals: {
        cow: false,
        peacock: false,
        deer: true,
        rabbit: false,
        birds: true,
        butterflies: false
      },
      bowHolding: true,
      outputResolution: '2K',
      aspectRatio: '3:4'
    },
    active: true,
    featured: true
  },
  {
    id: 'ram-royal-ayodhya',
    name: 'Ram — Royal Ayodhya',
    deity: 'Ram',
    description: 'Royal Ram-inspired devotional transformation amidst grand classical palace architecture with golden aura.',
    thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    identityPreservation: true,
    preserve: [
      'face',
      'identity',
      'facial structure',
      'eyes',
      'mouth',
      'skin tone',
      'expression'
    ],
    transformation: [
      'magnificent Ayodhya royal gold crown (mukut) with ruby and diamond inlays',
      'rich royal saffron and golden silk angavastra and dhoti',
      'regal necklace and pearl strands',
      'armbands and royal signet',
      'ornate Kodanda bow resting gracefully beside'
    ],
    environment: [
      'grand classical Ayodhya palace court with carved pillars',
      'carved marble arches and traditional floral garlands',
      'incense smoke curling gently in divine light',
      'distant temple spires (shikharas) of Ayodhya'
    ],
    composition: 'Regal devotional portrait, majestic and serene, looking directly forward with grace and wisdom.',
    lighting: 'Warm golden interior lighting, majestic chandeliers and divine celestial brilliance',
    negativeConstraints: [
      'altered face',
      'cartoonish architecture',
      'unrealistic hands',
      'western fantasy armor'
    ],
    defaultCustomization: {
      hair: 'moderate',
      crown: 'ornate',
      environment: 'ayodhya',
      lighting: 'golden',
      animals: {
        cow: false,
        peacock: true,
        deer: false,
        rabbit: false,
        birds: false,
        butterflies: false
      },
      bowHolding: true,
      outputResolution: '2K',
      aspectRatio: '3:4'
    },
    active: true,
    featured: true
  },
  {
    id: 'ram-divine-sunset',
    name: 'Ram — Divine Sunset',
    deity: 'Ram',
    description: 'Cinematic Ram-inspired transformation along the sacred Sarayu river under an awe-inspiring sunset.',
    thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    identityPreservation: true,
    preserve: [
      'face',
      'identity',
      'facial geometry',
      'natural skin tone',
      'age characteristics'
    ],
    transformation: [
      'traditional crown of Lord Ram',
      'saffron-gold flowing attire',
      'sacred sacred thread (yajnopavita)',
      'bow and quiver on shoulder',
      'subtle gold bangles'
    ],
    environment: [
      'banks of the sacred Sarayu river at sunset',
      'golden-crimson glowing sky reflecting on water',
      'floating earthen lamps (diyas)',
      'peaceful evening breeze rustling garments'
    ],
    composition: 'Three-quarter devotional portrait, looking across the sacred waters in deep spiritual contemplation.',
    lighting: 'Golden-hour dramatic rim lighting, soft glowing embers, ethereal evening atmosphere',
    negativeConstraints: [
      'harsh shadows',
      'deformed fingers',
      'face replacement',
      'unnatural saturation'
    ],
    defaultCustomization: {
      hair: 'natural',
      crown: 'traditional',
      environment: 'sunset',
      lighting: 'cinematic',
      animals: {
        cow: false,
        peacock: false,
        deer: true,
        rabbit: false,
        birds: true,
        butterflies: false
      },
      bowHolding: true,
      outputResolution: '2K',
      aspectRatio: '3:4'
    },
    active: true
  },
  {
    id: 'ram-peaceful-portrait',
    name: 'Ram — Peaceful Portrait',
    deity: 'Ram',
    description: 'Premium intimate devotional portrait focused purely on identity preservation and tranquil grace.',
    thumbnail: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    identityPreservation: true,
    preserve: [
      'face',
      'identity',
      'all facial features',
      'skin texture and tone',
      'eye shape and expression',
      'smile/expression line'
    ],
    transformation: [
      'refined elegant golden crown',
      'simple saffron silk shoulder cloth',
      'delicate pearl and gold necklace',
      'sacred tilak on forehead',
      'softly combed dark hair'
    ],
    environment: [
      'soft atmospheric bokeh of temple courtyard and jasmine garlands',
      'subtle divine aura radiating gently behind head'
    ],
    composition: 'Close-up devotional portrait, serene smile, tranquil eyes radiating peace and benevolence.',
    lighting: 'Soft portrait studio lighting blended with subtle divine halo (prabhavali), natural skin texture',
    negativeConstraints: [
      'plastic smoothing',
      'changed facial structure',
      'distorted eyes',
      'heavy fantasy makeup'
    ],
    defaultCustomization: {
      hair: 'natural',
      crown: 'simple',
      environment: 'temple',
      lighting: 'divine_glow',
      animals: {
        cow: false,
        peacock: false,
        deer: false,
        rabbit: false,
        birds: false,
        butterflies: false
      },
      outputResolution: '2K',
      aspectRatio: '1:1'
    },
    active: true
  }
];

export const FUTURE_CATEGORIES = [
  { id: 'Shiva', name: 'Lord Shiva', count: 'Coming soon', desc: 'Kailash, crescent moon, sacred ash aesthetics' },
  { id: 'Devi', name: 'Maa Durga & Devi', count: 'Coming soon', desc: 'Radiant sarees, golden ornaments, divine shakti' },
  { id: 'Hanuman', name: 'Sri Hanuman', count: 'Coming soon', desc: 'Devotion, strength, saffron gada' },
  { id: 'Vishnu', name: 'Lord Vishnu', count: 'Coming soon', desc: 'Ksheera Sagara, Shankha, Chakra, Ananta' },
];
