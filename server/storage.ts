import { type Product, type InsertProduct, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProductsByType(type: string): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private contacts: Map<number, Contact>;
  private currentProductId: number;
  private currentContactId: number;

  constructor() {
    this.products = new Map();
    this.contacts = new Map();
    this.currentProductId = 1;
    this.currentContactId = 1;
    this.initializeProducts();
  }

  private initializeProducts() {
    const products = [
      { 
        name: "Premium Milk Chocolate Bar", 
        description: "High-quality milk chocolate made with 40% cocoa content, perfect for retail and food service industry", 
        price: "USD 2.50-3.50/pc", 
        image: "https://images.unsplash.com/photo-1662143029122-bda6c0da0d85", 
        subtype: "chocolate",
        minOrder: "5000 pcs",
        packaging: "Individual wrap, 24pcs/box, 120boxes/carton",
        seoKeywords: "wholesale milk chocolate, bulk chocolate bars, commercial chocolate supply",
        ingredients: "Cocoa mass, cocoa butter, milk powder, sugar",
        shelfLife: "12 months",
        certification: "FDA, HACCP, ISO 22000"
      },
      { 
        name: "Fruit-Flavored Gummy Bears", 
        description: "Premium quality gummy bears in assorted fruit flavors, ideal for retail chains and distributors", 
        price: "USD 8-12/kg", 
        image: "https://images.unsplash.com/photo-1736788268738-79afa3312430", 
        subtype: "gummy",
        minOrder: "500 kg",
        packaging: "1kg/bag, 10bags/carton",
        seoKeywords: "wholesale gummy bears, bulk gummy candy, commercial candy supply",
        ingredients: "Glucose syrup, sugar, gelatin, natural flavors",
        shelfLife: "18 months",
        certification: "FDA, HACCP"
      },
      { 
        name: "Mixed Fruit Hard Candies", 
        description: "Mixed fruit flavored hard candies, individually wrapped, suitable for vending and retail", 
        price: "USD 5-8/kg", 
        image: "https://images.unsplash.com/photo-1602005106908-11c3e587c58c", 
        subtype: "hard_candy",
        minOrder: "1000 kg",
        packaging: "5kg/bag, 4bags/carton",
        seoKeywords: "wholesale hard candy, bulk hard candy, commercial candy manufacturer",
        ingredients: "Sugar, glucose syrup, citric acid, natural flavors",
        shelfLife: "24 months",
        certification: "FDA, HACCP, ISO 9001"
      },
      { 
        name: "Giant Rainbow Lollipops", 
        description: "Colorful spiral lollipops, perfect for retail and party supply stores", 
        price: "USD 0.8-1.2/pc", 
        image: "https://images.unsplash.com/photo-1516970056390-f0004370528d", 
        subtype: "lollipop",
        minOrder: "10000 pcs",
        packaging: "50pcs/box, 40boxes/carton",
        seoKeywords: "wholesale lollipops, bulk candy, commercial lollipop supplier",
        ingredients: "Sugar, corn syrup, natural colors and flavors",
        shelfLife: "18 months",
        certification: "FDA, HACCP"
      },
      {
        name: "Premium Cotton Candy Mix",
        description: "Professional grade cotton candy sugar mix in various flavors",
        price: "USD 15-20/kg",
        image: "https://images.unsplash.com/photo-1560288847-569bc30d45b0",
        subtype: "cotton_candy",
        minOrder: "200 kg",
        packaging: "1kg/bag, 20bags/carton",
        seoKeywords: "wholesale cotton candy sugar, cotton candy mix bulk",
        ingredients: "Fine granulated sugar, natural flavors and colors",
        shelfLife: "24 months",
        certification: "FDA, HACCP"
      },
      {
        name: "Gourmet Jelly Beans Assortment",
        description: "Premium quality jelly beans in 20 different flavors",
        price: "USD 10-15/kg",
        image: "https://images.unsplash.com/photo-1610360277501-ea948686dc52",
        subtype: "jelly_beans",
        minOrder: "500 kg",
        packaging: "2kg/bag, 10bags/carton",
        seoKeywords: "wholesale jelly beans, bulk jelly beans, gourmet candy supplier",
        ingredients: "Sugar, corn syrup, modified food starch, natural flavors",
        shelfLife: "12 months",
        certification: "FDA, HACCP, ISO 22000"
      }
    ];

    products.forEach((product) => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id, inStock: true });
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByType(type: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.subtype === type);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const newContact = { ...contact, id };
    this.contacts.set(id, newContact);
    return newContact;
  }
}

export const storage = new MemStorage();