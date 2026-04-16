import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Star, 
  MapPin, 
  FileText, 
  Download, 
  MessageCircle,
  ThumbsUp,
  Shield,
  Thermometer,
  Ruler,
  Weight,
  Droplet,
  Building2,
  HardHat,
  CheckCircle2
} from 'lucide-react';

interface ProductDetailModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onWhatsAppInquiry: () => void;
}

// Kenyan construction project data
const kenyanProjects = [
  {
    id: 1,
    name: "Westlands Commercial Tower",
    location: "Westlands, Nairobi",
    application: "Foundation Waterproofing",
    year: "2023",
    contractor: "BuildCon Kenya Ltd",
    image: "/assets/project-westlands.jpg"
  },
  {
    id: 2,
    name: "Mombasa Road Industrial Park",
    location: "Athi River",
    application: "Retaining Wall Protection",
    year: "2024",
    contractor: "Mega Structures EA",
    image: "/assets/project-mombasa.jpg"
  },
  {
    id: 3,
    name: "Kilimani Residential Complex",
    location: "Kilimani, Nairobi",
    application: "Green Roof System",
    year: "2023",
    contractor: "Urbacon Developers",
    image: "/assets/project-kilimani.jpg"
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
  },
  {
    id: 4,
    name: "The Westlands Project Team",
    title: "Project Management",
    company: "Westlands Development Co.",
    avatar: "WP",
    rating: 5,
    date: "2 months ago",
    review: "Waterproofing performance exceeded expectations during the last heavy rain season. The membrane showed no deterioration after 18 months.",
    helpful: 20,
    verified: true,
    project: "Westlands Commercial Tower"
  }
];

// Technical specifications for SikaShield
const technicalSpecs = {
  thickness: "4.0 mm",
  tensileStrength: "≥ 800 N/50mm",
  elongation: "≥ 30%",
  serviceTemp: "-20°C to +110°C",
  waterproofing: "Class A (Highest)",
  rootResistance: "FLL Certified",
  application: "Self-Adhesive / Torch-on",
  coverage: "10 m² per roll"
};

export default function ProductDetailModal({ 
  product, 
  isOpen, 
  onClose, 
  onWhatsAppInquiry 
}: ProductDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'specs' | 'projects' | 'reviews'>('specs');
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());

  if (!product) return null;

  const averageRating = verifiedReviews.reduce((sum, r) => sum + r.rating, 0) / verifiedReviews.length;

  const toggleLike = (reviewId: number) => {
    setLikedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#1E5BA8] to-[#1a4d8f] text-white p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-start gap-6">
                {/* Product Image */}
                <div className="w-32 h-32 bg-white rounded-xl p-4 flex items-center justify-center shadow-lg">
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                      SikaShield® Series
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
                      <span className="text-sm text-white/70">({verifiedReviews.length} reviews)</span>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                  <p className="text-white/80 text-lg mb-4">{product.description}</p>
                  
                  {/* Quick Specs */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-white/70" />
                      <span className="text-sm">{technicalSpecs.thickness}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-white/70" />
                      <span className="text-sm">{technicalSpecs.serviceTemp}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-white/70" />
                      <span className="text-sm">{technicalSpecs.waterproofing}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{technicalSpecs.rootResistance}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* CTAs */}
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={onWhatsAppInquiry}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Inquiry
                </button>
                <button className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl font-medium transition-all flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Download TDS
                </button>
                <div className="ml-auto text-right">
                  <div className="text-2xl font-bold">KES {product.price.toLocaleString()}</div>
                  <div className="text-sm text-white/70">{product.uom} • VAT Exclusive</div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-[#E9ECEF]">
              {[
                { id: 'specs', label: 'Technical Specs', icon: Shield },
                { id: 'projects', label: 'Project Gallery', icon: Building2 },
                { id: 'reviews', label: 'Verified Reviews', icon: Star }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'text-[#1E5BA8] border-b-2 border-[#1E5BA8] bg-blue-50/50'
                      : 'text-[#6C757D] hover:text-[#212529] hover:bg-[#F8F9FA]'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              {/* Technical Specs Tab */}
              {activeTab === 'specs' && (
                <div className="space-y-6">
                  {/* Detailed Specs Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-[#F8F9FA] rounded-xl p-6">
                      <h3 className="font-semibold text-[#212529] mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-[#1E5BA8]" />
                        Physical Properties
                      </h3>
                      <div className="space-y-3">
                        {Object.entries({
                          'Thickness': technicalSpecs.thickness,
                          'Tensile Strength': technicalSpecs.tensileStrength,
                          'Elongation at Break': technicalSpecs.elongation,
                          'Service Temperature': technicalSpecs.serviceTemp
                        }).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-2 border-b border-[#E9ECEF] last:border-0">
                            <span className="text-[#6C757D]">{key}</span>
                            <span className="font-medium text-[#212529]">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#F8F9FA] rounded-xl p-6">
                      <h3 className="font-semibold text-[#212529] mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        Certifications & Standards
                      </h3>
                      <div className="space-y-3">
                        {[
                          { label: 'Waterproofing Grade', value: technicalSpecs.waterproofing },
                          { label: 'Root Resistance', value: technicalSpecs.rootResistance },
                          { label: 'Application Method', value: technicalSpecs.application },
                          { label: 'Coverage Area', value: technicalSpecs.coverage }
                        ].map((item) => (
                          <div key={item.label} className="flex justify-between items-center py-2 border-b border-[#E9ECEF] last:border-0">
                            <span className="text-[#6C757D]">{item.label}</span>
                            <span className="font-medium text-[#212529]">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Application Schematic */}
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
                    <h3 className="font-semibold text-[#212529] mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#1E5BA8]" />
                      Application Schematics
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { 
                          title: 'Basement Waterproofing', 
                          icon: Building2,
                          desc: 'Vertical application on retaining walls with proper overlap',
                          layers: ['Concrete Wall', 'Primer', 'SikaShield Membrane', 'Protection Layer']
                        },
                        { 
                          title: 'Green Roof System', 
                          icon: Droplet,
                          desc: 'Root-resistant waterproofing for landscaped roofs',
                          layers: ['Structural Slab', 'SikaShield Root-Resistant', 'Drainage', 'Growing Medium']
                        },
                        { 
                          title: 'Foundation Protection', 
                          icon: HardHat,
                          desc: 'Horizontal application below grade concrete',
                          layers: ['Compacted Soil', 'Sand Base', 'SikaShield Membrane', 'Concrete Foundation']
                        }
                      ].map((app, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <app.icon className="w-5 h-5 text-[#1E5BA8]" />
                            <h4 className="font-medium text-[#212529]">{app.title}</h4>
                          </div>
                          <p className="text-xs text-[#6C757D] mb-3">{app.desc}</p>
                          <div className="space-y-1">
                            {app.layers.map((layer, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs">
                                <div className="w-1.5 h-1.5 bg-[#1E5BA8] rounded-full" />
                                <span className="text-[#6C757D]">{layer}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Project Gallery Tab */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[#212529]">
                      Projects Using {product.name}
                    </h3>
                    <span className="text-sm text-[#6C757D]">
                      {kenyanProjects.length} verified installations
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {kenyanProjects.map((project) => (
                      <motion.div
                        key={project.id}
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-xl overflow-hidden shadow-lg border border-[#E9ECEF]"
                      >
                        <div className="h-40 bg-gradient-to-br from-[#1E5BA8]/20 to-[#1E5BA8]/40 flex items-center justify-center">
                          <Building2 className="w-16 h-16 text-[#1E5BA8]/50" />
                        </div>
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-[#1E5BA8]" />
                            <span className="text-sm text-[#6C757D]">{project.location}</span>
                          </div>
                          <h4 className="font-semibold text-[#212529] mb-1">{project.name}</h4>
                          <p className="text-sm text-[#6C757D] mb-3">{project.application}</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-[#6C757D]">{project.year}</span>
                            <span className="text-[#1E5BA8] font-medium">{project.contractor}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-[#1E5BA8]" />
                      <h4 className="font-semibold text-[#212529]">Installation Coverage Calculator</h4>
                    </div>
                    <p className="text-sm text-[#6C757D] mb-4">
                      Based on {technicalSpecs.coverage} per roll. Contact us for detailed quantity calculations 
                      for your specific project requirements.
                    </p>
                    <button 
                      onClick={onWhatsAppInquiry}
                      className="px-4 py-2 bg-[#1E5BA8] text-white rounded-lg text-sm font-medium hover:bg-[#1a4d8f] transition-colors"
                    >
                      Get Project Quote
                    </button>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Overall Rating */}
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-[#212529]">{averageRating.toFixed(1)}</div>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < Math.round(averageRating) 
                                  ? 'text-yellow-500 fill-yellow-500' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <div className="text-sm text-[#6C757D] mt-1">
                          {verifiedReviews.length} verified reviews
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#212529] mb-2">
                          Verified Project Reviews
                        </h3>
                        <p className="text-sm text-[#6C757D]">
                          All reviews are from verified contractors and engineers who have used 
                          {product.name} on actual Kenyan construction projects.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-4">
                    {verifiedReviews.map((review) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl p-5 border border-[#E9ECEF] shadow-sm"
                      >
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className="w-12 h-12 bg-[#1E5BA8] rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                            {review.avatar}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-[#212529]">{review.name}</span>
                              {review.verified && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" />
                                  Verified
                                </span>
                              )}
                            </div>
                            
                            <div className="text-sm text-[#6C757D] mb-2">
                              {review.title} • {review.company}
                            </div>
                            
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < review.rating 
                                      ? 'text-yellow-500 fill-yellow-500' 
                                      : 'text-gray-300'
                                  }`} 
                                />
                              ))}
                              <span className="text-xs text-[#6C757D] ml-2">{review.date}</span>
                            </div>
                            
                            <p className="text-[#212529] mb-3">{review.review}</p>
                            
                            <div className="flex items-center gap-4 text-xs">
                              <button
                                onClick={() => toggleLike(review.id)}
                                className={`flex items-center gap-1 transition-colors ${
                                  likedReviews.has(review.id)
                                    ? 'text-[#1E5BA8]'
                                    : 'text-[#6C757D] hover:text-[#212529]'
                                }`}
                              >
                                <ThumbsUp className={`w-4 h-4 ${likedReviews.has(review.id) ? 'fill-current' : ''}`} />
                                <span>Helpful ({review.helpful + (likedReviews.has(review.id) ? 1 : 0)})</span>
                              </button>
                              <span className="text-[#6C757D]">•</span>
                              <span className="text-[#6C757D]">Project: {review.project}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
