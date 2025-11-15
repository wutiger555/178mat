# YouTube 影片 ID 更新指南

## 問題

目前 `src/data/youtube-videos.ts` 中的影片 ID 都是假的（隨機生成的測試 ID）。需要從您的 YouTube 官方頻道獲取真實的影片 ID。

## YouTube 官方頻道

https://www.youtube.com/@178mat/videos

## 如何獲取影片 ID

### 方法 1: 從影片網址提取

1. 打開 YouTube 頻道：https://www.youtube.com/@178mat/videos
2. 點擊任一影片
3. 從瀏覽器網址列複製影片 ID

範例：
```
網址：https://www.youtube.com/watch?v=ABC123xyz
影片 ID：ABC123xyz
```

### 方法 2: 從分享連結提取

1. 點擊影片下方的「分享」按鈕
2. 複製短網址
3. 提取 ID

範例：
```
短網址：https://youtu.be/ABC123xyz
影片 ID：ABC123xyz
```

## 需要更新的影片

請提供以下類型影片的真實 ID：

### 1. 施工教學影片 (Tutorial)

目前假 ID → 需要真實 ID：

- `dDw47aMuScw` - 嵌入式刮泥墊施工
- `kL9pM2xQ8vE` - 收邊框安裝
- `nR5xL3yZ9aB` - 風除室施工
- `pQ7rS8tU9vW` - 3M地墊換毯服務
- `xY1zAb2cD3eF` - 排水式地墊安裝

### 2. 工程實績影片 (Project)

目前假 ID → 需要真實 ID：

- `gH4iJ5kL6mN` - 台中大里區造鎮案
- `oP8qR9sT0uV` - 玉山塔塔加遊客中心

### 3. 品牌介紹影片 (Product)

目前假 ID → 需要真實 ID：

- `wX2yZ3aB4cD` - 易潔寶品牌介紹

## 更新格式

請提供以下格式的資訊：

```javascript
{
  id: '真實的YouTube影片ID',
  title: '影片標題',
  description: '簡短描述',
  duration: '影片時長（如：2:43）',
  uploadDate: '上傳日期（YYYY-MM-DD）',
  views: 觀看次數（數字）,
  type: 'tutorial' | 'project' | 'product',
}
```

## 快速更新方法

如果您能提供頻道中所有影片的列表，我可以：

1. 自動更新 `src/data/youtube-videos.ts`
2. 根據影片內容自動分類
3. 在適當的頁面展示對應影片

## 範例

```javascript
// 真實影片範例
{
  id: 'dQw4w9WgXcQ',  // ← 這個需要是真實的
  title: '嵌入式刮泥墊完整施工流程',
  description: '展示從測量、開挖到安裝完成的完整流程',
  duration: '3:25',
  uploadDate: '2024-10-15',
  views: 1250,
  type: 'tutorial',
  relatedProducts: ['embedded-mat'],
}
```

## 下一步

請提供您 YouTube 頻道中的影片資訊，我會立即更新系統中的影片 ID，確保所有影片都能正確顯示。

您可以：
1. 直接告訴我影片 ID 和基本資訊
2. 或者給我頻道中影片的完整列表
3. 或者截圖影片列表，我可以從中提取資訊
