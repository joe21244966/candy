import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "@shared/schema";

export default function Contact() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(window.location.search);
  const productId = searchParams.get("product");

  const { data: product } = useQuery<Product>({
    queryKey: productId ? [`/api/product/${productId}`] : [],
    enabled: !!productId,
  });

  const form = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      position: "",
      country: "",
      message: "",
      productId: productId ? Number(productId) : undefined,
      purchaseQuantity: "",
      contactTime: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Submitted Successfully!",
        description: "Our sales team will contact you within 24 hours.",
      });
      form.reset();
      setLocation("/");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
      });
    },
  });

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Business Inquiry</h1>

        {product && (
          <div className="mb-8 p-6 bg-muted rounded-lg">
            <h2 className="font-semibold text-xl mb-4">Product Information:</h2>
            <div className="grid gap-2">
              <p><span className="font-medium">Product:</span> {product.name}</p>
              <p><span className="font-medium">Price Range:</span> {product.price}</p>
              <p><span className="font-medium">MOQ:</span> {product.minOrder}</p>
              <p><span className="font-medium">Packaging:</span> {product.packaging}</p>
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Email*</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@company.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Your company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Position*</FormLabel>
                    <FormControl>
                      <Input placeholder="Your role in the company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country/Region*</FormLabel>
                    <FormControl>
                      <Input placeholder="Your country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="purchaseQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Purchase Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 1000 kg or 5000 pcs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inquiry Details*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please describe your specific requirements, including quantity, target price, delivery time, etc." 
                      className="min-h-[150px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Contact Time</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mon-Fri 9:00-18:00 EST" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="lg" disabled={mutation.isPending}>
              {mutation.isPending ? "Submitting..." : "Submit Inquiry"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}