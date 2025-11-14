# 易潔寶網站維護指南

## 目錄

1. [系統概述](#系統概述)
2. [內容管理](#內容管理)
3. [工程實績管理](#工程實績管理)
4. [產品型錄管理](#產品型錄管理)
5. [常見問題](#常見問題)
6. [技術支援](#技術支援)

---

## 系統概述

易潔寶企業網站採用現代化的 React + TypeScript 技術棧，配合 Tailwind CSS 進行樣式設計。整個系統分為前端展示層和內容管理層，您可以通過編輯資料檔案來管理網站內容，無需編寫程式碼。

### 核心技術

| 技術 | 版本 | 用途 |
|------|------|------|
| React | 19 | 前端框架 |
| TypeScript | 5.x | 型別安全 |
| Tailwind CSS | 4 | 樣式系統 |
| Vite | 7.x | 構建工具 |
| Node.js | 22.x | 執行環境 |

### 專案結構

```
yijiebao-website/
├── client/
│   ├── src/
│   │   ├── pages/           # 頁面組件
│   │   ├── components/      # 可重用組件
│   │   ├── data/            # 內容資料檔案（重要！）
│   │   │   ├── projects.ts  # 工程實績資料
│   │   │   ├── products.ts  # 產品型錄資料
│   │   │   └── cms-config.ts # CMS 配置
│   │   ├── App.tsx          # 主應用
│   │   └── index.css        # 全域樣式
│   └── public/              # 靜態資源
├── MAINTENANCE_GUIDE.md     # 本文件
└── package.json             # 專案配置
```

---

## 內容管理

### 基本概念

所有網站內容都儲存在 `client/src/data/` 目錄下的 TypeScript 檔案中。您可以直接編輯這些檔案來更新網站內容，無需重新編譯或部署。

### 編輯工作流程

1. **開啟檔案** - 使用任何文字編輯器（VS Code、Sublime Text 等）
2. **修改資料** - 按照格式要求編輯內容
3. **儲存檔案** - 系統會自動偵測變更
4. **預覽更新** - 在瀏覽器中重新整理頁面查看更新

### 公司基本資訊編輯

編輯檔案：`client/src/data/cms-config.ts`

```typescript
export const defaultCMSSettings: CMSSettings = {
  siteName: "易潔寶",                    // 網站名稱
  siteDescription: "...",                // 網站描述
  companyName: "易潔寶",                 // 公司名稱（中文）
  companyEnglishName: "178mat",          // 公司名稱（英文）
  foundedYear: 2002,                     // 成立年份
  contactEmail: "info@178mat.com",       // 聯絡信箱
  contactPhone: "+886-2-XXXX-XXXX",      // 聯絡電話
  address: "台灣台北市...",              // 公司地址
  serviceArea: [                         // 服務地區
    "台北", "新北", "桃園", ...
  ],
  socialMedia: {                         // 社群媒體
    facebook: "https://facebook.com/...",
    line: "https://line.me/...",
    instagram: "https://instagram.com/...",
  },
};
```

---

## 工程實績管理

### 檔案位置

`client/src/data/projects.ts`

### 資料結構

每個工程實績包含以下資訊：

```typescript
{
  id: "unique-id",                    // 唯一識別碼（英文+數字，無空格）
  title: "台中大里區大型造鎮案",       // 案例名稱
  location: "台中市大里區健民路3號",   // 詳細地址
  city: "台中",                        // 城市（用於篩選）
  district: "大里區",                  // 行政區
  year: 2025,                          // 完工年份
  images: [                            // 案例圖片 URL
    "/images/project-1.jpg",
    "/images/project-2.jpg"
  ],
  description: "詳細描述...",          // 案例描述
  tags: {                              // 標籤（用於篩選）
    buildingType: ["住宅大廈"],
    floorMaterial: ["抿石子"],
    installationType: ["嵌入式"],
    framingType: ["AL-620"],
    surfaceMaterial: ["波羅紋毯面"],
    drainageType: ["導水溝"],
    designFeature: ["風除室-滿鋪"],
    location: ["風除室"]
  },
  specs: {                             // 規格資訊
    area: "15平方公尺",
    depth: "2cm",
    width: "150cm",
    length: "1000cm"
  }
}
```

### 新增工程實績步驟

1. **開啟 `projects.ts` 檔案**

2. **複製現有案例的結構**

3. **填入新案例資訊**

```typescript
{
  id: "taichung-new-project-2025",
  title: "新案例名稱",
  location: "詳細地址",
  city: "城市名稱",
  district: "行政區",
  year: 2025,
  images: [
    "/images/new-project-1.jpg",
    "/images/new-project-2.jpg"
  ],
  description: "案例描述...",
  tags: {
    buildingType: ["選擇適當的建物類型"],
    // ... 其他標籤
  },
  specs: {
    area: "面積",
    // ... 其他規格
  }
}
```

4. **確保格式正確** - 檢查括號、逗號、引號

5. **儲存檔案** - 瀏覽器會自動更新

### 可用標籤選項

#### 建物類型
- 住宅大廈
- 公共建築
- 學校
- 廠辦
- 教會
- 旅館
- 百貨公司
- 醫院
- 餐廳
- 辦公大樓

#### 地面材質
- 地磚（硬底施工）
- 抿石子
- 石材
- 磁磚
- 水泥

#### 安裝方式
- 嵌入式
- 表面式
- 平鋪式2cm
- 平鋪式5cm

#### 收邊框類型
- 1字型扁鋁
- AL-620
- 不鏽鋼框
- 平鋪立地5cm斜鋁框
- 無收邊框

#### 面料類型
- 波羅紋毯面
- 波羅紋毯面多色搭配
- 波羅紋毯面棕色
- 波羅紋毯面灰色
- 波羅紋毯面紅色
- 波羅紋毯面黑色
- 直條紋毯面
- 止滑膠條
- 止滑膠條＋毛刷條
- 橡膠止滑條
- 毛刷條

#### 排水設計
- 導水溝
- 預埋排水管
- 加深高架
- 無排水設計

#### 設計特點
- 地鉸鏈
- 隱藏式地鉸鏈
- 天地閂防塵套
- 大門內側
- 大門外側
- 大門內＋外
- 風除室-滿鋪
- 風除室-中間通道
- 風除室-退縮收邊
- 截水設計
- 廚房防滑
- 頂樓RF

### 編輯現有案例

1. 在 `projects.ts` 中找到要編輯的案例（按 `id` 搜尋）
2. 修改相應欄位
3. 儲存檔案

### 刪除案例

1. 在 `projects.ts` 中找到要刪除的案例
2. 刪除整個物件（包括逗號）
3. 儲存檔案

---

## 產品型錄管理

### 檔案位置

`client/src/data/products.ts`

### 資料結構

```typescript
{
  id: "product-id",                   // 唯一識別碼
  name: "產品名稱",                    // 產品名稱
  category: "嵌入式地墊",              // 分類
  description: "產品描述...",          // 詳細描述
  image: "/images/product-1.jpg",      // 產品圖片
  specifications: [                    // 規格
    { name: "寬度", value: "150cm" },
    { name: "深度", value: "2cm" }
  ],
  materials: ["鋁合金", "波羅紋毯面"], // 材料
  colors: ["黑色", "灰色", "棕色"],    // 顏色選項
  price: "依規格報價",                 // 價格
  features: [                          // 特色功能
    "易清潔",
    "防滑",
    "耐用"
  ],
  dwgFile: "/files/product.dwg",       // DWG 圖檔（可選）
  relatedProjects: [                   // 相關案例 ID
    "taichung-dali-residential"
  ]
}
```

### 新增產品步驟

1. **開啟 `products.ts` 檔案**

2. **複製現有產品的結構**

3. **填入產品資訊**

4. **確保格式正確**

5. **儲存檔案**

### 產品分類

- 嵌入式地墊
- 表面式地墊
- 排水式地墊
- 坑槽式地墊
- 配件
- 3M地墊

---

## 常見問題

### Q1: 我編輯了檔案，但網站沒有更新

**A:** 請嘗試以下步驟：

1. 確保檔案已儲存
2. 在瀏覽器中按 `Ctrl+F5` 進行硬重新整理
3. 檢查瀏覽器控制台是否有錯誤訊息（按 F12 開啟）
4. 如果仍未更新，請檢查 JSON 格式是否正確

### Q2: 我不小心刪除了重要資料

**A:** 

1. 使用版本控制系統恢復（如果已設定）
2. 或者聯絡技術支援人員恢復備份

### Q3: 如何新增圖片？

**A:** 

1. 將圖片檔案放在 `client/public/images/` 目錄
2. 在資料檔案中使用相對路徑引用：`/images/filename.jpg`
3. 建議圖片尺寸：
   - 工程實績：1920×1080px 或更大
   - 產品圖片：1200×800px 或更大

### Q4: 如何修改網站顏色？

**A:** 編輯 `client/src/index.css` 中的色彩變數：

```css
:root {
  --primary: oklch(0.52 0.20 25);      /* 主色 */
  --secondary: oklch(0.65 0.12 60);    /* 次要色 */
  --accent: oklch(0.70 0.15 60);       /* 強調色 */
}
```

### Q5: 如何新增頁面？

**A:** 這需要開發人員協助。請聯絡技術支援。

---

## 技術支援

### 檔案格式驗證

編輯前，請確保您的編輯器支援 TypeScript 語法高亮。推薦使用：

- **Visual Studio Code** （免費）
- **Sublime Text** （付費）
- **WebStorm** （付費）

### 常見錯誤

#### 錯誤：`Unexpected token`

**原因：** JSON 格式錯誤（通常是缺少逗號或引號）

**解決：** 檢查：
- 所有字串都用雙引號包圍
- 物件之間有逗號
- 最後一個元素後面沒有逗號

#### 錯誤：`Property does not exist`

**原因：** 欄位名稱拼寫錯誤

**解決：** 檢查欄位名稱是否與範例完全相同

### 備份建議

定期備份重要資料：

1. 將 `client/src/data/` 目錄複製到安全位置
2. 使用版本控制系統（Git）追蹤變更
3. 定期導出資料為 JSON 格式

### 聯絡開發團隊

如需技術協助，請提供：

1. 錯誤訊息的完整內容
2. 您編輯的檔案名稱
3. 您所做的具體修改
4. 瀏覽器控制台的錯誤日誌（F12 → Console）

---

## 更新日誌

| 日期 | 版本 | 更新內容 |
|------|------|---------|
| 2025-01-14 | 1.0 | 初始版本發佈 |

---

**最後更新：2025 年 1 月 14 日**

**維護人員：易潔寶技術團隊**
