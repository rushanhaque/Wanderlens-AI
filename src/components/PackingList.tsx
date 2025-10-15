"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Luggage, Plus, Check, X, Edit, Trash2, 
  Sun, Cloud, CloudRain, 
  Plane, Car, Train, Ship,
  MapPin, Calendar, Users, Thermometer,
  Sparkles, Wand2
} from "lucide-react";

interface PackingItem {
  id: string;
  name: string;
  category: string;
  essential: boolean;
  packed: boolean;
  quantity: number;
  notes?: string;
}

interface PackingListProps {
  className?: string;
}

export default function PackingList({ className = "" }: PackingListProps) {
  const [items, setItems] = useState<PackingItem[]>([]);
  const [newItem, setNewItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("clothing");
  const [showAddItem, setShowAddItem] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tripDetails, setTripDetails] = useState({
    destination: "",
    duration: "",
    season: "summer",
    transport: "plane",
    travelers: 1,
    activities: [] as string[]
  });

  const categories = [
    { id: "clothing", name: "Clothing", icon: "👕" },
    { id: "toiletries", name: "Toiletries", icon: "🧴" },
    { id: "electronics", name: "Electronics", icon: "📱" },
    { id: "documents", name: "Documents", icon: "📄" },
    { id: "accessories", name: "Accessories", icon: "👜" },
    { id: "health", name: "Health & Safety", icon: "🏥" },
    { id: "entertainment", name: "Entertainment", icon: "🎮" },
    { id: "other", name: "Other", icon: "📦" }
  ];

  const seasons = [
    { id: "summer", name: "Summer", icon: Sun },
    { id: "winter", name: "Winter", icon: Cloud },
    { id: "spring", name: "Spring", icon: Cloud },
    { id: "fall", name: "Fall", icon: CloudRain }
  ];

  const transportTypes = [
    { id: "plane", name: "Plane", icon: Plane },
    { id: "car", name: "Car", icon: Car },
    { id: "train", name: "Train", icon: Train },
    { id: "ship", name: "Ship", icon: Ship }
  ];

  const activities = [
    "Beach", "Hiking", "City Tour", "Business", "Adventure", "Photography", 
    "Food Tour", "Shopping", "Cultural", "Relaxation", "Sports", "Nightlife"
  ];

  const generatePackingList = async () => {
    if (!tripDetails.destination || !tripDetails.duration) return;
    
    setIsGenerating(true);
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generatedItems: PackingItem[] = [];
      
      // Generate items based on trip details
      if (tripDetails.season === "summer") {
        generatedItems.push(
          { id: "1", name: "T-shirts", category: "clothing", essential: true, packed: false, quantity: 3 },
          { id: "2", name: "Shorts", category: "clothing", essential: true, packed: false, quantity: 2 },
          { id: "3", name: "Sunglasses", category: "accessories", essential: true, packed: false, quantity: 1 },
          { id: "4", name: "Sunscreen", category: "toiletries", essential: true, packed: false, quantity: 1 }
        );
      } else if (tripDetails.season === "winter") {
        generatedItems.push(
          { id: "1", name: "Warm jacket", category: "clothing", essential: true, packed: false, quantity: 1 },
          { id: "2", name: "Sweaters", category: "clothing", essential: true, packed: false, quantity: 2 },
          { id: "3", name: "Gloves", category: "accessories", essential: true, packed: false, quantity: 1 },
          { id: "4", name: "Thermal underwear", category: "clothing", essential: false, packed: false, quantity: 1 }
        );
      }
      
      // Add common items
      generatedItems.push(
        { id: "5", name: "Passport", category: "documents", essential: true, packed: false, quantity: 1 },
        { id: "6", name: "Phone charger", category: "electronics", essential: true, packed: false, quantity: 1 },
        { id: "7", name: "Toothbrush", category: "toiletries", essential: true, packed: false, quantity: 1 },
        { id: "8", name: "Underwear", category: "clothing", essential: true, packed: false, quantity: 5 },
        { id: "9", name: "Socks", category: "clothing", essential: true, packed: false, quantity: 5 },
        { id: "10", name: "Comfortable shoes", category: "accessories", essential: true, packed: false, quantity: 1 }
      );
      
      // Add activity-specific items
      if (tripDetails.activities.includes("Beach")) {
        generatedItems.push(
          { id: "11", name: "Swimsuit", category: "clothing", essential: true, packed: false, quantity: 1 },
          { id: "12", name: "Beach towel", category: "accessories", essential: true, packed: false, quantity: 1 }
        );
      }
      
      if (tripDetails.activities.includes("Hiking")) {
        generatedItems.push(
          { id: "13", name: "Hiking boots", category: "accessories", essential: true, packed: false, quantity: 1 },
          { id: "14", name: "Backpack", category: "accessories", essential: true, packed: false, quantity: 1 }
        );
      }
      
      setItems(generatedItems);
    } catch (error) {
      console.error("Error generating packing list:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    
    const item: PackingItem = {
      id: Date.now().toString(),
      name: newItem,
      category: selectedCategory,
      essential: false,
      packed: false,
      quantity: 1
    };
    
    setItems([...items, item]);
    setNewItem("");
    setShowAddItem(false);
  };

  const togglePacked = (itemId: string) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, packed: !item.packed } : item
    ));
  };

  const deleteItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const getItemsByCategory = (categoryId: string) => {
    return items.filter(item => item.category === categoryId);
  };

  const getPackedCount = () => {
    return items.filter(item => item.packed).length;
  };

  const getEssentialCount = () => {
    return items.filter(item => item.essential && !item.packed).length;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-100 rounded-xl p-6 ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
          <Luggage className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">AI Packing List</h3>
          <p className="text-gray-600 text-sm">Smart packing suggestions for your trip</p>
        </div>
      </div>

      {/* Trip Details */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Trip Details</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <input
              type="text"
              value={tripDetails.destination}
              onChange={(e) => setTripDetails({ ...tripDetails, destination: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              placeholder="Where are you going?"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
            <input
              type="text"
              value={tripDetails.duration}
              onChange={(e) => setTripDetails({ ...tripDetails, duration: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              placeholder="e.g., 7 days"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Travelers</label>
            <input
              type="number"
              value={tripDetails.travelers}
              onChange={(e) => setTripDetails({ ...tripDetails, travelers: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              min="1"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
            <div className="flex flex-wrap gap-2">
              {seasons.map((season) => {
                const Icon = season.icon;
                return (
                  <button
                    key={season.id}
                    onClick={() => setTripDetails({ ...tripDetails, season: season.id })}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all whitespace-nowrap ${
                      tripDetails.season === season.id
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {season.name}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transport</label>
            <div className="flex flex-wrap gap-2">
              {transportTypes.map((transport) => {
                const Icon = transport.icon;
                return (
                  <button
                    key={transport.id}
                    onClick={() => setTripDetails({ ...tripDetails, transport: transport.id })}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all whitespace-nowrap ${
                      tripDetails.transport === transport.id
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {transport.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Activities</label>
          <div className="flex flex-wrap gap-2">
            {activities.map((activity) => (
              <button
                key={activity}
                onClick={() => {
                  const newActivities = tripDetails.activities.includes(activity)
                    ? tripDetails.activities.filter(a => a !== activity)
                    : [...tripDetails.activities, activity];
                  setTripDetails({ ...tripDetails, activities: newActivities });
                }}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  tripDetails.activities.includes(activity)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {activity}
              </button>
            ))}
          </div>
        </div>

        <motion.button
          onClick={generatePackingList}
          disabled={isGenerating || !tripDetails.destination || !tripDetails.duration}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Wand2 className="w-5 h-5" />
              </motion.div>
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate AI Packing List
            </>
          )}
        </motion.button>
      </div>

      {/* Packing Progress */}
      {items.length > 0 && (
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">Packing Progress</h4>
            <div className="text-sm text-gray-600">
              {getPackedCount()} of {items.length} items packed
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <motion.div
              className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${(getPackedCount() / items.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          {getEssentialCount() > 0 && (
            <div className="text-sm text-orange-600">
              ⚠️ {getEssentialCount()} essential items remaining
            </div>
          )}
        </div>
      )}

      {/* Add Item */}
      <div className="mb-6">
        <motion.button
          onClick={() => setShowAddItem(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Custom Item
        </motion.button>
      </div>

      {/* Packing List by Category */}
      <div className="space-y-6">
        {categories.map((category) => {
          const categoryItems = getItemsByCategory(category.id);
          if (categoryItems.length === 0) return null;
          
          return (
            <div key={category.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h4 className="text-lg font-semibold text-gray-800">{category.name}</h4>
                <span className="text-sm text-gray-500">
                  ({categoryItems.filter(item => item.packed).length}/{categoryItems.length} packed)
                </span>
              </div>
              
              <div className="space-y-2">
                {categoryItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      item.packed 
                        ? 'bg-green-50 border-green-200' 
                        : item.essential 
                          ? 'bg-orange-50 border-orange-200' 
                          : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <button
                      onClick={() => togglePacked(item.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        item.packed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {item.packed && <Check className="w-4 h-4" />}
                    </button>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${item.packed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                          {item.name}
                        </span>
                        {item.essential && (
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                            Essential
                          </span>
                        )}
                      </div>
                      {item.notes && (
                        <p className="text-sm text-gray-600">{item.notes}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddItem(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add Item</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  placeholder="e.g., Camera"
                  onKeyPress={(e) => e.key === 'Enter' && addItem()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <motion.button
                onClick={addItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              >
                Add Item
              </motion.button>
              <button
                onClick={() => setShowAddItem(false)}
                className="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
