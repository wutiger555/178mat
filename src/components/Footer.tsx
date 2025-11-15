import { Link } from "wouter";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Facebook, ArrowRight, Youtube } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "關於易潔寶",
      links: [
        { label: "公司簡介", href: "/about" },
        { label: "服務理念", href: "/about" },
        { label: "企業認證", href: "/about" },
        { label: "聯絡我們", href: "/contact" },
      ],
    },
    {
      title: "產品與服務",
      links: [
        { label: "嵌入式地墊", href: "/services" },
        { label: "表面式地墊", href: "/services" },
        { label: "排水式地墊", href: "/services" },
        { label: "產品型錄", href: "/products" },
      ],
    },
    {
      title: "工程實績",
      links: [
        { label: "全台案例", href: "/projects" },
        { label: "建物類型", href: "/projects" },
        { label: "地區分佈", href: "/projects" },
        { label: "最新案例", href: "/projects" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: Phone,
      label: "聯絡電話",
      value: "02-2345-3467",
      subValue: "傳真: 02-8192-7188"
    },
    {
      icon: Mail,
      label: "電子郵件",
      value: "178@178mat.com",
      subValue: "Line ID: 178mat"
    },
    {
      icon: MapPin,
      label: "公司地址",
      value: "彰化縣鹿港鎮頂草路四段396號",
      subValue: "統編: 53960999"
    },
  ];

  const BlogIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
    </svg>
  );

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/178mat", label: "Facebook" },
    { icon: Youtube, href: "https://www.youtube.com/@178mat", label: "Youtube" },
    { icon: BlogIcon, href: "http://blog.178mat.com/", label: "Blog" },
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

  return (
    <footer className="bg-gradient-to-b from-background to-card border-t border-border">
      {/* 主要內容 */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* 公司資訊 */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <Logo variant="footer" />
            </motion.div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              台灣專業除泥地墊專家，提供嵌入式、表面式、排水式、坑槽式等完整解決方案。
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="p-2 rounded-lg bg-muted hover:bg-brand-red hover:text-white transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* 快速連結 */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div key={sectionIndex} variants={itemVariants}>
              <h3 className="text-base font-bold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 4 }}
                  >
                    <Link href={link.href}>
                      <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-2 group">
                        {link.label}
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* 聯絡資訊 */}
          <motion.div variants={itemVariants}>
            <h3 className="text-base font-bold text-foreground mb-4">聯絡資訊</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3"
                    whileHover={{ x: 4 }}
                  >
                    <Icon className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-muted-foreground">
                        {info.label}
                      </div>
                      <div className="text-sm text-foreground">{info.value}</div>
                      {info.subValue && (
                        <div className="text-xs text-muted-foreground mt-1">{info.subValue}</div>
                      )}
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>

        {/* 分隔線 */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* 底部資訊 */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-sm text-muted-foreground">
            © {currentYear} 易潔寶. All rights reserved. | 工廠直營 · 施工安裝 · 台灣製造
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              隱私政策
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              服務條款
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              網站地圖
            </a>
          </div>
        </motion.div>
      </div>

      {/* 回到頂部按鈕 */}
      <motion.button
        className="fixed bottom-8 right-8 p-3 rounded-full bg-brand-red hover:bg-brand-red-dark text-white shadow-lg hover:shadow-xl transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </footer>
  );
}
