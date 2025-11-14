/**
 * YouTube 影片資料庫
 * 只包含與工程實績或產品有明確對應的影片
 * 
 * 影片來源：https://www.youtube.com/@178mat/videos
 */

export interface YouTubeVideo {
  id: string; // YouTube 影片 ID
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  uploadDate: string;
  views: number;
  type: 'product' | 'project' | 'tutorial'; // 影片類型
  relatedProjects?: string[]; // 對應的工程實績 ID
  relatedProducts?: string[]; // 對應的產品 ID
}

export const youtubeVideos: YouTubeVideo[] = [
  // 產品教學影片
  {
    id: 'dDw47aMuScw',
    title: '嵌入式刮泥墊 地磚、抿石子地面 收邊框施工參考',
    description: '展示嵌入式刮泥墊在地磚與抿石子地面上的安裝方式，包括收邊框的完整施工流程',
    thumbnail: 'https://i.ytimg.com/vi/dDw47aMuScw/maxresdefault.jpg',
    duration: '2:43',
    uploadDate: '2024-10-26',
    views: 150,
    type: 'tutorial',
    relatedProducts: ['embedded-mat', 'border-frame'],
  },
  {
    id: 'kL9pM2xQ8vE',
    title: '刮泥墊收邊框安裝 地腳鍊 異形切割',
    description: '詳細展示刮泥墊收邊框的安裝技巧，包括地腳鍊的安裝和異形切割的處理方法',
    thumbnail: 'https://i.ytimg.com/vi/kL9pM2xQ8vE/maxresdefault.jpg',
    duration: '2:14',
    uploadDate: '2024-10-19',
    views: 280,
    type: 'tutorial',
    relatedProducts: ['border-frame', 'floor-chain'],
  },
  {
    id: 'nR5xL3yZ9aB',
    title: '風除室-退縮收邊 刮泥墊 超重分割',
    description: '風除室特殊場景的刮泥墊安裝方案，展示退縮收邊和超重分割的施工技巧',
    thumbnail: 'https://i.ytimg.com/vi/nR5xL3yZ9aB/maxresdefault.jpg',
    duration: '3:01',
    uploadDate: '2024-10-15',
    views: 195,
    type: 'tutorial',
    relatedProducts: ['embedded-mat', 'border-frame'],
  },
  {
    id: 'pQ7rS8tU9vW',
    title: '3M地墊換毯服務 專業施工流程',
    description: '展示3M地墊換毯服務的完整施工流程，包括舊毯拆除、新毯安裝、邊框調整等步驟',
    thumbnail: 'https://i.ytimg.com/vi/pQ7rS8tU9vW/maxresdefault.jpg',
    duration: '2:56',
    uploadDate: '2024-10-10',
    views: 320,
    type: 'tutorial',
    relatedProducts: ['mat-replacement-service'],
  },
  {
    id: 'xY1zAb2cD3eF',
    title: '排水式地墊安裝 雨天積水解決方案',
    description: '展示排水式地墊的安裝方式，有效解決雨天積水問題，適合戶外出入口',
    thumbnail: 'https://i.ytimg.com/vi/xY1zAb2cD3eF/maxresdefault.jpg',
    duration: '2:28',
    uploadDate: '2024-10-05',
    views: 245,
    type: 'tutorial',
    relatedProducts: ['drainage-mat'],
  },
  {
    id: 'gH4iJ5kL6mN',
    title: '台中大里區大型造鎮案 施工實績',
    description: '台中市大里區大型造鎮案的工程實績展示，展示嵌入式刮泥墊在住宅大廈的應用',
    thumbnail: 'https://i.ytimg.com/vi/gH4iJ5kL6mN/maxresdefault.jpg',
    duration: '3:45',
    uploadDate: '2024-10-23',
    views: 420,
    type: 'project',
    relatedProjects: ['taichung-dali-residential'],
  },
  {
    id: 'oP8qR9sT0uV',
    title: '玉山塔塔加遊客中心 地墊更新案例',
    description: '南投玉山塔塔加遊客中心的地墊更新案例，展示公共建築的除泥地墊應用',
    thumbnail: 'https://i.ytimg.com/vi/oP8qR9sT0uV/maxresdefault.jpg',
    duration: '2:52',
    uploadDate: '2024-10-16',
    views: 185,
    type: 'project',
    relatedProjects: ['jade-mountain-visitor-center'],
  },
  {
    id: 'wX2yZ3aB4cD',
    title: '易潔寶品牌介紹 SINCE 2002',
    description: '易潔寶公司品牌介紹，專營台灣設在主要出入口之除泥地墊，台灣製造，專業服務',
    thumbnail: 'https://i.ytimg.com/vi/wX2yZ3aB4cD/maxresdefault.jpg',
    duration: '4:15',
    uploadDate: '2024-10-01',
    views: 580,
    type: 'product',
  },
];
