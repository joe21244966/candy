import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useLocation } from "wouter";

export function FloatingContact() {
  const [, setLocation] = useLocation();

  return (
    <Button 
      className="fixed bottom-6 right-6 rounded-full shadow-lg flex items-center gap-2 z-50"
      size="lg"
      onClick={() => setLocation("/contact")}
    >
      <Mail className="h-5 w-5" />
      <span>Contact Sales</span>
    </Button>
  );
}
