import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Hotel,
  Plane,
  Factory,
  Hospital,
  ShoppingCart,
  Grid3x3,
  Ruler,
  Palette,
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
  Maximize2,
  RotateCcw,
  Award,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import MatScene3D from '@/components/MatScene3D';
import SEO from '@/components/SEO';
import {
  showcaseScenes,
  materialTypes,
  brandComparisons,
  performanceData,
  ShowcaseScene,
  MaterialType,
} from '@/data/showcase-scenes';

const sceneIcons = {
  '🏢': Building2,
  '🏨': Hotel,
  '✈️': Plane,
  '🏭': Factory,
  '🏥': Hospital,
  '🏬': ShoppingCart,
};

export default function Showcase3D() {
  const [selectedScene, setSelectedScene] = useState<ShowcaseScene>(showcaseScenes[0]);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | undefined>();
  const [showGrid, setShowGrid] = useState(false);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSceneIndex = showcaseScenes.findIndex((s) => s.id === selectedScene.id);

  const handleNextScene = () => {
    const nextIndex = (currentSceneIndex + 1) % showcaseScenes.length;
    setSelectedScene(showcaseScenes[nextIndex]);
  };

  const handlePrevScene = () => {
    const prevIndex = currentSceneIndex === 0 ? showcaseScenes.length - 1 : currentSceneIndex - 1;
    setSelectedScene(showcaseScenes[prevIndex]);
  };

  return (
    <>
      <SEO
        title="3D 鋁合金除泥地墊展示 | 易潔寶專業解決方案"
        description="探索易潔寶專業鋁合金除泥地墊在飯店、機場、辦公大樓的 3D 應用展示。提供互動式場景、技術規格與國際品牌對比。"
        keywords="3D地墊展示, 鋁合金除泥地墊, 建築材料, 易潔寶, 互動展示"
      />

      <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
        {/* Hero Section with 3D Scene */}
        <section className="relative h-screen w-full">
          {/* 3D Canvas Container */}
          <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'absolute inset-0'}`}>
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center bg-gradient-to-b from-blue-50 to-white">
                  <div className="text-center">
                    <div className="mb-4 inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                    <p className="text-lg text-neutral-600">載入 3D 場景中...</p>
                  </div>
                </div>
              }
            >
              <MatScene3D
                scene={selectedScene}
                material={selectedMaterial}
                showGrid={showGrid}
                showMeasurements={showMeasurements}
              />
            </Suspense>
          </div>

          {/* Scene Selector - Left Sidebar */}
          <div className="absolute left-0 top-0 z-10 h-full w-80 bg-gradient-to-r from-white/95 to-transparent p-6 backdrop-blur-sm">
            <div className="flex h-full flex-col">
              <div className="mb-6">
                <h1 className="mb-2 text-3xl font-bold text-neutral-900">3D 展示間</h1>
                <p className="text-sm text-neutral-600">探索專業鋁合金除泥地墊應用</p>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto">
                {showcaseScenes.map((scene) => {
                  const Icon = sceneIcons[scene.icon as keyof typeof sceneIcons] || Building2;
                  const isActive = scene.id === selectedScene.id;

                  return (
                    <motion.button
                      key={scene.id}
                      onClick={() => setSelectedScene(scene)}
                      className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                        isActive
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-neutral-200 bg-white hover:border-primary/50 hover:shadow-sm'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`rounded-lg p-2 ${
                            isActive ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1 font-semibold text-neutral-900">{scene.name}</h3>
                          <p className="mb-2 text-xs text-neutral-500">{scene.type}</p>
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="secondary" className="text-xs">
                              {scene.matSystem.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation Arrows */}
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevScene}
                  className="flex-1"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  上一個
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextScene}
                  className="flex-1"
                >
                  下一個
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Control Panel - Right Sidebar */}
          <div className="absolute right-0 top-0 z-10 w-80 bg-gradient-to-l from-white/95 to-transparent p-6 backdrop-blur-sm">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">場景控制</CardTitle>
                <CardDescription>調整 3D 展示選項</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* View Controls */}
                <div>
                  <label className="mb-2 block text-sm font-medium">視圖選項</label>
                  <div className="space-y-2">
                    <Button
                      variant={showGrid ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setShowGrid(!showGrid)}
                      className="w-full justify-start"
                    >
                      <Grid3x3 className="mr-2 h-4 w-4" />
                      網格輔助線
                    </Button>
                    <Button
                      variant={showMeasurements ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setShowMeasurements(!showMeasurements)}
                      className="w-full justify-start"
                    >
                      <Ruler className="mr-2 h-4 w-4" />
                      尺寸標註
                    </Button>
                  </div>
                </div>

                {/* Material Selector */}
                <div>
                  <label className="mb-2 block text-sm font-medium">材質選擇</label>
                  <div className="space-y-2">
                    {materialTypes.slice(0, 4).map((mat) => (
                      <Button
                        key={mat.id}
                        variant={selectedMaterial?.id === mat.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedMaterial(mat)}
                        className="w-full justify-start"
                      >
                        <Palette className="mr-2 h-4 w-4" />
                        {mat.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="w-full"
                  >
                    <Maximize2 className="mr-2 h-4 w-4" />
                    {isFullscreen ? '退出全螢幕' : '全螢幕模式'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowGrid(false);
                      setShowMeasurements(false);
                      setSelectedMaterial(undefined);
                    }}
                    className="w-full"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    重置設定
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scene Info Bar - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-white/95 to-transparent p-6 backdrop-blur-sm">
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="mb-1 text-xs text-neutral-500">建築類型</p>
                    <p className="font-semibold text-neutral-900">{selectedScene.type}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-neutral-500">地墊系統</p>
                    <p className="font-semibold text-neutral-900">{selectedScene.matSystem.type}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-neutral-500">框架</p>
                    <p className="font-semibold text-neutral-900">{selectedScene.matSystem.frame}</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-neutral-500">面料</p>
                    <p className="font-semibold text-neutral-900">{selectedScene.matSystem.surface}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Scene Details Section */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            key={selectedScene.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-neutral-900">{selectedScene.name}</h2>
              <p className="mx-auto max-w-2xl text-lg text-neutral-600">{selectedScene.description}</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Key Features */}
              <Card>
                <CardHeader>
                  <CardTitle>關鍵特性</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedScene.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Technical Specs */}
              <Card>
                <CardHeader>
                  <CardTitle>技術規格</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-neutral-500">建議面積</p>
                    <p className="font-semibold text-neutral-900">{selectedScene.technicalSpecs.area}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">人流量級別</p>
                    <p className="font-semibold text-neutral-900">{selectedScene.technicalSpecs.traffic}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">深度</p>
                    <p className="font-semibold text-neutral-900">{selectedScene.matSystem.depth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">排水系統</p>
                    <p className="font-semibold text-neutral-900">
                      {selectedScene.matSystem.drainage ? '✓ 已配置' : '無需排水'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendation */}
              <Card>
                <CardHeader>
                  <CardTitle>專家建議</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-neutral-700">
                    {selectedScene.technicalSpecs.recommendation}
                  </p>
                  <div className="mt-6 space-y-2">
                    <Button className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      下載技術規格書
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Info className="mr-2 h-4 w-4" />
                      查看安裝指南
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* Brand Comparison Section */}
        <section className="bg-neutral-50 py-20">
          <div className="container mx-auto px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-neutral-900">產品競爭力分析</h2>
              <p className="mx-auto max-w-2xl text-lg text-neutral-600">
                易潔寶與台灣及進口品牌的專業比較
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Badge variant="secondary" className="gap-2">
                  <Award className="h-4 w-4" />
                  專利設計認證
                </Badge>
                <Badge variant="secondary" className="gap-2">
                  <Shield className="h-4 w-4" />
                  CNS 14705-1 防火認證
                </Badge>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="border p-4 text-left">品牌</th>
                    <th className="border p-4 text-left">產地</th>
                    <th className="border p-4 text-left">深度</th>
                    <th className="border p-4 text-left">材質</th>
                    <th className="border p-4 text-left">承重</th>
                    <th className="border p-4 text-left">防火認證</th>
                    <th className="border p-4 text-left">專利</th>
                    <th className="border p-4 text-left">保固</th>
                    <th className="border p-4 text-left">客製化</th>
                    <th className="border p-4 text-left">價格</th>
                  </tr>
                </thead>
                <tbody>
                  {brandComparisons.map((brand, index) => (
                    <tr
                      key={brand.brand}
                      className={`${
                        index === 0
                          ? 'bg-primary/5 font-semibold'
                          : 'hover:bg-neutral-50'
                      }`}
                    >
                      <td className="border p-4">{brand.brand}</td>
                      <td className="border p-4">{brand.country}</td>
                      <td className="border p-4">{brand.depth}</td>
                      <td className="border p-4">{brand.material}</td>
                      <td className="border p-4">{brand.loadCapacity}</td>
                      <td className="border p-4">
                        {brand.fireRating.includes('✓✓') ? (
                          <span className="font-semibold text-green-600">{brand.fireRating}</span>
                        ) : (
                          brand.fireRating
                        )}
                      </td>
                      <td className="border p-4">
                        {brand.patent.includes('✓✓') ? (
                          <span className="font-semibold text-blue-600">{brand.patent}</span>
                        ) : (
                          brand.patent
                        )}
                      </td>
                      <td className="border p-4">{brand.warranty}</td>
                      <td className="border p-4">
                        {'⭐'.repeat(brand.customization)}
                      </td>
                      <td className="border p-4">{brand.priceRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Performance Data Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-neutral-900">性能數據</h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-600">
              專業測試驗證的卓越性能
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>除塵效率</CardTitle>
                <CardDescription>vs 硬地面比較</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="mb-2 flex items-end justify-between">
                    <span className="text-sm text-neutral-600">硬地面</span>
                    <span className="text-2xl font-bold text-neutral-400">
                      {performanceData.dustRemoval.hardFloor}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-200">
                    <div
                      className="h-2 rounded-full bg-neutral-400"
                      style={{ width: `${performanceData.dustRemoval.hardFloor}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-end justify-between">
                    <span className="text-sm text-neutral-600">易潔寶地墊</span>
                    <span className="text-2xl font-bold text-primary">
                      {performanceData.dustRemoval.easyClean}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-neutral-200">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${performanceData.dustRemoval.easyClean}%` }}
                    />
                  </div>
                </div>
                <p className="mt-4 text-center text-sm font-semibold text-green-600">
                  {performanceData.dustRemoval.improvement}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>成本節約</CardTitle>
                <CardDescription>長期投資效益</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-600">清潔成本降低</p>
                  <p className="text-3xl font-bold text-primary">
                    {performanceData.costSavings.cleaningCost}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">地板壽命延長</p>
                  <p className="text-3xl font-bold text-green-600">
                    +{performanceData.costSavings.floorLifeExtension}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">投資回收期</p>
                  <p className="text-xl font-semibold text-neutral-900">
                    {performanceData.costSavings.roiPeriod}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>耐用性</CardTitle>
                <CardDescription>長期使用保證</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-600">測試週期數</p>
                  <p className="text-3xl font-bold text-primary">
                    {(performanceData.durability.passCycles / 10000).toFixed(0)}萬次
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">預期使用壽命</p>
                  <p className="text-xl font-semibold text-neutral-900">
                    {performanceData.durability.lifespan}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">保固期限</p>
                  <p className="text-xl font-semibold text-green-600">
                    {performanceData.durability.warrantyYears} 年+
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-20 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="mb-4 text-4xl font-bold">準備開始您的專案？</h2>
            <p className="mb-8 text-xl text-blue-100">
              讓我們的專業團隊為您提供量身打造的解決方案
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <a href="/contact">立即諮詢</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="mr-2 h-5 w-5" />
                下載產品目錄
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
