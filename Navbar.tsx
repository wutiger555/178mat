import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { APP_TITLE } from "@/const";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

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
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 cursor-pointer group"
              whileHover={{ x: 4 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-md"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                易
              </motion.div>
              <div>
                <div className="text-lg font-bold text-foreground tracking-tight">
                  {APP_TITLE}
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  SINCE 2002
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={item.href}>
                  <motion.span
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all relative ${
                      isActive(item.href)
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-transparent rounded-full"
                        layoutId="navbar-underline"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  立即諮詢
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
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
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="lg:hidden py-4 border-t border-border/50"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={item.href}>
                      <motion.span
                        className={`block px-4 py-3 text-base font-medium rounded-lg transition-all ${
                          isActive(item.href)
                            ? "text-primary bg-primary/10"
                            : "text-foreground/70 hover:text-foreground hover:bg-muted"
                        }`}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  className="pt-2 mt-2 border-t border-border/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link href="/contact">
                    <Button
                      size="sm"
                      className="w-full gap-2 bg-primary hover:bg-primary/90 text-white"
                      onClick={() => setIsOpen(false)}
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
      </div>
    </motion.nav>
  );
}
