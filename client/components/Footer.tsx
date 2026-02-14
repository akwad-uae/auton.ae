import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 md:mt-24 border-t border-white/10">
      {/* Top Section */}
      <div className="section py-6 md:py-8 border-b border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Left - CTA */}
          <div className="text-center md:text-left flex-1">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-light tracking-wide">
              <span className="text-primary">LET'S BUILD THE NEXT BREAKTHROUGH TOGETHER</span>
            </h3>
          </div>

          {/* Center - Divider */}
          <div className="hidden lg:block w-16 xl:w-24 h-px bg-white/20" />

          {/* Social Links */}
          <div className="flex items-center gap-4 md:gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors text-xs md:text-sm"
            >
              Fb.
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors text-xs md:text-sm"
            >
              Tw.
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary transition-colors text-xs md:text-sm"
            >
              In.
            </a>
          </div>

          {/* Right - Logo */}
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Autonomous AI" 
              className="h-8 md:h-10 lg:h-12 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="section py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-8">
          {/* Left - Address */}
          <div className="text-xs text-white/70 text-center md:text-left">
            <p className="font-semibold text-white mb-2">AUTONOMOUS AI - UAE</p>
            <p>Innovation Hub Tower,</p>
            <p>Al Maryah Island</p>
          </div>

          {/* Center - Navigation */}
          <nav className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-xs text-white/70">
            <Link className="hover:text-white transition-colors uppercase" to="/">
              HOME
            </Link>
            <Link className="hover:text-white transition-colors uppercase" to="/solutions">
              OUR WORKS
            </Link>
            <Link className="hover:text-white transition-colors uppercase" to="/whatwedo">
              WHAT WE DO
            </Link>
            <Link className="hover:text-white transition-colors uppercase" to="/contact">
              CONTACT US
            </Link>
          </nav>

          {/* Right - Contact */}
          <div className="text-xs text-white/70 text-center md:text-right">
            <p className="mb-1">+971562992229</p>
            <a
              href="mailto:info@autonomousai.ae"
              className="hover:text-white transition-colors"
            >
              info@autonomousai.ae
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Autonomous AI. All Rights Reserved.</p>
          <p className="text-right">Designed by ticbyakwad</p>
        </div>
      </div>
    </footer>
  );
}
