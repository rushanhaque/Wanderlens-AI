"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Star, Heart, Share2, Navigation, Camera, 
  Clock, DollarSign, Users, Eye, EyeOff, Compass,
  Mountain, Coffee, Camera as CameraIcon, Music, Utensils
} from "lucide-react";

interface HiddenSpot {
  id: string;
  name: string;
  description: string;
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: "viewpoint" | "restaurant" | "cafe" | "photo" | "nature" | "cultural";
  rating: number;
  difficulty: "easy" | "medium" | "hard";
  duration: string; // in hours
  cost: "free" | "low" | "medium" | "high";
  crowdLevel: "quiet" | "moderate" | "busy";
  bestTime: string;
  tips: string[];
  images: string[];
  discovered: boolean;
  saved: boolean;
}

interface HiddenSpotsProps {
  className?: string;
}

export default function HiddenSpots({ className = "" }: HiddenSpotsProps) {
  const [spots, setSpots] = useState<HiddenSpot[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<HiddenSpot | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    difficulty: "all",
    cost: "all",
    crowdLevel: "all"
  });
  const [searchLocation, setSearchLocation] = useState("");

  const mockSpots: HiddenSpot[] = [
    {
      id: "1",
      name: "Secret Garden Rooftop",
      description: "A hidden rooftop garden with panoramic city views, perfect for sunset photography and quiet contemplation.",
      location: "Downtown District",
      coordinates: { lat: 40.7128, lng: -74.0060 },
      category: "viewpoint",
      rating: 4.8,
      difficulty: "medium",
      duration: "2-3 hours",
      cost: "free",
      crowdLevel: "quiet",
      bestTime: "Sunset (6-8 PM)",
      tips: ["Bring a camera", "Wear comfortable shoes", "Check weather conditions"],
      images: ["/api/placeholder/400/300"],
      discovered: false,
      saved: false
    },
    {
      id: "2",
      name: "Underground Art Gallery",
      description: "A converted basement space showcasing local artists' work, with rotating exhibitions and intimate atmosphere.",
      location: "Arts Quarter",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      category: "cultural",
      rating: 4.6,
      difficulty: "easy",
      duration: "1-2 hours",
      cost: "low",
      crowdLevel: "moderate",
      bestTime: "Weekday afternoons",
      tips: ["Check opening hours", "Bring cash for donations", "Ask about guided tours"],
      images: ["/api/placeholder/400/300"],
      discovered: false,
      saved: false
    },
    {
      id: "3",
      name: "Hidden Waterfall Trail",
      description: "A secluded hiking trail leading to a beautiful waterfall, surrounded by lush vegetation and peaceful sounds.",
      location: "Nature Reserve",
      coordinates: { lat: 40.6892, lng: -74.1745 },
      category: "nature",
      rating: 4.9,
      difficulty: "hard",
      duration: "4-5 hours",
      cost: "free",
      crowdLevel: "quiet",
      bestTime: "Early morning (6-8 AM)",
      tips: ["Bring water and snacks", "Wear hiking boots", "Check trail conditions"],
      images: ["/api/placeholder/400/300"],
      discovered: false,
      saved: false
    },
    {
      id: "4",
      name: "Local's Secret Cafe",
      description: "A family-run cafe tucked away in a residential area, known for authentic local cuisine and warm hospitality.",
      location: "Residential District",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      category: "cafe",
      rating: 4.7,
      difficulty: "easy",
      duration: "1-2 hours",
      cost: "low",
      crowdLevel: "moderate",
      bestTime: "Weekend mornings",
      tips: ["Try the house special", "Bring local currency", "Practice basic greetings"],
      images: ["/api/placeholder/400/300"],
      discovered: false,
      saved: false
    },
    {
      id: "5",
      name: "Photographer's Paradise",
      description: "An abandoned building with stunning architectural details and natural light, perfect for creative photography.",
      location: "Industrial Zone",
      coordinates: { lat: 40.7282, lng: -73.7949 },
      category: "photo",
      rating: 4.5,
      difficulty: "medium",
      duration: "2-3 hours",
      cost: "free",
      crowdLevel: "quiet",
      bestTime: "Golden hour (5-7 PM)",
      tips: ["Bring camera equipment", "Wear sturdy shoes", "Be respectful of the space"],
      images: ["/api/placeholder/400/300"],
      discovered: false,
      saved: false
    },
    {
      id: "6",
      name: "Underground Music Venue",
      description: "A hidden basement venue featuring intimate live performances by local musicians and emerging artists.",
      location: "Music District",
      coordinates: { lat: 40.7614, lng: -73.9776 },
      category: "cultural",
      rating: 4.4,
      difficulty: "easy",
      duration: "2-4 hours",
      cost: "medium",
      crowdLevel: "moderate",
      bestTime: "Friday/Saturday nights",
      tips: ["Check event schedule", "Arrive early for good seats", "Bring ID"],
      images: ["/api/placeholder/400/300"],
      discovered: false,
      saved: false
    }
  ];

  const categories = [
    { id: "all", name: "All", icon: Compass },
    { id: "viewpoint", name: "Viewpoints", icon: Mountain },
    { id: "restaurant", name: "Restaurants", icon: Utensils },
    { id: "cafe", name: "Cafes", icon: Coffee },
    { id: "photo", name: "Photo Spots", icon: CameraIcon },
    { id: "nature", name: "Nature", icon: Mountain },
    { id: "cultural", name: "Cultural", icon: Music }
  ];

  const difficulties = [
    { id: "all", name: "All Levels" },
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" }
  ];

  const costs = [
    { id: "all", name: "All Prices" },
    { id: "free", name: "Free" },
    { id: "low", name: "Low" },
    { id: "medium", name: "Medium" },
    { id: "high", name: "High" }
  ];

  const crowdLevels = [
    { id: "all", name: "All Crowds" },
    { id: "quiet", name: "Quiet" },
    { id: "moderate", name: "Moderate" },
    { id: "busy", name: "Busy" }
  ];

  const discoverSpots = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filter spots based on current filters
      let filteredSpots = mockSpots;
      
      if (filters.category !== "all") {
        filteredSpots = filteredSpots.filter(spot => spot.category === filters.category);
      }
      if (filters.difficulty !== "all") {
        filteredSpots = filteredSpots.filter(spot => spot.difficulty === filters.difficulty);
      }
      if (filters.cost !== "all") {
        filteredSpots = filteredSpots.filter(spot => spot.cost === filters.cost);
      }
      if (filters.crowdLevel !== "all") {
        filteredSpots = filteredSpots.filter(spot => spot.crowdLevel === filters.crowdLevel);
      }
      
      // If searching by location
      if (searchLocation.trim()) {
        filteredSpots = filteredSpots.filter(spot => 
          spot.location.toLowerCase().includes(searchLocation.toLowerCase()) ||
          spot.name.toLowerCase().includes(searchLocation.toLowerCase())
        );
      }
      
      setSpots(filteredSpots);
    } catch (error) {
      console.error("Error discovering spots:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSaved = (spotId: string) => {
    setSpots(spots.map(spot => 
      spot.id === spotId ? { ...spot, saved: !spot.saved } : spot
    ));
  };

  const markAsDiscovered = (spotId: string) => {
    setSpots(spots.map(spot => 
      spot.id === spotId ? { ...spot, discovered: true } : spot
    ));
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.id === category);
    return categoryData ? categoryData.icon : Compass;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      viewpoint: "bg-blue-100 text-blue-700 border-blue-200",
      restaurant: "bg-orange-100 text-orange-700 border-orange-200",
      cafe: "bg-amber-100 text-amber-700 border-amber-200",
      photo: "bg-purple-100 text-purple-700 border-purple-200",
      nature: "bg-green-100 text-green-700 border-green-200",
      cultural: "bg-pink-100 text-pink-700 border-pink-200"
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: { [key: string]: string } = {
      easy: "text-green-600",
      medium: "text-yellow-600",
      hard: "text-red-600"
    };
    return colors[difficulty] || "text-gray-600";
  };

  const getCostColor = (cost: string) => {
    const colors: { [key: string]: string } = {
      free: "text-green-600",
      low: "text-blue-600",
      medium: "text-yellow-600",
      high: "text-red-600"
    };
    return colors[cost] || "text-gray-600";
  };

  useEffect(() => {
    discoverSpots();
  }, [filters, searchLocation]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-100 rounded-xl p-6 ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
          <Eye className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Hidden Spots Discovery</h3>
          <p className="text-gray-600 text-sm">Discover secret places only locals know about</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Search by location or spot name..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
              />
            </div>
          </div>
          <motion.button
            onClick={discoverSpots}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? "Discovering..." : "Discover Spots"}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty.id} value={difficulty.id}>{difficulty.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cost</label>
            <select
              value={filters.cost}
              onChange={(e) => setFilters({ ...filters, cost: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              {costs.map((cost) => (
                <option key={cost.id} value={cost.id}>{cost.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Crowd Level</label>
            <select
              value={filters.crowdLevel}
              onChange={(e) => setFilters({ ...filters, crowdLevel: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              {crowdLevels.map((level) => (
                <option key={level.id} value={level.id}>{level.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Spots Grid */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full"
          />
          <span className="ml-3 text-gray-600">Discovering hidden gems...</span>
        </div>
      )}

      {spots.length > 0 && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spots.map((spot) => {
            const CategoryIcon = getCategoryIcon(spot.category);
            return (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer w-60 h-60"
                onClick={() => setSelectedSpot(spot)}
              >
                <div className="relative">
                  <div className="w-full h-20 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                    <CategoryIcon className="w-8 h-8 text-white/80" />
                  </div>
                  
                  <div className="absolute top-1 right-1 flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSaved(spot.id);
                      }}
                      className={`p-1 rounded-full transition-all ${
                        spot.saved 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/80 text-gray-600 hover:bg-white'
                      }`}
                    >
                      <Heart className={`w-2 h-2 ${spot.saved ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsDiscovered(spot.id);
                      }}
                      className={`p-1 rounded-full transition-all ${
                        spot.discovered 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white/80 text-gray-600 hover:bg-white'
                      }`}
                    >
                      {spot.discovered ? <Eye className="w-2 h-2" /> : <EyeOff className="w-2 h-2" />}
                    </button>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-xs font-bold text-gray-800 leading-tight flex-1 pr-1">{spot.name}</h4>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="w-2 h-2 text-yellow-500 fill-current" />
                      <span className="text-xs font-medium text-gray-600">{spot.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2 leading-tight">{spot.description}</p>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin className="w-2 h-2 text-gray-400" />
                    <span className="text-xs text-gray-600">{spot.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="w-2 h-2" />
                      {spot.duration}
                    </div>
                    <div className={`flex items-center gap-1 ${getCostColor(spot.cost)}`}>
                      <DollarSign className="w-2 h-2" />
                      {spot.cost}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(spot.category)}`}>
                      {spot.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 flex items-center gap-1">
                      <Users className="w-2 h-2" />
                      {spot.crowdLevel}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {spots.length === 0 && !loading && (
        <div className="text-center py-12">
          <Compass className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No hidden spots found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Spot Details Modal */}
      {selectedSpot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSpot(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <div className="w-full h-64 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                {(() => {
                  const CategoryIcon = getCategoryIcon(selectedSpot.category);
                  return <CategoryIcon className="w-20 h-20 text-white/80" />;
                })()}
              </div>
              
              <button
                onClick={() => setSelectedSpot(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition-all"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedSpot.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{selectedSpot.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium text-gray-600">{selectedSpot.rating}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleSaved(selectedSpot.id)}
                    className={`p-2 rounded-lg transition-all ${
                      selectedSpot.saved 
                        ? 'bg-red-500 text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${selectedSpot.saved ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{selectedSpot.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Duration: {selectedSpot.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Cost: {selectedSpot.cost}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Difficulty: {selectedSpot.difficulty}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Crowd: {selectedSpot.crowdLevel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Best time: {selectedSpot.bestTime}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3">Pro Tips</h4>
                <ul className="space-y-2">
                  {selectedSpot.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Get Directions
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Add to Itinerary
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
