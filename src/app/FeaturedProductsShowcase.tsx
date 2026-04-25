import { memo } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Droplet, Grid3x3, Lock, Layers } from 'lucide-react';

// Application showcases data
const applicationShowcases = [
  {
    id: 'waterproofing',
    title: 'Basement Waterproofing',
    category: 'Waterproofing',
    categoryIcon: Droplet,
    description: 'Our waterproofing solutions protect buildings from water damage, ensuring long-term durability in Kenya\'s humid and rainy climate. Perfect for foundations, basements, and roofs.',
    image: 'https://i.pinimg.com/736x/a6/62/d3/a662d362cc95ad95283f1400e19ec03d.jpg',
    imageAlt: 'Waterproofing application on concrete structure'
  },
  {
    id: 'concrete-admixtures',
    title: 'High-Strength Concrete',
    category: 'Concrete Admixtures',
    categoryIcon: Grid3x3,
    description: 'Enhance concrete strength and workability with our admixtures, ideal for high-rise buildings, bridges, and infrastructure projects across Kenya.',
    image: 'https://i.pinimg.com/736x/78/06/48/780648484ed5164fdade2736fe75a936.jpg',
    imageAlt: 'Concrete mixing with admixtures'
  },
  {
    id: 'elastic-sealing',
    title: 'Expansion Joints',
    category: 'Elastic Sealing',
    categoryIcon: Lock,
    description: 'Flexible sealing solutions for expansion joints that withstand movement, temperature changes, and weather, preventing leaks in concrete structures.',
    image: 'https://i.pinimg.com/1200x/16/ce/9c/16ce9c4933ffd0ac2195d31fa18db5c9.jpg',
    imageAlt: 'Expansion joint sealing application'
  },
  {
    id: 'flooring-systems',
    title: 'Industrial Flooring',
    category: 'Flooring Systems',
    categoryIcon: Layers,
    description: 'Durable, slip-resistant flooring systems for warehouses, factories, and commercial spaces, providing long-lasting performance under heavy use.',
    image: 'https://i.pinimg.com/736x/f8/8e/b9/f88eb943cfbc3cfd2396216796c30313.jpg',
    imageAlt: 'Industrial flooring installation'
  }
];

function FeaturedProductsShowcase() {
  return (
    <section id="products" className="py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-3">Our Products</h2>
          <p className="text-[#6C757D] max-w-2xl mx-auto">
            Discover our premium construction solutions trusted by leading Kenyan contractors
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {applicationShowcases.map((showcase) => (
            <motion.div
              key={showcase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-lg border border-[#E9ECEF] hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-[#1E5BA8]/10 rounded-xl flex items-center justify-center mb-4">
                <showcase.categoryIcon className="w-6 h-6 text-[#1E5BA8]" />
              </div>
              <h3 className="font-semibold text-[#212529] mb-2">{showcase.category}</h3>
              <p className="text-sm text-[#6C757D] mb-4">{showcase.title}</p>
            </motion.div>
          ))}
        </div>

        {/* Applications Section */}
        <div id="applications" className="pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#212529] mb-3">Application Showcases</h2>
            <p className="text-[#6C757D] max-w-2xl mx-auto">
              See how our products perform in real construction projects across Kenya
            </p>
          </motion.div>

        {/* Application Showcases */}
        <div className="space-y-20">
          {applicationShowcases.map((showcase, index) => {
            const isEven = index % 2 === 0;
            const IconComponent = showcase.categoryIcon;

            return (
              <motion.div
                key={showcase.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-col-dense'}`}
              >
                {/* Content Section */}
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#1E5BA8]/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-[#1E5BA8]" />
                    </div>
                    <span className="text-sm font-medium text-[#1E5BA8] uppercase tracking-wide">
                      {showcase.category}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold text-[#212529] mb-4">
                    {showcase.title}
                  </h3>

                  <p className="text-[#6C757D] text-lg leading-relaxed">
                    {showcase.description}
                  </p>
                </div>

                {/* Image Section */}
                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative">
                    <div className="aspect-[4/3] bg-white rounded-2xl shadow-xl border border-[#E9ECEF] overflow-hidden">
                      <img
                        src={showcase.image}
                        alt={showcase.imageAlt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/assets/meican-logo.png';
                        }}
                      />
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute -top-4 -right-4 bg-[#1E5BA8] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {showcase.category}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        </div>
      </div>
    </section>
  );
}

export default memo(FeaturedProductsShowcase);
