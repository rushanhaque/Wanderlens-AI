"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Plus, Edit, Trash2, MapPin, Clock, DollarSign, Star, 
  Heart, Share2, Download, Calendar, Plane, Hotel, Utensils,
  Camera, Mountain, Car, Train, Bus, Navigation, Users,
  ChevronDown, ChevronUp, DragHandleDots2, CheckCircle,
  AlertCircle, Info, Zap, Wand2
} from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string;
  type: "hotel" | "restaurant" | "activity" | "transport";
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  location: string;
  cost: number;
  rating: number;
  image: string;
  notes: string;
  completed: boolean;
  essential: boolean;
}

interface Day {
  id: string;
  date: string;
  activities: Activity[];
  totalCost: number;
  totalDuration: number;
}

interface Itinerary {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  days: Day[];
  totalCost: number;
  totalDuration: number;
  travelers: number;
  budget: number;
  preferences: string[];
}

export default function ItineraryPage() {
  const router = useRouter();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user preferences and generate itinerary
  useEffect(() => {
    const loadUserPreferences = () => {
      try {
        const userPrefs = localStorage.getItem('userPreferences');
        if (userPrefs) {
          const preferences = JSON.parse(userPrefs);
          generatePersonalizedItinerary(preferences);
        } else {
          // If no preferences, show default itinerary
          generateDefaultItinerary();
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
        generateDefaultItinerary();
      }
    };

    loadUserPreferences();
  }, []);

  const generatePersonalizedItinerary = (rawPrefs: any) => {
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      // Normalize fields coming from onboarding to what our generators expect
      const preferences = {
        destination: rawPrefs.destination,
        startDate: rawPrefs.startDate,
        endDate: rawPrefs.endDate,
        travelers: rawPrefs.travelers,
        budget: rawPrefs.budget,
        interests: rawPrefs.interests || [],
        // Map travelStyle to energyLevel/personality-ish signals
        energyLevel:
          rawPrefs.travelStyle === 'adventure' ? 'high' :
          rawPrefs.travelStyle === 'relaxed' ? 'low' : 'medium',
        personality:
          rawPrefs.travelStyle === 'adventure' ? ['adventurous'] :
          rawPrefs.travelStyle === 'luxury' ? ['relaxed'] : [],
        // Dining
        diningStyle:
          rawPrefs.budget && Number(rawPrefs.budget) > 200 ? 'fine-dining' :
          (rawPrefs.foodPreferences || []).includes('Street Food') ? 'street-food' : 'casual',
        cuisinePreferences: rawPrefs.foodPreferences || [],
        // Social style
        socialStyle:
          rawPrefs.groupType === 'friends' ? 'social' :
          rawPrefs.groupType === 'solo' ? 'moderate' : 'moderate'
      } as any;

      const personalizedItinerary: Itinerary = {
        id: "personalized-1",
        title: `Perfect ${preferences.destination} Adventure`,
        destination: preferences.destination,
        startDate: preferences.startDate,
        endDate: preferences.endDate,
        travelers: parseInt(preferences.travelers) || 2,
        budget: parseInt(preferences.budget) || 2000,
        preferences: preferences.interests || [],
        totalCost: 0,
        totalDuration: 0,
        days: generateDaysFromPreferences(preferences)
      };
      
      setItinerary(personalizedItinerary);
      setIsLoading(false);
    }, 1500);
  };

  const generateDaysFromPreferences = (preferences: any): Day[] => {
    const days: Day[] = [];
    const startDate = new Date(preferences.startDate);
    const endDate = new Date(preferences.endDate);
    const dayCount = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i < dayCount; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const activities: Activity[] = generateActivitiesForDay(i + 1, preferences);
      const totalCost = activities.reduce((sum, activity) => sum + activity.cost, 0);
      const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0);
      
      days.push({
        id: `day-${i + 1}`,
        date: currentDate.toISOString().split('T')[0],
        activities,
        totalCost,
        totalDuration
      });
    }
    
    return days;
  };

  const generateActivitiesForDay = (dayNumber: number, preferences: any): Activity[] => {
    const activities: Activity[] = [];
    const interests = preferences.interests || [];
    const personality = preferences.personality || [];
    const energyLevel = preferences.energyLevel || 'medium';
    const diningStyle = preferences.diningStyle || 'casual';
    const cuisinePreferences = preferences.cuisinePreferences || [];
    
    // Create diverse activity pools based on preferences
    const morningActivities = getMorningActivities(preferences, dayNumber);
    const lunchActivities = getLunchActivities(preferences, dayNumber);
    const afternoonActivities = getAfternoonActivities(preferences, dayNumber);
    const eveningActivities = getEveningActivities(preferences, dayNumber);
    
    // Select different activities for each day
    if (morningActivities.length > 0) {
      const selectedMorning = morningActivities[dayNumber % morningActivities.length];
      activities.push(selectedMorning);
    }
    
    if (lunchActivities.length > 0) {
      const selectedLunch = lunchActivities[dayNumber % lunchActivities.length];
      activities.push(selectedLunch);
    }
    
    if (afternoonActivities.length > 0) {
      const selectedAfternoon = afternoonActivities[dayNumber % afternoonActivities.length];
      activities.push(selectedAfternoon);
    }
    
    if (eveningActivities.length > 0) {
      const selectedEvening = eveningActivities[dayNumber % eveningActivities.length];
      activities.push(selectedEvening);
    }
    
    return activities;
  };

  const getMorningActivities = (preferences: any, dayNumber: number): Activity[] => {
    const activities: Activity[] = [];
    const interests = preferences.interests || [];
    const personality = preferences.personality || [];
    const energyLevel = preferences.energyLevel || 'medium';
    
    // Adventure/High Energy Activities
    if (energyLevel === 'high' || personality.includes('adventurous')) {
      activities.push(
        {
          id: `morning-${dayNumber}-1`,
          title: "Sunrise Hiking Adventure",
          description: "Conquer scenic trails and enjoy breathtaking sunrise views",
          type: "activity",
          startTime: "06:00",
          endTime: "10:00",
          duration: 240,
          location: preferences.destination,
          cost: 40,
          rating: 4.8,
          image: "/api/placeholder/300/200",
          notes: "Bring hiking boots and water",
          completed: false,
          essential: true
        },
        {
          id: `morning-${dayNumber}-2`,
          title: "Water Sports Experience",
          description: "Try kayaking, paddleboarding, or surfing at local beaches",
          type: "activity",
          startTime: "07:30",
          endTime: "11:00",
          duration: 210,
          location: preferences.destination,
          cost: 55,
          rating: 4.6,
          image: "/api/placeholder/300/200",
          notes: "Equipment provided, bring swimwear",
          completed: false,
          essential: true
        },
        {
          id: `morning-${dayNumber}-3`,
          title: "Cycling City Tour",
          description: "Explore the city on two wheels with a guided bike tour",
          type: "activity",
          startTime: "08:00",
          endTime: "11:30",
          duration: 210,
          location: preferences.destination,
          cost: 35,
          rating: 4.5,
          image: "/api/placeholder/300/200",
          notes: "Helmets and bikes provided",
          completed: false,
          essential: true
        }
      );
    }
    
    // Cultural/Medium Energy Activities
    if (interests.includes('history') || interests.includes('culture')) {
      activities.push(
        {
          id: `morning-${dayNumber}-4`,
          title: "Historic District Walking Tour",
          description: "Discover ancient architecture and local history",
          type: "activity",
          startTime: "09:00",
          endTime: "12:00",
          duration: 180,
          location: preferences.destination,
          cost: 25,
          rating: 4.7,
          image: "/api/placeholder/300/200",
          notes: "Comfortable walking shoes recommended",
          completed: false,
          essential: true
        },
        {
          id: `morning-${dayNumber}-5`,
          title: "Museum & Gallery Visit",
          description: "Explore world-class museums and contemporary art galleries",
          type: "activity",
          startTime: "10:00",
          endTime: "13:00",
          duration: 180,
          location: preferences.destination,
          cost: 20,
          rating: 4.4,
          image: "/api/placeholder/300/200",
          notes: "Audio guides available",
          completed: false,
          essential: true
        },
        {
          id: `morning-${dayNumber}-6`,
          title: "Traditional Craft Workshop",
          description: "Learn local crafts from master artisans",
          type: "activity",
          startTime: "09:30",
          endTime: "12:30",
          duration: 180,
          location: preferences.destination,
          cost: 45,
          rating: 4.6,
          image: "/api/placeholder/300/200",
          notes: "Take home your creation",
          completed: false,
          essential: true
        }
      );
    }
    
    // Relaxed/Low Energy Activities
    if (energyLevel === 'low' || personality.includes('relaxed')) {
      activities.push(
        {
          id: `morning-${dayNumber}-7`,
          title: "Garden & Park Stroll",
          description: "Peaceful walk through botanical gardens and scenic parks",
          type: "activity",
          startTime: "09:00",
          endTime: "11:00",
          duration: 120,
          location: preferences.destination,
          cost: 8,
          rating: 4.3,
          image: "/api/placeholder/300/200",
          notes: "Perfect for photography",
          completed: false,
          essential: true
        },
        {
          id: `morning-${dayNumber}-8`,
          title: "Coffee Culture Experience",
          description: "Visit local cafes and learn about regional coffee traditions",
          type: "activity",
          startTime: "10:00",
          endTime: "12:00",
          duration: 120,
          location: preferences.destination,
          cost: 15,
          rating: 4.2,
          image: "/api/placeholder/300/200",
          notes: "Taste different local blends",
          completed: false,
          essential: true
        },
        {
          id: `morning-${dayNumber}-9`,
          title: "Spa & Wellness Morning",
          description: "Relaxing spa treatment and wellness session",
          type: "activity",
          startTime: "09:00",
          endTime: "12:00",
          duration: 180,
          location: preferences.destination,
          cost: 80,
          rating: 4.8,
          image: "/api/placeholder/300/200",
          notes: "Book in advance",
          completed: false,
          essential: true
        }
      );
    }
    
    return activities;
  };

  const getLunchActivities = (preferences: any, dayNumber: number): Activity[] => {
    const activities: Activity[] = [];
    const diningStyle = preferences.diningStyle || 'casual';
    const cuisinePreferences = preferences.cuisinePreferences || [];
    
    // Fine Dining Options
    if (diningStyle === 'fine-dining') {
      activities.push(
        {
          id: `lunch-${dayNumber}-1`,
          title: "Michelin-Starred Restaurant",
          description: "Experience world-class cuisine at a renowned fine dining establishment",
          type: "restaurant",
          startTime: "12:30",
          endTime: "15:00",
          duration: 150,
          location: preferences.destination,
          cost: 120,
          rating: 4.9,
          image: "/api/placeholder/300/200",
          notes: "Reservations required, dress code applies",
          completed: false,
          essential: true
        },
        {
          id: `lunch-${dayNumber}-2`,
          title: "Chef's Table Experience",
          description: "Intimate dining with the chef preparing dishes tableside",
          type: "restaurant",
          startTime: "13:00",
          endTime: "15:30",
          duration: 150,
          location: preferences.destination,
          cost: 95,
          rating: 4.8,
          image: "/api/placeholder/300/200",
          notes: "Limited seating, book early",
          completed: false,
          essential: true
        }
      );
    }
    
    // Street Food Options
    if (diningStyle === 'street-food') {
      activities.push(
        {
          id: `lunch-${dayNumber}-3`,
          title: "Street Food Market Tour",
          description: "Guided tour of the best street food vendors and local specialties",
          type: "restaurant",
          startTime: "12:00",
          endTime: "14:00",
          duration: 120,
          location: preferences.destination,
          cost: 25,
          rating: 4.6,
          image: "/api/placeholder/300/200",
          notes: "Try multiple vendors for variety",
          completed: false,
          essential: true
        },
        {
          id: `lunch-${dayNumber}-4`,
          title: "Food Truck Festival",
          description: "Sample diverse cuisines from local food trucks and vendors",
          type: "restaurant",
          startTime: "12:30",
          endTime: "14:30",
          duration: 120,
          location: preferences.destination,
          cost: 20,
          rating: 4.4,
          image: "/api/placeholder/300/200",
          notes: "Cash recommended for some vendors",
          completed: false,
          essential: true
        }
      );
    }
    
    // Casual Dining Options
    activities.push(
      {
        id: `lunch-${dayNumber}-5`,
        title: "Local Family Restaurant",
        description: "Authentic home-style cooking in a cozy family-run establishment",
        type: "restaurant",
        startTime: "12:30",
        endTime: "14:00",
        duration: 90,
        location: preferences.destination,
        cost: 35,
        rating: 4.5,
        image: "/api/placeholder/300/200",
        notes: "Try the house specialties",
        completed: false,
        essential: true
      },
      {
        id: `lunch-${dayNumber}-6`,
        title: "Rooftop Dining Experience",
        description: "Enjoy lunch with panoramic city views at a rooftop restaurant",
        type: "restaurant",
        startTime: "13:00",
        endTime: "14:30",
        duration: 90,
        location: preferences.destination,
        cost: 45,
        rating: 4.7,
        image: "/api/placeholder/300/200",
        notes: "Weather dependent, book ahead",
        completed: false,
        essential: true
      },
      {
        id: `lunch-${dayNumber}-7`,
        title: "Cooking Class & Lunch",
        description: "Learn to prepare local dishes and enjoy your culinary creations",
        type: "restaurant",
        startTime: "12:00",
        endTime: "15:00",
        duration: 180,
        location: preferences.destination,
        cost: 65,
        rating: 4.6,
        image: "/api/placeholder/300/200",
        notes: "Take home recipes and techniques",
        completed: false,
        essential: true
      }
    );
    
    return activities;
  };

  const getAfternoonActivities = (preferences: any, dayNumber: number): Activity[] => {
    const activities: Activity[] = [];
    const interests = preferences.interests || [];
    const personality = preferences.personality || [];
    const energyLevel = preferences.energyLevel || 'medium';
    
    // Cultural & Educational Activities
    if (interests.includes('history') || interests.includes('culture')) {
      activities.push(
        {
          id: `afternoon-${dayNumber}-1`,
          title: "Art Gallery & Museum Tour",
          description: "Explore contemporary art galleries and world-class museums",
          type: "activity",
          startTime: "14:00",
          endTime: "17:00",
          duration: 180,
          location: preferences.destination,
          cost: 25,
          rating: 4.6,
          image: "/api/placeholder/300/200",
          notes: "Audio guides available",
          completed: false,
          essential: false
        },
        {
          id: `afternoon-${dayNumber}-2`,
          title: "Cultural Heritage Site",
          description: "Visit UNESCO World Heritage sites and ancient monuments",
          type: "activity",
          startTime: "15:00",
          endTime: "18:00",
          duration: 180,
          location: preferences.destination,
          cost: 30,
          rating: 4.7,
          image: "/api/placeholder/300/200",
          notes: "Guided tours available",
          completed: false,
          essential: false
        },
        {
          id: `afternoon-${dayNumber}-3`,
          title: "Traditional Craft Workshop",
          description: "Learn pottery, weaving, or other local crafts from master artisans",
          type: "activity",
          startTime: "14:30",
          endTime: "17:30",
          duration: 180,
          location: preferences.destination,
          cost: 50,
          rating: 4.5,
          image: "/api/placeholder/300/200",
          notes: "Take home your creation",
          completed: false,
          essential: false
        }
      );
    }
    
    // Nature & Outdoor Activities
    if (interests.includes('nature') || interests.includes('outdoor')) {
      activities.push(
        {
          id: `afternoon-${dayNumber}-4`,
          title: "Nature Reserve Hike",
          description: "Explore protected natural areas and spot local wildlife",
          type: "activity",
          startTime: "14:00",
          endTime: "17:00",
          duration: 180,
          location: preferences.destination,
          cost: 20,
          rating: 4.8,
          image: "/api/placeholder/300/200",
          notes: "Bring binoculars for wildlife viewing",
          completed: false,
          essential: false
        },
        {
          id: `afternoon-${dayNumber}-5`,
          title: "Botanical Garden Tour",
          description: "Discover exotic plants and beautiful garden landscapes",
          type: "activity",
          startTime: "15:00",
          endTime: "17:30",
          duration: 150,
          location: preferences.destination,
          cost: 15,
          rating: 4.4,
          image: "/api/placeholder/300/200",
          notes: "Perfect for photography",
          completed: false,
          essential: false
        },
        {
          id: `afternoon-${dayNumber}-6`,
          title: "Beach & Water Activities",
          description: "Relax on pristine beaches or try water sports",
          type: "activity",
          startTime: "14:30",
          endTime: "18:00",
          duration: 210,
          location: preferences.destination,
          cost: 35,
          rating: 4.6,
          image: "/api/placeholder/300/200",
          notes: "Equipment rental available",
          completed: false,
          essential: false
        }
      );
    }
    
    // Shopping & Entertainment
    activities.push(
      {
        id: `afternoon-${dayNumber}-7`,
        title: "Local Market Exploration",
        description: "Browse traditional markets for unique souvenirs and local products",
        type: "activity",
        startTime: "14:00",
        endTime: "16:30",
        duration: 150,
        location: preferences.destination,
        cost: 10,
        rating: 4.3,
        image: "/api/placeholder/300/200",
        notes: "Practice bargaining skills",
        completed: false,
        essential: false
      },
      {
        id: `afternoon-${dayNumber}-8`,
        title: "Live Music & Performance",
        description: "Enjoy traditional music, dance, or theater performances",
        type: "activity",
        startTime: "15:30",
        endTime: "17:30",
        duration: 120,
        location: preferences.destination,
        cost: 30,
        rating: 4.5,
        image: "/api/placeholder/300/200",
        notes: "Check performance schedules",
        completed: false,
        essential: false
      },
      {
        id: `afternoon-${dayNumber}-9`,
        title: "Cooking Class Experience",
        description: "Learn to prepare authentic local dishes with expert chefs",
        type: "activity",
        startTime: "14:00",
        endTime: "17:00",
        duration: 180,
        location: preferences.destination,
        cost: 60,
        rating: 4.7,
        image: "/api/placeholder/300/200",
        notes: "Recipes included to take home",
        completed: false,
        essential: false
      }
    );
    
    return activities;
  };

  const getEveningActivities = (preferences: any, dayNumber: number): Activity[] => {
    const activities: Activity[] = [];
    const personality = preferences.personality || [];
    const energyLevel = preferences.energyLevel || 'medium';
    const socialStyle = preferences.socialStyle || 'moderate';
    
    // Social & High Energy Evening Activities
    if (personality.includes('extrovert') || socialStyle === 'social') {
      activities.push(
        {
          id: `evening-${dayNumber}-1`,
          title: "Night Market & Street Food",
          description: "Explore vibrant night markets and sample local street food",
          type: "activity",
          startTime: "19:00",
          endTime: "22:00",
          duration: 180,
          location: preferences.destination,
          cost: 25,
          rating: 4.6,
          image: "/api/placeholder/300/200",
          notes: "Great for meeting locals and travelers",
          completed: false,
          essential: false
        },
        {
          id: `evening-${dayNumber}-2`,
          title: "Live Music & Bar Hopping",
          description: "Experience local nightlife with live music and craft cocktails",
          type: "activity",
          startTime: "20:00",
          endTime: "23:00",
          duration: 180,
          location: preferences.destination,
          cost: 45,
          rating: 4.4,
          image: "/api/placeholder/300/200",
          notes: "Check venue schedules and dress codes",
          completed: false,
          essential: false
        },
        {
          id: `evening-${dayNumber}-3`,
          title: "Cultural Show & Dinner",
          description: "Enjoy traditional performances followed by fine dining",
          type: "activity",
          startTime: "18:30",
          endTime: "22:30",
          duration: 240,
          location: preferences.destination,
          cost: 75,
          rating: 4.7,
          image: "/api/placeholder/300/200",
          notes: "Reservations recommended",
          completed: false,
          essential: false
        }
      );
    }
    
    // Relaxed & Low Energy Evening Activities
    if (personality.includes('introvert') || energyLevel === 'low') {
      activities.push(
        {
          id: `evening-${dayNumber}-4`,
          title: "Sunset Dinner Cruise",
          description: "Relaxing dinner cruise with panoramic sunset views",
          type: "restaurant",
          startTime: "18:00",
          endTime: "21:00",
          duration: 180,
          location: preferences.destination,
          cost: 85,
          rating: 4.8,
          image: "/api/placeholder/300/200",
          notes: "Weather dependent, book in advance",
          completed: false,
          essential: true
        },
        {
          id: `evening-${dayNumber}-5`,
          title: "Cozy Cafe & Book Reading",
          description: "Unwind at a charming local cafe with a good book",
          type: "restaurant",
          startTime: "19:00",
          endTime: "21:30",
          duration: 150,
          location: preferences.destination,
          cost: 15,
          rating: 4.2,
          image: "/api/placeholder/300/200",
          notes: "Perfect for quiet reflection",
          completed: false,
          essential: true
        },
        {
          id: `evening-${dayNumber}-6`,
          title: "Spa & Wellness Evening",
          description: "Relaxing spa treatment and wellness session",
          type: "activity",
          startTime: "18:00",
          endTime: "21:00",
          duration: 180,
          location: preferences.destination,
          cost: 120,
          rating: 4.9,
          image: "/api/placeholder/300/200",
          notes: "Book treatments in advance",
          completed: false,
          essential: true
        }
      );
    }
    
    // Moderate Energy Evening Activities
    activities.push(
      {
        id: `evening-${dayNumber}-7`,
        title: "Evening City Walk",
        description: "Leisurely stroll through illuminated city streets and landmarks",
        type: "activity",
        startTime: "18:30",
        endTime: "21:00",
        duration: 150,
        location: preferences.destination,
        cost: 10,
        rating: 4.5,
        image: "/api/placeholder/300/200",
        notes: "Perfect for photography",
        completed: false,
        essential: true
      },
      {
        id: `evening-${dayNumber}-8`,
        title: "Rooftop Bar & Skyline Views",
        description: "Enjoy cocktails with stunning city skyline views",
        type: "restaurant",
        startTime: "19:30",
        endTime: "22:00",
        duration: 150,
        location: preferences.destination,
        cost: 35,
        rating: 4.6,
        image: "/api/placeholder/300/200",
        notes: "Dress code may apply",
        completed: false,
        essential: true
      },
      {
        id: `evening-${dayNumber}-9`,
        title: "Traditional Theater Performance",
        description: "Experience local theater, opera, or traditional dance",
        type: "activity",
        startTime: "19:00",
        endTime: "22:00",
        duration: 180,
        location: preferences.destination,
        cost: 50,
        rating: 4.7,
        image: "/api/placeholder/300/200",
        notes: "Check performance schedules",
        completed: false,
        essential: true
      }
    );
    
    return activities;
  };

  const generateDefaultItinerary = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const mockItinerary: Itinerary = {
      id: "1",
      title: "Delhi Heritage Tour",
      destination: "New Delhi, India",
      startDate: "2024-02-15",
      endDate: "2024-02-20",
      travelers: 2,
      budget: 1500,
      totalCost: 0,
      totalDuration: 0,
      preferences: ["Cultural", "Food", "History"],
      days: [
        {
          id: "day1",
          date: "2024-02-15",
          activities: [
            {
              id: "1",
              title: "Arrival at Delhi Airport",
              description: "Flight arrival and airport pickup",
              type: "transport",
              startTime: "10:00",
              endTime: "11:00",
              duration: 60,
              location: "Indira Gandhi International Airport",
              cost: 25,
              rating: 0,
              image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=400&auto=format&fit=crop",
              notes: "Book airport transfer in advance",
              completed: false,
              essential: true
            },
            {
              id: "2",
              title: "Hotel Check-in",
              description: "Check into The Grand Palace Hotel",
              type: "hotel",
              startTime: "12:00",
              endTime: "13:00",
              duration: 60,
              location: "Connaught Place, New Delhi",
              cost: 0,
              rating: 4.8,
              image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop",
              notes: "Early check-in requested",
              completed: false,
              essential: true
            },
            {
              id: "3",
              title: "Lunch at Karim's",
              description: "Traditional Mughlai cuisine",
              type: "restaurant",
              startTime: "13:30",
              endTime: "15:00",
              duration: 90,
              location: "Jama Masjid, Old Delhi",
              cost: 30,
              rating: 4.7,
              image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?q=80&w=400&auto=format&fit=crop",
              notes: "Try the kebabs and biryani",
              completed: false,
              essential: false
            }
          ],
          totalCost: 55,
          totalDuration: 210
        },
        {
          id: "day2",
          date: "2024-02-16",
          activities: [
            {
              id: "4",
              title: "Red Fort Tour",
              description: "Guided tour of the historic Red Fort",
              type: "activity",
              startTime: "09:00",
              endTime: "12:00",
              duration: 180,
              location: "Red Fort, Old Delhi",
              cost: 25,
              rating: 4.5,
              image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=400&auto=format&fit=crop",
              notes: "Book tickets online to avoid queues",
              completed: false,
              essential: true
            },
            {
              id: "5",
              title: "Chandni Chowk Food Walk",
              description: "Street food tour through Old Delhi",
              type: "activity",
              startTime: "13:00",
              endTime: "16:00",
              duration: 180,
              location: "Chandni Chowk, Old Delhi",
              cost: 40,
              rating: 4.8,
              image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop",
              notes: "Wear comfortable walking shoes",
              completed: false,
              essential: false
            }
          ],
          totalCost: 65,
          totalDuration: 360
        }
      ]
    };
    setItinerary(mockItinerary);
    setIsLoading(false);
  }, 1500);
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
  };

  const toggleActivityCompleted = (dayId: string, activityId: string) => {
    if (!itinerary) return;
    
    setItinerary(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        days: prev.days.map(day => 
          day.id === dayId 
            ? {
                ...day,
                activities: day.activities.map(activity =>
                  activity.id === activityId
                    ? { ...activity, completed: !activity.completed }
                    : activity
                )
              }
            : day
        )
      };
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "hotel": return Hotel;
      case "restaurant": return Utensils;
      case "activity": return Camera;
      case "transport": return Plane;
      default: return MapPin;
    }
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  if (isLoading || !itinerary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 text-lg font-semibold">
            {isLoading ? "Generating your perfect itinerary..." : "Loading itinerary..."}
          </p>
          <p className="text-gray-500 text-sm mt-2">This may take a few moments</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{itinerary.title}</h1>
              <p className="text-gray-600 text-sm">{itinerary.destination} • {itinerary.startDate} - {itinerary.endDate}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={generateItinerary}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-cyan text-night-900 font-semibold rounded-lg shadow-glow disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-night-900/30 border-t-night-900 rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    AI Optimize
                  </>
                )}
              </button>
              
              <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10">
                <Share2 size={18} />
              </button>
              <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10">
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Days List */}
          <div className="lg:col-span-1">
            <div className="bg-night-800/60 rounded-xl p-4 border border-white/10 sticky top-24">
              <h3 className="font-semibold mb-4 text-gray-800">Itinerary Days</h3>
              <div className="space-y-2">
                {itinerary.days.map((day, index) => (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDay(day.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedDay === day.id
                        ? "bg-neon-purple/20 border border-neon-purple/30"
                        : "bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-medium">Day {index + 1}</div>
                    <div className="text-sm text-gray-700">{day.date}</div>
                    <div className="text-xs text-gray-600">
                      {day.activities.length} activities • ${day.totalCost} • {formatDuration(day.totalDuration)}
                    </div>
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setShowAddActivity(true)}
                className="w-full mt-4 p-3 border border-dashed border-white/30 rounded-lg hover:border-neon-cyan hover:bg-neon-cyan/5 transition-colors"
              >
                <Plus size={18} className="mx-auto mb-1" />
                <div className="text-sm text-gray-700">Add Day</div>
              </button>
            </div>
          </div>

          {/* Main Content - Day Details */}
          <div className="lg:col-span-3">
            {selectedDay ? (
              (() => {
                const day = itinerary.days.find(d => d.id === selectedDay);
                if (!day) return null;

                return (
                  <motion.div
                    key={selectedDay}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Day Header */}
                    <div className="bg-night-800/60 rounded-xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h2 className="text-2xl font-bold">Day {itinerary.days.findIndex(d => d.id === selectedDay) + 1}</h2>
                          <p className="text-gray-700">{day.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">${day.totalCost}</div>
                          <div className="text-sm text-gray-700">Total Cost</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-semibold">{day.activities.length}</div>
                          <div className="text-sm text-gray-700">Activities</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold">{formatDuration(day.totalDuration)}</div>
                          <div className="text-sm text-gray-700">Duration</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold">
                            {day.activities.filter(a => a.completed).length}/{day.activities.length}
                          </div>
                          <div className="text-sm text-gray-700">Completed</div>
                        </div>
                      </div>
                    </div>

                    {/* Activities Timeline */}
                    <div className="space-y-4">
                      {day.activities.map((activity, index) => {
                        const Icon = getActivityIcon(activity.type);
                        return (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-white rounded-xl p-6 border transition-all hover:shadow-lg ${
                              activity.completed 
                                ? "border-green-200" 
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                  activity.completed 
                                    ? "bg-green-100" 
                                    : "bg-gray-100"
                                }`}>
                                  <Icon size={24} className={activity.completed ? "text-green-600" : "text-gray-600"} />
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-2">
                                  <div>
                                    <h3 className={`font-semibold text-lg text-gray-900 ${
                                      activity.completed ? "line-through text-gray-500" : ""
                                    }`}>
                                      {activity.title}
                                    </h3>
                                    <p className="text-gray-700 text-sm">{activity.description}</p>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => toggleActivityCompleted(day.id, activity.id)}
                                      className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                                        activity.completed 
                                          ? "bg-green-500 border-green-500" 
                                          : "border-gray-300 hover:border-gray-500"
                                      }`}
                                    >
                                      {activity.completed && <CheckCircle size={16} className="text-white" />}
                                    </button>
                                    
                                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                                      <Edit size={16} />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
                                  <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    <span>{formatTime(activity.startTime)} - {formatTime(activity.endTime)}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    <span>{activity.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <DollarSign size={14} />
                                    <span>${activity.cost}</span>
                                  </div>
                                  {activity.rating > 0 && (
                                    <div className="flex items-center gap-1">
                                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                                      <span>{activity.rating}</span>
                                    </div>
                                  )}
                                </div>
                                
                                {activity.notes && (
                                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                    <div className="flex items-start gap-2">
                                      <Info size={16} className="text-blue-600 mt-0.5" />
                                      <p className="text-sm text-gray-700">{activity.notes}</p>
                                    </div>
                                  </div>
                                )}
                                
                                {activity.essential && (
                                  <div className="flex items-center gap-2 text-red-400 text-sm">
                                    <AlertCircle size={16} />
                                    <span>Essential Activity</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Add Activity Button */}
                    <button
                      onClick={() => setShowAddActivity(true)}
                      className="w-full p-6 border border-dashed border-white/30 rounded-xl hover:border-neon-cyan hover:bg-neon-cyan/5 transition-colors"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Plus size={20} />
                        <span>Add Activity</span>
                      </div>
                    </button>
                  </motion.div>
                );
              })()
            ) : (
              <div className="text-center py-12">
                <Calendar size={64} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Select a Day</h3>
                <p className="text-gray-600">Choose a day from the sidebar to view your itinerary</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="mt-12 bg-gradient-to-r from-neon-purple/10 to-neon-cyan/10 rounded-xl p-6 border border-neon-purple/20">
          <div className="flex items-center gap-3 mb-4">
            <Wand2 className="text-neon-cyan" size={24} />
            <h3 className="text-xl font-bold">AI Suggestions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Optimize Route</h4>
              <p className="text-sm text-white/70 mb-3">Reorder activities to minimize travel time</p>
              <button className="text-sm text-neon-cyan hover:underline">Apply Suggestion</button>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Add Buffer Time</h4>
              <p className="text-sm text-white/70 mb-3">Add 30 minutes between activities for flexibility</p>
              <button className="text-sm text-neon-cyan hover:underline">Apply Suggestion</button>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Budget Alert</h4>
              <p className="text-sm text-white/70 mb-3">You're 20% over budget. Consider alternatives</p>
              <button className="text-sm text-neon-cyan hover:underline">View Alternatives</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
