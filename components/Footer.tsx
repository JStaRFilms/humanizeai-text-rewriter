
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-6 mt-12 text-center text-sm text-slate-500 border-t border-slate-700">
      <p>&copy; {currentYear} HumanizeAI Tools. Powered by Gemini.</p>
      <p className="mt-1 text-xs">
        Disclaimer: This tool is for educational and creative purposes. Misuse for academic dishonesty is discouraged.
      </p>
    </footer>
  );
};

export default Footer;
