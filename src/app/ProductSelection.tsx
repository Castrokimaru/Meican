import { useState } from 'react';
import { motion } from 'motion/react';
import { Package, ChevronRight, Check, X, ArrowLeft, Droplet, Weight, Zap, Shield, FileText, Download, MapPin } from 'lucide-react';
import productsData from '../data/products.json';

interface ProductSelectionProps {
  onClose: () => void;
}

interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  uom: string;
  quantity: number;
}

export default function ProductSelection({ onClose }: ProductSelectionProps) {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [isSending, setIsSending] = useState(false);

  const allProducts = productsData.categories.flatMap(category =>
    category.items.map(item => ({
      ...item,
      category: category.name,
      categoryId: category.id
    }))
  );

  // Separate products into waterproofing and other categories
  const waterproofingProducts = productsData.categories
    .find(cat => cat.id === 'waterproofing')?.items || [];
  
  const otherProducts = productsData.categories
    .filter(cat => cat.id !== 'waterproofing')
    .flatMap(category => category.items);

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const sendInquiry = () => {
    if (selectedProducts.size === 0) return;

    setIsSending(true);
    
    const selectedProductDetails = allProducts.filter(product => 
      selectedProducts.has(product.id)
    );
    
    const productDetailsWithQuantities = selectedProductDetails.map(product => ({
      ...product,
      quantity: 1 // Default quantity
    }));
    
    const productList = productDetailsWithQuantities.map(product => 
      `-${ product.name } (KES ${product.price.toLocaleString()}) - ${product.uom}`
    ).join('\n');
    
    const totalPrice = selectedProductDetails.reduce((sum, product) => 
      sum + product.price, 0
    );
    
    const message = encodeURIComponent(
      `Hi, I'm interested in the following products:\n\n${productList}\n\nTotal: KES ${totalPrice.toLocaleString()}\n\nCan you provide more information about availability and delivery?`
    );
    
    window.open(`https://wa.me/254797259150?text=${message}`, '_blank');
    
    setTimeout(() => {
      setIsSending(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E9ECEF]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="w-10 h-10 bg-[#F8F9FA] hover:bg-[#E9ECEF] rounded-full flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#6C757D]" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-[#212529]">Select Products</h2>
                <p className="text-[#6C757D]">Choose the products you're interested in</p>
              </div>
            </div>
            <div className="text-sm text-[#6C757D]">
              {selectedProducts.size} product{selectedProducts.size !== 1 ? 's' : ''} selected
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            {/* Construction Products - First */}
            {otherProducts.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#212529]">Construction Solutions</h3>
                    <p className="text-sm text-[#6C757D]">High-performance admixtures, sealants, and flooring systems</p>
                  </div>
                </div>
                
                {/* Row layout for construction products */}
                <div className="space-y-4">
                  {otherProducts.map((product, productIndex) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ 
                        scale: 1.01,
                        boxShadow: "0 10px 25px rgba(34, 197, 94, 0.15)"
                      }}
                      transition={{ 
                        duration: 0.3, 
                        delay: productIndex * 0.1
                      }}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedProducts.has(product.id)
                          ? 'border-green-500 bg-green-50 shadow-lg'
                          : 'border-[#E9ECEF] hover:border-green-300 bg-white'
                      }`}
                      onClick={() => toggleProductSelection(product.id)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-[#F8F9FA] rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/assets/meican-logo.png';
                            }}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-[#212529] text-lg">{product.name}</h4>
                            {/* Material State Icon */}
                            {product.status_icon === 'droplet' ? (
                              <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full">
                                <Droplet className="w-3 h-3 text-blue-500" />
                                <span className="text-xs text-blue-600 font-medium">Waterproof</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 px-2 py-1 bg-green-50 rounded-full">
                                <Weight className="w-3 h-3 text-green-500" />
                                <span className="text-xs text-green-600 font-medium">High-Strength</span>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-sm text-[#6C757D] mb-2">{product.description}</p>
                          
                          {/* Technical Specs */}
                          {product.specs && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              <span className="text-xs px-2 py-1 bg-[#F8F9FA] rounded text-[#6C757D]">
                                Coverage: {product.specs.coverage}
                              </span>
                              <span className="text-xs px-2 py-1 bg-[#F8F9FA] rounded text-[#6C757D]">
                                Cure: {product.specs.curing_time}
                              </span>
                              <span className="text-xs px-2 py-1 bg-[#F8F9FA] rounded text-[#6C757D]">
                                Grade: {product.specs.waterproofing_grade || product.specs.compressive_strength}
                              </span>
                            </div>
                          )}
                          
                          {/* Application Areas */}
                          {product.application_areas && (
                            <div className="flex items-center gap-1 mb-2">
                              <MapPin className="w-3 h-3 text-[#6C757D]" />
                              <span className="text-xs text-[#6C757D]">
                                Best for: {product.application_areas.slice(0, 2).join(', ')}
                              </span>
                            </div>
                          )}
                          
                          {/* PDF Download */}
                          {product.datasheet_url && (
                            <a
                              href={product.datasheet_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-[#1E5BA8] hover:text-[#1a4d8f] transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FileText className="w-3 h-3" />
                              <span>Download Data Sheet</span>
                              <Download className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">KES {product.price.toLocaleString()}</div>
                            <div className="text-xs text-[#6C757D]">{product.uom}</div>
                          </div>
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedProducts.has(product.id)
                              ? 'border-green-500 bg-green-500'
                              : 'border-[#E9ECEF]'
                          }`}>
                            {selectedProducts.has(product.id) && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Waterproofing Products - Second */}
            {waterproofingProducts.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#212529]">Waterproofing Solutions</h3>
                    <p className="text-sm text-[#6C757D]">Complete waterproofing systems for basements, roofs, and wet areas</p>
                  </div>
                </div>
                
                {/* Row layout for waterproofing products */}
                <div className="space-y-4">
                  {waterproofingProducts.map((product, productIndex) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ 
                        scale: 1.01,
                        boxShadow: "0 10px 25px rgba(30, 91, 168, 0.15)"
                      }}
                      transition={{ 
                        duration: 0.3, 
                        delay: productIndex * 0.1
                      }}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        selectedProducts.has(product.id)
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-[#E9ECEF] hover:border-blue-300 bg-white'
                      }`}
                      onClick={() => toggleProductSelection(product.id)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-[#F8F9FA] rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/assets/meican-logo.png';
                            }}
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-[#212529] text-lg">{product.name}</h4>
                            {/* Material State Icon - Always show waterproof for waterproofing */}
                            <div className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-full">
                              <Droplet className="w-3 h-3 text-blue-500" />
                              <span className="text-xs text-blue-600 font-medium">Waterproof</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-[#6C757D] mb-2">{product.description}</p>
                          
                          {/* Technical Specs */}
                          {product.specs && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              <span className="text-xs px-2 py-1 bg-[#F8F9FA] rounded text-[#6C757D]">
                                Coverage: {product.specs.coverage}
                              </span>
                              <span className="text-xs px-2 py-1 bg-[#F8F9FA] rounded text-[#6C757D]">
                                Cure: {product.specs.curing_time}
                              </span>
                              <span className="text-xs px-2 py-1 bg-[#F8F9FA] rounded text-[#6C757D]">
                                Grade: {product.specs.waterproofing_grade || product.specs.compressive_strength}
                              </span>
                            </div>
                          )}
                          
                          {/* Application Areas */}
                          {product.application_areas && (
                            <div className="flex items-center gap-1 mb-2">
                              <MapPin className="w-3 h-3 text-[#6C757D]" />
                              <span className="text-xs text-[#6C757D]">
                                Best for: {product.application_areas.slice(0, 2).join(', ')}
                              </span>
                            </div>
                          )}
                          
                          {/* PDF Download */}
                          {product.datasheet_url && (
                            <a
                              href={product.datasheet_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-[#1E5BA8] hover:text-[#1a4d8f] transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FileText className="w-3 h-3" />
                              <span>Download Data Sheet</span>
                              <Download className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">KES {product.price.toLocaleString()}</div>
                            <div className="text-xs text-[#6C757D]">{product.uom}</div>
                          </div>
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedProducts.has(product.id)
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-[#E9ECEF]'
                          }`}>
                            {selectedProducts.has(product.id) && (
                              <Check className="w-4 h-4 text-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#E9ECEF] bg-[#F8F9FA]">
          <div className="flex items-center justify-between">
            <div>
              {selectedProducts.size > 0 && (
                <div>
                  <div className="text-sm text-[#6C757D]">Selected Products</div>
                  <div className="text-lg font-semibold text-[#212529]">
                    KES {allProducts
                      .filter(product => selectedProducts.has(product.id))
                      .reduce((sum, product) => sum + product.price, 0)
                      .toLocaleString()}
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-[#E9ECEF] text-[#6C757D] rounded-lg hover:bg-[#F8F9FA] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={sendInquiry}
                disabled={selectedProducts.size === 0 || isSending}
                className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  selectedProducts.size === 0 || isSending
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#1E5BA8] text-white hover:bg-[#1a4d8f]'
                }`}
              >
                {isSending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-opacity-20 rounded-full">
                      <motion.div
                        className="w-3 h-3 border-2 border-t-white border-opacity-20 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      </motion.div>
                    </div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Package className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
