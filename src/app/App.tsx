import { motion } from "motion/react";
import { Package, Shield, Truck, Phone, Mail, MapPin, ChevronRight, Droplet, Grid3x3, Lock, Layers } from "lucide-react";
import { useRef, useState } from "react";
import meicanLogo from "../assets/meican-logo.png";
import heroImage from "../assets/hero-image.png";
import MarqueeLogos from "./components/MarqueeLogos";

export default function App() {
  const productsRef = useRef<HTMLDivElement>(null);
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);

  const products = [
    {
      id: 1,
      name: "SikaTop Seal-107",
      category: "Waterproofing",
      description: "Premium cementitious waterproofing compound for basements and roofs",
      image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop",
      pricing: [
        { range: "1-10 bags", price: 3200 },
        { range: "11-50 bags", price: 2950, savings: 8 },
        { range: "51+ bags", price: 2700, savings: 15 }
      ],
      unit: "25kg bag"
    },
    {
      id: 2,
      name: "Sikaflex 11FC",
      category: "Sealants",
      description: "High-performance polyurethane sealant for construction joints",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&h=400&fit=crop",
      pricing: [
        { range: "1-20 units", price: 1800 },
        { range: "21-100 units", price: 1650, savings: 8 },
        { range: "101+ units", price: 1500, savings: 17 }
      ],
      unit: "300ml cartridge"
    },
    {
      id: 3,
      name: "SikaCeram-200",
      category: "Tile Adhesive",
      description: "Professional tile adhesive for walls and floors",
      image: "https://images.unsplash.com/photo-1615971677499-5467cbab01c0?w=600&h=400&fit=crop",
      pricing: [
        { range: "1-15 bags", price: 1500 },
        { range: "16-75 bags", price: 1350, savings: 10 },
        { range: "76+ bags", price: 1200, savings: 20 }
      ],
      unit: "20kg bag"
    },
    {
      id: 4,
      name: "Sikafloor Hardener",
      category: "Flooring",
      description: "Industrial floor hardener for high-traffic areas",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop",
      pricing: [
        { range: "1-10 bags", price: 2800 },
        { range: "11-50 bags", price: 2550, savings: 9 },
        { range: "51+ bags", price: 2300, savings: 18 }
      ],
      unit: "25kg bag"
    },
    {
      id: 5,
      name: "SikaGrout 215",
      category: "Concrete Repair",
      description: "High-strength non-shrink cementitious grout",
      image: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=600&h=400&fit=crop",
      pricing: [
        { range: "1-10 bags", price: 3500 },
        { range: "11-50 bags", price: 3200, savings: 9 },
        { range: "51+ bags", price: 2900, savings: 17 }
      ],
      unit: "25kg bag"
    }
  ];

  const categories = [
    { name: "Waterproofing Systems", icon: Droplet, color: "bg-blue-50" },
    { name: "Tile Setting", icon: Grid3x3, color: "bg-orange-50" },
    { name: "Sealing & Bonding", icon: Lock, color: "bg-purple-50" },
    { name: "Concrete & Mortar", icon: Layers, color: "bg-green-50" }
  ];

  const scrollProducts = (direction: 'left' | 'right') => {
    if (productsRef.current) {
      const scrollAmount = 350;
      productsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 backdrop-blur-md fixed inset-x-0 top-0 z-50 border-b border-[#E9ECEF]"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={meicanLogo} alt="Meican Limited" className="h-14 w-14 object-contain" />
            <div className="font-semibold text-[#1E3A5F] text-lg tracking-tight">MEICAN LIMITED</div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#products" className="text-[#212529] hover:text-[#1E5BA8] transition-colors">Products</a>
            <a href="#categories" className="text-[#212529] hover:text-[#1E5BA8] transition-colors">Categories</a>
            <a href="#contact" className="text-[#212529] hover:text-[#1E5BA8] transition-colors">Contact</a>
            <button className="px-6 py-2 bg-[#1E5BA8] text-white rounded-lg hover:bg-[#1a4d8f] transition-all active:scale-95">
              Shop Now
            </button>
          </div>
        </div>
      </motion.nav>

      <div className="h-24" />

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#212529] leading-tight mb-6">
              Building Materials.<br />
              <span className="text-[#1E5BA8]">Delivered.</span>
            </h1>
            <p className="text-lg text-[#6C757D] mb-8 max-w-lg">
              Premium construction solutions from basement to roof. Industrial-grade quality for contractors and DIY enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#1E5BA8] text-white rounded-xl hover:bg-[#1a4d8f] transition-all active:scale-98 shadow-lg shadow-[#1E5BA8]/20 flex items-center justify-center gap-2 group">
                Browse Products
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-[#212529] rounded-xl border-2 border-[#E9ECEF] hover:border-[#1E5BA8] transition-all active:scale-98">
                Request Quote
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Construction site"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-[#E9ECEF]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1E5BA8]/10 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#1E5BA8]" />
                </div>
                <div>
                  <div className="font-semibold text-[#212529]">Swiss Quality</div>
                  <div className="text-sm text-[#6C757D]">100+ Years Heritage</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Client Logos Marquee */}
      <MarqueeLogos />

      {/* Featured Products Slider */}
      <section id="products" className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-[#212529] mb-3">Featured Products</h2>
            <p className="text-[#6C757D]">Premium building materials with volume pricing</p>
          </motion.div>

          <div className="relative">
            <div
              ref={productsRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex-shrink-0 w-[85%] sm:w-[350px] snap-center group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-2">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-[#1E5BA8] font-medium mb-2">{product.category}</div>
                      <h3 className="text-xl font-semibold text-[#212529] mb-2">{product.name}</h3>
                      <p className="text-sm text-[#6C757D] mb-4">{product.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="text-xs font-medium text-[#212529] mb-2">Volume Pricing ({product.unit})</div>
                        {product.pricing.map((tier, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center text-sm py-1.5 px-3 bg-[#F8F9FA] rounded-lg"
                          >
                            <span className="text-[#6C757D]">{tier.range}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-[#212529]">KES {tier.price.toLocaleString()}</span>
                              {tier.savings && (
                                <span className="text-xs text-green-600 font-medium">-{tier.savings}%</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <button className="w-full py-3 bg-[#1E5BA8] text-white rounded-xl hover:bg-[#1a4d8f] transition-all active:scale-98 flex items-center justify-center gap-2 group">
                        <Package className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Arrows - Desktop Only */}
            <div className="hidden md:flex justify-end gap-3 mt-6">
              <button
                onClick={() => scrollProducts('left')}
                className="w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center border border-[#E9ECEF]"
                aria-label="Scroll left"
              >
                <ChevronRight className="w-5 h-5 rotate-180 text-[#212529]" />
              </button>
              <button
                onClick={() => scrollProducts('right')}
                className="w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center border border-[#E9ECEF]"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 text-[#212529]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#212529] mb-3">System-Based Solutions</h2>
            <p className="text-[#6C757D] max-w-2xl mx-auto">
              Complete construction systems designed to work together for optimal performance
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white border-2 border-[#E9ECEF] rounded-2xl p-8 hover:border-[#1E5BA8] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-[#1E5BA8]" />
                  </div>
                  <h3 className="font-semibold text-[#212529] mb-2">{category.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-[#1E5BA8] opacity-0 group-hover:opacity-100 transition-opacity">
                    View Products
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Automated Delivery",
                description: "From Athi River to your site. Zone-based pricing calculated automatically at checkout."
              },
              {
                icon: Shield,
                title: "Sika Quality",
                description: "100+ years of Swiss engineering excellence. Every product backed by technical certification."
              },
              {
                icon: Package,
                title: "Volume Savings",
                description: "Automatic bulk discounts. From single bags to full pallets, pricing adjusts in real-time."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white p-8 rounded-2xl border border-[#E9ECEF]"
              >
                <div className="w-12 h-12 bg-[#1E5BA8]/10 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-[#1E5BA8]" />
                </div>
                <h3 className="font-semibold text-[#212529] mb-3">{feature.title}</h3>
                <p className="text-[#6C757D] text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#212529] mb-3">Get In Touch</h2>
            <p className="text-[#6C757D]">Located at Sika Kenya, Athi River</p>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-1">
            {[
              { icon: Phone, label: "Phone", detail: "+254 700 123 456", key: "phone" },
              { icon: Mail, label: "Email", detail: "sales@meican.co.ke", key: "email" },
              { icon: MapPin, label: "Location", detail: "Josh Industrial Estate, Mombasa Road, Athi River", key: "location" }
            ].map((contact, index) => (
              <motion.div
                key={contact.key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredContact(contact.key)}
                onMouseLeave={() => setHoveredContact(null)}
                className="flex items-center justify-between py-6 px-8 border-b border-[#E9ECEF] last:border-b-0 group cursor-pointer hover:bg-[#F8F9FA] transition-colors rounded-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#1E5BA8]/10 rounded-full flex items-center justify-center group-hover:bg-[#1E5BA8] transition-colors">
                    <contact.icon className="w-5 h-5 text-[#1E5BA8] group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-sm font-medium text-[#6C757D]">{contact.label}</div>
                </div>

                <div className="overflow-hidden h-6 relative">
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: hoveredContact === contact.key ? -24 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col"
                  >
                    <div className="h-6 flex items-center">
                      <ChevronRight className="w-5 h-5 text-[#1E5BA8]" />
                    </div>
                    <div className="h-6 flex items-center">
                      <span className="text-[#1E5BA8] font-medium text-sm">{contact.detail}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#212529] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src={meicanLogo} alt="Meican Limited" className="h-10 w-10 object-contain brightness-0 invert" />
              <div className="font-semibold">MEICAN LIMITED</div>
            </div>
            <div className="text-sm text-gray-400">
              © 2026 Meican Limited. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
