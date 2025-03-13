export interface Product {
  id: number;
  image: string;
}

const BASE_URL = "https://964961ce3bcba6eca1f9abdb48d4eb15.r2.cloudflarestorage.com/yimu-pics";

export const products: Product[] = Array.from({ length: 51 }, (_, i) => ({
  id: i,
  image: `${BASE_URL}/${i}.jpg`
}));
