import React from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

// Navigation items data
const NAVIGATION_ITEMS = [
  { label: 'Home', href: '#', type: 'link' },
  { label: 'About Us', href: '#', type: 'link' },
  { label: 'Resources', href: '#', type: 'link' },
  { label: 'Log In', type: 'button' },
  { label: 'Get Started', type: 'button' },
] as const;

// Style utility functions
const getOverlayClasses = (open: boolean) => 
  `fixed top-20 left-0 w-full h-[calc(100vh-4rem)] bg-black/30 z-[1000] transition-opacity duration-300 ${
    open ? "opacity-100" : "opacity-0 pointer-events-none"
  }`;

const getMenuDrawerClasses = (open: boolean) => 
  `fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white z-[1001] flex flex-col items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
    open ? "translate-y-0" : "translate-y-full"
  }`;

const getNavItemClasses = () => 
  "text-[#223127] text-4xl font-bold tracking-wide text-center w-full transition-colors duration-200 hover:text-[#4b5c4a]";

// Navigation item component
const NavigationItem = ({ item }: { item: typeof NAVIGATION_ITEMS[number] }) => {
  const baseClasses = getNavItemClasses();
  
  if (item.type === 'link') {
    return (
      <li className="w-full flex justify-center">
        <a href={item.href} className={baseClasses}>
          {item.label}
        </a>
      </li>
    );
  }
  
  return (
    <li className="w-full flex justify-center">
      <button className={`${baseClasses} bg-transparent border-none cursor-pointer`}>
        {item.label}
      </button>
    </li>
  );
};

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={getOverlayClasses(open)}
      />
      
      {/* Menu Drawer */}
      <div className={getMenuDrawerClasses(open)}>
        <nav className="w-full">
          <ul className="flex flex-col items-center justify-center gap-6 w-full">
            {NAVIGATION_ITEMS.map((item, index) => (
              <NavigationItem key={`${item.label}-${index}`} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu; 