import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full px-6 md:px-16 py-4 md:py-6 flex justify-between items-center 
    bg-black/80 backdrop-blur-xl border-b border-white/10 z-[9999]">
      
      <h2 className="text-lg md:text-xl font-semibold tracking-widest text-white">
        HYBRID
      </h2>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-10 text-sm text-white">
        <li className="hover:text-purple-400 cursor-pointer">Installations</li>
        <li className="hover:text-purple-400 cursor-pointer">Studio</li>
        <li className="hover:text-purple-400 cursor-pointer">Lab</li>
      </ul>

      {/* Mobile Hamburger */}
      <button 
        className="md:hidden text-white z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-xl transition-transform duration-300 ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <ul className="flex flex-col items-center justify-center h-full gap-8 text-2xl text-white">
          <li className="hover:text-purple-400 cursor-pointer" onClick={() => setIsMenuOpen(false)}>
            Installations
          </li>
          <li className="hover:text-purple-400 cursor-pointer" onClick={() => setIsMenuOpen(false)}>
            Studio
          </li>
          <li className="hover:text-purple-400 cursor-pointer" onClick={() => setIsMenuOpen(false)}>
            Lab
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;