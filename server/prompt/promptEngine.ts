import { DevotionalStyle, StyleCustomizationOptions } from '../../src/types/style';

export interface PromptEngineInput {
  style: DevotionalStyle;
  customization: Partial<StyleCustomizationOptions>;
  hasReferenceImages?: boolean;
  referenceAngles?: string[];
  preserveIdentity?: boolean;
}

export function buildTransformationPrompt(input: PromptEngineInput): string {
  const { style, customization, hasReferenceImages, preserveIdentity = true } = input;

  const hairSetting = customization.hair || style.defaultCustomization.hair;
  const crownSetting = customization.crown || style.defaultCustomization.crown;
  const envSetting = customization.environment || style.defaultCustomization.environment;
  const lightingSetting = customization.lighting || style.defaultCustomization.lighting;
  const animals = { ...style.defaultCustomization.animals, ...(customization.animals || {}) };
  const fluteAction = customization.fluteAction || style.defaultCustomization.fluteAction;

  const animalList: string[] = [];
  if (animals.cow) animalList.push('peaceful sacred cow resting gently nearby or lying peacefully');
  if (animals.peacock) animalList.push('regal peacock with iridescent vibrant plumage');
  if (animals.deer) animalList.push('gentle forest deer peacefully grazing');
  if (animals.rabbit) animalList.push('small soft wild rabbits nestled in grass');
  if (animals.birds) animalList.push('songbirds perched on flowering branches');
  if (animals.butterflies) animalList.push('ethereal glowing butterflies drifting nearby');

  let hairDesc = 'natural dark hair with gentle natural wave';
  if (hairSetting === 'natural') hairDesc = 'natural realistic dark hair texture consistent with original portrait volume';
  if (hairSetting === 'moderate') hairDesc = 'moderate natural curly/wavy black hair, realistic density, not covering the entire neck';
  if (hairSetting === 'fuller') hairDesc = 'slightly fuller classical dark curly tresses, gracefully framing the crown';

  let crownDesc = 'traditional elegant crown';
  if (crownSetting === 'simple') crownDesc = 'understated devotional golden band with subtle filigree and spiritual motif';
  if (crownSetting === 'traditional') crownDesc = style.deity === 'Krishna' 
    ? 'traditional Krishna-inspired gold mukut crown featuring a single radiant peacock feather naturally integrated, well-proportioned'
    : 'traditional noble Sri Ram royal gold crown with classic sacred carvings';
  if (crownSetting === 'ornate') crownDesc = style.deity === 'Krishna'
    ? 'magnificent ornate Krishna mukut with intricate filigree, pearls, ruby gemstones, and vibrant peacock plume'
    : 'magnificent grand Ayodhya royal crown inlaid with rubies, diamonds, and celestial solar motifs';

  let envDesc = style.environment.join(', ');
  if (envSetting === 'vrindavan') envDesc = 'tranquil Vrindavan pasture, Kadamba trees, flowering creepers, sacred Yamuna river waters, soft evening light';
  if (envSetting === 'forest') envDesc = 'ancient sacred forest, mossy banyan and kadamba trees, sunbeams filtering through dense lush foliage, wild flowers';
  if (envSetting === 'sunset') envDesc = 'cinematic golden-hour sunset along tranquil sacred river ghats, glowing orange and violet water reflections';
  if (envSetting === 'ayodhya') envDesc = 'regal Ayodhya palace courtyard with carved sandstone pillars, classical marble arches, hanging marigold garlands';
  if (envSetting === 'temple') envDesc = 'peaceful temple sanctuary courtyard, stone carvings, oil lamps, soft incense haze, fragrant flowers';
  if (envSetting === 'garden') envDesc = 'blooming sacred garden with lotus pond, jasmine vines, marble walkways, serene atmosphere';

  let lightingDesc = style.lighting;
  if (lightingSetting === 'natural') lightingDesc = 'soft natural sunlight with gentle shadows and realistic skin tones';
  if (lightingSetting === 'golden') lightingDesc = 'warm golden hour ambient lighting, luminous rim light highlighting hair and jewelry';
  if (lightingSetting === 'divine_glow') lightingDesc = 'subtle ethereal divine radiance (prabhavali) softly glowing behind head, celestial aura';
  if (lightingSetting === 'cinematic') lightingDesc = 'dramatic cinematic lighting with balanced key light, rich contrast, and soft ambient fill';

  const masterPrompt = `EDIT THE SUPPLIED SOURCE PHOTOGRAPH.

The source photograph contains the person whose recognizable identity must be preserved.
This is an image-to-image transformation, not a request to create an unrelated new person.
Preserve the person's recognizable facial identity as faithfully as possible.
Preserve facial geometry, eyes, eyebrows, nose, lips, jawline, chin, forehead, natural skin tone, facial proportions, natural asymmetry and overall recognizable appearance.
Do not replace the face with another person's face.
Do not invent a new person.
Do not excessively beautify the face.
Do not artificially slim or widen the face.
Do not change the person's facial structure unnecessarily.
Do not change the person's identity.
${hasReferenceImages ? 'Use the supplied additional reference images to strictly enforce identity consistency across facial angles.' : ''}

Apply the selected devotional transformation to the existing person.
Modify only the requested visual attributes.
Transform the clothing, accessories, hairstyle, crown, jewelry, environment, lighting and devotional elements according to the selected template.
Keep the result photorealistic and anatomically natural.
Maintain realistic proportions.
Maintain realistic hands, fingers, eyes and facial anatomy.
Avoid artificial plastic skin.
Avoid excessive smoothing.
Avoid cartoon-like facial features.
Avoid exaggerated makeup.
Keep the person recognizable.
The final image should look like a professionally photographed devotional portrait or cinematic devotional scene, not an AI-generated unrelated character.

LOCKED / PROTECTED REGIONS (DO NOT ALTER):
- Facial identity and unique facial geometry
- Eyes, eyelids, iris spacing, eyebrow shape
- Nose bridge, nostril shape, and nose tip
- Lips, mouth corners, and jawline contour
- Forehead, cheekbone structure, chin, and ear anatomy
- Natural skin complexion and natural facial texture
- Approximate age appearance and natural asymmetry

EDITABLE / TRANSFORMED REGIONS:
- Hairstyle: ${hairDesc}
- Crown / Headwear: ${crownDesc}
- Attire: ${style.transformation.filter(t => t.includes('dhoti') || t.includes('drape') || t.includes('garment') || t.includes('clothing') || t.includes('attire')).join(', ') || 'Traditional sacred silk garments'}
- Ornaments & Jewelry: ${style.transformation.filter(t => t.includes('jewelry') || t.includes('necklace') || t.includes('earrings') || t.includes('armlets') || t.includes('bracelets') || t.includes('ornaments')).join(', ') || 'Traditional gold necklaces, kundalas, and armlets'}
${style.deity === 'Krishna' ? `- Sacred Flute (Bansuri): Classical wooden Indian flute ${fluteAction === 'play' ? 'held naturally to the lips in authentic devotional playing posture; hands and all five fingers anatomically correct, wrists relaxed' : 'held gracefully near the chest'}` : ''}
${style.deity === 'Ram' ? '- Sacred Kodanda Bow: Dignified divine bow poised gracefully with golden arrows and quiver' : ''}
- Sacred Environment: ${envDesc}
- Sacred Wildlife: ${animalList.length > 0 ? animalList.join(', ') : 'None, keep environment clean and peaceful'}
- Lighting & Atmosphere: ${lightingDesc}

SELECTED STYLE:
${style.name} (${style.deity})
${style.description}

COMPOSITION:
${style.composition}

PRIORITY HIERARCHY:
PRIORITY 1: User identity and recognizable facial likeness
PRIORITY 2: Exact facial geometry and natural skin tone
PRIORITY 3: Natural human anatomy (correct fingers, hand poses, eye direction)
PRIORITY 4: Selected devotional pose (${style.deity === 'Krishna' ? 'flute playing posture' : 'noble devotional stance'})
PRIORITY 5: Devotional clothing, crown, and ornaments
PRIORITY 6: Sacred wildlife and scenery
PRIORITY 7: Atmospheric lighting and celestial rays

NEGATIVE CONSTRAINTS:
${style.negativeConstraints.join(', ')}, distorted hands, extra fingers, missing fingers, warped flute, altered ethnicity, generic cartoon face, CGI video game render, airbrushed plastic skin.

IDENTITY PROTECTION: HIGH
REALISM: HIGH
FACIAL PRESERVATION: HIGH
STYLE: Photorealistic cinematic devotional photography
IMPORTANT: Only change elements explicitly requested by the selected template. Do not make unrelated modifications.`;

  return masterPrompt;
}
