import { useEffect, useRef, useState } from 'react';

export default function SplineBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate mouse position as percentage (-1 to 1)
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate parallax transform with stronger effect
  const parallaxX = mousePosition.x * 50;
  const parallaxY = mousePosition.y * 50;

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 overflow-hidden">
      {/* Ambient glow effects with parallax */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Center glow - larger and brighter */}
        <div
          className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] rounded-full blur-3xl opacity-50 transition-transform duration-150 ease-out"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)/0.8), transparent 70%)",
            transform: `translate(-50%, -50%) translate(${parallaxX * 0.8}px, ${parallaxY * 0.8}px) rotate(${mousePosition.x * 10}deg)`,
          }}
        />
        {/* Secondary glow - brighter */}
        <div
          className="absolute top-1/3 left-1/3 w-[700px] h-[700px] rounded-full blur-3xl opacity-35 transition-transform duration-200 ease-out"
          style={{
            background: "radial-gradient(circle, rgba(255, 107, 0, 0.6), transparent 60%)",
            transform: `translate(${parallaxX * 0.6}px, ${parallaxY * 0.6}px) rotate(${mousePosition.x * -8}deg)`,
          }}
        />
        {/* Additional accent glow */}
        <div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl opacity-25 transition-transform duration-300 ease-out"
          style={{
            background: "radial-gradient(circle, rgba(255, 150, 50, 0.5), transparent 60%)",
            transform: `translate(${parallaxX * 0.7}px, ${parallaxY * 0.7}px) rotate(${mousePosition.y * 12}deg)`,
          }}
        />
      </div>
    </div>
  );
}
