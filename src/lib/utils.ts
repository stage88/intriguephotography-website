import { Metadata } from 'next';

export function toTitleCase(str: string) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

export function getSiteConfig() {
  return {
    siteUrl: 'https://intriguephotography.com.au',
    author: '@stage88',
    email: 'nina@intriguephotography.com.au',
    phone: '02 6238 3300',
    mobile: '0413 594 266',
    address: '125 Bingie Rd, Meringo NSW 2537',
    gtmId: 'G-8G4TVKDKJT',
    navigation: [
      {
        href: '/photography/weddings',
        label: 'Weddings',
        category: 'weddings',
        hero: '/images/photography/weddings/weddings-01.jpg',
      },
      {
        href: '/photography/maternity',
        label: 'Maternity',
        category: 'maternity',
        hero: '/images/photography/maternity/maternity-01.jpg',
      },
      {
        href: '/photography/newborn',
        label: 'Newborn',
        category: 'newborn',
        hero: '/images/photography/newborn/newborn-01.jpg',
      },
      {
        href: '/photography/children',
        label: 'Children',
        category: 'children',
        hero: '/images/photography/children/children-01.jpg',
      },
      {
        href: '/photography/family',
        label: 'Family',
        category: 'family',
        hero: '/images/photography/family/family-01.jpg',
      },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
  };
}

export function getPageMetaData(meta?: Metadata): Metadata {
  const siteName = 'Intrigue Photography and Gallery';
  const title = meta?.title ? `${meta.title} - ${siteName}` : siteName;
  const description =
    'Intrigue Photography and Gallery, led by photographer Nina Lange, offers professional and creative photography ' +
    'services across Canberra and the NSW South Coast. Specialising in newborn, children, family, couples, and wedding ' +
    'photography, we combine artistic talent with a friendly, personalised approach. Our gallery showcases fine art ' +
    "photography and unique prints, inviting you to explore and purchase stunning, thoughtful imagery that captures life's most meaningful moments.";

  if (meta?.title) {
    delete meta.title;
  }

  return {
    title,
    description,
    icons: {
      icon: [
        {
          url: '/favicon.ico',
          type: 'image/x-icon',
        },
      ],
    },
    keywords: [
      'intrigue photography and gallery',
      'nina lange photographer',
      'professional photography canberra',
      'fine art photography canberra',
      'creative imagery gallery',
      'family photography canberra',
      'newborn photography canberra',
      'children photography canberra',
      'couples photography canberra',
      'wedding photography canberra',
      'artistic portrait photography',
      'personalised photography services',
      'fine art prints canberra',
      'buy photography art canberra',
      'photography gallery canberra',
      'stunning photography canberra',
      'commercial photography expertise',
      'photographer with design degree',
      'professional friendly photographer',
      'canberra wedding photographer',
      'canberra family portraits',
      'canberra newborn portraits',
      'canberra children portraits',
      'creative photography canberra',
      'art photography gallery canberra',
    ],
    openGraph: {
      title: siteName,
      description,
      url: 'https://intriguephotography.com.au',
      siteName,
      images: [
        {
          url: 'https://intriguephotography.com.au/images/logo-1.png',
          width: 222,
          height: 1031,
          alt: siteName,
        },
      ],
      locale: 'en_AU',
      type: 'website',
    },
    ...(meta ?? {}),
  };
}
