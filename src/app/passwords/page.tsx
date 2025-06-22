// src/app/passwords/page.tsx

'use client';

import React, { useState, useCallback, useEffect } from 'react';

const PasswordGeneratorPage: React.FC = () => {
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
  };

  const randomizeArray = useCallback((arr: string[]) => {
    const arrayCopy = [...arr];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
  }, []);

  const generatePassword = useCallback(() => {
    let validChars = '';
    const selectedCharTypes = [];

    if (includeUppercase) {
      validChars += charSets.uppercase;
      selectedCharTypes.push(charSets.uppercase);
    }
    if (includeLowercase) {
      validChars += charSets.lowercase;
      selectedCharTypes.push(charSets.lowercase);
    }
    if (includeNumbers) {
      validChars += charSets.numbers;
      selectedCharTypes.push(charSets.numbers);
    }
    if (includeSymbols) {
      validChars += charSets.symbols;
      selectedCharTypes.push(charSets.symbols);
    }

    if (!validChars || passwordLength < selectedCharTypes.length) {
      setGeneratedPassword('Adjust length and options!');
      setCopyStatus('');
      return;
    }

    let passwordArray: string[] = [];

    // Ensure at least one character from each selected type is included
    for (let i = 0; i < selectedCharTypes.length; i++) {
        passwordArray.push(selectedCharTypes[i][Math.floor(Math.random() * selectedCharTypes[i].length)]);
    }

    // Fill the rest of the password length with random characters from all selected types
    for (let i = passwordArray.length; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      passwordArray.push(validChars[randomIndex]);
    }

    // Randomize the entire array to mix character types
    passwordArray = randomizeArray(passwordArray);

    setGeneratedPassword(passwordArray.join(''));
    setCopyStatus('');
  }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols, randomizeArray]);

  const copyToClipboard = () => {
    if (generatedPassword && generatedPassword !== 'Adjust length and options!') {
      const el = document.createElement('textarea');
      el.value = generatedPassword;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 2000);
    } else {
        setCopyStatus('Nothing to copy.');
        setTimeout(() => setCopyStatus(''), 2000);
    }
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]); // Regenerate password when options change

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-64px)]">
      {/* Main container with transparent/blurred background and wider max-width */}
      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 text-white w-full max-w-7xl"> {/* Wider: max-w-7xl, transparent/blurred background */}
        <h3 className="text-4xl font-extrabold mb-8 text-vibrant-teal text-center drop-shadow-md">
          Secure Password Generator
        </h3>
        <p className="text-gray-200 mb-8 text-center text-lg max-w-2xl mx-auto">
          Create robust and random passwords with customization options for enhanced security.
        </p>

        {/* Generated Password */}
        <div className="mb-8">
          <label className="block text-gray-100 text-xl font-semibold mb-4">Your Secure Password:</label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-transparent backdrop-blur-sm rounded-lg border border-gray-700 shadow-md"> {/* Transparent/blurred inner background */}
            <input
              type="text"
              readOnly
              value={generatedPassword}
              className="flex-1 p-4 bg-transparent text-gray-200 text-xl font-mono outline-none cursor-text select-all break-words"
              placeholder="Generate your password..."
              aria-label="Generated password"
            />
            <button
              onClick={copyToClipboard}
              className="flex-shrink-0 bg-vibrant-teal text-white font-semibold py-3 px-6 rounded-b-lg sm:rounded-l-none sm:rounded-r-lg text-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-inner hover:brightness-110"
              aria-label="Copy password"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
                <path d="M192,32H96A16,16,0,0,0,80,48V64H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H160a16,16,0,0,0,16-16V192h32a16,16,0,0,0,16-16V48A16,16,0,0,0,192,32ZM96,48h80a16,16,0,0,1,16,16v80H176a16,16,0,0,0-16,16v32H48V80H80ZM208,176H176V96h32Z"></path>
              </svg>
              <span className="whitespace-nowrap">{copyStatus || 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Password Length */}
        <div className="mb-8 p-6 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700"> {/* Transparent/blurred inner background */}
          <label htmlFor="length" className="block text-gray-100 text-xl font-semibold mb-4">
            Password Length: <span className="text-vibrant-teal">{passwordLength}</span>
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              id="length"
              min="6"
              max="32"
              value={passwordLength}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
              className="flex-1 h-2 rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-runnable-track]:bg-gray-700 [&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-lg [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-bright-orange [&::-webkit-slider-runnable-track]:to-gray-700"
                style={{ backgroundSize: `${((passwordLength - 6) / (32 - 6)) * 100}% 100%` }}
              aria-valuenow={passwordLength}
              aria-valuemin={6}
              aria-valuemax={32}
            />
          </div>
        </div>

        {/* Inclusion Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-transparent backdrop-blur-sm rounded-xl shadow-inner border border-gray-700"> {/* Transparent/blurred inner background */}
          <label className="flex items-center p-4 rounded-lg cursor-pointer bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="hidden"
            />
            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mr-3
              ${includeUppercase ? 'border-bright-orange bg-bright-orange' : 'border-gray-500'}`
            }>
              {includeUppercase && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
            <span className="ml-3 text-gray-200 text-lg">Include Uppercase (A-Z)</span>
          </label>
          <label className="flex items-center p-4 rounded-lg cursor-pointer bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="hidden"
            />
            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mr-3
              ${includeLowercase ? 'border-bright-orange bg-bright-orange' : 'border-gray-500'}`
            }>
              {includeLowercase && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
            <span className="ml-3 text-gray-200 text-lg">Include Lowercase (a-z)</span>
          </label>
          <label className="flex items-center p-4 rounded-lg cursor-pointer bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="hidden"
            />
            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mr-3
              ${includeNumbers ? 'border-bright-orange bg-bright-orange' : 'border-gray-500'}`
            }>
              {includeNumbers && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
            <span className="ml-3 text-gray-200 text-lg">Include Numbers (0-9)</span>
          </label>
          <label className="flex items-center p-4 rounded-lg cursor-pointer bg-gray-800/50 border border-gray-700 hover:bg-gray-700/50 transition-colors duration-200">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="hidden"
            />
            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mr-3
              ${includeSymbols ? 'border-bright-orange bg-bright-orange' : 'border-gray-500'}`
            }>
              {includeSymbols && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </div>
            <span className="ml-3 text-gray-200 text-lg">Include Symbols (!@#$)</span>
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full bg-bright-orange text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transition-transform duration-300 hover:scale-[1.01] flex items-center justify-center space-x-3 hover:brightness-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 256" fill="currentColor">
            <path d="M208,80H176V56a48,48,0,0,0-96,0V80H48A16,16,0,0,0,32,96V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V96A16,16,0,0,0,208,80ZM96,56a32,32,0,0,1,64,0V80H96ZM208,208H48V96H208Z"></path>
          </svg>
          <span>Generate New Password</span>
        </button>
      </div>
    </div>
  );
};

export default PasswordGeneratorPage;