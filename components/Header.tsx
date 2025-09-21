
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 sm:p-6 border-b border-slate-200">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
        Elementary Human Anatomy and Physiology
      </h1>
      <p className="text-sm text-slate-500 mt-1">
        Your comprehensive video guide to understanding the human body.
      </p>
    </header>
  );
};

export default Header;
