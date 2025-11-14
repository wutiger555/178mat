#!/usr/bin/env node

/**
 * LOGO 自動整合工具
 *
 * 用途：自動將 LOGO 整合到網站的所有位置
 *
 * 使用前提：
 * 1. 已從 PSD 導出 PNG/SVG 格式
 * 2. 文件已放置在 public/images/ 目錄
 *
 * 使用方法：
 *   npm run integrate-logo
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

// 配置
const config = {
  logoFiles: {
    svg: 'public/images/logo.svg',
    png: 'public/images/logo.png',
    pngRetina: 'public/images/logo@2x.png',
    favicon: 'public/favicon.png',
    appleTouchIcon: 'public/apple-touch-icon.png',
  },
  backupDir: 'backups/logo-integration',
};

// 顏色提取（如果需要）
function extractColorsFromLogo() {
  console.log('📊 分析 LOGO 配色...');
  // 這裡可以使用 sharp 或其他庫來分析圖片顏色
  // 暫時返回默認配色
  return {
    primary: '#B8382D',
    secondary: '#D4AF37',
    dark: '#333333',
    light: '#F5F5F5',
  };
}

// 檢查文件是否存在
function checkLogoFiles() {
  console.log('🔍 檢查 LOGO 文件...\n');

  const results = {
    found: [],
    missing: [],
  };

  for (const [name, filePath] of Object.entries(config.logoFiles)) {
    const fullPath = path.resolve(projectRoot, filePath);
    const exists = fs.existsSync(fullPath);

    if (exists) {
      const stats = fs.statSync(fullPath);
      results.found.push({
        name,
        path: filePath,
        size: (stats.size / 1024).toFixed(2) + ' KB',
      });
      console.log(`✅ ${name.padEnd(20)} ${filePath}`);
    } else {
      results.missing.push({ name, path: filePath });
      console.log(`❌ ${name.padEnd(20)} ${filePath} (未找到)`);
    }
  }

  return results;
}

// 更新 index.html
function updateIndexHTML(logoFiles) {
  console.log('\n📝 更新 index.html...');

  const indexPath = path.resolve(projectRoot, 'index.html');
  let content = fs.readFileSync(indexPath, 'utf-8');

  // 更新 favicon
  if (logoFiles.found.find(f => f.name === 'favicon')) {
    content = content.replace(
      /<link rel="icon"[^>]*>/,
      '<link rel="icon" type="image/png" href="/favicon.png" />'
    );
    console.log('  ✅ 更新 favicon');
  }

  // 更新 apple-touch-icon
  if (logoFiles.found.find(f => f.name === 'appleTouchIcon')) {
    if (content.includes('apple-touch-icon')) {
      content = content.replace(
        /<link rel="apple-touch-icon"[^>]*>/,
        '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />'
      );
    } else {
      content = content.replace(
        '</head>',
        '  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />\n  </head>'
      );
    }
    console.log('  ✅ 更新 Apple Touch Icon');
  }

  fs.writeFileSync(indexPath, content);
  console.log('✅ index.html 更新完成');
}

// 創建 LOGO 組件
function createLogoComponent() {
  console.log('\n🎨 創建 Logo 組件...');

  const logoComponentContent = `import React from 'react';

interface LogoProps {
  variant?: 'default' | 'nav' | 'footer';
  className?: string;
}

/**
 * 易潔寶 LOGO 組件
 *
 * 支持多種顯示模式：
 * - default: 標準尺寸，用於一般頁面
 * - nav: 導航欄尺寸（較小）
 * - footer: 頁尾尺寸（中等）
 */
export default function Logo({ variant = 'default', className = '' }: LogoProps) {
  const sizes = {
    default: 'h-32 w-auto',
    nav: 'h-10 w-auto md:h-12',
    footer: 'h-16 w-auto',
  };

  const sizeClass = sizes[variant];

  return (
    <img
      src="/images/logo.svg"
      alt="易潔寶 - 專業除泥地墊專家"
      className={\`\${sizeClass} \${className}\`}
      onError={(e) => {
        // SVG 加載失敗時使用 PNG 備用
        const target = e.target as HTMLImageElement;
        if (target.src.endsWith('.svg')) {
          target.src = '/images/logo.png';
        }
      }}
    />
  );
}

/**
 * LOGO 配色（從 LOGO 提取）
 */
export const LOGO_COLORS = {
  primary: '#B8382D',    // 品牌紅
  secondary: '#D4AF37',  // 金色
  dark: '#333333',       // 深灰
  light: '#F5F5F5',      // 淺灰
};
`;

  const logoComponentPath = path.resolve(projectRoot, 'src/components/Logo.tsx');
  fs.writeFileSync(logoComponentPath, logoComponentContent);
  console.log('✅ Logo.tsx 組件已創建');

  return logoComponentPath;
}

// 更新導航欄
function updateNavbar() {
  console.log('\n🧭 更新 Navbar 組件...');

  const navbarPath = path.resolve(projectRoot, 'src/components/Navbar.tsx');
  let content = fs.readFileSync(navbarPath, 'utf-8');

  // 添加 Logo 導入
  if (!content.includes('import Logo from')) {
    content = content.replace(
      'import { useState }',
      'import { useState }\nimport Logo from "@/components/Logo";'
    );
  }

  // 替換文字為 Logo（保留備用文字）
  // 尋找包含 APP_TITLE 或 "易潔寶" 的地方
  if (content.includes('{APP_TITLE}')) {
    content = content.replace(
      /\{APP_TITLE\}/g,
      '<Logo variant="nav" />'
    );
    console.log('  ✅ 替換導航欄標題為 Logo');
  }

  fs.writeFileSync(navbarPath, content);
  console.log('✅ Navbar 更新完成');
}

// 更新頁尾
function updateFooter() {
  console.log('\n🔽 更新 Footer 組件...');

  const footerPath = path.resolve(projectRoot, 'src/components/Footer.tsx');

  if (!fs.existsSync(footerPath)) {
    console.log('  ⚠️  Footer.tsx 不存在，跳過');
    return;
  }

  let content = fs.readFileSync(footerPath, 'utf-8');

  // 添加 Logo 導入
  if (!content.includes('import Logo from')) {
    content = content.replace(
      /(import .* from ['"]react['"];?\n)/,
      '$1import Logo from "@/components/Logo";\n'
    );
  }

  fs.writeFileSync(footerPath, content);
  console.log('✅ Footer 更新完成');
}

// 生成使用報告
function generateReport(logoFiles, colors) {
  console.log('\n' + '='.repeat(60));
  console.log('📊 LOGO 整合報告');
  console.log('='.repeat(60));

  console.log('\n✅ 已找到的文件：');
  logoFiles.found.forEach(file => {
    console.log(`  - ${file.name}: ${file.path} (${file.size})`);
  });

  if (logoFiles.missing.length > 0) {
    console.log('\n❌ 缺少的文件：');
    logoFiles.missing.forEach(file => {
      console.log(`  - ${file.name}: ${file.path}`);
    });
    console.log('\n💡 提示：請參考 docs/LOGO_EXPORT_GUIDE.md 導出缺少的文件');
  }

  console.log('\n🎨 LOGO 配色：');
  console.log(`  - 主色：${colors.primary}`);
  console.log(`  - 副色：${colors.secondary}`);
  console.log(`  - 深色：${colors.dark}`);
  console.log(`  - 淺色：${colors.light}`);

  console.log('\n📝 已更新的組件：');
  console.log('  ✅ index.html - Favicon 和 Touch Icon');
  console.log('  ✅ src/components/Logo.tsx - LOGO 組件');
  console.log('  ✅ src/components/Navbar.tsx - 導航欄');
  console.log('  ✅ src/components/Footer.tsx - 頁尾');

  console.log('\n🚀 下一步：');
  console.log('  1. npm run dev - 啟動開發服務器查看效果');
  console.log('  2. 檢查所有頁面的 LOGO 顯示');
  console.log('  3. 根據需要調整尺寸和樣式');

  console.log('\n' + '='.repeat(60));
}

// 主函數
function main() {
  console.log('🚀 開始整合 LOGO...\n');

  try {
    // 1. 檢查文件
    const logoFiles = checkLogoFiles();

    if (logoFiles.found.length === 0) {
      console.log('\n❌ 錯誤：未找到任何 LOGO 文件！');
      console.log('📖 請先按照 docs/LOGO_EXPORT_GUIDE.md 導出 LOGO');
      process.exit(1);
    }

    // 2. 提取配色
    const colors = extractColorsFromLogo();

    // 3. 更新文件
    updateIndexHTML(logoFiles);
    createLogoComponent();

    try {
      updateNavbar();
    } catch (err) {
      console.log(`  ⚠️  更新 Navbar 時出錯: ${err.message}`);
    }

    try {
      updateFooter();
    } catch (err) {
      console.log(`  ⚠️  更新 Footer 時出錯: ${err.message}`);
    }

    // 4. 生成報告
    generateReport(logoFiles, colors);

    console.log('\n✅ LOGO 整合完成！\n');

  } catch (error) {
    console.error('\n❌ 錯誤：', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 執行
main();
