import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Location {
  id: string;
  name: string;
  x: number;
  y: number;
  count: number;
}

interface CountyData {
  name: string;
  count: number;
  region: string;
}

const STORAGE_KEY = 'taiwan_map_locations';

// 預設位置（與 MapManager 一致）
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

// 根據縣市名稱獲取區域
const getRegion = (name: string): string => {
  if (['台北', '新北', '桃園', '新竹', '宜蘭'].includes(name)) return '北部';
  if (['苗栗', '台中', '彰化', '南投'].includes(name)) return '中部';
  if (['雲林', '嘉義', '台南', '高雄', '屏東'].includes(name)) return '南部';
  if (['花蓮', '台東'].includes(name)) return '東部';
  return '其他';
};

/**
 * 改善的台灣地圖視覺化組件
 * 使用 SVG 地圖標記，整合 MapManager 的資料
 */
export default function TaiwanMapImproved() {
  const [locations, setLocations] = useState<Location[]>(DEFAULT_LOCATIONS);
  const [selectedCounty, setSelectedCounty] = useState<CountyData | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  // 從 localStorage 載入資料
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsedLocations = JSON.parse(stored);
        setLocations(parsedLocations);
      } catch (e) {
        console.error('Failed to parse map locations:', e);
      }
    }
  }, []);

  const totalProjects = locations.reduce((sum, loc) => sum + loc.count, 0);

  // 根據數量計算顏色
  const getColor = (count: number): string => {
    const maxCount = Math.max(...locations.map(l => l.count));
    const ratio = count / maxCount;
    if (ratio >= 0.8) return '#c41e3a';
    if (ratio >= 0.6) return '#d94a4a';
    if (ratio >= 0.4) return '#e67373';
    if (ratio >= 0.2) return '#f0a0a0';
    return '#f5d5d5';
  };

  const handleLocationClick = (location: Location) => {
    setSelectedCounty({
      name: location.name,
      count: location.count,
      region: getRegion(location.name),
    });
  };

  const handleViewProjects = (countyName: string) => {
    window.location.href = `/projects?city=${encodeURIComponent(countyName)}`;
  };

  return (
    <div className="w-full space-y-8 relative z-10">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* 左側：統計與圖例 */}
        <motion.div
          className="lg:col-span-1 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* 總統計 */}
          <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl font-bold mb-2">{totalProjects}</div>
            <div className="text-sm opacity-90">全台工程實績</div>
            <div className="text-xs opacity-75 mt-2">遍佈 {locations.length} 個縣市</div>
          </div>

          {/* 圖例 */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              工程實績密度
            </h4>
            <div className="space-y-3">
              {[
                { label: '高密度', color: '#c41e3a', range: '80%+' },
                { label: '中高', color: '#d94a4a', range: '60-80%' },
                { label: '中等', color: '#e67373', range: '40-60%' },
                { label: '中低', color: '#f0a0a0', range: '20-40%' },
                { label: '低', color: '#f5d5d5', range: '0-20%' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full border border-gray-300 shadow-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <p className="text-xs text-muted-foreground">{item.range}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 提示 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-900">
              💡 <span className="font-semibold">提示：</span> 點擊地圖上的標記查看縣市詳細資訊
            </p>
          </div>
        </motion.div>

        {/* 右側：SVG 地圖 */}
        <motion.div
          className="lg:col-span-3 bg-card rounded-lg p-8 border border-border overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">台灣服務範圍分佈</h3>

          {/* SVG 地圖 */}
          <div className="w-full flex justify-center">
            <svg
              viewBox="0 0 100 120"
              className="w-full max-w-2xl h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* 台灣本島輪廓 - 改善的路徑 */}
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
                className="fill-gray-100 stroke-gray-400 stroke-2 drop-shadow-md"
              />

              {/* 位置標記點 */}
              {locations.map((location) => (
                <g key={location.id}>
                  {/* 標記點的光暈效果（懸停時） */}
                  {hoveredLocation === location.id && (
                    <circle
                      cx={location.x}
                      cy={location.y}
                      r="6"
                      className="fill-current animate-ping"
                      style={{ color: getColor(location.count), opacity: 0.4 }}
                    />
                  )}

                  {/* 標記點 */}
                  <circle
                    cx={location.x}
                    cy={location.y}
                    r={hoveredLocation === location.id ? "4" : "3"}
                    className="cursor-pointer transition-all shadow-lg"
                    style={{
                      fill: getColor(location.count),
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                    }}
                    onMouseEnter={() => setHoveredLocation(location.id)}
                    onMouseLeave={() => setHoveredLocation(null)}
                    onClick={() => handleLocationClick(location)}
                  />

                  {/* 城市名稱標籤 */}
                  <g
                    className="pointer-events-none"
                    style={{
                      opacity: hoveredLocation === location.id ? 1 : 0.85
                    }}
                  >
                    {/* 背景白色矩形 */}
                    <rect
                      x={location.x + 4}
                      y={location.y - 2}
                      width={location.name.length * 2.8 + 1}
                      height="4.5"
                      className="fill-white"
                      rx="1"
                      style={{ opacity: 0.9 }}
                    />
                    {/* 城市名稱 */}
                    <text
                      x={location.x + 5}
                      y={location.y + 1}
                      className="text-[2.8px] font-bold fill-gray-800"
                    >
                      {location.name}
                    </text>
                    {/* 數量 */}
                    <text
                      x={location.x + 5}
                      y={location.y + 3.5}
                      className="text-[2px] fill-gray-600"
                    >
                      {location.count}件
                    </text>
                  </g>
                </g>
              ))}
            </svg>
          </div>

          <p className="text-sm text-gray-500 text-center mt-6">
            點擊地圖上的標記可以查看該縣市的工程實績
          </p>
        </motion.div>
      </motion.div>

      {/* 城市詳細資訊 */}
      {selectedCounty && (
        <motion.div
          className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 城市資訊 */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {selectedCounty.name}
              </h3>
              <p className="text-muted-foreground mb-4">
                {selectedCounty.region} 地區
              </p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">工程實績：</span>
                  <span className="font-semibold text-primary">
                    {selectedCounty.count} 項
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">佔比：</span>
                  <span className="font-semibold">
                    {((selectedCounty.count / totalProjects) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* 進度條 */}
            <div className="flex flex-col justify-center">
              <div className="mb-3">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">工程實績分佈</span>
                  <span className="text-sm text-muted-foreground">
                    {((selectedCounty.count / totalProjects) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary/70"
                    initial={{ width: 0 }}
                    animate={{ width: `${(selectedCounty.count / totalProjects) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {/* 按鈕 */}
            <div className="flex flex-col justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => handleViewProjects(selectedCounty.name)}
                  className="w-full gap-2 bg-brand-red hover:bg-brand-red-dark text-white shadow-md"
                  size="lg"
                >
                  查看 {selectedCounty.name} 案例
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
