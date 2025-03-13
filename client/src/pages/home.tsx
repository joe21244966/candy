import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/lib/i18n/context";
import type { Product } from "@shared/schema";

const CANDY_TYPES = {
  chocolate: { en: "Chocolate", zh: "巧克力" },
  gummy: { en: "Gummy Candies", zh: "软糖" },
  hard_candy: { en: "Hard Candies", zh: "硬糖" },
  lollipop: { en: "Lollipops", zh: "棒棒糖" },
  cotton_candy: { en: "Cotton Candy", zh: "棉花糖" },
  jelly_beans: { en: "Jelly Beans", zh: "果冻豆" }
};

export default function Home() {
  const { language, t } = useLanguage();
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[400px] bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !products) {
    return (
      <div className="min-h-screen p-8 text-center">
        <h2 className="text-2xl text-destructive">Failed to load products</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:75px_75px]" />
        <div className="max-w-screen-xl mx-auto px-4 py-20 sm:px-6 lg:px-8 relative">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="p-4 bg-white/10 backdrop-blur rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">20+</p>
                  <p className="text-sm">{language === 'en' ? 'Years Experience' : '年行业经验'}</p>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">50+</p>
                  <p className="text-sm">{language === 'en' ? 'Countries Served' : '服务国家'}</p>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">1000+</p>
                  <p className="text-sm">{language === 'en' ? 'Happy Clients' : '合作客户'}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1582058091505-f87a2e55a40f"
                alt="Candy Production"
                className="relative rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-screen-xl mx-auto">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8">
              <TabsTrigger value="all">{language === 'en' ? 'All Products' : '全部产品'}</TabsTrigger>
              {Object.entries(CANDY_TYPES).map(([value, labels]) => (
                <TabsTrigger key={value} value={value}>
                  {labels[language]}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>

            {Object.keys(CANDY_TYPES).map((type) => (
              <TabsContent key={type} value={type}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products
                    .filter((product) => product.subtype === type)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}