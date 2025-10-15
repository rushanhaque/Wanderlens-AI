"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, DollarSign, Star, Navigation, Car, Wifi, Shield, Zap } from "lucide-react";

interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  distance: number; // in km
  price: number; // per hour
  rating: number;
  availability: "available" | "limited" | "full";
  features: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
}

interface ParkingFinderProps {
  className?: string;
}

export default function ParkingFinder({ className = "" }: ParkingFinderProps) {
  const [location, setLocation] = useState("");
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  const mockParkingSpots: ParkingSpot[] = [
    {
      id: "1",
      name: "Downtown Central Parking",
      address: "123 Main Street, Downtown",
      distance: 0.2,
      price: 3.50,
      rating: 4.5,
      availability: "available",
      features: ["24/7 Access", "Security Cameras", "EV Charging", "Covered"],
      coordinates: { lat: 40.7128, lng: -74.0060 },
      image: "/api/placeholder/300/200"
    },
    {
      id: "2",
      name: "City Mall Parking",
      address: "456 Commerce Ave, Shopping District",
      distance: 0.8,
      price: 2.00,
      rating: 4.2,
      availability: "limited",
      features: ["Mall Access", "WiFi", "Valet Service"],
      coordinates: { lat: 40.7589, lng: -73.9851 },
      image: "/api/placeholder/300/200"
    },
    {
      id: "3",
      name: "Airport Express Parking",
      address: "789 Airport Blvd, Terminal Area",
      distance: 1.2,
      price: 4.00,
      rating: 4.7,
      availability: "available",
      features: ["24/7 Access", "Shuttle Service", "Long-term", "Security"],
      coordinates: { lat: 40.6892, lng: -74.1745 },
      image: "/api/placeholder/300/200"
    },
    {
      id: "4",
      name: "Street Parking Zone A",
      address: "Various locations in Historic District",
      distance: 0.5,
      price: 1.50,
      rating: 3.8,
      availability: "limited",
      features: ["Metered", "2-hour limit"],
      coordinates: { lat: 40.7505, lng: -73.9934 },
      image: "/api/placeholder/300/200"
    }
  ];

  const searchParking = async () => {
    if (!location.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Filter spots based on location (mock logic)
      const filteredSpots = mockParkingSpots.filter(spot => 
        spot.name.toLowerCase().includes(location.toLowerCase()) ||
        spot.address.toLowerCase().includes(location.toLowerCase())
      );
      
      setParkingSpots(filteredSpots.length > 0 ? filteredSpots : mockParkingSpots);
    } catch (err) {
      setError("Failed to find parking spots");
      console.error("Parking search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available": return "text-green-600 bg-green-100";
      case "limited": return "text-yellow-600 bg-yellow-100";
      case "full": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case "24/7 access": return <Clock className="w-4 h-4" />;
      case "security cameras": return <Shield className="w-4 h-4" />;
      case "ev charging": return <Zap className="w-4 h-4" />;
      case "wifi": return <Wifi className="w-4 h-4" />;
      default: return <Car className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-100 rounded-xl p-6 ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
          <Car className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Parking Finder</h3>
          <p className="text-gray-600 text-sm">Find the best parking spots near you</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location or landmark..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
              onKeyPress={(e) => e.key === 'Enter' && searchParking()}
            />
          </div>
          <motion.button
            onClick={searchParking}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </motion.button>
        </div>
      </div>

      {/* Results */}
      {error && (
        <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full"
          />
          <span className="ml-3 text-gray-600">Finding parking spots...</span>
        </div>
      )}

      {parkingSpots.length > 0 && !loading && (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            Found {parkingSpots.length} parking spots
          </h4>
          
          {parkingSpots.map((spot) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2, scale: 1.02 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all cursor-pointer"
              onClick={() => setSelectedSpot(spot)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h5 className="text-lg font-bold text-gray-800 mb-1">{spot.name}</h5>
                  <p className="text-gray-600 text-sm mb-2">{spot.address}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Navigation className="w-4 h-4" />
                      {spot.distance} km
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ${spot.price}/hr
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {spot.rating}
                    </div>
                  </div>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(spot.availability)}`}>
                  {spot.availability}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {spot.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-600">
                    {getFeatureIcon(feature)}
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Selected Spot Details */}
      {selectedSpot && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSpot(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">{selectedSpot.name}</h3>
              <button
                onClick={() => setSelectedSpot(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 mb-2">{selectedSpot.address}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Navigation className="w-4 h-4" />
                    {selectedSpot.distance} km away
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    ${selectedSpot.price} per hour
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSpot.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-1 px-3 py-1 bg-blue-100 rounded-lg text-sm text-blue-700">
                      {getFeatureIcon(feature)}
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Get Directions
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Reserve Spot
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
