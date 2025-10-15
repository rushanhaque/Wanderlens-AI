"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Plus, Minus, DollarSign, Calculator, Receipt, Share2, Download } from "lucide-react";

interface Person {
  id: string;
  name: string;
  items: BillItem[];
  total: number;
}

interface BillItem {
  id: string;
  name: string;
  price: number;
  sharedBy: string[];
  category: string;
}

interface SplitBillsProps {
  className?: string;
}

export default function SplitBills({ className = "" }: SplitBillsProps) {
  const [people, setPeople] = useState<Person[]>([
    { id: "1", name: "You", items: [], total: 0 },
    { id: "2", name: "Friend 1", items: [], total: 0 },
    { id: "3", name: "Friend 2", items: [], total: 0 }
  ]);
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Food");
  const [newPersonName, setNewPersonName] = useState("");
  const [showAddItem, setShowAddItem] = useState(false);
  const [showAddPerson, setShowAddPerson] = useState(false);

  const categories = ["Food", "Transport", "Accommodation", "Activities", "Shopping", "Other"];

  const addPerson = () => {
    if (!newPersonName.trim()) return;
    
    const newPerson: Person = {
      id: Date.now().toString(),
      name: newPersonName,
      items: [],
      total: 0
    };
    
    setPeople([...people, newPerson]);
    setNewPersonName("");
    setShowAddPerson(false);
  };

  const removePerson = (personId: string) => {
    if (people.length <= 1) return;
    
    setPeople(people.filter(p => p.id !== personId));
    setBillItems(billItems.map(item => ({
      ...item,
      sharedBy: item.sharedBy.filter(id => id !== personId)
    })));
  };

  const addBillItem = () => {
    if (!newItemName.trim() || !newItemPrice) return;
    
    const newItem: BillItem = {
      id: Date.now().toString(),
      name: newItemName,
      price: parseFloat(newItemPrice),
      sharedBy: people.map(p => p.id),
      category: newItemCategory
    };
    
    setBillItems([...billItems, newItem]);
    setNewItemName("");
    setNewItemPrice("");
    setNewItemCategory("Food");
    setShowAddItem(false);
  };

  const removeBillItem = (itemId: string) => {
    setBillItems(billItems.filter(item => item.id !== itemId));
  };

  const togglePersonForItem = (itemId: string, personId: string) => {
    setBillItems(billItems.map(item => {
      if (item.id === itemId) {
        const isShared = item.sharedBy.includes(personId);
        return {
          ...item,
          sharedBy: isShared 
            ? item.sharedBy.filter(id => id !== personId)
            : [...item.sharedBy, personId]
        };
      }
      return item;
    }));
  };

  const calculateTotals = () => {
    const updatedPeople = people.map(person => {
      const personItems = billItems.filter(item => item.sharedBy.includes(person.id));
      const total = personItems.reduce((sum, item) => {
        const shareCount = item.sharedBy.length;
        return sum + (item.price / shareCount);
      }, 0);
      
      return { ...person, total, items: personItems };
    });
    
    setPeople(updatedPeople);
  };

  useEffect(() => {
    calculateTotals();
  }, [billItems]);

  const getTotalBill = () => {
    return billItems.reduce((sum, item) => sum + item.price, 0);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Food: "bg-orange-100 text-orange-700",
      Transport: "bg-blue-100 text-blue-700",
      Accommodation: "bg-purple-100 text-purple-700",
      Activities: "bg-green-100 text-green-700",
      Shopping: "bg-pink-100 text-pink-700",
      Other: "bg-gray-100 text-gray-700"
    };
    return colors[category] || colors.Other;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-100 rounded-xl p-6 ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Split Bills</h3>
          <p className="text-gray-600 text-sm">Split expenses with your travel companions</p>
        </div>
      </div>

      {/* People Management */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-800">Travel Companions</h4>
          <motion.button
            onClick={() => setShowAddPerson(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Person
          </motion.button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {people.map((person) => (
            <motion.div
              key={person.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-semibold text-gray-800">{person.name}</h5>
                {people.length > 1 && (
                  <button
                    onClick={() => removePerson(person.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  {person.total.toFixed(2)}
                </div>
                <div className="text-xs text-gray-500">
                  {person.items.length} items
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {showAddPerson && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-white rounded-lg border border-gray-200"
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={newPersonName}
                onChange={(e) => setNewPersonName(e.target.value)}
                placeholder="Person's name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                onKeyPress={(e) => e.key === 'Enter' && addPerson()}
              />
              <motion.button
                onClick={addPerson}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
              >
                Add
              </motion.button>
              <button
                onClick={() => setShowAddPerson(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bill Items */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-800">Bill Items</h4>
          <motion.button
            onClick={() => setShowAddItem(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </motion.button>
        </div>

        {billItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Receipt className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No items added yet</p>
            <p className="text-sm">Add your first expense to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {billItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="font-semibold text-gray-800">{item.name}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-lg font-bold text-green-600">
                      <DollarSign className="w-4 h-4" />
                      {item.price.toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={() => removeBillItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">Split between:</p>
                  <div className="flex flex-wrap gap-2">
                    {people.map((person) => (
                      <button
                        key={person.id}
                        onClick={() => togglePersonForItem(item.id, person.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          item.sharedBy.includes(person.id)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {person.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  {item.sharedBy.length} people • ${(item.price / item.sharedBy.length).toFixed(2)} each
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {showAddItem && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-white rounded-lg border border-gray-200"
          >
            <div className="space-y-3">
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Item name (e.g., Dinner at Restaurant)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
              <div className="flex gap-3">
                <input
                  type="number"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                  placeholder="Price"
                  step="0.01"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                />
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3">
                <motion.button
                  onClick={addBillItem}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
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
            </div>
          </motion.div>
        )}
      </div>

      {/* Summary */}
      {billItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">Summary</h4>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              >
                <Share2 className="w-4 h-4" />
                Share
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
              >
                <Download className="w-4 h-4" />
                Export
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-semibold text-gray-800 mb-3">Total Bill</h5>
              <div className="text-2xl font-bold text-green-600 mb-2">
                ${getTotalBill().toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">
                {billItems.length} items • {people.length} people
              </div>
            </div>

            <div>
              <h5 className="font-semibold text-gray-800 mb-3">Per Person</h5>
              <div className="space-y-2">
                {people.map((person) => (
                  <div key={person.id} className="flex items-center justify-between">
                    <span className="text-gray-600">{person.name}</span>
                    <span className="font-semibold text-gray-800">
                      ${person.total.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
