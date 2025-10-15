"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wand2, MapPin, Clock, DollarSign, Star, Heart, 
  Share2, Download, RefreshCw, Sparkles, Plane,
  Hotel, Utensils, Camera, Mountain, Car, Users
} from "lucide-react";

interface SurpriseItinerary {
  id: string;
  title: string;
  destination: string;
  duration: number;
  budget: string;
  theme: string;
  description: string;
  days: {
    day: number;
    activities: {
      time: string;
      activity: string;
      type: "hotel" | "restaurant" | "activity" | "transport";
      location: string;
      cost: number;
      duration: string;
    }[];
  }[];
  totalCost: number;
  highlights: string[];
  image: string;
}

export default function SurprisePage() {
  const [itinerary, setItinerary] = useState<SurpriseItinerary | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedItineraries, setSavedItineraries] = useState<SurpriseItinerary[]>([]);

  const surpriseThemes = [
    "Adventure", "Cultural", "Foodie", "Relaxation", "Photography", 
    "Nightlife", "Nature", "Historical", "Art", "Shopping"
  ];

  const destinations = [
    "New Delhi, India", "Mumbai, India", "Goa, India", "Jaipur, India",
    "Bangkok, Thailand", "Tokyo, Japan", "Paris, France", "New York, USA"
  ];

  const generateSurpriseItinerary = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI processing with realistic delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const randomTheme = surpriseThemes[Math.floor(Math.random() * surpriseThemes.length)];
      const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
      const randomDuration = Math.floor(Math.random() * 5) + 3; // 3-7 days
    
    const mockItinerary: SurpriseItinerary = {
      id: Date.now().toString(),
      title: `${randomTheme} Adventure in ${randomDestination.split(',')[0]}`,
      destination: randomDestination,
      duration: randomDuration,
      budget: ["Budget", "Mid-range", "Luxury"][Math.floor(Math.random() * 3)],
      theme: randomTheme,
      description: `An exciting ${randomTheme.toLowerCase()} journey through ${randomDestination} with carefully curated experiences that will surprise and delight you.`,
      image: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000000)}?q=80&w=800&auto=format&fit=crop`,
      days: Array.from({ length: randomDuration }, (_, dayIndex) => ({
        day: dayIndex + 1,
        activities: [
          {
            time: "09:00",
            activity: `Morning ${randomTheme.toLowerCase()} experience`,
            type: "activity",
            location: `${randomDestination.split(',')[0]} City Center`,
            cost: Math.floor(Math.random() * 50) + 20,
            duration: "2-3 hours"
          },
          {
            time: "12:00",
            activity: "Local cuisine discovery",
            type: "restaurant",
            location: "Historic District",
            cost: Math.floor(Math.random() * 30) + 15,
            duration: "1 hour"
          },
          {
            time: "14:00",
            activity: "Cultural exploration",
            type: "activity",
            location: "Museum Quarter",
            cost: Math.floor(Math.random() * 25) + 10,
            duration: "2 hours"
          },
          {
            time: "18:00",
            activity: "Evening relaxation",
            type: "restaurant",
            location: "Riverside",
            cost: Math.floor(Math.random() * 40) + 20,
            duration: "1.5 hours"
          }
        ]
      })),
      totalCost: 0,
      highlights: [
        `Discover hidden ${randomTheme.toLowerCase()} gems`,
        "Meet local artisans and creators",
        "Taste authentic regional cuisine",
        "Capture stunning photo opportunities",
        "Experience local traditions"
      ]
    };

    // Calculate total cost
    mockItinerary.totalCost = mockItinerary.days.reduce((total, day) => 
      total + day.activities.reduce((dayTotal, activity) => dayTotal + activity.cost, 0), 0
    );

      setItinerary(mockItinerary);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setIsGenerating(false);
      // You could add a toast notification here
    }
  };

  const saveItinerary = () => {
    if (itinerary) {
      setSavedItineraries(prev => [itinerary, ...prev]);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "hotel": return Hotel;
      case "restaurant": return Utensils;
      case "activity": return Camera;
      case "transport": return Car;
      default: return MapPin;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Surprise Me!</h1>
              <p className="text-gray-600 text-sm">AI-generated random itineraries for spontaneous adventures</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg">
                <Sparkles className="text-neon-purple" size={16} />
                <span className="text-sm">AI Powered</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Generator Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-night-800/60 rounded-2xl p-8 border border-white/10"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full flex items-center justify-center mx-auto mb-6">
              <Wand2 size={40} className="text-gray-800" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Ready for a Surprise?</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Let our AI create a completely random, personalized itinerary for you. 
              No planning needed - just pure adventure!
            </p>
            
            <button
              onClick={generateSurpriseItinerary}
              disabled={isGenerating}
              className="px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-cyan text-night-900 font-bold text-lg rounded-xl shadow-glow hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center gap-3">
                  <RefreshCw className="animate-spin" size={24} />
                  <span>Creating Magic...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles size={24} />
                  <span>Surprise Me!</span>
                </div>
              )}
            </button>
          </motion.div>
        </div>

        {/* Generated Itinerary */}
        <AnimatePresence>
          {itinerary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-night-800/60 rounded-2xl border border-white/10 overflow-hidden"
            >
              {/* Itinerary Header */}
              <div className="relative p-8">
                <img 
                  src={itinerary.image} 
                  alt={itinerary.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{itinerary.title}</h3>
                      <p className="text-gray-600 text-lg">{itinerary.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={saveItinerary}
                        className="p-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
                      >
                        <Heart size={20} />
                      </button>
                      <button className="p-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
                        <Share2 size={20} />
                      </button>
                      <button className="p-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
                        <Download size={20} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-cyan">{itinerary.duration}</div>
                      <div className="text-sm text-gray-600">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">${itinerary.totalCost}</div>
                      <div className="text-sm text-gray-600">Total Cost</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{itinerary.budget}</div>
                      <div className="text-sm text-gray-600">Budget Level</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">{itinerary.theme}</div>
                      <div className="text-sm text-gray-600">Theme</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="p-8 border-t border-white/10">
                <h4 className="text-xl font-bold mb-4">What Makes This Special</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {itinerary.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <Sparkles size={16} className="text-neon-purple" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Itinerary */}
              <div className="p-8 border-t border-white/10">
                <h4 className="text-xl font-bold mb-6">Daily Itinerary</h4>
                <div className="space-y-6">
                  {itinerary.days.map((day) => (
                    <div key={day.day} className="bg-white/5 rounded-xl p-6">
                      <h5 className="text-lg font-semibold mb-4">Day {day.day}</h5>
                      <div className="space-y-4">
                        {day.activities.map((activity, index) => {
                          const Icon = getActivityIcon(activity.type);
                          return (
                            <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-neon-purple/20 rounded-lg flex items-center justify-center">
                                  <Icon size={20} className="text-neon-purple" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium text-neon-cyan">{activity.time}</span>
                                  <span className="text-sm font-semibold">{activity.activity}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {activity.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {activity.duration}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <DollarSign size={14} />
                                    ${activity.cost}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Saved Itineraries */}
        {savedItineraries.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Your Saved Surprises</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedItineraries.map((saved) => (
                <motion.div
                  key={saved.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-night-800/60 rounded-xl border border-white/10 overflow-hidden hover:border-neon-cyan/30 transition-all"
                >
                  <img src={saved.image} alt={saved.title} className="w-full h-32 object-cover" />
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">{saved.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{saved.destination}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neon-cyan">{saved.duration} days</span>
                      <span className="text-green-400">${saved.totalCost}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


