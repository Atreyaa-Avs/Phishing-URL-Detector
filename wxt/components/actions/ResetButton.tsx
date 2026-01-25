import React from "react";
import { APIResponse } from "@/types/Response";

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
  return (
    <button
      onClick={onReset}
      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md cursor-pointer transition"
    >
      🔄 Check another URL
    </button>
  );
};

export default ResetButton;
