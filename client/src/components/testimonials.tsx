import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "John Smith",
    company: "Sweet Treats Co.",
    image: "https://i.pravatar.cc/150?u=1",
    text: {
      en: "The quality of candies and customer service is exceptional. Our customers love the products!",
      zh: "糖果质量和客户服务都非常出色。我们的客户都很喜欢这些产品！"
    },
    role: {
      en: "Purchasing Manager",
      zh: "采购经理"
    }
  },
  {
    name: "Maria Garcia",
    company: "Global Sweets Inc.",
    image: "https://i.pravatar.cc/150?u=2",
    text: {
      en: "We've been working with them for over 5 years. Their consistency and reliability are unmatched.",
      zh: "我们已经合作超过5年了。他们的产品质量稳定，值得信赖。"
    },
    role: {
      en: "Import Manager",
      zh: "进口部经理"
    }
  },
  {
    name: "David Chen",
    company: "Sweet Success Ltd.",
    image: "https://i.pravatar.cc/150?u=3",
    text: {
      en: "Their innovative product range and competitive pricing have helped us grow our business.",
      zh: "他们创新的产品系列和具有竞争力的价格帮助我们发展业务。"
    },
    role: {
      en: "CEO",
      zh: "首席执行官"
    }
  },
];

export function Testimonials() {
  const { language, t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('testimonials.title')}</h2>
          <p className="text-muted-foreground">{t('testimonials.subtitle')}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role[language]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground italic">
                    "{testimonial.text[language]}"
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
