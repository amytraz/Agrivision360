import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ShoppingCart, 
  Store, 
  Filter,
  Search,
  Upload, 
  Star
} from 'lucide-react';
import { BlurImage } from '@/components/ui/blur-image';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';

// Types for our marketplace items
type ProductCategory = 'seeds' | 'plants' | 'fertilizers' | 'tools' | 'machinery' | 'produce';

interface ProductItem {
  id: number;
  name: string;
  description: string;
  price: string;
  seller: string;
  location: string;
  rating: number;
  category: ProductCategory;
  image: string;
}

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const { toast } = useToast();

  // Sample product data
  const products: ProductItem[] = [
    {
      id: 1,
      name: "Premium Wheat Seeds",
      description: "High-yield wheat seeds suitable for various soil types",
      price: "₹1,200/kg",
      seller: "Kisan Beej Suppliers",
      location: "Haryana",
      rating: 4.8,
      category: "seeds",
      image: "https://images.unsplash.com/photo-1574323347407-f5e0c0f2b0b6?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Organic Fertilizer",
      description: "100% organic compost, perfect for all crops",
      price: "₹850/bag",
      seller: "Green Earth Solutions",
      location: "Kerala",
      rating: 4.9,
      category: "fertilizers",
      image: "https://images.unsplash.com/photo-1585314540237-67b0d6c1d5ba?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Mango Saplings (Alphonso)",
      description: "Genuine Alphonso mango saplings, 8-12 months old",
      price: "₹450/piece",
      seller: "Tropical Nursery",
      location: "Maharashtra",
      rating: 4.7,
      category: "plants",
      image: "https://images.unsplash.com/photo-1587554229004-006ab1fcacc4?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "High-Quality Pruning Shears",
      description: "Stainless steel, ergonomic design for comfortable use",
      price: "₹950",
      seller: "Farm Tools India",
      location: "Punjab",
      rating: 4.6,
      category: "tools",
      image: "https://images.unsplash.com/photo-1593096127838-27c4665bf5d7?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Mini Tractor Cultivator",
      description: "Compact cultivator for small to medium farms, 25HP",
      price: "₹1,85,000",
      seller: "Modern Agri Machines",
      location: "Gujarat",
      rating: 4.9,
      category: "machinery",
      image: "https://images.unsplash.com/photo-1592989988348-0349d3fe5f0b?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 6,
      name: "Fresh Organic Tomatoes",
      description: "Pesticide-free, locally grown red tomatoes",
      price: "₹85/kg",
      seller: "Sunshine Farms",
      location: "Karnataka",
      rating: 4.7,
      category: "produce",
      image: "https://images.unsplash.com/photo-1546094096-0df4bcabd31c?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 7,
      name: "Drip Irrigation System",
      description: "Complete kit for 1 acre, water-saving technology",
      price: "₹15,500",
      seller: "Water Wise Tech",
      location: "Tamil Nadu",
      rating: 4.8,
      category: "tools",
      image: "https://images.unsplash.com/photo-1578594320233-4893a8af6dc8?q=80&w=1974&auto=format&fit=crop"
    },
    {
      id: 8,
      name: "Basmati Rice Seeds",
      description: "Authentic basmati variety, high aroma and yield",
      price: "₹1,900/kg",
      seller: "North India Seeds",
      location: "Uttar Pradesh",
      rating: 4.9,
      category: "seeds",
      image: "https://images.unsplash.com/photo-1586201375800-20bfc6e6d4b2?q=80&w=1974&auto=format&fit=crop"
    },
  ];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Categories for filter
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'seeds', label: 'Seeds' },
    { value: 'plants', label: 'Plants & Saplings' },
    { value: 'fertilizers', label: 'Fertilizers' },
    { value: 'tools', label: 'Tools & Equipment' },
    { value: 'machinery', label: 'Machinery' },
    { value: 'produce', label: 'Farm Produce' },
  ];

  // Function to handle purchase
  const handlePurchase = (productId: number) => {
    toast({
      title: "Added to Cart",
      description: "The product has been added to your cart",
    });
  };

  // Mock function for product listing (sell tab)
  const handleListProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Product Listed Successfully",
      description: "Your product has been listed in the marketplace",
    });
  };

  return (
    <div className="min-h-screen">
      <main className="pt-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Agricultural Marketplace</h1>
            <p className="text-foreground/70">Connect directly with buyers and sellers in the agricultural community</p>
          </div>
          
          <Tabs defaultValue="buy" value={activeTab} onValueChange={setActiveTab} className="w-full mb-10">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="buy" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Buy Products
              </TabsTrigger>
              <TabsTrigger value="sell" className="flex items-center gap-2">
                <Store className="h-4 w-4" />
                Sell Products
              </TabsTrigger>
            </TabsList>
            
            {/* Buy Tab Content */}
            <TabsContent value="buy" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="space-y-2">
                      <h4 className="font-medium">Categories</h4>
                      <div className="space-y-1">
                        {categories.map((category) => (
                          <div key={category.value} className="flex items-center">
                            <button
                              onClick={() => setSelectedCategory(category.value as ProductCategory | 'all')}
                              className={`text-sm py-1 px-2 rounded-md w-full text-left ${
                                selectedCategory === category.value 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'hover:bg-accent'
                              }`}
                            >
                              {category.label}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No products found matching your criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-48 overflow-hidden">
                        <BlurImage
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{product.name}</CardTitle>
                          <span className="font-medium text-primary">{product.price}</span>
                        </div>
                        <CardDescription className="mt-1">{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex flex-col text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Seller:</span>
                            <span className="font-medium">{product.seller}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Location:</span>
                            <span>{product.location}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                            <span className="font-medium">{product.rating}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button 
                          className="w-full"
                          onClick={() => handlePurchase(product.id)}
                        >
                          Add to Cart
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            {/* Sell Tab Content */}
            <TabsContent value="sell" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>List Your Agricultural Products</CardTitle>
                  <CardDescription>
                    Fill the form below to list your products on the marketplace
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleListProduct} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="product-name" className="text-sm font-medium">
                          Product Name
                        </label>
                        <Input id="product-name" placeholder="Enter product name" required />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="product-category" className="text-sm font-medium">
                          Category
                        </label>
                        <select 
                          id="product-category" 
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          required
                        >
                          <option value="">Select category</option>
                          {categories.filter(c => c.value !== 'all').map((category) => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="product-description" className="text-sm font-medium">
                        Description
                      </label>
                      <textarea 
                        id="product-description" 
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                        placeholder="Describe your product"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="product-price" className="text-sm font-medium">
                          Price
                        </label>
                        <Input id="product-price" placeholder="₹ Enter price" required />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="product-quantity" className="text-sm font-medium">
                          Available Quantity
                        </label>
                        <Input id="product-quantity" placeholder="Enter quantity" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="product-location" className="text-sm font-medium">
                        Location
                      </label>
                      <Input id="product-location" placeholder="Enter your location" required />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Product Images
                      </label>
                      <div className="border-2 border-dashed border-border rounded-md p-6 text-center">
                        <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Drag and drop images here or click to browse
                        </p>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          id="product-images" 
                          multiple 
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => document.getElementById('product-images')?.click()}
                        >
                          Select Images
                        </Button>
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full">
                      List Product
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
