/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/calculator/page.tsx
'use client';

import React, { useState, useMemo } from 'react';

const ProjectCalculatorPage: React.FC = () => {
  // --- Realistic Freelance Pricing (2024) ---
  const websiteTypeConfig = {
    landing: {
      label: 'Landing Page or Static Website',
      baseCost: 300,    // $300-500 for basic site
      costPerPage: 40,   // $40-60 per extra page
      minPages: 1,
      maxPages: 10,
      description: 'Simple website to showcase your business or services'
    },
    ecommerce: {
      label: 'E-commerce Store',
      baseCost: 1000,    // $1000-1800 base
      costPerProduct: 4, // $4-8 per product (after first 20)
      minProducts: 1,
      maxProducts: 200,
      description: 'Online store with shopping cart and payments'
    },
    advanced: {
      label: 'Custom Web Application',
      baseCost: 2000,    // $2000-3500 base
      description: 'Tailored solutions with custom functionality'
    },
  };

  const featuresData = [
    { name: 'User Authentication', value: 'auth', cost: 100, description: 'Login/registration system' },
    { name: 'Admin Dashboard', value: 'admin_panel', cost: 150, description: 'Content management interface' },
    { name: 'Payment Gateway', value: 'payment_gateway', cost: 200, description: 'Stripe/PayPal integration' },
    { name: 'Blog Section', value: 'blog_section', cost: 80, description: 'Simple article publishing' },
    { name: 'Contact Forms', value: 'forms', cost: 50, description: 'Advanced form builder' },
    { name: 'Multilanguage', value: 'multilanguage', cost: 120, description: '2-3 language support' },
    { name: 'API Integration', value: 'api_integration', cost: 150, description: 'Connect external services' },
    { name: 'Media Gallery', value: 'gallery', cost: 60, description: 'Image/video display system' }
  ];

  const designOptions = [
    { 
      name: 'Template Design', 
      value: 'template', 
      multiplier: 1.0, 
      description: 'Customized premium template' 
    },
    { 
      name: 'Custom Design', 
      value: 'custom', 
      multiplier: 1.3, 
      description: 'Fully original UI/UX design' 
    }
  ];

  // Exchange rates (unchanged from original)
  const exchangeRates = { 'USD': 1, 'MXN': 17.0, 'EUR': 0.93, 'GBP': 0.79 };
  const currencySymbols = { 'USD': '$', 'MXN': 'MX$', 'EUR': '€', 'GBP': '£' };

  // --- Original State Management ---
  const [selectedWebsiteType, setSelectedWebsiteType] = useState<keyof typeof websiteTypeConfig>('landing');
  const [numPages, setNumPages] = useState(websiteTypeConfig.landing.minPages);
  const [numProducts, setNumProducts] = useState(websiteTypeConfig.ecommerce.minProducts);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedDesign, setSelectedDesign] = useState(designOptions[0].value);
  const [customFeaturesText, setCustomFeaturesText] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<keyof typeof currencySymbols>('USD');

  // --- Cost Calculation (Updated Logic) ---
  const totalCostUSD = useMemo(() => {
    const config = websiteTypeConfig[selectedWebsiteType];
    let baseCost = config.baseCost;

    // Type-specific calculations
    if (selectedWebsiteType === 'landing') {
      if ('costPerPage' in config) {
        baseCost += (numPages - config.minPages) * config.costPerPage;
      }
    } 
    else if (selectedWebsiteType === 'ecommerce') {
      const extraProducts = Math.max(0, numProducts - 20);
      if ('costPerProduct' in config) {
        baseCost += extraProducts * config.costPerProduct;
      }
    }

    // Features total
    const featuresCost = selectedFeatures.reduce((sum, feature) => {
      return sum + (featuresData.find(f => f.value === feature)?.cost || 0);
    }, 0);

    // Apply design multiplier
    const design = designOptions.find(d => d.value === selectedDesign);
    return (baseCost + featuresCost) * (design?.multiplier || 1);
  }, [selectedWebsiteType, numPages, numProducts, selectedFeatures, selectedDesign]);

  // Currency conversion (unchanged)
  const displayCost = useMemo(() => {
    return totalCostUSD * (exchangeRates[selectedCurrency] || 1);
  }, [totalCostUSD, selectedCurrency]);

  // Feature toggle handler (unchanged)
  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedFeatures(prev => 
      checked ? [...prev, value] : prev.filter(f => f !== value)
    );
  };

  // --- Original UI Markup (Styled Exactly As Before) ---
  return (
    <div className="flex flex-col items-center p-4 md:p-8 min-h-[calc(100vh-64px)]">
      <div className="p-6 md:p-8 bg-transparent backdrop-blur-md rounded-xl shadow-2xl border border-[#00FFC6]/20 text-white w-full max-w-7xl mx-auto">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-vibrant-teal text-center drop-shadow-md">
          Web Project Cost Calculator
        </h3>
        
        {/* 1. Website Type Selection (Original Styling) */}
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
                      setNumPages(websiteTypeConfig.landing.minPages);
                      setNumProducts(websiteTypeConfig.ecommerce.minProducts);
                    }}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 mr-3
                    ${selectedWebsiteType === typeKey ? 'border-vibrant-teal bg-vibrant-teal' : 'border-gray-500'}`
                  }>
                    {selectedWebsiteType === typeKey && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                  </div>
                  <div>
                    <span className="text-lg font-medium block">{config.label}</span>
                    <span className="text-sm text-gray-400 block mt-1">{config.description}</span>
                    <span className="text-xs text-vibrant-teal mt-1">
                      Base: {currencySymbols[selectedCurrency]}{config.baseCost * exchangeRates[selectedCurrency]}
                      {typeKey === 'landing' && 'costPerPage' in config && ` + ${currencySymbols[selectedCurrency]}${config.costPerPage * exchangeRates[selectedCurrency]}/page`}
                      {typeKey === 'ecommerce' && ` (first 20 products)`}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>

          {/* Dynamic Quantity Inputs */}
          {selectedWebsiteType === 'landing' && (
            <div className="mt-6 p-4 border border-gray-700 rounded-lg bg-gray-800/30">
              <label className="block text-gray-100 text-lg font-semibold mb-3">
                Number of Pages: <span className="text-vibrant-teal">{numPages}</span>
              </label>
              <input
                type="range"
                min={websiteTypeConfig.landing.minPages}
                max={websiteTypeConfig.landing.maxPages}
                value={numPages}
                onChange={(e) => setNumPages(Number(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-lg"
              />
            </div>
          )}

          {selectedWebsiteType === 'ecommerce' && (
            <div className="mt-6 p-4 border border-gray-700 rounded-lg bg-gray-800/30">
              <label className="block text-gray-100 text-lg font-semibold mb-3">
                Number of Products: <span className="text-vibrant-teal">{numProducts}</span>
                {numProducts > 20 && (
                  <span className="text-sm text-gray-400 ml-2">
                    (Extra: {currencySymbols[selectedCurrency]}
                    {websiteTypeConfig.ecommerce.costPerProduct * exchangeRates[selectedCurrency]}/product)
                  </span>
                )}
              </label>
              <input
                type="range"
                min={websiteTypeConfig.ecommerce.minProducts}
                max={websiteTypeConfig.ecommerce.maxProducts}
                value={numProducts}
                onChange={(e) => setNumProducts(Number(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer range-lg"
              />
            </div>
          )}
        </div>

        {/* 2. Features Section (Original Styling) */}
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
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-1 mr-3
                  ${selectedFeatures.includes(feature.value) ? 'border-bright-orange bg-bright-orange' : 'border-gray-500'}`
                }>
                  {selectedFeatures.includes(feature.value) && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                <div>
                  <span className="text-lg font-medium block">{feature.name}</span>
                  <span className="text-sm text-gray-400 block mt-1">{feature.description}</span>
                  <span className="text-xs text-vibrant-teal mt-1">
                    +{currencySymbols[selectedCurrency]}
                    {(feature.cost * exchangeRates[selectedCurrency]).toFixed(2)}
                  </span>
                </div>
              </label>
            ))}
          </div>

          {/* Custom Features Notes */}
          <div className="mt-8">
            <label className="block text-gray-100 text-xl font-semibold mb-3 border-b border-gray-600 pb-3">
              3. Special Requirements:
            </label>
            <textarea
              value={customFeaturesText}
              onChange={(e) => setCustomFeaturesText(e.target.value)}
              className="w-full p-4 rounded-lg bg-[#1a1b26] text-gray-200 border border-gray-700 focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal outline-none transition-colors duration-200 text-base"
              placeholder="e.g. Custom animations, specific API integrations..."
              rows={4}
            ></textarea>
          </div>
        </div>

        {/* 3. Design Options (Original Styling) */}
        <div className="mb-8 p-5 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
          <label className="block text-gray-100 text-xl font-semibold mb-4 border-b border-gray-600 pb-3">
            4. Design Complexity:
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
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 mr-3
                  ${selectedDesign === design.value ? 'border-accent-purple bg-accent-purple' : 'border-gray-500'}`
                }>
                  {selectedDesign === design.value && <div className="w-2.5 h-2.5 rounded-full bg-white"></div>}
                </div>
                <div>
                  <span className="text-lg font-medium block">{design.name}</span>
                  <span className="text-sm text-gray-400 block mt-1">{design.description}</span>
                  {design.multiplier > 1 && (
                    <span className="text-xs text-vibrant-teal mt-1">
                      Price multiplier: {design.multiplier}x
                    </span>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Cost Display (Original Styling) */}
        <div className="mt-10 p-6 md:p-8 bg-gradient-to-r from-vibrant-teal to-bright-orange text-black rounded-xl shadow-2xl text-center transform hover:scale-[1.01] transition-transform duration-300">
          <h4 className="text-2xl md:text-3xl font-bold mb-3 text-white">Estimated Project Cost:</h4>
          <div className="flex flex-col items-center md:flex-row md:justify-center gap-2 md:gap-4 mb-4">
            <p className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-lg leading-tight">
              {currencySymbols[selectedCurrency]}{displayCost.toLocaleString(undefined, { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 2 
              })}
            </p>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value as keyof typeof currencySymbols)}
              className="p-2 md:p-3 rounded-lg bg-[#1a1b26] text-white border border-gray-600 focus:border-vibrant-teal focus:ring-1 focus:ring-vibrant-teal outline-none text-base md:text-xl"
            >
              {Object.keys(exchangeRates).map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          <p className="text-sm md:text-base mt-4 text-gray-200 font-semibold">
            *Estimate includes basic implementation. Final quote may vary based on specific requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCalculatorPage;