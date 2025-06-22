// src/app/calculator/page.tsx

'use client'; // Essential for state management and event handlers

import React, { useState, useMemo } from 'react';
// Removed Navbar and BackgroundNeumorphic imports as they are in layout.tsx

const ProjectCalculatorPage: React.FC = () => {
  // Definición de las opciones y sus costos base
  const projectTypes = [
    { name: 'Landing Page', cost: 500 },
    { name: 'Blog Personal', cost: 800 },
    { name: 'E-commerce Pequeño (hasta 20 productos)', cost: 1500 },
    { name: 'Aplicación Web Compleja (CRM, SaaS)', cost: 3000 },
  ];

  const functionalities = [
    { name: 'Autenticación de Usuarios', cost: 400 },
    { name: 'Panel de Administración', cost: 700 },
    { name: 'Pasarela de Pago (ej. Stripe, PayPal)', cost: 600 },
    { name: 'Integración de API de Terceros', cost: 350 },
    { name: 'Sistema de Notificaciones (Email/SMS)', cost: 250 },
    { name: 'Soporte Multi-idioma', cost: 300 },
    { name: 'Optimización SEO Básica', cost: 200 },
    { name: 'Funcionalidad de Búsqueda', cost: 300 },
    { name: 'Galería de Imágenes/Videos Avanzada', cost: 200 },
  ];

  const designComplexities = [
    { name: 'Básico (Plantilla Adaptada)', multiplier: 1.0 },
    { name: 'Medio (Diseño Semi-Personalizado)', multiplier: 1.3 },
    { name: 'Personalizado (Diseño Único)', multiplier: 1.8 },
  ];

  // Tasas de cambio (fijas para la demo)
  const exchangeRates: { [key: string]: number } = {
    'USD': 1,
    'MXN': 17.0,
    'EUR': 0.93,
    'CNY': 7.25,
    'GBP': 0.79,
    'JPY': 158.0,
  };

  // Símbolos de moneda para mostrar
  const currencySymbols: { [key: string]: string } = {
    'USD': '$',
    'MXN': 'MX$',
    'EUR': '€',
    'CNY': '¥',
    'GBP': '£',
    'JPY': '¥',
  };

  // Estados para las selecciones del usuario
  const [selectedProjectType, setSelectedProjectType] = useState(projectTypes[0].name);
  const [selectedFunctionalities, setSelectedFunctionalities] = useState<string[]>([]);
  const [selectedDesignComplexity, setSelectedDesignComplexity] = useState(designComplexities[0].name);
  const [customFeaturesText, setCustomFeaturesText] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Estado para la moneda seleccionada


  // Calcular el costo total dinámicamente
  const totalCostUSD = useMemo(() => {
    const baseCost = projectTypes.find(type => type.name === selectedProjectType)?.cost || 0;
    const functionalitiesCost = selectedFunctionalities.reduce((sum, funcName) => {
      return sum + (functionalities.find(func => func.name === funcName)?.cost || 0);
    }, 0);
    const designMultiplier = designComplexities.find(design => design.name === selectedDesignComplexity)?.multiplier || 1.0;

    return (baseCost + functionalitiesCost) * designMultiplier;
  }, [selectedProjectType, selectedFunctionalities, selectedDesignComplexity]);

  // Convertir el costo a la moneda seleccionada
  const displayCost = useMemo(() => {
    const rate = exchangeRates[selectedCurrency] || 1;
    return totalCostUSD * rate;
  }, [totalCostUSD, selectedCurrency, exchangeRates]);

  // Manejar cambios en las funcionalidades seleccionadas
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
          Calculadora de Costo de Proyectos Web
        </h3>
        <p className="text-gray-200 mb-8 text-center text-lg max-w-2xl mx-auto">
          Obtén una estimación aproximada del presupuesto para tu próximo proyecto web, ajustando las características y la complejidad.
        </p>

        {/* Sección: Tipo de Proyecto */}
        <div className="mb-10 p-6 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
          <label className="block text-gray-100 text-xl font-semibold mb-4 border-b border-gray-600 pb-3">
            1. Selecciona el Tipo de Proyecto:
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
                  className="hidden" // Oculta el radio button nativo
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

        {/* Sección: Funcionalidades Adicionales */}
        <div className="mb-10 p-6 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
          <label className="block text-gray-100 text-xl font-semibold mb-4 border-b border-gray-600 pb-3">
            2. Elige Funcionalidades Adicionales:
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
                  className="hidden" // Oculta el checkbox nativo
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
                  3. Otras características/notas (opcional):
              </label>
              <textarea
                  id="customFeatures"
                  rows={4}
                  value={customFeaturesText}
                  onChange={(e) => setCustomFeaturesText(e.target.value)}
                  className="w-full p-4 rounded-lg bg-[#1a1b26] text-gray-200 border border-gray-700 focus:border-vibrant-teal focus:ring-2 focus:ring-vibrant-teal outline-none transition-colors duration-200 text-base"
                  placeholder="Ej. Integración con CRM específico, reportes de analíticas avanzados, funcionalidades de IA..."
              ></textarea>
              <p className="text-gray-500 text-sm mt-2">Esta sección es para tus notas; no afecta el cálculo automático del presupuesto.</p>
          </div>
        </div>

        {/* Sección: Complejidad del Diseño */}
        <div className="mb-10 p-6 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700">
          <label className="block text-gray-100 text-xl font-semibold mb-4 border-b border-gray-600 pb-3">
            4. Define la Complejidad del Diseño:
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
                  className="hidden" // Oculta el radio button nativo
                />
                {/* Custom Radio Button */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mr-3
                  ${selectedDesignComplexity === design.name ? 'border-accent-purple bg-accent-purple' : 'border-gray-500'}`
                }>
                  {selectedDesignComplexity === design.name && (
                    <div className="w-3 h-3 rounded-full bg-white"></div> // Changed to white
                  )}
                </div>
                <span className="text-lg font-medium flex-1">
                  {design.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sección: Resultado de la Estimación */}
        <div className="mt-12 p-8 bg-gradient-to-r from-vibrant-teal to-bright-orange text-black rounded-xl shadow-2xl text-center transform hover:scale-[1.01] transition-transform duration-300">
          <h4 className="text-3xl font-bold mb-3 text-white">Costo Estimado del Proyecto:</h4>
          <div className="flex items-center justify-center mb-4">
            <p className="text-7xl font-extrabold text-white drop-shadow-lg leading-tight mr-4">
              {currencySymbols[selectedCurrency]}{displayCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            {/* Selector de Moneda */}
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
            *Esta es una estimación aproximada y puede variar significativamente según los detalles específicos del proyecto, el proveedor, la ubicación y el alcance final. Siempre se recomienda una consulta detallada.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCalculatorPage;