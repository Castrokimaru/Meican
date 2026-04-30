import { useState, useMemo, useEffect, memo, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Search,
  Filter,
  Grid3x3,
  List,
  Package,
  Droplet,
  Weight,
  ArrowLeft,
  ShoppingCart,
  Download,
} from 'lucide-react';
import productsData from '../data/products.json';

// Virtualized list hook for performance
const useVirtualizedList = <T,>(items: T[], itemsPerPage: number = 12) => {
  const [page, setPage] = useState(1);
  
  const displayedItems = useMemo(() => {
    return items.slice(0, page * itemsPerPage);
  }, [items, page, itemsPerPage]);
  
  const hasMore = displayedItems.length < items.length;
  
  const loadMore = useCallback(() => {
    if (hasMore) {
      setPage(p => p + 1);
    }
  }, [hasMore]);
  
  // Reset page when items change
  useEffect(() => {
    setPage(1);
  }, [items]);
  
  return { displayedItems, hasMore, loadMore };
};

interface ProductsPageProps {
  onClose: () => void;
}

function ProductsPage({ onClose }: ProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProducts, setSelectedProducts] = useState<Map<string, number>>(new Map());
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high'>('name');
  const [showFilters, setShowFilters] = useState(false);
  
  // Respect user's reduced motion preference for better performance
  const prefersReducedMotion = useReducedMotion();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('meican-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        const cartMap = new Map(Object.entries(cartData));
        setSelectedProducts(cartMap);
      } catch {
        // Silently fail - cart will start empty
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const cartData = Object.fromEntries(selectedProducts);
    localStorage.setItem('meican-cart', JSON.stringify(cartData));
  }, [selectedProducts]);

  // Get all products flattened
  const allProducts = useMemo(() => {
    return productsData.categories.flatMap(category =>
      category.items.map(item => ({
        ...item,
        categoryName: category.name,
        categoryId: category.id,
        categoryIcon: category.icon
      }))
    );
  }, []);

  // Calculate total selected quantity
  const totalSelectedQuantity = useMemo(() => {
    return Array.from(selectedProducts.values()).reduce((sum, qty) => sum + qty, 0);
  }, [selectedProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = allProducts;

    // Filter by category
    if (selectedCategory) {
      products = products.filter(p => p.categoryId === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
    }
  }, [allProducts, selectedCategory, searchQuery, sortBy]);
  
  // Use virtualization to only render visible products
  const { displayedItems, hasMore, loadMore } = useVirtualizedList(filteredProducts, 12);

  // Get unique categories
  const categories = useMemo(() => {
    return productsData.categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      count: cat.items.length
    }));
  }, []);

  const updateProductQuantity = (productId: string, quantity: number) => {
    setSelectedProducts(prev => {
      const newMap = new Map(prev);
      if (quantity <= 0) {
        newMap.delete(productId);
      } else {
        newMap.set(productId, quantity);
      }
      return newMap;
    });
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    setSortBy('name');
  };

  const handleInquiry = () => {
    if (selectedProducts.size === 0) return;

    const selectedItems = allProducts.filter(p => selectedProducts.has(p.id));
    const productList = selectedItems.map(p => {
      const quantity = selectedProducts.get(p.id) || 0;
      const itemTotal = p.price * quantity;
      return `- ${p.name} x${quantity} (KES ${itemTotal.toLocaleString()}) - ${p.uom}`;
    }).join('\n');

    const total = selectedItems.reduce((sum, p) => sum + (p.price * (selectedProducts.get(p.id) || 0)), 0);

    const message = encodeURIComponent(
      `Hi, I'm interested in the following products:\n\n${productList}\n\nTotal: KES ${total.toLocaleString()}\n\nCan you provide more information about availability and delivery?`
    );

    window.open(`https://wa.me/254797202299?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 bg-white border-b border-[#E9ECEF] z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Back Button */}
              <button
                onClick={onClose}
                className="flex items-center gap-2 text-[#6C757D] hover:text-[#212529] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Home</span>
              </button>

              {/* Logo */}
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6 text-[#1E5BA8]" />
                <span className="font-bold text-[#212529]">All Products</span>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-xl hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C757D]" />
                  <input
                    type="text"
                    placeholder="Search products, categories, or specifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E5BA8] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Selected Count & Inquiry */}
              <div className="flex items-center gap-3">
                {totalSelectedQuantity > 0 && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span className="text-sm font-medium">{totalSelectedQuantity}</span>
                  </motion.div>
                )}
                <button
                  onClick={handleInquiry}
                  disabled={selectedProducts.size === 0}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedProducts.size > 0
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Send Inquiry
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6C757D]" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-[#E9ECEF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E5BA8]"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="sticky top-24 space-y-6">
                {/* Categories Filter */}
                <div className="bg-[#F8F9FA] rounded-xl p-5">
                  <h3 className="font-semibold text-[#212529] mb-4 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === null
                          ? 'bg-[#1E5BA8] text-white'
                          : 'hover:bg-white text-[#6C757D]'
                      }`}
                    >
                      All Categories ({allProducts.length})
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                          selectedCategory === cat.id
                            ? 'bg-[#1E5BA8] text-white'
                            : 'hover:bg-white text-[#6C757D]'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs opacity-70">({cat.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div className="bg-[#F8F9FA] rounded-xl p-5">
                  <h3 className="font-semibold text-[#212529] mb-4">Sort By</h3>
                  <div className="space-y-2">
                    {[
                      { value: 'name', label: 'Name (A-Z)' },
                      { value: 'price-low', label: 'Price: Low to High' },
                      { value: 'price-high', label: 'Price: High to Low' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value as any)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          sortBy === option.value
                            ? 'bg-[#1E5BA8] text-white'
                            : 'hover:bg-white text-[#6C757D]'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedCategory || searchQuery) && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-2 border border-[#E9ECEF] text-[#6C757D] rounded-lg hover:bg-[#E9ECEF] transition-colors text-sm"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-[#212529]">
                    {selectedCategory 
                      ? categories.find(c => c.id === selectedCategory)?.name 
                      : 'All Products'}
                  </h1>
                  <p className="text-[#6C757D] text-sm mt-1">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden p-2 border border-[#E9ECEF] rounded-lg"
                  >
                    <Filter className="w-5 h-5 text-[#6C757D]" />
                  </button>

                  {/* View Mode Toggle */}
                  <div className="flex items-center border border-[#E9ECEF] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-[#1E5BA8] text-white' : 'text-[#6C757D] hover:bg-[#F8F9FA]'}`}
                    >
                      <Grid3x3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-[#1E5BA8] text-white' : 'text-[#6C757D] hover:bg-[#F8F9FA]'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid/List */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-[#F8F9FA] rounded-xl">
                  <Package className="w-16 h-16 text-[#E9ECEF] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#212529] mb-2">No products found</h3>
                  <p className="text-[#6C757D]">Try adjusting your search or filters</p>
                </div>
              ) : (
                <>
                <div className={viewMode === 'grid' 
                  ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'
                }>
                  {displayedItems.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { delay: Math.min(index * 0.03, 0.3), duration: 0.3 }}
                      className={`bg-white rounded-xl border border-[#E9ECEF] overflow-hidden hover:shadow-lg transition-all ${
                        viewMode === 'list' ? 'flex' : ''
                      } ${selectedProducts.has(product.id) ? 'ring-2 ring-[#1E5BA8] border-[#1E5BA8]' : ''}`}
                    >
                      {/* Product Image */}
                      <div className={`relative bg-[#F8F9FA] flex items-center justify-center ${
                        viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'h-56'
                      }`}>
                        <img
                          src={product.image_url}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-contain p-4"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/meican-logo.png';
                          }}
                        />
                        {/* Status Badge */}
                        <div className="absolute top-3 right-3">
                          {product.categoryIcon === 'droplet' ? (
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

                      {/* Product Info */}
                      <div className="p-5 flex-1">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <span className="text-xs text-[#1E5BA8] font-medium">{product.categoryName}</span>
                            <h3 className="font-bold text-[#212529] text-lg">{product.name}</h3>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {selectedProducts.has(product.id) ? (
                              <>
                                <button
                                  onClick={() => updateProductQuantity(product.id, (selectedProducts.get(product.id) || 0) - 1)}
                                  className="w-8 h-8 rounded-full border-2 border-[#1E5BA8] bg-[#1E5BA8] text-white flex items-center justify-center hover:bg-[#1a4d8f] transition-colors"
                                >
                                  <span className="text-sm">-</span>
                                </button>
                                <span className="px-3 py-1 bg-[#1E5BA8] text-white rounded-lg font-medium min-w-[3rem] text-center">
                                  {selectedProducts.get(product.id)}
                                </span>
                                <button
                                  onClick={() => updateProductQuantity(product.id, (selectedProducts.get(product.id) || 0) + 1)}
                                  className="w-8 h-8 rounded-full border-2 border-[#1E5BA8] bg-[#1E5BA8] text-white flex items-center justify-center hover:bg-[#1a4d8f] transition-colors"
                                >
                                  <span className="text-sm">+</span>
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => updateProductQuantity(product.id, 1)}
                                className="px-4 py-2 bg-[#1E5BA8] text-white rounded-lg hover:bg-[#1a4d8f] transition-colors font-medium"
                              >
                                Add to Cart
                              </button>
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-[#6C757D] mb-3 line-clamp-2">{product.description}</p>

                        {/* Product Tags */}
                        {product.tags && product.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {product.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="text-xs px-2 py-1 bg-[#F8F9FA] rounded text-[#6C757D]">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Price & Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-[#E9ECEF]">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xl font-bold text-[#1E5BA8]">KES {product.price.toLocaleString()}</span>
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                Excl. VAT
                              </span>
                            </div>
                            <span className="text-xs text-[#6C757D] block">{product.uom}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {product.datasheet_url && (
                              <a
                                href={product.datasheet_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-[#6C757D] hover:text-[#1E5BA8] transition-colors"
                                title="Download Data Sheet"
                              >
                                <Download className="w-5 h-5" />
                              </a>
                            )}
                          </div>
                        </div>


                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Load More Button */}
                {hasMore && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={loadMore}
                      className="px-6 py-3 bg-[#1E5BA8] text-white rounded-lg hover:bg-[#1a4d8f] transition-colors font-medium"
                    >
                      Load More ({filteredProducts.length - displayedItems.length} remaining)
                    </button>
                  </div>
                )}
                </>
              )}
            </main>
          </div>
        </div>

        {/* Floating Selected Products Bar */}
        {selectedProducts.size > 0 && (
            <motion.div
              initial={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={prefersReducedMotion ? { y: 0, opacity: 0 } : { y: 100, opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0.15 } : { duration: 0.3 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#212529] text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-6"
            >
              <div>
                <span className="text-sm text-gray-400">{totalSelectedQuantity} item{totalSelectedQuantity !== 1 ? 's' : ''} selected</span>
                  <div className="font-semibold">
                    KES {allProducts
                      .filter(p => selectedProducts.has(p.id))
                      .reduce((sum, p) => sum + (p.price * (selectedProducts.get(p.id) || 0)), 0)
                      .toLocaleString()}
                  </div>
                </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedProducts(new Map())}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Clear
                </button>
                <button
                  onClick={handleInquiry}
                  className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Send Inquiry
                </button>
              </div>
            </motion.div>
          )}
    </div>
  );
}

export default memo(ProductsPage);
