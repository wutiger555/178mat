# YouTube 影片 ID 更新指南

本指南說明如何從易潔寶 YouTube 頻道提取影片 ID，並將其整合到網站中。

## 什麼是 YouTube 影片 ID？

YouTube 影片 ID 是每個影片的唯一識別碼，長度為 11 個字符，由字母、數字和下劃線組成。

**例子：** `dDw47aMuScw`

## 如何獲取 YouTube 影片 ID

### 方法 1：從 YouTube 影片 URL 提取（最簡單）

1. **打開易潔寶 YouTube 頻道**：https://www.youtube.com/@178mat/videos

2. **點擊任何影片進入影片頁面**

3. **查看瀏覽器地址欄**，URL 格式為：
   ```
   https://www.youtube.com/watch?v=VIDEO_ID
   ```

4. **複製 `v=` 後面的部分**，那就是影片 ID

   **例子：**
   - URL: `https://www.youtube.com/watch?v=dDw47aMuScw`
   - 影片 ID: `dDw47aMuScw`

### 方法 2：從短連結提取

1. **在 YouTube 影片頁面點擊「分享」按鈕**

2. **選擇「複製」短連結**，格式為：
   ```
   https://youtu.be/VIDEO_ID
   ```

3. **複製 `youtu.be/` 後面的部分**，那就是影片 ID

## 如何更新網站中的 YouTube 影片 ID

### 步驟 1：找到工程實績資料檔案

打開以下檔案：
```
client/src/data/projects.ts
```

### 步驟 2：找到要更新的工程實績案例

搜尋案例 ID，例如搜尋 `taichung-dali-residential-2025`：

```typescript
{
  id: "taichung-dali-residential-2025",
  title: "台中市大里區大型造鎮案",
  // ... 其他資訊
  youtubeVideoIds: ["gH4iJ5kL6mN"],  // ← 這裡是影片 ID
  // ...
}
```

### 步驟 3：替換影片 ID

將 `youtubeVideoIds` 陣列中的 ID 替換為真實的 YouTube 影片 ID：

```typescript
// 修改前
youtubeVideoIds: ["gH4iJ5kL6mN"],

// 修改後（使用真實的 YouTube 影片 ID）
youtubeVideoIds: ["dDw47aMuScw"],
```

### 步驟 4：保存檔案

保存 `projects.ts` 檔案。網站會自動重新加載並顯示新的影片。

## 為工程實績案例添加多個影片

如果一個工程實績案例有多個相關的 YouTube 影片，可以在陣列中添加多個 ID：

```typescript
youtubeVideoIds: ["dDw47aMuScw", "kL9pM2xQ8vE", "xY1zAb2cD3eF"],
```

網站會在工程實績詳細頁面顯示所有相關的影片。

## YouTube 影片 ID 資料庫

以下是易潔寶 YouTube 頻道中的部分影片及其 ID（需要手動更新）：

| 影片標題 | 影片 ID | 觀看次數 | 備註 |
|---------|--------|--------|------|
| （待補充） | （待補充） | （待補充） | 請從 YouTube 頻道提取 |

## 常見問題

### Q1：影片 ID 更新後沒有顯示？
**A：** 請確保：
1. 影片 ID 長度為 11 個字符
2. 檔案已保存
3. 瀏覽器快取已清除（按 Ctrl+Shift+Delete 清除快取）

### Q2：影片無法播放？
**A：** 可能原因：
1. 影片 ID 不正確 - 請重新檢查 YouTube URL
2. 影片已被刪除或設為私密 - 請檢查 YouTube 頻道
3. YouTube 限制了嵌入 - 某些影片可能不允許嵌入，請檢查影片設定

### Q3：如何找到特定主題的影片？
**A：** 訪問易潔寶 YouTube 頻道，使用搜尋功能或按播放清單篩選。

## 技術細節

### 影片 ID 儲存位置

影片 ID 儲存在以下位置：

1. **工程實績資料** (`client/src/data/projects.ts`)
   - 每個工程實績案例可以有 `youtubeVideoIds` 欄位
   - 格式：字符串陣列 `string[]`

2. **YouTube 影片資料庫** (`client/src/data/youtube-videos.ts`)
   - 儲存所有 YouTube 影片的完整資訊
   - 包括影片 ID、標題、描述、觀看次數、時長等

### 影片顯示邏輯

- **工程實績詳細頁面**：顯示該案例對應的 YouTube 影片
- **首頁**：可選擇顯示最新或精選影片
- **產品頁面**：可顯示產品相關的教學影片（待實現）

## 下一步

1. **收集真實的 YouTube 影片 ID** - 從易潔寶 YouTube 頻道逐個提取
2. **更新 projects.ts** - 將真實 ID 替換到各工程實績案例
3. **測試影片播放** - 確保所有影片都能正確顯示和播放
4. **擴展影片庫** - 為更多案例和產品添加影片

## 聯絡支援

如有任何問題，請參考：
- 專案 README.md - 整體專案說明
- MAINTENANCE_GUIDE.md - 維護指南
- 易潔寶 YouTube 頻道 - https://www.youtube.com/@178mat/videos
