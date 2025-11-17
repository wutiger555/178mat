/**
 * 工程實績編輯表單
 */

import { useState, useEffect } from 'react';
import { Project } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from '@/components/ui/dialog';
import { tagOptions } from '@/data/cms-config';

interface ProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: Project | null;
  onSave: (project: Project) => void;
  mode: 'create' | 'edit';
}

export default function ProjectForm({
  open,
  onOpenChange,
  project,
  onSave,
  mode,
}: ProjectFormProps) {
  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    location: '',
    city: '',
    district: '',
    year: new Date().getFullYear(),
    images: [],
    description: '',
    tags: {
      buildingType: [],
      floorMaterial: [],
      installationType: [],
      framingType: [],
      surfaceMaterial: [],
      drainageType: [],
      designFeature: [],
      location: [],
    },
    specs: {},
  });

  const [imageInput, setImageInput] = useState('');

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      // 重置表單
      setFormData({
        id: '',
        title: '',
        location: '',
        city: '',
        district: '',
        year: new Date().getFullYear(),
        images: [],
        description: '',
        tags: {
          buildingType: [],
          floorMaterial: [],
          installationType: [],
          framingType: [],
          surfaceMaterial: [],
          drainageType: [],
          designFeature: [],
          location: [],
        },
        specs: {},
      });
    }
  }, [project, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 驗證必填欄位
    if (!formData.title || !formData.location || !formData.city) {
      alert('請填寫必填欄位：標題、地點、城市');
      return;
    }

    // 如果是新增模式且沒有 ID，自動生成
    if (mode === 'create' && !formData.id) {
      const id = `project-${Date.now()}`;
      formData.id = id;
    }

    onSave(formData);
    onOpenChange(false);
  };

  const handleTagToggle = (category: keyof Project['tags'], value: string) => {
    const currentTags = formData.tags[category];
    const newTags = currentTags.includes(value)
      ? currentTags.filter((t) => t !== value)
      : [...currentTags, value];

    setFormData({
      ...formData,
      tags: {
        ...formData.tags,
        [category]: newTags,
      },
    });
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, imageInput.trim()],
      });
      setImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader onClose={() => onOpenChange(false)}>
          <DialogTitle>
            {mode === 'create' ? '新增工程實績' : '編輯工程實績'}
          </DialogTitle>
          <DialogDescription>
            填寫工程資訊，標註 * 為必填欄位
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-6">
            {/* 基本資訊 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">基本資訊</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    工程名稱 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="例：台北市信義區住宅大樓"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="id">
                    工程 ID {mode === 'edit' && <span className="text-gray-500">(不可修改)</span>}
                  </Label>
                  <Input
                    id="id"
                    value={formData.id}
                    onChange={(e) =>
                      setFormData({ ...formData, id: e.target.value })
                    }
                    placeholder="例：taipei-xinyi-building-2024"
                    disabled={mode === 'edit'}
                  />
                  {mode === 'create' && (
                    <p className="text-xs text-gray-500">
                      留空將自動生成，建議使用英文和數字
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">
                    城市 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="例：台北"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district">區域</Label>
                  <Input
                    id="district"
                    value={formData.district}
                    onChange={(e) =>
                      setFormData({ ...formData, district: e.target.value })
                    }
                    placeholder="例：信義區"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">年份</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: parseInt(e.target.value) })
                    }
                    min={2000}
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  完整地址 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="例：台北市信義區信義路五段..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">工程描述</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="描述工程特色、使用的材料、特殊設計等..."
                  rows={4}
                />
              </div>
            </div>

            {/* 圖片管理 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">工程圖片</h3>

              <div className="flex gap-2">
                <Input
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  placeholder="輸入圖片路徑，例：/images/project-1.jpg"
                />
                <Button type="button" onClick={handleAddImage} variant="outline">
                  新增
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {formData.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative group border rounded-lg p-2"
                  >
                    <img
                      src={img}
                      alt={`圖片 ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
                      }}
                    />
                    <p className="text-xs text-gray-500 mt-1 truncate">{img}</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white"
                    >
                      刪除
                    </Button>
                  </div>
                ))}
              </div>

              {formData.images.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  尚未新增圖片
                </p>
              )}
            </div>

            {/* 標籤分類 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">標籤分類</h3>

              {/* 建築類型 */}
              <div className="space-y-2">
                <Label>建築類型</Label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.buildingTypes.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle('buildingType', tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        formData.tags.buildingType.includes(tag)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* 地面材質 */}
              <div className="space-y-2">
                <Label>地面材質</Label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.floorMaterials.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle('floorMaterial', tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        formData.tags.floorMaterial.includes(tag)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* 安裝方式 */}
              <div className="space-y-2">
                <Label>安裝方式</Label>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.installationTypes.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle('installationType', tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        formData.tags.installationType.includes(tag)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 規格資訊 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">規格資訊</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="area">面積</Label>
                  <Input
                    id="area"
                    value={formData.specs.area || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, area: e.target.value },
                      })
                    }
                    placeholder="例：50 平方公尺"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="depth">深度</Label>
                  <Input
                    id="depth"
                    value={formData.specs.depth || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, depth: e.target.value },
                      })
                    }
                    placeholder="例：2.5 公分"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="width">寬度</Label>
                  <Input
                    id="width"
                    value={formData.specs.width || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, width: e.target.value },
                      })
                    }
                    placeholder="例：120 公分"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="length">長度</Label>
                  <Input
                    id="length"
                    value={formData.specs.length || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, length: e.target.value },
                      })
                    }
                    placeholder="例：300 公分"
                  />
                </div>
              </div>
            </div>
          </DialogBody>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button
              type="submit"
              className="bg-[#C4A052] hover:bg-[#B39048]"
            >
              {mode === 'create' ? '新增' : '儲存'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
