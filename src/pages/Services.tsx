import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Building2,
  Layers,
  Droplets,
  Grid3x3,
  Wrench,
  RefreshCw,
  Package,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { getImagePath } from '@/utils/paths';

export default function Services() {
  const mainServices = [
    {
      icon: Building2,
      title: "嵌入式刮泥墊",
      subtitle: "地磚、抿石子地面專用",
      description:
        "嵌入式刮泥墊是最常見的地墊類型，完美嵌入地面，與地面齊平，不影響門扇開關。適用於地磚、抿石子等硬質地面，提供美觀且耐用的解決方案。",
      features: [
        "與地面完美齊平",
        "不影響門扇開關",
        "適用各種硬質地面",
        "多種收邊框選擇",
        "客製化尺寸設計",
      ],
      applications: ["住宅大廈入口", "商業大樓大廳", "公共建築風除室"],
    },
    {
      icon: Layers,
      title: "表面式地墊",
      subtitle: "快速安裝、靈活應用",
      description:
        "表面式地墊直接鋪設於地面上，安裝快速方便，適合各種地面材質。厚度約2cm，提供良好的除泥效果，且可隨時移動或更換。",
      features: [
        "快速安裝施工",
        "適用各種地面",
        "可隨時移動更換",
        "多種尺寸規格",
        "經濟實惠選擇",
      ],
      applications: ["辦公室入口", "店面門口", "臨時活動場地"],
    },
    {
      icon: Droplets,
      title: "排水式地墊",
      subtitle: "導水溝設計、保持乾爽",
      description:
        "排水式地墊配備專業的導水溝設計，能有效收集並排除水分，特別適合多雨地區或需要高度防水的場所。包含預埋排水管、導水溝、加深高架等多種設計。",
      features: [
        "專業導水溝設計",
        "有效排水系統",
        "預埋排水管選項",
        "加深高架設計",
        "保持入口乾爽",
      ],
      applications: ["多雨地區建築", "地下室入口", "戶外風除室"],
    },
    {
      icon: Grid3x3,
      title: "坑槽式地墊",
      subtitle: "預留坑槽、完美嵌入",
      description:
        "坑槽式地墊需要在施工階段預留坑槽，提供最穩固的安裝方式。適合新建案或大型改建工程，可依據設計需求客製化尺寸與深度。",
      features: [
        "預留坑槽施工",
        "最穩固的安裝",
        "客製化深度設計",
        "適合新建案",
        "長期耐用性高",
      ],
      applications: ["新建案規劃", "大型改建工程", "高級住宅社區"],
    },
  ];

  const additionalServices = [
    {
      icon: Wrench,
      title: "專業施工服務",
      description: "經驗豐富的施工團隊，提供完整的安裝與維護服務，包含地鉸鍊施工、地閂防塵套、異形切割、泥作導水溝等專業服務。",
    },
    {
      icon: Package,
      title: "3M地墊供應",
      description: "授權供應3M品牌地墊門墊，提供多種規格與款式選擇，確保客戶能夠獲得國際品牌的優質產品。",
    },
    {
      icon: RefreshCw,
      title: "舊毯換新服務",
      description: "提供各品牌鋁合金地墊的換毯服務，延長地墊使用壽命，降低維護成本，保持入口美觀整潔。",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="text-primary text-sm font-medium">服務項目</span>
            </div>
            <h1 className="mb-6">全方位地墊解決方案</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              從設計規劃到施工安裝，提供最完整的除泥地墊產品與服務
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24">
        <div className="container">
          <div className="space-y-24">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold mb-1">{service.title}</h2>
                      <p className="text-muted-foreground">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-lg font-bold mb-3">產品特色</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-3">適用場所</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.applications.map((app, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <Card className="overflow-hidden">
                    <div className="aspect-[4/3]">
                      <img
                        src={getImagePath(`images/hero-mat-${(index % 3) + 1}.jpg`)}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-primary text-sm font-medium">延伸服務</span>
            </div>
            <h2 className="mb-4">更多專業服務</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              除了地墊產品，我們還提供完整的配套服務
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-primary text-sm font-medium">服務流程</span>
            </div>
            <h2 className="mb-4">專業的服務流程</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              從諮詢到完工，每個步驟都精心規劃
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "需求諮詢",
                description: "了解您的需求，提供專業建議與初步規劃",
              },
              {
                step: "02",
                title: "現場勘查",
                description: "實地測量與評估，確認施工細節與規格",
              },
              {
                step: "03",
                title: "方案設計",
                description: "提供詳細的設計方案與報價，包含圖面與材料規格",
              },
              {
                step: "04",
                title: "專業施工",
                description: "經驗豐富的施工團隊，確保品質與工期",
              },
            ].map((process, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">{process.step}</div>
                <h3 className="text-xl font-bold mb-2">{process.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {process.description}
                </p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 -right-3 text-primary/30">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">需要專業的地墊解決方案？</h2>
            <p className="text-xl text-muted-foreground mb-8">
              立即聯絡我們，讓專業團隊為您提供最適合的服務
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="gap-2">
                  立即諮詢
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline">
                  查看產品型錄
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
