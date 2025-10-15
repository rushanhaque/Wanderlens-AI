"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle, Calendar, MapPin, Heart } from "lucide-react";
import Link from "next/link";
import DeepGlobe from "@/components/DeepGlobe";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    travelStyle: "",
    budget: "",
    interests: [] as string[],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const travelStyles = ["Adventure", "Luxury", "Budget", "Cultural", "Relaxation", "Business"];
  const interests = ["Food", "History", "Nature", "Nightlife", "Shopping", "Art", "Music", "Sports", "Photography"];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.travelStyle) {
      newErrors.travelStyle = "Please select your travel style";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", email: "", password: "", confirmPassword: "", travelStyle: "", budget: "", interests: [] });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  return (
    <div className="relative min-h-svh grid place-items-center px-6 py-16 overflow-hidden">
      <DeepGlobe />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-night-800/60 p-8 shadow-glow backdrop-blur-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-purple to-neon-cyan bg-clip-text text-transparent">
            Join Voyage AI
          </h1>
          <p className="text-white/70 text-sm mt-2">Create your account and start planning amazing trips</p>
        </div>

        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-3"
          >
            <CheckCircle className="text-green-400" size={20} />
            <span className="text-green-400 text-sm">Account created successfully! Welcome to Voyage AI!</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border transition-colors ${
                    errors.name 
                      ? "border-red-500/50 focus:border-red-500" 
                      : "border-white/10 focus:border-neon-cyan"
                  } focus:outline-none focus:ring-2 focus:ring-neon-cyan/20`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle size={12} />
                  {errors.name}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border transition-colors ${
                    errors.email 
                      ? "border-red-500/50 focus:border-red-500" 
                      : "border-white/10 focus:border-neon-cyan"
                  } focus:outline-none focus:ring-2 focus:ring-neon-cyan/20`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle size={12} />
                  {errors.email}
                </motion.p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg bg-white/5 border transition-colors ${
                    errors.password 
                      ? "border-red-500/50 focus:border-red-500" 
                      : "border-white/10 focus:border-neon-cyan"
                  } focus:outline-none focus:ring-2 focus:ring-neon-cyan/20`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle size={12} />
                  {errors.password}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 rounded-lg bg-white/5 border transition-colors ${
                    errors.confirmPassword 
                      ? "border-red-500/50 focus:border-red-500" 
                      : "border-white/10 focus:border-neon-cyan"
                  } focus:outline-none focus:ring-2 focus:ring-neon-cyan/20`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle size={12} />
                  {errors.confirmPassword}
                </motion.p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Travel Style
              </label>
              <select
                name="travelStyle"
                value={formData.travelStyle}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border transition-colors ${
                  errors.travelStyle 
                    ? "border-red-500/50 focus:border-red-500" 
                    : "border-white/10 focus:border-neon-cyan"
                } focus:outline-none focus:ring-2 focus:ring-neon-cyan/20`}
              >
                <option value="">Select your travel style</option>
                {travelStyles.map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
              {errors.travelStyle && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-1 flex items-center gap-1"
                >
                  <AlertCircle size={12} />
                  {errors.travelStyle}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Budget Range (per day)
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20"
              >
                <option value="">Select budget range</option>
                <option value="budget">$0-50 (Budget)</option>
                <option value="mid">$50-150 (Mid-range)</option>
                <option value="luxury">$150+ (Luxury)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-3">
              Interests (select all that apply)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {interests.map(interest => (
                <motion.button
                  key={interest}
                  type="button"
                  onClick={() => handleInterestToggle(interest)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg text-sm transition-all ${
                    formData.interests.includes(interest)
                      ? "bg-neon-purple/20 border border-neon-purple text-neon-purple"
                      : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                  }`}
                >
                  <Heart size={14} className="inline mr-1" />
                  {interest}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan px-4 py-3 text-night-900 font-semibold shadow-glow disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-night-900/30 border-t-night-900 rounded-full animate-spin" />
                Creating account...
              </div>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-neon-cyan hover:text-neon-purple transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10">
          <p className="text-center text-xs text-white/50">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-neon-cyan hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-neon-cyan hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}


