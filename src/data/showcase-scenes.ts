// 3D 場景展示數據
export interface ShowcaseScene {
  id: string;
  name: string;
  type: string;
  icon: string;
  description: string;
  matSystem: {
    type: string;
    frame: string;
    surface: string;
    depth: string;
    drainage: boolean;
  };
  environment: {
    floor: string;
    lighting: string;
    atmosphere: string;
  };
  keyFeatures: string[];
  technicalSpecs: {
    area: string;
    traffic: string;
    recommendation: string;
  };
  cameraPosition: [number, number, number];
  color: string;
}

export const showcaseScenes: ShowcaseScene[] = [
  {
    id: 'corporate-office',
    name: '企業辦公大樓',
    type: '廠辦 / 商辦',
    icon: '🏢',
    description: '現代化玻璃帷幕辦公大樓入口，採用嵌入式鋁合金地墊系統，提供專業形象與高效除塵功能。',
    matSystem: {
      type: '嵌入式系統',
      frame: 'AL-620 鋁合金框',
      surface: '波羅紋毯面 - 灰色',
      depth: '20mm',
      drainage: true,
    },
    environment: {
      floor: '拋光地磚',
      lighting: '自然光 + LED 照明',
      atmosphere: '專業商務',
    },
    keyFeatures: [
      '高流量承載設計（500人次/日）',
      '導水溝排水系統',
      '易於維護清潔',
      '現代極簡風格',
      '降低 85% 走入污染',
    ],
    technicalSpecs: {
      area: '12-20 平方公尺',
      traffic: '中高流量（200-500人次/日）',
      recommendation: '建議使用 AL-620 框架搭配波羅紋毯面，並配置導水溝系統',
    },
    cameraPosition: [5, 3, 8],
    color: '#0066CC',
  },
  {
    id: 'luxury-hotel',
    name: '五星級飯店',
    type: '旅館 / 飯店',
    icon: '🏨',
    description: '奢華飯店大廳入口，採用客製化多色搭配地墊，展現高級質感與品牌識別。',
    matSystem: {
      type: '嵌入式系統',
      frame: '不鏽鋼收邊框',
      surface: '波羅紋毯面 - 多色搭配',
      depth: '20mm',
      drainage: false,
    },
    environment: {
      floor: '大理石 / 花崗岩',
      lighting: '水晶吊燈 + 氛圍燈',
      atmosphere: '奢華典雅',
    },
    keyFeatures: [
      '客製化品牌配色',
      'Logo 圖案嵌入',
      '不鏽鋼框架質感升級',
      '隱藏式地鉸鏈設計',
      '完美融入奢華空間',
    ],
    technicalSpecs: {
      area: '15-30 平方公尺',
      traffic: '高流量（300-800人次/日）',
      recommendation: '使用不鏽鋼框架搭配客製化多色毯面，強調品牌形象',
    },
    cameraPosition: [6, 4, 10],
    color: '#D4AF37',
  },
  {
    id: 'airport-terminal',
    name: '國際機場航廈',
    type: '公共建築 / 交通樞紐',
    icon: '✈️',
    description: '大型國際機場航廈入口，採用重型排水式地墊系統，應對超高流量與多變天候。',
    matSystem: {
      type: '排水式系統',
      frame: 'AL-620 重型框架',
      surface: '止滑膠條 + 毛刷條組合',
      depth: '30mm',
      drainage: true,
    },
    environment: {
      floor: '工業級地磚',
      lighting: '高亮度 LED',
      atmosphere: '開放公共',
    },
    keyFeatures: [
      '超高流量承載（2000+人次/日）',
      '多層除塵系統',
      '大容量排水設計',
      '極度耐用材質',
      '符合國際機場標準',
    ],
    technicalSpecs: {
      area: '50-100+ 平方公尺',
      traffic: '超高流量（1000+人次/日）',
      recommendation: '採用止滑膠條與毛刷條組合，搭配加深排水系統',
    },
    cameraPosition: [8, 5, 12],
    color: '#3B82F6',
  },
  {
    id: 'tech-park',
    name: '科技園區廠辦',
    type: '廠辦 / 工業',
    icon: '🏭',
    description: '科技園區廠辦風除室設計，採用現代工業風格地墊，兼顧功能與美學。',
    matSystem: {
      type: '嵌入式系統',
      frame: 'AL-620 鋁合金框',
      surface: '荷蘭毯 VEBE 浪花紋',
      depth: '25mm',
      drainage: true,
    },
    environment: {
      floor: '環氧樹脂地坪',
      lighting: 'LED 工業照明',
      atmosphere: '現代工業',
    },
    keyFeatures: [
      '工業級耐用設計',
      '風除室退縮收邊',
      '導水溝完整規劃',
      '現代工業美學',
      '低維護成本',
    ],
    technicalSpecs: {
      area: '18-25 平方公尺',
      traffic: '中流量（100-300人次/日）',
      recommendation: '荷蘭毯搭配 AL-620 框架，適合工業環境長期使用',
    },
    cameraPosition: [5, 3.5, 9],
    color: '#10B981',
  },
  {
    id: 'medical-center',
    name: '醫療院所',
    type: '醫院 / 診所',
    icon: '🏥',
    description: '醫療院所入口，強調衛生安全與易清潔特性，提供患者與訪客安全的環境。',
    matSystem: {
      type: '嵌入式系統',
      frame: '不鏽鋼收邊框（抗菌）',
      surface: '止滑膠條（抗菌處理）',
      depth: '20mm',
      drainage: true,
    },
    environment: {
      floor: '抗菌磁磚',
      lighting: '無影燈級照明',
      atmosphere: '清潔衛生',
    },
    keyFeatures: [
      '抗菌材質處理',
      '易清潔消毒設計',
      '優異防滑性能',
      '導水溝避免積水',
      '符合醫療場所標準',
    ],
    technicalSpecs: {
      area: '10-18 平方公尺',
      traffic: '中高流量（150-400人次/日）',
      recommendation: '使用抗菌處理的不鏽鋼框架與止滑膠條，搭配導水溝',
    },
    cameraPosition: [4, 3, 7],
    color: '#EF4444',
  },
  {
    id: 'shopping-mall',
    name: '購物中心',
    type: '百貨公司 / 商場',
    icon: '🏬',
    description: '大型購物中心主入口，採用品牌識別設計，展現商業形象與迎賓氛圍。',
    matSystem: {
      type: '嵌入式系統',
      frame: '1字型扁鋁框',
      surface: '波羅紋毯面 - 客製化 Logo',
      depth: '20mm',
      drainage: false,
    },
    environment: {
      floor: '石材拼花',
      lighting: '商業照明 + 裝飾燈',
      atmosphere: '時尚零售',
    },
    keyFeatures: [
      '品牌 Logo 客製化',
      '多色圖案設計',
      '極簡扁鋁框設計',
      '吸引顧客目光',
      '強化品牌形象',
    ],
    technicalSpecs: {
      area: '20-40 平方公尺',
      traffic: '超高流量（500-1500人次/日）',
      recommendation: '客製化多色毯面搭配扁鋁框，展現品牌特色',
    },
    cameraPosition: [7, 4, 11],
    color: '#F59E0B',
  },
];

// 材質類型定義
export interface MaterialType {
  id: string;
  name: string;
  category: 'surface' | 'frame' | 'system';
  description: string;
  texture: string;
  color: string;
  specs: {
    material: string;
    thickness?: string;
    finish?: string;
    durability: string;
  };
  applications: string[];
  priceRange: string;
}

export const materialTypes: MaterialType[] = [
  {
    id: 'polo-carpet-gray',
    name: '波羅紋毯面 - 灰色',
    category: 'surface',
    description: '經典波羅紋設計，優異除泥效果，適合商業環境',
    texture: '/textures/polo-gray.jpg',
    color: '#808080',
    specs: {
      material: '高密度聚丙烯纖維（PP）',
      thickness: '12mm',
      finish: '波羅紋織造',
      durability: '重型商業級（>50萬次）',
    },
    applications: ['辦公大樓', '商業空間', '住宅大廈'],
    priceRange: '$$',
  },
  {
    id: 'polo-carpet-multicolor',
    name: '波羅紋毯面 - 多色搭配',
    category: 'surface',
    description: '客製化配色設計，可嵌入 Logo，展現品牌識別',
    texture: '/textures/polo-multicolor.jpg',
    color: '#4A5568',
    specs: {
      material: '高密度聚丙烯纖維（PP）',
      thickness: '12mm',
      finish: '客製化多色織造',
      durability: '重型商業級（>50萬次）',
    },
    applications: ['飯店大廳', '企業總部', '品牌旗艦店'],
    priceRange: '$$$',
  },
  {
    id: 'rubber-strip',
    name: '止滑膠條',
    category: 'surface',
    description: '高強度橡膠，優異防滑性能，適合多雨地區',
    texture: '/textures/rubber-black.jpg',
    color: '#1A1A1A',
    specs: {
      material: '高強度橡膠（NBR）',
      thickness: '8mm',
      finish: '防滑紋路',
      durability: '超重型（>100萬次）',
    },
    applications: ['戶外入口', '多雨地區', '醫療場所'],
    priceRange: '$$',
  },
  {
    id: 'brush-strip',
    name: '毛刷條',
    category: 'surface',
    description: '尼龍刷毛設計，有效刮除鞋底泥沙',
    texture: '/textures/brush-gray.jpg',
    color: '#4A4A4A',
    specs: {
      material: '尼龍 6.6 刷毛',
      thickness: '10mm',
      finish: '密集刷毛',
      durability: '重型商業級（>60萬次）',
    },
    applications: ['風除室', '戶外入口', '工廠入口'],
    priceRange: '$$$',
  },
  {
    id: 'frame-al620',
    name: 'AL-620 鋁合金框',
    category: 'frame',
    description: '易潔寶經典鋁框，堅固耐用，台灣製造',
    texture: '/textures/aluminum-silver.jpg',
    color: '#C0C0C0',
    specs: {
      material: '陽極處理鋁合金 6063-T5',
      thickness: '2.0mm',
      finish: '陽極氧化處理',
      durability: '20年以上',
    },
    applications: ['嵌入式地墊', '各類建築'],
    priceRange: '$$',
  },
  {
    id: 'frame-stainless',
    name: '不鏽鋼收邊框',
    category: 'frame',
    description: '304 不鏽鋼，高級質感，永不生鏽',
    texture: '/textures/stainless-steel.jpg',
    color: '#E8E8E8',
    specs: {
      material: '304 不鏽鋼',
      thickness: '2.0mm',
      finish: '髮絲紋 / 鏡面',
      durability: '永久',
    },
    applications: ['高級商業空間', '戶外入口'],
    priceRange: '$$$',
  },
];

// 國際品牌對比數據
export interface BrandComparison {
  brand: string;
  country: string;
  depth: string;
  material: string;
  loadCapacity: string;
  ecoRating: string;
  warranty: string;
  customization: number; // 1-5 stars
  priceRange: string;
}

export const brandComparisons: BrandComparison[] = [
  {
    brand: '易潔寶 EasyClean',
    country: '🇹🇼 台灣',
    depth: '12-35mm',
    material: '鋁合金 + 多種面料',
    loadCapacity: '500kg/輪',
    ecoRating: '台灣製造 ✓',
    warranty: '2年保固+',
    customization: 5,
    priceRange: '$$',
  },
  {
    brand: 'EMCO',
    country: '🇩🇪 德國',
    depth: '12-22mm',
    material: '鋁合金 + PA6 纖維',
    loadCapacity: '未提供',
    ecoRating: 'C2C 認證 ✓✓',
    warranty: '未提供',
    customization: 3,
    priceRange: '$$$+',
  },
  {
    brand: 'C-S Pedimat',
    country: '🇺🇸 美國',
    depth: '11.1mm',
    material: '鋁合金 + 地毯',
    loadCapacity: '159kg/輪',
    ecoRating: '-',
    warranty: '2年有限保固',
    customization: 3,
    priceRange: '$$$',
  },
  {
    brand: 'Forbo Coral',
    country: '🇨🇭 瑞士',
    depth: '8-9mm',
    material: '尼龍 + 橡膠',
    loadCapacity: '未提供',
    ecoRating: 'ISO 14001 ✓✓',
    warranty: '未提供',
    customization: 2,
    priceRange: '$$$',
  },
];

// 性能數據
export const performanceData = {
  dustRemoval: {
    hardFloor: 15, // %
    easyClean: 85, // %
    emco: 88, // %
    improvement: '8倍效能提升',
  },
  costSavings: {
    cleaningCost: 65, // % reduction
    floorLifeExtension: 50, // % increase
    roiPeriod: '18-24個月',
  },
  durability: {
    passCycles: 500000, // 次
    lifespan: '10-15年',
    warrantyYears: 2,
  },
};
