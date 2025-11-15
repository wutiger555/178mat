/**
 * 獲取正確的圖片路徑，考慮 base URL
 * @param path 相對於 public 資料夾的路徑（不含開頭的 /）
 * @returns 完整的圖片路徑
 */
export function getImagePath(path: string): string {
  const base = import.meta.env.BASE_URL || '/';
  // 移除 path 開頭的 / 如果有的話
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}

/**
 * 獲取正確的公共資源路徑
 * @param path 相對於 public 資料夾的路徑
 * @returns 完整的資源路徑
 */
export function getPublicPath(path: string): string {
  return getImagePath(path);
}
