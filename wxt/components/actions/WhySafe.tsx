import React, { useState } from "react";

const WhySafe = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50 flex justify-center items-center gap-2 cursor-pointer transition"
      >
        <span>Why is this considered safe?</span>
        <span
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm text-gray-700 border border-gray-200">
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              ✔ No phishing patterns detected
            </li>
            <li className="flex items-center gap-2">✔ SSL certificate valid</li>
            <li className="flex items-center gap-2">
              ✔ Domain age &gt; 1 year
            </li>
            <li className="flex items-center gap-2">✔ No blacklist matches</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default WhySafe;
