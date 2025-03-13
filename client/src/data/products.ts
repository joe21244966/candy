export interface Product {
  id: number;
  image: string;
}

const BASE_URL = "https://pics.yimucandy.site/pics";

export const products: Product[] = Array.from({ length: 51 }, (_, i) => ({
  id: i,
  image: `${BASE_URL}/${i}.jpg`
}));