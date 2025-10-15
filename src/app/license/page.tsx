"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Shield, FileText, Download, Upload, CheckCircle, 
  AlertCircle, Clock, MapPin, Camera,
  Wifi, Battery, Users, Eye, EyeOff, Settings,
  Globe, Lock, Unlock, Key
} from "lucide-react";

interface License {
  id: string;
  name: string;
  type: "visa" | "permit" | "license" | "certificate";
  country: string;
  issueDate: string;
  expiryDate: string;
  status: "valid" | "expiring" | "expired";
  documentUrl: string;
  requirements: string[];
}

interface Permission {
  id: string;
  name: string;
  description: string;
  granted: boolean;
  required: boolean;
  category: "location" | "camera" | "microphone" | "storage" | "network";
  lastUsed: string;
}

export default function LicensePage() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [showAddLicense, setShowAddLicense] = useState(false);

  const countries = [
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "CA", name: "Canada", flag: "🇨🇦" }
  ];

  useEffect(() => {
    // Mock licenses data
    setLicenses([
      {
        id: "1",
        name: "Tourist Visa",
        type: "visa",
        country: "India",
        issueDate: "2024-01-15",
        expiryDate: "2024-07-15",
        status: "valid",
        documentUrl: "/documents/visa.pdf",
        requirements: ["Passport", "Photograph", "Travel Insurance"]
      },
      {
        id: "2",
        name: "International Driving License",
        type: "license",
        country: "India",
        issueDate: "2023-12-01",
        expiryDate: "2024-12-01",
        status: "valid",
        documentUrl: "/documents/driving-license.pdf",
        requirements: ["National Driving License", "Passport", "Application Form"]
      },
      {
        id: "3",
        name: "Travel Insurance",
        type: "certificate",
        country: "India",
        issueDate: "2024-01-01",
        expiryDate: "2024-12-31",
        status: "valid",
        documentUrl: "/documents/insurance.pdf",
        requirements: ["Medical Document", "Travel Details"]
      }
    ]);

    // Mock permissions data
    setPermissions([
      {
        id: "1",
        name: "Location Access",
        description: "Access your location for navigation and local recommendations",
        granted: true,
        required: true,
        category: "location",
        lastUsed: "2024-01-20"
      },
      {
        id: "2",
        name: "Camera Access",
        description: "Take photos and scan documents",
        granted: true,
        required: false,
        category: "camera",
        lastUsed: "2024-01-19"
      },
      {
        id: "3",
        name: "Camera Access",
        description: "Voice commands and audio notes",
        granted: false,
        required: false,
        category: "microphone",
        lastUsed: "Never"
      },
      {
        id: "4",
        name: "Storage Access",
        description: "Save documents and photos locally",
        granted: true,
        required: true,
        category: "storage",
        lastUsed: "2024-01-20"
      },
      {
        id: "5",
        name: "Network Access",
        description: "Sync data and get real-time updates",
        granted: true,
        required: true,
        category: "network",
        lastUsed: "2024-01-20"
      }
    ]);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid": return "text-green-400 bg-green-500/20";
      case "expiring": return "text-yellow-400 bg-yellow-500/20";
      case "expired": return "text-red-400 bg-red-500/20";
      default: return "text-white/70 bg-white/10";
    }
  };

  const getPermissionIcon = (category: string) => {
    switch (category) {
      case "location": return MapPin;
      case "camera": return Camera;
      case "microphone": return Camera;
      case "storage": return FileText;
      case "network": return Wifi;
      default: return Settings;
    }
  };

  const getLicenseIcon = (type: string) => {
    switch (type) {
      case "visa": return Globe;
      case "permit": return Key;
      case "license": return FileText;
      case "certificate": return Shield;
      default: return FileText;
    }
  };

  const togglePermission = (id: string) => {
    setPermissions(prev => prev.map(permission => 
      permission.id === id 
        ? { ...permission, granted: !permission.granted }
        : permission
    ));
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-night-900">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-night-900/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">License & Permissions</h1>
              <p className="text-white/70 text-sm">Manage your travel documents and app permissions</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg">
                <Shield className="text-green-400" size={16} />
                <span className="text-sm">Secure Storage</span>
              </div>
              <button className="p-2 border border-white/20 rounded-lg hover:bg-white/10">
                <Settings size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Licenses Section */}
          <div className="lg:col-span-2">
            <div className="bg-night-800/60 rounded-xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Travel Documents</h2>
                <button
                  onClick={() => setShowAddLicense(true)}
                  className="px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-cyan text-night-900 font-semibold rounded-lg shadow-glow"
                >
                  Add Document
                </button>
              </div>

              {/* Country Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/90 mb-2">Filter by Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg focus:border-neon-cyan focus:outline-none"
                >
                  {countries.map(country => (
                    <option key={country.code} value={country.name}>
                      {country.flag} {country.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Licenses List */}
              <div className="space-y-4">
                {licenses
                  .filter(license => license.country === selectedCountry)
                  .map((license) => {
                    const daysUntilExpiry = getDaysUntilExpiry(license.expiryDate);
                    const Icon = getLicenseIcon(license.type);
                    
                    return (
                      <motion.div
                        key={license.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-neon-cyan/30 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-neon-purple/20 rounded-lg">
                            <Icon size={24} className="text-neon-purple" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{license.name}</h3>
                                <p className="text-white/70 text-sm">{license.country}</p>
                              </div>
                              <div className="text-right">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(license.status)}`}>
                                  {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
                                </span>
                                {daysUntilExpiry <= 30 && daysUntilExpiry > 0 && (
                                  <div className="text-xs text-yellow-400 mt-1">
                                    Expires in {daysUntilExpiry} days
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                              <div>
                                <span className="text-white/70">Issued:</span>
                                <span className="ml-2">{license.issueDate}</span>
                              </div>
                              <div>
                                <span className="text-white/70">Expires:</span>
                                <span className="ml-2">{license.expiryDate}</span>
                              </div>
                            </div>
                            
                            <div className="mb-4">
                              <div className="text-sm font-medium text-white/90 mb-2">Requirements:</div>
                              <div className="flex flex-wrap gap-2">
                                {license.requirements.map((req, index) => (
                                  <span key={index} className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded">
                                    {req}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
                                <Eye size={16} />
                                View
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
                                <Download size={16} />
                                Download
                              </button>
                              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
                                <Upload size={16} />
                                Renew
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Permissions Section */}
          <div className="lg:col-span-1">
            <div className="bg-night-800/60 rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-bold mb-6">App Permissions</h2>
              
              <div className="space-y-4">
                {permissions.map((permission) => {
                  const Icon = getPermissionIcon(permission.category);
                  
                  return (
                    <div key={permission.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <Icon size={20} className="text-white/70" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{permission.name}</h4>
                            <button
                              onClick={() => togglePermission(permission.id)}
                              className={`w-8 h-4 rounded-full transition-colors ${
                                permission.granted ? "bg-neon-cyan" : "bg-white/20"
                              }`}
                            >
                              <div className={`w-3 h-3 bg-white rounded-full transition-transform ${
                                permission.granted ? "translate-x-4" : "translate-x-0.5"
                              }`} />
                            </button>
                          </div>
                          
                          <p className="text-sm text-white/70 mb-2">{permission.description}</p>
                          
                          <div className="flex items-center justify-between text-xs">
                            <span className={`px-2 py-1 rounded ${
                              permission.required 
                                ? "bg-red-500/20 text-red-400" 
                                : "bg-white/10 text-white/70"
                            }`}>
                              {permission.required ? "Required" : "Optional"}
                            </span>
                            <span className="text-white/50">Last used: {permission.lastUsed}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Security Status */}
            <div className="mt-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="text-green-400" size={20} />
                <h3 className="font-semibold">Security Status</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <span>All documents encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <span>Secure cloud backup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <span>Two-factor authentication</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 bg-night-800/60 rounded-xl p-4 border border-white/10">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <Globe size={18} />
                    <span>Check Visa Requirements</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText size={18} />
                    <span>Apply for New License</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <Shield size={18} />
                    <span>Emergency Contact Setup</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
