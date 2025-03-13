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
      { name: "Rainbow Lollipop", description: "Colorful swirling lollipop", price: "$2.99", image: "https://images.unsplash.com/photo-1516970056390-f0004370528d", type: "candy" },
      { name: "Gummy Bears", description: "Assorted fruit flavors", price: "$3.99", image: "https://images.unsplash.com/photo-1736788268738-79afa3312430", type: "candy" },
      { name: "Cotton Candy", description: "Fluffy pink and blue cotton candy", price: "$4.99", image: "https://images.unsplash.com/photo-1560288847-569bc30d45b0", type: "candy" },
      { name: "Chocolate Mix", description: "Premium chocolate assortment", price: "$7.99", image: "https://images.unsplash.com/photo-1662143029122-bda6c0da0d85", type: "candy" },
      { name: "Hard Candies", description: "Classic hard candy mix", price: "$3.49", image: "https://images.unsplash.com/photo-1602005106908-11c3e587c58c", type: "candy" },
      { name: "Candy Canes", description: "Peppermint candy canes", price: "$2.99", image: "https://images.unsplash.com/photo-1542992804-34f8f4cb193b", type: "candy" },
      { name: "Jelly Beans", description: "Gourmet jelly beans", price: "$4.99", image: "https://images.unsplash.com/photo-1610360277501-ea948686dc52", type: "candy" },
      { name: "Fruit Chews", description: "Chewy fruit candies", price: "$3.99", image: "https://images.unsplash.com/photo-1616449458092-f41670b2367c", type: "candy" }
    ];

    const toys = [
      { name: "Wooden Blocks", description: "Educational building blocks", price: "$19.99", image: "https://images.unsplash.com/photo-1488723905857-809bb9a2d21d", type: "toy" },
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
