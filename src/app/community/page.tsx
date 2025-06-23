// src/app/info/community/page.tsx
import React from 'react';

const CommunityPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-64px)] text-white text-center">
      <div className="bg-transparent backdrop-blur-md p-8 rounded-xl shadow-2xl border border-[#00FFC6]/20 w-full max-w-2xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-4 text-vibrant-teal drop-shadow-lg">
          Community
        </h1>
        <p className="text-gray-200 text-lg">
          Coming soon...
        </p>
      </div>
    </div>
  );
};

export default CommunityPage;