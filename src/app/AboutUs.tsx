import { memo } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Shield, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle2,
  Users,
  Truck,
  FileText,
  ExternalLink
} from 'lucide-react';
const meicanLogo = '/assets/meican-logo.png';

interface AboutUsProps {
  isOpen: boolean;
  onClose: () => void;
}

function AboutUs({ isOpen, onClose }: AboutUsProps) {
  if (!isOpen) return null;

  const companyStats = [
    { label: 'Years in Operation', value: '10+' },
    { label: 'Products Delivered', value: '50K+' },
    { label: 'Contractors Served', value: '500+' },
    { label: 'Projects Completed', value: '1,000+' }
  ];

  const certifications = [
    { name: 'Registered Company', number: 'No. CPR/2014/XYZ123', authority: 'Registrar of Companies, Kenya' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every product meets international standards. We source directly from Sika Switzerland and other global leaders.'
    },
    {
      icon: Truck,
      title: 'Reliable Delivery',
      description: 'From Athi River to any construction site in Kenya. Zone-based logistics ensuring on-time delivery.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Technical consultation available. Our team includes certified engineers and construction specialists.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#1E5BA8] to-[#1a4d8f] text-white p-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>
          
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-xl p-2 flex items-center justify-center shadow-lg">
              <img
                src={meicanLogo}
                alt="Meican Limited Logo"
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">About Meican Limited</h2>
              <p className="text-white/90 text-lg">
                Your Trusted Partner for Premium Building Solutions in Kenya
              </p>
              <div className="flex items-center gap-2 mt-3 text-sm text-white/80">
                <CheckCircle2 className="w-4 h-4" />
                <span>Registered Company in Kenya</span>
                <span className="mx-2">•</span>
                <span>Since 2013</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Company Overview */}
          <section>
            <h3 className="text-xl font-bold text-[#212529] mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#1E5BA8]" />
              Company Overview
            </h3>
            <div className="prose prose-sm max-w-none text-[#6C757D] leading-relaxed space-y-4">
              <p>
                <strong className="text-[#212529]">Meican Limited</strong> is a Kenyan registered company specializing in the supply and distribution of high-quality building materials and construction solutions. Established in 2013, we have grown to become one of Kenya's leading providers of premium construction products, serving contractors, developers, and construction professionals across East Africa.
              </p>
              <p>
                We are the <strong className="text-[#212529]">authorized distributor</strong> for Sika Kenya Limited, the world-renowned Swiss manufacturer of specialty chemicals for construction and industry. This partnership allows us to bring globally-engineered solutions to local construction projects, ensuring Kenyan builders have access to the same quality standards as international markets.
              </p>
              <p>
                Our headquarters and main distribution center are located at <strong className="text-[#212529]">Total petrol station Athiriver, along Mombasa road</strong>, strategically positioned to serve Nairobi and the greater East African region with efficient logistics and timely delivery.
              </p>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="bg-[#F8F9FA] rounded-xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {companyStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-[#1E5BA8]">{stat.value}</div>
                  <div className="text-sm text-[#6C757D] mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Core Values */}
          <section>
            <h3 className="text-xl font-bold text-[#212529] mb-4">Our Core Values</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E9ECEF]"
                >
                  <div className="w-12 h-12 bg-[#1E5BA8]/10 rounded-lg flex items-center justify-center mb-3">
                    <value.icon className="w-6 h-6 text-[#1E5BA8]" />
                  </div>
                  <h4 className="font-semibold text-[#212529] mb-2">{value.title}</h4>
                  <p className="text-sm text-[#6C757D]">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Product Range */}
          <section>
            <h3 className="text-xl font-bold text-[#212529] mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#1E5BA8]" />
              Our Product Range
            </h3>
            <div className="bg-[#F8F9FA] rounded-xl p-6">
              <p className="text-[#6C757D] mb-4">
                We supply a comprehensive range of construction solutions including:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Waterproofing Systems & Membranes',
                  'Concrete Admixtures & Additives',
                  'Industrial Flooring Solutions',
                  'Bonding & Anchoring Systems',
                  'Repair Mortars & Grouts',
                  'Sealants & Joint Fillers',
                  'Roofing & Damp Proofing',
                  'Structural Strengthening'
                ].map((product) => (
                  <div key={product} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-[#212529]">{product}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#6C757D] text-sm mt-4">
                All products meet international standards including ISO, CE, and Kenyan Bureau of Standards (KEBS) certifications where applicable.
              </p>
            </div>
          </section>

          {/* Legal & Certifications */}
          <section>
            <h3 className="text-xl font-bold text-[#212529] mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#1E5BA8]" />
              Legal Registration & Certifications
            </h3>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 bg-[#F8F9FA] rounded-lg p-4"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#212529]">{cert.name}</div>
                    <div className="text-sm text-[#1E5BA8] font-medium">{cert.number}</div>
                    <div className="text-xs text-[#6C757D]">{cert.authority}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-gradient-to-r from-[#F8F9FA] to-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#212529] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#1E5BA8]" />
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-[#1E5BA8] mt-0.5" />
                  <div>
                    <div className="font-medium text-[#212529]">Headquarters</div>
                    <div className="text-sm text-[#6C757D]">
                      Total petrol station Athiriver, along Mombasa road<br />
                      P.O. Box 1234-00204<br />
                      Nairobi, Kenya
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#1E5BA8]" />
                  <div>
                    <div className="font-medium text-[#212529]">Phone</div>
                    <div className="text-sm text-[#6C757D]">+254797202299</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#1E5BA8]" />
                  <div>
                    <div className="font-medium text-[#212529]">Email</div>
                    <div className="text-sm text-[#6C757D]">meicanltd@outlook.com</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-[#E9ECEF]">
                <h4 className="font-semibold text-[#212529] mb-3">Business Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6C757D]">Monday - Friday</span>
                    <span className="text-[#212529]">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6C757D]">Saturday</span>
                    <span className="text-[#212529]">9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6C757D]">Sunday</span>
                    <span className="text-[#212529]">Closed</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-[#E9ECEF]">
                  <p className="text-xs text-[#6C757D]">
                    <strong>Note:</strong> Delivery services available 7 days a week by prior arrangement.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#E9ECEF]">
            <p className="text-sm text-[#6C757D] text-center sm:text-left">
              Thank you for choosing Meican Limited.<br />
              Building Kenya, One Quality Product at a Time.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 border border-[#E9ECEF] text-[#6C757D] rounded-lg hover:bg-[#F8F9FA] transition-colors font-medium"
              >
                Close
              </button>
              <a
                href="https://wa.me/254797259150?text=Hi%20Meican%20Limited,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors flex items-center gap-2 font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default memo(AboutUs);
