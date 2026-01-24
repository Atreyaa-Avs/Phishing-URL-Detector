import React from "react";
import Logo from "@/assets/logo_3.svg"

const Header = () => {
  return (
    <div className="flex bg-white p-2 w-full justify-between items-center gap-4">
      <img src={Logo} className="w-1/2 h-12" alt="Logo" />
      <div className="w-1/2 bg-orange-600 py-2 px-1 rounded-xl">
        <p className="text-center font-medium text-white text-[0.9rem]">Phishing URL Detector</p>
      </div>
    </div>
  );
};

export default Header;
