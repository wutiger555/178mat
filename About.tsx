import { Card, CardContent } from "@/components/ui/card";
import { Award, Target, TrendingUp, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="text-primary text-sm font-medium">關於我們</span>
            </div>
            <h1 className="mb-6">易潔寶的故事</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              自2002年成立以來，易潔寶始終專注於提供台灣最優質的除泥地墊產品與服務。
              我們相信，入口處的第一印象，決定了建築物的整體品質感受。
            </p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-24 bg-card/50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">專業除泥地墊領導品牌</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  易潔寶成立於2002年，是台灣專營主要出入口除泥地墊的專業廠商。
                  我們專注於提供嵌入式、表面式、排水式、坑槽式等各類型地墊的材料供應、專業安裝與施工服務。
                </p>
                <p>
                  多年來，我們堅持使用台灣製造的優質材料，結合豐富的施工經驗，
                  為全台各地的住宅大廈、商業建築、公共設施等提供最適合的地墊解決方案。
                </p>
                <p>
                  我們不僅提供自有品牌「易潔寶」鋁合金除泥墊，同時也是3M地墊門墊的授權供應商，
                  並提供各品牌鋁合金地墊的換毯服務，確保客戶能夠獲得最完整的產品選擇與售後服務。
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img
                  src="/images/hero-mat-3.jpg"
                  alt="易潔寶專業團隊"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl">
                <div className="text-4xl font-bold mb-1">20+</div>
                <div className="text-sm">年專業經驗</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-primary text-sm font-medium">核心價值</span>
            </div>
            <h2 className="mb-4">我們的經營理念</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              以專業、品質、服務為核心，為每一位客戶創造最大價值
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: "專業專注",
                description: "20年來專注於除泥地墊領域，累積豐富的專業知識與施工經驗",
              },
              {
                icon: Award,
                title: "品質至上",
                description: "堅持使用台灣製造的優質材料，嚴格把關每一個施工細節",
              },
              {
                icon: Users,
                title: "客戶導向",
                description: "提供客製化設計服務，依據客戶需求打造最適合的解決方案",
              },
              {
                icon: TrendingUp,
                title: "持續創新",
                description: "不斷研發新產品與施工技術，提供客戶最先進的地墊系統",
              },
            ].map((value, index) => (
              <Card key={index} className="text-center hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-primary text-sm font-medium">發展歷程</span>
            </div>
            <h2 className="mb-4">易潔寶的成長軌跡</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  year: "2002",
                  title: "公司成立",
                  description: "易潔寶正式成立，開始專注於除泥地墊的研發與銷售",
                },
                {
                  year: "2005",
                  title: "擴大服務範圍",
                  description: "開始提供專業施工服務，建立完整的產品與服務體系",
                },
                {
                  year: "2010",
                  title: "品牌升級",
                  description: "推出自有品牌「易潔寶」鋁合金除泥墊系列產品",
                },
                {
                  year: "2015",
                  title: "市場領導地位",
                  description: "成為台灣除泥地墊市場的領導品牌，服務案例突破500個",
                },
                {
                  year: "2020",
                  title: "技術創新",
                  description: "引進最新的排水系統技術，提供更完善的地墊解決方案",
                },
                {
                  year: "2025",
                  title: "持續成長",
                  description: "服務案例超過1000個，持續為台灣建築業提供優質服務",
                },
              ].map((milestone, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-24 text-right">
                    <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20" />
                    {index < 5 && (
                      <div className="w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Advantages */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-primary text-sm font-medium">專業優勢</span>
            </div>
            <h2 className="mb-4">為什麼選擇易潔寶</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "台灣製造",
                description: "堅持使用台灣製造的優質材料，品質有保證，支持在地產業",
                stats: "100%",
              },
              {
                title: "專業經驗",
                description: "超過20年的專業經驗，服務案例遍布全台各地",
                stats: "20+ 年",
              },
              {
                title: "完工案例",
                description: "成功完成超過1000個案場的地墊安裝與施工",
                stats: "1000+",
              },
              {
                title: "客製化服務",
                description: "提供專業的設計諮詢，依據現場需求量身打造",
                stats: "100%",
              },
              {
                title: "完整服務",
                description: "從設計、材料、施工到售後維護，一站式服務",
                stats: "全方位",
              },
              {
                title: "品質保證",
                description: "嚴格的品質控管，確保每個專案都達到最高標準",
                stats: "高品質",
              },
            ].map((advantage, index) => (
              <Card key={index} className="hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-3">{advantage.stats}</div>
                  <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
