"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, Plus, Minus, Trash2, Edit, Download, Share2, 
  Sun, Cloud, CloudRain, Snow, Wind, Thermometer,
  Calendar, MapPin, Clock, Users, Plane, Car, Train,
  Shirt, Camera, Phone, Laptop, Book, Heart
} from "lucide-react";

interface PackingItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  packed: boolean;
  essential: boolean;
  weatherDependent: boolean;
}

interface TripDetails {
  destination: string;
  duration: number;
  season: string;
  weather: string;
  activities: string[];
  accommodation: string;
  transport: string;
}

export default function PackingListGenerator() {
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    destination: "",
    duration: 7,
    season: "summer",
    weather: "warm",
    activities: [],
    accommodation: "hotel",
    transport: "plane"
  });

  const [packingList, setPackingList] = useState<PackingItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", category: "clothing" });

  const categories = [
    { id: "clothing", name: "Clothing", icon: Shirt },
    { id: "shoes", name: "Shoes", icon: Heart },
    { id: "electronics", name: "Electronics", icon: Phone },
    { id: "toiletries", name: "Toiletries", icon: Heart },
    { id: "documents", name: "Documents", icon: Book },
    { id: "accessories", name: "Accessories", icon: Camera },
    { id: "other", name: "Other", icon: Plus }
  ];

  const weatherIcons = {
    sunny: Sun,
    cloudy: Cloud,
    rainy: CloudRain,
    snowy: Snow,
    windy: Wind
  };

  const generatePackingList = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const baseItems: PackingItem[] = [
      // Clothing
      { id: "1", name: "T-shirts", category: "clothing", quantity: tripDetails.duration, packed: false, essential: true, weatherDependent: true },
      { id: "2", name: "Pants/Jeans", category: "clothing", quantity: Math.ceil(tripDetails.duration / 2), packed: false, essential: true, weatherDependent: true },
      { id: "3", name: "Underwear", category: "clothing", quantity: tripDetails.duration + 2, packed: false, essential: true, weatherDependent: false },
      { id: "4", name: "Socks", category: "clothing", quantity: tripDetails.duration + 2, packed: false, essential: true, weatherDependent: false },
      
      // Shoes
      { id: "5", name: "Walking shoes", category: "shoes", quantity: 1, packed: false, essential: true, weatherDependent: false },
      { id: "6", name: "Dress shoes", category: "shoes", quantity: 1, packed: false, essential: false, weatherDependent: false },
      
      // Electronics
      { id: "7", name: "Phone charger", category: "electronics", quantity: 1, packed: false, essential: true, weatherDependent: false },
      { id: "8", name: "Power bank", category: "electronics", quantity: 1, packed: false, essential: true, weatherDependent: false },
      { id: "9", name: "Camera", category: "electronics", quantity: 1, packed: false, essential: false, weatherDependent: false },
      
      // Toiletries
      { id: "10", name: "Toothbrush", category: "toiletries", quantity: 1, packed: false, essential: true, weatherDependent: false },
      { id: "11", name: "Toothpaste", category: "toiletries", quantity: 1, packed: false, essential: true, weatherDependent: false },
      { id: "12", name: "Shampoo", category: "toiletries", quantity: 1, packed: false, essential: true, weatherDependent: false },
      
      // Documents
      { id: "13", name: "Passport", category: "documents", quantity: 1, packed: false, essential: true, weatherDependent: false },
      { id: "14", name: "Travel insurance", category: "documents", quantity: 1, packed: false, essential: true, weatherDependent: false },
      { id: "15", name: "Flight tickets", category: "documents", quantity: 1, packed: false, essential: true, weatherDependent: false },
    ];

    // Add weather-specific items
    if (tripDetails.weather === "cold" || tripDetails.season === "winter") {
      baseItems.push(
        { id: "16", name: "Winter jacket", category: "clothing", quantity: 1, packed: false, essential: true, weatherDependent: true },
        { id: "17", name: "Warm hat", category: "accessories", quantity: 1, packed: false, essential: true, weatherDependent: true },
        { id: "18", name: "Gloves", category: "accessories", quantity: 1, packed: false, essential: true, weatherDependent: true }
      );
    }

    if (tripDetails.weather === "hot" || tripDetails.season === "summer") {
      baseItems.push(
        { id: "19", name: "Sunglasses", category: "accessories", quantity: 1, packed: false, essential: true, weatherDependent: true },
        { id: "20", name: "Sunscreen", category: "toiletries", quantity: 1, packed: false, essential: true, weatherDependent: true },
        { id: "21", name: "Hat", category: "accessories", quantity: 1, packed: false, essential: true, weatherDependent: true }
      );
    }

    // Add activity-specific items
    if (tripDetails.activities.includes("hiking")) {
      baseItems.push(
        { id: "22", name: "Hiking boots", category: "shoes", quantity: 1, packed: false, essential: true, weatherDependent: false },
        { id: "23", name: "Backpack", category: "accessories", quantity: 1, packed: false, essential: true, weatherDependent: false }
      );
    }

    if (tripDetails.activities.includes("swimming")) {
      baseItems.push(
        { id: "24", name: "Swimsuit", category: "clothing", quantity: 1, packed: false, essential: true, weatherDependent: false },
        { id: "25", name: "Towel", category: "accessories", quantity: 1, packed: false, essential: true, weatherDependent: false }
      );
    }

    setPackingList(baseItems);
    setIsGenerating(false);
  };

  const togglePacked = (id: string) => {
    setPackingList(prev => prev.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    ));
  };

  const updateQuantity = (id: string, change: number) => {
    setPackingList(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ));
  };

  const removeItem = (id: string) => {
    setPackingList(prev => prev.filter(item => item.id !== id));
  };

  const addCustomItem = () => {
    if (!newItem.name.trim()) return;
    
    const item: PackingItem = {
      id: Date.now().toString(),
      name: newItem.name,
      category: newItem.category,
      quantity: 1,
      packed: false,
      essential: false,
      weatherDependent: false
    };
    
    setPackingList(prev => [...prev, item]);
    setNewItem({ name: "", category: "clothing" });
    setShowAddItem(false);
  };

  const groupedItems = packingList.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, PackingItem[]>);

  const packedCount = packingList.filter(item => item.packed).length;
  const totalCount = packingList.length;
  const progress = totalCount > 0 ? (packedCount / totalCount) * 100 : 0;

  return (
    <div className="bg-night-800/60 rounded-xl border border-white/10 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-neon-purple/20 rounded-lg">
          <Laptop className="text-neon-purple" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold">AI Packing List Generator</h3>
          <p className="text-white/70 text-sm">Smart packing suggestions based on your trip</p>
        </div>
      </div>

      {/* Trip Details Form */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-4">Trip Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Destination</label>
            <input
              type="text"
              value={tripDetails.destination}
              onChange={(e) => setTripDetails(prev => ({ ...prev, destination: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-neon-cyan focus:outline-none"
              placeholder="e.g., New Delhi, India"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Duration (days)</label>
            <input
              type="number"
              value={tripDetails.duration}
              onChange={(e) => setTripDetails(prev => ({ ...prev, duration: parseInt(e.target.value) || 1 }))}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-neon-cyan focus:outline-none"
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Season</label>
            <select
              value={tripDetails.season}
              onChange={(e) => setTripDetails(prev => ({ ...prev, season: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-neon-cyan focus:outline-none"
            >
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="autumn">Autumn</option>
              <option value="winter">Winter</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Weather</label>
            <select
              value={tripDetails.weather}
              onChange={(e) => setTripDetails(prev => ({ ...prev, weather: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-neon-cyan focus:outline-none"
            >
              <option value="hot">Hot</option>
              <option value="warm">Warm</option>
              <option value="mild">Mild</option>
              <option value="cold">Cold</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Activities</label>
            <select
              multiple
              value={tripDetails.activities}
              onChange={(e) => {
                const selected = Array.from(e.target.selectedOptions, option => option.value);
                setTripDetails(prev => ({ ...prev, activities: selected }));
              }}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-neon-cyan focus:outline-none"
            >
              <option value="hiking">Hiking</option>
              <option value="swimming">Swimming</option>
              <option value="sightseeing">Sightseeing</option>
              <option value="business">Business</option>
              <option value="beach">Beach</option>
              <option value="city">City Tour</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">Transport</label>
            <select
              value={tripDetails.transport}
              onChange={(e) => setTripDetails(prev => ({ ...prev, transport: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-neon-cyan focus:outline-none"
            >
              <option value="plane">Plane</option>
              <option value="car">Car</option>
              <option value="train">Train</option>
              <option value="bus">Bus</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={generatePackingList}
          disabled={isGenerating}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-neon-purple to-neon-cyan text-night-900 font-semibold rounded-lg shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? "Generating..." : "Generate Packing List"}
        </button>
      </div>

      {/* Packing Progress */}
      {packingList.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold">Packing Progress</h4>
            <span className="text-sm text-white/70">{packedCount}/{totalCount} items packed</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-neon-purple to-neon-cyan h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Packing List */}
      {packingList.length > 0 && (
        <div className="space-y-6">
          {categories.map(category => {
            const items = groupedItems[category.id] || [];
            if (items.length === 0) return null;
            
            return (
              <div key={category.id}>
                <div className="flex items-center gap-2 mb-3">
                  <category.icon size={20} className="text-neon-cyan" />
                  <h5 className="text-lg font-semibold">{category.name}</h5>
                  <span className="text-sm text-white/70">({items.length})</span>
                </div>
                
                <div className="space-y-2">
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        item.packed 
                          ? "bg-green-500/10 border-green-500/30" 
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <button
                        onClick={() => togglePacked(item.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          item.packed 
                            ? "bg-green-500 border-green-500" 
                            : "border-white/30 hover:border-white/60"
                        }`}
                      >
                        {item.packed && <Check size={12} className="text-white" />}
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${item.packed ? "line-through text-white/60" : ""}`}>
                            {item.name}
                          </span>
                          {item.essential && (
                            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                              Essential
                            </span>
                          )}
                          {item.weatherDependent && (
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                              Weather
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded hover:bg-white/10 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded hover:bg-white/10 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 rounded hover:bg-red-500/20 transition-colors"
                        >
                          <Trash2 size={16} className="text-red-400" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Custom Item */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <button
          onClick={() => setShowAddItem(true)}
          className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Plus size={18} />
          Add Custom Item
        </button>
        
        <AnimatePresence>
          {showAddItem && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-neon-cyan focus:outline-none"
                  placeholder="Item name"
                />
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-neon-cyan focus:outline-none"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                <button
                  onClick={addCustomItem}
                  className="px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-cyan text-night-900 font-semibold rounded-lg"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddItem(false)}
                  className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      {packingList.length > 0 && (
        <div className="mt-6 flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
            <Download size={18} />
            Export List
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
            <Share2 size={18} />
            Share List
          </button>
        </div>
      )}
    </div>
  );
}
