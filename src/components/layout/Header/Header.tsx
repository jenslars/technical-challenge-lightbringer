"use client";

import CompanyLogo from "./CompanyLogo";
import NavLinks from "../../shared/Navlinks/NavLinks";
import HeaderActions from "./HeaderActions";
import MobileMenu from "./MobileMenu";
import HamburgerMenu from "./HamburgerMenuLogo";
import React, { useState, useEffect } from "react";


const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 430 && menuOpen) {
                setMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [menuOpen]);

    return (
        <header className="flex items-center px-8 py-4 relative ">
            {/* Desktop Layout - hidden below lg, visible at lg and above */}
            <div className="desktop-nav hidden md:grid grid-cols-3 items-center w-full">
                <CompanyLogo fill="#000" />
                <div className="flex justify-center">
                    <NavLinks />
                </div>
                <div className="flex justify-end">
                    <HeaderActions />
                </div>
            </div>
            {/* Mobile Layout - visible below lg, hidden at lg and above */}
            <div className="mobile-nav flex md:hidden items-center justify-between w-full">
                <CompanyLogo />
                <button 
                    onClick={() => setMenuOpen(!menuOpen)} 
                    className="bg-none border-none p-0 cursor-pointer"
                >
                    <HamburgerMenu isOpen={menuOpen} />
                </button>
            </div>
            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </header>
    )
}

export default Header;