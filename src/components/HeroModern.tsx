import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Logo from '@/components/Logo';
import { fadeInUp, parallax, scaleIn, scrollTo } from '@/lib/animations';
import { gsap } from 'gsap';

/**
 * 現代化 Hero 區塊
 * 基於 2025 年企業設計趨勢
 * - 極簡主義
 * - 大膽排版
 * - LOGO 視覺焦點
 * - 視差效果
 */
export default function HeroModern() {
  const heroRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 頁面載入動畫
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(logoRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)',
    })
      .from(
        titleRef.current,
        {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .from(
        statsRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .from(
        ctaRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.4'
      );

    // 背景視差效果
    if (bgRef.current) {
      parallax(bgRef.current, {
        yPercent: -30,
        start: 'top top',
        end: 'bottom top',
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleScrollDown = () => {
    scrollTo('#services-section', { offset: -80, duration: 1.5 });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-dark-800 to-black"
    >
      {/* 背景圖片 + 視差效果 */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url(/images/hero-mat-1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* 深色遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

        {/* 網格紋理 */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(var(--brand-red) 1px, transparent 1px),
                             linear-gradient(90deg, var(--brand-red) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* 主要內容 */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* LOGO - 視覺焦點 */}
        <div ref={logoRef} className="mb-12 flex justify-center">
          <div className="relative">
            <Logo variant="hero" className="drop-shadow-2xl will-change-transform" />
            {/* LOGO 光暈效果 */}
            <div className="absolute inset-0 blur-3xl opacity-30 bg-brand-red rounded-full"></div>
          </div>
        </div>

        {/* 主標題 - 大膽排版 */}
        <h1
          ref={titleRef}
          className="display-1 text-white mb-6 will-change-transform"
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <span className="block">專業除泥地墊專家</span>
          <span className="block text-brand-gold mt-4">
            台灣製造 · 品質保證
          </span>
        </h1>

        {/* 副標題 */}
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed will-change-transform"
        >
          SINCE 2002 · 專營台灣主要出入口之除泥地墊
          <br />
          嵌入式 · 表面式 · 排水式 · 坑槽式 完整解決方案
        </p>

        {/* 數據展示 - 簡潔有力 */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto mb-16 will-change-transform"
        >
          {[
            { value: '20+', label: '服務年資', unit: '年' },
            { value: '1000+', label: '完工案例', unit: '件' },
            { value: '100%', label: '客戶滿意', unit: '' },
            { value: '全台', label: '服務範圍', unit: '' },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group cursor-default"
            >
              <div className="absolute inset-0 bg-brand-red/10 rounded-2xl blur-xl group-hover:bg-brand-red/20 transition-colors duration-500"></div>
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-brand-red/50 transition-all duration-300">
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">
                  {stat.label}
                </div>
                {stat.unit && (
                  <div className="text-xs text-brand-gold mt-1">
                    {stat.unit}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA 按鈕 */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center will-change-transform">
          <Link href="/projects">
            <Button
              size="lg"
              className="bg-brand-red hover:bg-brand-red-dark text-white px-8 py-6 text-lg font-semibold shadow-brand transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              查看工程實績
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-dark-900 px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              立即諮詢
            </Button>
          </Link>
        </div>

        {/* 滾動提示 */}
        <button
          onClick={handleScrollDown}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 group cursor-pointer"
          aria-label="向下滾動"
        >
          <span className="text-sm font-medium tracking-wider uppercase">探索更多</span>
          <ChevronDown className="w-6 h-6 animate-bounce group-hover:text-brand-gold transition-colors" />
        </button>
      </div>

      {/* 裝飾性漸層 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
}
