"use client";
import { motion } from "framer-motion";
import { MapPin, LogIn, UserPlus, Wand2, Calendar, Shield, Users, Search, Star, Heart, Sparkles, Globe, Plane, Camera, Music, Coffee, Mountain, Waves, Sun, Moon, Car, Calculator, Luggage, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, Suspense } from "react";
// import MobileNavigation from "@/components/MobileNavigation";
// import TechStackLogos from "@/components/TechStackLogos";
// import Scene3D from "@/components/3D/Scene3D";
import ErrorBoundary from "@/components/ErrorBoundary";
// import LoadingSpinner from "@/components/LoadingSpinner";
import Logo from "@/components/Logo";
import WeatherWidget from "@/components/WeatherWidget";
import CurrencyConverter from "@/components/CurrencyConverter";

export default function Home() {
  const router = useRouter();
  const [place, setPlace] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");


  const onBrowseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (place) params.set("place", place);
    if (start) params.set("start", start);
    if (end) params.set("end", end);
    router.push(`/discover?${params.toString()}`);
  };

  return (
    <ErrorBoundary>
      <style jsx global>{`
        .transform-gpu {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .group:hover .transform-gpu {
          transform: translateZ(20px);
        }
      `}</style>
      <div className="min-h-svh text-gray-800 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-br from-green-400/15 to-teal-400/15 rounded-full blur-2xl"
          />
        </div>

        <header className="sticky top-0 z-50 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 border-b border-purple-200/30 shadow-lg">
        <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between" role="navigation" aria-label="Main navigation">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Link href="/" className="flex items-center gap-3" aria-label="WanderLens AI - Home">
              <Logo size="md" animated={true} />
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                WanderLens AI
              </span>
            </Link>
          </motion.div>
          
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              className="hidden sm:flex items-center gap-2"
            >
                <Link href="/dashboard" className="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-sm font-medium text-gray-700 hover:from-blue-200 hover:to-purple-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:rotate-1 transform-gpu">
                <Wand2 size={16} className="inline mr-2 group-hover:rotate-12 transition-transform" />
                Dashboard
              </Link>
                <Link href="/itinerary" className="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-green-100 to-teal-100 border border-green-200/50 text-sm font-medium text-gray-700 hover:from-green-200 hover:to-teal-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:rotate-1 transform-gpu">
                <Calendar size={16} className="inline mr-2 group-hover:rotate-12 transition-transform" />
                Itinerary
              </Link>
                <Link href="/utilities" className="group relative px-4 py-2 rounded-xl bg-gradient-to-r from-orange-100 to-pink-100 border border-orange-200/50 text-sm font-medium text-gray-700 hover:from-orange-200 hover:to-pink-200 hover:border-orange-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:rotate-1 transform-gpu">
                <Wand2 size={16} className="inline mr-2 group-hover:rotate-12 transition-transform" />
                Tools
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-center gap-2"
            >
                <Link href="/auth/login" className="group relative px-4 py-2 rounded-xl bg-white/70 border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105 hover:rotate-1 transform-gpu">
                <LogIn size={16} className="inline mr-2 group-hover:scale-110 transition-transform" />
                Login
              </Link>
                <Link href="/auth/signup" className="group relative px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:rotate-1 transform-gpu">
                <UserPlus size={16} className="inline mr-2 group-hover:rotate-12 transition-transform" />
                Sign up
              </Link>
            </motion.div>
            
            {/* <MobileNavigation /> */}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-12 pb-24">
          {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative overflow-hidden rounded-3xl border border-blue-200/50 bg-gradient-to-br from-white/95 via-purple-50/90 to-pink-50/80 p-12 shadow-2xl backdrop-blur-sm mb-16"
          >
            {/* Floating Icons */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
                rotate: [0, 10, 0]
            }}
            transition={{ 
                duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
              className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full flex items-center justify-center"
            >
              <Plane className="w-8 h-8 text-blue-500" />
            </motion.div>
            
          <motion.div
            animate={{ 
              y: [0, 15, 0],
                rotate: [0, -10, 0]
            }}
            transition={{ 
                duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
              className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full flex items-center justify-center"
            >
              <Mountain className="w-6 h-6 text-green-500" />
            </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight"
            >
                Plan Your Perfect
              <br />
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Adventure
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
                Discover amazing destinations, create personalized itineraries, and make unforgettable memories with our AI-powered travel planning platform.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              >
                <Link 
                  href="/onboarding"
                  className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 overflow-hidden"
                >
                  <div className="relative z-10 flex items-center">
                    <Sparkles className="inline mr-3 group-hover:rotate-12 transition-transform" />
                    Start Planning
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Link>
                
                <Link 
                  href="/surprise"
                  className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 overflow-hidden"
                >
                  <div className="relative z-10 flex items-center">
                    <Wand2 className="inline mr-3 group-hover:rotate-12 transition-transform" />
                    Surprise Me
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </Link>
              </motion.div>
            </motion.div>

            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="max-w-4xl mx-auto"
            >
              <form onSubmit={onBrowseSubmit} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200/50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                      type="text"
                      placeholder="Where do you want to go?"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition-all duration-300 bg-white"
                />
                  </div>
                </div>
              <motion.button
                type="submit"
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 2,
                    rotateX: 2,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu"
                >
                  <Search className="inline mr-3" />
                  Discover Destinations
              </motion.button>
            </form>
          </motion.div>
        </motion.section>

          {/* Enhanced Accommodation Features Section */}
        <motion.section 
            initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
        >
            <div className="text-center mb-12">
            <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
                Choose Your Perfect Stay
            </motion.h2>
              <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                From luxury resorts to cozy hostels, find accommodation that matches your style and budget
              </motion.p>
          </div>
              
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Luxury Resorts",
                  description: "5-star accommodations with premium amenities",
                  icon: <Star className="w-8 h-8" />,
                  gradient: "from-yellow-400 to-orange-500",
                  features: ["Spa & Wellness", "Fine Dining", "Concierge Service", "Private Beach Access"],
                  price: "$$$$"
                },
                {
                  title: "Boutique Hotels",
                  description: "Unique, intimate accommodations with character",
                  icon: <Heart className="w-8 h-8" />,
                  gradient: "from-pink-400 to-rose-500",
                  features: ["Artistic Design", "Local Culture", "Personalized Service", "Central Location"],
                  price: "$$$"
                },
                {
                  title: "Eco-Lodges",
                  description: "Sustainable stays in natural settings",
                  icon: <Mountain className="w-8 h-8" />,
                  gradient: "from-green-400 to-emerald-500",
                  features: ["Eco-Friendly", "Nature Immersion", "Wildlife Viewing", "Solar Power"],
                  price: "$$"
                },
                {
                  title: "City Hotels",
                  description: "Modern comfort in urban centers",
                  icon: <Globe className="w-8 h-8" />,
                  gradient: "from-blue-400 to-cyan-500",
                  features: ["Business Center", "Fitness Center", "Rooftop Bar", "City Views"],
                  price: "$$$"
                },
                {
                  title: "Hostels",
                  description: "Budget-friendly social accommodations",
                  icon: <Users className="w-8 h-8" />,
                  gradient: "from-purple-400 to-indigo-500",
                  features: ["Shared Spaces", "Common Kitchen", "Social Events", "Tour Desk"],
                  price: "$"
                },
                {
                  title: "Vacation Rentals",
                  description: "Home-like stays with full amenities",
                  icon: <Coffee className="w-8 h-8" />,
                  gradient: "from-orange-400 to-red-500",
                  features: ["Full Kitchen", "Living Space", "Privacy", "Local Experience"],
                  price: "$$"
                }
              ].map((accommodation, index) => (
              <motion.div
                  key={accommodation.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ 
                    y: -15, 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  className="group relative bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 transform-gpu"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${accommodation.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {accommodation.icon}
              </div>
              
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                    {accommodation.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {accommodation.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {accommodation.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${accommodation.gradient} mr-3`} />
                        {feature}
                      </div>
                    ))}
                </div>
                
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-800">{accommodation.price}</span>
                    <motion.button
              whileHover={{ 
                        scale: 1.05, 
                rotateY: 3,
                        rotateX: 3,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-xl bg-gradient-to-r ${accommodation.gradient} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu`}
                    >
                      Explore
                    </motion.button>
              </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Travel Utilities Section */}
        <motion.section 
            initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
        >
            <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Travel Utilities
          </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Essential tools to make your journey smooth and enjoyable
              </motion.p>
                </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Weather Widget */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ 
                  y: -10, 
                scale: 1.03,
                  rotateY: 3,
                  rotateX: 3,
                  transition: { duration: 0.4, ease: "easeOut" }
              }}
                className="group relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-xl border border-orange-200/50 hover:shadow-2xl transition-all duration-300 transform-gpu"
            >
                <div className="flex items-center gap-4 mb-6">
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                    <Sun className="w-8 h-8 text-white" />
              </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                    Weather Forecast
                </h3>
                    <p className="text-gray-600">
                  Real-time weather updates for your destination
                </p>
              </div>
              </div>
                <div className="bg-white/90 rounded-xl p-4">
                  <WeatherWidget city="New York" />
              </div>
            </motion.div>

              {/* Currency Converter */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ 
                  y: -10, 
                scale: 1.03,
                  rotateY: -3,
                  rotateX: 3,
                  transition: { duration: 0.4, ease: "easeOut" }
              }}
                className="group relative bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 shadow-xl border border-green-200/50 hover:shadow-2xl transition-all duration-300 transform-gpu"
            >
                <div className="flex items-center gap-4 mb-6">
              <motion.div 
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                    <span className="text-white text-2xl font-bold">$</span>
              </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
                      Currency Converter
                </h3>
                    <p className="text-gray-600">
                      Real-time exchange rates and instant conversion
                </p>
              </div>
              </div>
                <div className="bg-white/90 rounded-xl p-4">
                  <CurrencyConverter />
              </div>
              </motion.div>
          </div>
        </motion.section>

          {/* Features Section */}
      <motion.section 
            initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              >
                Why Choose WanderLens AI?
        </motion.h2>
              </div>
              
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Wand2 className="w-12 h-12" />,
                  title: "AI-Powered Planning",
                  description: "Smart algorithms create personalized itineraries based on your preferences",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: <Globe className="w-12 h-12" />,
                  title: "Global Coverage",
                  description: "Access to destinations worldwide with local insights and recommendations",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: <Shield className="w-12 h-12" />,
                  title: "Safe & Secure",
                  description: "Your data is protected with enterprise-grade security measures",
                  gradient: "from-green-500 to-teal-500"
                },
                {
                  icon: <Heart className="w-12 h-12" />,
                  title: "Personalized Experience",
                  description: "Every recommendation is tailored to your unique travel style",
                  gradient: "from-red-500 to-orange-500"
                }
              ].map((feature, index) => (
              <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index + 1.0 }}
              whileHover={{ 
                    y: -15, 
                scale: 1.08,
                    rotateY: 5,
                    rotateX: 5,
                    transition: { duration: 0.4, ease: "easeOut" }
              }}
                  className="text-center group transform-gpu"
            >
              <motion.div 
                    whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                    className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}
              >
                    {feature.icon}
              </motion.div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                    {feature.title}
                </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
              </motion.div>
              ))}
          </div>
        </motion.section>

          {/* Exclusive Features Section */}
        <motion.section 
            initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20 py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50"
        >
            <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
                Exclusive Features
          </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                AI-powered tools and unique features designed specifically for modern travelers
              </motion.p>
                </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Parking Finder */}
              <Link href="/utilities#parking">
            <motion.div
              whileHover={{ 
                    y: -12, 
                    scale: 1.05,
                    rotateY: 5,
                rotateX: 5,
                    z: 50
              }}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer h-80 flex flex-col transform-gpu"
                  style={{ transformStyle: 'preserve-3d' }}
            >
                  <motion.div 
                    whileHover={{ 
                      rotateY: 15,
                      rotateX: 15,
                      scale: 1.2
                    }}
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Car className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">Parking Finder</h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    Find the best parking spots near your destination with real-time availability, pricing, and features.
                  </p>
            <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300"
                  >
                    <span>Discover Parking</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
            </motion.div>
              </Link>

              {/* Split Bills */}
              <Link href="/utilities#split-bills">
            <motion.div
              whileHover={{ 
                    y: -12, 
                    scale: 1.05,
                    rotateY: -5,
                rotateX: 5,
                    z: 50
              }}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer h-80 flex flex-col transform-gpu"
                  style={{ transformStyle: 'preserve-3d' }}
            >
                  <motion.div 
                    whileHover={{ 
                      rotateY: -15,
                      rotateX: 15,
                      scale: 1.2
                    }}
                    className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Calculator className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-green-600 transition-colors duration-300">Split Bills</h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    Easily split expenses with travel companions. Track who owes what and settle up seamlessly.
                  </p>
            <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-green-600 font-semibold group-hover:text-green-700 transition-colors duration-300"
                  >
                    <span>Start Splitting</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
            </motion.div>
              </Link>

              {/* Travel Calendar */}
              <Link href="/utilities#calendar">
            <motion.div
              whileHover={{ 
                    y: -12, 
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: -5,
                    z: 50
                  }}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer h-80 flex flex-col transform-gpu"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div 
                    whileHover={{ 
                      rotateY: 15,
                      rotateX: -15,
                      scale: 1.2
                    }}
                    className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Calendar className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">Travel Calendar</h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    Plan and organize your travel events with our smart calendar. Never miss a flight or reservation.
                  </p>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors duration-300"
                  >
                    <span>Plan Events</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.div>
                </motion.div>
              </Link>

              {/* AI Packing List */}
              <Link href="/utilities#packing">
            <motion.div
              whileHover={{ 
                    y: -12, 
                    scale: 1.05,
                    rotateY: -5,
                    rotateX: -5,
                    z: 50
                  }}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer h-80 flex flex-col transform-gpu"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div 
                    whileHover={{ 
                      rotateY: -15,
                      rotateX: -15,
                      scale: 1.2
                    }}
                    className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Luggage className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">AI Packing List</h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    Get personalized packing suggestions based on your destination, weather, and activities.
                  </p>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-colors duration-300"
                  >
                    <span>Pack Smart</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.div>
                </motion.div>
              </Link>

              {/* Playlist Generator */}
              <Link href="/utilities#playlist">
            <motion.div
              whileHover={{ 
                    y: -12, 
                    scale: 1.05,
                    rotateY: 5,
                rotateX: 5,
                    z: 50
              }}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer h-80 flex flex-col transform-gpu"
                  style={{ transformStyle: 'preserve-3d' }}
            >
                  <motion.div 
                    whileHover={{ 
                      rotateY: 15,
                      rotateX: 15,
                      scale: 1.2
                    }}
                    className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Music className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-pink-600 transition-colors duration-300">Playlist Generator</h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    Create the perfect travel playlist based on your mood, activity, and destination vibes.
                  </p>
          <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center text-pink-600 font-semibold group-hover:text-pink-700 transition-colors duration-300"
                  >
                    <span>Create Playlist</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </motion.div>
              </Link>

              {/* Hidden Spots */}
              <Link href="/utilities#hidden-spots">
            <motion.div
              whileHover={{ 
                    y: -12, 
                    scale: 1.05,
                    rotateY: -5,
                    rotateX: 5,
                    z: 50
                  }}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 cursor-pointer h-80 flex flex-col transform-gpu"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                <motion.div
                    whileHover={{ 
                      rotateY: -15,
                      rotateX: 15,
                      scale: 1.2
                    }}
                    className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <Eye className="w-8 h-8 text-white" />
                </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-emerald-600 transition-colors duration-300">Hidden Spots</h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    Discover secret places and hidden gems that only locals know about. Explore the unexplored.
                  </p>
                <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors duration-300"
                  >
                    <span>Explore Hidden</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.div>
                  </motion.div>
              </Link>
        </div>
      </motion.section>
      </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-6">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-center justify-between gap-4">
              {/* Left Section - Development Credit */}
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">&lt;/&gt;</span>
            </div>
            <div className="flex items-center gap-2">
                  <span className="text-blue-300 text-sm">developed with</span>
                  <span className="text-red-500">❤️</span>
                  <span className="text-cyan-400 font-semibold text-sm">by Rushan Haque</span>
                </div>
            </div>

              {/* Right Section - Social Media and Tech Stack */}
              <div className="flex items-center gap-4">
                {/* Social Media */}
                <div className="flex gap-2">
              <motion.a
                    href="https://www.linkedin.com/in/rushanhaque?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-800/50 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
                    title="LinkedIn"
              >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>

              <motion.a
                href="https://github.com/rushanhaque"
                target="_blank"
                rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-800/50 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
                    title="GitHub"
              >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>

              <motion.a
                href="https://www.instagram.com/rushanhaque?igsh=MTN1eTBlMG45andoZw=="
                target="_blank"
                rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-800/50 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
                    title="Instagram"
              >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </motion.a>
              
              <motion.a
                href="mailto:rushanulhaque@gmail.com"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-800/50 border border-gray-600 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
                    title="Email"
              >
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </motion.a>
            </div>

                {/* Technology Logos */}
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-gray-800/50 border border-gray-600 rounded-lg flex items-center justify-center" title="HTML5">
                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
                    </svg>
                  </div>
                  <div className="w-8 h-8 bg-gray-800/50 border border-gray-600 rounded-lg flex items-center justify-center" title="CSS3">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
                    </svg>
                  </div>
                  <div className="w-8 h-8 bg-gray-800/50 border border-gray-600 rounded-lg flex items-center justify-center" title="JavaScript">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
                    </svg>
                  </div>
                  <div className="w-8 h-8 bg-gray-800/50 border border-gray-600 rounded-lg flex items-center justify-center" title="React">
                    <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44a23.476 23.476 0 0 0-1.081-.187 22.852 22.852 0 0 0-1.118-.138c.01-.175.02-.35.02-.527 0-1.42-.344-2.7-1.05-3.743 1.33.136 2.543.665 3.19 1.308zm-5.524.125c.706 1.043 1.05 2.323 1.05 3.743 0 .177-.01.352-.02.527a22.85 22.85 0 0 0-1.118.138c-.36.03-.718.067-1.081.187a23.476 23.476 0 0 0-1.25-1.44c-.225-1.869.064-3.322.73-3.704.152-.083.333-.127.558-.127h.006zm-6.535 2.73c.162.466.315.952.458 1.453a22.162 22.162 0 0 0-1.44 1.78 22.203 22.203 0 0 0-1.44-1.78c.143-.5.296-.987.458-1.453.325-.934.695-1.992 1.04-2.8.345.808.715 1.866 1.04 2.8zm-2.03 5.278c.344.808.715 1.866 1.04 2.8.162.466.315.952.458 1.453a22.203 22.203 0 0 0-1.44 1.78 22.162 22.162 0 0 0-1.44-1.78c.143-.5.296-.987.458-1.453.325-.934.695-1.992 1.04-2.8zm2.03 5.278c-.325.934-.695 1.992-1.04 2.8-.345-.808-.715-1.866-1.04-2.8-.162-.466-.315-.952-.458-1.453a22.162 22.162 0 0 1 1.44-1.78 22.203 22.203 0 0 1 1.44 1.78c-.143.5-.296.987-.458 1.453zm1.52 1.627c.36.03.718.067 1.081.187.23.46.48.934.75 1.44.162.466.315.952.458 1.453a22.203 22.203 0 0 1-1.44 1.78 22.162 22.162 0 0 1-1.44-1.78c.143-.5.296-.987.458-1.453.23-.46.48-.934.75-1.44.36-.12.718-.157 1.081-.187zm3.5.675c.36-.12.718-.157 1.081-.187.23.46.48.934.75 1.44.162.466.315.952.458 1.453a22.162 22.162 0 0 1-1.44 1.78 22.203 22.203 0 0 1-1.44-1.78c.143-.5.296-.987.458-1.453.23-.46.48-.934.75-1.44zm3.5-.675c.36.03.718.067 1.081.187.23.46.48.934.75 1.44.162.466.315.952.458 1.453a22.203 22.203 0 0 1-1.44 1.78 22.162 22.162 0 0 1-1.44-1.78c.143-.5.296-.987.458-1.453.23-.46.48-.934.75-1.44.36-.12.718-.157 1.081-.187zm3.5-.675c-.36-.12-.718-.157-1.081-.187-.23-.46-.48-.934-.75-1.44-.162-.466-.315-.952-.458-1.453a22.162 22.162 0 0 1 1.44-1.78 22.203 22.203 0 0 1 1.44 1.78c-.143.5-.296.987-.458 1.453-.23.46-.48.934-.75 1.44zm2.03-5.278c.325-.934.695-1.992 1.04-2.8.345.808.715 1.866 1.04 2.8.162.466.315.952.458 1.453a22.203 22.203 0 0 1-1.44 1.78 22.162 22.162 0 0 1-1.44-1.78c.143-.5.296-.987.458-1.453zm-2.03-5.278c-.325-.934-.695-1.992-1.04-2.8-.345-.808-.715-1.866-1.04-2.8-.162-.466-.315-.952-.458-1.453a22.162 22.162 0 0 0-1.44-1.78 22.203 22.203 0 0 0-1.44 1.78c.143.5.296.987.458 1.453z"/>
                    </svg>
                  </div>
                  <div className="w-8 h-8 bg-gray-800/50 border border-gray-600 rounded-lg flex items-center justify-center" title="Next.js">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.572 0c-.176 0-.31.001-.358.002L11.572 0c-1.05.003-2.05.09-2.99.253l-.018.002c-2.94.5-5.38 2.05-6.9 4.28l-.01.013c-1.52 2.23-2.24 5.1-2.05 8.15l.01.1c.2 3.05 1.33 5.8 3.1 7.9l.01.01c1.77 2.1 4.18 3.5 6.8 4.1l.1.02c2.62.6 5.4.4 7.9-.6l.1-.03c2.5-1 4.6-2.6 6.1-4.6l.01-.01c1.5-2 2.4-4.3 2.6-6.7l.01-.1c.2-2.4-.2-4.7-1.1-6.8l-.01-.02c-.9-2.1-2.3-3.9-4-5.2l-.01-.01c-1.7-1.3-3.7-2.1-5.9-2.3l-.1-.01c-.94-.16-1.94-.25-2.99-.25zm.43 1.5c.94 0 1.83.08 2.66.22l.09.01c2.1.4 3.9 1.2 5.3 2.4l.01.01c1.4 1.2 2.3 2.7 2.7 4.4l.01.09c.4 1.7.2 3.5-.5 5.1l-.01.02c-.7 1.6-1.8 2.9-3.2 3.8l-.01.01c-1.4.9-3 1.4-4.7 1.5l-.1.01c-1.7.1-3.4-.2-4.9-.9l-.09-.03c-1.5-.7-2.7-1.8-3.5-3.2l-.01-.01c-.8-1.4-1.2-3-.1-4.5l.01-.09c.1-1.5.6-2.9 1.4-4.1l.01-.01c.8-1.2 1.9-2.2 3.2-2.8l.01-.01c1.3-.6 2.7-.9 4.2-.9zm-.43 2.5c-1.1 0-2.1.2-3 .6l-.09.03c-.9.4-1.6 1-2.1 1.7l-.01.01c-.5.7-.8 1.5-.8 2.4l.01.09c0 .9.3 1.7.8 2.4l.01.01c.5.7 1.2 1.3 2.1 1.7l.09.03c.9.4 1.9.6 3 .6s2.1-.2 3-.6l.09-.03c.9-.4 1.6-1 2.1-1.7l.01-.01c.5-.7.8-1.5.8-2.4l-.01-.09c0-.9-.3-1.7-.8-2.4l-.01-.01c-.5-.7-1.2-1.3-2.1-1.7l-.09-.03c-.9-.4-1.9-.6-3-.6zm0 1.5c.6 0 1.1.1 1.6.3l.06.02c.5.2.9.5 1.2.9l.01.01c.3.4.5.9.5 1.4l-.01.06c0 .5-.2 1-.5 1.4l-.01.01c-.3.4-.7.7-1.2.9l-.06.02c-.5.2-1 .3-1.6.3s-1.1-.1-1.6-.3l-.06-.02c-.5-.2-.9-.5-1.2-.9l-.01-.01c-.3-.4-.5-.9-.5-1.4l.01-.06c0-.5.2-1 .5-1.4l.01-.01c.3-.4.7-.7 1.2-.9l.06-.02c.5-.2 1-.3 1.6-.3z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </footer>
      </div>
    </ErrorBoundary>
  );
}