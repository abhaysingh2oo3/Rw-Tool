import React from 'react';

const Logo = ({ width = 120, height = 30, className = "" }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 120 30" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle cx="15" cy="15" r="12" fill="#0072AA" />
      
      {/* WC monogram */}
      <text 
        x="15" 
        y="20" 
        fontSize="12" 
        fontWeight="bold" 
        textAnchor="middle" 
        fill="white"
        fontFamily="Arial, sans-serif"
      >
        WC
      </text>
      
      {/* Company name */}
      <text 
        x="35" 
        y="12" 
        fontSize="10" 
        fontWeight="600" 
        fill="currentColor"
        fontFamily="Arial, sans-serif"
      >
        Wealth Core
      </text>
      <text 
        x="35" 
        y="22" 
        fontSize="8" 
        fill="currentColor" 
        fillOpacity="0.7"
        fontFamily="Arial, sans-serif"
      >
        Dashboard Pro
      </text>
    </svg>
  );
};

export default Logo;
