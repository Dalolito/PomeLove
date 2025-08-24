export function getLocalizedDescription(
  puppy: {
    description_es: string;
    description_en: string;
  },
  locale: string
): string {
  if (locale === 'es') {
    return puppy.description_es;
  }

  if (locale === 'en') {
    return puppy.description_en;
  }

  // Default to Spanish if locale is not recognized
  return puppy.description_es;
}
