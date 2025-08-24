export const validateImageUrl = (url: string | null | undefined): string => {
  if (
    !url ||
    typeof url !== 'string' ||
    url.trim() === '' ||
    url.includes('undefined') ||
    url.includes('null') ||
    url === 'null' ||
    url === 'undefined'
  ) {
    return '/placeholder-puppy.svg';
  }

  const cleanUrl = url.trim();

  if (cleanUrl === '' || cleanUrl === 'null' || cleanUrl === 'undefined') {
    return '/placeholder-puppy.svg';
  }

  return cleanUrl;
};

export const getFirstValidImage = (
  mediaArray: Array<{ url?: string | null; type?: string }>
): string => {
  if (!Array.isArray(mediaArray)) {
    return '/placeholder-puppy.svg';
  }

  const validImage = mediaArray.find(
    item =>
      item &&
      item.type === 'image' &&
      item.url &&
      typeof item.url === 'string' &&
      item.url.trim() !== '' &&
      item.url !== 'null' &&
      item.url !== 'undefined' &&
      !item.url.includes('undefined') &&
      !item.url.includes('null')
  );

  return validImage
    ? validateImageUrl(validImage.url)
    : '/placeholder-puppy.svg';
};
