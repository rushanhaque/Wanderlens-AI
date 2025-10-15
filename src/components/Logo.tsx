"use client";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Globe, Navigation } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  className?: string;
}

export default function Logo({ size = "md", animated = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40
  };

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      whileHover={animated ? { scale: 1.1, rotate: 5 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Main Logo Container */}
      <div className="relative w-full h-full">
        {/* Outer Glow Ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={animated ? {
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)"
          }}
        />
        
        {/* Main Background Circle */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-full shadow-2xl"
          animate={animated ? {
            rotate: [0, 360],
            scale: [1, 1.02, 1]
          } : {}}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Inner Gradient Circle */}
        <motion.div
          className="absolute inset-1 bg-gradient-to-br from-white/95 to-blue-50/90 rounded-full flex items-center justify-center"
          animate={animated ? {
            scale: [1, 1.01, 1]
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Central Globe Icon */}
          <motion.div
            animate={animated ? {
              rotate: [0, 360]
            } : {}}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Globe 
              size={iconSizes[size]} 
              className="text-blue-600 drop-shadow-sm"
            />
          </motion.div>
        </motion.div>
        
        {/* Floating Location Pin */}
        <motion.div
          className="absolute -top-1 -right-1"
          animate={animated ? {
            y: [0, -6, 0],
            x: [0, 3, 0],
            rotate: [0, 15, 0]
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-5 h-5 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
            <MapPin size={10} className="text-white" />
          </div>
        </motion.div>
        
        {/* Floating Navigation Arrow */}
        <motion.div
          className="absolute -bottom-1 -left-1"
          animate={animated ? {
            y: [0, 4, 0],
            x: [0, -2, 0],
            rotate: [0, -10, 0]
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <div className="w-4 h-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
            <Navigation size={8} className="text-white" />
          </div>
        </motion.div>
        
        {/* Animated Sparkle Effects */}
        {animated && (
          <>
            <motion.div
              className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-400 rounded-full shadow-lg"
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 0.3
              }}
            />
            <motion.div
              className="absolute -bottom-2 -right-2 w-1.5 h-1.5 bg-pink-400 rounded-full shadow-lg"
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                rotate: [0, -180, -360]
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                delay: 1.2
              }}
            />
            <motion.div
              className="absolute top-2 -right-3 w-1 h-1 bg-cyan-400 rounded-full shadow-lg"
              animate={{
                scale: [0, 1.8, 0],
                opacity: [0, 1, 0],
                rotate: [0, 90, 180]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: 0.8
              }}
            />
            <motion.div
              className="absolute -top-1 left-1 w-1 h-1 bg-purple-400 rounded-full shadow-lg"
              animate={{
                scale: [0, 1.3, 0],
                opacity: [0, 1, 0],
                rotate: [0, -90, -180]
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                delay: 1.8
              }}
            />
          </>
        )}
        
        {/* Subtle Inner Ring */}
        <motion.div
          className="absolute inset-2 border border-white/20 rounded-full"
          animate={animated ? {
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3]
          } : {}}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </motion.div>
  );
}
