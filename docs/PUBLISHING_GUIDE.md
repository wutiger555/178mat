# 發布網站更新指南

## 📖 概述

這個指南說明如何將管理後台的修改發布到 GitHub Pages 網站。

## 🔄 工作流程

### 資料流向

```
本地編輯（瀏覽器 localStorage）
  ↓
匯出為 JSON 檔案
  ↓
放到 public/data/ 目錄
  ↓
Git 提交 + 推送
  ↓
GitHub Actions 自動部署
  ↓
網站更新完成 ✅
```

## 📝 詳細步驟

### 1. 在管理後台編輯內容

訪問本地開發環境的管理後台：
```
http://localhost:3000/178mat/admin
```

可以管理：
- 工程實績
- 產品型錄
- YouTube 影片
- 台灣地圖數據
- 導航選單設定

### 2. 匯出所有資料

1. 回到管理後台首頁（Dashboard）
2. 找到「發布更新到網站」區塊
3. 點擊「匯出所有資料」按鈕
4. 會自動下載兩個檔案：
   - `cms-data.json` - 包含工程、產品、YouTube、地圖資料
   - `website-settings.json` - 包含導航選單設定

### 3. 替換專案檔案

將下載的檔案放到專案目錄：
```bash
# 移動下載的檔案到專案
mv ~/Downloads/cms-data.json ./public/data/
mv ~/Downloads/website-settings.json ./public/data/
```

或手動複製：
1. 打開專案的 `public/data/` 目錄
2. 將下載的檔案拖放進去（取代舊檔案）

### 4. 提交到 GitHub

```bash
# 1. 確認變更
git status

# 2. 添加檔案
git add public/data/cms-data.json public/data/website-settings.json

# 3. 提交
git commit -m "更新網站內容"

# 4. 推送到 GitHub
git push
```

### 5. 等待部署

- GitHub Actions 會自動開始部署（約 2-3 分鐘）
- 可以在 GitHub 倉庫的「Actions」頁籤查看進度
- 部署完成後，網站會自動更新

### 6. 驗證更新

訪問線上網站檢查更新是否成功：
```
https://你的用戶名.github.io/178mat/
```

## 💡 重要提示

### 資料優先順序

系統會按以下順序讀取資料：

1. **LocalStorage**（編輯模式）- 最優先
   - 用於管理後台編輯時
   - 只存在於你的電腦瀏覽器中

2. **JSON 檔案**（已發布）- 次優先
   - 用於網站正式顯示
   - 存在於 `public/data/` 目錄
   - 會被 Git 追蹤並部署

3. **原始程式碼** - 最低優先
   - 只在初始化時使用
   - 定義在 `src/data/` 目錄

### 安全性

- ✅ 管理後台（/admin）只在開發模式可訪問
- ✅ 線上網站不會顯示管理後台
- ✅ 資料檔案是靜態 JSON，無法直接修改

### 備份建議

- 定期備份 `cms-data.json` 和 `website-settings.json`
- 保存在安全的地方（雲端硬碟、外接硬碟等）
- 建議每次重大更新前都先備份

## 🐛 常見問題

### Q: 我編輯了內容但網站沒更新？
A: 檢查是否完成以下步驟：
1. 有匯出檔案？
2. 檔案有放到 `public/data/` 目錄？
3. 有 git commit 和 push？
4. GitHub Actions 部署成功？

### Q: 如何復原到之前的版本？
A: 使用 Git 歷史記錄：
```bash
git log -- public/data/  # 查看歷史
git checkout <commit-hash> -- public/data/cms-data.json
git commit -m "復原到之前的版本"
git push
```

### Q: 可以在線上直接編輯嗎？
A: 不行。線上網站是靜態的，必須在本地編輯並推送更新。

### Q: 多人協作怎麼辦？
A:
1. 確保編輯前先 `git pull` 獲取最新版本
2. 編輯完成後立即匯出並提交
3. 如果有衝突，手動合併 JSON 檔案

## 📚 相關文檔

- [管理後台使用指南](./ADMIN_PANEL_GUIDE.md)
- [快速開始](./ADMIN_QUICK_START.md)
- [編輯教學](./ADMIN_EDIT_TUTORIAL.md)

## 🆘 需要幫助？

如果遇到問題：
1. 檢查瀏覽器控制台的錯誤訊息
2. 確認檔案格式正確（有效的 JSON）
3. 查看 GitHub Actions 的錯誤日誌
4. 聯繫技術支援
