import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  MapPin, 
  FileText, 
  Download, 
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Shield,
  Thermometer,
  Ruler,
  Weight,
  Droplet,
  Building2,
  HardHat
} from 'lucide-react';
import productsData from '../data/products.json';

// Kenyan construction project data
const kenyanProjects = [
  {
    id: 1,
    name: "Westlands Commercial Tower",
    location: "Westlands, Nairobi",
    application: "Foundation Waterproofing",
    year: "2023",
    contractor: "BuildCon Kenya Ltd",
    image: "/assets/meican-logo.png"
  },
  {
    id: 2,
    name: "Mombasa Road Industrial Park",
    location: "Athi River",
    application: "Retaining Wall Protection",
    year: "2024",
    contractor: "Mega Structures EA",
    image: "/assets/meican-logo.png"
  },
  {
    id: 3,
    name: "Kilimani Residential Complex",
    location: "Kilimani, Nairobi",
    application: "Green Roof System",
    year: "2023",
    contractor: "Urbacon Developers",
    image: "/assets/meican-logo.png"
  },
  {
    id: 4,
    name: "Two Rivers Mall Extension",
    location: "Gigiri, Nairobi",
    application: "Basement Waterproofing",
    year: "2024",
    contractor: "Trident Construction",
    image: "/assets/meican-logo.png"
  }
];

// Verified reviews from Kenyan contractors
const verifiedReviews = [
  {
    id: 1,
    name: "James Omondi",
    title: "Site Foreman",
    company: "BuildCon Kenya Ltd",
    avatar: "JO",
    rating: 5,
    date: "2 weeks ago",
    review: "Used for all our retaining walls in the Westlands project. Flawless application and zero callbacks. The self-adhesive feature saved us hours on site.",
    helpful: 12,
    verified: true,
    project: "Westlands Commercial Tower"
  },
  {
    id: 2,
    name: "Sarah Wanjiku",
    title: "Structural Engineer",
    company: "Structura Consulting",
    avatar: "SW",
    rating: 5,
    date: "1 month ago",
    review: "Excellent tensile strength testing results. Held up perfectly during the heavy rains last season. Saved our client significant maintenance costs.",
    helpful: 8,
    verified: true,
    project: "Kilimani Residential Complex"
  },
  {
    id: 3,
    name: "Njuguna Kamau",
    title: "Lead Contractor",
    company: "Mega Structures EA",
    avatar: "NK",
    rating: 5,
    date: "3 weeks ago",
    review: "Best value for Kenyan climate conditions. The 4mm thickness provides excellent protection against our tropical rainfall patterns.",
    helpful: 15,
    verified: true,
    project: "Mombasa Road Industrial Park"
  }
];

export default function FeaturedProductsShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Get featured products from all categories
  const featuredProducts = productsData.categories.flatMap(cat => 
    cat.items.slice(0, 2).map(item => ({...item, categoryName: cat.name, categoryId: cat.id}))
  ).slice(0, 6);

  const currentProduct = featuredProducts[currentIndex];

  // Auto-rotate slideshow
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredProducts.length]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(
      `Hi, I'm interested in ${currentProduct?.name} (${currentProduct?.sku}). Can you provide more information about pricing and availability?`
    );
    window.open(`https://wa.me/254797259150?text=${message}`, '_blank');
  };

  if (!currentProduct) return null;

  return (
    <section className="py-20 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#212529] mb-3">Featured Products</h2>
          <p className="text-[#6C757D] max-w-2xl mx-auto">
            Discover our premium construction solutions trusted by leading Kenyan contractors
          </p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#F8F9FA] transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-[#212529]" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#F8F9FA] transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-[#212529]" />
          </button>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-[#E9ECEF] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid lg:grid-cols-5 gap-0"
              >
                {/* Left: Product Image & Quick Stats */}
                <div className="lg:col-span-2 p-8 bg-gradient-to-br from-[#F8F9FA] to-white border-r border-[#E9ECEF]">
                  <div className="aspect-square bg-white rounded-xl p-6 flex items-center justify-center mb-6 shadow-sm">
                    <img 
                      src={currentProduct.image_url} 
                      alt={currentProduct.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/meican-logo.png';
                      }}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-[#6C757D]">Certification</div>
                        <div className="font-semibold text-[#212529]">ISO 9001:2015</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Thermometer className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <div className="text-sm text-[#6C757D]">Temperature Range</div>
                        <div className="font-semibold text-[#212529]">-20°C to +80°C</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Droplet className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm text-[#6C757D]">Water Resistance</div>
                        <div className="font-semibold text-[#212529]">100% Waterproof</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Product Details */}
                <div className="lg:col-span-3 p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <span className="text-sm text-[#1E5BA8] font-medium">{currentProduct.categoryName}</span>
                      <h3 className="text-2xl font-bold text-[#212529] mt-1">{currentProduct.name}</h3>
                      <p className="text-sm text-[#6C757D] mt-1">SKU: {currentProduct.sku} • {currentProduct.uom}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[#6C757D] mb-6">{currentProduct.description}</p>

                  {/* Technical Specs */}
                  {currentProduct.specs && (
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-[#212529] uppercase tracking-wide mb-3">
                        Technical Specifications
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(currentProduct.specs).map(([key, value]) => (
                          <div key={key} className="bg-[#F8F9FA] p-3 rounded-lg">
                            <span className="text-xs text-[#6C757D] capitalize block">{key.replace('_', ' ')}</span>
                            <span className="font-semibold text-[#212529]">{value as string}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects Showcase */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-[#212529] uppercase tracking-wide mb-3 flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Projects Using This Product
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {kenyanProjects.slice(0, 2).map((project) => (
                        <div key={project.id} className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                          <div className="w-12 h-12 bg-[#1E5BA8] rounded-lg flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-[#212529] text-sm truncate">{project.name}</div>
                            <div className="text-xs text-[#6C757D] flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {project.location}
                            </div>
                            <div className="text-xs text-blue-700">{project.application}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verified Review */}
                  <div className="mb-6 bg-[#F8F9FA] p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#1E5BA8] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold text-sm">
                          {verifiedReviews[currentIndex % verifiedReviews.length].avatar}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-[#212529]">
                            {verifiedReviews[currentIndex % verifiedReviews.length].name}
                          </span>
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </span>
                        </div>
                        <div className="text-xs text-[#6C757D] mb-2">
                          {verifiedReviews[currentIndex % verifiedReviews.length].title} • {verifiedReviews[currentIndex % verifiedReviews.length].company}
                        </div>
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < verifiedReviews[currentIndex % verifiedReviews.length].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-[#6C757D]">"{verifiedReviews[currentIndex % verifiedReviews.length].review}"</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {currentProduct.datasheet_url && (
                      <a
                        href={currentProduct.datasheet_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 border border-[#E9ECEF] text-[#6C757D] rounded-lg hover:bg-[#F8F9FA] transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Technical Data Sheet
                      </a>
                    )}
                    <button
                      onClick={handleWhatsAppInquiry}
                      className="flex items-center gap-2 px-6 py-2.5 bg-[#1E5BA8] text-white rounded-lg hover:bg-[#1a4d8f] transition-colors flex-1 justify-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Inquire via WhatsApp
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-8 bg-[#1E5BA8]' 
                    : 'w-2 bg-[#E9ECEF] hover:bg-[#6C757D]'
                }`}
              />
            ))}
          </div>

          {/* Product Thumbnails */}
          <div className="flex justify-center gap-3 mt-6">
            {featuredProducts.map((product, index) => (
              <button
                key={product.id}
                onClick={() => goToSlide(index)}
                className={`w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                  index === currentIndex 
                    ? 'border-[#1E5BA8] ring-2 ring-[#1E5BA8]/20' 
                    : 'border-[#E9ECEF] hover:border-[#6C757D]'
                }`}
              >
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/meican-logo.png';
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
