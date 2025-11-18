/**
 * CMS 資料管理 Hook
 */

import { useState, useEffect, useCallback } from 'react';
import {
  CMSData,
  initializeCMSData,
  saveCMSData,
  loadCMSData,
  downloadJSON,
  importFromJSON,
  resetToDefault,
  restoreBackup,
} from '../utils/storage';
import { Project } from '@/data/projects';
import { Product } from '@/data/products';

export function useCMSData() {
  const [data, setData] = useState<CMSData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 初始化資料
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const cmsData = await initializeCMSData();
        setData(cmsData);
        setError(null);
      } catch (e) {
        setError('Failed to initialize CMS data');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // 儲存資料
  const save = useCallback(() => {
    if (!data) return;
    try {
      saveCMSData(data);
      setError(null);
    } catch (e) {
      setError('Failed to save data');
      console.error(e);
    }
  }, [data]);

  // 更新工程實績
  const updateProject = useCallback(
    (projectId: string, updates: Partial<Project>) => {
      if (!data) return;

      const newData = {
        ...data,
        projects: data.projects.map((p) =>
          p.id === projectId ? { ...p, ...updates } : p
        ),
      };

      setData(newData);
      saveCMSData(newData);
    },
    [data]
  );

  // 新增工程實績
  const addProject = useCallback(
    (project: Project) => {
      if (!data) return;

      const newData = {
        ...data,
        projects: [...data.projects, project],
      };

      setData(newData);
      saveCMSData(newData);
    },
    [data]
  );

  // 刪除工程實績
  const deleteProject = useCallback(
    (projectId: string) => {
      if (!data) return;

      const newData = {
        ...data,
        projects: data.projects.filter((p) => p.id !== projectId),
      };

      setData(newData);
      saveCMSData(newData);
    },
    [data]
  );

  // 更新產品
  const updateProduct = useCallback(
    (productId: string, updates: Partial<Product>) => {
      if (!data) return;

      const newData = {
        ...data,
        products: data.products.map((p) =>
          p.id === productId ? { ...p, ...updates } : p
        ),
      };

      setData(newData);
      saveCMSData(newData);
    },
    [data]
  );

  // 新增產品
  const addProduct = useCallback(
    (product: Product) => {
      if (!data) return;

      const newData = {
        ...data,
        products: [...data.products, product],
      };

      setData(newData);
      saveCMSData(newData);
    },
    [data]
  );

  // 刪除產品
  const deleteProduct = useCallback(
    (productId: string) => {
      if (!data) return;

      const newData = {
        ...data,
        products: data.products.filter((p) => p.id !== productId),
      };

      setData(newData);
      saveCMSData(newData);
    },
    [data]
  );

  // 匯出資料
  const exportData = useCallback(() => {
    if (!data) return;
    downloadJSON(data);
  }, [data]);

  // 匯入資料
  const importData = useCallback((jsonString: string) => {
    try {
      const imported = importFromJSON(jsonString);
      setData(imported);
      saveCMSData(imported);
      setError(null);
    } catch (e) {
      setError('Failed to import data');
      console.error(e);
    }
  }, []);

  // 重置資料
  const reset = useCallback(async () => {
    try {
      resetToDefault();
      const cmsData = await initializeCMSData();
      setData(cmsData);
      setError(null);
    } catch (e) {
      setError('Failed to reset data');
      console.error(e);
    }
  }, []);

  // 還原備份
  const restore = useCallback(() => {
    try {
      const backup = restoreBackup();
      if (backup) {
        setData(backup);
        setError(null);
      } else {
        setError('No backup found');
      }
    } catch (e) {
      setError('Failed to restore backup');
      console.error(e);
    }
  }, []);

  return {
    data,
    loading,
    error,
    save,
    updateProject,
    addProject,
    deleteProject,
    updateProduct,
    addProduct,
    deleteProduct,
    exportData,
    importData,
    reset,
    restore,
  };
}
