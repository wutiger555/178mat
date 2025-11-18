/**
 * 圖片選擇器元件
 * 提供視覺化的圖片選擇介面
 */

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from '@/components/ui/dialog';
import { Image as ImageIcon, Search, Check } from 'lucide-react';

// 常用的圖片路徑列表
const COMMON_IMAGES = [
  '/images/hero-mat-1.jpg',
  '/images/hero-mat-2.jpg',
  '/images/hero-mat-3.jpg',
  '/images/logo.png',
  '/images/logo-nav.png',
];

// 圖片分類
const IMAGE_CATEGORIES = {
  heroes: '首頁輪播',
  projects: '工程實績',
  products: '產品圖片',
  logos: '標誌圖示',
  others: '其他',
};

interface ImagePickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (imagePath: string) => void;
  currentImage?: string;
  multiple?: boolean;
  onSelectMultiple?: (imagePaths: string[]) => void;
}

export default function ImagePicker({
  open,
  onOpenChange,
  onSelect,
  currentImage,
  multiple = false,
  onSelectMultiple,
}: ImagePickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [customPath, setCustomPath] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // 分類圖片
  const categorizeImage = (path: string): string => {
    if (path.includes('/hero')) return 'heroes';
    if (path.includes('/project')) return 'projects';
    if (path.includes('/product')) return 'products';
    if (path.includes('/logo')) return 'logos';
    return 'others';
  };

  // 過濾圖片
  const filteredImages = COMMON_IMAGES.filter((img) => {
    const matchesSearch = img.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'all' || categorizeImage(img) === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelect = (imagePath: string) => {
    if (multiple) {
      const newSelection = selectedImages.includes(imagePath)
        ? selectedImages.filter((p) => p !== imagePath)
        : [...selectedImages, imagePath];
      setSelectedImages(newSelection);
    } else {
      onSelect(imagePath);
      onOpenChange(false);
    }
  };

  const handleConfirmMultiple = () => {
    if (onSelectMultiple) {
      onSelectMultiple(selectedImages);
    }
    onOpenChange(false);
    setSelectedImages([]);
  };

  const handleCustomPath = () => {
    if (customPath.trim()) {
      if (multiple) {
        setSelectedImages([...selectedImages, customPath.trim()]);
      } else {
        onSelect(customPath.trim());
        onOpenChange(false);
      }
      setCustomPath('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader onClose={() => onOpenChange(false)}>
          <DialogTitle>
            選擇圖片 {multiple && '（可多選）'}
          </DialogTitle>
        </DialogHeader>

        <DialogBody className="space-y-4">
          {/* 搜尋和自訂路徑 */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜尋圖片..."
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Input
                value={customPath}
                onChange={(e) => setCustomPath(e.target.value)}
                placeholder="或輸入自訂路徑，例：/images/my-image.jpg"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCustomPath();
                  }
                }}
              />
              <Button onClick={handleCustomPath} variant="outline">
                使用
              </Button>
            </div>
          </div>

          {/* 分類標籤 */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                activeCategory === 'all'
                  ? 'bg-[#C4A052] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              全部
            </button>
            {Object.entries(IMAGE_CATEGORIES).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  activeCategory === key
                    ? 'bg-[#C4A052] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 圖片網格 */}
          <div className="grid grid-cols-4 gap-4 max-h-96 overflow-y-auto">
            {filteredImages.map((img) => {
              const isSelected = multiple
                ? selectedImages.includes(img)
                : currentImage === img;

              return (
                <div
                  key={img}
                  onClick={() => handleSelect(img)}
                  className={`relative group cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                    isSelected
                      ? 'border-[#C4A052] ring-2 ring-[#C4A052] ring-offset-2'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <img
                      src={img}
                      alt={img}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="flex items-center justify-center w-full h-full text-gray-400"><svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`;
                        }
                      }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-xs truncate opacity-0 group-hover:opacity-100 transition-opacity">
                    {img}
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-[#C4A052] text-white rounded-full p-1">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 空狀態 */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>找不到符合的圖片</p>
              <p className="text-sm mt-1">試試輸入自訂路徑</p>
            </div>
          )}

          {/* 提示訊息 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
            <p className="font-semibold mb-1">💡 如何新增圖片？</p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>將圖片檔案放到專案的 <code className="bg-blue-100 px-1 rounded">public/images/</code> 目錄</li>
              <li>建議分類放置：projects/、products/ 等</li>
              <li>重新整理此頁面即可看到新圖片</li>
            </ol>
          </div>
        </DialogBody>

        <DialogFooter>
          {multiple && (
            <div className="flex-1 text-sm text-gray-600">
              已選擇 {selectedImages.length} 張圖片
            </div>
          )}
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          {multiple && (
            <Button
              onClick={handleConfirmMultiple}
              className="bg-[#C4A052] hover:bg-[#B39048]"
              disabled={selectedImages.length === 0}
            >
              確認選擇
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
