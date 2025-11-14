# LOGO 導出與整合指南

## 📋 當前狀態

- ✅ 已找到 LOGO 文件：`178mat-logo.psd` (802KB)
- ❌ PSD 格式無法直接在網頁使用
- ✅ 需要導出為 PNG 和 SVG 格式

---

## 🎨 LOGO 導出步驟

### 方法 A：使用 Photoshop（推薦）

1. **打開 PSD 文件**
   - 使用 Adobe Photoshop 打開 `178mat-logo.psd`

2. **導出 PNG 格式**（用於網站）
   ```
   檔案 → 轉存 → 轉存為...

   設定：
   - 格式：PNG
   - 透明背景：是
   - 尺寸建議：
     * logo.png: 200×200px（標準版）
     * logo@2x.png: 400×400px（高解析度）
     * logo-horizontal.png: 適當寬度×60px（橫向版，用於導航欄）
   ```

3. **導出 SVG 格式**（向量圖，最佳品質）
   ```
   檔案 → 轉存 → 轉存為...

   設定：
   - 格式：SVG
   - 路徑：簡化
   ```

4. **保存位置**
   - 導出的文件放到：`public/images/` 目錄
   - 命名建議：
     * `logo.svg` - SVG 主文件
     * `logo.png` - PNG 標準版
     * `logo@2x.png` - PNG 高解析度版
     * `logo-horizontal.svg` - 橫向版本（如需要）

### 方法 B：使用在線工具

如果沒有 Photoshop，可以使用在線轉換工具：

1. **Photopea**（免費在線 Photoshop）
   - 訪問：https://www.photopea.com/
   - 打開 PSD 文件
   - 導出為 PNG/SVG

2. **CloudConvert**（格式轉換）
   - 訪問：https://cloudconvert.com/psd-to-png
   - 上傳 PSD
   - 選擇輸出格式（PNG/SVG）

3. **Convertio**
   - 訪問：https://convertio.co/psd-png/
   - 轉換並下載

---

## 📐 LOGO 尺寸建議

### 網站使用場景

| 用途 | 建議尺寸 | 格式 | 文件名 |
|------|---------|------|--------|
| 導航欄 LOGO | 適當寬×40-60px | SVG/PNG | logo-nav.svg |
| 頁尾 LOGO | 120×120px | SVG/PNG | logo.svg |
| Favicon | 32×32px | PNG/ICO | favicon.png |
| Apple Touch Icon | 180×180px | PNG | apple-touch-icon.png |
| 社交媒體分享 | 1200×630px | PNG | og-image.png |
| 404 頁面大圖 | 200×200px | SVG | logo.svg |

---

## 🚀 導出後的整合步驟

導出完成後，執行以下步驟：

### 1. 複製文件

```bash
# 將導出的文件複製到專案
cp logo.svg public/images/
cp logo.png public/images/
cp logo@2x.png public/images/
cp favicon.png public/
```

### 2. 更新 HTML

編輯 `index.html`：

```html
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<!-- Open Graph 分享圖 -->
<meta property="og:image" content="/images/og-image.png" />
```

### 3. 運行自動化腳本

我會為您創建一個自動化腳本來整合 LOGO 到所有頁面：

```bash
npm run integrate-logo
```

---

## 🎯 LOGO 將會使用在以下位置

1. **導航欄**
   - 左上角替換文字 "易潔寶"
   - 響應式尺寸調整

2. **首頁 Hero 區**
   - 大尺寸展示
   - 配合品牌標語

3. **頁尾**
   - 中等尺寸
   - 配合公司資訊

4. **404 頁面**
   - 居中展示

5. **Favicon**
   - 瀏覽器標籤圖標

6. **分享預覽**
   - 社交媒體分享時的預覽圖

---

## 📝 快速指令（導出完成後）

```bash
# 1. 確保文件在正確位置
ls -la public/images/logo.*

# 2. 運行整合腳本（我會創建）
npm run integrate-logo

# 3. 啟動開發服務器查看效果
npm run dev

# 4. 構建生產版本
npm run build
```

---

## 🎨 LOGO 使用規範建議

### 顏色版本
- **彩色版**：主要使用場景
- **單色黑**：深色背景時使用
- **單色白**：淺色背景時使用

### 安全區域
- LOGO 周圍保持最小 20px 留白
- 不要拉伸或變形
- 保持原始比例

### 最小尺寸
- 數位使用：最小 40px 高度
- 印刷使用：最小 1.5cm 高度

---

## ❓ 常見問題

### Q: 我沒有 Photoshop 怎麼辦？

使用免費的在線工具：
- Photopea（https://www.photopea.com/）
- GIMP（免費桌面軟件）
- Figma（免費在線設計工具）

### Q: SVG 和 PNG 有什麼區別？

- **SVG**：向量圖，任意縮放不失真，文件小，推薦優先使用
- **PNG**：點陣圖，支持透明背景，適合複雜圖像

### Q: 需要導出幾個版本？

最基本的 3 個：
1. `logo.svg` - 主要版本（SVG 向量）
2. `logo.png` - 備用版本（PNG 標準）
3. `favicon.png` - 瀏覽器圖標（32×32px）

---

## 🔄 導出完成後請告知

導出完成後，請回覆以下資訊：

1. 已導出的文件列表
2. 文件位置（是否已複製到 `public/images/`）
3. LOGO 主要顏色（用於主題配色）
4. 是否有多個版本（橫向、縱向、簡化版等）

我將立即幫您整合到網站的所有位置！

---

**下一步**：請使用上述任一方法導出 LOGO，完成後告訴我，我會自動整合到網站中。
