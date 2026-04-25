import { useState, useEffect, memo } from 'react';
import { motion } from 'motion/react';
import { Star, ThumbsUp, Eye, MapPin, CheckCircle2, Quote, Send, X } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  initials: string;
  role: string;
  company: string;
  location: string;
  county: string;
  rating: number;
  feedback: string;
  likes: number;
  views: number;
  date: string;
  avatarColor: string;
  project: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Omondi",
    initials: "JO",
    role: "Site Foreman",
    company: "BuildCon Kenya Ltd",
    location: "Westlands, Nairobi",
    county: "Nairobi",
    rating: 5,
    feedback:
      "Outstanding waterproofing products! Used Sika solutions on all our retaining walls and the results were flawless. Zero callbacks from the client and the application was straightforward. The Meican team provided excellent technical guidance throughout the project.",
    likes: 47,
    views: 312,
    date: "2 weeks ago",
    avatarColor: "#1E5BA8",
    project: "Westlands Commercial Tower",
  },
  {
    id: 2,
    name: "Sarah Wanjiku",
    initials: "SW",
    role: "Structural Engineer",
    company: "Structura Consulting",
    location: "Kilimani, Nairobi",
    county: "Nairobi",
    rating: 5,
    feedback:
      "Exceptional quality that held up perfectly during the heavy rains last season. The Sikatop waterproofing membrane exceeded our tensile strength testing and saved our client significant maintenance costs. Highly recommend to any serious engineer.",
    likes: 38,
    views: 224,
    date: "1 month ago",
    avatarColor: "#0D7377",
    project: "Kilimani Residential Complex",
  },
  {
    id: 3,
    name: "Njuguna Kamau",
    initials: "NK",
    role: "Lead Contractor",
    company: "Mega Structures EA",
    location: "Athi River, Machakos",
    county: "Machakos",
    rating: 5,
    feedback:
      "Best value for Kenyan climate conditions. The 4mm thickness provides excellent protection against our tropical rainfall. Delivery was prompt and the Meican team understood local site conditions very well. Will definitely order again.",
    likes: 61,
    views: 488,
    date: "3 weeks ago",
    avatarColor: "#8B2FC9",
    project: "Mombasa Road Industrial Park",
  },
  {
    id: 4,
    name: "Fatuma Hassan",
    initials: "FH",
    role: "Project Manager",
    company: "Coast Builders Ltd",
    location: "Nyali, Mombasa",
    county: "Mombasa",
    rating: 5,
    feedback:
      "We've been sourcing Sika products through Meican for over two years. The concrete admixtures have dramatically improved our mix quality in coastal conditions. The salt-air environment demands the best — Meican delivers exactly that.",
    likes: 29,
    views: 175,
    date: "2 months ago",
    avatarColor: "#C94B4B",
    project: "Nyali Beachfront Apartments",
  },
  {
    id: 5,
    name: "Peter Kipkoech",
    initials: "PK",
    role: "Civil Engineer",
    company: "Rift Valley Constructions",
    location: "Nakuru Town",
    county: "Nakuru",
    rating: 5,
    feedback:
      "The injection systems worked perfectly for crack repair on our water tower. We had a serious leak and the Meican team recommended the right product and walked us through the procedure. Problem solved in one day — incredible.",
    likes: 54,
    views: 396,
    date: "3 months ago",
    avatarColor: "#2E7D32",
    project: "Nakuru Water Tower Rehabilitation",
  },
  {
    id: 6,
    name: "Diana Achieng",
    initials: "DA",
    role: "Architect",
    company: "Lakeside Design Studio",
    location: "Kisumu CBD",
    county: "Kisumu",
    rating: 5,
    feedback:
      "Specified Sikafloor for a large commercial kitchen project and the results were stunning. Seamless, hygienic, and exactly what we needed. The technical data sheets made it easy to specify correctly. Meican's prompt response to our queries was a bonus.",
    likes: 33,
    views: 210,
    date: "1 month ago",
    avatarColor: "#E65100",
    project: "Kisumu City Mall Food Court",
  },
  {
    id: 7,
    name: "Moses Rotich",
    initials: "MR",
    role: "Construction Manager",
    company: "Highlands Developers",
    location: "Eldoret",
    county: "Uasin Gishu",
    rating: 5,
    feedback:
      "Ordered tiling products for a 200-unit residential project and every single unit came out perfect. Consistent color, excellent bond strength, and the grout has maintained its appearance even in the wet areas. Meican is our go-to supplier.",
    likes: 42,
    views: 287,
    date: "6 weeks ago",
    avatarColor: "#1565C0",
    project: "Eldoret Highlands Estate Phase 2",
  },
  {
    id: 8,
    name: "Lydia Muthoni",
    initials: "LM",
    role: "Quantity Surveyor",
    company: "Thika Road Contractors",
    location: "Thika Town",
    county: "Kiambu",
    rating: 5,
    feedback:
      "The volume pricing from Meican made a significant difference to our project budget. Got bulk discounts on the epoxy flooring system and quality was never compromised. Delivery scheduling was flexible and they always kept us informed.",
    likes: 26,
    views: 158,
    date: "5 weeks ago",
    avatarColor: "#6A1B9A",
    project: "Thika EPZ Warehouse Complex",
  },
];

function CustomerFeedback() {
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(
    Object.fromEntries(testimonials.map((t) => [t.id, t.likes]))
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    location: '',
    rating: 5,
    feedback: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Group testimonials into slides of 1
  const testimonialSlides = [];
  for (let i = 0; i < testimonials.length; i += 1) {
    testimonialSlides.push(testimonials.slice(i, i + 1));
  }

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonialSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonialSlides.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send to backend here
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewForm(false);
      setFormData({ name: '', role: '', company: '', location: '', rating: 5, feedback: '' });
    }, 3000);
  };

  const toggleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setLikeCounts((c) => ({ ...c, [id]: c[id] - 1 }));
      } else {
        next.add(id);
        setLikeCounts((c) => ({ ...c, [id]: c[id] + 1 }));
      }
      return next;
    });
  };

  return (
    <section className="py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-[#1E5BA8]/10 text-[#1E5BA8] text-sm font-semibold rounded-full mb-4">
            Client Stories
          </span>
          <h2 className="text-4xl font-bold text-[#212529] mb-3">
            Trusted Across Kenya
          </h2>
          <p className="text-[#6C757D] max-w-2xl mx-auto">
            From Mombasa to Eldoret, contractors and engineers trust Meican for
            premium building material solutions
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: -currentSlide * 100 + '%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {testimonialSlides.map((slide, slideIndex) => (
              <div key={slideIndex} className="flex-shrink-0 w-full">
                <div className="max-w-2xl mx-auto">
                  {slide.map((t, index) => (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: index * 0.1 }}
                      className="bg-white rounded-2xl border border-[#E9ECEF] p-8 flex flex-col gap-5 hover:shadow-lg transition-shadow"
                    >
                      {/* Quote icon */}
                      <div className="flex items-start justify-between">
                        <Quote className="w-8 h-8 text-[#1E5BA8]/20 fill-[#1E5BA8]/10" />
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified
                        </span>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < t.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-200 fill-gray-200'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Feedback Text */}
                      <p className="text-base text-[#6C757D] leading-relaxed flex-1">
                        "{t.feedback}"
                      </p>

                    {/* Project tag */}
                    <div className="text-xs text-[#1E5BA8] font-medium bg-[#1E5BA8]/8 px-3 py-1.5 rounded-lg truncate">
                      {t.project}
                    </div>

                      {/* Reviewer */}
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          style={{ backgroundColor: t.avatarColor }}
                        >
                          {t.initials}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-[#212529] text-sm truncate">
                            {t.name}
                          </div>
                          <div className="text-xs text-[#6C757D] truncate">
                            {t.role} · {t.company}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-[#6C757D] mt-0.5">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{t.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-[#E9ECEF]" />

                      {/* Footer: likes + views + date */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Like button */}
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => toggleLike(t.id)}
                            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors ${
                              likedIds.has(t.id)
                                ? 'bg-[#1E5BA8] text-white'
                                : 'bg-[#F8F9FA] text-[#6C757D] hover:bg-[#E9ECEF]'
                            }`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>{likeCounts[t.id]}</span>
                          </motion.button>

                          {/* Views */}
                          <div className="flex items-center gap-1.5 text-xs text-[#6C757D]">
                            <Eye className="w-3.5 h-3.5" />
                            <span>{t.views.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Date */}
                        <span className="text-xs text-[#6C757D]">{t.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonialSlides.length) % testimonialSlides.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#1E5BA8] hover:bg-[#1E5BA8] hover:text-white transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonialSlides.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[#1E5BA8] hover:bg-[#1E5BA8] hover:text-white transition-colors"
          >
            →
          </button>

          {/* Slider Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonialSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-[#1E5BA8]' : 'bg-[#E9ECEF]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Leave a Review Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16"
        >
          {!showReviewForm ? (
            <div className="text-center bg-white rounded-2xl border border-[#E9ECEF] p-8">
              <p className="text-[#6C757D] mb-4">
                Have you worked with Meican? Share your experience with others.
              </p>
              <button
                onClick={() => setShowReviewForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E5BA8] text-white rounded-lg font-semibold hover:bg-[#164785] transition-colors"
              >
                <Send className="w-4 h-4" />
                Write a Review
              </button>
            </div>
          ) : submitted ? (
            <div className="text-center bg-green-50 rounded-2xl border border-green-200 p-8">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
              <p className="text-green-700">Your review has been submitted and is pending verification.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#E9ECEF] p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#212529]">Write Your Review</h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="p-2 hover:bg-[#F8F9FA] rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-[#6C757D]" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#212529] mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5BA8]/20 focus:border-[#1E5BA8]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#212529] mb-2">Company *</label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5BA8]/20 focus:border-[#1E5BA8]"
                      placeholder="Your Company Ltd"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#212529] mb-2">Role *</label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5BA8]/20 focus:border-[#1E5BA8]"
                      placeholder="Engineer, Contractor, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#212529] mb-2">Location *</label>
                    <input
                      type="text"
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5BA8]/20 focus:border-[#1E5BA8]"
                      placeholder="Nairobi, Mombasa, etc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#212529] mb-2">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-200 fill-gray-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#212529] mb-2">Your Review *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.feedback}
                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    className="w-full px-4 py-3 border border-[#E9ECEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E5BA8]/20 focus:border-[#1E5BA8] resize-none"
                    placeholder="Share your experience with Meican products and services..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#1E5BA8] text-white rounded-lg font-semibold hover:bg-[#164785] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(CustomerFeedback);
