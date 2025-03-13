import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { NavMenu } from "@/components/nav-menu";
import { FloatingContact } from "@/components/floating-contact";
import { LanguageProvider } from "@/lib/i18n/context";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Products from "@/pages/products";
import Contact from "@/pages/contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog" component={() => <div>Blog Coming Soon</div>} />
      <Route path="/contact" component={Contact} />
      <Route path="/products" component={Products} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <NavMenu />
        <Router />
        <FloatingContact />
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;