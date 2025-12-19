import React, { useState, useEffect } from "react";

const Navbar = ({ onScrollTo }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? "pt-4" : "pt-8"
    }`}>
      <div className={`mx-auto transition-all duration-500 flex justify-between items-center px-6 py-3 border border-white/10 ${
        scrolled 
          ? "w-[90%] md:w-[60%] bg-black/40 backdrop-blur-xl rounded-full shadow-2xl shadow-black/20" 
          : "w-full max-w-7xl bg-transparent border-transparent"
      }`}>
        <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-xs shadow-lg shadow-blue-500/30">AA</div>
          <span className={scrolled ? "hidden md:block" : "block"}>ANDRAE</span>
        </div>
        
        <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
          {['about', 'portfolio', 'skills'].map((item) => (
            <button 
              key={item}
              onClick={() => onScrollTo(item)}
              className="px-5 py-2 rounded-full text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all capitalize"
            >
              {item}
            </button>
          ))}
        </div>

        <a href="#contact" className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-gray-200 transition-all shadow-lg shadow-white/10">
          Connect
        </a>
      </div>
    </nav>
  );
};

export default Navbar;