# API Setup Instructions

This application uses external APIs for enhanced functionality. While the app works with demo data, you can get real-time data by setting up the following APIs:

## Required Environment Variables

Create a `.env.local` file in the `web` directory with the following variables:

```bash
# Weather API Configuration
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key_here

# Currency API Configuration  
NEXT_PUBLIC_CURRENCY_API_KEY=your_exchangerate_api_key_here
```

## API Setup Instructions

### 1. Weather API (OpenWeatherMap)

1. Visit [OpenWeatherMap API](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env.local` file as `NEXT_PUBLIC_WEATHER_API_KEY`

**Features enabled with real API:**
- Real-time weather data for any city
- 5-day weather forecast
- Accurate temperature, humidity, and wind data

### 2. Currency API (ExchangeRate-API)

1. Visit [ExchangeRate-API](https://exchangerate-api.com)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env.local` file as `NEXT_PUBLIC_CURRENCY_API_KEY`

**Features enabled with real API:**
- Real-time currency exchange rates
- Live currency conversion
- Support for 160+ currencies

## Demo Mode

If no API keys are provided, the application will use mock data for demonstration purposes. This allows you to see all features working without requiring API setup.

## Testing the Features

### Weather Widget
- Displays current weather and 5-day forecast
- Works with demo data or real API data
- Responsive design with smooth animations

### Currency Converter
- Convert between popular currencies
- Real-time exchange rates (with API key)
- Interactive swap functionality
- Popular conversion shortcuts

### Surprise Me Button
- Generates random itineraries
- Works completely offline
- No API key required

## Troubleshooting

1. **Weather data not loading**: Check your OpenWeatherMap API key
2. **Currency conversion failing**: Verify your ExchangeRate-API key
3. **Demo data showing**: This is normal if no API keys are configured

## Production Deployment

For production deployment, make sure to:
1. Set up real API keys
2. Configure proper error handling
3. Implement rate limiting
4. Add proper loading states
5. Consider caching strategies
