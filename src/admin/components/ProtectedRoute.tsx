/**
 * 受保護的路由組件
 * 檢查是否已登入，未登入則跳轉到登入頁面
 */

import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { isAuthenticated } from '../pages/Login';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      setLocation('/admin/login');
    }
  }, [setLocation]);

  if (!isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}
