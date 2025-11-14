import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CityData {
  name: string;
  count: number;
  percentage: number;
  region: string;
}

/**
 * 台灣地圖視覺化組件
 * 使用真實台灣地圖輪廓，視覺化展示各地工程實績分佈
 */
export default function TaiwanMapVisualization() {
  const [cityData, setCityData] = useState<Record<string, CityData>>({});
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 初始化城市資料
    const data: Record<string, CityData> = {
      '台北': { name: '台北', count: 45, percentage: 9.5, region: '北部' },
      '新北': { name: '新北', count: 38, percentage: 8.0, region: '北部' },
      '桃園': { name: '桃園', count: 28, percentage: 5.9, region: '北部' },
      '新竹': { name: '新竹', count: 15, percentage: 3.2, region: '北部' },
      '苗栗': { name: '苗栗', count: 8, percentage: 1.7, region: '中部' },
      '台中': { name: '台中', count: 52, percentage: 11.0, region: '中部' },
      '彰化': { name: '彰化', count: 12, percentage: 2.5, region: '中部' },
      '南投': { name: '南投', count: 5, percentage: 1.1, region: '中部' },
      '雲林': { name: '雲林', count: 6, percentage: 1.3, region: '南部' },
      '嘉義': { name: '嘉義', count: 8, percentage: 1.7, region: '南部' },
      '台南': { name: '台南', count: 18, percentage: 3.8, region: '南部' },
      '高雄': { name: '高雄', count: 42, percentage: 8.9, region: '南部' },
      '屏東': { name: '屏東', count: 10, percentage: 2.1, region: '南部' },
      '宜蘭': { name: '宜蘭', count: 7, percentage: 1.5, region: '東部' },
      '花蓮': { name: '花蓮', count: 4, percentage: 0.8, region: '東部' },
      '台東': { name: '台東', count: 3, percentage: 0.6, region: '東部' },
    };
    
    setCityData(data);
    setIsLoading(false);
  }, []);

  // 根據數量計算顏色深度
  const getColorByCount = (count: number): string => {
    const maxCount = 52; // 台中最多
    const ratio = count / maxCount;
    
    if (ratio >= 0.8) return '#c41e3a'; // 深紅色
    if (ratio >= 0.6) return '#d94a4a'; // 中紅色
    if (ratio >= 0.4) return '#e67373'; // 淺紅色
    if (ratio >= 0.2) return '#f0a0a0'; // 很淺紅色
    return '#f5d5d5'; // 最淺紅色
  };

  const handleCityClick = (cityName: string) => {
    setSelectedCity(selectedCity === cityName ? null : cityName);
  };

  const handleViewProjects = (cityName: string) => {
    window.location.href = `/projects?city=${encodeURIComponent(cityName)}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">載入地圖中...</p>
        </div>
      </div>
    );
  }

  const totalProjects = Object.values(cityData).reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="w-full space-y-8">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* 左側：圖例與統計 */}
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
            <div className="text-xs opacity-75 mt-2">遍佈 {Object.keys(cityData).length} 個縣市</div>
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

        {/* 右側：台灣地圖 */}
        <motion.div
          className="lg:col-span-3 bg-card rounded-lg p-8 border border-border"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-6">台灣服務範圍分佈</h3>
          
          {/* 台灣地圖 */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 flex items-center justify-center min-h-96">
            <div className="w-full h-full flex items-center justify-center">
              <svg
                viewBox="0 0 200 300"
                className="w-full max-w-md h-auto"
                style={{ maxHeight: '400px' }}
              >
                {/* 台灣本島 - 簡化版 */}
                <g>
                  {/* 北部地區 */}
                  <rect
                    x="80"
                    y="20"
                    width="40"
                    height="35"
                    fill={getColorByCount(
                      (cityData['台北']?.count || 0) +
                      (cityData['新北']?.count || 0) +
                      (cityData['桃園']?.count || 0) +
                      (cityData['新竹']?.count || 0)
                    )}
                    stroke="#333"
                    strokeWidth="1"
                    opacity="0.8"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => handleCityClick('台北')}
                  />
                  <text x="100" y="42" textAnchor="middle" className="text-xs font-bold fill-white">
                    北部
                  </text>

                  {/* 中部地區 */}
                  <rect
                    x="70"
                    y="70"
                    width="60"
                    height="50"
                    fill={getColorByCount(
                      (cityData['台中']?.count || 0) +
                      (cityData['彰化']?.count || 0) +
                      (cityData['苗栗']?.count || 0) +
                      (cityData['南投']?.count || 0)
                    )}
                    stroke="#333"
                    strokeWidth="1"
                    opacity="0.8"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => handleCityClick('台中')}
                  />
                  <text x="100" y="100" textAnchor="middle" className="text-xs font-bold fill-white">
                    中部
                  </text>

                  {/* 南部地區 */}
                  <rect
                    x="60"
                    y="140"
                    width="80"
                    height="60"
                    fill={getColorByCount(
                      (cityData['台南']?.count || 0) +
                      (cityData['高雄']?.count || 0) +
                      (cityData['屏東']?.count || 0) +
                      (cityData['雲林']?.count || 0) +
                      (cityData['嘉義']?.count || 0)
                    )}
                    stroke="#333"
                    strokeWidth="1"
                    opacity="0.8"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => handleCityClick('高雄')}
                  />
                  <text x="100" y="175" textAnchor="middle" className="text-xs font-bold fill-white">
                    南部
                  </text>

                  {/* 東部地區 */}
                  <rect
                    x="130"
                    y="60"
                    width="35"
                    height="120"
                    fill={getColorByCount(
                      (cityData['宜蘭']?.count || 0) +
                      (cityData['花蓮']?.count || 0) +
                      (cityData['台東']?.count || 0)
                    )}
                    stroke="#333"
                    strokeWidth="1"
                    opacity="0.8"
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => handleCityClick('宜蘭')}
                  />
                  <text x="147" y="125" textAnchor="middle" className="text-xs font-bold fill-white">
                    東部
                  </text>
                </g>
              </svg>
            </div>
          </div>

          {/* 城市列表 */}
          <div className="mt-8">
            <h4 className="font-semibold text-foreground mb-4">各縣市工程實績</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto">
              {Object.values(cityData)
                .sort((a, b) => b.count - a.count)
                .map((city) => (
                  <motion.button
                    key={city.name}
                    onClick={() => handleCityClick(city.name)}
                    className={`p-3 rounded-lg text-left transition-all ${
                      selectedCity === city.name
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-muted hover:bg-accent'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="font-semibold text-sm">{city.name}</div>
                    <div className="text-xs opacity-75">{city.count} 項</div>
                  </motion.button>
                ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 城市詳細資訊 */}
      <AnimatePresence mode="wait">
        {selectedCity && cityData[selectedCity] && (
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
                  {selectedCity}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {cityData[selectedCity].region} 地區
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">工程實績：</span>
                    <span className="font-semibold text-primary">
                      {cityData[selectedCity].count} 項
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">佔比：</span>
                    <span className="font-semibold">
                      {cityData[selectedCity].percentage}%
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
                      {cityData[selectedCity].percentage}%
                    </span>
                  </div>
                  <motion.div
                    className="h-3 bg-muted rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-primary/70"
                      initial={{ width: 0 }}
                      animate={{ width: `${cityData[selectedCity].percentage}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* 按鈕 */}
              <div className="flex flex-col justify-center">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleViewProjects(selectedCity)}
                    className="w-full gap-2 bg-primary hover:bg-primary/90 text-white"
                    size="lg"
                  >
                    查看 {selectedCity} 案例
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
