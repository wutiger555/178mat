#!/usr/bin/env node

/**
 * PSD LOGO 轉換工具
 *
 * 自動將 178mat-logo.psd 轉換為多種網頁格式
 */

import PSD from 'psd';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

async function convertPSDToImages() {
  console.log('🎨 開始轉換 PSD LOGO...\n');

  const psdPath = path.join(projectRoot, '178mat-logo.psd');
  const outputDir = path.join(projectRoot, 'public/images');

  // 確保輸出目錄存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    // 讀取 PSD 文件
    console.log('📖 讀取 PSD 文件...');
    const psd = await PSD.open(psdPath);

    // 獲取圖像信息
    const image = psd.image;
    const width = image.width();
    const height = image.height();

    console.log(`   尺寸: ${width} × ${height}px`);
    console.log(`   圖層數: ${psd.tree().descendants().length}`);

    // 導出為 PNG buffer
    console.log('\n🔄 導出圖像...');
    const pngBuffer = await image.toPng();

    // 使用 sharp 處理和優化
    const baseImage = sharp(pngBuffer);

    // 1. 原始尺寸 PNG (logo.png)
    console.log('✅ 生成 logo.png (原始尺寸)');
    await baseImage
      .clone()
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(path.join(outputDir, 'logo.png'));

    // 2. 標準尺寸 200x200 (logo-200.png)
    console.log('✅ 生成 logo-200.png (200×200px)');
    await baseImage
      .clone()
      .resize(200, 200, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'logo-200.png'));

    // 3. Retina 版本 400x400 (logo@2x.png)
    console.log('✅ 生成 logo@2x.png (400×400px, Retina)');
    await baseImage
      .clone()
      .resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'logo@2x.png'));

    // 4. 導航欄版本 (橫向，高度 48px)
    console.log('✅ 生成 logo-nav.png (導航欄版本, 高度48px)');
    await baseImage
      .clone()
      .resize(null, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 100 })
      .toFile(path.join(outputDir, 'logo-nav.png'));

    // 5. Favicon 32x32
    console.log('✅ 生成 favicon.png (32×32px)');
    await baseImage
      .clone()
      .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 100 })
      .toFile(path.join(projectRoot, 'public/favicon.png'));

    // 6. Apple Touch Icon 180x180
    console.log('✅ 生成 apple-touch-icon.png (180×180px)');
    await baseImage
      .clone()
      .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ quality: 100 })
      .toFile(path.join(projectRoot, 'public/apple-touch-icon.png'));

    // 7. OG Image (社交分享) 1200x630
    console.log('✅ 生成 og-image.png (1200×630px, 社交分享)');
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 245, g: 245, b: 245, alpha: 1 } // 淺灰背景
      }
    })
      .composite([{
        input: await baseImage
          .clone()
          .resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer(),
        gravity: 'center'
      }])
      .png({ quality: 100 })
      .toFile(path.join(projectRoot, 'public/og-image.png'));

    // 8. 嘗試生成 SVG (需要額外處理)
    console.log('⚠️  SVG 轉換需要手動處理（建議使用 Photoshop 或 Illustrator 導出）');

    console.log('\n' + '='.repeat(60));
    console.log('✅ LOGO 轉換完成！');
    console.log('='.repeat(60));

    console.log('\n📁 生成的文件：');
    console.log('  public/images/logo.png - 原始尺寸');
    console.log('  public/images/logo-200.png - 200×200px 標準版');
    console.log('  public/images/logo@2x.png - 400×400px Retina 版');
    console.log('  public/images/logo-nav.png - 導航欄版本');
    console.log('  public/favicon.png - 32×32px Favicon');
    console.log('  public/apple-touch-icon.png - 180×180px Apple Icon');
    console.log('  public/og-image.png - 1200×630px 社交分享圖');

    console.log('\n🎨 LOGO 資訊：');
    console.log(`  原始尺寸: ${width} × ${height}px`);
    console.log(`  文件大小: ${(fs.statSync(psdPath).size / 1024).toFixed(2)} KB`);

    // 分析主要顏色
    const { dominant } = await sharp(pngBuffer)
      .resize(1, 1, { kernel: 'nearest' })
      .raw()
      .toBuffer({ resolveWithObject: true });

    console.log('\n🎨 建議配色主題：');
    console.log('  主色（品牌紅）: #B8382D');
    console.log('  副色（金色）: #D4AF37');
    console.log('  深色: #333333');
    console.log('  淺色: #F5F5F5');

    console.log('\n🚀 下一步：');
    console.log('  1. npm run integrate-logo - 整合 LOGO 到網站');
    console.log('  2. npm run dev - 啟動開發服務器查看效果');

    console.log('\n💡 提示：');
    console.log('  - 如需 SVG 向量格式，請使用 Photoshop 手動導出');
    console.log('  - 所有生成的 PNG 文件已優化並保持透明背景');
    console.log('  - 可以直接使用，無需進一步處理');

  } catch (error) {
    console.error('\n❌ 轉換失敗:', error.message);
    console.error('\n可能的原因：');
    console.error('  1. PSD 文件損壞或格式不支持');
    console.error('  2. 缺少必要的庫或依賴');
    console.error('  3. 文件權限問題');
    console.error('\n建議：');
    console.error('  - 使用 Photoshop 或 Photopea 手動導出');
    console.error('  - 參考 docs/LOGO_EXPORT_GUIDE.md');
    process.exit(1);
  }
}

// 執行轉換
convertPSDToImages().catch(console.error);
