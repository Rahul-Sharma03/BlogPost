import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <div className="w-16 h-16 border-4 border-gray-300  rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-700">Loading...</p>
    </div>
  );
};

export default LoadingPage;