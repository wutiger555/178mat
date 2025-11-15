import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface CountyData {
  name: string;
  count: number;
  region: string;
}

/**
 * 台灣地圖視覺化組件 - 使用 Leaflet
 * 展示各縣市工程實績分佈
 */
export default function TaiwanMapChoropleth() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [selectedCounty, setSelectedCounty] = useState<CountyData | null>(null);
  const [countyData] = useState<Record<string, CountyData>>({
    '台北': { name: '台北', count: 45, region: '北部' },
    '新北': { name: '新北', count: 38, region: '北部' },
    '桃園': { name: '桃園', count: 28, region: '北部' },
    '新竹': { name: '新竹', count: 15, region: '北部' },
    '苗栗': { name: '苗栗', count: 8, region: '中部' },
    '台中': { name: '台中', count: 52, region: '中部' },
    '彰化': { name: '彰化', count: 12, region: '中部' },
    '南投': { name: '南投', count: 5, region: '中部' },
    '雲林': { name: '雲林', count: 6, region: '南部' },
    '嘉義': { name: '嘉義', count: 8, region: '南部' },
    '台南': { name: '台南', count: 18, region: '南部' },
    '高雄': { name: '高雄', count: 42, region: '南部' },
    '屏東': { name: '屏東', count: 10, region: '南部' },
    '宜蘭': { name: '宜蘭', count: 7, region: '東部' },
    '花蓮': { name: '花蓮', count: 4, region: '東部' },
    '台東': { name: '台東', count: 3, region: '東部' },
  });

  // 根據數量計算顏色
  const getColor = (count: number): string => {
    const maxCount = 52;
    const ratio = count / maxCount;
    if (ratio >= 0.8) return '#c41e3a';
    if (ratio >= 0.6) return '#d94a4a';
    if (ratio >= 0.4) return '#e67373';
    if (ratio >= 0.2) return '#f0a0a0';
    return '#f5d5d5';
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // 初始化地圖
    map.current = L.map(mapContainer.current).setView([23.8, 120.9], 7);

    // 添加地圖圖層
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // 定義台灣各縣市的坐標與邊界（簡化版）
    const countyBounds: Record<string, [[number, number], [number, number]]> = {
      '台北': [[25.15, 121.35], [25.25, 121.65]],
      '新北': [[24.85, 121.0], [25.35, 121.4]],
      '桃園': [[24.5, 120.6], [25.0, 121.0]],
      '新竹': [[24.0, 120.5], [24.5, 120.9]],
      '苗栗': [[23.8, 120.4], [24.4, 120.8]],
      '台中': [[23.4, 120.3], [24.3, 120.8]],
      '彰化': [[23.4, 120.3], [23.8, 120.7]],
      '南投': [[23.2, 120.6], [23.8, 121.0]],
      '雲林': [[23.2, 120.2], [23.7, 120.6]],
      '嘉義': [[22.8, 120.2], [23.4, 120.6]],
      '台南': [[22.4, 120.1], [23.2, 120.5]],
      '高雄': [[22.0, 120.2], [22.8, 120.6]],
      '屏東': [[21.8, 120.3], [22.5, 120.7]],
      '宜蘭': [[24.4, 121.7], [24.9, 122.0]],
      '花蓮': [[23.5, 121.7], [24.4, 122.0]],
      '台東': [[22.3, 121.7], [23.5, 122.0]],
    };

    // 為每個縣市添加矩形
    Object.entries(countyBounds).forEach(([name, bounds]) => {
      const data = countyData[name];
      if (!data) return;

      const rectangle = L.rectangle(bounds, {
        color: getColor(data.count),
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.7,
        fillColor: getColor(data.count),
      }).addTo(map.current!);

      // 添加標籤
      const center = [
        (bounds[0][0] + bounds[1][0]) / 2,
        (bounds[0][1] + bounds[1][1]) / 2,
      ] as [number, number];

      const popup = L.popup()
        .setLatLng(center)
        .setContent(`
          <div class="p-3 bg-white rounded-lg shadow-lg">
            <h4 class="font-bold text-foreground">${name}</h4>
            <p class="text-sm text-muted-foreground">工程實績: ${data.count} 項</p>
            <p class="text-xs text-muted-foreground mt-1">${data.region}</p>
          </div>
        `);

      rectangle.bindPopup(popup);

      // 點擊事件
      rectangle.on('click', () => {
        setSelectedCounty(data);
        rectangle.openPopup();
      });

      // 懸停效果
      rectangle.on('mouseover', () => {
        rectangle.setStyle({
          weight: 3,
          opacity: 1,
          fillOpacity: 0.9,
        });
      });

      rectangle.on('mouseout', () => {
        rectangle.setStyle({
          weight: 2,
          opacity: 0.8,
          fillOpacity: 0.7,
        });
      });
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

  const totalProjects = Object.values(countyData).reduce((sum, d) => sum + d.count, 0);

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
            <div className="text-xs opacity-75 mt-2">遍佈 {Object.keys(countyData).length} 個縣市</div>
          </div>

          {/* 圖例 */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              工程實績密度
            </h4>
            <div className="space-y-3">
              {[
                { label: '40+', color: '#c41e3a' },
                { label: '30-39', color: '#d94a4a' },
                { label: '20-29', color: '#e67373' },
                { label: '10-19', color: '#f0a0a0' },
                { label: '1-9', color: '#f5d5d5' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded border border-gray-300"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.label} 項</span>
                </div>
              ))}
            </div>
          </div>

          {/* 提示 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-900">
              💡 <span className="font-semibold">提示：</span> 點擊地圖上的縣市查看詳細資訊
            </p>
          </div>
        </motion.div>

        {/* 右側：地圖 */}
        <motion.div
          className="lg:col-span-3 bg-card rounded-lg p-8 border border-border overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">台灣服務範圍分佈</h3>
          <div
            ref={mapContainer}
            className="w-full h-96 rounded-lg border border-border overflow-hidden"
            style={{ minHeight: '400px' }}
          />
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
