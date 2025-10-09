import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-16 text-sky-400">
      <div
        className="w-12 h-12 border-4 border-blue-200 border-t-sky-400 rounded-full animate-spin mb-2"
        role="status"
      ></div>
      <p className="text-lg font-medium">Loading...</p>
    </div>
  );
};

export default Loading;
