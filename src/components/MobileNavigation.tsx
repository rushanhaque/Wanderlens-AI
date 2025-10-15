"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Home, Plane, Calendar, Settings, User, 
  LogIn, UserPlus, Wand2, MapPin, Heart, FileText,
  BarChart3, TrendingUp, Shield, Users
} from "lucide-react";
import Link from "next/link";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/discover", label: "Discover", icon: MapPin },
    { href: "/itinerary", label: "Itinerary", icon: Calendar },
    { href: "/utilities", label: "Tools", icon: Wand2 },
    { href: "/maps", label: "Maps", icon: MapPin },
    { href: "/license", label: "License", icon: Shield },
    { href: "/surprise", label: "Surprise Me", icon: Wand2 },
    { href: "/auth/login", label: "Login", icon: LogIn },
    { href: "/auth/signup", label: "Sign Up", icon: UserPlus },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="sm:hidden p-2 rounded-xl border border-olive-200/50 hover:bg-olive-100/50 transition-colors duration-300"
      >
        <Menu size={20} className="text-foreground" />
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 sm:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 bg-gradient-to-br from-calm-50/95 to-accent-beige/95 backdrop-blur-md border-l border-olive-200/30 shadow-depth z-50 sm:hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-10 h-10 bg-gradient-to-br from-olive-400 to-olive-600 rounded-xl flex items-center justify-center shadow-calm"
                    >
                      <Plane size={20} className="text-white" />
                    </motion.div>
                    <span className="font-bold text-lg bg-gradient-to-r from-olive-700 to-olive-600 bg-clip-text text-transparent">
                      Voyage AI
                    </span>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05, rotate: 90 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-olive-100/50 transition-colors duration-300"
                  >
                    <X size={20} className="text-foreground" />
                  </motion.button>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-olive-50/50 transition-all duration-300 hover:shadow-soft"
                      >
                        <motion.div
                          whileHover={{ rotate: 12, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          className="p-2 rounded-lg bg-olive-100/50 group-hover:bg-olive-200/70 transition-colors duration-300"
                        >
                          <item.icon size={18} className="text-olive-600 group-hover:text-olive-700 transition-colors" />
                        </motion.div>
                        <span className="font-medium text-foreground group-hover:text-olive-700 transition-colors">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-8 pt-6 border-t border-olive-200/30">
                  <h3 className="text-sm font-semibold text-foreground/70 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-olive-100/50 to-olive-200/50 border border-olive-300/50 hover:from-olive-200/70 hover:to-olive-300/70 transition-all duration-300"
                    >
                      <Wand2 size={20} className="text-olive-600" />
                      <span className="text-foreground font-medium">AI Trip Planner</span>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-calm-100/50 border border-olive-200/50 hover:bg-olive-50/50 transition-colors duration-300"
                    >
                      <Heart size={20} className="text-red-500" />
                      <span className="text-foreground font-medium">Saved Places</span>
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-calm-100/50 border border-olive-200/50 hover:bg-olive-50/50 transition-colors duration-300"
                    >
                      <FileText size={20} className="text-blue-500" />
                      <span className="text-foreground font-medium">Documents</span>
                    </motion.button>
                  </div>
                </div>

                {/* User Info */}
                <div className="mt-8 pt-6 border-t border-olive-200/30">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-calm-100/50 to-accent-beige/50 rounded-xl border border-olive-200/30"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-olive-400 to-olive-600 rounded-full flex items-center justify-center shadow-calm">
                      <User size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Welcome back!</div>
                      <div className="text-sm text-foreground/70">Sign in to access your trips</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
