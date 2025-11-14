import React from 'react';

interface LogoProps {
  variant?: 'default' | 'nav' | 'footer' | 'hero';
  className?: string;
}

/**
 * 易潔寶 LOGO 組件
 *
 * 支持多種顯示模式：
 * - default: 標準尺寸 (200px)
 * - nav: 導航欄尺寸 (48px 高度)
 * - footer: 頁尾尺寸 (120px)
 * - hero: 首頁大尺寸 (300px+)
 */
export default function Logo({ variant = 'default', className = '' }: LogoProps) {
  const variants = {
    default: {
      size: 'h-32 w-32',
      src: '/images/logo-200.png',
      srcSet: '/images/logo-200.png 1x, /images/logo@2x.png 2x',
    },
    nav: {
      size: 'h-10 w-auto md:h-12',
      src: '/images/logo-nav.png',
      srcSet: '/images/logo-nav.png 1x, /images/logo-200.png 2x',
    },
    footer: {
      size: 'h-24 w-24 md:h-28 md:w-28',
      src: '/images/logo-200.png',
      srcSet: '/images/logo-200.png 1x, /images/logo@2x.png 2x',
    },
    hero: {
      size: 'h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80',
      src: '/images/logo@2x.png',
      srcSet: '/images/logo@2x.png 1x, /images/logo.png 2x',
    },
  };

  const config = variants[variant];

  return (
    <img
      src={config.src}
      srcSet={config.srcSet}
      alt="易潔寶 - 專業除泥地墊專家 Since 2002"
      className={`${config.size} object-contain ${className}`}
      loading="lazy"
    />
  );
}

/**
 * LOGO 品牌配色
 * 從 LOGO 提取的主要顏色
 */
export const LOGO_COLORS = {
  primary: '#B8382D',    // 品牌紅
  secondary: '#D4AF37',  // 金色
  dark: '#333333',       // 深灰
  light: '#F5F5F5',      // 淺灰
} as const;
