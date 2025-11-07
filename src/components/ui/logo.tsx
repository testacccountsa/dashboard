import React from "react";

export const AlFuttaimLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <div className="flex items-center">
      <img
        src="https://www.alfuttaim.com/wp-content/uploads/sites/22/2024/12/AF-logo.svg"
        alt="Al-Futtaim Logo"
        className="h-10 w-auto filter brightness-110 drop-shadow-sm"
        style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.2))' }}
      />
      <div className="w-px h-8 bg-current opacity-30 mx-4" />
    </div>
    <div className="flex flex-col">
      <div className="text-2xl font-bold tracking-wide whitespace-nowrap">
        TOYOTA
      </div>
      <div className="text-xs uppercase tracking-widest opacity-80">
        Al-Futtaim Motors
      </div>
    </div>
  </div>
);

export const ToyotaLogo = ({ className = "" }: { className?: string }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20 37.5c9.665 0 17.5-7.835 17.5-17.5S29.665 2.5 20 2.5 2.5 10.335 2.5 20 10.335 37.5 20 37.5z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M20 32.5c6.904 0 12.5-5.596 12.5-12.5S26.904 7.5 20 7.5 7.5 13.096 7.5 20 13.096 32.5 20 32.5z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M24.167 20c0-2.301-1.866-4.167-4.167-4.167-2.301 0-4.167 1.866-4.167 4.167 0 2.301 1.866 4.167 4.167 4.167 2.301 0 4.167-1.866 4.167-4.167z"
      fill="currentColor"
    />
  </svg>
);