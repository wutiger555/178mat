/**
 * 工程實績管理頁面
 */

import { useState } from 'react';
import { useCMSData } from '../hooks/useCMSData';
import AdminLayout from '../components/AdminLayout';
import ProjectForm from '../components/ProjectForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Edit, Trash2, Search, MapPin, Calendar } from 'lucide-react';
import { Project } from '@/data/projects';
import { toast } from 'sonner';

export default function ProjectsManager() {
  const { data, loading, deleteProject, addProject, updateProject, exportData } = useCMSData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

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

  const projects = data?.projects || [];

  // 搜尋過濾
  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.location.toLowerCase().includes(query) ||
      project.city.toLowerCase().includes(query)
    );
  });

  const handleDelete = (projectId: string) => {
    if (confirm('確定要刪除此工程實績？')) {
      deleteProject(projectId);
      toast.success('工程實績已刪除');
    }
  };

  const handleCreate = () => {
    setSelectedProject(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleSave = (project: Project) => {
    if (formMode === 'create') {
      addProject(project);
      toast.success('工程實績已新增');
    } else {
      updateProject(project.id, project);
      toast.success('工程實績已更新');
    }
    setFormOpen(false);
  };

  return (
    <AdminLayout onExport={exportData}>
      <div className="space-y-6">
        {/* 頁面標題 */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">工程實績管理</h2>
            <p className="text-gray-600 mt-1">管理所有工程案例與實績</p>
          </div>
          <Button className="gap-2 bg-[#C4A052] hover:bg-[#B39048]" onClick={handleCreate}>
            <Plus className="w-4 h-4" />
            新增工程實績
          </Button>
        </div>

        {/* 搜尋列 */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="搜尋工程名稱、地點、城市..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* 統計資訊 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm">總工程數</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{projects.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm">搜尋結果</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {filteredProjects.length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-gray-600 text-sm">最新年份</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {Math.max(...projects.map((p) => p.year))}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 工程列表 */}
        <div className="grid grid-cols-1 gap-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* 縮圖 */}
                  <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                    {project.images && project.images.length > 0 ? (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        無圖片
                      </div>
                    )}
                  </div>

                  {/* 資訊 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {project.city} {project.district}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year} 年</span>
                      </div>
                    </div>
                    <p className="text-gray-600 line-clamp-2">{project.description}</p>

                    {/* 標籤 */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {project.tags.buildingType.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 操作按鈕 */}
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit className="w-4 h-4" />
                      編輯
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      刪除
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 空狀態 */}
        {filteredProjects.length === 0 && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-gray-500">
                <p>找不到符合條件的工程實績</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 編輯表單 */}
      <ProjectForm
        open={formOpen}
        onOpenChange={setFormOpen}
        project={selectedProject}
        onSave={handleSave}
        mode={formMode}
      />
    </AdminLayout>
  );
}
