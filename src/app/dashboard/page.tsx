"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, MapPin, Plane, Hotel, Utensils, Camera, Music, 
  Heart, Share2, Download, Upload, Settings, Bell, Shield,
  DollarSign, Clock, Star, Users, Globe, Navigation, Car,
  FileText, Image, Play, Plus, Minus, Edit, Trash2, Eye,
  ChevronRight, ChevronDown, Search, Filter, SortAsc,
  TrendingUp, BarChart3, PieChart, Activity, Zap
} from "lucide-react";

interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "current" | "completed";
  budget: number;
  spent: number;
  image: string;
  activities: number;
  hotels: number;
  restaurants: number;
}

interface SavedPlace {
  id: string;
  name: string;
  type: "hotel" | "restaurant" | "activity";
  location: string;
  image: string;
  rating: number;
  price: number;
  savedAt: string;
}

interface Document {
  id: string;
  name: string;
  type: "passport" | "visa" | "insurance" | "ticket" | "other";
  uploadDate: string;
  expiryDate?: string;
  size: string;
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showNewTrip, setShowNewTrip] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  // Mock data
  useEffect(() => {
    setTrips([
      {
        id: "1",
        title: "Delhi Heritage Tour",
        destination: "New Delhi, India",
        startDate: "2024-02-15",
        endDate: "2024-02-20",
        status: "upcoming",
        budget: 1500,
        spent: 0,
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1400&auto=format&fit=crop",
        activities: 8,
        hotels: 1,
        restaurants: 12
      },
      {
        id: "2",
        title: "Mumbai Business Trip",
        destination: "Mumbai, India",
        startDate: "2024-01-10",
        endDate: "2024-01-12",
        status: "completed",
        budget: 800,
        spent: 750,
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1400&auto=format&fit=crop",
        activities: 3,
        hotels: 1,
        restaurants: 6
      }
    ]);

    setSavedPlaces([
      {
        id: "1",
        name: "The Grand Palace Hotel",
        type: "hotel",
        location: "Connaught Place, New Delhi",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1400&auto=format&fit=crop",
        rating: 4.8,
        price: 250,
        savedAt: "2024-01-15"
      },
      {
        id: "2",
        name: "Karim's Restaurant",
        type: "restaurant",
        location: "Jama Masjid, Old Delhi",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=1400&auto=format&fit=crop",
        rating: 4.7,
        price: 25,
        savedAt: "2024-01-10"
      }
    ]);

    setDocuments([
      {
        id: "1",
        name: "Passport.pdf",
        type: "passport",
        uploadDate: "2024-01-01",
        expiryDate: "2029-01-01",
        size: "2.3 MB"
      },
      {
        id: "2",
        name: "Travel Insurance.pdf",
        type: "insurance",
        uploadDate: "2024-01-15",
        expiryDate: "2024-12-31",
        size: "1.8 MB"
      }
    ]);
  }, []);

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "trips", label: "My Trips", icon: Plane },
    { id: "saved", label: "Saved Places", icon: Heart },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const TripCard = ({ trip }: { trip: Trip }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-night-800/60 rounded-xl border border-white/10 overflow-hidden hover:border-neon-cyan/30 transition-all"
    >
      <div className="relative">
        <img src={trip.image} alt={trip.title} className="w-full h-48 object-cover" />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            trip.status === "upcoming" ? "bg-blue-500/20 text-blue-400" :
            trip.status === "current" ? "bg-green-500/20 text-green-400" :
            "bg-gray-500/20 text-gray-400"
          }`}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
            <Share2 size={16} className="text-white" />
          </button>
          <button className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
            <Edit size={16} className="text-white" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{trip.title}</h3>
        <div className="flex items-center gap-1 text-white/70 text-sm mb-3">
          <MapPin size={14} />
          <span>{trip.destination}</span>
        </div>
        
        <div className="flex items-center gap-1 text-white/70 text-sm mb-3">
          <Calendar size={14} />
          <span>{trip.startDate} - {trip.endDate}</span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Budget</span>
            <span className="font-semibold">${trip.budget}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Spent</span>
            <span className="font-semibold">${trip.spent}</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-neon-purple to-neon-cyan h-2 rounded-full transition-all"
              style={{ width: `${(trip.spent / trip.budget) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="text-white/70">Activities</div>
            <div className="font-semibold">{trip.activities}</div>
          </div>
          <div>
            <div className="text-white/70">Hotels</div>
            <div className="font-semibold">{trip.hotels}</div>
          </div>
          <div>
            <div className="text-white/70">Restaurants</div>
            <div className="font-semibold">{trip.restaurants}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const SavedPlaceCard = ({ place }: { place: SavedPlace }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-night-800/60 rounded-xl border border-white/10 overflow-hidden hover:border-neon-cyan/30 transition-all"
    >
      <div className="relative">
        <img src={place.image} alt={place.name} className="w-full h-32 object-cover" />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            place.type === "hotel" ? "bg-blue-500/20 text-blue-400" :
            place.type === "restaurant" ? "bg-green-500/20 text-green-400" :
            "bg-purple-500/20 text-purple-400"
          }`}>
            {place.type.charAt(0).toUpperCase() + place.type.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{place.name}</h3>
        <div className="flex items-center gap-1 text-white/70 text-sm mb-2">
          <MapPin size={14} />
          <span>{place.location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm">{place.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign size={16} className="text-green-400" />
            <span className="font-semibold">${place.price}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="flex-1 bg-gradient-to-r from-neon-purple to-neon-cyan text-night-900 font-semibold py-2 px-4 rounded-lg text-sm">
            View Details
          </button>
          <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const DocumentCard = ({ doc }: { doc: Document }) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-night-800/60 rounded-xl border border-white/10 p-4 hover:border-neon-cyan/30 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white/5 rounded-lg">
          <FileText size={24} className="text-neon-cyan" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{doc.name}</h3>
          <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
            <span className="capitalize">{doc.type}</span>
            <span>•</span>
            <span>{doc.size}</span>
            <span>•</span>
            <span>Uploaded {doc.uploadDate}</span>
          </div>
          {doc.expiryDate && (
            <div className="text-sm text-yellow-400">
              Expires: {doc.expiryDate}
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
            <Eye size={16} />
          </button>
          <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
            <Download size={16} />
          </button>
          <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-night-800/60 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Plane className="text-neon-cyan" size={24} />
                  <span className="text-white/70">Total Trips</span>
                </div>
                <div className="text-3xl font-bold">{trips.length}</div>
              </div>
              
              <div className="bg-night-800/60 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="text-red-400" size={24} />
                  <span className="text-white/70">Saved Places</span>
                </div>
                <div className="text-3xl font-bold">{savedPlaces.length}</div>
              </div>
              
              <div className="bg-night-800/60 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="text-green-400" size={24} />
                  <span className="text-white/70">Total Spent</span>
                </div>
                <div className="text-3xl font-bold">
                  ${trips.reduce((sum, trip) => sum + trip.spent, 0)}
                </div>
              </div>
              
              <div className="bg-night-800/60 rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="text-purple-400" size={24} />
                  <span className="text-white/70">Documents</span>
                </div>
                <div className="text-3xl font-bold">{documents.length}</div>
              </div>
            </div>

            {/* Recent Trips */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recent Trips</h2>
                <button className="text-neon-cyan hover:text-neon-purple transition-colors">
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.slice(0, 3).map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-gradient-to-r from-neon-purple/10 to-neon-cyan/10 rounded-xl p-6 border border-neon-purple/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-neon-cyan" size={24} />
                <h3 className="text-xl font-bold">AI Recommendations</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-neon-cyan rounded-full"></div>
                  <span>Based on your preferences, consider visiting Jaipur for your next trip</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-neon-purple rounded-full"></div>
                  <span>You might enjoy the street food tour in Old Delhi</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>Consider booking your hotel 2 weeks in advance for better rates</span>
                </div>
              </div>
            </div>
          </div>
        );

      case "trips":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Trips</h2>
              <button
                onClick={() => setShowNewTrip(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-cyan text-night-900 font-semibold rounded-lg shadow-glow"
              >
                <Plus size={18} />
                New Trip
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </div>
        );

      case "saved":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Saved Places</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
                  <Filter size={18} />
                </button>
                <button className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
                  <SortAsc size={18} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPlaces.map((place) => (
                <SavedPlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        );

      case "documents":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Documents</h2>
              <button
                onClick={() => setShowDocumentUpload(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-cyan text-night-900 font-semibold rounded-lg shadow-glow"
              >
                <Upload size={18} />
                Upload Document
              </button>
            </div>
            
            <div className="space-y-4">
              {documents.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Travel Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-night-800/60 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Hotels</span>
                    <span>$450</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Food</span>
                    <span>$200</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "27%" }}></div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Activities</span>
                    <span>$100</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "13%" }}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-night-800/60 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Travel Patterns</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-neon-cyan rounded-full"></div>
                    <span>Most visited: New Delhi (3 trips)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-neon-purple rounded-full"></div>
                    <span>Average trip duration: 5 days</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span>Preferred season: Winter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Settings</h2>
            
            <div className="space-y-6">
              <div className="bg-night-800/60 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Travel Style</label>
                    <select className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg">
                      <option>Adventure</option>
                      <option>Luxury</option>
                      <option>Budget</option>
                      <option>Cultural</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range</label>
                    <select className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg">
                      <option>$0-50 per day</option>
                      <option>$50-150 per day</option>
                      <option>$150+ per day</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-night-800/60 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span>Real-time weather alerts</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span>Deal notifications</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" />
                    <span>Marketing emails</span>
                  </label>
                </div>
              </div>
              
              <div className="bg-night-800/60 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-4">Privacy & Security</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Emergency contact sharing</span>
                    <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                      Enabled
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Location tracking</span>
                    <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                      Enabled
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-night-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-night-900/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-white/70 text-sm">Welcome back! Here's your travel overview</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10">
                <Bell size={18} />
              </button>
              <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10">
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <div className="bg-night-800/60 rounded-xl p-4 border border-white/10">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? "bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <tab.icon size={20} />
                    <span>{tab.label}</span>
                    {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
