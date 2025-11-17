/**
 * 地圖案場管理頁面
 */

import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from '@/components/ui/dialog';
import { MapPin, Edit, Plus, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

interface Location {
  id: string;
  name: string;
  x: number;
  y: number;
  count: number;
}

const STORAGE_KEY = 'taiwan_map_locations';

// 預設位置
const DEFAULT_LOCATIONS: Location[] = [
  { id: "taipei", name: "台北", x: 55, y: 15, count: 150 },
  { id: "newtaipei", name: "新北", x: 57, y: 18, count: 130 },
  { id: "taoyuan", name: "桃園", x: 52, y: 22, count: 80 },
  { id: "hsinchu", name: "新竹", x: 50, y: 28, count: 60 },
  { id: "miaoli", name: "苗栗", x: 48, y: 35, count: 35 },
  { id: "taichung", name: "台中", x: 48, y: 42, count: 120 },
  { id: "changhua", name: "彰化", x: 47, y: 50, count: 45 },
  { id: "nantou", name: "南投", x: 50, y: 48, count: 30 },
  { id: "yunlin", name: "雲林", x: 46, y: 57, count: 25 },
  { id: "chiayi", name: "嘉義", x: 47, y: 62, count: 40 },
  { id: "tainan", name: "台南", x: 45, y: 65, count: 90 },
  { id: "kaohsiung", name: "高雄", x: 48, y: 75, count: 110 },
  { id: "pingtung", name: "屏東", x: 47, y: 85, count: 40 },
  { id: "yilan", name: "宜蘭", x: 60, y: 22, count: 20 },
  { id: "hualien", name: "花蓮", x: 58, y: 50, count: 15 },
  { id: "taitung", name: "台東", x: 55, y: 75, count: 12 },
];

export default function MapManager() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  // 載入資料
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setLocations(JSON.parse(stored));
      } catch (e) {
        setLocations(DEFAULT_LOCATIONS);
      }
    } else {
      setLocations(DEFAULT_LOCATIONS);
    }
  }, []);

  // 儲存資料
  const saveLocations = (newLocations: Location[]) => {
    setLocations(newLocations);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLocations));
    toast.success('地圖資料已儲存');
  };

  // 開啟編輯表單
  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setFormOpen(true);
  };

  // 儲存編輯
  const handleSave = () => {
    if (!editingLocation) return;

    const newLocations = locations.map((loc) =>
      loc.id === editingLocation.id ? editingLocation : loc
    );

    saveLocations(newLocations);
    setFormOpen(false);
    setEditingLocation(null);
  };

  // 重置為預設
  const handleReset = () => {
    if (confirm('確定要重置為預設值？')) {
      saveLocations(DEFAULT_LOCATIONS);
    }
  };

  // 匯出資料
  const handleExport = () => {
    const dataStr = JSON.stringify(locations, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'map-locations.json';
    link.click();
    URL.revokeObjectURL(url);
    toast.success('資料已匯出');
  };

  // 統計
  const totalProjects = locations.reduce((sum, loc) => sum + loc.count, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 頁面標題 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">地圖案場管理</h2>
            <p className="text-gray-600 mt-1">管理台灣地圖上的案場標記</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              匯出資料
            </Button>
            <Button variant="outline" onClick={handleReset} className="text-red-600">
              重置為預設
            </Button>
          </div>
        </div>

        {/* 統計資訊 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm">總案場數</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalProjects}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm">標記城市</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{locations.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm">平均數量</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {Math.round(totalProjects / locations.length)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 地圖預覽 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                地圖預覽
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full max-w-md mx-auto">
                <svg
                  viewBox="0 0 100 120"
                  className="w-full h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* 台灣本島輪廓 */}
                  <path
                    d="M 50 10
                       Q 55 12, 58 18
                       Q 60 25, 58 32
                       Q 56 40, 52 48
                       Q 50 55, 48 62
                       Q 46 70, 48 78
                       Q 50 85, 48 92
                       Q 46 98, 44 102
                       Q 40 108, 38 110
                       L 36 108
                       Q 34 102, 35 95
                       Q 36 88, 38 80
                       Q 40 72, 42 64
                       Q 44 56, 46 48
                       Q 48 40, 48 32
                       Q 48 24, 46 18
                       Q 44 12, 46 10
                       Z"
                    className="fill-gray-100 stroke-gray-300 stroke-2"
                  />

                  {/* 位置標記點 */}
                  {locations.map((location) => (
                    <g key={location.id}>
                      {/* 標記點 */}
                      <circle
                        cx={location.x}
                        cy={location.y}
                        r={hoveredLocation === location.id ? "4" : "3"}
                        className="fill-[#C4A052] cursor-pointer transition-all"
                        onMouseEnter={() => setHoveredLocation(location.id)}
                        onMouseLeave={() => setHoveredLocation(null)}
                        onClick={() => handleEdit(location)}
                      />
                      {/* 城市名稱 */}
                      <text
                        x={location.x + 5}
                        y={location.y + 1}
                        className="text-[3px] fill-gray-700 font-medium pointer-events-none"
                      >
                        {location.name}
                      </text>
                      {/* 數量 */}
                      <text
                        x={location.x + 5}
                        y={location.y + 4}
                        className="text-[2.5px] fill-gray-500 pointer-events-none"
                      >
                        {location.count}件
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
              <p className="text-sm text-gray-500 text-center mt-4">
                點擊標記點可以編輯案場數量
              </p>
            </CardContent>
          </Card>

          {/* 城市列表 */}
          <Card>
            <CardHeader>
              <CardTitle>城市案場列表</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {locations
                  .sort((a, b) => b.count - a.count)
                  .map((location) => (
                    <div
                      key={location.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      onMouseEnter={() => setHoveredLocation(location.id)}
                      onMouseLeave={() => setHoveredLocation(null)}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-[#C4A052]" />
                        <div>
                          <p className="font-medium">{location.name}</p>
                          <p className="text-sm text-gray-500">{location.count} 件案場</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(location)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 說明 */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="space-y-2 text-blue-800">
              <p className="font-semibold">💡 使用說明</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>點擊地圖上的標記點或列表中的「編輯」按鈕，可以修改案場數量</li>
                <li>資料會自動儲存到瀏覽器</li>
                <li>建議定期使用「匯出資料」功能備份</li>
                <li>修改後的地圖會自動顯示在網站首頁</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 編輯表單 */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent>
          <DialogHeader onClose={() => setFormOpen(false)}>
            <DialogTitle>編輯案場數量</DialogTitle>
            <DialogDescription>
              修改 {editingLocation?.name} 的案場數量
            </DialogDescription>
          </DialogHeader>

          {editingLocation && (
            <DialogBody className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="city">城市</Label>
                <Input
                  id="city"
                  value={editingLocation.name}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="count">
                  案場數量 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="count"
                  type="number"
                  value={editingLocation.count}
                  onChange={(e) =>
                    setEditingLocation({
                      ...editingLocation,
                      count: parseInt(e.target.value) || 0,
                    })
                  }
                  min={0}
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">預覽</p>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#C4A052]" />
                  <span className="font-medium">{editingLocation.name}</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-600">{editingLocation.count} 件案場</span>
                </div>
              </div>
            </DialogBody>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setFormOpen(false)}>
              取消
            </Button>
            <Button
              onClick={handleSave}
              className="gap-2 bg-[#C4A052] hover:bg-[#B39048]"
            >
              <Save className="w-4 h-4" />
              儲存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
