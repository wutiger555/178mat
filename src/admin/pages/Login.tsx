/**
 * 管理後台登入頁面
 */

import { useState, FormEvent } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User, AlertCircle, Shield } from 'lucide-react';
import Logo from '@/components/Logo';
import { toast } from 'sonner';

const CORRECT_USERNAME = '178mat';
const CORRECT_PASSWORD = '178mat';
const AUTH_KEY = 'admin_authenticated';

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 模擬登入延遲
    setTimeout(() => {
      if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
        // 儲存登入狀態
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem('admin_login_time', new Date().toISOString());

        toast.success('登入成功！', {
          description: '歡迎使用易潔寶管理後台'
        });

        // 跳轉到儀表板
        setLocation('/admin');
      } else {
        setError('帳號或密碼錯誤，請重新輸入');
        toast.error('登入失敗', {
          description: '請檢查您的帳號和密碼'
        });
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-4">
      {/* 背景裝飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-red/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md relative shadow-2xl border-0">
        <CardHeader className="space-y-4 pb-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-brand-red to-brand-red-dark p-4 rounded-2xl shadow-lg">
              <Shield className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* 標題 */}
          <div className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold">
              管理後台登入
            </CardTitle>
            <CardDescription className="text-base">
              易潔寶內容管理系統
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 帳號輸入 */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                帳號
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="請輸入帳號"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 text-base"
                required
                autoComplete="username"
              />
            </div>

            {/* 密碼輸入 */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-gray-500" />
                密碼
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="請輸入密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-base"
                required
                autoComplete="current-password"
              />
            </div>

            {/* 錯誤訊息 */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 登入按鈕 */}
            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-brand-red to-brand-red-dark hover:from-brand-red-dark hover:to-brand-red shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  登入中...
                </div>
              ) : (
                '登入'
              )}
            </Button>
          </form>

          {/* 提示資訊 */}
          <div className="mt-8">
            <div className="border-t pt-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-xs text-gray-600 text-center">
                  <span className="font-semibold">🔒 安全提示：</span>
                  此為管理後台登入頁面，請使用授權帳號登入。
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * 檢查是否已登入
 */
export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

/**
 * 登出
 */
export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem('admin_login_time');
}
