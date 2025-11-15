import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand-red mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          找不到頁面
        </h2>
        <p className="text-gray-600 mb-8">
          抱歉，您要訪問的頁面不存在。
        </p>
        <Link href="/">
          <a className="inline-block bg-brand-red text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
            返回首頁
          </a>
        </Link>
      </div>
    </div>
  );
}
