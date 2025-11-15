import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const baseLogo = 'public/images/logo.png';

const sizes = [
  { name: 'logo-200.png', width: 200, height: 200, dir: 'public/images' },
  { name: 'logo@2x.png', width: 400, height: 400, dir: 'public/images' },
  { name: 'logo-nav.png', width: null, height: 48, dir: 'public/images' },
  { name: 'favicon.png', width: 32, height: 32, dir: 'public' },
  { name: 'apple-touch-icon.png', width: 180, height: 180, dir: 'public' },
];

console.log('🔄 生成不同尺寸的 LOGO...\n');

async function generateSizes() {
  for (const size of sizes) {
    const outputPath = path.join(size.dir, size.name);

    await sharp(baseLogo)
      .resize(size.width, size.height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ quality: 100 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeInfo = size.width ? `${size.width}x${size.height}` : `height ${size.height}px`;
    console.log(`✅ ${size.name} - ${sizeInfo} - ${(stats.size/1024).toFixed(2)} KB`);
  }

  console.log('\n✅ 所有尺寸生成完成！');
}

generateSizes().catch(console.error);
