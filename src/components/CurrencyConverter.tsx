"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, RefreshCw, TrendingUp } from "lucide-react";
import { convertCurrency, getPopularCurrencies, CurrencyRate } from "@/lib/currencyApi";

interface CurrencyConverterProps {
  className?: string;
}

export default function CurrencyConverter({ className = "" }: CurrencyConverterProps) {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(100);
  const [conversion, setConversion] = useState<CurrencyRate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const popularCurrencies = getPopularCurrencies();

  const convertAmount = useCallback(async () => {
    if (amount <= 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await convertCurrency(fromCurrency, toCurrency, amount);
      setConversion(result);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      setError("Conversion failed");
      console.error("Currency conversion error:", err);
    } finally {
      setLoading(false);
    }
  }, [fromCurrency, toCurrency, amount]);

  useEffect(() => {
    convertAmount();
  }, [convertAmount]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getCurrencySymbol = (code: string) => {
    const currency = popularCurrencies.find(c => c.code === code);
    return currency?.symbol || code;
  };

  const getCurrencyFlag = (code: string) => {
    const currency = popularCurrencies.find(c => c.code === code);
    return currency?.flag || "🌍";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-100 rounded-xl p-6 ${className}`}
    >
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp size={20} className="text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">Currency Converter</h3>
      </div>

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
          placeholder="Enter amount"
          min="0"
          step="0.01"
        />
      </div>

      {/* Currency Selection */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-600 mb-2">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
          >
            {popularCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code} className="bg-white text-gray-800">
                {currency.flag} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
          >
            {popularCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code} className="bg-white text-gray-800">
                {currency.flag} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center mb-6">
        <motion.button
          onClick={swapCurrencies}
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          className="p-3 bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-all shadow-sm"
        >
          <ArrowRightLeft size={20} className="text-gray-600" />
        </motion.button>
      </div>

      {/* Conversion Result */}
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <RefreshCw className="animate-spin text-green-600" size={20} />
            <span className="ml-2 text-gray-600">Converting...</span>
          </div>
        ) : error ? (
          <div className="text-red-600 text-center py-4">
            <p>{error}</p>
          </div>
        ) : conversion ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {getCurrencySymbol(toCurrency)}{conversion.result.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              {getCurrencyFlag(fromCurrency)} {amount} {fromCurrency} = {getCurrencyFlag(toCurrency)} {conversion.result.toLocaleString()} {toCurrency}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Rate: 1 {fromCurrency} = {conversion.rate.toFixed(4)} {toCurrency}
            </div>
          </motion.div>
        ) : null}
      </div>

      {/* Last Updated */}
      {lastUpdated && (
        <div className="text-xs text-gray-500 text-center">
          Last updated: {lastUpdated}
        </div>
      )}

      {/* Popular Conversions */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Popular Conversions</h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { from: "USD", to: "EUR" },
            { from: "USD", to: "GBP" },
            { from: "EUR", to: "GBP" },
            { from: "USD", to: "JPY" }
          ].map((pair) => (
            <motion.button
              key={`${pair.from}-${pair.to}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setFromCurrency(pair.from);
                setToCurrency(pair.to);
              }}
              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-xs text-gray-600 shadow-sm"
            >
              {pair.from} → {pair.to}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}