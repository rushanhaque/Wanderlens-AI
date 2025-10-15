// Weather API service using OpenWeatherMap API
// You'll need to get a free API key from https://openweathermap.org/api

const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY || 'demo_key';
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  city: string;
  country: string;
}

export interface WeatherForecast {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  try {
    // For demo purposes, return mock data if no API key
    if (WEATHER_API_KEY === 'demo_key') {
      return getMockWeatherData(city);
    }

    const response = await fetch(
      `${WEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    
    const data = await response.json();
    
    return {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
      city: data.name,
      country: data.sys.country
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    return getMockWeatherData(city);
  }
}

export async function getWeatherForecast(city: string): Promise<WeatherForecast[]> {
  try {
    // For demo purposes, return mock data if no API key
    if (WEATHER_API_KEY === 'demo_key') {
      return getMockForecastData(city);
    }

    const response = await fetch(
      `${WEATHER_BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather forecast not available');
    }
    
    const data = await response.json();
    
    // Group forecast by day and get daily summaries
    const dailyForecasts: { [key: string]: { dt_txt: string; main: { temp: number; humidity: number }; weather: { description: string; icon: string }[]; wind: { speed: number } }[] } = {};
    
    data.list.forEach((item: { dt_txt: string; main: { temp: number; humidity: number }; weather: { description: string; icon: string }[]; wind: { speed: number } }) => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
      }
      dailyForecasts[date].push(item);
    });
    
    return Object.keys(dailyForecasts).slice(0, 5).map(date => {
      const dayData = dailyForecasts[date];
      const temps = dayData.map(item => item.main.temp);
      const descriptions = dayData.map(item => item.weather[0].description);
      
      return {
        date,
        temperature: {
          min: Math.round(Math.min(...temps)),
          max: Math.round(Math.max(...temps))
        },
        description: descriptions[Math.floor(descriptions.length / 2)],
        icon: dayData[Math.floor(dayData.length / 2)].weather[0].icon,
        humidity: dayData[0].main.humidity,
        windSpeed: dayData[0].wind.speed
      };
    });
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    return getMockForecastData(city);
  }
}

// Mock data for demo purposes
function getMockWeatherData(_city: string): WeatherData {
  const mockData = {
    temperature: Math.floor(Math.random() * 15) + 15, // 15-30°C
    description: ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy', 'Clear'][Math.floor(Math.random() * 5)],
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
    icon: ['01d', '02d', '03d', '04d', '09d', '10d', '11d'][Math.floor(Math.random() * 7)],
    city,
    country: 'Demo'
  };
  
  return mockData;
}

function getMockForecastData(city: string): WeatherForecast[] {
  const forecasts: WeatherForecast[] = [];
  const today = new Date();
  
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    forecasts.push({
      date: date.toISOString().split('T')[0],
      temperature: {
        min: Math.floor(Math.random() * 10) + 10,
        max: Math.floor(Math.random() * 15) + 20
      },
      description: ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy', 'Clear'][Math.floor(Math.random() * 5)],
      icon: ['01d', '02d', '03d', '04d', '09d', '10d', '11d'][Math.floor(Math.random() * 7)],
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 15) + 5
    });
  }
  
  return forecasts;
}
