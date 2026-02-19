import React from 'react';

export function JsonLd({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateProductSchema(product: any) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image_url,
    "description": product.seo_description || product.description,
    "brand": {
      "@type": "Brand",
      "name": "IPS"
    },
    "offers": {
      "@type": "Offer",
      "url": `${window.location.origin}/san-pham/${product.slug}`,
      "priceCurrency": "VND",
      "availability": "https://schema.org/InStock"
    }
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "IPS - Industrial Power Solutions",
    "url": window.location.origin,
    "logo": `${window.location.origin}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "0900-123-456",
      "contactType": "technical support",
      "areaServed": "VN",
      "availableLanguage": "Vietnamese"
    }
  };
}
