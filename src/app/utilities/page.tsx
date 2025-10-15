"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Grid, List } from "lucide-react";
import Link from "next/link";
import WeatherWidget from "@/components/WeatherWidget";
import CurrencyConverter from "@/components/CurrencyConverter";
import ParkingFinder from "@/components/ParkingFinder";
import SplitBills from "@/components/SplitBills";
import TravelCalendar from "@/components/TravelCalendar";
import PackingList from "@/components/PackingList";
import PlaylistGenerator from "@/components/PlaylistGenerator";
import HiddenSpots from "@/components/HiddenSpots";

export default function UtilitiesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const utilities = [
    {
      id: "weather",
      title: "Weather Forecast",
      description: "Real-time weather updates for your destination",
      component: <WeatherWidget city="New York" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "currency",
      title: "Currency Converter",
      description: "Convert currencies with live exchange rates",
      component: <CurrencyConverter />,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "parking",
      title: "Parking Finder",
      description: "Find the best parking spots near your destination",
      component: <ParkingFinder />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "split-bills",
      title: "Split Bills",
      description: "Easily split expenses with travel companions",
      component: <SplitBills />,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: "calendar",
      title: "Travel Calendar",
      description: "Plan and organize your travel events",
      component: <TravelCalendar />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "packing",
      title: "AI Packing List",
      description: "Get personalized packing suggestions",
      component: <PackingList />,
      color: "from-orange-500 to-red-500"
    },
    {
      id: "playlist",
      title: "Playlist Generator",
      description: "Create the perfect travel playlist",
      component: <PlaylistGenerator />,
      color: "from-pink-500 to-purple-500"
    },
    {
      id: "hidden-spots",
      title: "Hidden Spots Discovery",
      description: "Discover secret places only locals know",
      component: <HiddenSpots />,
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-2xl font-bold text-gray-800">Travel Utilities</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid" 
                    ? "bg-purple-500 text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list" 
                    ? "bg-purple-500 text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">All Travel Tools</h2>
          <p className="text-gray-600 text-lg">
            Everything you need for a perfect trip, all in one place
          </p>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {utilities.map((utility, index) => (
              <motion.div
                key={utility.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${utility.color}`} />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{utility.title}</h3>
                  <p className="text-gray-600 mb-4">{utility.description}</p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    {utility.component}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {utilities.map((utility, index) => (
              <motion.div
                key={utility.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <div className="flex">
                  <div className={`w-4 bg-gradient-to-b ${utility.color}`} />
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{utility.title}</h3>
                        <p className="text-gray-600 mb-4">{utility.description}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      {utility.component}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}