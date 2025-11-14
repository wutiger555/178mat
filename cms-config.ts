/**
 * CMS 配置檔案
 * 用於管理工程實績、產品型錄等內容
 * 
 * 使用說明：
 * 1. 編輯此檔案中的資料
 * 2. 系統會自動同步到網站
 * 3. 無需重新編譯或部署
 */

export interface CMSContent {
  lastUpdated: string;
  version: string;
  projects: ProjectData[];
  products: ProductData[];
  settings: CMSSettings;
}

export interface ProjectData {
  id: string;
  title: string;
  location: string;
  city: string;
  district: string;
  year: number;
  images: string[];
  description: string;
  tags: ProjectTags;
  specs: ProjectSpecs;
  details?: string;
  clientName?: string;
  completionDate?: string;
}

export interface ProjectTags {
  buildingType: string[];
  floorMaterial: string[];
  installationType: string[];
  framingType: string[];
  surfaceMaterial: string[];
  drainageType: string[];
  designFeature: string[];
  location: string[];
}

export interface ProjectSpecs {
  area?: string;
  depth?: string;
  width?: string;
  length?: string;
  customSpecs?: Record<string, string>;
}

export interface ProductData {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specifications: ProductSpecification[];
  materials: string[];
  colors: string[];
  price?: string;
  features: string[];
  dwgFile?: string;
  relatedProjects?: string[];
}

export interface ProductSpecification {
  name: string;
  value: string;
}

export interface CMSSettings {
  siteName: string;
  siteDescription: string;
  companyName: string;
  companyEnglishName: string;
  foundedYear: number;
  contactEmail: string;
  contactPhone: string;
  address: string;
  serviceArea: string[];
  socialMedia: {
    facebook?: string;
    line?: string;
    instagram?: string;
  };
}

/**
 * 預設 CMS 配置
 * 可在此編輯公司基本資訊
 */
export const defaultCMSSettings: CMSSettings = {
  siteName: "易潔寶",
  siteDescription: "台灣專業除泥地墊專家 - 嵌入式、表面式、排水式、坑槽式地墊專業安裝施工",
  companyName: "易潔寶",
  companyEnglishName: "178mat",
  foundedYear: 2002,
  contactEmail: "info@178mat.com",
  contactPhone: "+886-2-XXXX-XXXX",
  address: "台灣台北市...",
  serviceArea: [
    "台北",
    "新北",
    "桃園",
    "新竹",
    "苗栗",
    "台中",
    "彰化",
    "南投",
    "雲林",
    "嘉義",
    "台南",
    "高雄",
    "屏東",
    "宜蘭",
    "花蓮",
    "台東",
  ],
  socialMedia: {
    facebook: "https://facebook.com/178mat",
    line: "https://line.me/R/ti/p/@178mat",
    instagram: "https://instagram.com/178mat",
  },
};

/**
 * 標籤選項 - 用於篩選和分類
 */
export const tagOptions = {
  buildingTypes: [
    "住宅大廈",
    "公共建築",
    "學校",
    "廠辦",
    "教會",
    "旅館",
    "百貨公司",
    "醫院",
    "餐廳",
    "辦公大樓",
  ],
  floorMaterials: [
    "地磚（硬底施工）",
    "抿石子",
    "石材",
    "磁磚",
    "水泥",
  ],
  installationTypes: [
    "嵌入式",
    "表面式",
    "平鋪式2cm",
    "平鋪式5cm",
  ],
  framingTypes: [
    "1字型扁鋁",
    "AL-620",
    "不鏽鋼框",
    "平鋪立地5cm斜鋁框",
    "無收邊框",
  ],
  surfaceMaterials: [
    "波羅紋毯面",
    "波羅紋毯面多色搭配",
    "波羅紋毯面棕色",
    "波羅紋毯面灰色",
    "波羅紋毯面紅色",
    "波羅紋毯面黑色",
    "直條紋毯面",
    "止滑膠條",
    "止滑膠條＋毛刷條",
    "橡膠止滑條",
    "毛刷條",
  ],
  drainageTypes: [
    "導水溝",
    "預埋排水管",
    "加深高架",
    "無排水設計",
  ],
  designFeatures: [
    "地鉸鏈",
    "隱藏式地鉸鏈",
    "天地閂防塵套",
    "大門內側",
    "大門外側",
    "大門內＋外",
    "風除室-滿鋪",
    "風除室-中間通道",
    "風除室-退縮收邊",
    "截水設計",
    "廚房防滑",
    "頂樓RF",
  ],
  productCategories: [
    "嵌入式地墊",
    "表面式地墊",
    "排水式地墊",
    "坑槽式地墊",
    "配件",
    "3M地墊",
  ],
};

/**
 * 驗證函數
 */
export function validateProject(project: ProjectData): string[] {
  const errors: string[] = [];

  if (!project.id) errors.push("ID 不能為空");
  if (!project.title) errors.push("標題不能為空");
  if (!project.location) errors.push("位置不能為空");
  if (!project.city) errors.push("城市不能為空");
  if (project.year < 2000 || project.year > new Date().getFullYear()) {
    errors.push("年份無效");
  }
  if (!project.images || project.images.length === 0) {
    errors.push("至少需要一張圖片");
  }
  if (!project.description) errors.push("描述不能為空");

  return errors;
}

export function validateProduct(product: ProductData): string[] {
  const errors: string[] = [];

  if (!product.id) errors.push("ID 不能為空");
  if (!product.name) errors.push("產品名稱不能為空");
  if (!product.category) errors.push("分類不能為空");
  if (!product.description) errors.push("描述不能為空");
  if (!product.image) errors.push("產品圖片不能為空");

  return errors;
}

/**
 * 匯出/匯入函數
 */
export function exportCMSAsJSON(content: CMSContent): string {
  return JSON.stringify(content, null, 2);
}

export function importCMSFromJSON(jsonString: string): CMSContent {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    throw new Error("JSON 格式無效");
  }
}
