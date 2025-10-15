"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Filter, MapPin, Star, Clock, DollarSign, Heart, Share2, 
  Navigation, Cloud, Sun, Wind, Eye, Phone, Globe, Wifi, Car,
  Utensils, Camera, Music, ShoppingBag, Mountain, Building, Plane,
  ChevronDown, ChevronUp, X, Plus, Minus, Calendar, Users, Shield
} from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  rating: number;
  price: number;
  image: string;
  location: string;
  amenities: string[];
  distance: string;
  aiMatch: number;
  features: string[];
}

interface Restaurant {
  id: string;
  name: string;
  rating: number;
  priceRange: string;
  cuisine: string;
  image: string;
  location: string;
  distance: string;
  aiMatch: number;
  specialties: string[];
}

interface Activity {
  id: string;
  name: string;
  rating: number;
  price: number;
  image: string;
  location: string;
  duration: string;
  category: string;
  aiMatch: number;
  features: string[];
}

export default function DiscoverPage({ searchParams }: { searchParams: { [k: string]: string | string[] | undefined } }) {
  const place = (searchParams["place"] as string) || "";
  const start = (searchParams["start"] as string) || "";
  const end = (searchParams["end"] as string) || "";

  const [activeTab, setActiveTab] = useState("hotels");
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    amenities: [] as string[],
    cuisine: [] as string[],
    category: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("aiMatch");
  const [viewMode, setViewMode] = useState("grid");
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [weather, setWeather] = useState<any>(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState<string[]>([]);
  const [userPreferences, setUserPreferences] = useState({
    budget: "mid",
    travelStyle: "cultural",
    interests: ["history", "food", "nature"],
    dislikes: ["crowds", "expensive"],
    personality: "adventurous"
  });
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);

  // Mock data - in real app, this would come from API
  const hotels: Hotel[] = [
    {
      id: "1",
      name: "The Grand Palace Hotel",
      rating: 4.8,
      price: 250,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400&auto=format&fit=crop",
      location: "Connaught Place, New Delhi",
      amenities: ["WiFi", "Pool", "Spa", "Restaurant"],
      distance: "0.5 km from center",
      aiMatch: 95,
      features: ["Luxury", "Historic", "City Center"]
    },
    {
      id: "2",
      name: "Budget Stay Inn",
      rating: 4.2,
      price: 45,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1400&auto=format&fit=crop",
      location: "Paharganj, New Delhi",
      amenities: ["WiFi", "AC", "Breakfast"],
      distance: "1.2 km from center",
      aiMatch: 78,
      features: ["Budget", "Backpacker", "Near Metro"]
    },
    {
      id: "3",
      name: "Heritage Boutique Hotel",
      rating: 4.6,
      price: 120,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1400&auto=format&fit=crop",
      location: "Old Delhi",
      amenities: ["WiFi", "Restaurant", "Cultural Tours"],
      distance: "2.1 km from center",
      aiMatch: 88,
      features: ["Heritage", "Cultural", "Authentic"]
    }
  ];

  const restaurants: Restaurant[] = [
    {
      id: "1",
      name: "Karim's Restaurant",
      rating: 4.7,
      priceRange: "$$",
      cuisine: "Mughlai",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=1400&auto=format&fit=crop",
      location: "Jama Masjid, Old Delhi",
      distance: "1.8 km",
      aiMatch: 92,
      specialties: ["Kebabs", "Biryani", "Naan"]
    },
    {
      id: "2",
      name: "Bukhara Restaurant",
      rating: 4.9,
      priceRange: "$$$",
      cuisine: "North Indian",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=1400&auto=format&fit=crop",
      location: "ITC Maurya, New Delhi",
      distance: "3.2 km",
      aiMatch: 96,
      specialties: ["Tandoor", "Dal Bukhara", "Butter Chicken"]
    }
  ];

  const activities: Activity[] = [
    {
      id: "1",
      name: "Red Fort Heritage Walk",
      rating: 4.5,
      price: 25,
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1400&auto=format&fit=crop",
      location: "Red Fort, Old Delhi",
      duration: "3 hours",
      category: "Cultural",
      aiMatch: 89,
      features: ["Historic", "Guided Tour", "Photography"]
    },
    {
      id: "2",
      name: "Street Food Tour",
      rating: 4.8,
      price: 35,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1400&auto=format&fit=crop",
      location: "Chandni Chowk, Old Delhi",
      duration: "4 hours",
      category: "Food",
      aiMatch: 94,
      features: ["Food", "Local Experience", "Walking Tour"]
    }
  ];

  // Simulate weather data
  useEffect(() => {
    setWeather({
      temperature: 28,
      condition: "Sunny",
      humidity: 65,
      windSpeed: 12
    });
  }, []);

  // Simulate real-time alerts
  useEffect(() => {
    const alerts = [
      "🌤️ Weather Alert: Sunny skies expected all day",
      "💰 Deal Alert: 20% off at selected restaurants",
      "🎉 Event Alert: Local festival happening in Old Delhi",
      "🚇 Transport Alert: Metro delays on Blue Line"
    ];
    setRealTimeAlerts(alerts);
  }, []);

  const toggleSaved = (id: string) => {
    setSavedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case "hotels": return hotels;
      case "restaurants": return restaurants;
      case "activities": return activities;
      default: return [];
    }
  };

  const toggleComparison = (itemId: string) => {
    setSelectedForComparison(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getAIPersonalizedReason = (item: any, type: string) => {
    const reasons = [];
    
    if (userPreferences.budget === "budget" && item.price < 50) {
      reasons.push("Perfect for your budget");
    }
    if (userPreferences.travelStyle === "cultural" && item.features?.includes("Cultural")) {
      reasons.push("Matches your cultural interests");
    }
    if (userPreferences.interests.includes("food") && type === "restaurants") {
      reasons.push("Great for food lovers");
    }
    if (userPreferences.personality === "adventurous" && item.features?.includes("Adventure")) {
      reasons.push("Perfect for adventurous travelers");
    }
    
    return reasons.length > 0 ? reasons[0] : "AI recommended based on your profile";
  };

  const CardComponent = ({ item, type }: { item: any, type: string }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`bg-night-800/60 rounded-xl border overflow-hidden transition-all group ${
        comparisonMode && selectedForComparison.includes(item.id)
          ? "border-neon-cyan shadow-glow"
          : "border-white/10 hover:border-neon-cyan/30"
      }`}
    >
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => toggleSaved(item.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <Heart 
            size={18} 
            className={savedItems.includes(item.id) ? "text-red-500 fill-red-500" : "text-white"}
          />
        </button>
        <div className="absolute top-3 left-3 bg-neon-purple/90 text-white px-2 py-1 rounded-full text-xs font-semibold">
          {item.aiMatch}% AI Match
        </div>
        {comparisonMode && (
          <button
            onClick={() => toggleComparison(item.id)}
            className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${
              selectedForComparison.includes(item.id)
                ? "bg-neon-cyan text-night-900"
                : "bg-black/50 text-white hover:bg-black/70"
            }`}
          >
            {selectedForComparison.includes(item.id) ? "✓" : "+"}
          </button>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm">{item.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-white/70 text-sm mb-2">
          <MapPin size={14} />
          <span>{item.location}</span>
        </div>
        
        <div className="flex items-center gap-1 text-white/70 text-sm mb-3">
          <span>{item.distance}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <DollarSign size={16} className="text-green-400" />
            <span className="font-semibold">
              {type === "restaurants" ? item.priceRange : `$${item.price}`}
            </span>
          </div>
          {type === "activities" && (
            <div className="flex items-center gap-1 text-white/70 text-sm">
              <Clock size={14} />
              <span>{item.duration}</span>
            </div>
          )}
        </div>
        
        {/* AI Personalized Reason */}
        <div className="mb-3 p-2 bg-neon-purple/10 rounded-lg border border-neon-purple/20">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-neon-purple" />
            <span className="text-xs text-neon-purple font-medium">
              {getAIPersonalizedReason(item, type)}
            </span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {(item.amenities || item.specialties || item.features)?.slice(0, 3).map((feature: string, index: number) => (
            <span key={index} className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded">
              {feature}
            </span>
          ))}
        </div>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-gradient-to-r from-neon-purple to-neon-cyan text-night-900 font-semibold py-2 px-4 rounded-lg text-sm">
            View Details
          </button>
          <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-night-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-night-900/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Discover {place}</h1>
              <p className="text-white/70 text-sm">
                {start && end ? `${start} → ${end}` : "Your personalized recommendations"}
              </p>
            </div>
            
            {/* Real-time alerts */}
            <div className="flex items-center gap-4">
              {weather && (
                <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg">
                  <Sun className="text-yellow-400" size={18} />
                  <span className="text-sm">{weather.temperature}°C</span>
                </div>
              )}
              <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10">
                <Navigation size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Real-time alerts banner */}
        {realTimeAlerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-gradient-to-r from-neon-purple/10 to-neon-cyan/10 border border-neon-purple/20 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className="text-neon-cyan" size={20} />
              <span className="font-semibold">Real-time Updates</span>
            </div>
            <div className="space-y-1">
              {realTimeAlerts.map((alert, index) => (
                <div key={index} className="text-sm text-white/80">{alert}</div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tabs and Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
              {["hotels", "restaurants", "activities"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all capitalize ${
                    activeTab === tab
                      ? "bg-neon-purple text-white shadow-glow"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setComparisonMode(!comparisonMode)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                comparisonMode 
                  ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan" 
                  : "border-white/20 hover:bg-white/10"
              }`}
            >
              <BarChart3 size={18} />
              Compare
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Filter size={18} />
              Filters
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-neon-cyan"
            >
              <option value="aiMatch">AI Match</option>
              <option value="rating">Rating</option>
              <option value="price">Price</option>
              <option value="distance">Distance</option>
            </select>
            
            <div className="flex border border-white/20 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-neon-purple" : "hover:bg-white/10"}`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-neon-purple" : "hover:bg-white/10"}`}
              >
                <div className="w-4 h-4 flex flex-col gap-0.5">
                  <div className="bg-current rounded-sm h-1"></div>
                  <div className="bg-current rounded-sm h-1"></div>
                  <div className="bg-current rounded-sm h-1"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-white/5 rounded-xl p-6 border border-white/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Price Range</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                      }))}
                      className="flex-1"
                    />
                    <span className="text-sm">${filters.priceRange[1]}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={3}>3+ Stars</option>
                    <option value={4}>4+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Amenities</label>
                  <div className="space-y-2">
                    {["WiFi", "Pool", "Spa", "Restaurant", "Parking"].map(amenity => (
                      <label key={amenity} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({
                                ...prev,
                                amenities: [...prev.amenities, amenity]
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                amenities: prev.amenities.filter(a => a !== amenity)
                              }));
                            }
                          }}
                          className="rounded"
                        />
                        {amenity}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Cuisine Type</label>
                  <div className="space-y-2">
                    {["Indian", "Chinese", "Italian", "Mexican", "Thai"].map(cuisine => (
                      <label key={cuisine} className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={filters.cuisine.includes(cuisine)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({
                                ...prev,
                                cuisine: [...prev.cuisine, cuisine]
                              }));
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                cuisine: prev.cuisine.filter(c => c !== cuisine)
                              }));
                            }
                          }}
                          className="rounded"
                        />
                        {cuisine}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {getCurrentData().map((item) => (
            <CardComponent key={item.id} item={item} type={activeTab} />
          ))}
        </div>

        {/* Comparison Panel */}
        {comparisonMode && selectedForComparison.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-night-800/60 rounded-xl p-6 border border-neon-cyan/30"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Compare Selected Items</h3>
              <button
                onClick={() => setSelectedForComparison([])}
                className="text-sm text-white/70 hover:text-white"
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedForComparison.map(itemId => {
                const item = getCurrentData().find(i => i.id === itemId);
                if (!item) return null;
                
                return (
                  <div key={itemId} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{item.name}</h4>
                      <button
                        onClick={() => toggleComparison(itemId)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Rating:</span>
                        <span className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-400 fill-yellow-400" />
                          {item.rating}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Price:</span>
                        <span className="font-semibold">
                          {activeTab === "restaurants" ? item.priceRange : `$${item.price}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">AI Match:</span>
                        <span className="text-neon-cyan font-semibold">{item.aiMatch}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Distance:</span>
                        <span>{item.distance}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-neon-purple to-neon-cyan text-night-900 font-semibold rounded-lg shadow-glow hover:scale-105 transition-transform">
            Load More Results
          </button>
        </div>
      </div>
    </div>
  );
}


