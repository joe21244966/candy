import { Link } from "wouter";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/contact?product=${product.id}`}>
      <div className="aspect-square rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <img
          src={product.image}
          alt={`Product ${product.id}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
    </Link>
  );
}