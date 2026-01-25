import React from "react";
import RedirectSvg from "@/assets/redirect.svg";

interface VisitButtonProps {
  url: string;
}

const VisitButton: React.FC<VisitButtonProps> = ({ url }) => {
  return (
    <button
      onClick={() =>
        window.open(
          url.startsWith("http") ? url : `https://${url}`,
          "_blank",
          "noopener,noreferrer",
        )
      }
      className="flex justify-center items-center gap-1 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition hover:cursor-pointer"
    >
      <span className="text-base">Visit Website </span>
      <img src={RedirectSvg} alt="Redirect" className="size-4 fill-white" />
    </button>
  );
};

export default VisitButton;
