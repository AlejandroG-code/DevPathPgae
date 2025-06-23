// src/app/calculator/page.tsx

'use client'; // Essential for state management and event handlers

import React, { useState, useMemo } from 'react';
// Navbar and BackgroundNeumorphic imports are handled in layout.tsx

const ProjectCalculatorPage: React.FC = () => {
  // Definition of options and their base costs
  const projectTypes = [
    { name: 'Landing Page', cost: 500 },
    { name: 'Personal Blog', cost: 800 },
    { name: 'Small E-commerce (up to 20 products)', cost: 1500 },
    { name: 'Complex Web Application (CRM, SaaS)', cost: 3000 },
  ];

  const functionalities = [
    { name: 'User Authentication', cost: 400 },
    { name: 'Admin Panel', cost: 700 },
    { name: 'Payment Gateway (e.g. Stripe, PayPal)', cost: 600 },
    { name: 'Third-Party API Integration', cost: 350 },
    { name: 'Notification System (Email/SMS)', cost: 250 },
    { name: 'Multi-language Support', cost: 300 },
    { name: 'Basic SEO Optimization', cost: 200 },
    { name: 'Search Functionality', cost: 300 },
    { name: 'Advanced Image/Video Gallery', cost: 200 },
  ];

  const designComplexities = [
    { name: 'Basic (Adapted Template)', multiplier: 1.0 },
    { name: 'Medium (Semi-Custom Design)', multiplier: 1.3 },
    { name: 'Custom (Unique Design)', multiplier: 1.8 },
  ];

  // Exchange rates (fixed for demo)
  const exchangeRates: { [key: string]: number } = {
    'USD': 1,
    'MXN': 17.0,
    'EUR': 0.93,
    'CNY': 7.25,
    'GBP': 0.79,
    'JPY': 158.0,
  };

  // Currency symbols for display
  const currencySymbols: { [key: string]: string } = {
    'USD': '$',
    'MXN': 'MX$',
    'EUR': '€',
    'CNY': '¥',
    'GBP': '£',
    'JPY': '¥',
  };

  // States for user selections
  const [selectedProjectType, setSelectedProjectType] = useState(projectTypes[0].name);
  const [selectedFunctionalities, setSelectedFunctionalities] = useState<string[]>([]);
  const [selectedDesignComplexity, setSelectedDesignComplexity] = useState(designComplexities[0].name);
  const [customFeaturesText, setCustomFeaturesText] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); // State for the selected currency


  // Calculate total cost dynamically
  const totalCostUSD = useMemo(() => {
    const baseCost = projectTypes.find(type => type.name === selectedProjectType)?.cost || 0;
    const functionalitiesCost = selectedFunctionalities.reduce((sum, funcName) => {
      return sum + (functionalities.find(func => func.name === funcName)?.cost || 0);
    }, 0);
    const designMultiplier = designComplexities.find(design => design.name === selectedDesignComplexity)?.multiplier || 1.0;

    return (baseCost + functionalitiesCost) * designMultiplier;
  }, [selectedProjectType, selectedFunctionalities, selectedDesignComplexity]);

  // Convert cost to the selected currency
  const displayCost = useMemo(() => {
    const rate = exchangeRates[selectedCurrency] || 1;
    return totalCostUSD * rate;
  }, [totalCostUSD, selectedCurrency, exchangeRates]);

  // Handle changes in selected functionalities
  const handleFunctionalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedFunctionalities(prev =>
      checked ? [...prev, value] : prev.filter(func => func !== value)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-64px)]">
      {/* Main container with transparent/blurred background and wider max-width */}
      <div className="p-8 bg-transparent backdrop-blur-md rounded-xl shadow-2xl border border-[#00FFC6]/20 text-white w-full max-w-7xl">
        <h3 className="text-4xl font-extrabold mb-8 text-vibrant-teal text-center drop-shadow-md">
          Web Project Cost Calculator
        </h3>
        <p className="text-gray-200 mb-8 text-center text-lg max-w-2xl mx-auto">
          Get an approximate budget estimate for your next web project, adjusting features and complexity.
        </p>

        {/* Section: Project Type */}
        <div className="mb-10 p-6 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
          <label className="block text-gray-100 text-xl font-semibold mb-4 border-b border-gray-600 pb-3">
            1. Select Project Type:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {projectTypes.map(type => (
              <label
                key={type.name}
                className={`flex items-center p-5 rounded-lg cursor-pointer transition-all duration-300
                  ${selectedProjectType === type.name
                    ? 'bg-gradient-to-r from-vibrant-teal/30 to-transparent border border-vibrant-teal text-white shadow-lg'
                    : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50'}`
                }
              >
                <input
                  type="radio"
                  name="projectType"
                  value={type.name}
                  checked={selectedProjectType === type.name}
                  onChange={(e) => setSelectedProjectType(e.target.value)}
                  className="hidden" // Hides the native radio button
                />
                {/* Custom Radio Button */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mr-3
                  ${selectedProjectType === type.name ? 'border-vibrant-teal bg-vibrant-teal' : 'border-gray-500'}`
                }>
                  {selectedProjectType === type.name && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-lg font-medium flex-1">
                  {type.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Section: Additional Functionalities */}
        <div className="mb-10 p-6 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
          <label className="block text-gray-100 text-xl font-semibold mb-4 border-b border-gray-600 pb-3">
            2. Choose Additional Functionalities:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {functionalities.map(func => (
              <label
                key={func.name}
                className={`flex items-center p-5 rounded-lg cursor-pointer transition-all duration-300
                  ${selectedFunctionalities.includes(func.name)
                    ? 'bg-gradient-to-r from-bright-orange/30 to-transparent border border-bright-orange text-white shadow-lg'
                    : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50'}`
                }
              >
                <input
                  type="checkbox"
                  value={func.name}
                  checked={selectedFunctionalities.includes(func.name)}
                  onChange={handleFunctionalityChange}
                  className="hidden" // Hides the native checkbox
                />
                {/* Custom Checkbox */}
                <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mr-3
                  ${selectedFunctionalities.includes(func.name) ? 'border-bright-orange bg-bright-orange' : 'border-gray-500'}`
                }>
                  {selectedFunctionalities.includes(func.name) && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> {/* White checkmark */}
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                <span className="text-lg font-medium flex-1">
                  {func.name}
                </span>
              </label>
            ))}
          </div>
          <div className="mt-8">
              <label htmlFor="customFeatures" className="block text-gray-100 text-xl font-semibold mb-3 border-b border-gray-600 pb-3">
                  3. Other features/notes (optional):
              </label>
              <textarea
                  id="customFeatures"
                  rows={4}
                  value={customFeaturesText}
                  onChange={(e) => setCustomFeaturesText(e.target.value)}
                  className="w-full p-4 rounded-lg bg-[#1a1b26] text-gray-200 border border-gray-700 focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal outline-none transition-colors duration-200 text-base"
                  placeholder="e.g. Integration with specific CRM, advanced analytics reports, AI functionalities..."
              ></textarea>
              <p className="text-gray-500 text-sm mt-2">This section is for your notes; it does not affect the automatic budget calculation.</p>
          </div>
        </div>

        {/* Section: Design Complexity */}
        <div className="mb-10 p-6 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
          <label className="block text-gray-100 text-xl font-semibold mb-4 border-b border-gray-600 pb-3">
            4. Define Design Complexity:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {designComplexities.map(design => (
              <label
                key={design.name}
                className={`flex items-center p-5 rounded-lg cursor-pointer transition-all duration-300
                  ${selectedDesignComplexity === design.name
                    ? 'bg-gradient-to-r from-accent-purple/30 to-transparent border border-accent-purple text-white shadow-lg'
                    : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50'}`
                }
              >
                <input
                  type="radio"
                  name="designComplexity"
                  value={design.name}
                  checked={selectedDesignComplexity === design.name}
                  onChange={(e) => setSelectedDesignComplexity(e.target.value)}
                  className="hidden" // Hides the native radio button
                />
                {/* Custom Radio Button */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mr-3
                  ${selectedDesignComplexity === design.name ? 'border-accent-purple bg-accent-purple' : 'border-gray-500'}`
                }>
                  {selectedDesignComplexity === design.name && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
                <span className="text-lg font-medium flex-1">
                  {design.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Section: Estimation Result */}
        <div className="mt-12 p-8 bg-gradient-to-r from-vibrant-teal to-bright-orange text-black rounded-xl shadow-2xl text-center transform hover:scale-[1.01] transition-transform duration-300">
          <h4 className="text-3xl font-bold mb-3 text-white">Estimated Project Cost:</h4>
          <div className="flex items-center justify-center mb-4">
            {/* MODIFIED: Responsive font sizing for the price */}
            <p className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg leading-tight mr-4">
              {currencySymbols[selectedCurrency]}{displayCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            {/* Currency Selector */}
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="p-3 rounded-lg bg-[#1a1b26] text-white border border-gray-600 focus:border-vibrant-teal focus:ring-1 focus:ring-vibrant-teal outline-none text-xl font-medium"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`, // White arrow SVG
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.5em 1.5em',
              }}
            >
              {Object.keys(exchangeRates).map(currencyCode => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyCode}
                </option>
              ))}
            </select>
          </div>
          <p className="text-base mt-4 text-gray-200 font-semibold">
            *This is an approximate estimation and may vary significantly based on specific project details, provider, location, and final scope. A detailed consultation is always recommended.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCalculatorPage;