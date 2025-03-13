import { pgTable, text, serial, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  image: text("image").notNull(),
  subtype: text("subtype").notNull(), // 'chocolate', 'gummy', 'hard_candy', 'lollipop', 'toffee', 'cotton_candy', 'jelly_beans'
  minOrder: text("min_order").default("1000 pcs"), // Minimum order quantity
  packaging: text("packaging"), // Packaging information
  inStock: boolean("in_stock").default(true),
  seoKeywords: text("seo_keywords"), // SEO keywords
  ingredients: text("ingredients"), // Main ingredients
  shelfLife: text("shelf_life"), // Product shelf life
  certification: text("certification"), // Product certifications (FDA, HACCP, etc.)
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  position: text("position").notNull(),
  country: text("country").notNull(),
  message: text("message").notNull(),
  productId: serial("product_id").references(() => products.id),
  purchaseQuantity: text("purchase_quantity"),
  contactTime: text("contact_time"),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertContactSchema = createInsertSchema(contacts).omit({ id: true });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;