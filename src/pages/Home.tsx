import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Building2,
  Hammer,
  Zap,
  Shield,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TaiwanMapStats from "@/components/TaiwanMapStats";
import TaiwanMapVisualization from "@/components/TaiwanMapVisualization";
import TaiwanMapChoropleth from "@/components/TaiwanMapChoropleth";
import Logo from "@/components/Logo";
import HeroModern from "@/components/HeroModern";
import ServicesModern from "@/components/ServicesModern";

const heroSlides = [
  {
    image: "/images/hero-mat-1.jpg",
    title: "專業除泥地墊專家",
    subtitle: "台灣製造，專業服務，SINCE 2002",
    description: "專營台灣主要出入口之除泥地墊，包括嵌入式、表面式、排水式、坑槽式之材料、安裝、施工",
  },
  {
    image: "/images/hero-mat-2.jpg",
    title: "全台服務實績",
    subtitle: "超過1000個成功案例",
    description: "從住宅大廈到公共建築，我們的專業獲得各界肯定",
  },
  {
    image: "/images/hero-mat-3.jpg",
    title: "客製化設計服務",
    subtitle: "滿足您的獨特需求",
    description: "提供多樣化面料、收邊框與完整系統解決方案",
  },
];

const services = [
  {
    icon: Building2,
    title: "嵌入式刮泥墊",
    description: "適用於新建案與改建工程，完美嵌入地面，美觀耐用",
    features: ["地磚硬底施工", "抿石子地面", "收邊框安裝"],
    color: "from-blue-50 to-blue-100",
    borderColor: "border-blue-200",
  },
  {
    icon: Hammer,
    title: "表面式地墊",
    description: "快速安裝，無需破壞地面，適合租賃場所",
    features: ["快速安裝", "可隨時更換", "經濟實惠"],
    color: "from-amber-50 to-amber-100",
    borderColor: "border-amber-200",
  },
  {
    icon: Zap,
    title: "排水式地墊",
    description: "專業排水設計，有效處理雨天積水問題",
    features: ["導水溝設計", "預埋排水管", "加深高架"],
    color: "from-green-50 to-green-100",
    borderColor: "border-green-200",
  },
  {
    icon: Shield,
    title: "專業施工團隊",
    description: "20年以上經驗，提供完整的施工與售後服務",
    features: ["專業團隊", "品質保證", "售後服務"],
    color: "from-purple-50 to-purple-100",
    borderColor: "border-purple-200",
  },
];

const stats = [
  { value: "20+", label: "服務年資", suffix: "年" },
  { value: "1000+", label: "完工案例", suffix: "件" },
  { value: "100%", label: "客戶滿意", suffix: "" },
  { value: "全台", label: "服務範圍", suffix: "" },
];

const processSteps = [
  { step: "01", title: "需求諮詢", description: "了解您的需求與現場環境", icon: "💬" },
  { step: "02", title: "現場勘查", description: "專業團隊到府測量與評估", icon: "📏" },
  { step: "03", title: "方案設計", description: "提供客製化設計方案與報價", icon: "🎨" },
  { step: "04", title: "專業施工", description: "經驗豐富的施工團隊執行", icon: "🔨" },
  { step: "05", title: "驗收交付", description: "確保品質並提供保固服務", icon: "✅" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // 數字動畫效果
    stats.forEach((stat, index) => {
      if (stat.value.includes("+")) {
        const target = parseInt(stat.value);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setAnimatedStats((prev) => ({ ...prev, [index]: target }));
            clearInterval(timer);
          } else {
            setAnimatedStats((prev) => ({
              ...prev,
              [index]: Math.floor(current),
            }));
          }
        }, 30);
        return () => clearInterval(timer);
      }
    });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 現代化 Hero 區塊 */}
      <HeroModern />

      {/* 現代化服務展示區塊 */}
      <ServicesModern />

      {/* 施工流程區塊 - 改進設計 */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              施工流程
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              專業施工流程
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              從諮詢到交付，每一步都確保品質與專業
            </p>
          </motion.div>

          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  variants={itemVariants}
                >
                  {/* 連接線 */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-1/2 w-full h-1 bg-gradient-to-r from-primary to-transparent"></div>
                  )}

                  <div className="relative z-10">
                  <motion.div
                    className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-2">{step.icon}</div>
                        <div className="text-sm font-semibold">{step.step}</div>
                      </div>
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground text-center mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 台灣地圖與統計區塊 */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              服務範圍
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              全台灣服務網絡
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              易潔寶專業服務遍佈全台灣，為您提供最近距離的優質服務
            </p>
          </motion.div>

          <TaiwanMapChoropleth />
        </div>
      </section>

      {/* CTA 區塊 */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            準備開始您的專業地墊方案？
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            聯絡我們的專業團隊，為您量身打造最適合的解決方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                立即諮詢 <Phone className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                查看工程實績 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
