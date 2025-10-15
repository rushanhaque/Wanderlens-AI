"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei";
import { Suspense, memo } from "react";
import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";
import AnimatedSphere from "./AnimatedSphere";
import TechLogo from "./TechLogo";

function Scene3DContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.05}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      {/* Environment */}
      <Environment preset="sunset" />
      
      {/* Floating Particles */}
      <FloatingParticles count={500} />
      
      {/* Animated Spheres */}
      <AnimatedSphere position={[-2, 0, 0]} color="#3b82f6" size={0.5} />
      <AnimatedSphere position={[2, 0, 0]} color="#10b981" size={0.3} />
      <AnimatedSphere position={[0, 1, -1]} color="#f59e0b" size={0.4} />
      
      {/* Tech Logos */}
      <TechLogo position={[-1, -1, 0]} color="#61dafb" logo="react" name="React" />
      <TechLogo position={[1, -1, 0]} color="#000000" logo="next" name="Next.js" />
      <TechLogo position={[0, -1.5, 0]} color="#3178c6" logo="typescript" name="TypeScript" />
    </>
  );
}

const MemoizedScene3DContent = memo(Scene3DContent);

export default function Scene3D() {
  return (
    <div className="w-full h-96 relative" role="img" aria-label="3D interactive scene with floating particles and tech logos">
      <div className="w-full h-full bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-24 h-24 bg-gradient-to-br from-olive-400 to-olive-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <span className="text-white text-3xl">✈️</span>
          </motion.div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Voyage AI</h3>
          <p className="text-foreground/70">AI-Powered Travel Planning</p>
        </div>
      </div>
    </div>
  );
}
