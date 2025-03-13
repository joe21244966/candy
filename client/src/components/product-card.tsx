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
        <p className="text-muted-foreground">{product.description}</p>
        <p className="text-lg font-bold mt-2 text-primary">{product.price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/contact?product=${product.id}`}>
          <Button className="w-full">Inquire Now</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
