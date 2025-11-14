#!/usr/bin/env node

/**
 * 圖片下載工具
 * 用途：從原網站下載所有圖片到本地 public/images/ 目錄
 *
 * 使用方法：
 *   node scripts/download-images.js
 *
 * 或添加到 package.json:
 *   npm run download-images
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const config = {
  // 圖片源網站（優先使用 Manus，如果無法訪問則使用原網站）
  sources: [
    'https://yijiebao-djcf4hqc.manus.space',
    'https://www.178mat.com',
  ],
  // 本地圖片目錄
  localDir: path.resolve(__dirname, '../public/images'),
  // 需要下載的圖片列表（從代碼中自動提取）
  images: [],
};

// 確保目錄存在
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ 創建目錄: ${dir}`);
  }
}

// 下載單個圖片
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ImageDownloader/1.0)',
      },
    }, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ 下載成功: ${path.basename(filepath)}`);
          resolve();
        });
      } else {
        file.close();
        fs.unlink(filepath, () => {});
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      file.close();
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// 從數據文件中提取圖片列表
function extractImageList() {
  const images = new Set();

  // 讀取 projects.ts
  try {
    const projectsPath = path.resolve(__dirname, '../src/data/projects.ts');
    const projectsContent = fs.readFileSync(projectsPath, 'utf-8');
    const imageMatches = projectsContent.matchAll(/["']\/images\/([^"']+)["']/g);
    for (const match of imageMatches) {
      images.add(match[1]);
    }
  } catch (err) {
    console.warn('⚠️  無法讀取 projects.ts');
  }

  // 讀取 products.ts
  try {
    const productsPath = path.resolve(__dirname, '../src/data/products.ts');
    const productsContent = fs.readFileSync(productsPath, 'utf-8');
    const imageMatches = productsContent.matchAll(/["']\/images\/([^"']+)["']/g);
    for (const match of imageMatches) {
      images.add(match[1]);
    }
  } catch (err) {
    console.warn('⚠️  無法讀取 products.ts');
  }

  // 讀取 projects-additional.ts
  try {
    const additionalPath = path.resolve(__dirname, '../src/data/projects-additional.ts');
    const additionalContent = fs.readFileSync(additionalPath, 'utf-8');
    const imageMatches = additionalContent.matchAll(/["']\/images\/([^"']+)["']/g);
    for (const match of imageMatches) {
      images.add(match[1]);
    }
  } catch (err) {
    console.warn('⚠️  無法讀取 projects-additional.ts');
  }

  return Array.from(images);
}

// 主函數
async function main() {
  console.log('🚀 開始下載圖片...\n');

  // 確保目錄存在
  ensureDir(config.localDir);

  // 提取圖片列表
  const images = extractImageList();
  console.log(`📋 找到 ${images.length} 個圖片引用\n`);

  if (images.length === 0) {
    console.log('⚠️  未找到任何圖片引用，請檢查數據文件');
    return;
  }

  // 下載每個圖片
  let successCount = 0;
  let failCount = 0;

  for (const image of images) {
    const filename = path.basename(image);
    const filepath = path.join(config.localDir, filename);

    // 如果文件已存在，跳過
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  跳過（已存在）: ${filename}`);
      successCount++;
      continue;
    }

    // 嘗試從每個源下載
    let downloaded = false;
    for (const source of config.sources) {
      const url = `${source}/images/${filename}`;
      console.log(`⬇️  嘗試下載: ${url}`);

      try {
        await downloadImage(url, filepath);
        downloaded = true;
        successCount++;
        break;
      } catch (err) {
        console.log(`❌ 失敗: ${err.message}`);
      }
    }

    if (!downloaded) {
      console.log(`❌ 所有來源都無法下載: ${filename}\n`);
      failCount++;
    }
  }

  // 統計結果
  console.log('\n' + '='.repeat(50));
  console.log(`✅ 下載成功: ${successCount}`);
  console.log(`❌ 下載失敗: ${failCount}`);
  console.log(`📊 總計: ${images.length}`);
  console.log('='.repeat(50));

  if (failCount > 0) {
    console.log('\n⚠️  部分圖片下載失敗，您可以：');
    console.log('1. 手動從原網站下載圖片');
    console.log('2. 使用圖片代理配置（開發環境）');
    console.log('3. 聯繫 Manus 平台導出圖片');
  }
}

// 執行
main().catch(console.error);
