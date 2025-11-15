import PSD from 'psd';
import fs from 'fs';

const psdPath = '178mat-logo.psd';
const outputPath = 'public/images/logo.png';

console.log('🎨 轉換 PSD LOGO...');

PSD.open(psdPath).then(async (psd) => {
  const w = psd.image.width();
  const h = psd.image.height();
  console.log(`尺寸: ${w} × ${h}px`);

  // 使用 saveAsPng 方法
  await psd.image.saveAsPng(outputPath);

  const stats = fs.statSync(outputPath);
  console.log('✅ LOGO 已提取:', outputPath);
  console.log('大小:', (stats.size / 1024).toFixed(2), 'KB');

  console.log('\n下一步：使用 sharp 生成不同尺寸...');

}).catch(err => {
  console.error('❌ 錯誤:', err.message);
  console.error(err.stack);
});
