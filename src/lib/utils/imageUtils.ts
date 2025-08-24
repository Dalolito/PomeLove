export const validateImageUrl = (url: string | null | undefined): string => {
  if (!url || 
      typeof url !== 'string' ||
      url.trim() === '' || 
      url.includes('undefined') || 
      url.includes('null') ||
      url === 'null' ||
      url === 'undefined'
  ) {
    return '/placeholder-puppy.svg';
  }

  return url.trim();
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!src || src === '/placeholder-puppy.svg') {
      resolve();
      return;
    }

    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    img.src = src;
  });
};

export const preloadImages = async (urls: string[]): Promise<void> => {
  const validUrls = urls.filter(url => validateImageUrl(url) !== '/placeholder-puppy.svg');
  
  try {
    await Promise.allSettled(
      validUrls.map(url => preloadImage(url))
    );
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};
