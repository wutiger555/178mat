/**
 * 網站設定管理頁面
 */

import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings, Eye, EyeOff, Save, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

const STORAGE_KEY = 'website_settings';

// 預設導航項
const DEFAULT_NAV_ITEMS = [
  { id: 'home', label: '首頁', href: '/', visible: true },
  { id: 'about', label: '關於我們', href: '/about', visible: true },
  { id: 'services', label: '服務項目', href: '/services', visible: true },
  { id: 'projects', label: '工程實績', href: '/projects', visible: true },
  { id: 'products', label: '產品型錄', href: '/products', visible: true },
  { id: 'showcase-3d', label: '3D 展示', href: '/showcase-3d', visible: true },
  { id: 'contact', label: '聯絡我們', href: '/contact', visible: true },
];

interface NavItemSetting {
  id: string;
  label: string;
  href: string;
  visible: boolean;
}

interface WebsiteSettings {
  navItems: NavItemSetting[];
  lastUpdated?: string;
}

export default function SettingsManager() {
  const [settings, setSettings] = useState<WebsiteSettings>({
    navItems: DEFAULT_NAV_ITEMS,
  });

  // 載入設定
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings(parsed);
      } catch (e) {
        console.error('Failed to parse settings:', e);
        setSettings({ navItems: DEFAULT_NAV_ITEMS });
      }
    }
  }, []);

  // 儲存設定
  const handleSave = () => {
    const updatedSettings = {
      ...settings,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
    setSettings(updatedSettings);
    toast.success('設定已儲存');
  };

  // 重置設定
  const handleReset = () => {
    if (confirm('確定要重置為預設設定？')) {
      const defaultSettings = {
        navItems: DEFAULT_NAV_ITEMS,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
      setSettings(defaultSettings);
      toast.success('已重置為預設設定');
    }
  };

  // 切換導航項顯示狀態
  const toggleNavItem = (id: string) => {
    setSettings({
      ...settings,
      navItems: settings.navItems.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      ),
    });
  };

  const visibleCount = settings.navItems.filter((item) => item.visible).length;
  const hiddenCount = settings.navItems.length - visibleCount;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 頁面標題 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">網站設定</h2>
            <p className="text-gray-600 mt-1">管理網站的顯示設定</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              重置為預設
            </Button>
            <Button
              onClick={handleSave}
              className="gap-2 bg-[#C4A052] hover:bg-[#B39048]"
            >
              <Save className="w-4 h-4" />
              儲存設定
            </Button>
          </div>
        </div>

        {/* 統計資訊 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Settings className="w-8 h-8 mx-auto text-[#C4A052] mb-2" />
                <p className="text-gray-600 text-sm">總導航項</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {settings.navItems.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Eye className="w-8 h-8 mx-auto text-green-600 mb-2" />
                <p className="text-gray-600 text-sm">顯示中</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {visibleCount}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <EyeOff className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-600 text-sm">已隱藏</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {hiddenCount}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 導航項設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              導航選單設定
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {settings.navItems.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-4 border rounded-lg transition-all ${
                    item.visible
                      ? 'bg-white border-gray-200'
                      : 'bg-gray-50 border-gray-300 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {item.visible ? (
                      <Eye className="w-5 h-5 text-green-600" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.href}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Label
                      htmlFor={`nav-${item.id}`}
                      className="text-sm text-gray-600"
                    >
                      {item.visible ? '顯示' : '隱藏'}
                    </Label>
                    <Switch
                      id={`nav-${item.id}`}
                      checked={item.visible}
                      onCheckedChange={() => toggleNavItem(item.id)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 預覽 */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-3">
                📱 導航選單預覽
              </p>
              <div className="flex flex-wrap gap-2">
                {settings.navItems
                  .filter((item) => item.visible)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="px-3 py-1.5 bg-white border border-blue-300 rounded-lg text-sm font-medium text-gray-700"
                    >
                      {item.label}
                    </div>
                  ))}
              </div>
              {visibleCount === 0 && (
                <p className="text-sm text-blue-700 mt-2">
                  ⚠️ 警告：沒有顯示任何導航項，使用者將無法導航
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* 說明 */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="space-y-2 text-blue-800">
              <p className="font-semibold">💡 使用說明</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>切換開關可以控制該導航項是否顯示在網站上</li>
                <li>隱藏的導航項不會出現在頂部選單和手機選單中</li>
                <li>設定會即時儲存到瀏覽器，重新整理後會保留</li>
                <li>記得點擊「儲存設定」按鈕確保變更生效</li>
                <li>如需恢復原始設定，點擊「重置為預設」</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 最後更新時間 */}
        {settings.lastUpdated && (
          <div className="text-center text-sm text-gray-500">
            最後更新：{new Date(settings.lastUpdated).toLocaleString('zh-TW')}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
