"use client";
import { motion } from "framer-motion";

const techStack = [
  { name: "React", color: "from-cyan-400 to-cyan-600", icon: "⚛️" },
  { name: "Next.js", color: "from-gray-700 to-gray-900", icon: "▲" },
  { name: "TypeScript", color: "from-blue-500 to-blue-700", icon: "TS" },
  { name: "Tailwind", color: "from-teal-400 to-teal-600", icon: "TW" },
  { name: "Three.js", color: "from-orange-400 to-orange-600", icon: "3D" },
  { name: "Framer", color: "from-purple-400 to-purple-600", icon: "FM" }
];

export default function TechStackLogos() {
  return (
    <div className="flex items-center gap-2">
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.2, rotate: 5 }}
          className={`w-8 h-8 bg-gradient-to-br ${tech.color} rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg`}
          title={tech.name}
        >
          {tech.icon}
        </motion.div>
      ))}
    </div>
  );
}
