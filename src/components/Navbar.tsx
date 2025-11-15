import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "首頁" },
    { href: "/about", label: "關於我們" },
    { href: "/services", label: "服務項目" },
    { href: "/projects", label: "工程實績" },
    { href: "/products", label: "產品型錄" },
    { href: "/contact", label: "聯絡我們" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? "bg-white/98 backdrop-blur-md shadow-md"
        : "bg-white/95 backdrop-blur-sm shadow-sm"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo 區域 */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              {/* Logo 圖片 */}
              <div className="relative">
                <img
                  src="/images/logo-nav.png"
                  srcSet="/images/logo-nav.png 1x, /images/logo-200.png 2x"
                  alt="易潔寶 Logo"
                  className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
                  onError={(e) => {
                    console.error('Logo failed to load');
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                {/* 備用 Logo */}
                <div className="hidden w-12 h-12 bg-gradient-to-br from-brand-red to-brand-red-dark rounded-lg items-center justify-center font-bold text-xl text-white shadow-md">
                  易
                </div>
              </div>

              {/* 公司名稱 */}
              <div className="hidden md:block">
                <div className="text-lg font-bold text-gray-900 tracking-tight">
                  易潔寶
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  SINCE 2002
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop 導航選單 */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all relative ${
                    isActive(item.href)
                      ? "text-brand-red bg-brand-red/5"
                      : "text-gray-700 hover:text-brand-red hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-red rounded-full" />
                  )}
                </button>
              </Link>
            ))}
          </div>

          {/* Desktop CTA 按鈕 */}
          <div className="hidden lg:block">
            <Link href="/contact">
              <Button
                size="sm"
                className="gap-2 bg-brand-red hover:bg-brand-red-dark text-white shadow-sm hover:shadow-md transition-all"
              >
                <Phone className="w-4 h-4" />
                立即諮詢
              </Button>
            </Link>
          </div>

          {/* Mobile 選單按鈕 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile 選單 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-gray-200 bg-white"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      isActive(item.href)
                        ? "text-brand-red bg-brand-red/5 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                </Link>
              ))}
              <Link href="/contact">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="w-full gap-2 bg-brand-red hover:bg-brand-red-dark text-white mt-4"
                >
                  <Phone className="w-4 h-4" />
                  立即諮詢
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
