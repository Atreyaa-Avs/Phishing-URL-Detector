import React from "react";
import CopySvg from "@/assets/copy.svg";

interface CopyButtonProps {
  url: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ url }) => {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(url)}
      className="flex justify-center items-center gap-1 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition hover:cursor-pointer"
    >
      <img src={CopySvg} alt="Copy" className="size-4 fill-white" />
      <span className="text-base">Copy URL </span>
    </button>
  );
};

export default CopyButton;
