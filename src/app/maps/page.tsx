"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, Navigation, Car, Plane, Train, Bus, 
  Clock, DollarSign, Star, Heart, Share2, 
  Search, Filter, Layers, Route, AlertCircle,
  Wifi, Battery, Signal, Eye, EyeOff
} from "lucide-react";

interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  type: "hotel" | "restaurant" | "activity" | "transport";
  rating: number;
  price?: number;
  distance?: string;
  duration?: string;
}

interface RouteInfo {
  distance: string;
  duration: string;
  cost: string;
  transport: string;
  steps: string[];
}

export default function MapsPage() {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [mapLayers, setMapLayers] = useState({
    traffic: true,
    transit: true,
    places: true,
    weather: false
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [transportMode, setTransportMode] = useState("walking");

  // Mock locations data
  const locations: Location[] = [
    {
      id: "1",
      name: "The Grand Palace Hotel",
      address: "Connaught Place, New Delhi",
      coordinates: { lat: 28.6315, lng: 77.2167 },
      type: "hotel",
      rating: 4.8,
      price: 250,
      distance: "0.5 km"
    },
    {
      id: "2",
      name: "Karim's Restaurant",
      address: "Jama Masjid, Old Delhi",
      coordinates: { lat: 28.6508, lng: 77.2314 },
      type: "restaurant",
      rating: 4.7,
      price: 25,
      distance: "1.8 km"
    },
    {
      id: "3",
      name: "Red Fort",
      address: "Netaji Subhash Marg, Old Delhi",
      coordinates: { lat: 28.6562, lng: 77.2410 },
      type: "activity",
      rating: 4.5,
      price: 25,
      distance: "2.1 km"
    },
    {
      id: "4",
      name: "Indira Gandhi Airport",
      address: "New Delhi",
      coordinates: { lat: 28.5562, lng: 77.1000 },
      type: "transport",
      rating: 4.2,
      distance: "15.2 km"
    }
  ];

  // Mock route data
  const mockRoute: RouteInfo = {
    distance: "2.3 km",
    duration: "28 min",
    cost: "$3.50",
    transport: "Metro + Walking",
    steps: [
      "Walk to Rajiv Chowk Metro Station (5 min)",
      "Take Blue Line towards Dwarka (12 min)",
      "Transfer to Yellow Line at Central Secretariat (3 min)",
      "Take Yellow Line towards HUDA City Centre (5 min)",
      "Walk to destination (3 min)"
    ]
  };

  useEffect(() => {
    // Simulate getting current location
    setCurrentLocation({ lat: 28.6139, lng: 77.2090 }); // Delhi coordinates
  }, []);

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "hotel": return "🏨";
      case "restaurant": return "🍽️";
      case "activity": return "🎯";
      case "transport": return "🚇";
      default: return "📍";
    }
  };

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case "walking": return "🚶";
      case "driving": return "🚗";
      case "transit": return "🚇";
      case "cycling": return "🚴";
      default: return "🚶";
    }
  };

  return (
    <div className="min-h-screen bg-night-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-night-900/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Maps & Navigation</h1>
              <p className="text-white/70 text-sm">Real-time navigation and location services</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg">
                <Signal size={16} className="text-green-400" />
                <span className="text-sm">GPS Active</span>
              </div>
              <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-night-800/60 rounded-xl p-4 border border-white/10">
              <h3 className="font-semibold mb-4">Search & Navigation</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-neon-cyan focus:outline-none"
                    placeholder="Search places..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Transport Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["walking", "driving", "transit", "cycling"].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setTransportMode(mode)}
                        className={`p-2 rounded-lg text-sm transition-all ${
                          transportMode === mode
                            ? "bg-neon-purple text-white"
                            : "bg-white/5 border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>{getTransportIcon(mode)}</span>
                          <span className="capitalize">{mode}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Map Layers */}
            <div className="bg-night-800/60 rounded-xl p-4 border border-white/10">
              <h3 className="font-semibold mb-4">Map Layers</h3>
              <div className="space-y-3">
                {Object.entries(mapLayers).map(([layer, enabled]) => (
                  <label key={layer} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={(e) => setMapLayers(prev => ({ ...prev, [layer]: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm capitalize">{layer}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Nearby Places */}
            <div className="bg-night-800/60 rounded-xl p-4 border border-white/10">
              <h3 className="font-semibold mb-4">Nearby Places</h3>
              <div className="space-y-3">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedLocation?.id === location.id
                        ? "bg-neon-purple/20 border border-neon-purple/30"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg">{getLocationIcon(location.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{location.name}</h4>
                        <p className="text-xs text-white/70">{location.address}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-xs">{location.rating}</span>
                          </div>
                          {location.price && (
                            <div className="flex items-center gap-1">
                              <DollarSign size={12} className="text-green-400" />
                              <span className="text-xs">${location.price}</span>
                            </div>
                          )}
                          <span className="text-xs text-white/60">{location.distance}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Map Area */}
          <div className="lg:col-span-3">
            <div className="bg-night-800/60 rounded-xl border border-white/10 overflow-hidden">
              {/* Map Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Interactive Map</h3>
                    <p className="text-sm text-white/70">Delhi, India</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10">
                      <Layers size={18} />
                    </button>
                    <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="relative h-96 bg-gradient-to-br from-night-800 to-night-900">
                {/* Mock Map with locations */}
                <div className="absolute inset-0 p-8">
                  <div className="relative w-full h-full bg-night-700/50 rounded-lg border border-white/10">
                    {/* Current Location */}
                    {currentLocation && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 bg-neon-cyan rounded-full animate-pulse shadow-lg shadow-neon-cyan/50"></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-night-800 px-2 py-1 rounded text-xs whitespace-nowrap">
                          You are here
                        </div>
                      </div>
                    )}

                    {/* Location Markers */}
                    {locations.map((location, index) => (
                      <div
                        key={location.id}
                        className={`absolute cursor-pointer transition-all hover:scale-110 ${
                          selectedLocation?.id === location.id ? "scale-110" : ""
                        }`}
                        style={{
                          top: `${20 + (index * 15)}%`,
                          left: `${30 + (index * 10)}%`
                        }}
                        onClick={() => setSelectedLocation(location)}
                      >
                        <div className="text-2xl">{getLocationIcon(location.type)}</div>
                        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-night-800 px-2 py-1 rounded text-xs whitespace-nowrap border border-white/10">
                          {location.name}
                        </div>
                      </div>
                    ))}

                    {/* Route Line (mock) */}
                    {selectedLocation && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <path
                          d="M 50% 50% L 40% 30%"
                          stroke="#00E5FF"
                          strokeWidth="3"
                          strokeDasharray="5,5"
                          fill="none"
                          className="animate-pulse"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>

              {/* Route Information */}
              {selectedLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border-t border-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Route className="text-neon-cyan" size={20} />
                    <h4 className="font-semibold">Route to {selectedLocation.name}</h4>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-neon-cyan">{mockRoute.distance}</div>
                      <div className="text-xs text-white/70">Distance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{mockRoute.duration}</div>
                      <div className="text-xs text-white/70">Duration</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-400">{mockRoute.cost}</div>
                      <div className="text-xs text-white/70">Cost</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-white/70">Transport:</span>
                      <span className="font-medium">{mockRoute.transport}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-white/90">Directions:</div>
                      {mockRoute.steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-white/70">
                          <div className="w-5 h-5 bg-neon-purple/20 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5">
                            {index + 1}
                          </div>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-gradient-to-r from-neon-purple to-neon-cyan text-night-900 font-semibold py-2 px-4 rounded-lg">
                      Start Navigation
                    </button>
                    <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10">
                      <Share2 size={16} />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Real-time Updates */}
            <div className="mt-6 bg-gradient-to-r from-neon-purple/10 to-neon-cyan/10 rounded-xl p-4 border border-neon-purple/20">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="text-neon-cyan" size={20} />
                <h4 className="font-semibold">Real-time Updates</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Traffic: Light traffic on current route</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span>Weather: Sunny, 28°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Metro: All lines running on time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
