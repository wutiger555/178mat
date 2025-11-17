/**
 * 本地資料存儲工具
 * 使用 localStorage 和 JSON 檔案管理 CMS 內容
 */

import { Project } from '@/data/projects';
import { Product } from '@/data/products';
import { YouTubeVideo } from '@/data/youtube-videos';

export interface CMSData {
  lastUpdated: string;
  version: string;
  projects: Project[];
  products: Product[];
  youtubeVideos: YouTubeVideo[];
  settings: CMSSettings;
}

export interface CMSSettings {
  siteName: string;
  siteDescription: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

const STORAGE_KEY = 'cms_data';
const BACKUP_KEY = 'cms_data_backup';

/**
 * 初始化 CMS 資料
 * 優先順序：localStorage（編輯中） > JSON 檔案（已發布） > 原始資料
 */
export async function initializeCMSData(): Promise<CMSData> {
  // 1. 先嘗試從 localStorage 讀取（編輯中的資料）
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse stored data:', e);
    }
  }

  // 2. 嘗試從 JSON 檔案讀取（已發布的資料）
  try {
    const response = await fetch('/178mat/data/cms-data.json');
    if (response.ok) {
      const fileData = await response.json();
      // 同時載入到 localStorage 以便編輯
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fileData, null, 2));
      return fileData;
    }
  } catch (e) {
    console.log('No published data found, using defaults');
  }

  // 3. 如果都沒有，從原始資料初始化
  const { projects } = await import('@/data/projects');
  const { products } = await import('@/data/products');
  const { youtubeVideos } = await import('@/data/youtube-videos');

  const initialData: CMSData = {
    lastUpdated: new Date().toISOString(),
    version: '1.0.0',
    projects: projects || [],
    products: products || [],
    youtubeVideos: youtubeVideos || [],
    settings: {
      siteName: '易潔寶',
      siteDescription: '台灣專業除泥地墊專家',
      companyName: '易潔寶',
      contactEmail: 'info@178mat.com',
      contactPhone: '+886-2-XXXX-XXXX',
      address: '台灣台北市',
    },
  };

  // 儲存到 localStorage
  saveCMSData(initialData);
  return initialData;
}

/**
 * 儲存 CMS 資料
 */
export function saveCMSData(data: CMSData): void {
  // 備份現有資料
  const current = localStorage.getItem(STORAGE_KEY);
  if (current) {
    localStorage.setItem(BACKUP_KEY, current);
  }

  // 更新時間戳
  data.lastUpdated = new Date().toISOString();

  // 儲存新資料
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data, null, 2));
}

/**
 * 讀取 CMS 資料
 */
export function loadCMSData(): CMSData | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse CMS data:', e);
    return null;
  }
}

/**
 * 匯出為 JSON 檔案
 */
export function exportToJSON(data: CMSData): string {
  return JSON.stringify(data, null, 2);
}

/**
 * 從 JSON 匯入
 */
export function importFromJSON(jsonString: string): CMSData {
  try {
    const data = JSON.parse(jsonString);

    // 驗證資料結構
    if (!data.projects || !data.products) {
      throw new Error('Invalid data structure');
    }

    return data;
  } catch (e) {
    throw new Error('Invalid JSON format');
  }
}

/**
 * 下載 JSON 檔案
 */
export function downloadJSON(data: CMSData, filename: string = 'cms-data.json'): void {
  const jsonString = exportToJSON(data);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * 匯出所有資料（包括地圖和設定）
 */
export function exportAllData(): void {
  // 1. 匯出 CMS 資料
  const cmsData = loadCMSData();
  if (cmsData) {
    // 加入地圖資料
    const mapData = localStorage.getItem('taiwan_map_locations');
    if (mapData) {
      try {
        (cmsData as any).mapLocations = JSON.parse(mapData);
      } catch (e) {
        console.error('Failed to parse map data:', e);
      }
    }
    downloadJSON(cmsData, 'cms-data.json');
  }

  // 2. 匯出網站設定
  const settings = localStorage.getItem('website_settings');
  if (settings) {
    try {
      const settingsData = JSON.parse(settings);
      const blob = new Blob([JSON.stringify(settingsData, null, 2)], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'website-settings.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Failed to export settings:', e);
    }
  }
}

/**
 * 重置為預設資料
 */
export function resetToDefault(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(BACKUP_KEY);
}

/**
 * 還原備份
 */
export function restoreBackup(): CMSData | null {
  const backup = localStorage.getItem(BACKUP_KEY);
  if (!backup) return null;

  try {
    const data = JSON.parse(backup);
    localStorage.setItem(STORAGE_KEY, backup);
    return data;
  } catch (e) {
    console.error('Failed to restore backup:', e);
    return null;
  }
}
