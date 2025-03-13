import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export function FloatingContact() {
  const [, setLocation] = useLocation();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Attention-grabbing hand animation */}
      <motion.div
        className="absolute -right-4 -top-12"
        animate={{
          x: [0, -10, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <span className="text-4xl">👆</span>
      </motion.div>

      {/* Contact button with pulse effect */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          className="rounded-full shadow-lg flex items-center gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
          size="lg"
          onClick={() => setLocation("/contact")}
        >
          <Mail className="h-5 w-5" />
          <span>Contact Sales - Get Lowest Price</span>
          {/* Pulse effect */}
          <span className="absolute -inset-1 rounded-full animate-ping bg-primary/20" />
        </Button>
      </motion.div>
    </div>
  );
}