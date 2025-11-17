/**
 * 管理後台主佈局
 */

import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard,
  FolderOpen,
  Package,
  Image,
  Settings,
  Home,
  Download,
  Upload,
  RotateCcw,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
  onExport?: () => void;
  onImport?: () => void;
  onReset?: () => void;
}

export default function AdminLayout({
  children,
  onExport,
  onImport,
  onReset
}: AdminLayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { path: '/admin', label: '儀表板', icon: LayoutDashboard },
    { path: '/admin/projects', label: '工程實績', icon: FolderOpen },
    { path: '/admin/products', label: '產品管理', icon: Package },
    { path: '/admin/media', label: '媒體庫', icon: Image },
    { path: '/admin/map', label: '地圖管理', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 頂部導航 */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">易潔寶管理後台</h1>
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-2">
                  <Home className="w-4 h-4" />
                  返回網站
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              {onExport && (
                <Button variant="outline" size="sm" onClick={onExport} className="gap-2">
                  <Download className="w-4 h-4" />
                  匯出資料
                </Button>
              )}
              {onImport && (
                <Button variant="outline" size="sm" onClick={onImport} className="gap-2">
                  <Upload className="w-4 h-4" />
                  匯入資料
                </Button>
              )}
              {onReset && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onReset}
                  className="gap-2 text-red-600 hover:text-red-700"
                >
                  <RotateCcw className="w-4 h-4" />
                  重置
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex pt-20">
        {/* 側邊導航 */}
        <aside className="w-64 bg-white border-r border-gray-200 fixed left-0 top-20 bottom-0 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;

              return (
                <Link key={item.path} href={item.path}>
                  <a
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive
                        ? 'bg-[#C4A052] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* 主內容區 */}
        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
