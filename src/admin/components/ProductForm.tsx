/**
 * 產品編輯表單
 */

import { useState, useEffect } from 'react';
import { Product } from '@/data/products';
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

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSave: (product: Product) => void;
  mode: 'create' | 'edit';
}

export default function ProductForm({
  open,
  onOpenChange,
  product,
  onSave,
  mode,
}: ProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    id: '',
    name: '',
    category: '',
    description: '',
    image: '',
    specifications: {
      material: '',
      features: [],
    },
    applications: [],
  });

  const [featureInput, setFeatureInput] = useState('');
  const [applicationInput, setApplicationInput] = useState('');
  const [colorInput, setColorInput] = useState('');

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      // 重置表單
      setFormData({
        id: '',
        name: '',
        category: '',
        description: '',
        image: '',
        specifications: {
          material: '',
          features: [],
        },
        applications: [],
      });
    }
  }, [product, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 驗證必填欄位
    if (!formData.name || !formData.category || !formData.description) {
      alert('請填寫必填欄位：產品名稱、分類、描述');
      return;
    }

    // 如果是新增模式且沒有 ID，自動生成
    if (mode === 'create' && !formData.id) {
      const id = `product-${Date.now()}`;
      formData.id = id;
    }

    onSave(formData);
    onOpenChange(false);
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          features: [...formData.specifications.features, featureInput.trim()],
        },
      });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        features: formData.specifications.features.filter((_, i) => i !== index),
      },
    });
  };

  const handleAddApplication = () => {
    if (applicationInput.trim()) {
      setFormData({
        ...formData,
        applications: [...formData.applications, applicationInput.trim()],
      });
      setApplicationInput('');
    }
  };

  const handleRemoveApplication = (index: number) => {
    setFormData({
      ...formData,
      applications: formData.applications.filter((_, i) => i !== index),
    });
  };

  const handleAddColor = () => {
    if (colorInput.trim()) {
      const colors = formData.specifications.colors || [];
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          colors: [...colors, colorInput.trim()],
        },
      });
      setColorInput('');
    }
  };

  const handleRemoveColor = (index: number) => {
    const colors = formData.specifications.colors || [];
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        colors: colors.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader onClose={() => onOpenChange(false)}>
          <DialogTitle>
            {mode === 'create' ? '新增產品' : '編輯產品'}
          </DialogTitle>
          <DialogDescription>
            填寫產品資訊，標註 * 為必填欄位
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <DialogBody className="space-y-6">
            {/* 基本資訊 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">基本資訊</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    產品名稱 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="例：波羅紋毯面 - 灰色"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">
                    產品分類 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="例：面料"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="id">
                  產品 ID {mode === 'edit' && <span className="text-gray-500">(不可修改)</span>}
                </Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) =>
                    setFormData({ ...formData, id: e.target.value })
                  }
                  placeholder="例：carpet-polo-gray"
                  disabled={mode === 'edit'}
                />
                {mode === 'create' && (
                  <p className="text-xs text-gray-500">
                    留空將自動生成，建議使用英文和數字
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  產品描述 <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="描述產品特色、優點、適用場景等..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">產品圖片路徑</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="例：/images/products/carpet-gray.jpg"
                />
                {formData.image && (
                  <div className="mt-2 border rounded-lg p-2">
                    <img
                      src={formData.image}
                      alt="產品預覽"
                      className="w-full h-48 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">價格（選填）</Label>
                <Input
                  id="price"
                  value={formData.price || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="例：NT$ 1,200 / 平方公尺"
                />
              </div>
            </div>

            {/* 規格資訊 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">規格資訊</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="material">材質</Label>
                  <Input
                    id="material"
                    value={formData.specifications.material}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specifications: {
                          ...formData.specifications,
                          material: e.target.value,
                        },
                      })
                    }
                    placeholder="例：高密度聚丙烯纖維"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thickness">厚度</Label>
                  <Input
                    id="thickness"
                    value={formData.specifications.thickness || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specifications: {
                          ...formData.specifications,
                          thickness: e.target.value,
                        },
                      })
                    }
                    placeholder="例：約 12mm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="width">寬度</Label>
                  <Input
                    id="width"
                    value={formData.specifications.width || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specifications: {
                          ...formData.specifications,
                          width: e.target.value,
                        },
                      })
                    }
                    placeholder="例：可客製化"
                  />
                </div>
              </div>

              {/* 產品特點 */}
              <div className="space-y-2">
                <Label>產品特點</Label>
                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    placeholder="輸入特點，例：優異除泥效果"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddFeature} variant="outline">
                    新增
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.specifications.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full"
                    >
                      <span className="text-sm">{feature}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(index)}
                        className="text-green-700 hover:text-green-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 顏色選項 */}
              <div className="space-y-2">
                <Label>顏色選項</Label>
                <div className="flex gap-2">
                  <Input
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    placeholder="輸入顏色，例：灰色"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddColor();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddColor} variant="outline">
                    新增
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(formData.specifications.colors || []).map((color, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full"
                    >
                      <span className="text-sm">{color}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(index)}
                        className="text-blue-700 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 適用場所 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">適用場所</h3>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={applicationInput}
                    onChange={(e) => setApplicationInput(e.target.value)}
                    placeholder="輸入適用場所，例：住宅大廈"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddApplication();
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={handleAddApplication}
                    variant="outline"
                  >
                    新增
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.applications.map((app, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-700 rounded-full"
                    >
                      <span className="text-sm">{app}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveApplication(index)}
                        className="text-purple-700 hover:text-purple-900"
                      >
                        ×
                      </button>
                    </div>
                  ))}
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
