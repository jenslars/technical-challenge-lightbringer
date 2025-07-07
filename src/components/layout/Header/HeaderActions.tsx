import React from "react";
import { Button } from "@/components/shared/Button";

const HeaderActions = () => {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <Button 
        backgroundColor="bg-gray-50"
        textColor="text-gray-900"
        hoverBackgroundColor="hover:bg-gray-100"
        className="rounded-3xl active:bg-gray-400"
      >
        Log In
      </Button>
      <Button 
        backgroundColor="bg-gray-900"
        textColor="text-white"
        hoverBackgroundColor="hover:bg-gray-700"
        className="rounded-3xl active:bg-gray-900"
      >
        Get Started
      </Button>
    </div>
  );
};

export default HeaderActions; 