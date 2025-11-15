# 易潔寶網站 - 快速開始指南

## 5 分鐘快速上手

### 第一步：了解網站結構

易潔寶網站包含以下主要頁面：

| 頁面 | 路徑 | 用途 |
|------|------|------|
| 首頁 | `/` | 品牌介紹、服務展示 |
| 關於我們 | `/about` | 公司歷史、核心價值 |
| 服務介紹 | `/services` | 四大地墊類型說明 |
| 工程實績 | `/projects` | 案例展示與篩選 |
| 產品型錄 | `/products` | 產品展示與規格 |
| 聯絡我們 | `/contact` | 聯絡表單與資訊 |

### 第二步：編輯工程實績

**最常見的編輯任務**

1. **開啟檔案**
   ```
   client/src/data/projects.ts
   ```

2. **新增案例**
   - 複製最後一個案例的程式碼
   - 修改 `id`、`title`、`location` 等欄位
   - 儲存檔案

3. **編輯現有案例**
   - 找到案例的 `id`
   - 修改需要更新的欄位
   - 儲存檔案

**範例：新增案例**

```typescript
{
  id: "taipei-new-2025",
  title: "台北信義區新案例",
  location: "台北市信義區...",
  city: "台北",
  district: "信義區",
  year: 2025,
  images: ["/images/new-1.jpg", "/images/new-2.jpg"],
  description: "這是一個新的工程案例...",
  tags: {
    buildingType: ["辦公大樓"],
    floorMaterial: ["地磚（硬底施工）"],
    installationType: ["嵌入式"],
    framingType: ["AL-620"],
    surfaceMaterial: ["波羅紋毯面灰色"],
    drainageType: ["導水溝"],
    designFeature: ["大門內側"],
    location: ["大門入口"]
  },
  specs: {
    area: "20平方公尺",
    depth: "2cm",
    width: "200cm",
    length: "1000cm"
  }
}
```

### 第三步：編輯產品型錄

**檔案位置**
```
client/src/data/products.ts
```

**新增產品範例**

```typescript
{
  id: "mat-premium-2025",
  name: "高級波羅紋地墊",
  category: "嵌入式地墊",
  description: "採用進口波羅紋毯面，耐用性強...",
  image: "/images/product-premium.jpg",
  specifications: [
    { name: "寬度", value: "150-300cm" },
    { name: "深度", value: "2cm" },
    { name: "材質", value: "鋁合金框+波羅紋毯面" }
  ],
  materials: ["鋁合金", "波羅紋毯面"],
  colors: ["黑色", "灰色", "棕色"],
  price: "依規格報價",
  features: ["易清潔", "防滑", "耐用"],
  relatedProjects: ["taichung-dali-residential"]
}
```

### 第四步：更新公司資訊

**檔案位置**
```
client/src/data/cms-config.ts
```

**編輯內容**

```typescript
export const defaultCMSSettings: CMSSettings = {
  siteName: "易潔寶",
  companyName: "易潔寶",
  companyEnglishName: "178mat",
  foundedYear: 2002,
  contactEmail: "your-email@178mat.com",
  contactPhone: "+886-2-XXXX-XXXX",
  address: "台灣台北市...",
  // ... 其他設定
};
```

---

## 常用標籤速查表

### 建物類型
```
"住宅大廈", "公共建築", "學校", "廠辦", "教會", 
"旅館", "百貨公司", "醫院", "餐廳", "辦公大樓"
```

### 安裝方式
```
"嵌入式", "表面式", "平鋪式2cm", "平鋪式5cm"
```

### 面料類型
```
"波羅紋毯面", "波羅紋毯面多色搭配", "波羅紋毯面棕色",
"波羅紋毯面灰色", "波羅紋毯面紅色", "波羅紋毯面黑色",
"直條紋毯面", "止滑膠條", "止滑膠條＋毛刷條",
"橡膠止滑條", "毛刷條"
```

### 收邊框類型
```
"1字型扁鋁", "AL-620", "不鏽鋼框", 
"平鋪立地5cm斜鋁框", "無收邊框"
```

---

## 檔案編輯檢查清單

編輯前，請確認：

- [ ] 使用正確的編輯器（VS Code、Sublime Text 等）
- [ ] 檔案編碼為 UTF-8
- [ ] 所有字串用雙引號包圍
- [ ] 物件之間有逗號
- [ ] 最後一個元素後面沒有逗號
- [ ] 括號配對正確

編輯後，請確認：

- [ ] 檔案已儲存
- [ ] 瀏覽器已重新整理（Ctrl+F5）
- [ ] 沒有紅色錯誤提示
- [ ] 新增的內容在網站上可見

---

## 常見錯誤排查

### 問題：編輯後網站顯示錯誤

**檢查清單：**

1. 開啟瀏覽器開發者工具（F12）
2. 查看 Console 標籤中的錯誤訊息
3. 檢查 JSON 格式是否正確
4. 確認所有引號都是雙引號 `"`
5. 確認逗號位置正確

### 問題：圖片無法顯示

**檢查清單：**

1. 圖片檔案是否在 `client/public/images/` 目錄
2. 檔案路徑是否正確（區分大小寫）
3. 檔案名稱是否包含特殊字符
4. 圖片格式是否為 JPG、PNG 等常見格式

### 問題：篩選功能無法使用

**檢查清單：**

1. 標籤是否使用了正確的選項
2. 標籤是否拼寫正確
3. 是否遺漏了標籤陣列

---

## 進階操作

### 批量新增案例

1. 準備 JSON 格式的案例資料
2. 複製到 `projects.ts` 中的陣列
3. 確保格式正確

### 導出資料備份

1. 複製 `client/src/data/` 目錄
2. 儲存到安全位置
3. 定期更新備份

### 使用版本控制

如果您熟悉 Git：

```bash
# 初始化版本控制
git init

# 提交變更
git add .
git commit -m "新增工程實績"

# 查看歷史
git log
```

---

## 下一步

- 詳細說明請參考 [完整維護指南](./MAINTENANCE_GUIDE.md)
- 技術問題請聯絡開發團隊
- 定期備份重要資料

---

**祝您使用愉快！** 🎉

如有任何問題，請參考完整的 [MAINTENANCE_GUIDE.md](./MAINTENANCE_GUIDE.md)
