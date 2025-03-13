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
    const candies = [
      { 
        name: "Premium Milk Chocolate Bar", 
        description: "High-quality milk chocolate made with 40% cocoa content, perfect for retail and food service industry", 
        price: "USD 2.50-3.50/pc", 
        image: "https://images.unsplash.com/photo-1662143029122-bda6c0da0d85", 
        type: "candy",
        subtype: "chocolate",
        minOrder: "5000 pcs",
        packaging: "Individual wrap, 24pcs/box, 120boxes/carton",
        seoKeywords: "wholesale milk chocolate, bulk chocolate bars, commercial chocolate supply"
      },
      { 
        name: "Fruit-Flavored Gummy Bears", 
        description: "Premium quality gummy bears in assorted fruit flavors, ideal for retail chains and distributors", 
        price: "USD 8-12/kg", 
        image: "https://images.unsplash.com/photo-1736788268738-79afa3312430", 
        type: "candy",
        subtype: "gummy",
        minOrder: "500 kg",
        packaging: "1kg/bag, 10bags/carton",
        seoKeywords: "wholesale gummy bears, bulk gummy candy, commercial candy supply"
      },
      { 
        name: "Hard Candy Assortment", 
        description: "Mixed fruit flavored hard candies, individually wrapped, suitable for vending and retail", 
        price: "USD 5-8/kg", 
        image: "https://images.unsplash.com/photo-1602005106908-11c3e587c58c", 
        type: "candy",
        subtype: "hard_candy",
        minOrder: "1000 kg",
        packaging: "5kg/bag, 4bags/carton",
        seoKeywords: "wholesale hard candy, bulk hard candy, commercial candy manufacturer"
      },
      { 
        name: "Giant Rainbow Lollipops", 
        description: "Colorful spiral lollipops, perfect for retail and party supply stores", 
        price: "USD 0.8-1.2/pc", 
        image: "https://images.unsplash.com/photo-1516970056390-f0004370528d", 
        type: "candy",
        subtype: "lollipop",
        minOrder: "10000 pcs",
        packaging: "50pcs/box, 40boxes/carton",
        seoKeywords: "wholesale lollipops, bulk candy, commercial lollipop supplier"
      }
    ];

    const toys = [
      { 
        name: "Educational Wooden Blocks Set", 
        description: "FSC-certified wooden building blocks, 50 pieces per set, suitable for schools and educational retailers", 
        price: "USD 15-20/set", 
        image: "https://images.unsplash.com/photo-1488723905857-809bb9a2d21d", 
        type: "toy",
        minOrder: "500 sets",
        packaging: "Color box, 10sets/carton",
        seoKeywords: "wholesale wooden toys, educational toys bulk, wooden blocks manufacturer"
      },
      { name: "Robot Friend", description: "Interactive robot toy", price: "$24.99", image: "https://images.unsplash.com/photo-1690041638809-cd8993868f92", type: "toy" },
      { name: "Plush Bear", description: "Soft cuddly teddy bear", price: "$14.99", image: "https://images.unsplash.com/photo-1690041639041-4ddf9e632b11", type: "toy" },
      { name: "Art Set", description: "Complete art supplies kit", price: "$29.99", image: "https://images.unsplash.com/photo-1690041638874-3d95eb8edced", type: "toy" },
      { name: "Race Car", description: "Remote control race car", price: "$34.99", image: "https://images.unsplash.com/photo-1690041638938-bab55e184b0c", type: "toy" },
      { name: "Doll House", description: "Deluxe wooden doll house", price: "$49.99", image: "https://images.unsplash.com/photo-1690041639097-9270017d6c94", type: "toy" },
      { name: "Board Game", description: "Family board game set", price: "$19.99", image: "https://images.unsplash.com/photo-1690041638836-f1bf53ae66d6", type: "toy" },
      { name: "Building Set", description: "Creative construction set", price: "$39.99", image: "https://images.unsplash.com/photo-1690041638911-88f574403681", type: "toy" }
    ];

    [...candies, ...toys].forEach((product) => {
      const id = this.currentProductId++;
      this.products.set(id, { ...product, id, inStock: true });
    });
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByType(type: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.type === type);
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