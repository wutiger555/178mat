import { getImagePath } from '@/utils/paths';

export interface Project {
  id: string;
  title: string;
  location: string;
  city: string;
  district: string;
  year: number;
  images: string[];
  description: string;
  youtubeVideoIds?: string[];
  tags: {
    buildingType: string[];
    floorMaterial: string[];
    installationType: string[];
    framingType: string[];
    surfaceMaterial: string[];
    drainageType: string[];
    designFeature: string[];
    location: string[];
  };
  specs: {
    area?: string;
    depth?: string;
    width?: string;
    length?: string;
  };
}

export const buildingTypes = [
  "住宅大廈",
  "公共建築",
  "學校",
  "廠辦",
  "教會",
  "旅館",
  "百貨公司",
  "醫院",
  "餐廳",
];

export const cities = [
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
];

export const projects: Project[] = [
  {
    id: "taichung-dali-residential",
    title: "台中大里區大型造鎮案",
    location: "台中市大里區健民路3號",
    city: "台中",
    district: "大里區",
    year: 2025,
    images: [getImagePath("images/hero-mat-1.jpg"), getImagePath("images/hero-mat-2.jpg"), getImagePath("images/hero-mat-3.jpg")],
    description: "台中市大里區大型造鎮案，鄰近健民路，採用嵌入式刮泥墊設計，地面材質為抿石子，配合導水溝排水系統。使用波羅紋毯面與止滑膠條組合，提供優異的除泥與防滑效果。",
    youtubeVideoIds: ["dDw47aMuScw", "gH4iJ5kL6mN"],
    tags: {
      buildingType: ["住宅大廈"],
      floorMaterial: ["抿石子", "地磚（硬底施工）"],
      installationType: ["嵌入式"],
      framingType: ["AL-620"],
      surfaceMaterial: ["波羅紋毯面", "止滑膠條"],
      drainageType: ["導水溝", "預埋排水管"],
      designFeature: ["風除室-滿鋪", "大門內側"],
      location: ["風除室"],
    },
    specs: {
      area: "15平方公尺",
      depth: "2cm",
      width: "150cm",
      length: "1000cm",
    },
  },
  {
    id: "kaohsiung-qianzhen-office",
    title: "高雄前鎮區商辦大樓",
    location: "高雄市前鎮區中山路",
    city: "高雄",
    district: "前鎮區",
    year: 2024,
    images: [getImagePath("images/hero-mat-2.jpg"), getImagePath("images/hero-mat-1.jpg")],
    description: "高雄前鎮區商辦大樓入口，採用排水式地墊設計，有效處理雨天積水問題。使用不鏽鋼收邊框搭配波羅紋毯面灰色，展現專業與現代感。",
    youtubeVideoIds: ["kL9pM2xQ8vE", "xY1zAb2cD3eF"],
    tags: {
      buildingType: ["辦公大樓"],
      floorMaterial: ["地磚（硬底施工）"],
      installationType: ["嵌入式"],
      framingType: ["不鏽鋼框"],
      surfaceMaterial: ["波羅紋毯面灰色"],
      drainageType: ["導水溝", "加深高架"],
      designFeature: ["大門外側", "截水設計"],
      location: ["大門入口"],
    },
    specs: {
      area: "12平方公尺",
      depth: "3cm",
      width: "200cm",
      length: "600cm",
    },
  },
  {
    id: "taipei-xinyi-hotel",
    title: "台北信義區五星級飯店",
    location: "台北市信義區信義路五段",
    city: "台北",
    district: "信義區",
    year: 2024,
    images: [getImagePath("images/hero-mat-3.jpg"), getImagePath("images/hero-mat-1.jpg")],
    description: "台北信義區五星級飯店大廳入口，採用客製化設計，使用波羅紋毯面多色搭配，展現高級質感。配合隱藏式地鉸鏈設計，完美融入整體空間。",
    youtubeVideoIds: ["dDw47aMuScw"],
    tags: {
      buildingType: ["旅館"],
      floorMaterial: ["石材"],
      installationType: ["嵌入式"],
      framingType: ["1字型扁鋁"],
      surfaceMaterial: ["波羅紋毯面多色搭配"],
      drainageType: ["無排水設計"],
      designFeature: ["隱藏式地鉸鏈", "風除室-滿鋪"],
      location: ["大廳入口"],
    },
    specs: {
      area: "20平方公尺",
      depth: "2cm",
      width: "300cm",
      length: "667cm",
    },
  },
  {
    id: "taoyuan-zhongli-school",
    title: "桃園中壢區國小校門",
    location: "桃園市中壢區中央路",
    city: "桃園",
    district: "中壢區",
    year: 2023,
    images: [getImagePath("images/hero-mat-1.jpg")],
    description: "桃園中壢區國小校門入口，考量學童安全，採用止滑膠條與毛刷條組合，提供優異的防滑效果。使用平鋪式設計，方便日後維護。",
    youtubeVideoIds: ["kL9pM2xQ8vE"],
    tags: {
      buildingType: ["學校"],
      floorMaterial: ["磁磚"],
      installationType: ["平鋪式2cm"],
      framingType: ["平鋪立地5cm斜鋁框"],
      surfaceMaterial: ["止滑膠條+毛刷條"],
      drainageType: ["無排水設計"],
      designFeature: ["大門外側"],
      location: ["校門入口"],
    },
    specs: {
      area: "8平方公尺",
      depth: "2cm",
      width: "200cm",
      length: "400cm",
    },
  },
  {
    id: "tainan-anping-restaurant",
    title: "台南安平區海鮮餐廳",
    location: "台南市安平區安平路",
    city: "台南",
    district: "安平區",
    year: 2023,
    images: [getImagePath("images/hero-mat-2.jpg")],
    description: "台南安平區海鮮餐廳入口，考量餐廳環境需求，採用廚房防滑設計，使用橡膠止滑條搭配導水溝，有效防止滑倒並快速排水。",
    youtubeVideoIds: ["pQ7rS8tU9vW"],
    tags: {
      buildingType: ["餐廳"],
      floorMaterial: ["磁磚"],
      installationType: ["嵌入式"],
      framingType: ["不鏽鋼框"],
      surfaceMaterial: ["橡膠止滑條"],
      drainageType: ["導水溝"],
      designFeature: ["廚房防滑", "大門外側"],
      location: ["餐廳入口"],
    },
    specs: {
      area: "10平方公尺",
      depth: "2.5cm",
      width: "180cm",
      length: "556cm",
    },
  },
  {
    id: "nantou-jade-mountain",
    title: "玉山塔塔加遊客中心",
    location: "南投縣信義鄉太平巷118號",
    city: "南投",
    district: "信義鄉",
    year: 2025,
    images: [getImagePath("images/hero-mat-1.jpg"), getImagePath("images/hero-mat-2.jpg")],
    description: "玉山塔塔加遊客中心地墊更新案例，採用止滑膠條與舊毯換新服務，提升遊客安全與視覺質感。",
    youtubeVideoIds: ["oP8qR9sT0uV"],
    tags: {
      buildingType: ["公共建築"],
      floorMaterial: ["地磚"],
      installationType: ["表面式"],
      framingType: ["AL-620"],
      surfaceMaterial: ["止滑膠條", "舊毯換新"],
      drainageType: ["無排水設計"],
      designFeature: ["大門外側"],
      location: ["遊客中心入口"],
    },
    specs: {
      area: "10平方公尺",
      depth: "2cm",
      width: "150cm",
      length: "667cm",
    },
  },
  {
    id: "taipei-beitou-development",
    title: "北投奇岩重劃區住宅",
    location: "台北市北投區奇岩路",
    city: "台北",
    district: "北投區",
    year: 2024,
    images: [getImagePath("images/hero-mat-3.jpg")],
    description: "北投奇岩重劃區高綠覆率、低密度開發住宅案，採用嵌入式刮泥墊，提供優質的出入口體驗。",
    youtubeVideoIds: ["dDw47aMuScw"],
    tags: {
      buildingType: ["住宅大廈"],
      floorMaterial: ["地磚"],
      installationType: ["嵌入式"],
      framingType: ["不鏽鋼框"],
      surfaceMaterial: ["波羅紋毯面灰色"],
      drainageType: ["導水溝"],
      designFeature: ["大門內側"],
      location: ["大門入口"],
    },
    specs: {
      area: "12平方公尺",
      depth: "2.5cm",
      width: "180cm",
      length: "667cm",
    },
  },
  {
    id: "hsinchu-science-park",
    title: "新竹科技園區辦公大樓",
    location: "新竹市東區科技路",
    city: "新竹",
    district: "東區",
    year: 2024,
    images: [getImagePath("images/hero-mat-2.jpg")],
    description: "新竹科技園區辦公大樓入口，採用嵌入式刮泥墊設計，配合導水溝排水系統，提供專業的出入口解決方案。",
    youtubeVideoIds: ["dDw47aMuScw", "kL9pM2xQ8vE"],
    tags: {
      buildingType: ["廠辦"],
      floorMaterial: ["地磚"],
      installationType: ["嵌入式"],
      framingType: ["AL-620"],
      surfaceMaterial: ["波羅紋毯面灰色", "止滑膠條"],
      drainageType: ["導水溝"],
      designFeature: ["大門內側"],
      location: ["大門入口"],
    },
    specs: {
      area: "14平方公尺",
      depth: "2.5cm",
      width: "200cm",
      length: "700cm",
    },
  },
  {
    id: "taipei-hospital",
    title: "台北醫院大廳入口",
    location: "台北市中山區中山路",
    city: "台北",
    district: "中山區",
    year: 2023,
    images: [getImagePath("images/hero-mat-1.jpg")],
    description: "台北醫院大廳入口，考量醫療環境衛生需求，採用止滑膠條與導水溝設計，確保患者與訪客的安全。",
    youtubeVideoIds: ["pQ7rS8tU9vW"],
    tags: {
      buildingType: ["醫院"],
      floorMaterial: ["磁磚"],
      installationType: ["嵌入式"],
      framingType: ["不鏽鋼框"],
      surfaceMaterial: ["止滑膠條"],
      drainageType: ["導水溝"],
      designFeature: ["大門內側"],
      location: ["大廳入口"],
    },
    specs: {
      area: "16平方公尺",
      depth: "2cm",
      width: "250cm",
      length: "640cm",
    },
  },
  {
    id: "taipei-department-store",
    title: "台北百貨公司大門",
    location: "台北市信義區信義路",
    city: "台北",
    district: "信義區",
    year: 2023,
    images: [getImagePath("images/hero-mat-2.jpg")],
    description: "台北知名百貨公司大門入口，採用客製化設計，使用波羅紋毯面多色搭配，展現高級商業形象。",
    youtubeVideoIds: ["dDw47aMuScw"],
    tags: {
      buildingType: ["百貨公司"],
      floorMaterial: ["石材"],
      installationType: ["嵌入式"],
      framingType: ["1字型扁鋁"],
      surfaceMaterial: ["波羅紋毯面多色搭配"],
      drainageType: ["無排水設計"],
      designFeature: ["大門外側"],
      location: ["大門入口"],
    },
    specs: {
      area: "22平方公尺",
      depth: "2cm",
      width: "350cm",
      length: "630cm",
    },
  },
  // 補充工程實績資料
  {
    id: "taichung-dali-residential-2025",
    title: "台中市大里區大型造鎮案",
    location: "412台灣臺中市大里區健民路3號",
    city: "台中",
    district: "大里區",
    year: 2025,
    images: [getImagePath("images/hero-mat-1.jpg"), getImagePath("images/hero-mat-2.jpg")],
    description: "台中市大里區大型造鎮案，鄰近健民路生活圈。住宅大廈入口採用止滑膠條地墊，提供安全舒適的進出體驗。",
    youtubeVideoIds: ["gH4iJ5kL6mN"],
    tags: {
      buildingType: ["住宅大廈"],
      floorMaterial: ["磁磚"],
      installationType: ["表面式"],
      framingType: ["AL-620"],
      surfaceMaterial: ["止滑膠條"],
      drainageType: ["導水溝"],
      designFeature: ["大門外側"],
      location: ["入口"],
    },
    specs: {
      area: "25平方公尺",
      depth: "3cm",
      width: "200cm",
      length: "800cm",
    },
  },
  {
    id: "nantou-jade-mountain-2025",
    title: "玉山塔塔加遊客中心",
    location: "556台灣南投縣信義鄉太平巷118號",
    city: "南投",
    district: "信義鄉",
    year: 2025,
    images: [getImagePath("images/hero-mat-1.jpg")],
    description: "玉山塔塔加遊客中心地墊更新案例，採用止滑膠條與舊毯換新服務，提升遊客安全與視覺質感。",
    youtubeVideoIds: ["oP8qR9sT0uV"],
    tags: {
      buildingType: ["公共建築"],
      floorMaterial: ["地磚"],
      installationType: ["表面式"],
      framingType: ["無"],
      surfaceMaterial: ["止滑膠條"],
      drainageType: ["導水溝"],
      designFeature: ["舊毯換新"],
      location: ["遊客中心入口"],
    },
    specs: {
      area: "15平方公尺",
      depth: "2cm",
      width: "150cm",
      length: "600cm",
    },
  },
  {
    id: "taipei-beitou-qiyan",
    title: "北投奇岩重劃區",
    location: "112台灣台北市北投区三合街一段77號",
    city: "台北",
    district: "北投區",
    year: 2025,
    images: [getImagePath("images/hero-mat-2.jpg")],
    description: "北投奇岩重劃區高綠覆率、低密度開發住宅大廈。採用嵌入式刮泥墊搭配導水溝設計，提供防水與除泥功能。",
    tags: {
      buildingType: ["住宅大廈"],
      floorMaterial: ["地磚"],
      installationType: ["嵌入式"],
      framingType: ["AL-620"],
      surfaceMaterial: ["波羅紋毯面"],
      drainageType: ["導水溝"],
      designFeature: ["大門外側", "防水閘門"],
      location: ["主入口"],
    },
    specs: {
      area: "30平方公尺",
      depth: "3.5cm",
      width: "250cm",
      length: "900cm",
    },
  },
  {
    id: "taipei-nangang-factory",
    title: "台北南港廠辦",
    location: "115台灣台北市南港區南港路二段51號",
    city: "台北",
    district: "南港區",
    year: 2025,
    images: [getImagePath("images/hero-mat-1.jpg")],
    description: "台北南港廠辦風除室設計，採用荷蘭毯浪花紋黑色地墊，搭配退縮收邊框設計，提升專業形象。",
    tags: {
      buildingType: ["廠辦"],
      floorMaterial: ["地磚"],
      installationType: ["表面式"],
      framingType: ["AL-620"],
      surfaceMaterial: ["荷蘭毯VEBE浪花紋"],
      drainageType: ["導水溝"],
      designFeature: ["風除室-退縮收邊"],
      location: ["風除室"],
    },
    specs: {
      area: "20平方公尺",
      depth: "2.5cm",
      width: "180cm",
      length: "700cm",
    },
  },
  {
    id: "changhua-beidou-industrial",
    title: "北斗科學工業園區",
    location: "521台灣彰化縣北斗鎮新工二路66號",
    city: "彰化",
    district: "北斗鎮",
    year: 2025,
    images: [getImagePath("images/hero-mat-2.jpg")],
    description: "北斗科學工業園區廠辦入口採用梯形造型設計，使用荷蘭毯浪花紋黑色地墊，展現現代工業風格。",
    tags: {
      buildingType: ["廠辦"],
      floorMaterial: ["地磚"],
      installationType: ["表面式"],
      framingType: ["無"],
      surfaceMaterial: ["荷蘭毯VEBE浪花紋"],
      drainageType: ["導水溝"],
      designFeature: ["異形切割"],
      location: ["廠辦入口"],
    },
    specs: {
      area: "35平方公尺",
      depth: "2cm",
      width: "220cm",
      length: "950cm",
    },
  },
  {
    id: "taipei-zhongshan-office",
    title: "大直商辦",
    location: "10491台灣台北市中山區植福路289號",
    city: "台北",
    district: "中山區",
    year: 2025,
    images: [getImagePath("images/hero-mat-1.jpg")],
    description: "台北大直商辦採用荷蘭毯浪花紋灰色地墊，提供專業商務空間的視覺質感與功能性。",
    tags: {
      buildingType: ["廠辦"],
      floorMaterial: ["地磚"],
      installationType: ["表面式"],
      framingType: ["AL-620"],
      surfaceMaterial: ["荷蘭毯VEBE浪花紋"],
      drainageType: ["導水溝"],
      designFeature: ["大門外側"],
      location: ["商辦入口"],
    },
    specs: {
      area: "22平方公尺",
      depth: "2.5cm",
      width: "190cm",
      length: "750cm",
    },
  },
  // 官方部落格案場資料
  {
    id: "taichung-central-film-center",
    title: "中臺灣電影中心",
    location: "台中市水湳智慧城",
    city: "台中",
    district: "西屯區",
    year: 2021,
    images: [getImagePath("images/hero-mat-1.jpg"), getImagePath("images/hero-mat-2.jpg")],
    description: "中臺灣電影中心採用超長距離14米刮泥地墊設計，為台灣地墊施工的指標性案例。使用玉山系列ES302框架搭配波羅紋毯面，展現專業與美觀。",
    tags: {
      buildingType: ["公共建築"],
      floorMaterial: ["地磚"],
      installationType: ["嵌入式"],
      framingType: ["玉山系列ES302"],
      surfaceMaterial: ["波羅紋毯面"],
      drainageType: ["導水溝"],
      designFeature: ["超長距離14米", "大門外側"],
      location: ["主入口"],
    },
    specs: {
      area: "42平方公尺",
      depth: "2.5cm",
      width: "300cm",
      length: "1400cm",
    },
  },
  {
    id: "guangyuanliang-factory",
    title: "廣源良工廠",
    location: "台灣",
    city: "台中",
    district: "",
    year: 2019,
    images: [getImagePath("images/hero-mat-2.jpg")],
    description: "廣源良工廠風除室滿鋪設計，採用玉山系列ES302框架搭配波羅紋毯面黑色，提供優異的除泥效果與專業形象。",
    tags: {
      buildingType: ["廠辦"],
      floorMaterial: ["地磚"],
      installationType: ["嵌入式"],
      framingType: ["玉山系列ES302"],
      surfaceMaterial: ["波羅紋毯面黑色"],
      drainageType: ["無排水設計"],
      designFeature: ["風除室-滿鋪"],
      location: ["風除室"],
    },
    specs: {
      area: "18平方公尺",
      depth: "2cm",
      width: "200cm",
      length: "900cm",
    },
  },
  {
    id: "taichung-times-state-hall",
    title: "時代州廳",
    location: "台中市",
    city: "台中",
    district: "",
    year: 2021,
    images: [getImagePath("images/hero-mat-1.jpg")],
    description: "時代州廳住宅大廈採用雪山系列SM305框架搭配波羅紋毯面灰色，展現高級住宅的質感與品味。",
    tags: {
      buildingType: ["住宅大廈"],
      floorMaterial: ["地磚"],
      installationType: ["嵌入式"],
      framingType: ["雪山系列SM305"],
      surfaceMaterial: ["波羅紋毯面灰色"],
      drainageType: ["導水溝"],
      designFeature: ["大門內側"],
      location: ["大門入口"],
    },
    specs: {
      area: "16平方公尺",
      depth: "2.5cm",
      width: "180cm",
      length: "900cm",
    },
  },
  {
    id: "taichung-taiping-dazhiran",
    title: "太平大智然",
    location: "台中市太平區",
    city: "台中",
    district: "太平區",
    year: 2021,
    images: [getImagePath("images/hero-mat-2.jpg")],
    description: "太平大智然住宅案採用玉山系列ES302框架搭配止滑膠條，提供安全防滑的入口環境。",
    tags: {
      buildingType: ["住宅大廈"],
      floorMaterial: ["地磚"],
      installationType: ["嵌入式"],
      framingType: ["玉山系列ES302"],
      surfaceMaterial: ["止滑膠條"],
      drainageType: ["導水溝"],
      designFeature: ["大門外側"],
      location: ["大門入口"],
    },
    specs: {
      area: "14平方公尺",
      depth: "2cm",
      width: "170cm",
      length: "820cm",
    },
  },
  {
    id: "xindian-community-building",
    title: "新店社區大樓",
    location: "新北市新店區",
    city: "新北",
    district: "新店區",
    year: 2024,
    images: [getImagePath("images/hero-mat-3.jpg")],
    description: "新店社區大樓使用20年骨架舊換新服務案例，展現易潔寶地墊系統的耐用性與專業維護服務。更新後採用新式波羅紋毯面，煥然一新。",
    tags: {
      buildingType: ["住宅大廈"],
      floorMaterial: ["地磚"],
      installationType: ["嵌入式"],
      framingType: ["AL-620"],
      surfaceMaterial: ["波羅紋毯面", "舊毯換新"],
      drainageType: ["原有排水系統"],
      designFeature: ["20年骨架舊換新", "大門內側"],
      location: ["大門入口"],
    },
    specs: {
      area: "12平方公尺",
      depth: "2cm",
      width: "150cm",
      length: "800cm",
    },
  },
  {
    id: "luzhu-semiconductor-factory",
    title: "路竹半導體12吋新廠",
    location: "高雄市路竹區",
    city: "高雄",
    district: "路竹區",
    year: 2021,
    images: [getImagePath("images/hero-mat-1.jpg")],
    description: "路竹半導體12吋新廠風除室滿鋪設計，符合半導體廠房高標準清潔要求，採用專業除塵地墊系統。",
    tags: {
      buildingType: ["廠辦"],
      floorMaterial: ["地磚"],
      installationType: ["嵌入式"],
      framingType: ["AL-620"],
      surfaceMaterial: ["波羅紋毯面", "毛刷條"],
      drainageType: ["導水溝"],
      designFeature: ["風除室-滿鋪", "半導體廠房"],
      location: ["風除室"],
    },
    specs: {
      area: "28平方公尺",
      depth: "2.5cm",
      width: "250cm",
      length: "1120cm",
    },
  },
  {
    id: "fuxing-industrial-zone",
    title: "福興工業區最高廠辦",
    location: "彰化縣福興鄉",
    city: "彰化",
    district: "福興鄉",
    year: 2023,
    images: [getImagePath("images/hero-mat-2.jpg")],
    description: "福興工業區最高廠辦入口，刮泥墊長5米2，採用行進方向分割設計，提供大面積的除泥效果。",
    tags: {
      buildingType: ["廠辦"],
      floorMaterial: ["地磚"],
      installationType: ["嵌入式"],
      framingType: ["AL-620"],
      surfaceMaterial: ["波羅紋毯面"],
      drainageType: ["導水溝"],
      designFeature: ["行進方向分割", "大門外側"],
      location: ["廠辦入口"],
    },
    specs: {
      area: "26平方公尺",
      depth: "2.5cm",
      width: "500cm",
      length: "520cm",
    },
  },
  {
    id: "wuri-smile-world",
    title: "烏日微笑世界",
    location: "台中市烏日區",
    city: "台中",
    district: "烏日區",
    year: 2021,
    images: [getImagePath("images/hero-mat-3.jpg")],
    description: "烏日微笑世界住宅大廈，採用AL620收邊框施工，貼磚後裝框最安全的施工方式，確保施工品質。",
    tags: {
      buildingType: ["住宅大廈"],
      floorMaterial: ["地磚（硬底施工）"],
      installationType: ["嵌入式"],
      framingType: ["AL-620"],
      surfaceMaterial: ["波羅紋毯面"],
      drainageType: ["導水溝"],
      designFeature: ["貼磚後裝框", "大門內側"],
      location: ["大門入口"],
    },
    specs: {
      area: "15平方公尺",
      depth: "2cm",
      width: "180cm",
      length: "830cm",
    },
  },
  {
    id: "taichung-restaurant-groove",
    title: "台中餐廳",
    location: "台中市",
    city: "台中",
    district: "",
    year: 2016,
    images: [getImagePath("images/hero-mat-1.jpg")],
    description: "台中餐廳磁磚地面採用凹槽無收邊框設計，垂直導水系統，有效處理餐廳入口的水漬與泥沙問題。",
    tags: {
      buildingType: ["餐廳"],
      floorMaterial: ["磁磚"],
      installationType: ["嵌入式"],
      framingType: ["無收邊框"],
      surfaceMaterial: ["波羅紋毯面"],
      drainageType: ["垂直導水"],
      designFeature: ["凹槽設計", "大門外側"],
      location: ["餐廳入口"],
    },
    specs: {
      area: "10平方公尺",
      depth: "2cm",
      width: "150cm",
      length: "670cm",
    },
  },
  {
    id: "windbreak-middle-passage",
    title: "風除室中間通道設計案例",
    location: "台灣",
    city: "台中",
    district: "",
    year: 2021,
    images: [getImagePath("images/hero-mat-2.jpg")],
    description: "風除室中間通道特殊設計，混搭毛刷條、橡膠條、波羅紋毯三種面料，提供最佳的除泥與防滑效果。",
    tags: {
      buildingType: ["公共建築"],
      floorMaterial: ["地磚"],
      installationType: ["嵌入式"],
      framingType: ["AL-620"],
      surfaceMaterial: ["毛刷條", "橡膠條", "波羅紋毯面"],
      drainageType: ["導水溝"],
      designFeature: ["風除室-中間通道", "混搭面料"],
      location: ["風除室"],
    },
    specs: {
      area: "20平方公尺",
      depth: "2.5cm",
      width: "200cm",
      length: "1000cm",
    },
  },
];


// Helper functions for filtering and statistics
export function getAvailableYears(): number[] {
  const yearsSet = new Set<number>();
  projects.forEach(p => yearsSet.add(p.year));
  const years = Array.from(yearsSet);
  return years.sort((a, b) => b - a);
}

export function filterProjects(filters: {
  city?: string;
  buildingType?: string;
  surfaceMaterial?: string;
  year?: number;
}): Project[] {
  return projects.filter(project => {
    if (filters.city && project.city !== filters.city) return false;
    if (filters.buildingType && !project.tags.buildingType.includes(filters.buildingType)) return false;
    if (filters.surfaceMaterial && !project.tags.surfaceMaterial.includes(filters.surfaceMaterial)) return false;
    if (filters.year && project.year !== filters.year) return false;
    return true;
  });
}

export function getTagStatistics(projectList: Project[] = projects) {
  const stats = {
    buildingTypes: {} as Record<string, number>,
    cities: {} as Record<string, number>,
    surfaceMaterials: {} as Record<string, number>,
    years: {} as Record<number, number>,
  };

  projectList.forEach(project => {
    project.tags.buildingType.forEach(type => {
      stats.buildingTypes[type] = (stats.buildingTypes[type] || 0) + 1;
    });
    stats.cities[project.city] = (stats.cities[project.city] || 0) + 1;
    project.tags.surfaceMaterial.forEach(material => {
      stats.surfaceMaterials[material] = (stats.surfaceMaterials[material] || 0) + 1;
    });
    stats.years[project.year] = (stats.years[project.year] || 0) + 1;
  });

  return stats;
}

export function getSurfaceMaterials(): string[] {
  const materials: string[] = [];
  const seen = new Set<string>();
  projects.forEach(project => {
    project.tags.surfaceMaterial.forEach(material => {
      if (!seen.has(material)) {
        materials.push(material);
        seen.add(material);
      }
    });
  });
  return materials.sort();
}
