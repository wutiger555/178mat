import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface CountyData {
  name: string;
  count: number;
  region: string;
}

const STORAGE_KEY = 'taiwan_map_locations';

// 從 MapManager 的資料結構轉換
const DEFAULT_COUNTY_DATA: Record<string, number> = {
  'taipei': 150,
  'newtaipei': 130,
  'taoyuan': 80,
  'hsinchu': 60,
  'miaoli': 35,
  'taichung': 120,
  'changhua': 45,
  'nantou': 30,
  'yunlin': 25,
  'chiayi': 40,
  'tainan': 90,
  'kaohsiung': 110,
  'pingtung': 40,
  'yilan': 20,
  'hualien': 15,
  'taitung': 12,
};

const REGION_MAP: Record<string, string> = {
  'taipei': '北部',
  'newtaipei': '北部',
  'taoyuan': '北部',
  'hsinchu': '北部',
  'miaoli': '中部',
  'taichung': '中部',
  'changhua': '中部',
  'nantou': '中部',
  'yunlin': '南部',
  'chiayi': '南部',
  'tainan': '南部',
  'kaohsiung': '南部',
  'pingtung': '南部',
  'yilan': '東部',
  'hualien': '東部',
  'taitung': '東部',
};

/**
 * 專業的台灣縣市填色地圖組件
 * 使用 Leaflet + 真實 GeoJSON 數據
 */
export default function TaiwanMapRealistic() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<CountyData | null>(null);
  const [countyData, setCountyData] = useState<Record<string, number>>(DEFAULT_COUNTY_DATA);
  const [loading, setLoading] = useState(true);

  // 從 localStorage 載入資料
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const locations = JSON.parse(stored);
        const dataMap: Record<string, number> = {};
        locations.forEach((loc: any) => {
          dataMap[loc.id] = loc.count;
        });
        setCountyData(dataMap);
      } catch (e) {
        console.error('Failed to parse map data:', e);
      }
    }
  }, []);

  // 計算顏色
  const getColor = (count: number): string => {
    const maxCount = Math.max(...Object.values(countyData));
    const ratio = count / maxCount;

    // 使用更專業的色階
    if (ratio >= 0.8) return '#8B0000'; // 深紅
    if (ratio >= 0.6) return '#C41E3A'; // 紅
    if (ratio >= 0.4) return '#E67373'; // 中紅
    if (ratio >= 0.2) return '#F0A0A0'; // 淺紅
    return '#FFE5E5'; // 極淺紅
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // 初始化地圖
    map.current = L.map(mapContainer.current, {
      zoomControl: true,
      scrollWheelZoom: false,
      doubleClickZoom: true,
      dragging: true,
    }).setView([23.8, 120.9], 7.5);

    // 添加底圖 - 使用簡潔的底圖樣式
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap contributors © CARTO',
      maxZoom: 19,
    }).addTo(map.current);

    // 載入 GeoJSON 數據
    fetch('/178mat/data/taiwan-counties.json')
      .then(response => response.json())
      .then(geojsonData => {
        if (!map.current) return;

        // 添加 GeoJSON 圖層
        L.geoJSON(geojsonData, {
          style: (feature) => {
            const countyId = feature?.properties?.id;
            const count = countyData[countyId] || 0;
            return {
              fillColor: getColor(count),
              weight: 2,
              opacity: 1,
              color: 'white',
              fillOpacity: 0.7,
            };
          },
          onEachFeature: (feature, layer) => {
            const countyId = feature.properties.id;
            const countyName = feature.properties.name;
            const count = countyData[countyId] || 0;
            const region = REGION_MAP[countyId] || '其他';

            // 綁定彈出視窗
            layer.bindPopup(`
              <div class="p-4 min-w-[200px]">
                <h3 class="text-lg font-bold text-gray-900 mb-2">${countyName}</h3>
                <div class="space-y-1">
                  <p class="text-sm text-gray-600">
                    <span class="font-medium">區域：</span>${region}
                  </p>
                  <p class="text-sm">
                    <span class="font-medium text-gray-600">工程實績：</span>
                    <span class="text-lg font-bold text-[#C41E3A] ml-1">${count}</span> 項
                  </p>
                </div>
              </div>
            `);

            // 懸停效果
            layer.on({
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  weight: 3,
                  color: '#C41E3A',
                  fillOpacity: 0.9,
                });
                layer.bringToFront();
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  weight: 2,
                  color: 'white',
                  fillOpacity: 0.7,
                });
              },
              click: () => {
                setSelectedCounty({
                  name: countyName,
                  count: count,
                  region: region,
                });
              },
            });

            // 添加縣市標籤
            const bounds = layer.getBounds();
            const center = bounds.getCenter();

            L.marker(center, {
              icon: L.divIcon({
                className: 'county-label',
                html: `
                  <div style="text-align: center; font-weight: 600; text-shadow: 1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white; color: #333; font-size: 12px;">
                    ${countyName}
                  </div>
                  <div style="text-align: center; font-size: 10px; font-weight: 500; color: #C41E3A; text-shadow: 1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white;">
                    ${count} 項
                  </div>
                `,
                iconSize: [60, 40],
                iconAnchor: [30, 20],
              }),
            }).addTo(map.current!);
          },
        }).addTo(map.current);

        setLoading(false);
      })
      .catch(error => {
        console.error('Failed to load GeoJSON:', error);
        setLoading(false);
      });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [countyData]);

  const handleViewProjects = (countyName: string) => {
    window.location.href = `/projects?city=${encodeURIComponent(countyName)}`;
  };

  const totalProjects = Object.values(countyData).reduce((sum, count) => sum + count, 0);
  const avgProjects = Math.round(totalProjects / Object.keys(countyData).length);
  const maxCounty = Object.entries(countyData).reduce((a, b) => a[1] > b[1] ? a : b);

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
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 opacity-80" />
            </div>
            <div className="text-4xl font-bold mb-2">{totalProjects}</div>
            <div className="text-sm opacity-90">全台工程實績</div>
            <div className="text-xs opacity-75 mt-2">
              遍佈 {Object.keys(countyData).length} 個縣市
            </div>
          </div>

          {/* 統計資訊 */}
          <div className="bg-card rounded-lg p-6 border border-border space-y-4">
            <h4 className="font-semibold text-foreground mb-3">統計資訊</h4>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">平均數量</span>
                <span className="font-bold text-lg">{avgProjects}</span>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-muted-foreground">最高縣市</span>
                  <span className="font-semibold text-primary">
                    {Object.entries(countyData).find(([_, count]) => count === maxCounty[1])?.[0]
                      ? Object.entries(REGION_MAP).find(([id]) => id === maxCounty[0])?.[0]?.replace(/taipei|newtaipei|taoyuan|hsinchu|miaoli|taichung|changhua|nantou|yunlin|chiayi|tainan|kaohsiung|pingtung|yilan|hualien|taitung/, (match) => {
                        const nameMap: Record<string, string> = {
                          'taipei': '台北',
                          'newtaipei': '新北',
                          'taoyuan': '桃園',
                          'hsinchu': '新竹',
                          'miaoli': '苗栗',
                          'taichung': '台中',
                          'changhua': '彰化',
                          'nantou': '南投',
                          'yunlin': '雲林',
                          'chiayi': '嘉義',
                          'tainan': '台南',
                          'kaohsiung': '高雄',
                          'pingtung': '屏東',
                          'yilan': '宜蘭',
                          'hualien': '花蓮',
                          'taitung': '台東',
                        };
                        return nameMap[maxCounty[0]] || match;
                      })
                      : '-'}
                  </span>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  {maxCounty[1]} 項
                </div>
              </div>
            </div>
          </div>

          {/* 圖例 */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              工程實績密度
            </h4>
            <div className="space-y-3">
              {[
                { label: '極高密度', color: '#8B0000', range: '80%+' },
                { label: '高密度', color: '#C41E3A', range: '60-80%' },
                { label: '中密度', color: '#E67373', range: '40-60%' },
                { label: '低密度', color: '#F0A0A0', range: '20-40%' },
                { label: '極低密度', color: '#FFE5E5', range: '0-20%' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="w-8 h-5 rounded border-2 border-white shadow-md"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.range}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 提示 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-900">
              <span className="font-semibold">💡 互動提示</span>
              <br />
              • 點擊縣市查看詳細資訊
              <br />
              • 懸停查看即時數據
              <br />
              • 顏色深淺代表工程密度
            </p>
          </div>
        </motion.div>

        {/* 右側：真實地圖 */}
        <motion.div
          className="lg:col-span-3 bg-card rounded-lg p-8 border border-border overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">台灣服務範圍分佈圖</h3>
            {loading && (
              <span className="text-sm text-muted-foreground animate-pulse">
                載入地圖中...
              </span>
            )}
          </div>

          <div
            ref={mapContainer}
            className="w-full h-[500px] rounded-lg border-2 border-border overflow-hidden shadow-inner"
          />

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              📍 真實縣市邊界地圖 | 顏色深淺代表工程實績密度
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* 選中縣市的詳細資訊 */}
      {selectedCounty && (
        <motion.div
          className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 縣市資訊 */}
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
                  <span className="font-semibold text-primary text-lg">
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
                  <span className="text-sm font-medium">相對密度</span>
                  <span className="text-sm text-muted-foreground">
                    {((selectedCounty.count / totalProjects) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-4 bg-muted rounded-full overflow-hidden border border-border">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/70 shadow-inner"
                    initial={{ width: 0 }}
                    animate={{ width: `${(selectedCounty.count / totalProjects) * 100}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {/* 操作按鈕 */}
            <div className="flex flex-col justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => handleViewProjects(selectedCounty.name)}
                  className="w-full gap-2 bg-brand-red hover:bg-brand-red-dark text-white shadow-lg hover:shadow-xl transition-all"
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
