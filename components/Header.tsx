
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 bg-slate-800 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <span className="text-4xl mr-3">✍️</span>
        <h1 className="text-3xl font-bold text-sky-400">
          HumanizeAI Text Rewriter
        </h1>
      </div>
    </header>
  );
};

export default Header;
