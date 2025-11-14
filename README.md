# 易潔寶企業形象網站

**易潔寶（178mat）** - 台灣專業除泥地墊專家 | 服務全台灣 | SINCE 2002

## 📋 專案概述

易潔寶企業形象網站是一個現代化、專業的企業展示平台，專為展示除泥地墊產品、工程實績和服務而設計。網站採用響應式設計，支援桌面、平板和手機瀏覽，並整合 YouTube 內容展示、台灣地圖視覺化等互動功能。

### 核心特性

- ✅ **現代專業設計** - 基於 LOGO 配色的設計系統，提升品牌認知度
- ✅ **工程實績展示** - 16+ 個工程案例，支援多維度篩選（城市、建物類型、面料等）
- ✅ **台灣地圖視覺化** - 使用 Leaflet 展示全台服務範圍，各縣市工程實績分佈
- ✅ **YouTube 整合** - 在工程實績詳細頁面展示相關施工教學和案例影片
- ✅ **響應式設計** - 完全支援各種裝置和螢幕尺寸
- ✅ **內容管理系統** - 簡單易用的資料結構，支援無代碼編輯

## 🏗️ 專案架構

### 技術棧

| 技術 | 版本 | 用途 |
|------|------|------|
| React | 19 | UI 框架 |
| TypeScript | 最新 | 型別安全 |
| Tailwind CSS | 4 | 樣式系統 |
| Vite | 最新 | 打包工具 |
| Wouter | 最新 | 路由管理 |
| Framer Motion | 最新 | 動畫效果 |
| Leaflet | 最新 | 地圖展示 |
| shadcn/ui | 最新 | UI 組件庫 |

### 目錄結構

```
yijiebao-website/
├── client/
│   ├── public/                    # 靜態資源
│   │   ├── data/                  # 地圖資料
│   │   └── images/                # 圖片資源
│   ├── src/
│   │   ├── components/            # React 組件
│   │   │   ├── Navbar.tsx         # 導航列
│   │   │   ├── Footer.tsx         # 頁尾
│   │   │   ├── YouTubePlayer.tsx  # YouTube 播放器
│   │   │   ├── TaiwanMapChoropleth.tsx  # 台灣地圖
│   │   │   └── ...
│   │   ├── pages/                 # 頁面組件
│   │   │   ├── Home.tsx           # 首頁
│   │   │   ├── About.tsx          # 關於我們
│   │   │   ├── Services.tsx       # 服務介紹
│   │   │   ├── Projects.tsx       # 工程實績列表
│   │   │   ├── ProjectDetail.tsx  # 工程實績詳細
│   │   │   ├── Products.tsx       # 產品型錄
│   │   │   └── Contact.tsx        # 聯絡我們
│   │   ├── data/                  # 資料檔案
│   │   │   ├── projects.ts        # 工程實績資料
│   │   │   ├── products.ts        # 產品資料
│   │   │   └── youtube-videos.ts  # YouTube 影片資料
│   │   ├── App.tsx                # 主應用組件
│   │   ├── main.tsx               # 應用入口
│   │   └── index.css              # 全域樣式
│   └── index.html                 # HTML 模板
├── README.md                      # 本檔案
├── MAINTENANCE_GUIDE.md           # 維護指南
├── YOUTUBE_ID_UPDATE_GUIDE.md     # YouTube ID 更新指南
├── QUICK_START.md                 # 快速開始指南
└── package.json                   # 依賴配置
```

## 📄 頁面說明

### 1. 首頁 (`Home.tsx`)

**內容：**
- Hero 區塊 - 品牌標語與主視覺
- 台灣服務範圍地圖 - 視覺化展示全台工程實績分佈
- 核心服務介紹 - 5 大服務特色
- 施工流程說明 - 4 步驟視覺化流程
- 統計數據展示 - 成立年份、服務案例數等
- 工程實績精選 - 最新 3 個案例預覽
- 客戶推薦區塊（待實現）
- CTA 行動呼籲 - 引導訪客聯絡或瀏覽更多

**關鍵組件：**
- `TaiwanMapChoropleth` - 台灣地圖視覺化
- `Framer Motion` - 平滑動畫效果

### 2. 關於我們 (`About.tsx`)

**內容：**
- 公司簡介 - 易潔寶品牌故事
- 發展歷程 - SINCE 2002 的專業經驗
- 服務理念 - 品質、專業、創新
- 認證與獎項（待補充）
- 團隊介紹（待實現）

### 3. 服務介紹 (`Services.tsx`)

**內容：**
- 4 大地墊類型介紹
  - 嵌入式刮泥墊
  - 表面式地墊
  - 排水式地墊
  - 坑槽式地墊
- 施工服務說明
- 3M 地墊供應服務
- 舊毯換新服務
- 特殊設計服務（異形切割、導水溝等）

### 4. 工程實績 (`Projects.tsx`)

**內容：**
- 工程實績列表 - 網格布局展示
- 多維度篩選系統
  - 按城市篩選
  - 按建物類型篩選
  - 按面料篩選
  - 按年份篩選
- 搜尋功能
- 標籤雲展示 - 視覺化標籤統計
- 分頁載入（待優化）

**資料結構：**
```typescript
interface Project {
  id: string;                    // 唯一識別碼
  title: string;                 // 案例名稱
  location: string;              // 詳細地址
  city: string;                  // 城市
  district: string;              // 行政區
  year: number;                  // 完工年份
  images: string[];              // 案例照片
  description: string;           // 案例描述
  youtubeVideoIds?: string[];    // 相關 YouTube 影片 ID
  tags: {                        // 標籤分類
    buildingType: string[];      // 建物類型
    floorMaterial: string[];     // 地板材質
    installationType: string[];  // 安裝方式
    framingType: string[];       // 收邊框類型
    surfaceMaterial: string[];   // 表面材料
    drainageType: string[];      // 排水方式
    designFeature: string[];     // 設計特色
    location: string[];          // 安裝位置
  };
  specs: {                       // 規格資訊
    area?: string;               // 面積
    depth?: string;              // 深度
    width?: string;              // 寬度
    length?: string;             // 長度
  };
}
```

### 5. 工程實績詳細 (`ProjectDetail.tsx`)

**內容：**
- 案例大圖展示
- 詳細資訊
  - 位置、年份、建物類型等
  - 完整規格資訊
  - 詳細描述
- 相關 YouTube 影片展示
- 相似案例推薦
- 聯絡 CTA

### 6. 產品型錄 (`Products.tsx`)

**內容：**
- 產品分類展示
- 面料選項
- 收邊框類型
- 產品規格說明
- DWG 圖檔下載（待實現）

### 7. 聯絡我們 (`Contact.tsx`)

**內容：**
- 聯絡表單
- 公司資訊展示
- 多種聯絡方式
  - 電話
  - 傳真
  - LINE
  - 地址
- Google Maps 地圖整合

## 📊 資料管理

### 工程實績資料 (`client/src/data/projects.ts`)

包含 16 個工程實績案例，涵蓋：
- **台北** - 5 個案例（住宅、廠辦、商辦）
- **新北** - 2 個案例
- **台中** - 2 個案例
- **南投** - 1 個案例
- **台南** - 1 個案例
- **彰化** - 1 個案例
- **高雄** - 2 個案例
- **其他** - 2 個案例

### YouTube 影片資料 (`client/src/data/youtube-videos.ts`)

儲存 YouTube 影片資訊，包括：
- 影片 ID
- 標題
- 描述
- 觀看次數
- 時長
- 發佈日期

### 產品資料 (`client/src/data/products.ts`)

包含產品分類、規格、面料選項等資訊。

## 🎨 設計系統

### 色彩系統

基於易潔寶 LOGO 配色：

| 顏色 | 用途 | 值 |
|------|------|-----|
| 主色 | 品牌紅 | `#B8382D` |
| 副色 | 金色 | `#D4AF37` |
| 背景 | 淺灰 | `#F5F5F5` |
| 文字 | 深灰 | `#333333` |

### 字體

- **中文**：Noto Sans TC
- **英文**：Inter
- **等寬**：JetBrains Mono

### 響應式斷點

- **手機**：< 640px
- **平板**：640px - 1024px
- **桌面**：> 1024px

## 🚀 快速開始

### 本地開發

```bash
# 1. 進入專案目錄
cd yijiebao-website

# 2. 安裝依賴
pnpm install

# 3. 啟動開發伺服器
pnpm dev

# 4. 打開瀏覽器訪問
# http://localhost:3000
```

### 構建生產版本

```bash
# 構建靜態檔案
pnpm build

# 預覽生產版本
pnpm preview
```

## 📝 維護指南

### 添加新的工程實績

1. 打開 `client/src/data/projects.ts`
2. 在 `projects` 陣列末尾添加新案例
3. 填寫所有必要欄位（id、title、location、city 等）
4. 保存檔案，網站自動更新

**範例：**
```typescript
{
  id: "new-project-2025",
  title: "新工程案例",
  location: "台北市中山區...",
  city: "台北",
  district: "中山區",
  year: 2025,
  images: ["/images/project-1.jpg"],
  description: "案例描述...",
  youtubeVideoIds: ["VIDEO_ID"],  // 可選
  tags: {
    buildingType: ["住宅大廈"],
    // ... 其他標籤
  },
  specs: {
    area: "20平方公尺",
    // ... 其他規格
  },
}
```

### 更新 YouTube 影片 ID

詳見 `YOUTUBE_ID_UPDATE_GUIDE.md`

### 修改頁面內容

1. 打開對應的頁面檔案（`client/src/pages/*.tsx`）
2. 編輯文字、圖片或組件
3. 保存檔案，開發伺服器自動重新加載

### 更新導航菜單

編輯 `client/src/components/Navbar.tsx` 中的菜單項目

### 修改樣式

全域樣式在 `client/src/index.css` 中定義。使用 Tailwind CSS 類名進行樣式調整。

## 🔧 常見維護任務

| 任務 | 位置 | 說明 |
|------|------|------|
| 添加工程實績 | `projects.ts` | 在陣列中添加新物件 |
| 更新 YouTube ID | `projects.ts` | 修改 `youtubeVideoIds` 欄位 |
| 修改首頁內容 | `pages/Home.tsx` | 編輯 React 組件 |
| 更新聯絡資訊 | `pages/Contact.tsx` | 修改電話、地址等 |
| 修改導航菜單 | `components/Navbar.tsx` | 編輯菜單項目 |
| 添加新頁面 | `pages/` | 建立新 `.tsx` 檔案並在 `App.tsx` 中添加路由 |

## 📱 響應式設計

網站已完全優化以支援各種裝置：

- **手機** (< 640px)：單欄布局，觸摸友好
- **平板** (640px - 1024px)：雙欄布局
- **桌面** (> 1024px)：多欄布局，充分利用螢幕空間

## ♿ 無障礙性

網站遵循 WCAG 2.1 標準：

- 語義化 HTML 結構
- 適當的色彩對比度
- 鍵盤導航支援
- 螢幕閱讀器相容

## 📊 網站統計

### 當前內容量

| 項目 | 數量 |
|------|------|
| 工程實績案例 | 16 個 |
| 頁面 | 7 個 |
| YouTube 影片 | 8 個（待更新為真實 ID） |
| 產品類型 | 4 個 |
| 服務項目 | 6 個 |

### 覆蓋地區

- **台北** - 5 個案例
- **新北** - 2 個案例
- **台中** - 2 個案例
- **南投** - 1 個案例
- **台南** - 1 個案例
- **彰化** - 1 個案例
- **高雄** - 2 個案例
- **其他** - 2 個案例

## 🔐 安全性

- 所有外部連結使用 HTTPS
- 無敏感資訊儲存在前端
- 定期更新依賴以修補安全漏洞

## 📈 性能優化

- 圖片自動優化和懶加載
- 代碼分割和動態導入
- CSS 和 JavaScript 最小化
- 快取策略優化

## 🐛 已知問題與待做事項

### 已知問題

1. **YouTube 影片 ID** - 目前使用示意 ID，需要更新為真實 YouTube 影片 ID
2. **產品頁面** - 尚未完全實現，需要補充產品圖片和規格

### 待實現功能

- [ ] 客戶推薦區塊
- [ ] 產品頁面完整實現
- [ ] 線上詢價系統
- [ ] 多語言支援（英文、日文）
- [ ] 部落格整合
- [ ] 搜尋引擎最佳化 (SEO) 進階優化
- [ ] 分析追蹤（Google Analytics）

## 📞 聯絡資訊

**易潔寶 (178mat)**

- 📍 地址：台灣台北市
- 📞 電話：（待補充）
- 📧 郵件：（待補充）
- 🌐 官網：https://www.178mat.com/
- 📺 YouTube：https://www.youtube.com/@178mat/videos
- 💬 LINE：（待補充）

## 📚 相關文檔

- `QUICK_START.md` - 快速開始指南
- `MAINTENANCE_GUIDE.md` - 詳細維護指南
- `YOUTUBE_ID_UPDATE_GUIDE.md` - YouTube ID 更新指南
- `CONTRIBUTING.md` - 貢獻指南（待建立）

## 📄 授權

本專案由易潔寶委託開發，版權所有。

---

**最後更新**：2025 年 1 月

**版本**：1.0.0

**維護者**：易潔寶開發團隊
