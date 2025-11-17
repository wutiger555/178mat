/**
 * 管理後台儀表板
 */

import { useCMSData } from '../hooks/useCMSData';
import AdminLayout from '../components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Package, Image, Calendar, Download, FileDown } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { exportAllData } from '../utils/storage';
import { toast } from 'sonner';

export default function Dashboard() {
  const { data, loading, exportData, importData, reset } = useCMSData();

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        try {
          importData(content);
          alert('資料匯入成功！');
        } catch (error) {
          alert('資料匯入失敗，請檢查檔案格式');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleReset = () => {
    if (confirm('確定要重置所有資料？此操作無法復原。')) {
      reset();
      alert('資料已重置');
    }
  };

  const handleExportAll = () => {
    try {
      exportAllData();
      toast.success('所有資料已匯出！請將檔案放到 public/data/ 目錄後提交到 GitHub', {
        duration: 5000,
      });
    } catch (error) {
      toast.error('匯出失敗，請稍後再試');
    }
  };

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

  const stats = [
    {
      title: '工程實績',
      value: data?.projects?.length || 0,
      icon: FolderOpen,
      link: '/admin/projects',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: '產品型錄',
      value: data?.products?.length || 0,
      icon: Package,
      link: '/admin/products',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'YouTube 影片',
      value: data?.youtubeVideos?.length || 0,
      icon: Image,
      link: '/admin/media',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <AdminLayout onExport={exportData} onImport={handleImport} onReset={handleReset}>
      <div className="space-y-8">
        {/* 歡迎區 */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">歡迎回來！</h2>
          <p className="text-gray-600">
            這是易潔寶網站的管理後台，您可以在這裡管理所有內容
          </p>
        </div>

        {/* 統計卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                    <Link href={stat.link}>
                      <Button variant="ghost" size="sm">
                        查看 →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 最後更新時間 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              系統資訊
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">最後更新時間</span>
              <span className="font-medium">
                {data?.lastUpdated
                  ? new Date(data.lastUpdated).toLocaleString('zh-TW')
                  : '未知'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">版本</span>
              <span className="font-medium">{data?.version || '1.0.0'}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">資料存儲</span>
              <span className="font-medium text-green-600">本地 LocalStorage</span>
            </div>
          </CardContent>
        </Card>

        {/* 快速操作 */}
        <Card>
          <CardHeader>
            <CardTitle>快速開始</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/admin/projects">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FolderOpen className="w-4 h-4" />
                  管理工程實績
                </Button>
              </Link>
              <Link href="/admin/products">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Package className="w-4 h-4" />
                  管理產品型錄
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 發布到網站 */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900 flex items-center gap-2">
              <FileDown className="w-6 h-6" />
              發布更新到網站
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-green-800">
              完成編輯後，點擊下方按鈕匯出所有資料，然後按照說明同步到網站。
            </p>
            <Button
              onClick={handleExportAll}
              className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
              size="lg"
            >
              <Download className="w-5 h-5" />
              匯出所有資料（CMS + 地圖 + 設定）
            </Button>
            <div className="bg-white rounded-lg p-4 text-sm text-green-900 space-y-2">
              <p className="font-semibold">📝 發布步驟：</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>點擊上方按鈕，下載 <code className="bg-green-100 px-1 rounded">cms-data.json</code> 和 <code className="bg-green-100 px-1 rounded">website-settings.json</code></li>
                <li>將下載的檔案放到專案的 <code className="bg-green-100 px-1 rounded">public/data/</code> 目錄（取代舊檔案）</li>
                <li>在終端機執行：<code className="bg-green-100 px-1 rounded">git add . && git commit -m "更新網站內容" && git push</code></li>
                <li>等待 GitHub Actions 自動部署（約 2-3 分鐘）</li>
                <li>完成！所有人都能看到更新後的內容</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* 使用說明 */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">💡 使用提示</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800 space-y-2">
            <p>1. 在管理後台編輯完內容後，資料會自動儲存到瀏覽器</p>
            <p>2. 編輯時的資料只存在你的電腦上（LocalStorage）</p>
            <p>3. 必須使用「匯出資料」功能並提交到 GitHub 才會發布到網站</p>
            <p>4. 網站部署後會優先讀取 <code className="bg-blue-100 px-1 rounded">public/data/</code> 中的檔案</p>
            <p>5. 定期備份資料以防意外</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
