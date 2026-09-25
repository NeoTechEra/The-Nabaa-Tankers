import React, { useEffect } from 'react';
import { useRouter } from '../context/RouterContext';

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
  breadcrumbs?: Array<{ name: string; path: string }>;
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  schema,
  breadcrumbs,
}) => {
  const { lang, basePath, currentPath } = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const origin = window.location.origin;
    const fullTitle = title.includes('The Nabaa') || title.includes('صهاريج نبع')
      ? title
      : `${title} | ${lang === 'ar' ? 'صهاريج نبع - توريد مياه الشرب' : 'The Nabaa Tankers - Potable Water Delivery'}`;

    // 1. Document Title
    document.title = fullTitle;

    // Helper to set or update meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to set or update link tag
    const setLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang 
        ? `link[rel="${rel}"][hreflang="${hreflang}"]` 
        : `link[rel="${rel}"]`;
      let element = document.querySelector(selector) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        if (hreflang) element.setAttribute('hreflang', hreflang);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Meta Description
    setMeta('description', description);

    // 3. OpenGraph
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', `${origin}${currentPath}`, true);
    setMeta('og:site_name', lang === 'ar' ? 'صهاريج نبع' : 'The Nabaa Tankers', true);
    setMeta('og:locale', lang === 'ar' ? 'ar_SA' : 'en_US', true);

    // 4. Twitter Cards
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);

    // 5. Canonical & Hreflang
    const cleanCanonical = canonicalPath || (lang === 'ar' ? (basePath === '/' ? '/ar' : `/ar${basePath}`) : (basePath === '/' ? '/' : basePath));
    setLink('canonical', `${origin}${cleanCanonical}`);
    
    // Hreflang alternates
    const enUrl = `${origin}${basePath === '/' ? '/' : basePath}`;
    const arUrl = `${origin}${basePath === '/' ? '/ar' : `/ar${basePath}`}`;
    setLink('alternate', enUrl, 'en');
    setLink('alternate', arUrl, 'ar');
    setLink('alternate', enUrl, 'x-default');

    // 6. JSON-LD Structured Data
    // Base Organization & LocalBusiness
    const baseSchemas: any[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${origin}/#organization`,
        name: lang === 'ar' ? 'صهاريج نبع لتوريد المياه' : 'The Nabaa Tankers',
        alternateName: ['The Nabaa', 'صهاريج نبع'],
        description: 'Professional water-tanker delivery across Riyadh and Saudi Arabia via digital ordering and dispatch.',
        url: origin,
        telephone: '+966530434010',
        email: 'thenabaatankers@gmail.com',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Riyadh',
          addressCountry: 'SA',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '24.774265',
          longitude: '46.738586',
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '00:00',
            closes: '23:59',
          }
        ],
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Riyadh' },
          { '@type': 'AdministrativeArea', name: 'Saudi Arabia' }
        ],
        serviceType: ['Potable Water Delivery', 'Tanker Water Delivery', 'Residential Water Supply', 'Commercial Water Refill']
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: origin,
        name: 'The Nabaa Tankers',
        inLanguage: ['en', 'ar'],
      }
    ];

    // Add BreadcrumbList if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      baseSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: `${origin}${crumb.path}`,
        })),
      });
    }

    // Add custom schema(s) if provided
    if (schema) {
      if (Array.isArray(schema)) {
        baseSchemas.push(...schema);
      } else {
        baseSchemas.push(schema);
      }
    }

    // Inject JSON-LD Script tag
    let jsonLdScript = document.getElementById('seo-structured-data') as HTMLScriptElement | null;
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'seo-structured-data';
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(baseSchemas.length === 1 ? baseSchemas[0] : baseSchemas);

  }, [title, description, canonicalPath, schema, breadcrumbs, lang, basePath, currentPath]);

  return null;
};
