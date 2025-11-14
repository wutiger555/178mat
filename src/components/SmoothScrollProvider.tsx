import { useEffect } from 'react';
import { initSmoothScroll, destroySmoothScroll } from '@/lib/animations';

/**
 * Lenis 平滑滾動 Provider
 * 在整個應用中啟用平滑滾動
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 初始化平滑滾動
    const lenis = initSmoothScroll();

    // 清理函數
    return () => {
      destroySmoothScroll();
    };
  }, []);

  return <>{children}</>;
}
