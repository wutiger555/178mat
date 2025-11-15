import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 驗證表單
    if (!formData.name || !formData.phone || !formData.message) {
      toast.error("請填寫必填欄位", {
        description: "姓名、電話和訊息為必填欄位",
      });
      return;
    }

    // 這裡可以接入實際的表單提交 API
    toast.success("訊息已送出", {
      description: "我們會盡快與您聯繫，感謝您的諮詢！",
    });

    // 清空表單
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="text-primary text-sm font-medium">聯絡我們</span>
            </div>
            <h1 className="mb-6">讓我們開始合作</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              無論您有任何問題或需求，歡迎隨時與我們聯繫，專業團隊將竭誠為您服務
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">線上諮詢表單</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">
                          姓名 <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="請輸入您的姓名"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">
                          聯絡電話 <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="請輸入聯絡電話"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email">電子郵件</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@email.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">公司名稱</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="請輸入公司名稱（選填）"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">
                        諮詢內容 <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="請描述您的需求，例如：建物類型、地墊尺寸、預算範圍等"
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full gap-2">
                      <Send className="w-4 h-4" />
                      送出諮詢
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">聯絡資訊</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium mb-1">電話聯絡</div>
                        <div className="text-sm text-muted-foreground">
                          TEL: (02)2345 3467
                        </div>
                        <div className="text-sm text-muted-foreground">
                          FAX: (02)8192 7188
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium mb-1">公司地址</div>
                        <div className="text-sm text-muted-foreground">
                          彰化縣鹿港鎮頂草路四段396號
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium mb-1">營業時間</div>
                        <div className="text-sm text-muted-foreground">
                          週一至週五 09:00 - 18:00
                        </div>
                        <div className="text-sm text-muted-foreground">
                          週六 09:00 - 12:00
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium mb-1">電子郵件</div>
                        <div className="text-sm text-muted-foreground">
                          178@178mat.com
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.1 3H4.9A1.9 1.9 0 003 4.9v14.2A1.9 1.9 0 004.9 21h14.2a1.9 1.9 0 001.9-1.9V4.9A1.9 1.9 0 0019.1 3zm-5.5 16.5h-3.2v-6h3.2v6zm0-7.5h-3.2V9.7h3.2V12z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium mb-1">LINE 聯絡</div>
                        <div className="text-sm text-muted-foreground">
                          ID: 178mat
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">快速聯絡</h3>
                  <div className="space-y-3">
                    <a
                      href="tel:0223453467"
                      className="block w-full"
                    >
                      <Button variant="outline" className="w-full gap-2">
                        <Phone className="w-4 h-4" />
                        撥打電話
                      </Button>
                    </a>
                    <a
                      href="https://line.me/ti/p/178mat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button variant="outline" className="w-full gap-2">
                        <Mail className="w-4 h-4" />
                        LINE 諮詢
                      </Button>
                    </a>
                    <a
                      href="mailto:178@178mat.com"
                      className="block w-full"
                    >
                      <Button variant="outline" className="w-full gap-2">
                        <Mail className="w-4 h-4" />
                        電子郵件
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-brand-red/5 to-brand-gold/5 border-brand-red/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-brand-red">企業資訊</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-border/50">
                      <span className="text-muted-foreground font-medium">統一編號</span>
                      <span className="font-semibold">53960999</span>
                    </div>
                    <div className="py-2 border-b border-border/50">
                      <div className="text-muted-foreground font-medium mb-2">經營型態</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-brand-red/10 text-brand-red rounded-full text-xs font-medium">
                          工廠直營
                        </span>
                        <span className="px-3 py-1 bg-brand-red/10 text-brand-red rounded-full text-xs font-medium">
                          施工安裝
                        </span>
                      </div>
                    </div>
                    <div className="py-2">
                      <div className="text-muted-foreground font-medium mb-2">服務對象</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-background rounded text-xs">建設開發</span>
                        <span className="px-2 py-1 bg-background rounded text-xs">營造工程</span>
                        <span className="px-2 py-1 bg-background rounded text-xs">室內設計</span>
                        <span className="px-2 py-1 bg-background rounded text-xs">公共工程</span>
                        <span className="px-2 py-1 bg-background rounded text-xs">經銷通路</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-card/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">公司位置</h2>
            <p className="text-muted-foreground">
              彰化縣鹿港鎮頂草路四段396號
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="aspect-[16/9] rounded-lg overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3646.5!2d120.4344!3d24.0614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDAzJzQxLjAiTiAxMjDCsDI2JzAzLjgiRQ!5e0!3m2!1szh-TW!2stw!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="易潔寶公司位置 - 彰化縣鹿港鎮頂草路四段396號"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-primary text-sm font-medium">常見問題</span>
            </div>
            <h2 className="mb-4">您可能想知道</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "如何取得報價？",
                a: "請透過線上表單、電話或LINE聯絡我們，提供建物類型、地墊尺寸等資訊，我們將盡快為您提供詳細報價。",
              },
              {
                q: "施工需要多久時間？",
                a: "施工時間依據地墊尺寸與類型而定，一般住宅入口約需1-2天，大型商業空間可能需要3-5天。我們會在現場勘查後提供準確的工期評估。",
              },
              {
                q: "提供保固服務嗎？",
                a: "是的，我們提供完整的保固服務。產品材料保固1年，施工品質保固6個月。保固期間如有任何問題，我們將免費維修或更換。",
              },
              {
                q: "可以提供樣品參考嗎？",
                a: "可以的，我們可以提供面料樣品供您參考。歡迎預約到公司參觀實際樣品，或是安排到府說明服務。",
              },
              {
                q: "服務範圍涵蓋哪些地區？",
                a: "我們的服務範圍涵蓋全台灣。雖然公司位於彰化，但我們在北中南都有服務案例，可以為全台客戶提供專業服務。",
              },
            ].map((faq, index) => (
              <Card key={index} className="hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
