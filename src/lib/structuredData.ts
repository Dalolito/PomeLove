// Structured data for SEO
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'POMELOVE KOREA',
  description:
    'Criadores especializados de Pomerania con 15+ años de experiencia',
  url: 'https://pomeloves.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://pomeloves.com/logo.png',
    width: 512,
    height: 512,
  },
  sameAs: [
    'https://www.instagram.com/pomelove_korea',
    'https://www.facebook.com/pomelovekorea',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+57-300-443-9574',
    contactType: 'customer service',
    areaServed: 'CO',
    availableLanguage: ['Spanish', 'English'],
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Medellín',
    addressCountry: 'CO',
  },
});

export const generateBreederSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'POMELOVE KOREA',
  description:
    'Criadores especializados de Pomerania con 15+ años de experiencia',
  url: 'https://pomeloves.com',
  telephone: '+57-300-443-9574',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Medellín',
    addressCountry: 'CO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 6.2442,
    longitude: -75.5812,
  },
  priceRange: '$$',
  openingHours: 'Mo-Su 09:00-18:00',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Pomerania Puppies',
    itemListElement: [],
  },
});

export const generatePuppySchema = (puppy: any, locale: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${puppy.name} - ${puppy.category.name}`,
  description:
    puppy.description || `Hermoso cachorro de Pomerania ${puppy.category.name}`,
  image: puppy.media.length > 0 ? puppy.media[0].url : '/placeholder-puppy.svg',
  brand: {
    '@type': 'Brand',
    name: 'POMELOVE KOREA',
  },
  category: 'Pomeranian Puppy',
  offers: {
    '@type': 'Offer',
    availability: puppy.available
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    priceCurrency: 'COP',
    price: puppy.price || 'Contact for price',
    seller: {
      '@type': 'Organization',
      name: 'POMELOVE KOREA',
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '100+',
  },
});

export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((breadcrumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: breadcrumb.name,
    item: `https://pomeloves.com${breadcrumb.url}`,
  })),
});
