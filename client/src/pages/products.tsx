import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@shared/schema";

export default function Products() {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[300px] bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 text-center">
        <h2 className="text-2xl text-destructive">Failed to load products</h2>
      </div>
    );
  }

  const candies = products.filter(p => p.type === "candy");
  const toys = products.filter(p => p.type === "toy");

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Our Products</h1>
        
        <Tabs defaultValue="candy" className="mb-8">
          <TabsList className="grid w-[400px] grid-cols-2 mx-auto">
            <TabsTrigger value="candy">Candies</TabsTrigger>
            <TabsTrigger value="toys">Toys</TabsTrigger>
          </TabsList>
          
          <TabsContent value="candy">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {candies.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="toys">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {toys.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
