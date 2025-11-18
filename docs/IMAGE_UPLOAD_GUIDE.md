# 📸 圖片上傳與管理指南

> 由於這是靜態網站，圖片需要手動放入專案資料夾

---

## 🎯 圖片管理方式

### 方法 1：使用圖片選擇器（推薦）✨

管理後台已內建圖片選擇器，讓你輕鬆選擇圖片！

#### 使用步驟：

1. **將圖片放入專案資料夾**
   ```
   178mat/
   └── public/
       └── images/
           ├── projects/    # 工程圖片
           ├── products/    # 產品圖片
           └── others/      # 其他圖片
   ```

2. **在編輯表單中點擊「選擇圖片」按鈕**
   - 會彈出圖片選擇器
   - 顯示所有可用圖片的預覽
   - 點擊選擇即可

3. **或直接輸入路徑**
   - 也可以手動輸入圖片路徑
   - 格式：`/images/xxx.jpg`

---

## 📁 圖片資料夾結構

建議的資料夾結構：

```
public/images/
├── projects/          # 工程實績圖片
│   ├── project-1.jpg
│   ├── project-2.jpg
│   └── ...
│
├── products/          # 產品圖片
│   ├── carpet-gray.jpg
│   ├── mat-black.jpg
│   └── ...
│
├── logos/             # 標誌和圖示
│   ├── logo.png
│   └── logo-nav.png
│
└── others/            # 其他圖片
    └── ...
```

---

## 🔧 圖片上傳步驟

### 步驟 1：準備圖片

1. **壓縮圖片**（重要！）
   - 使用 [TinyPNG](https://tinypng.com/) 或其他工具
   - 建議大小：< 500KB
   - 建議尺寸：
     - 工程圖片：1200x800px
     - 產品圖片：800x600px

2. **命名圖片**
   - 使用有意義的英文名稱
   - 小寫字母，用連字號分隔
   - 範例：
     - `taipei-building-2024.jpg` ✅
     - `IMG_1234.jpg` ❌

### 步驟 2：放入資料夾

#### 方法 A：使用檔案管理器（Windows/Mac）

1. 開啟專案資料夾 `178mat`
2. 進入 `public/images/`
3. 根據類型放入對應資料夾：
   - 工程圖片 → `projects/`
   - 產品圖片 → `products/`
4. 直接拖曳或複製貼上

#### 方法 B：使用命令列

```bash
# 進入專案目錄
cd 178mat

# 複製圖片到 projects 資料夾
cp ~/Downloads/my-image.jpg public/images/projects/

# 或直接移動
mv ~/Downloads/my-image.jpg public/images/projects/taipei-building.jpg
```

### 步驟 3：在管理後台使用

1. 重新整理瀏覽器（確保看到新圖片）
2. 進入編輯表單
3. 點擊「選擇圖片」按鈕
4. 從圖片選擇器中選擇
5. 或手動輸入路徑：`/images/projects/taipei-building.jpg`

---

## 💡 進階技巧

### 批次上傳圖片

```bash
# 一次複製多個圖片
cp ~/Downloads/*.jpg public/images/projects/

# 重新命名並複製
for f in ~/Downloads/*.jpg; do
  cp "$f" "public/images/projects/project-$(date +%s).jpg"
done
```

### 檢查圖片大小

```bash
# 列出圖片檔案大小
ls -lh public/images/projects/

# 找出大於 500KB 的圖片
find public/images -size +500k -name "*.jpg"
```

### 壓縮圖片（命令列）

使用 ImageMagick 工具：

```bash
# 安裝 ImageMagick
# Mac: brew install imagemagick
# Ubuntu: sudo apt-get install imagemagick

# 壓縮單個圖片
convert input.jpg -quality 85 -resize 1200x800 output.jpg

# 批次壓縮
for f in *.jpg; do
  convert "$f" -quality 85 "${f%.jpg}-compressed.jpg"
done
```

---

## 📋 圖片路徑規則

### 正確的路徑格式

```
✅ 正確
/images/projects/taipei-building.jpg
/images/products/carpet-gray.jpg
/images/logo.png

❌ 錯誤
images/taipei-building.jpg      # 缺少開頭的 /
./images/taipei-building.jpg    # 不要使用 ./
../images/taipei-building.jpg   # 不要使用 ../
C:/Users/.../image.jpg          # 不要使用絕對路徑
```

### 路徑說明

- 必須以 `/` 開頭
- 相對於 `public/` 目錄
- `public/images/xxx.jpg` → `/images/xxx.jpg`

---

## 🔍 常見問題

### Q1: 圖片不顯示怎麼辦？

**檢查清單：**
- [ ] 圖片是否在 `public/images/` 目錄下？
- [ ] 路徑是否正確（以 `/` 開頭）？
- [ ] 檔名是否正確（區分大小寫）？
- [ ] 圖片格式是否支援（jpg, png, webp）？
- [ ] 是否重新整理了瀏覽器？

**除錯方法：**
```
1. 檢查檔案是否存在
   ls public/images/projects/my-image.jpg

2. 檢查路徑
   正確：/images/projects/my-image.jpg
   檔案：public/images/projects/my-image.jpg

3. 檢查權限
   chmod 644 public/images/projects/my-image.jpg
```

### Q2: 可以上傳什麼格式的圖片？

支援的格式：
- ✅ JPG/JPEG
- ✅ PNG
- ✅ WebP（推薦，更小的檔案）
- ✅ GIF（靜態）
- ❌ SVG（需特殊處理）

### Q3: 圖片太大怎麼辦？

**壓縮方法：**

1. **線上工具**（最簡單）
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - [Compressor.io](https://compressor.io/)

2. **Photoshop**
   - 檔案 → 轉存 → 轉存為
   - 品質設定 80-85%
   - 尺寸調整為需要的大小

3. **命令列工具**
   - ImageMagick（見上方）
   - jpegoptim、optipng

### Q4: 如何批次重新命名圖片？

**Mac/Linux：**
```bash
cd public/images/projects

# 加上前綴
for f in *.jpg; do
  mv "$f" "project-$f"
done

# 使用編號
i=1
for f in *.jpg; do
  mv "$f" "project-$i.jpg"
  ((i++))
done
```

**Windows PowerShell：**
```powershell
# 加上前綴
Get-ChildItem *.jpg | Rename-Item -NewName { "project-" + $_.Name }

# 使用編號
$i = 1
Get-ChildItem *.jpg | ForEach-Object {
  Rename-Item $_ -NewName "project-$i.jpg"
  $i++
}
```

### Q5: 未來會支援直接上傳嗎？

目前靜態網站的限制，無法直接上傳到伺服器。但未來可以考慮：

1. **整合圖床服務**
   - Imgur API
   - Cloudinary
   - ImgBB

2. **使用 GitHub API**
   - 直接上傳到 GitHub repository
   - 自動提交到 `public/images/`

3. **本地檔案選擇器**
   - 選擇本地圖片
   - 轉換為 Base64（不推薦，檔案會很大）

---

## 🎨 圖片最佳實踐

### 1. 命名規範

```
✅ 好的命名
taipei-xinyi-building-front.jpg
product-carpet-gray-detail.jpg
logo-white-bg.png

❌ 避免的命名
圖片1.jpg                    # 中文
IMG_20240101_123456.jpg      # 無意義
photo.jpg                    # 太籠統
very-long-name-that-is-hard-to-remember.jpg  # 太長
```

### 2. 檔案大小

| 用途 | 建議大小 | 最大大小 |
|------|---------|---------|
| 工程實績 | < 300KB | < 500KB |
| 產品圖片 | < 200KB | < 400KB |
| 縮圖 | < 50KB | < 100KB |
| 標誌/圖示 | < 20KB | < 50KB |

### 3. 圖片尺寸

| 用途 | 建議尺寸 | 比例 |
|------|---------|------|
| 工程實績（主圖） | 1200x800px | 3:2 |
| 工程實績（細節） | 800x600px | 4:3 |
| 產品圖片 | 800x800px | 1:1 |
| 縮圖 | 400x300px | 4:3 |

### 4. 圖片品質

- **品質設定**：80-85%（JPG）
- **格式選擇**：
  - 照片 → JPG/WebP
  - 透明背景 → PNG
  - 動畫 → GIF（或改用視訊）

---

## 🚀 快速參考

### 新增工程圖片
```bash
# 1. 準備圖片（壓縮、命名）
# 2. 複製到資料夾
cp ~/Downloads/my-image.jpg public/images/projects/taipei-building-2024.jpg

# 3. 在管理後台使用
# 路徑：/images/projects/taipei-building-2024.jpg
```

### 新增產品圖片
```bash
cp ~/Downloads/product.jpg public/images/products/carpet-gray.jpg
# 路徑：/images/products/carpet-gray.jpg
```

### 檢查圖片
```bash
# 列出所有圖片
find public/images -type f -name "*.jpg"

# 檢查檔案大小
ls -lh public/images/projects/

# 統計圖片數量
find public/images -type f | wc -l
```

---

## 📝 工作流程範例

### 完整流程：新增一個工程案例

```bash
# 1. 準備
# - 拍攝或取得工程照片
# - 使用 TinyPNG 壓縮
# - 下載到 ~/Downloads/

# 2. 重新命名並複製
cd ~/Downloads
mv photo1.jpg taipei-xinyi-front.jpg
mv photo2.jpg taipei-xinyi-entrance.jpg
mv photo3.jpg taipei-xinyi-detail.jpg

# 3. 複製到專案
cp taipei-xinyi-*.jpg ~/178mat/public/images/projects/

# 4. 在管理後台新增工程
# - 訪問 http://localhost:3000/178mat/admin/projects
# - 點擊「新增工程實績」
# - 填寫資訊
# - 點擊「選擇圖片」按鈕
# - 選擇剛才上傳的 3 張圖片
# - 儲存

# 5. 建置並發布
cd ~/178mat
npm run build
git add .
git commit -m "新增台北信義區工程案例"
git push
```

---

## ✨ 未來改進

計劃中的功能：

- [ ] 拖曳上傳介面
- [ ] 圖片自動壓縮
- [ ] 圖床整合（Imgur、Cloudinary）
- [ ] 圖片編輯（裁切、旋轉、濾鏡）
- [ ] 批次上傳
- [ ] 圖片 CDN 整合

---

**有任何問題？** 參考 [完整使用手冊](./ADMIN_PANEL_GUIDE.md)
