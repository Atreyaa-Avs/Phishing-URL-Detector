import React from "react";

const ReportButton = () => {
  return (
    <button className="w-full border border-red-300 text-red-600 py-2 rounded-md hover:bg-red-50 cursor-pointer transition">
      ⚠️ Report incorrect classification
    </button>
  );
};

export default ReportButton;
