import React from "react";

export type NavLinksProps = {
  color?: string;
  className?: string;
};

const NavLinks: React.FC<NavLinksProps> = ({ color, className }) => {
  const linkClasses = `text-base font-normal transition-all duration-300 ease-in-out hover:underline hover:font-medium hover:scale-110 active:font-medium active:no-underline ${color ? `text-[${color}]` : 'text-black'}`;

  return (
    <nav>
      <ul className={`flex gap-8 list-none p-0 ${className || ''}`}>
        <li><a href="#" className={linkClasses}>Home</a></li>
        <li><a href="#" className={linkClasses}>About Us</a></li>
        <li><a href="#" className={linkClasses}>Resources</a></li>
      </ul>
    </nav>
  );
};

export default NavLinks;
