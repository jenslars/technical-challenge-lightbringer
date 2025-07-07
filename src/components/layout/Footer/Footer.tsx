"use client";

import React, { useState } from "react";
import CompanyLogo from "../Header/CompanyLogo";
import NavLinks from "../../shared/Navlinks/NavLinks";
import EmailForm from "./EmailForm";
    
const Footer = () => {

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-5 h-[306px] sm:h-[256px] flex flex-col md:flex-row items-start justify-center md:items-center md:justify-between gap-6">
                <div>
                    <CompanyLogo fill="#ffffff" />
                    <NavLinks color="#ffffff" className="mt-5"/>
                </div>
                <EmailForm />
            </div>
        </footer>
    )
}

export default Footer;