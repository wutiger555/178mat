# 問題排查指南

## 常見錯誤和解決方案

### 1. "URI malformed" 錯誤

**問題描述：**
```
Internal server error: URI malformed
at decodeURI (<anonymous>)
```

**可能原因：**
- HTML 中的 script 標籤包含無效的 URL
- 環境變數未正確配置導致空的 src 屬性
- 文件路徑包含特殊字符

**解決方案：**
1. 檢查 `index.html` 中的所有 `<script>` 和 `<link>` 標籤
2. 確保所有引用的環境變數都有值或被註釋掉
3. 移除或註釋未使用的 analytics script

**已修復：**
- ✅ 移除了有問題的 analytics script
- ✅ 使用固定路徑而非環境變數

---

### 2. 圖片無法顯示

**問題描述：**
圖片路徑返回 404 錯誤

**解決方案：**
1. 確保圖片文件存在於 `public/images/` 目錄
2. 使用正確的路徑格式：`/images/filename.jpg`（開頭有斜線）
3. 檢查文件名大小寫是否正確

**創建佔位圖片：**
```bash
# 在 public/images/ 目錄下創建你的圖片文件
cp your-image.jpg public/images/
```

---

### 3. 依賴安裝失敗

**問題描述：**
```
npm install 失敗或出現錯誤
```

**解決方案：**
```bash
# 清理並重新安裝
rm -rf node_modules package-lock.json
npm install

# 或使用 pnpm
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

### 4. TypeScript 類型錯誤

**問題描述：**
```
error TS2307: Cannot find module '@/...'
```

**解決方案：**
1. 確保 `tsconfig.json` 中配置了路徑別名：
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

2. 確保 `vite.config.ts` 中配置了對應的別名：
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

---

### 5. Tailwind CSS 樣式不生效

**問題描述：**
CSS 類名沒有被應用

**解決方案：**
1. 確保安裝了 `@tailwindcss/postcss`：
```bash
npm install -D @tailwindcss/postcss
```

2. 檢查 `postcss.config.js`：
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

3. 確保 `src/index.css` 包含：
```css
@import "tailwindcss";
```

---

### 6. 開發服務器無法啟動

**問題描述：**
```
Error: Port 3000 is already in use
```

**解決方案：**
```bash
# 方法 1: 使用不同的端口
npm run dev -- --port 3001

# 方法 2: 殺死佔用端口的進程
lsof -ti:3000 | xargs kill -9
```

---

### 7. 構建失敗

**問題描述：**
`npm run build` 失敗

**解決方案：**
1. 先執行類型檢查：
```bash
npm run type-check
```

2. 檢查是否有未使用的導入（已在 `tsconfig.json` 中禁用嚴格檢查）

3. 清理並重新構建：
```bash
rm -rf dist
npm run build
```

---

### 8. 環境變數不生效

**問題描述：**
環境變數在應用中顯示為 undefined

**解決方案：**
1. Vite 環境變數必須以 `VITE_` 開頭
2. 創建 `.env` 文件：
```bash
cp .env.example .env
```

3. 重啟開發服務器以加載新的環境變數

---

### 9. Git 提交失敗

**問題描述：**
無法推送到遠程倉庫

**解決方案：**
```bash
# 檢查遠程倉庫配置
git remote -v

# 確保分支名稱正確
git branch

# 使用 -u 參數設置上游分支
git push -u origin <branch-name>
```

---

### 10. Leaflet 地圖不顯示

**問題描述：**
台灣地圖組件顯示空白

**解決方案：**
1. 確保 GeoJSON 文件存在：
```bash
ls -la public/data/taiwan-counties.geojson
```

2. 檢查 Leaflet CSS 是否正確導入：
```typescript
import 'leaflet/dist/leaflet.css';
```

3. 確保容器有固定高度：
```css
.map-container {
  height: 500px;
}
```

---

## 開發環境檢查清單

在開始開發前，確保：

- [ ] Node.js >= 18.0.0
- [ ] npm >= 9.0.0 或 pnpm >= 8.0.0
- [ ] Git 已安裝
- [ ] `.env` 文件已創建
- [ ] 依賴已安裝 (`npm install`)
- [ ] 構建測試通過 (`npm run build`)

## 獲取幫助

如果問題仍未解決：

1. 查看完整的錯誤堆棧
2. 檢查瀏覽器控制台（F12）
3. 查看終端輸出
4. 搜索 [GitHub Issues](https://github.com/vitejs/vite/issues)
5. 查看 [Vite 文檔](https://vitejs.dev/)

---

**最後更新**：2025 年 1 月
