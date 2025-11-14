export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specifications: {
    material: string;
    thickness?: string;
    width?: string;
    colors?: string[];
    features: string[];
  };
  applications: string[];
  price?: string;
}

export const products: Product[] = [
  // 面料系列
  {
    id: "carpet-polo-gray",
    name: "波羅紋毯面 - 灰色",
    category: "面料",
    description: "經典波羅紋設計，優異的除泥效果，耐用且易於清潔。灰色款式適合各種建築風格。",
    image: "/images/hero-mat-1.jpg",
    specifications: {
      material: "高密度聚丙烯纖維",
      thickness: "約 12mm",
      width: "可客製化",
      colors: ["灰色"],
      features: [
        "優異除泥效果",
        "耐磨耐用",
        "易於清潔",
        "防滑設計",
        "抗UV處理",
      ],
    },
    applications: ["住宅大廈", "商業大樓", "公共建築"],
  },
  {
    id: "carpet-polo-black",
    name: "波羅紋毯面 - 黑色",
    category: "面料",
    description: "經典黑色波羅紋毯面，展現專業質感，適合高級商業空間使用。",
    image: "/images/hero-mat-2.jpg",
    specifications: {
      material: "高密度聚丙烯纖維",
      thickness: "約 12mm",
      width: "可客製化",
      colors: ["黑色"],
      features: [
        "專業質感",
        "耐磨耐用",
        "易於清潔",
        "防滑設計",
        "抗UV處理",
      ],
    },
    applications: ["百貨公司", "高級飯店", "商業大樓"],
  },
  {
    id: "carpet-polo-brown",
    name: "波羅紋毯面 - 棕色",
    category: "面料",
    description: "溫暖的棕色調，營造溫馨氛圍，適合住宅與教會等場所。",
    image: "/images/hero-mat-3.jpg",
    specifications: {
      material: "高密度聚丙烯纖維",
      thickness: "約 12mm",
      width: "可客製化",
      colors: ["棕色"],
      features: [
        "溫暖色調",
        "耐磨耐用",
        "易於清潔",
        "防滑設計",
        "抗UV處理",
      ],
    },
    applications: ["住宅社區", "教會", "餐廳"],
  },
  {
    id: "carpet-polo-multicolor",
    name: "波羅紋毯面 - 多色搭配",
    category: "面料",
    description: "客製化多色搭配，可依據企業識別色或設計需求調整，展現獨特品牌形象。",
    image: "/images/hero-mat-1.jpg",
    specifications: {
      material: "高密度聚丙烯纖維",
      thickness: "約 12mm",
      width: "可客製化",
      colors: ["可客製化多色"],
      features: [
        "客製化配色",
        "品牌識別",
        "耐磨耐用",
        "易於清潔",
        "防滑設計",
      ],
    },
    applications: ["企業總部", "品牌旗艦店", "高級飯店"],
  },
  {
    id: "rubber-strip",
    name: "止滑膠條",
    category: "面料",
    description: "高強度橡膠材質，提供優異的止滑效果，適合多雨地區使用。",
    image: "/images/hero-mat-2.jpg",
    specifications: {
      material: "高強度橡膠",
      thickness: "約 8mm",
      width: "可客製化",
      colors: ["黑色"],
      features: [
        "優異止滑效果",
        "耐候性佳",
        "適合戶外",
        "易於清潔",
        "耐磨損",
      ],
    },
    applications: ["戶外入口", "多雨地區", "斜坡入口"],
  },
  {
    id: "brush-strip",
    name: "毛刷條",
    category: "面料",
    description: "尼龍毛刷設計，有效刮除鞋底泥沙，可與其他材料組合使用。",
    image: "/images/hero-mat-3.jpg",
    specifications: {
      material: "尼龍刷毛",
      thickness: "約 10mm",
      width: "可客製化",
      colors: ["黑色", "灰色"],
      features: [
        "有效除泥",
        "可組合使用",
        "耐用性高",
        "易於清潔",
        "適合戶外",
      ],
    },
    applications: ["風除室", "戶外入口", "工廠入口"],
  },

  // 收邊框系列
  {
    id: "frame-al620",
    name: "AL-620 鋁合金框",
    category: "收邊框",
    description: "經典AL-620型號，易潔寶自有品牌鋁合金收邊框，適用於各種嵌入式地墊。",
    image: "/images/hero-mat-1.jpg",
    specifications: {
      material: "陽極處理鋁合金",
      thickness: "2.0mm",
      width: "62mm",
      colors: ["銀色", "黑色"],
      features: [
        "堅固耐用",
        "抗腐蝕",
        "易於安裝",
        "美觀大方",
        "台灣製造",
      ],
    },
    applications: ["嵌入式地墊", "各類建築"],
  },
  {
    id: "frame-stainless",
    name: "不鏽鋼收邊框",
    category: "收邊框",
    description: "高級不鏽鋼材質，適合高級商業空間，展現專業質感。",
    image: "/images/hero-mat-2.jpg",
    specifications: {
      material: "304不鏽鋼",
      thickness: "2.0mm",
      width: "可客製化",
      colors: ["不鏽鋼原色", "霧面黑"],
      features: [
        "高級質感",
        "永不生鏽",
        "易於清潔",
        "堅固耐用",
        "適合戶外",
      ],
    },
    applications: ["高級商業空間", "戶外入口", "百貨公司"],
  },
  {
    id: "frame-flat",
    name: "1字型扁鋁框",
    category: "收邊框",
    description: "簡約設計的扁平鋁框，適合現代極簡風格建築。",
    image: "/images/hero-mat-3.jpg",
    specifications: {
      material: "陽極處理鋁合金",
      thickness: "1.5mm",
      width: "50mm",
      colors: ["銀色", "黑色"],
      features: [
        "極簡設計",
        "低調美觀",
        "易於安裝",
        "輕量化",
        "現代風格",
      ],
    },
    applications: ["現代建築", "辦公大樓", "住宅"],
  },
  {
    id: "frame-surface-5cm",
    name: "平鋪立地5cm斜鋁框",
    category: "收邊框",
    description: "專為表面式地墊設計的斜角鋁框，提供平順的過渡效果。",
    image: "/images/hero-mat-1.jpg",
    specifications: {
      material: "陽極處理鋁合金",
      thickness: "2.0mm",
      width: "斜角設計",
      colors: ["銀色"],
      features: [
        "平順過渡",
        "防絆倒設計",
        "適合表面式",
        "易於安裝",
        "安全性高",
      ],
    },
    applications: ["表面式地墊", "辦公室", "店面"],
  },

  // 完整系統
  {
    id: "system-embedded",
    name: "嵌入式地墊系統",
    category: "完整系統",
    description: "完整的嵌入式地墊解決方案，包含鋁框、面料、安裝服務。",
    image: "/images/hero-mat-2.jpg",
    specifications: {
      material: "鋁合金框 + 波羅紋毯面",
      thickness: "依現場需求",
      width: "客製化尺寸",
      colors: ["多色可選"],
      features: [
        "完整解決方案",
        "專業施工",
        "客製化設計",
        "品質保證",
        "售後服務",
      ],
    },
    applications: ["新建案", "改建工程", "各類建築"],
    price: "依現場報價",
  },
  {
    id: "system-drainage",
    name: "排水式地墊系統",
    category: "完整系統",
    description: "專業排水系統設計，包含導水溝、排水管、地墊組合。",
    image: "/images/hero-mat-3.jpg",
    specifications: {
      material: "鋁框 + 面料 + 排水系統",
      thickness: "依現場需求",
      width: "客製化尺寸",
      colors: ["多色可選"],
      features: [
        "專業排水設計",
        "導水溝施工",
        "預埋排水管",
        "完整規劃",
        "專業團隊",
      ],
    },
    applications: ["多雨地區", "地下室", "戶外入口"],
    price: "依現場報價",
  },
];

export const productCategories = ["全部", "面料", "收邊框", "完整系統"];

export const colors = [
  { name: "灰色", value: "gray", hex: "#808080" },
  { name: "黑色", value: "black", hex: "#000000" },
  { name: "棕色", value: "brown", hex: "#8B4513" },
  { name: "紅色", value: "red", hex: "#DC143C" },
  { name: "客製化", value: "custom", hex: "#FFD700" },
];
