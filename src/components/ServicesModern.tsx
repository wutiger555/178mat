import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Building2, Hammer, Droplets, Wrench, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fadeInUp, scaleIn } from '@/lib/animations';
import { gsap } from 'gsap';
import { getImagePath } from '@/utils/paths';

interface Service {
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  color: string;
  link: string;
}

const services: Service[] = [
  {
    icon: Building2,
    title: '嵌入式刮泥墊',
    subtitle: 'Embedded Mat System',
    description: '適用於新建案與改建工程，完美嵌入地面，美觀耐用。適合大樓、商辦、公共建築等高端場所。',
    features: ['地磚硬底施工', '抿石子地面適用', '鋁合金收邊框', '客製化尺寸'],
    image: getImagePath('images/hero-mat-1.jpg'),
    color: '#B8382D',
    link: '/services#embedded',
  },
  {
    icon: Droplets,
    title: '排水式地墊',
    subtitle: 'Drainage Mat System',
    description: '專業排水設計，有效處理雨天積水問題。適合戶外出入口、風除室等易積水區域。',
    features: ['導水溝設計', '預埋排水管', '加深高架地墊', '快速排水'],
    image: getImagePath('images/hero-mat-2.jpg'),
    color: '#2D9D5F',
    link: '/services#drainage',
  },
  {
    icon: Hammer,
    title: '表面式地墊',
    subtitle: 'Surface Mat System',
    description: '快速安裝，無需破壞地面，適合租賃場所。經濟實惠，可隨時更換升級。',
    features: ['快速安裝', '無需破壞地面', '可隨時更換', '經濟實惠'],
    image: getImagePath('images/hero-mat-3.jpg'),
    color: '#D4AF37',
    link: '/services#surface',
  },
  {
    icon: Wrench,
    title: '專業施工服務',
    subtitle: 'Professional Installation',
    description: '20年以上施工經驗，專業團隊提供完整的測量、設計、施工與售後服務。',
    features: ['專業團隊', '完整規劃', '品質保證', '售後服務'],
    image: getImagePath('images/hero-mat-1.jpg'),
    color: '#4A4A4A',
    link: '/services',
  },
];

export default function ServicesModern() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 標題動畫
    if (titleRef.current) {
      fadeInUp(titleRef.current, {
        start: 'top 85%',
        duration: 1,
      });
    }

    // 卡片依序進入動畫
    cardsRef.current.forEach((card, index) => {
      if (card) {
        scaleIn(card, {
          start: 'top 85%',
          duration: 0.8,
          scale: 0.9,
          stagger: 0.15 * index,
        });

        // Hover 3D 傾斜效果
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -8;
          const rotateY = ((x - centerX) / centerX) * 8;

          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: 'power2.out',
          });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    });
  }, []);

  return (
    <section
      id="services-section"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white overflow-hidden"
    >
      {/* 背景裝飾 */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            color: 'var(--brand-red)',
          }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* 標題區 */}
        <div ref={titleRef} className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm font-bold tracking-widest uppercase text-brand-red bg-brand-red/10 px-4 py-2 rounded-full">
              Our Services
            </span>
          </div>
          <h2 className="display-2 text-dark-900 mb-6">
            我們的專業服務
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-red to-transparent mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            提供嵌入式、排水式、表面式等多種地墊系統
            <br />
            專業團隊為您量身打造最適合的解決方案
          </p>
        </div>

        {/* 服務卡片網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group relative will-change-transform"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <Link href={service.link}>
                  <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 cursor-pointer">
                    {/* 圖片背景 */}
                    <div className="relative h-64 overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                        style={{
                          backgroundImage: `url(${service.image})`,
                        }}
                      ></div>
                      {/* 深色漸層遮罩 */}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
                      ></div>

                      {/* Icon */}
                      <div className="absolute top-6 left-6">
                        <div
                          className="p-4 rounded-2xl backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: `linear-gradient(135deg, ${service.color}DD, ${service.color}AA)`,
                          }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* 標題（覆蓋在圖片上） */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-3xl font-bold text-white mb-1">
                          {service.title}
                        </h3>
                        <p className="text-sm text-gray-300 font-medium tracking-wide">
                          {service.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* 內容區 */}
                    <div className="p-8">
                      <p className="text-gray-700 mb-6 leading-relaxed">
                        {service.description}
                      </p>

                      {/* 特點列表 */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: service.color }}
                            ></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-sm font-semibold text-gray-500">
                          了解更多
                        </span>
                        <div
                          className="p-2 rounded-full group-hover:translate-x-1 transition-transform duration-300"
                          style={{ backgroundColor: `${service.color}15` }}
                        >
                          <ArrowRight
                            className="w-5 h-5"
                            style={{ color: service.color }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Hover 邊框效果 */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        boxShadow: `0 0 0 2px ${service.color}40`,
                      }}
                    ></div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* 查看全部服務按鈕 */}
        <div className="text-center mt-16">
          <Link href="/services">
            <Button
              size="lg"
              className="bg-dark-900 hover:bg-dark-800 text-white px-10 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              查看完整服務項目
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
