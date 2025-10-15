"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  MapPin, Calendar, DollarSign, Users, Heart, 
  Camera, Utensils, Mountain, ShoppingBag, 
  Music, BookOpen, Gamepad2, Dumbbell, 
  Plane, Car, Train, Bus, Hotel, Home,
  Wand2, ArrowRight, CheckCircle
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Info
    origin: "",
    destination: "",
    startDate: "",
    endDate: "",
    travelers: "",
    
    // Budget & Style
    budget: "",
    accommodationType: "",
    transportPreference: "",
    travelStyle: "",
    
    // Interests & Activities
    interests: [] as string[],
    activities: [] as string[],
    foodPreferences: [] as string[],
    
    // Special Requirements
    accessibility: [] as string[],
    dietaryRestrictions: [] as string[],
    specialOccasions: "",
    
    // Personal Preferences
    pace: "",
    groupType: "",
    weatherPreference: "",
    languagePreference: ""
  });

  const totalSteps = 5;

  const interestOptions = [
    { id: "food", label: "Food & Dining", icon: Utensils },
    { id: "history", label: "History & Culture", icon: BookOpen },
    { id: "nature", label: "Nature & Outdoors", icon: Mountain },
    { id: "shopping", label: "Shopping", icon: ShoppingBag },
    { id: "nightlife", label: "Nightlife", icon: Music },
    { id: "photography", label: "Photography", icon: Camera },
    { id: "adventure", label: "Adventure Sports", icon: Mountain },
    { id: "wellness", label: "Wellness & Spa", icon: Heart },
    { id: "gaming", label: "Gaming & Entertainment", icon: Gamepad2 },
    { id: "fitness", label: "Fitness & Sports", icon: Dumbbell }
  ];

  const activityOptions = [
    "City tours", "Museum visits", "Beach activities", "Hiking", "Cooking classes",
    "Art galleries", "Local festivals", "Water sports", "Historical sites", "Markets",
    "Concerts", "Theater shows", "Wine tasting", "Wildlife watching", "Photography tours"
  ];

  const foodOptions = [
    "Local cuisine", "Fine dining", "Street food", "Vegetarian", "Vegan",
    "Seafood", "Spicy food", "Desserts", "Coffee culture", "Wine & cocktails"
  ];

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleActivityToggle = (activity: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const handleFoodToggle = (food: string) => {
    setFormData(prev => ({
      ...prev,
      foodPreferences: prev.foodPreferences.includes(food)
        ? prev.foodPreferences.filter(f => f !== food)
        : [...prev.foodPreferences, food]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store form data in localStorage for the itinerary page
      localStorage.setItem('userPreferences', JSON.stringify(formData));
      
      // Redirect to itinerary page
      router.push('/itinerary');
    } catch (error) {
      console.error('Error generating itinerary:', error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Plan Your Perfect Trip</h1>
            <span className="text-gray-600">Step {currentStep} of {totalSteps}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 rounded-2xl border border-gray-200/50 p-8 shadow-xl"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-gray-800" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Where are you going?</h2>
                  <p className="text-gray-600">Tell us about your destination and travel dates</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Origin City</label>
                    <input
                      type="text"
                      value={formData.origin}
                      onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      placeholder="Where are you traveling from?"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Destination</label>
                    <input
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      placeholder="Where do you want to go?"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Number of Travelers</label>
                    <select
                      value={formData.travelers}
                      onChange={(e) => setFormData(prev => ({ ...prev, travelers: e.target.value }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      required
                    >
                      <option value="">Select number of travelers</option>
                      <option value="1">Solo traveler</option>
                      <option value="2">Couple</option>
                      <option value="3-4">Small group (3-4)</option>
                      <option value="5-8">Medium group (5-8)</option>
                      <option value="9+">Large group (9+)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Budget & Style */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="text-gray-800" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Budget & Travel Style</h2>
                  <p className="text-gray-800/70">Help us understand your preferences and budget</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Budget per day (USD)</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      required
                    >
                      <option value="">Select budget range</option>
                      <option value="under-50">Under $50</option>
                      <option value="50-100">$50 - $100</option>
                      <option value="100-200">$100 - $200</option>
                      <option value="200-500">$200 - $500</option>
                      <option value="500+">$500+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Accommodation Type</label>
                    <select
                      value={formData.accommodationType}
                      onChange={(e) => setFormData(prev => ({ ...prev, accommodationType: e.target.value }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      required
                    >
                      <option value="">Select accommodation</option>
                      <option value="luxury-hotel">Luxury Hotel</option>
                      <option value="boutique-hotel">Boutique Hotel</option>
                      <option value="budget-hotel">Budget Hotel</option>
                      <option value="hostel">Hostel</option>
                      <option value="vacation-rental">Vacation Rental</option>
                      <option value="eco-friendly">Eco-Friendly Stay</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Transport Preference</label>
                    <select
                      value={formData.transportPreference}
                      onChange={(e) => setFormData(prev => ({ ...prev, transportPreference: e.target.value }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      required
                    >
                      <option value="">Select transport</option>
                      <option value="plane">Plane</option>
                      <option value="train">Train</option>
                      <option value="car">Car</option>
                      <option value="bus">Bus</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Travel Style</label>
                    <select
                      value={formData.travelStyle}
                      onChange={(e) => setFormData(prev => ({ ...prev, travelStyle: e.target.value }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      required
                    >
                      <option value="">Select style</option>
                      <option value="relaxed">Relaxed & Slow</option>
                      <option value="adventure">Adventure & Active</option>
                      <option value="luxury">Luxury & Comfort</option>
                      <option value="cultural">Cultural & Educational</option>
                      <option value="spontaneous">Spontaneous & Flexible</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Interests & Activities */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="text-gray-800" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">What interests you?</h2>
                  <p className="text-gray-800/70">Select your interests and preferred activities</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Interests (Select all that apply)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {interestOptions.map((interest) => {
                      const Icon = interest.icon;
  return (
                        <motion.button
                          key={interest.id}
                          type="button"
                          onClick={() => handleInterestToggle(interest.id)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            formData.interests.includes(interest.id)
                              ? 'border-neon-cyan bg-neon-cyan/20 text-gray-800'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon size={24} className="mx-auto mb-2" />
                          <span className="text-sm font-medium">{interest.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Activities (Select all that apply)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {activityOptions.map((activity) => (
                      <motion.button
                        key={activity}
                        type="button"
                        onClick={() => handleActivityToggle(activity)}
                        className={`p-3 rounded-lg border transition-all ${
                          formData.activities.includes(activity)
                            ? 'border-neon-cyan bg-neon-cyan/20 text-gray-800'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-sm">{activity}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Food & Special Requirements */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Utensils className="text-gray-800" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Food & Special Requirements</h2>
                  <p className="text-gray-800/70">Tell us about your food preferences and any special needs</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Food Preferences</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {foodOptions.map((food) => (
                      <motion.button
                        key={food}
                        type="button"
                        onClick={() => handleFoodToggle(food)}
                        className={`p-3 rounded-lg border transition-all ${
                          formData.foodPreferences.includes(food)
                            ? 'border-neon-cyan bg-neon-cyan/20 text-gray-800'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-sm">{food}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Dietary Restrictions</label>
                    <textarea
                      value={formData.dietaryRestrictions.join(', ')}
                      onChange={(e) => setFormData(prev => ({ ...prev, dietaryRestrictions: e.target.value.split(', ') }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      placeholder="Any allergies or dietary restrictions?"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Special Occasions</label>
                    <input
                      type="text"
                      value={formData.specialOccasions}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialOccasions: e.target.value }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      placeholder="Birthday, anniversary, etc."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Final Preferences */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wand2 className="text-gray-800" size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Final Preferences</h2>
                  <p className="text-gray-800/70">A few last details to perfect your experience</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Travel Pace</label>
                    <select
                      value={formData.pace}
                      onChange={(e) => setFormData(prev => ({ ...prev, pace: e.target.value }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      required
                    >
                      <option value="">Select pace</option>
                      <option value="slow">Slow & Relaxed</option>
                      <option value="moderate">Moderate</option>
                      <option value="fast">Fast & Packed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Group Type</label>
                    <select
                      value={formData.groupType}
                      onChange={(e) => setFormData(prev => ({ ...prev, groupType: e.target.value }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      required
                    >
                      <option value="">Select group type</option>
                      <option value="solo">Solo Traveler</option>
                      <option value="couple">Couple</option>
                      <option value="friends">Friends</option>
                      <option value="family">Family</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Weather Preference</label>
                    <select
                      value={formData.weatherPreference}
                      onChange={(e) => setFormData(prev => ({ ...prev, weatherPreference: e.target.value }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    >
                      <option value="">No preference</option>
                      <option value="warm">Warm & Sunny</option>
                      <option value="cool">Cool & Mild</option>
                      <option value="cold">Cold & Snowy</option>
                      <option value="tropical">Tropical</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Language Preference</label>
                    <select
                      value={formData.languagePreference}
                      onChange={(e) => setFormData(prev => ({ ...prev, languagePreference: e.target.value }))}
                      className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 text-gray-800 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    >
                      <option value="">No preference</option>
                      <option value="english">English</option>
                      <option value="spanish">Spanish</option>
                      <option value="french">French</option>
                      <option value="local">Local Language</option>
          </select>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <motion.button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg border transition-all ${
                  currentStep === 1
                    ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-purple-400 hover:bg-purple-50'
                }`}
                whileHover={currentStep > 1 ? { scale: 1.02 } : {}}
                whileTap={currentStep > 1 ? { scale: 0.98 } : {}}
              >
                Previous
              </motion.button>

              {currentStep < totalSteps ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-gray-800 font-semibold rounded-lg shadow-lg hover:scale-105 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Next
                  <ArrowRight className="inline ml-2" size={16} />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isGenerating}
                  className={`px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg transition-all ${
                    isGenerating ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'
                  }`}
                  whileHover={!isGenerating ? { scale: 1.05 } : {}}
                  whileTap={!isGenerating ? { scale: 0.95 } : {}}
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline mr-2"
                      >
                        <Wand2 size={16} />
                      </motion.div>
                      Generating Your Perfect Itinerary...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="inline mr-2" size={16} />
                      Get My Perfect Itinerary
                    </>
                  )}
                </motion.button>
              )}
            </div>
        </form>
        </motion.div>
      </div>
    </div>
  );
}


