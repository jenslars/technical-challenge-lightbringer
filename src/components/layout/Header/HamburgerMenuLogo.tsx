import React from "react";

interface HamburgerMenuProps {
  isOpen?: boolean;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen = false }) => (
  <div className="flex items-center justify-center w-10 h-10 cursor-pointer">
    <div className="relative w-6 h-6">
      {/* Hamburger lines */}
      <span 
        className={`absolute left-0 w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
          isOpen ? 'rotate-45 top-3' : 'top-1'
        }`}
      />
      <span 
        className={`absolute left-0 w-6 h-0.5 bg-gray-900 transition-all duration-300 top-3 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span 
        className={`absolute left-0 w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
          isOpen ? '-rotate-45 top-3' : 'top-5'
        }`}
      />
    </div>
  </div>
);

export default HamburgerMenu;