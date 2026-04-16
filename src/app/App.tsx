import { motion } from "motion/react";
import { Package, Shield, Truck, Phone, Mail, MapPin, ChevronRight, Droplet, Grid3x3, Lock, Layers, MessageCircle, FileText, Weight, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import meicanLogo from "../assets/meican-logo.png";
import heroImage from "../assets/hero-image.png";
import MarqueeLogos from "./components/MarqueeLogos";
import ProductSelection from "./ProductSelection";
import AboutUs from "./AboutUs";
import ProductsPage from "./ProductsPage";
import productsData from "../data/products.json";

export default function App() {
  const productsRef = useRef<HTMLDivElement>(null);
  const [hoveredContact, setHoveredContact] = useState<string | null>(null);
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set());
  const [currentVisibleCategory, setCurrentVisibleCategory] = useState<number>(0);
  const [isSlideshowActive, setIsSlideshowActive] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [showProductSelection, setShowProductSelection] = useState<boolean>(false);
  const [showAboutUs, setShowAboutUs] = useState<boolean>(false);
  const [showProductsPage, setShowProductsPage] = useState<boolean>(false);
  const [selectedProductsCategory, setSelectedProductsCategory] = useState<string | null>(null);

  // Get all products from all categories for the featured products section
  const allProducts = productsData.categories.flatMap(category => 
    category.items.map(item => ({
      ...item,
      category: category.name,
      categoryId: category.id
    }))
  );

  // Filter featured categories
  const featuredCategories = productsData.categories.filter(category => category.featured);

  // Create featured products by category for other sections
  const featuredProductsByCategory = featuredCategories.map(category => ({
    category: category,
    products: category.items.slice(0, 3) // Show first 3 products from each featured category
  }));

  // Map icon names to Lucide components
  const iconMap: { [key: string]: any } = {
    droplet: Droplet,
    'grid-3x3': Grid3x3,
    lock: Lock,
    layers: Layers,
    package: Package,
    shield: Shield
  };

  const categories = productsData.categories.map(category => ({
    ...category,
    icon: iconMap[category.icon] || Package
  }));

  const scrollProducts = (direction: 'left' | 'right') => {
    if (productsRef.current) {
      const scrollAmount = 350;
      productsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const toggleProductExpansion = (productId: string) => {
    setExpandedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  // Helper functions for product marketing content
  const getProductHowItWorks = (product: any, categoryId: string): string => {
    const howItWorksMap: { [key: string]: string } = {
      'concrete-admixtures': 'Advanced chemical formulation that disperses cement particles, reducing water requirements and improving workability while enhancing concrete strength and durability.',
      'concrete-essentials': 'Specialized compounds that create a release barrier between concrete and formwork, or provide reinforcement through fiber distribution throughout the concrete mix.',
      'waterproofing': 'Creates an impermeable barrier by penetrating concrete pores and forming crystalline structures that block water passage while allowing concrete to breathe.',
      'elastic-sealing-bonding': 'Polyurethane-based sealants that cure to form flexible, weather-resistant joints that accommodate structural movement while maintaining adhesion.',
      'tiling-products': 'Cementitious or polymer-modified compounds that create strong bonds between tiles and substrates while providing grout protection and color consistency.',
      'flooring-systems': 'Multi-component epoxy or polyurethane systems that chemically bond to create seamless, durable surfaces resistant to chemicals and abrasion.',
      'grouts-anchors': 'Non-shrink cementitious formulations that expand slightly during curing to fill voids completely, or chemical anchors that bond reinforcement to concrete.',
      'injection-systems': 'Low-viscosity polyurethane resins that penetrate cracks and react with moisture to expand and seal, creating watertight barriers.'
    };
    return howItWorksMap[categoryId] || 'High-performance construction solution designed for optimal results and long-term durability.';
  };

  const getProductBenefits = (product: any, categoryId: string): string[] => {
    const benefitsMap: { [key: string]: string[] } = {
      'concrete-admixtures': [
        'Reduces water requirements by 15-20%',
        'Increases compressive strength up to 25%',
        'Improves workability and pumpability',
        'Enhances durability and freeze-thaw resistance'
      ],
      'concrete-essentials': [
        'Easy formwork release without surface damage',
        'Improves concrete finish quality',
        'Reduces concrete cracking and shrinkage',
        'Enhances structural integrity'
      ],
      'waterproofing': [
        '100% waterproof protection guaranteed',
        'Prevents mold and mildew growth',
        'Protects structural reinforcement',
        'Long-lasting protection up to 25 years'
      ],
      'elastic-sealing-bonding': [
        'Accommodates structural movement up to 25%',
        'UV and weather resistant',
        'Paintable and compatible with coatings',
        'Maintains flexibility in extreme temperatures'
      ],
      'tiling-products': [
        'Superior bond strength to substrates',
        'Color-fast and stain-resistant grout',
        'Suitable for wet and dry areas',
        'Easy to apply and clean'
      ],
      'flooring-systems': [
        'Chemical and abrasion resistant',
        'Seamless and hygienic surface',
        'Available in various colors and finishes',
        'Low maintenance and easy to clean'
      ],
      'grouts-anchors': [
        'Non-shrink and high-strength formulation',
        'Excellent flow and fill characteristics',
        'Corrosion-resistant anchoring system',
        'Suitable for dynamic loads'
      ],
      'injection-systems': [
        'Deep penetration into micro-cracks',
        'Flexible and waterproof seal',
        'Compatible with wet conditions',
        'Restores structural integrity'
      ]
    };
    return benefitsMap[categoryId] || [
      'Premium quality formulation',
      'Easy to apply and handle',
      'Cost-effective solution',
      'Backed by Sika technical support'
    ];
  };

  const getProductApplication = (product: any, categoryId: string): string => {
    const applicationMap: { [key: string]: string } = {
      'concrete-admixtures': 'Ideal for high-rise buildings, bridges, precast concrete, and any project requiring enhanced concrete performance and reduced water usage.',
      'concrete-essentials': 'Perfect for residential and commercial construction, infrastructure projects, and any concrete forming or reinforcement application.',
      'waterproofing': 'Essential for basements, foundations, roofs, bathrooms, balconies, and any area requiring reliable water protection.',
      'elastic-sealing-bonding': 'Recommended for expansion joints, window and door perimeters, curtain walls, and any joint requiring flexible sealing.',
      'tiling-products': 'Suitable for kitchens, bathrooms, swimming pools, commercial spaces, and any tiling project requiring professional results.',
      'flooring-systems': 'Ideal for industrial facilities, warehouses, commercial spaces, and any area requiring durable, high-performance flooring.',
      'grouts-anchors': 'Perfect for structural repairs, equipment anchoring, precast connections, and any load-bearing application.',
      'injection-systems': 'Essential for crack repair, leak sealing, structural waterproofing, and concrete restoration projects.'
    };
    return applicationMap[categoryId] || 'Versatile solution suitable for various construction and renovation projects with professional results.';
  };

  // Slideshow effect for product categories
  useEffect(() => {
    const startSlideshow = () => {
      setIsSlideshowActive(true);
      setCurrentVisibleCategory(0);
    };

    // Start slideshow after initial animations complete (3 seconds)
    const timer = setTimeout(startSlideshow, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isSlideshowActive || featuredProductsByCategory.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentVisibleCategory((prev) => {
        const next = (prev + 1) % featuredProductsByCategory.length;
        return next;
      });
    }, 10000); // Change category every 10 seconds

    return () => clearInterval(interval);
  }, [isSlideshowActive, featuredProductsByCategory.length]);

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
            <button 
              onClick={() => setShowProductSelection(true)}
              className="px-6 py-2 bg-[#1E5BA8] text-white rounded-lg hover:bg-[#1a4d8f] transition-all active:scale-95 flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Select Products</span>
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
              <button 
                onClick={() => {
                  setSelectedProductsCategory(null);
                  setShowProductsPage(true);
                }}
                className="px-8 py-4 bg-[#1E5BA8] text-white rounded-xl hover:bg-[#1a4d8f] transition-all active:scale-98 shadow-lg shadow-[#1E5BA8]/20 flex items-center justify-center gap-2 group"
              >
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

      {/* Featured Products by Category */}
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
            <p className="text-[#6C757D]">Premium building materials organized by category</p>
          </motion.div>

          <div className="space-y-16 relative overflow-hidden">
            {/* Slideshow Progress Indicator */}
            {isSlideshowActive && featuredProductsByCategory.length > 1 && (
              <div className="flex justify-center gap-2 mb-8">
                {featuredProductsByCategory.map((_, index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 rounded-full bg-[#E9ECEF] cursor-pointer"
                    animate={{
                      backgroundColor: index === currentVisibleCategory ? '#1E5BA8' : '#E9ECEF',
                      scale: index === currentVisibleCategory ? 1.2 : 1
                    }}
                    whileHover={{ scale: 1.3 }}
                    onClick={() => setCurrentVisibleCategory(index)}
                  />
                ))}
              </div>
            )}

            {/* Individual Category Sections */}
            <div className="space-y-16">
              {featuredProductsByCategory.map((categorySection, categoryIndex) => (
                <motion.div
                  key={categorySection.category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg border border-[#E9ECEF] overflow-hidden"
                >
                  {/* Category Header */}
                  <div className={`p-6 ${categorySection.category.color} border-b border-[#E9ECEF]`}>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <categorySection.category.icon className="w-7 h-7 text-[#1E5BA8]" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#212529]">{categorySection.category.name}</h3>
                        <p className="text-[#6C757D] text-sm mt-1">
                          {categorySection.category.description || `Professional-grade ${categorySection.category.name.toLowerCase()} solutions`}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <span className="px-4 py-2 bg-white rounded-full text-sm font-medium text-[#1E5BA8] shadow-sm">
                          {categorySection.products.length} Products
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Products Grid - Individual Product Cards */}
                  <div className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categorySection.products.map((product, productIndex) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: productIndex * 0.1 }}
                          className="bg-[#F8F9FA] rounded-xl overflow-hidden border border-[#E9ECEF] hover:shadow-lg transition-all group cursor-pointer"
                          onClick={() => toggleProductExpansion(product.id)}
                        >
                          {/* Product Image - 60% */}
                          <div className="relative h-48 bg-white p-4 flex items-center justify-center">
                            <img 
                              src={product.image_url} 
                              alt={product.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/assets/meican-logo.png';
                              }}
                            />
                            {/* Status Badge */}
                            <div className="absolute top-3 right-3">
                              {product.status_icon === 'droplet' ? (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full flex items-center gap-1">
                                  <Droplet className="w-3 h-3" />
                                  Waterproof
                                </span>
                              ) : (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                                  <Weight className="w-3 h-3" />
                                  High-Strength
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Product Info - 40% */}
                          <div className="p-4">
                            <h4 className="font-bold text-[#212529] mb-2">{product.name}</h4>
                            <p className="text-xs text-[#6C757D] mb-3 line-clamp-2">{product.description}</p>
                            
                            {/* Quick Specs */}
                            {product.specs && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                <span className="text-xs px-2 py-1 bg-white rounded text-[#6C757D]">
                                  {product.specs.coverage}
                                </span>
                                <span className="text-xs px-2 py-1 bg-white rounded text-[#6C757D]">
                                  {product.specs.curing_time}
                                </span>
                              </div>
                            )}
                            
                            {/* Price & CTA */}
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-lg font-bold text-[#1E5BA8]">
                                  KES {product.price.toLocaleString()}
                                </span>
                                <span className="text-xs text-[#6C757D] block">{product.uom}</span>
                              </div>
                              <motion.button
                                className="w-10 h-10 bg-[#1E5BA8] text-white rounded-full flex items-center justify-center shadow-md"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowProductSelection(true);
                                }}
                              >
                                <ChevronRight className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </div>
                          
                          {/* Expandable Details */}
                          <motion.div
                            initial={false}
                            animate={{ height: expandedProducts.has(product.id) ? 'auto' : 0, opacity: expandedProducts.has(product.id) ? 1 : 0 }}
                            className="overflow-hidden bg-white border-t border-[#E9ECEF]"
                          >
                            <div className="p-4 space-y-3">
                              {/* Technical Specs */}
                              {product.specs && (
                                <div className="space-y-2">
                                  <h5 className="text-xs font-semibold text-[#212529] uppercase tracking-wide">
                                    Technical Specifications
                                  </h5>
                                  <div className="grid grid-cols-2 gap-2 text-xs">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                      <div key={key} className="flex flex-col">
                                        <span className="text-[#6C757D] capitalize">{key.replace('_', ' ')}</span>
                                        <span className="font-medium text-[#212529]">{value as string}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Application Areas */}
                              {product.application_areas && (
                                <div className="flex flex-wrap gap-1">
                                  {product.application_areas.map((area: string) => (
                                    <span key={area} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                      {area}
                                    </span>
                                  ))}
                                </div>
                              )}
                              
                              {/* Data Sheet Link */}
                              {product.datasheet_url && (
                                <a
                                  href={product.datasheet_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-xs text-[#1E5BA8] hover:text-[#1a4d8f] transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <FileText className="w-4 h-4" />
                                  <span>Download Technical Data Sheet</span>
                                </a>
                              )}
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Category Footer CTA */}
                    <div className="mt-6 pt-6 border-t border-[#E9ECEF]">
                      <motion.button
                        onClick={() => {
                          setSelectedProductsCategory(categorySection.category.id);
                          setShowProductsPage(true);
                        }}
                        className="w-full py-4 bg-[#1E5BA8] text-white rounded-xl hover:bg-[#1a4d8f] transition-all flex items-center justify-center gap-3 font-medium"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <Package className="w-5 h-5" />
                        <span>View All {categorySection.category.name} Products</span>
                        <ChevronRight className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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

      {/* Client Logos Marquee */}
      <MarqueeLogos />

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
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={meicanLogo} alt="Meican Limited" className="h-10 w-10 object-contain brightness-0 invert" />
                <div className="font-semibold">MEICAN LIMITED</div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                A Kenyan registered company specializing in premium building materials and construction solutions. 
                Authorized distributor for Sika Kenya Limited.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <button 
                  onClick={() => setShowAboutUs(true)}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </button>
                <a href="#products" className="block text-gray-400 hover:text-white transition-colors">
                  Our Products
                </a>
                <a href="#contact" className="block text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </div>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Josh Industrial Estate, Athi River</p>
                <p>+254 700 123 456</p>
                <p>sales@meican.co.ke</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2026 Meican Limited. All rights reserved. | Registered Company in Kenya
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Reg. No: CPR/2014/XYZ123</span>
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
      {/* Product Selection Modal */}
      {showProductSelection && (
        <ProductSelection onClose={() => setShowProductSelection(false)} />
      )}

      {/* About Us Modal */}
      <AboutUs 
        isOpen={showAboutUs} 
        onClose={() => setShowAboutUs(false)} 
      />

      {/* Products Page */}
      <ProductsPage
        isOpen={showProductsPage}
        onClose={() => {
          setShowProductsPage(false);
          setSelectedProductsCategory(null);
        }}
        initialCategory={selectedProductsCategory}
      />

      {/* WhatsApp Float Button */}
      <motion.a
        href="https://wa.me/254797259150?text=Hi%20Meican%20Limited,%20I%20need%20technical%20recommendation%20for%20my%20construction%20project."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-sm font-medium">
          Need technical recommendation?
        </span>
      </motion.a>
    </div>
  );
}
