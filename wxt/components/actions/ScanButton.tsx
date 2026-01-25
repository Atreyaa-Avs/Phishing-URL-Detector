import React from "react";

interface ScanButtonProps {
  url: string;
}

const ScanButton: React.FC<ScanButtonProps> = ({ url }) => {
  return (
    <button
      onClick={() =>
        window.open(
          `https://www.virustotal.com/gui/search/${encodeURIComponent(url)}`,
          "_blank",
          "noopener,noreferrer",
        )
      }
      className="flex text-sm justify-center items-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-md cursor-pointer transition"
    >
      🔍 Verify on VirusTotal
    </button>
  );
};

export default ScanButton;
