/**
 * 媒體庫管理頁面
 */

import { useState } from 'react';
import { useCMSData } from '../hooks/useCMSData';
import AdminLayout from '../components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Image as ImageIcon,
  Video,
  Plus,
  Edit,
  Trash2,
  Search,
  Youtube,
  ExternalLink
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

// 常用圖片列表
const AVAILABLE_IMAGES = [
  { path: '/images/hero-mat-1.jpg', category: 'heroes', name: '首頁輪播 1' },
  { path: '/images/hero-mat-2.jpg', category: 'heroes', name: '首頁輪播 2' },
  { path: '/images/hero-mat-3.jpg', category: 'heroes', name: '首頁輪播 3' },
  { path: '/images/logo.png', category: 'logos', name: '主要標誌' },
  { path: '/images/logo-nav.png', category: 'logos', name: '導航標誌' },
];

export default function MediaManager() {
  const { data, loading, exportData } = useCMSData();
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [searchQuery, setSearchQuery] = useState('');
  const [videoFormOpen, setVideoFormOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);

  const [videoForm, setVideoForm] = useState({
    id: '',
    title: '',
    description: '',
    videoId: '',
    category: 'project',
  });

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

  const videos = data?.youtubeVideos || [];

  // 過濾影片
  const filteredVideos = videos.filter((video) => {
    const query = searchQuery.toLowerCase();
    return (
      video.title.toLowerCase().includes(query) ||
      video.description?.toLowerCase().includes(query)
    );
  });

  // 過濾圖片
  const filteredImages = AVAILABLE_IMAGES.filter((img) => {
    const query = searchQuery.toLowerCase();
    return (
      img.name.toLowerCase().includes(query) ||
      img.path.toLowerCase().includes(query)
    );
  });

  const handleVideoFormOpen = (video?: any) => {
    if (video) {
      setEditingVideo(video);
      setVideoForm({
        id: video.id,
        title: video.title,
        description: video.description || '',
        videoId: video.id,
        category: video.type || 'project',
      });
    } else {
      setEditingVideo(null);
      setVideoForm({
        id: '',
        title: '',
        description: '',
        videoId: '',
        category: 'project',
      });
    }
    setVideoFormOpen(true);
  };

  const handleVideoSave = () => {
    // TODO: 整合到 CMS 資料管理
    toast.success('影片資訊已儲存');
    setVideoFormOpen(false);
  };

  return (
    <AdminLayout onExport={exportData}>
      <div className="space-y-6">
        {/* 頁面標題 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">媒體庫</h2>
            <p className="text-gray-600 mt-1">管理圖片與影片資源</p>
          </div>
        </div>

        {/* 標籤切換 */}
        <div className="flex gap-2 border-b">
          <button
            onClick={() => setActiveTab('images')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'images'
                ? 'text-[#C4A052] border-b-2 border-[#C4A052]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              圖片庫
            </div>
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === 'videos'
                ? 'text-[#C4A052] border-b-2 border-[#C4A052]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              YouTube 影片
            </div>
          </button>
        </div>

        {/* 搜尋列 */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={activeTab === 'images' ? '搜尋圖片...' : '搜尋影片...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* 圖片庫 */}
        {activeTab === 'images' && (
          <div className="space-y-6">
            {/* 統計 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">總圖片數</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {AVAILABLE_IMAGES.length}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 圖片網格 */}
            <Card>
              <CardHeader>
                <CardTitle>可用圖片</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredImages.map((img) => (
                    <div
                      key={img.path}
                      className="group relative border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        <img
                          src={img.path}
                          alt={img.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
                          }}
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-sm truncate">{img.name}</p>
                        <p className="text-xs text-gray-500 truncate">{img.path}</p>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white"
                          onClick={() => {
                            navigator.clipboard.writeText(img.path);
                            toast.success('路徑已複製到剪貼簿');
                          }}
                        >
                          複製路徑
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredImages.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>找不到符合的圖片</p>
                  </div>
                )}

                {/* 提示 */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                  <p className="font-semibold mb-2">💡 如何新增圖片？</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>將圖片檔案放到 <code className="bg-blue-100 px-1 rounded">public/images/</code> 目錄</li>
                    <li>建議分類放置：projects/、products/ 等</li>
                    <li>重新整理此頁面即可看到新圖片</li>
                  </ol>
                  <p className="mt-2">
                    詳細說明請參考：
                    <a href="/docs/IMAGE_UPLOAD_GUIDE.md" className="text-blue-600 underline ml-1">
                      圖片上傳指南
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* YouTube 影片 */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            {/* 統計與操作 */}
            <div className="flex items-center justify-between">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-gray-600 text-sm">總影片數</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {videos.length}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Button
                onClick={() => handleVideoFormOpen()}
                className="gap-2 bg-[#C4A052] hover:bg-[#B39048] ml-4"
              >
                <Plus className="w-4 h-4" />
                新增影片
              </Button>
            </div>

            {/* 影片列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    {/* 影片縮圖 */}
                    <div className="relative aspect-video bg-gray-100">
                      <img
                        src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                        <a
                          href={`https://www.youtube.com/watch?v=${video.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <Youtube className="w-12 h-12 text-white" />
                        </a>
                      </div>
                    </div>

                    {/* 影片資訊 */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-lg line-clamp-2">{video.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                          {video.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <span className="text-xs text-gray-500">
                          ID: {video.id}
                        </span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVideoFormOpen(video)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <a
                              href={`https://www.youtube.com/watch?v=${video.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center text-gray-500">
                    <Youtube className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>找不到符合的影片</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* 影片編輯表單 */}
      <Dialog open={videoFormOpen} onOpenChange={setVideoFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader onClose={() => setVideoFormOpen(false)}>
            <DialogTitle>
              {editingVideo ? '編輯影片' : '新增影片'}
            </DialogTitle>
            <DialogDescription>
              填寫 YouTube 影片資訊
            </DialogDescription>
          </DialogHeader>

          <DialogBody className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="videoId">
                YouTube 影片 ID <span className="text-red-500">*</span>
              </Label>
              <Input
                id="videoId"
                value={videoForm.videoId}
                onChange={(e) => setVideoForm({ ...videoForm, videoId: e.target.value })}
                placeholder="例：dDw47aMuScw"
              />
              <p className="text-xs text-gray-500">
                從 YouTube 網址中取得，例如 youtube.com/watch?v=<strong>dDw47aMuScw</strong>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">
                影片標題 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={videoForm.title}
                onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                placeholder="例：嵌入式刮泥墊施工參考"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">影片描述</Label>
              <Textarea
                id="description"
                value={videoForm.description}
                onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                placeholder="描述影片內容..."
                rows={3}
              />
            </div>

            {videoForm.videoId && (
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${videoForm.videoId}/maxresdefault.jpg`}
                  alt="預覽"
                  className="w-full"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://img.youtube.com/vi/${videoForm.videoId}/hqdefault.jpg`;
                  }}
                />
              </div>
            )}
          </DialogBody>

          <DialogFooter>
            <Button variant="outline" onClick={() => setVideoFormOpen(false)}>
              取消
            </Button>
            <Button
              onClick={handleVideoSave}
              className="bg-[#C4A052] hover:bg-[#B39048]"
            >
              儲存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
