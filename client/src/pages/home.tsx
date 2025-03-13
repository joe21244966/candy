import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@shared/schema";

const CANDY_TYPES = {
  chocolate: "Chocolate",
  gummy: "Gummy Candies",
  hard_candy: "Hard Candies",
  lollipop: "Lollipops",
  cotton_candy: "Cotton Candy",
  jelly_beans: "Jelly Beans"
};

export default function Home() {
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
      {/* Header Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            Premium Wholesale Candies
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            High-Quality Confectionery Products for Global Distribution
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-screen-xl mx-auto">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8">
              <TabsTrigger value="all">All Products</TabsTrigger>
              {Object.entries(CANDY_TYPES).map(([value, label]) => (
                <TabsTrigger key={value} value={value}>{label}</TabsTrigger>
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