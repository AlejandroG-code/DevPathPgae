// src/app/calculator/page.tsx

'use client';

import React, { useState, useMemo } from 'react';

const ProjectCalculatorPage: React.FC = () => {
  // --- Configuration Data (ADJUSTED PRICES) ---

  const websiteTypeConfig = {
    landing: {
      label: 'Landing Page or Static Website',
      baseCost: 300, // Reduced from 800
      costPerPage: 50, // Reduced from 100
      minPages: 1,
      maxPages: 10,
      description: 'Ideal for showcasing your business, services, or personal brand on a few static pages.'
    },
    ecommerce: {
      label: 'E-commerce Store',
      baseCost: 1200, // Reduced from 2500
      costPerProduct: 10, // Reduced from 20 (cost per product beyond 20)
      minProducts: 1,
      maxProducts: 200,
      description: 'Sell products online with a secure shopping cart, product listings, and payment integration.'
    },
    advanced: {
      label: 'Custom Web Application (CRM, SaaS, Platform)',
      baseCost: 3000, // Reduced from 6000
      description: 'For unique business needs, custom functionalities, and complex user interactions.'
    },
  };

  const featuresData = [
    { name: 'User Authentication (Login/Register)', value: 'auth', cost: 200, description: 'Allow users to create accounts and manage profiles.' }, // Reduced from 400
    { name: 'Admin Panel / Dashboard', value: 'admin_panel', cost: 350, description: 'Interface for managing content, users, and site settings.' }, // Reduced from 700
    { name: 'Payment Gateway Integration (Stripe, PayPal)', value: 'payment_gateway', cost: 300, description: 'Enable online payments for products or services.' }, // Reduced from 600
    { name: 'Advanced SEO Optimization', value: 'seo_advanced', cost: 150, description: 'In-depth SEO to improve search engine rankings.' }, // Reduced from 300
    { name: 'Integrated Blog Section', value: 'blog_section', cost: 120, description: 'Add a dynamic blog for content marketing.' }, // Reduced from 250
    { name: 'Advanced Contact Forms / Lead Capture', value: 'forms', cost: 100, description: 'Sophisticated forms with conditional logic and integrations.' }, // Reduced from 200
    { name: 'Newsletter Subscription System', value: 'newsletter', cost: 75, description: 'Collect emails for marketing campaigns.' }, // Reduced from 150
    { name: 'Multilanguage Support', value: 'multilanguage', cost: 150, description: 'Make your website accessible in multiple languages.' }, // Reduced from 300
    { name: 'Third-Party API Integration', value: 'api_integration', cost: 175, description: 'Connect with external services (e.g., CRM, analytics).' }, // Reduced from 350
    { name: 'Advanced Image/Video Gallery', value: 'gallery', cost: 100, description: 'Sophisticated media display with filtering and lightbox.' }, // Reduced from 200
  ];

  const designOptions = [
    { name: 'Basic Design (Template-based)', value: 'basic', multiplier: 1.0, description: 'A clean, functional design adapted from a professional template.' },
    { name: 'Advanced Design (Custom & Unique)', value: 'advanced', multiplier: 1.5, description: 'A bespoke design tailored to your brand, with unique UI/UX.' }, // Multiplier reduced from 1.6
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

  // --- State Variables ---
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<keyof typeof websiteTypeConfig>('landing');
  const [numPages, setNumPages] = useState(websiteTypeConfig.landing.minPages);
  const [numProducts, setNumProducts] = useState(websiteTypeConfig.ecommerce.minProducts);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedDesign, setSelectedDesign] = useState(designOptions[0].value);
  const [customFeaturesText, setCustomFeaturesText] = useState(''); // Text area for notes
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // --- Calculation Logic ---
  const totalCostUSD = useMemo(() => {
    let baseCost = 0;
    const typeConfig = websiteTypeConfig[selectedWebsiteType];

    // Calculate base cost based on website type and quantity
    if (selectedWebsiteType === 'landing') {
      if ('minPages' in typeConfig) {
        baseCost = typeConfig.baseCost + (numPages - typeConfig.minPages) * typeConfig.costPerPage;
      }
    } else if (selectedWebsiteType === 'ecommerce') {
      // For e-commerce, base cost covers initial products, then add per product beyond a threshold (e.g., 20 products)
      const productsOverThreshold = Math.max(0, numProducts - 20); // Still charging for products over 20
      if ('costPerProduct' in typeConfig) {
        baseCost = typeConfig.baseCost + productsOverThreshold * typeConfig.costPerProduct;
      }
    } else if (selectedWebsiteType === 'advanced') {
      baseCost = typeConfig.baseCost;
    }

    // Add cost for selected features
    const featuresCost = selectedFeatures.reduce((sum, featureValue) => {
      return sum + (featuresData.find(f => f.value === featureValue)?.cost || 0);
    }, 0);

    // Apply design multiplier
    const designMultiplier = designOptions.find(d => d.value === selectedDesign)?.multiplier || 1.0;

    return (baseCost + featuresCost) * designMultiplier;
  }, [selectedWebsiteType, numPages, numProducts, selectedFeatures, selectedDesign]);

  // Convert cost to the selected currency for display
  const displayCost = useMemo(() => {
    const rate = exchangeRates[selectedCurrency] || 1;
    return totalCostUSD * rate;
  }, [totalCostUSD, selectedCurrency, exchangeRates]);

  // --- Handlers ---
  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedFeatures(prev =>
      checked ? [...prev, value] : prev.filter(feature => feature !== value)
    );
  };

  // --- Render UI ---
  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-[calc(100vh-64px)]">
      <div className="p-6 md:p-8 bg-transparent backdrop-blur-md rounded-xl shadow-2xl border border-[#00FFC6]/20 text-white w-full max-w-7xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-vibrant-teal text-center drop-shadow-md">
          Web Project Cost Calculator
        </h3>
        <p className="text-gray-200 text-base md:text-lg mb-8 text-center max-w-2xl mx-auto">
          Get an approximate budget estimate for your next web project by selecting your requirements.
        </p>

        {/* Section: 1. Select Website Type */}
        <div className="mb-8 p-5 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
          <label className="block text-gray-100 text-xl font-semibold mb-4 border-b border-gray-600 pb-3">
            1. Select Website Type:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {Object.keys(websiteTypeConfig).map(typeKey => {
              const config = websiteTypeConfig[typeKey as keyof typeof websiteTypeConfig];
              return (
                <label
                  key={typeKey}
                  className={`flex items-start p-4 rounded-lg cursor-pointer transition-all duration-300
                    ${selectedWebsiteType === typeKey
                      ? 'bg-gradient-to-r from-vibrant-teal/30 to-transparent border border-vibrant-teal text-white shadow-lg'
                      : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50'}`
                  }
                >
                  <input
                    type="radio"
                    name="websiteType"
                    value={typeKey}
                    checked={selectedWebsiteType === typeKey}
                    onChange={(e) => {
                      setSelectedWebsiteType(e.target.value as keyof typeof websiteTypeConfig);
                      // Reset counts when switching type to avoid carrying over irrelevant values
                      setNumPages(websiteTypeConfig.landing.minPages);
                      setNumProducts(websiteTypeConfig.ecommerce.minProducts);
                    }}
                    className="hidden" // Hides the native radio button
                  />
                  {/* Custom Radio Button */}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 mr-3
                    ${selectedWebsiteType === typeKey ? 'border-vibrant-teal bg-vibrant-teal' : 'border-gray-500'}`
                  }>
                    {selectedWebsiteType === typeKey && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div>
                    <span className="text-lg font-medium block">{config.label}</span>
                    <span className="text-sm text-gray-400 block mt-1">{config.description}</span>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Conditional Sliders based on Website Type */}
          {selectedWebsiteType === 'landing' && (
            <div className="mt-6 p-4 border border-gray-700 rounded-lg bg-gray-800/30">
              <label htmlFor="numPages" className="block text-gray-100 text-lg font-semibold mb-3">
                Number of Pages: <span className="text-vibrant-teal">{numPages}</span>
              </label>
              <input
                type="range"
                id="numPages"
                min={websiteTypeConfig.landing.minPages}
                max={websiteTypeConfig.landing.maxPages}
                value={numPages}
                onChange={(e) => setNumPages(Number(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-vibrant-teal [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-vibrant-teal"
              />
            </div>
          )}

          {selectedWebsiteType === 'ecommerce' && (
            <div className="mt-6 p-4 border border-gray-700 rounded-lg bg-gray-800/30">
              <label htmlFor="numProducts" className="block text-gray-100 text-lg font-semibold mb-3">
                Number of Products: <span className="text-vibrant-teal">{numProducts}</span>
              </label>
              <input
                type="range"
                id="numProducts"
                min={websiteTypeConfig.ecommerce.minProducts}
                max={websiteTypeConfig.ecommerce.maxProducts}
                value={numProducts}
                onChange={(e) => setNumProducts(Number(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-lg [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-vibrant-teal [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-vibrant-teal"
              />
            </div>
          )}
        </div>

        {/* Section: 2. Add Extra Features */}
        <div className="mb-8 p-5 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
          <label className="block text-gray-100 text-xl font-semibold mb-4 border-b border-gray-600 pb-3">
            2. Add Extra Features:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {featuresData.map(feature => (
              <label
                key={feature.value}
                className={`flex items-start p-4 rounded-lg cursor-pointer transition-all duration-300
                  ${selectedFeatures.includes(feature.value)
                    ? 'bg-gradient-to-r from-bright-orange/30 to-transparent border border-bright-orange text-white shadow-lg'
                    : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50'}`
                }
              >
                <input
                  type="checkbox"
                  value={feature.value}
                  checked={selectedFeatures.includes(feature.value)}
                  onChange={handleFeatureChange}
                  className="hidden" // Hides the native checkbox
                />
                {/* Custom Checkbox */}
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-1 mr-3
                  ${selectedFeatures.includes(feature.value) ? 'border-bright-orange bg-bright-orange' : 'border-gray-500'}`
                }>
                  {selectedFeatures.includes(feature.value) && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                <div>
                  <span className="text-lg font-medium block">{feature.name}</span>
                  <span className="text-sm text-gray-400 block mt-1">{feature.description}</span>
                </div>
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
              placeholder="e.g. Integration with specific CRM, advanced analytics reports, custom animations..."
            ></textarea>
            <p className="text-gray-500 text-sm mt-2">This section is for your notes; it does not affect the automatic budget calculation.</p>
          </div>
        </div>

        {/* Section: 4. Define Design Complexity */}
        <div className="mb-8 p-5 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
          <label className="block text-gray-100 text-xl font-semibold mb-4 border-b border-gray-600 pb-3">
            4. Define Design Complexity:
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {designOptions.map(design => (
              <label
                key={design.value}
                className={`flex items-start p-4 rounded-lg cursor-pointer transition-all duration-300
                  ${selectedDesign === design.value
                    ? 'bg-gradient-to-r from-accent-purple/30 to-transparent border border-accent-purple text-white shadow-lg'
                    : 'bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50'}`
                }
              >
                <input
                  type="radio"
                  name="designComplexity"
                  value={design.value}
                  checked={selectedDesign === design.value}
                  onChange={(e) => setSelectedDesign(e.target.value)}
                  className="hidden" // Hides the native radio button
                />
                {/* Custom Radio Button */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 mr-3
                  ${selectedDesign === design.value ? 'border-accent-purple bg-accent-purple' : 'border-gray-500'}`
                }>
                  {selectedDesign === design.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                  )}
                </div>
                <div>
                  <span className="text-lg font-medium block">{design.name}</span>
                  <span className="text-sm text-gray-400 block mt-1">{design.description}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Section: Estimated Project Cost */}
        <div className="mt-10 p-6 md:p-8 bg-gradient-to-r from-vibrant-teal to-bright-orange text-black rounded-xl shadow-2xl text-center transform hover:scale-[1.01] transition-transform duration-300">
          <h4 className="text-2xl md:text-3xl font-bold mb-3 text-white">Estimated Project Cost:</h4>
          <div className="flex flex-col items-center md:flex-row md:justify-center gap-2 md:gap-4 mb-4">
            <p className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg leading-tight">
              {currencySymbols[selectedCurrency]}{displayCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="p-2 md:p-3 rounded-lg bg-[#1a1b26] text-white border border-gray-600 focus:border-vibrant-teal focus:ring-1 focus:ring-vibrant-teal outline-none text-base md:text-xl"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
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
          <p className="text-sm md:text-base mt-4 text-gray-200 font-semibold">
            *This is an approximate estimation and may vary significantly based on specific project details, provider, location, and final scope. A detailed consultation is always recommended.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCalculatorPage;