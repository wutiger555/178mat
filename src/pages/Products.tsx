import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Download, CheckCircle2, Layers } from "lucide-react";
import { products, productCategories } from "@/data/products";
import { toast } from "sonner";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("全部");

  const filteredProducts =
    selectedCategory === "全部"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleDownloadDWG = () => {
    // 開啟 Google Drive 資料夾
    window.open("https://drive.google.com/drive/folders/0B-vtvDXp7iVQNkN5REthbFpCc0U?resourcekey=0-zUjBecW9sVt6bk5cgv7Ksw", "_blank");
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="text-primary text-sm font-medium">產品型錄</span>
            </div>
            <h1 className="mb-6">完整產品系列</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              提供多樣化的面料、收邊框與完整系統解決方案，滿足各種建築需求
            </p>
            <div className="mt-8">
              <Button onClick={handleDownloadDWG} className="gap-2">
                <Download className="w-4 h-4" />
                下載 DWG 圖檔
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-card/50 sticky top-20 z-40 border-b border-border">
        <div className="container">
          <div className="flex flex-wrap gap-3 justify-center">
            {productCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
          <div className="text-center mt-4 text-sm text-muted-foreground">
            共 {filteredProducts.length} 項產品
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      {product.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Specifications */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Layers className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">
                        {product.specifications.material}
                      </span>
                    </div>
                    {product.specifications.colors && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">顏色：</span>
                        <div className="flex gap-1">
                          {product.specifications.colors.map((color, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">產品特色</div>
                    <div className="space-y-1">
                      {product.specifications.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Applications */}
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">適用場所</div>
                    <div className="flex flex-wrap gap-1">
                      {product.applications.map((app, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {product.price && (
                    <div className="text-sm text-muted-foreground mb-4">
                      價格：{product.price}
                    </div>
                  )}

                  <Link href="/contact">
                    <Button variant="outline" className="w-full">
                      立即詢價
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">找不到相關產品</h3>
              <p className="text-muted-foreground">請嘗試選擇其他分類</p>
            </div>
          )}
        </div>
      </section>

      {/* Material Samples Section */}
      <section className="py-24 bg-card/50">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-primary text-sm font-medium">面料樣品</span>
            </div>
            <h2 className="mb-4">常用面料選項</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              提供多種面料選擇，可依據使用環境與需求搭配
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "波羅紋毯面",
                description: "經典除泥材質，耐用易清潔",
                colors: ["灰色", "黑色", "棕色", "紅色"],
              },
              {
                name: "止滑膠條",
                description: "橡膠材質，優異止滑效果",
                colors: ["黑色"],
              },
              {
                name: "毛刷條",
                description: "尼龍刷毛，有效刮除泥沙",
                colors: ["黑色", "灰色"],
              },
              {
                name: "組合式",
                description: "多種材料組合，效果更佳",
                colors: ["可客製化"],
              },
            ].map((material, index) => (
              <Card key={index} className="hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2">{material.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{material.description}</p>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">可選顏色</div>
                    <div className="flex flex-wrap gap-2">
                      {material.colors.map((color, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Frame Options Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <span className="text-primary text-sm font-medium">收邊框選項</span>
            </div>
            <h2 className="mb-4">多樣化收邊框</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              提供多種收邊框設計，滿足不同施工需求與美觀要求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "AL-620 鋁合金框",
                description: "易潔寶經典款式，適用於各種嵌入式地墊",
                features: ["台灣製造", "堅固耐用", "易於安裝"],
              },
              {
                name: "不鏽鋼框",
                description: "高級質感，適合高端商業空間",
                features: ["永不生鏽", "高級質感", "適合戶外"],
              },
              {
                name: "1字型扁鋁框",
                description: "極簡設計，適合現代建築風格",
                features: ["極簡風格", "低調美觀", "輕量化"],
              },
            ].map((frame, index) => (
              <Card key={index} className="hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{frame.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{frame.description}</p>
                  <div className="space-y-2">
                    {frame.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">需要更詳細的產品資訊？</h2>
            <p className="text-xl text-muted-foreground mb-8">
              歡迎聯絡我們，我們將提供完整的產品型錄與專業建議
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">立即諮詢</Button>
              </Link>
              <Button size="lg" variant="outline" onClick={handleDownloadDWG} className="gap-2">
                <Download className="w-4 h-4" />
                下載 DWG 圖檔
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
