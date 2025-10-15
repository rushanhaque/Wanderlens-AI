"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets } from "lucide-react";
import { getCurrentWeather, getWeatherForecast, WeatherData, WeatherForecast } from "@/lib/weatherApi";

interface WeatherWidgetProps {
  city?: string;
  className?: string;
}

export default function WeatherWidget({ city = "New York", className = "" }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [currentWeather, weatherForecast] = await Promise.all([
          getCurrentWeather(city),
          getWeatherForecast(city)
        ]);
        
        setWeather(currentWeather);
        setForecast(weatherForecast);
      } catch (err) {
        setError("Failed to load weather data");
        console.error("Weather fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ size: number; className?: string }> } = {
      "01d": Sun,
      "01n": Sun,
      "02d": Cloud,
      "02n": Cloud,
      "03d": Cloud,
      "03n": Cloud,
      "04d": Cloud,
      "04n": Cloud,
      "09d": CloudRain,
      "09n": CloudRain,
      "10d": CloudRain,
      "10n": CloudRain,
      "11d": CloudRain,
      "11n": CloudRain,
      "13d": CloudSnow,
      "13n": CloudSnow,
    };
    
    return iconMap[iconCode] || Cloud;
  };

  const getWeatherColor = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('sun') || desc.includes('clear')) return 'from-yellow-400 to-orange-500';
    if (desc.includes('cloud')) return 'from-gray-400 to-gray-600';
    if (desc.includes('rain')) return 'from-blue-400 to-blue-600';
    if (desc.includes('snow')) return 'from-blue-200 to-blue-400';
    return 'from-gray-400 to-gray-600';
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-gray-100 rounded-xl p-6 ${className}`}
      >
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
        </div>
      </motion.div>
    );
  }

  if (error || !weather) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-red-100 border border-red-300 rounded-xl p-6 ${className}`}
      >
        <p className="text-red-600 text-sm">Weather data unavailable</p>
      </motion.div>
    );
  }

  const WeatherIcon = getWeatherIcon(weather.icon);
  const weatherColor = getWeatherColor(weather.description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${weatherColor} rounded-xl p-6 text-white ${className}`}
    >
      {/* Current Weather */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">{weather.city}</h3>
          <p className="text-sm opacity-90 capitalize">{weather.description}</p>
        </div>
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <WeatherIcon size={48} className="opacity-90" />
        </motion.div>
      </div>

      {/* Temperature */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-4xl font-bold mb-2"
        >
          {weather.temperature}°C
        </motion.div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Wind size={16} className="opacity-80" />
          <span className="text-sm">{weather.windSpeed} km/h</span>
        </div>
        <div className="flex items-center gap-2">
          <Droplets size={16} className="opacity-80" />
          <span className="text-sm">{weather.humidity}%</span>
        </div>
      </div>

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-3 opacity-90">5-Day Forecast</h4>
          <div className="space-y-2">
            {forecast.slice(0, 5).map((day, index) => {
              const DayIcon = getWeatherIcon(day.icon);
              const dayName = new Date(day.date).toLocaleDateString('en', { weekday: 'short' });
              
              return (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between py-2 border-b border-white/20 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs w-8">{dayName}</span>
                    <DayIcon size={16} className="opacity-80" />
                    <span className="text-xs capitalize">{day.description}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">{day.temperature.max}°</span>
                    <span className="text-xs opacity-60">{day.temperature.min}°</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
}
