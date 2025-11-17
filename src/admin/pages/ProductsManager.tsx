/**
 * 產品管理頁面
 */

import { useState } from 'react';
import { useCMSData } from '../hooks/useCMSData';
import AdminLayout from '../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Search, Tag } from 'lucide-react';

export default function ProductsManager() {
  const { data, loading, deleteProduct, exportData } = useCMSData();
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#C4A052] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">載入中...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const products = data?.products || [];

  // 搜尋過濾
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  });

  // 按分類分組
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const handleDelete = (productId: string) => {
    if (confirm('確定要刪除此產品？')) {
      deleteProduct(productId);
    }
  };

  return (
    <AdminLayout onExport={exportData}>
      <div className="space-y-6">
        {/* 頁面標題 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">產品管理</h2>
            <p className="text-gray-600 mt-1">管理產品型錄與規格</p>
          </div>
          <Button className="gap-2 bg-[#C4A052] hover:bg-[#B39048]">
            <Plus className="w-4 h-4" />
            新增產品
          </Button>
        </div>

        {/* 搜尋列 */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="搜尋產品名稱、分類、描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* 統計資訊 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm">總產品數</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm">產品分類</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{categories.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm">搜尋結果</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {filteredProducts.length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 產品列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                {/* 產品圖片 */}
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      無圖片
                    </div>
                  )}
                </div>

                {/* 產品資訊 */}
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{product.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {product.description}
                  </p>

                  {/* 規格標籤 */}
                  {product.specifications && (
                    <div className="flex flex-wrap gap-2">
                      {product.specifications.features?.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 操作按鈕 */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <Edit className="w-4 h-4" />
                      編輯
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 空狀態 */}
        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-gray-500">
                <p>找不到符合條件的產品</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
