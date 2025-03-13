import { products } from "@/data/products";
import { useLanguage } from "@/lib/i18n/context";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:75px_75px]" />
        <div className="max-w-screen-xl mx-auto px-4 py-20 sm:px-6 lg:px-8 relative">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="p-4 bg-white/10 backdrop-blur rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">20+</p>
                  <p className="text-sm">{language === 'en' ? 'Years Experience' : '年行业经验'}</p>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">50+</p>
                  <p className="text-sm">{language === 'en' ? 'Countries Served' : '服务国家'}</p>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">1000+</p>
                  <p className="text-sm">{language === 'en' ? 'Happy Clients' : '合作客户'}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-full blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1582058091505-f87a2e55a40f"
                alt="Featured Product"
                className="relative rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="aspect-square rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.image}
                  alt={`Product ${product.id}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
}