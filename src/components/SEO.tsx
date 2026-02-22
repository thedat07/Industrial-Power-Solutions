import React from 'react';

export const BASE_URL = "https://industrial-power-solutions.vercel.app";

export const NAME_INFO = `Biến Áp Ampli`;

export const NAME_LAST_INFO = `Ampli `;

export const NAME_FIST_INFO = `Biến Áp `;

export const ORG_ID = `${BASE_URL}#org`;

export const WEBSITE_ID = `${BASE_URL}#website`;

export const TELEPHONE = `+84787158552`;

export const TELEPHONE_TEXT = `+84-787-158-552`;

export const ADDRESS = `Số 15 phố Khương Hạ, phường Khương Đình, quận Thanh Xuân, Hà Nội, Việt Nam`;

export const EMAIL = `ntd15kh@gmail.com`;

export function JsonLd({ data }: { data: any }) { return (<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />); }

export function pageSchema(url: string, title: string) { return { "@type": "WebPage", "@id": `${url}#webpage`, "url": url, "name": title, "isPartOf": { "@id": WEBSITE_ID }, "inLanguage": "vi-VN" }; }

export function articleSchema(article: any) {
  const url = `${BASE_URL}/kien-thuc/${article.slug}`;
  return {
    "@type": "TechArticle",
    "@id": `${url}#article`,
    "headline": article.title,
    "description": article.summary,
    "image": article.image_url,
    "isPartOf": { "@id": WEBSITE_ID },
    "about": { "@id": ORG_ID },
    "author": { "@type": "Person", "name": "Kỹ sư" },
    "publisher": { "@id": ORG_ID },
    "mainEntityOfPage": { "@id": `${url}#webpage` },
    "inLanguage": "vi-VN"
  };
}

export function productSchema(product: any) {
  const url = `${BASE_URL}/san-pham/${product.slug}`;
  return {
    "@type": "Product", "@id": `${url}#product`,
    "name": product.name,
    "image": product.image_url,
    "description": product.seo_description || product.description,
    "brand": { "@id": ORG_ID }, "manufacturer": { "@id": ORG_ID },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Sản xuất", "value": "Theo yêu cầu khách hàng" },
      { "@type": "PropertyValue", "name": "Loại", "value": "Audio Transformer" }
    ],
    "offers": {
      "@type": "Offer", "url": url,
      "priceCurrency": "VND",
      "availability": "https://schema.org/PreOrder",
      "seller": { "@id": ORG_ID }
    }
  };
}

export function breadcrumbSchema(url: string, items: { name: string; url: string }[]) { return { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, "itemListElement": items.map((item, i) => ({ "@type": "ListItem", "position": i + 1, "name": item.name, "item": item.url })) }; }

export function faqSchema(faqs: { q: string; a: string }[], url: string) { if (!faqs || faqs.length < 2) return null; return { "@type": "FAQPage", "@id": `${url}#faq`, "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })) }; }

export function buildGraph(...nodes: any[]) { return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) }; }

export function extractFAQ(content: string) {
  if (!content) return [];

  const regex = /##\s(.+?)\n([\s\S]*?)(?=\n##\s|$)/g;

  const faqs: any[] = [];

  let result: RegExpExecArray | null;

  while (true) {
    result = regex.exec(content);
    if (!result) break;

    const question = result[1]?.trim();
    let answer = result[2]?.trim();

    if (!question || !answer) continue;

    answer = answer
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`.*?`/g, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      .replace(/\n+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (answer.length < 40) continue;

    faqs.push({
      "@type": "Question",
      "name": question.slice(0, 120),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer.slice(0, 350)
      }
    });

    if (faqs.length >= 5) break;
  }

  return faqs;
}

export const rootSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "ProfessionalService", "Manufacturer"],
      "@id": ORG_ID,

      /* ===== BASIC INFO ===== */
      "name": { NAME_FIST_INFO },
      "alternateName": { NAME_INFO },
      "url": BASE_URL,
      "logo": `${BASE_URL}/logo.png`,
      "image": `${BASE_URL}/logo.png`,

      /* ===== CONTACT ===== */
      "email": { EMAIL },
      "telephone": { TELEPHONE_TEXT },

      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": TELEPHONE,
        "contactType": "customer service",
        "areaServed": "VN",
        "availableLanguage": "vi",
        "contactOption": "HearingImpairedSupported"
      },

      /* ===== ADDRESS ===== */
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "15 Phố Khương Hạ, Phường Khương Đình",
        "addressLocality": "Thanh Xuân",
        "addressRegion": "Hà Nội",
        "postalCode": "100000",
        "addressCountry": "VN"
      },

      /* ===== SERVICE AREA ===== */
      "areaServed": {
        "@type": "Country",
        "name": "Vietnam"
      },

      "sameAs": [
        "https://zalo.me/0787158552",
        "https://www.facebook.com/TheDat07121998/",
      ],

      /* ===== TOPICAL AUTHORITY ===== */
      "knowsAbout": [
        "Biến áp âm ly",
        "Biến áp xuất âm",
        "Biến áp nguồn ampli",
        "Biến áp đèn điện tử",
        "Biến áp 70V 100V PA",
        "Audio line transformer",
        "Matching transformer 4Ω 8Ω 16Ω",
        "Quấn biến áp theo yêu cầu",
        "Thiết kế nguồn linear cho audio",
        "Sửa chữa ampli và thiết bị âm thanh"
      ]
    },

    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      "url": BASE_URL,
      "publisher": { "@id": ORG_ID },
      "inLanguage": "vi-VN"
    }
  ]
};
