export function sanitizeFilename(styleName: string, format: 'png' | 'jpg' = 'png'): string {
  const cleanStyle = styleName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const year = new Date().getFullYear();
  return `bhaktivision-${cleanStyle}-${year}.${format}`;
}

export async function downloadImage(
  dataUrlOrHttpUrl: string,
  filename: string,
  format: 'png' | 'jpg' = 'png'
): Promise<void> {
  // If conversion from dataUrl to specific format is needed
  if (format === 'jpg' && dataUrlOrHttpUrl.startsWith('data:image/png')) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';

    await new Promise((resolve, reject) => {
      img.onload = () => resolve(true);
      img.onerror = reject;
      img.src = dataUrlOrHttpUrl;
    });

    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;
    if (ctx) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      const jpgData = canvas.toDataURL('image/jpeg', 0.95);
      triggerDownload(jpgData, filename);
      return;
    }
  }

  triggerDownload(dataUrlOrHttpUrl, filename);
}

function triggerDownload(url: string, filename: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
