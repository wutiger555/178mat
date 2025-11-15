import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

/**
 * SEO 組件 - 動態更新頁面的 meta tags
 *
 * 使用方式：
 * <SEO
 *   title="頁面標題"
 *   description="頁面描述"
 *   keywords="關鍵字1,關鍵字2"
 * />
 */
export default function SEO({
  title = '易潔寶 - 台灣專業除泥地墊專家 | 嵌入式地墊、鋁合金框架施工 Since 2002',
  description = '易潔寶專營台灣主要出入口除泥地墊20年以上，提供嵌入式、表面式、排水式、坑槽式地墊之材料、設計、安裝、施工。台灣製造AL-620鋁合金框，1000+成功案例，全台服務。',
  keywords = '除泥地墊,刮泥墊,鋁合金地墊,嵌入式地墊,排水式地墊,易潔寶,178mat,台灣製造,地墊施工,建築地墊',
  image = 'https://www.178mat.com/images/logo-200.png',
  url = 'https://www.178mat.com/',
  type = 'website'
}: SEOProps) {
  useEffect(() => {
    // 更新 document title
    document.title = title;

    // 更新或創建 meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // 基本 meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', type, true);

    // Twitter Card tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // 更新 canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, keywords, image, url, type]);

  return null;
}
