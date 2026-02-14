import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const navItems = [
  { to: "/", label: "HOME" },
  { to: "/solutions", label: "OUR WORKS" },
  { to: "/whatwedo", label: "WHAT WE DO" },
  { to: "/contact", label: "CONTACT US" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setMobileMenuOpen(false); // Close mobile menu when hiding navbar
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header 
      className={`sticky top-0 z-50 border-b border-transparent transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`} 
      style={{ background: 'transparent', backdropFilter: 'none' }}
    >
      <div className="section h-16 flex items-center justify-between md:grid md:grid-cols-3">
        {/* Logo - Image on mobile, image on tablet/desktop */}
        <Link to="/" className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Autonomous AI" 
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center justify-center gap-4 lg:gap-8 text-xs tracking-wider">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `${isActive ? "text-white" : "text-primary"} hover:text-white transition-colors duration-300 whitespace-nowrap`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA Button - Right aligned */}
        <div className="hidden md:flex justify-end">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center border border-white/30 rounded-full px-6 lg:px-8 py-3 hover:border-white/50 transition-all duration-300"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-white font-light">
              LET'S TALK
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-transparent bg-black/90">
          <nav className="section py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `${isActive ? "text-white" : "text-primary"} hover:text-white transition-colors text-sm tracking-wider py-2`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center border border-white/30 rounded-full px-6 py-3 hover:border-white/50 hover:bg-white/5 transition-all duration-300 mt-2"
            >
              <span className="text-xs tracking-[0.2em] uppercase text-white font-light">
                LET'S TALK
              </span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
