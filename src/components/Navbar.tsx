import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
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
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isScrolled
        ? "bg-white shadow-lg border-b border-gray-100"
        : "bg-white/98 backdrop-blur-md shadow-md"
    }`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo 區域 - 改善設計 */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-4 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              {/* Logo 圖片容器 */}
              <div className="relative">
                {/* 背景光環效果 */}
                <div className="absolute -inset-2 bg-gradient-to-r from-brand-red/20 to-brand-gold/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Logo 圖片 */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <img
                    src="/images/logo.png"
                    alt="易潔寶 Logo"
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      console.error('Logo failed to load from /images/logo.png');
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.parentElement?.querySelector('.fallback-logo') as HTMLElement;
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  {/* 備用 Logo */}
                  <div className="fallback-logo hidden w-14 h-14 bg-gradient-to-br from-brand-red to-brand-red-dark rounded-xl flex items-center justify-center font-bold text-2xl text-white shadow-md">
                    易
                  </div>
                </div>
              </div>

              {/* 公司名稱和標語 */}
              <div className="hidden md:flex flex-col">
                <div className="text-xl font-bold bg-gradient-to-r from-brand-red to-brand-gold bg-clip-text text-transparent">
                  易潔寶
                </div>
                <div className="text-xs text-gray-500 font-medium tracking-wider">
                  PROFESSIONAL MAT SINCE 2002
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop 導航選單 - 改善設計 */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.button
                  className={`relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    isActive(item.href)
                      ? "text-white bg-gradient-to-r from-brand-red to-brand-red-dark shadow-md"
                      : "text-gray-700 hover:text-brand-red hover:bg-gray-50"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-brand-gold rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              </Link>
            ))}
          </div>

          {/* Desktop CTA 按鈕 - 改善設計 */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="gap-2 bg-gradient-to-r from-brand-red to-brand-red-dark hover:from-brand-red-dark hover:to-brand-red text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2.5 rounded-xl font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  立即諮詢
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile 選單按鈕 - 改善設計 */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors relative"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile 選單 - 改善設計 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-gray-200 bg-white/98 backdrop-blur-md"
          >
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={item.href}>
                    <button
                      onClick={() => setIsOpen(false)}
                      className={`w-full text-left px-5 py-3.5 rounded-xl transition-all font-medium ${
                        isActive(item.href)
                          ? "text-white bg-gradient-to-r from-brand-red to-brand-red-dark shadow-md"
                          : "text-gray-700 hover:bg-gray-50 hover:text-brand-red"
                      }`}
                    >
                      {item.label}
                    </button>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <Link href="/contact">
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="w-full gap-2 bg-gradient-to-r from-brand-red to-brand-red-dark hover:from-brand-red-dark hover:to-brand-red text-white shadow-lg py-3.5 rounded-xl font-semibold"
                  >
                    <Phone className="w-4 h-4" />
                    立即諮詢
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
