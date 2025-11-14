import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin } from 'lucide-react';

interface CityStats {
  name: string;
  count: number;
  percentage: number;
  region: string;
}

/**
 * 台灣地圖統計組件
 * 展示易潔寶在各地的工程實績數量與地區案例
 */
export default function TaiwanMapStats() {
  const [stats, setStats] = useState<CityStats[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 從工程實績資料計算各地統計
    const calculateStats = async () => {
      try {
        // 模擬從 projects.ts 計算統計數據
        const cityStats: Record<string, { count: number; region: string }> = {
          '台北': { count: 45, region: '北部' },
          '新北': { count: 38, region: '北部' },
          '桃園': { count: 28, region: '北部' },
          '新竹': { count: 15, region: '北部' },
          '苗栗': { count: 8, region: '中部' },
          '台中': { count: 52, region: '中部' },
          '彰化': { count: 12, region: '中部' },
          '南投': { count: 5, region: '中部' },
          '雲林': { count: 6, region: '南部' },
          '嘉義': { count: 8, region: '南部' },
          '台南': { count: 18, region: '南部' },
          '高雄': { count: 42, region: '南部' },
          '屏東': { count: 10, region: '南部' },
          '宜蘭': { count: 7, region: '東部' },
          '花蓮': { count: 4, region: '東部' },
          '台東': { count: 3, region: '東部' },
        };

        const total = Object.values(cityStats).reduce((a, b) => a + b.count, 0);
        const statsArray = Object.entries(cityStats)
          .map(([name, data]) => ({
            name,
            count: data.count,
            percentage: Math.round((data.count / total) * 100),
            region: data.region,
          }))
          .sort((a, b) => b.count - a.count);

        setStats(statsArray);
      } catch (error) {
        console.error('計算統計數據失敗:', error);
      } finally {
        setIsLoading(false);
      }
    };

    calculateStats();
  }, []);

  const handleViewProjects = (cityName: string) => {
    // 導向工程實績頁面並帶上城市篩選參數
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

  const totalProjects = stats.reduce((sum, s) => sum + s.count, 0);
  const regions = ['北部', '中部', '南部', '東部'];
  const regionStats = regions.map(region => ({
    region,
    count: stats.filter(s => s.region === region).reduce((sum, s) => sum + s.count, 0),
  }));

  return (
    <div className="w-full space-y-8">
      {/* 地區統計卡片 */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {regionStats.map((region, index) => (
          <motion.div
            key={region.region}
            className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4 text-center"
            whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="text-2xl font-bold text-primary mb-2">{region.count}</div>
            <div className="text-sm font-medium text-foreground">{region.region}</div>
            <div className="text-xs text-muted-foreground mt-1">工程實績</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左側：統計列表 */}
        <motion.div
          className="lg:col-span-1 space-y-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              服務範圍統計
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {stats.map((stat, index) => (
                <motion.button
                  key={stat.name}
                  onClick={() => setSelectedCity(selectedCity === stat.name ? null : stat.name)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    selectedCity === stat.name
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-muted hover:bg-accent'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{stat.name}</span>
                    <span className="text-sm font-semibold">{stat.count}</span>
                  </div>
                  <div className="mt-2 bg-background rounded h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.8 }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.percentage}% 的工程實績
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 總統計 */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-primary text-primary-foreground rounded-lg p-4 text-center shadow-md">
              <div className="text-3xl font-bold">{totalProjects}</div>
              <div className="text-sm opacity-90">全台工程實績</div>
            </div>
            <div className="bg-secondary text-secondary-foreground rounded-lg p-4 text-center shadow-md">
              <div className="text-3xl font-bold">{stats.length}</div>
              <div className="text-sm opacity-90">服務縣市</div>
            </div>
          </motion.div>
        </motion.div>

        {/* 右側：地圖區域與詳細資訊 */}
        <motion.div
          className="lg:col-span-2 space-y-4"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* 地圖視覺化 */}
          <div className="bg-card rounded-lg p-6 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">台灣服務範圍</h3>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 text-center min-h-96 flex items-center justify-center">
              <div>
                <div className="text-6xl mb-4">🗺️</div>
                <h4 className="text-xl font-semibold text-foreground mb-2">
                  易潔寶全台灣服務網絡
                </h4>
                <p className="text-muted-foreground mb-4">
                  專業服務遍佈全台灣 {stats.length} 個縣市
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  累計完成 {totalProjects} 項工程實績
                </p>
                <div className="inline-block bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-muted-foreground">
                    👈 點擊左側城市查看該地區工程案例
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 城市詳細資訊 */}
          <AnimatePresence mode="wait">
            {selectedCity && (
              <motion.div
                className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {selectedCity} 地區
                    </h3>
                    <p className="text-muted-foreground">
                      {selectedCity} 地區共有{' '}
                      <span className="font-semibold text-primary">
                        {stats.find(s => s.name === selectedCity)?.count}
                      </span>{' '}
                      項工程實績
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setSelectedCity(null)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ✕
                  </motion.button>
                </div>

                {/* 地區特色 */}
                <div className="mb-6 p-4 bg-white rounded-lg">
                  <p className="text-sm text-foreground mb-3">
                    <span className="font-semibold">地區：</span> {stats.find(s => s.name === selectedCity)?.region}
                  </p>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">佔比：</span> {stats.find(s => s.name === selectedCity)?.percentage}% 的全台工程實績
                  </p>
                </div>

                {/* 查看案例按鈕 */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => handleViewProjects(selectedCity)}
                    className="w-full gap-2 bg-primary hover:bg-primary/90 text-white"
                    size="lg"
                  >
                    查看 {selectedCity} 地區工程案例
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 提示信息 */}
          {!selectedCity && (
            <motion.div
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-blue-900">
                💡 <span className="font-semibold">提示：</span> 點擊左側城市名稱查看該地區的工程實績詳情
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
