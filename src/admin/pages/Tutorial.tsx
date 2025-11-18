/**
 * 管理後台使用教學頁面
 */

import AdminLayout from '../components/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  FileEdit,
  Image,
  Map,
  Settings,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Play,
  Lightbulb,
  HelpCircle,
  FolderOpen,
  Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Tutorial() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* 頁面標題 */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                管理後台使用教學
              </h1>
              <p className="text-gray-600 mt-1">
                一步步教你如何使用易潔寶內容管理系統
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 mt-4">
            <p className="text-sm text-gray-700">
              👋 <span className="font-semibold">歡迎！</span>
              這個教學會手把手帶你了解如何使用管理後台更新網站內容，
              即使你沒有技術背景也能輕鬆上手。請跟著下方步驟一步步操作。
            </p>
          </div>
        </div>

        {/* 快速開始 */}
        <Card className="border-2 border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <Play className="w-6 h-6" />
              快速開始：5 分鐘上手
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { num: 1, title: '登入', icon: '🔐' },
                { num: 2, title: '編輯內容', icon: '✏️' },
                { num: 3, title: '匯出資料', icon: '💾' },
                { num: 4, title: '上傳檔案', icon: '📤' },
                { num: 5, title: '發布更新', icon: '🚀' },
              ].map((step) => (
                <div key={step.num} className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="text-3xl mb-2">{step.icon}</div>
                  <div className="text-sm font-semibold text-gray-700">
                    {step.num}. {step.title}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 第一步：登入系統 */}
        <Card>
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-2">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              登入管理後台
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                登入資訊
              </h4>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  🔑 請向技術人員索取管理後台的登入帳號和密碼。<br/>
                  帳號密碼會另外提供給您，請妥善保管。
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">📝 操作步驟：</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>開啟瀏覽器（建議使用 Chrome 或 Edge）</li>
                <li>在網址列輸入：<code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000/178mat/admin/login</code></li>
                <li>在「帳號」欄位輸入技術人員提供的帳號</li>
                <li>在「密碼」欄位輸入技術人員提供的密碼</li>
                <li>點擊「登入」按鈕</li>
                <li>看到儀表板就代表登入成功了！🎉</li>
              </ol>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                <span>
                  <strong>重要：</strong>這個管理後台只能在開發環境（你的電腦）使用，
                  正式網站上不會顯示，所以不用擔心安全問題。
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 第二步：認識介面 */}
        <Card>
          <CardHeader className="bg-purple-50">
            <CardTitle className="flex items-center gap-2">
              <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              認識管理後台介面
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-blue-600" />
                    工程實績管理
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-700">
                  <p>管理所有的工程案例，可以新增、編輯、刪除工程資訊。</p>
                  <Link href="/admin/projects">
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      前往管理 <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="w-5 h-5 text-green-600" />
                    產品型錄管理
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-700">
                  <p>管理所有的產品資訊，可以新增、編輯、刪除產品。</p>
                  <Link href="/admin/products">
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      前往管理 <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Image className="w-5 h-5 text-purple-600" />
                    媒體庫管理
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-700">
                  <p>管理圖片和 YouTube 影片連結。</p>
                  <Link href="/admin/media">
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      前往管理 <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Map className="w-5 h-5 text-orange-600" />
                    地圖管理
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-700">
                  <p>更新台灣各縣市的案場數量。</p>
                  <Link href="/admin/map">
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      前往管理 <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="bg-gray-50 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Settings className="w-5 h-5 text-gray-600" />
                    網站設定
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-700">
                  <p>控制導航選單，決定哪些頁面要顯示。</p>
                  <Link href="/admin/settings">
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      前往設定 <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* 第三步：編輯內容 */}
        <Card>
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center gap-2">
              <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              編輯網站內容
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-4">
                🎯 範例：新增一個工程案例
              </h4>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
                <li>
                  點擊左側選單的「<strong>工程實績</strong>」
                  <div className="ml-6 mt-2 text-sm text-gray-600">
                    → 會看到所有的工程案例列表
                  </div>
                </li>
                <li>
                  點擊右上角的「<strong>新增工程</strong>」按鈕（綠色按鈕）
                  <div className="ml-6 mt-2 text-sm text-gray-600">
                    → 會彈出一個表單視窗
                  </div>
                </li>
                <li>
                  填寫工程資訊：
                  <div className="ml-6 mt-2 space-y-2">
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm"><strong>工程名稱</strong>：例如「台北101大樓地墊施工」</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm"><strong>地點</strong>：選擇縣市和區域</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm"><strong>年份</strong>：選擇施工年份</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200">
                      <p className="text-sm"><strong>描述</strong>：簡單說明這個工程</p>
                    </div>
                  </div>
                </li>
                <li>
                  選擇照片（點擊「選擇圖片」按鈕）
                  <div className="ml-6 mt-2 text-sm text-gray-600">
                    → 從圖片庫中選擇相關照片
                  </div>
                </li>
                <li>
                  點擊「<strong>儲存</strong>」按鈕
                  <div className="ml-6 mt-2 text-sm text-green-600 font-medium">
                    ✅ 完成！你的資料已經儲存到瀏覽器了
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-900">
                  <p className="font-semibold mb-1">💡 小提示：</p>
                  <p>
                    此時資料只存在你的電腦瀏覽器中，還沒有發布到網站。
                    要讓其他人看到更新，請繼續下一步「發布到網站」。
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 第四步：發布更新 */}
        <Card className="border-2 border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center gap-2">
              <div className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              發布更新到網站（最重要！）
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
              <p className="text-red-900 font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                重要：完成編輯後，一定要執行這一步，網站才會更新！
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 text-lg">
                📤 發布步驟（請完整執行）：
              </h4>

              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: '回到儀表板（Dashboard）',
                    desc: '點擊左側選單最上方的「儀表板」',
                    icon: '📊',
                  },
                  {
                    step: 2,
                    title: '找到「發布更新到網站」區塊',
                    desc: '這是一個綠色的大卡片，在頁面下方',
                    icon: '🎯',
                  },
                  {
                    step: 3,
                    title: '點擊「匯出所有資料」按鈕',
                    desc: '會自動下載兩個檔案到你的電腦',
                    icon: '💾',
                  },
                  {
                    step: 4,
                    title: '將檔案交給技術人員',
                    desc: '把下載的檔案給技術人員，他們會幫你上傳',
                    icon: '👨‍💻',
                  },
                  {
                    step: 5,
                    title: '等待更新完成',
                    desc: '通常 2-3 分鐘後網站就會更新了',
                    icon: '⏰',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-4 bg-white p-4 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <div className="text-3xl">{item.icon}</div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-1">
                        步驟 {item.step}：{item.title}
                      </h5>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                技術人員會做的事（你不需要操心）：
              </h4>
              <ul className="space-y-2 text-sm text-green-800 ml-6">
                <li>• 將你提供的檔案放到正確的位置</li>
                <li>• 執行必要的指令</li>
                <li>• 上傳到 GitHub</li>
                <li>• 等待自動部署完成</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 常見問題 */}
        <Card>
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-gray-600" />
              常見問題 FAQ
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {[
              {
                q: '我編輯完內容，為什麼網站沒有更新？',
                a: '因為你只是在本地編輯，還沒有「發布」。請按照上方「第4步：發布更新到網站」的流程操作。',
              },
              {
                q: '我可以直接在正式網站上編輯嗎？',
                a: '不行。管理後台只能在開發環境（你的電腦）使用，這是為了安全考量。',
              },
              {
                q: '如果我編輯錯了怎麼辦？',
                a: '不用擔心！你可以隨時重新編輯。如果已經發布，也可以請技術人員幫你復原到之前的版本。',
              },
              {
                q: '我需要學習程式設計嗎？',
                a: '完全不需要！這個管理後台就是為了讓不懂技術的人也能輕鬆管理網站內容而設計的。',
              },
              {
                q: '多久可以看到網站更新？',
                a: '從技術人員上傳檔案開始，通常 2-3 分鐘內就會完成自動部署。',
              },
            ].map((faq, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <h4 className="font-semibold text-gray-900 mb-2">Q: {faq.q}</h4>
                <p className="text-gray-700 text-sm">A: {faq.a}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 需要協助 */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="pt-6 text-center">
            <div className="inline-block bg-purple-600 p-4 rounded-full mb-4">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              需要協助嗎？
            </h3>
            <p className="text-gray-600 mb-6">
              如果在使用過程中遇到任何問題，隨時可以聯繫技術人員尋求協助。
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/admin">
                <Button className="gap-2">
                  返回儀表板
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
