export interface UploadedImageInfo {
  id: string;
  dataUrl: string; // base64 representation
  mimeType: string;
  filename: string;
  fileSizeBytes: number;
  width?: number;
  height?: number;
  aspectRatioLabel?: '1:1' | '3:4' | '4:3' | '9:16' | '16:9';
  isDemo?: boolean;
}

export interface FaceReferenceInfo {
  id: string;
  dataUrl: string;
  mimeType: string;
  angle: 'front' | 'left' | 'right' | 'other';
  label: string;
}
