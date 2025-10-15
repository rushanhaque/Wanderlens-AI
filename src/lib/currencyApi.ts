// Currency converter API service
// Using exchangerate-api.com (free tier available)

const CURRENCY_API_KEY = process.env.NEXT_PUBLIC_CURRENCY_API_KEY || 'demo_key';
const CURRENCY_BASE_URL = 'https://v6.exchangerate-api.com/v6';

export interface CurrencyRate {
  from: string;
  to: string;
  rate: number;
  amount: number;
  result: number;
}

export interface CurrencyData {
  base: string;
  rates: { [key: string]: number };
  lastUpdated: string;
}

const popularCurrencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' }
];

export async function getCurrencyRates(baseCurrency: string = 'USD'): Promise<CurrencyData> {
  try {
    // For demo purposes, return mock data if no API key
    if (CURRENCY_API_KEY === 'demo_key') {
      return getMockCurrencyData(baseCurrency);
    }

    const response = await fetch(`${CURRENCY_BASE_URL}/${CURRENCY_API_KEY}/latest/${baseCurrency}`);
    
    if (!response.ok) {
      throw new Error('Currency data not available');
    }
    
    const data = await response.json();
    
    return {
      base: data.base_code,
      rates: data.conversion_rates,
      lastUpdated: data.time_last_update_utc
    };
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    return getMockCurrencyData(baseCurrency);
  }
}

export async function convertCurrency(
  from: string, 
  to: string, 
  amount: number
): Promise<CurrencyRate> {
  try {
    // For demo purposes, return mock data if no API key
    if (CURRENCY_API_KEY === 'demo_key') {
      return getMockConversion(from, to, amount);
    }

    const response = await fetch(
      `${CURRENCY_BASE_URL}/${CURRENCY_API_KEY}/pair/${from}/${to}/${amount}`
    );
    
    if (!response.ok) {
      throw new Error('Currency conversion not available');
    }
    
    const data = await response.json();
    
    return {
      from: data.base_code,
      to: data.target_code,
      rate: data.conversion_rate,
      amount: data.amount,
      result: data.conversion_result
    };
  } catch (error) {
    console.error('Error converting currency:', error);
    return getMockConversion(from, to, amount);
  }
}

export function getPopularCurrencies() {
  return popularCurrencies;
}

// Mock data for demo purposes
function getMockCurrencyData(baseCurrency: string): CurrencyData {
  const mockRates: { [key: string]: number } = {
    USD: 1.0,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    CAD: 1.25,
    AUD: 1.35,
    CHF: 0.92,
    CNY: 6.45,
    INR: 75.0,
    BRL: 5.2
  };

  // Convert all rates relative to base currency
  const baseRate = mockRates[baseCurrency] || 1;
  const convertedRates: { [key: string]: number } = {};
  
  Object.keys(mockRates).forEach(currency => {
    convertedRates[currency] = mockRates[currency] / baseRate;
  });

  return {
    base: baseCurrency,
    rates: convertedRates,
    lastUpdated: new Date().toISOString()
  };
}

function getMockConversion(from: string, to: string, amount: number): CurrencyRate {
  const mockRates: { [key: string]: number } = {
    USD: 1.0,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    CAD: 1.25,
    AUD: 1.35,
    CHF: 0.92,
    CNY: 6.45,
    INR: 75.0,
    BRL: 5.2
  };

  const fromRate = mockRates[from] || 1;
  const toRate = mockRates[to] || 1;
  const rate = toRate / fromRate;
  const result = amount * rate;

  return {
    from,
    to,
    rate,
    amount,
    result: Math.round(result * 100) / 100
  };
}
