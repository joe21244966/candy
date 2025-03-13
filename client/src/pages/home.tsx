import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1583932644465-85803c7ed8ae)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Candy & Toy World</h1>
          <p className="text-xl mb-8">Discover a magical world of sweets and toys!</p>
          <Link href="/products">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Explore Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Premium Candies</h3>
            <p>Discover our selection of delicious candies from around the world.</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Quality Toys</h3>
            <p>Find educational and fun toys for children of all ages.</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Great Service</h3>
            <p>Our friendly team is here to help you find the perfect gift.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
