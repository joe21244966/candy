import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
        <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Price Range:</span> {product.price}</p>
          <p><span className="font-medium">MOQ:</span> {product.minOrder}</p>
          <p><span className="font-medium">Shelf Life:</span> {product.shelfLife}</p>
          <p><span className="font-medium">Certifications:</span> {product.certification}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/contact?product=${product.id}`} className="w-full">
          <Button 
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          >
            Get Lowest Price
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}