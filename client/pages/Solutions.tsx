import Layout from "@/components/Layout";
import { useState, useEffect, useRef, MouseEvent } from "react";
import { Link } from "react-router-dom";
import SplineBackground from "@/components/SplineBackground";
import RadialGlass from "@/components/RadialGlass";

function MouseGradientCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 107, 0, 0.15), transparent 40%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}

function AnimatedInfoCards({ items }: { items: Array<{ title: string; content: string }> }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Group items into pairs for two columns
  const pairs = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push([items[i], items[i + 1]].filter(Boolean));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % pairs.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [pairs.length]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pairs[currentIndex].map((item: { title: string; content: string }, index: number) => (
          <MouseGradientCard
            key={`${currentIndex}-${index}`}
            className="bg-[#1A1A1A] border border-white/10 rounded-xl p-10"
          >
            {/* Static Title */}
            <h4 className="text-2xl font-light text-primary mb-6">
              {item.title}
            </h4>
            
            {/* Animated Content */}
            <div className="relative overflow-hidden min-h-[100px]">
              <p
                className={`text-base text-white/60 leading-relaxed transition-all duration-500 ${
                  isAnimating 
                    ? 'opacity-0 translate-y-4' 
                    : 'opacity-100 translate-y-0'
                }`}
              >
                {item.content}
              </p>
            </div>
          </MouseGradientCard>
        ))}
      </div>
      
      {/* Progress Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {pairs.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAnimating(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsAnimating(false);
              }, 300);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-primary'
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Solutions() {
  return (
    <Layout>
      {/* HERO */}
            <section className="relative overflow-hidden bg-black w-full h-[600px] md:h-[800px]">
              <SplineBackground />
              <RadialGlass />
              <div className="absolute inset-0 pointer-events-none -z-10">
                <div
                  className="absolute -top-24 right-0 h-[320px] w-[720px] blur-3xl opacity-60"
                  style={{
                    background:
                      "radial-gradient(closest-side, hsl(var(--primary)/0.55), transparent)",
                  }}
                />
              </div>
              <div className="section pt-6 md:pt-24 pb-0 md:pb-28 h-full flex flex-col md:flex-row items-start md:items-end justify-start md:justify-between gap-0 md:gap-8 relative z-20 md:z-auto">
                <div className="max-w-4xl relative">
                  <h1 className="mt-0 text-2xl md:text-5xl font-normal leading-tight uppercase" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                    <span className="block">AUTONOMOUS BY NATURE</span>
                    <span className="block">
                      INTELLIGENT BY <span className="text-primary">DESIGN</span>
                    </span>
                  </h1>
                </div>
                {/* <div className="flex-shrink-0 mt-4 md:mt-0">
                  <PlusButton to="/contact" />
                </div> */}
              </div>
            </section>
               {/* INTRO */}
      {/* <section className="section py-12 md:py-16 lg:py-20">
        <div className="relative bg-black rounded-[20px] p-8 md:p-12 lg:p-16 xl:p-20"> */}
          {/* Top-left corner accent */}
          {/* <div className="absolute top-0 left-0">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              className="text-primary"
            >
              <path
                d="M 0 60 Q 0 0 60 0"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div> */}

          {/* Top-left glow */}
          {/* <div
            className="absolute -top-8 -left-8 w-24 h-24 rounded-full blur-2xl opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary)), transparent)",
            }}
          /> */}

          {/* Center radial glow behind text */}
          {/* <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[200px] md:h-[300px] rounded-full blur-3xl opacity-15"
            style={{
              background: "radial-gradient(ellipse, hsl(var(--primary)), transparent 70%)",
            }}
          /> */}

          {/* Content */}
          {/* <div className="mb-8 md:mb-12 relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
            <span className="block text-white">THE LAB WHERE IDEAS GO</span>
            <span className="block text-primary font-normal tracking-wide">
              AUTONOMOUS
            </span>
          </h2>
        
        </div> */}

          {/* Bottom-right corner accent */}
          {/* <div className="absolute bottom-0 right-0">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              className="text-primary"
            >
              <path
                d="M 60 0 Q 60 60 0 60"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div> */}

          {/* Bottom-right glow */}
          {/* <div
            className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary)), transparent)",
            }}
          />
        </div>
      </section> */}

      {/* SAIM.AI SHOWCASE */}
      <section className="section py-16">
        <div className="relative bg-black border border-white/10 rounded-2xl overflow-hidden group cursor-pointer">
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
          
          {/* Image with zoom animation */}
          <img
            src="/saim-showcase.png"
            alt="Saim.ai - Future of AI SAIM"
            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>
      </section>

      {/* SAIM.AI FEATURES */}
      <section className="section py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left side - Title and Description */}
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light">
              <span className="text-primary">SAIM.AI</span>
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-white">
              AI BUSINESS ASSISTANT
            </h3>
            <p className="text-sm md:text-xs md:text-base text-white/70 leading-relaxed max-w-xl">
              A Multi-Agent AI System That Automates Executive Workflows,
              Generates Insights From Enterprise Data, And Acts As A Real-Time
              Digital Assistant For Businesses.
            </p>
          </div>

          {/* Right side - Features */}
          <div className="space-y-4 md:space-y-5">
            {/* Feature 1 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img
            src="/ow-1.png"
            alt="Saim.ai - Future of AI SAIM"
            className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Multi-agent orchestration for task automation,
                  summarization, and insight generation.
                </p>
              </div>
            </MouseGradientCard>

            {/* Feature 2 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img
            src="/ow-2.png"
            alt="Saim.ai - Future of AI SAIM"
            className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Multilingual (English + Arabic) Communication
                  And Policy-Based Approval Flows.
                </p>
              </div>
            </MouseGradientCard>

            {/* Feature 3 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img
            src="/ow-3.png"
            alt="Saim.ai - Future of AI SAIM"
            className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Integrated Retrieval Across Mail, CRM, And
                  Documents For Unified Knowledge Access.
                </p>
              </div>
            </MouseGradientCard>

            {/* Feature 4 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img
            src="/ow-4.png"
            alt="Saim.ai - Future of AI SAIM"
            className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Reduced Manual Report Preparation Time By
                  70% And Boosted Decision Speed By 30%.
                </p>
              </div>
            </MouseGradientCard>
          </div>
        </div>
      </section>

      {/* GOGUARD.AI SHOWCASE */}
      <section className="section py-16">
        <div className="relative bg-black border border-white/10 rounded-2xl overflow-hidden group cursor-pointer">
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
          
          {/* Image with zoom animation */}
          <img
            src="/goguard-showcase.png"
            alt="GoGuard.ai - AI Vision for Safety & Sports"
            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>
      </section>

      {/* SAIM.AI FEATURES */}
      <section className="section py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Title and Description */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-light">
              <span className="text-primary">GOGUARD.AI</span>
            </h2>
            <h3 className="text-2xl md:text-3xl font-light text-white">
              VISION ANALYTICS FOR SAFETY & SPORTS
            </h3>
            <p className="text-xs md:text-base text-white/70 leading-relaxed max-w-xl">
              A computer-vision platform that uses AI to track movement, 
              detect risk patterns, and enhance human performance and safety.
            </p>
          </div>

          {/* Right side - Features */}
          <div className="space-y-5">
            {/* Feature 1 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img
            src="/ow-5.png"
            alt="Saim.ai - Future of AI SAIM"
            className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Smart Vision Models Built on YOLO for Detection
                  and Pose Tracking
                </p>
              </div>
            </MouseGradientCard>

            {/* Feature 2 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img
            src="/ow-6.png"
            alt="Saim.ai - Future of AI SAIM"
            className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  AI-Powered Predictive
                  Injury Alerts and Near-Miss Detection
                </p>
              </div>
            </MouseGradientCard>

            {/* Feature 3 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img
            src="/ow-7.png"
            alt="Saim.ai - Future of AI SAIM"
            className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Used in Industrial Safety, Construction, and Sports Analytics
                </p>
              </div>
            </MouseGradientCard>

            {/* Feature 4 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img
            src="/ow-8.png"
            alt="Saim.ai - Future of AI SAIM"
            className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Reduced manual report preparation time by 70 %
                  and boosted decision speed by 30 %.
                </p>
              </div>
            </MouseGradientCard>
          </div>
        </div>
      </section>

      {/* RAQEEB.AI SHOWCASE */}
      <section className="section py-16">
        <div className="relative bg-black border border-white/10 rounded-2xl overflow-hidden group cursor-pointer">
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
          
          {/* Image with zoom animation */}
          <img
            src="/raqeeb-showcase.png"
            alt="Raqeeb.ai - RegTech & Compliance Automation"
            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>
      </section>
      
      {/* RAQEEB.AI FEATURES */}
      <section className="section py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Title and Description */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-light">
              <span className="text-primary">RAQEEB.AI</span>
            </h2>
            <h3 className="text-2xl md:text-3xl font-light text-white">
              INTELLIGENT REGTECH AUTOMATION
            </h3>
            <p className="text-xs md:text-base text-white/70 leading-relaxed max-w-xl">
              An explainable AI platform for the financial sector 
              that automates AML, KYC, and fraud-risk operations.
            </p>
          </div>

          {/* Right side - Features */}
          <div className="space-y-5">
            {/* Feature 1 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img
            src="/ow-9.png"
            alt="Saim.ai - Future of AI SAIM"
            className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Graph-based Anomaly Detection and Entity Resolution
                </p>
              </div>
            </MouseGradientCard>

            {/* Feature 2 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img
            src="/ow-10.png"
            alt="Saim.ai - Future of AI SAIM"
            className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  AI-Driven Policy Summarization and Compliance Alerts
                </p>
              </div>
            </MouseGradientCard>

            {/* Feature 3 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img
            src="/ow-11.png"
            alt="Saim.ai - Future of AI SAIM"
            className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Reduces false positives by up to 50 % and 
                  shortens investigation time by 35 %.
                </p>
              </div>
            </MouseGradientCard>
          </div>
        </div>
      </section>

      {/* SMART CITY VISION AI SHOWCASE */}
      <section className="section py-16">
        <div className="relative bg-black border border-white/10 rounded-2xl overflow-hidden group cursor-pointer">
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
          
          {/* Image with zoom animation */}
          <img
            src="/smartcity-showcase.png"
            alt="Smart City Vision AI - DARBin Abu Dhabi"
            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>
      </section>
      
      {/* SMARTCITY.AI FEATURES */}
      <section className="section py-16">
        {/* Features Grid - Top Row */}
        <div className="grid md:grid-cols-2 gap-4 mb-3">
          {/* Left Column - Title and Description */}
          <div>
            <h2 className="text-4xl md:text-5xl font-light">
              <span className="text-primary">SMART CITY VISION AI</span>
            </h2>
            <h3 className="text-2xl md:text-3xl font-light text-white mt-1">
              DARB IN ABU DHABI (WITH Q_MOBILITY)
            </h3>
            <p className="text-xs md:text-base text-white/70 leading-relaxed mt-2">
              A collaborative initiative between Autonomous AI and Q-Mobility to transform Abu Dhabi's smart-mobility infrastructure under the DARBin program.
            </p>
          </div>

          {/* Right Column - Features 1 & 2 stacked */}
          <div className="space-y-3">
            {/* Feature 1 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img src="/ow-12.png" alt="Firmware Engineering" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Firmware re-engineering of legacy camera systems to integrate AI vision.
                </p>
              </div>
            </MouseGradientCard>

            {/* Feature 2 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img src="/ow-13.png" alt="RT Detector" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Imported and customized the Python package RT Dter (Real-Time Detector) for edge inference.
                </p>
              </div>
            </MouseGradientCard>
          </div>
        </div>

        {/* Features Grid - Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Right Column - Features 3 & 4 stacked - Order 1 on mobile, 2 on desktop */}
          <div className="space-y-3 order-1 md:order-2">
            {/* Feature 3 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img src="/ow-14.png" alt="Adaptive Firmware" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Developed adaptive firmware modules enabling in-camera object detection and event classification.
                </p>
              </div>
            </MouseGradientCard>

            {/* Feature 4 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img src="/ow-15.png" alt="DARBin Integration" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Integrated with DARBin's data platform for cross-road analytics and live traffic feeds.
                </p>
              </div>
            </MouseGradientCard>
          </div>

          {/* Left Column - PROJECT INTENT - Order 2 on mobile, 1 on desktop */}
          <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5 flex flex-col order-2 md:order-1">
            <h4 className="text-xl md:text-2xl font-light text-primary mb-3">
              PROJECT INTENT
            </h4>
            <p className="text-sm md:text-base text-white/60 leading-relaxed">
              Upgrade existing roadside camera systems to AI-based vision sensors capable of real-time analytics for traffic, safety, and urban planning.
            </p>
          </MouseGradientCard>
        </div>
      </section>
      {/* IMPACT & COMPLIANCE */}
      <section className="section py-16">
        <AnimatedInfoCards
          items={[
            {
              title: "IMPACT",
              content: "Transformed static CCTV units into smart vision nodes capable of detecting vehicles, pedestrians, congestion, and incidents in real time."
            },
            {
              title: "DEPLOYMENT",
              content: "Rollout across multiple Abu Dhabi smart-mobility zones under Q-Mobility supervision."
            },
            {
              title: "IMPACT",
              content: "Reduced data-processing latency by 60 % through on-edge inference."
            },
            {
              title: "DEPLOYMENT",
              content: "Fully aligned with the Abu Dhabi Digital Authority’s Smart City Standards."
            }
          ]}
        />
      </section>

      {/* ADNOC PIPELINE INTEGRITY AI SHOWCASE */}
      <section className="section py-16">
        <div className="relative bg-black border border-white/10 rounded-2xl overflow-hidden group cursor-pointer">
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
          
          {/* Image with zoom animation */}
          <img
            src="/adnoc-showcase.png"
            alt="ADNOC Pipeline Integrity AI"
            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>
      </section>

      {/* ADNOC.AI FEATURES */}
      <section className="section py-16">
        {/* Features Grid - Top Row */}
        <div className="grid md:grid-cols-2 gap-4 mb-3">
          {/* Left Column - Title and Description */}
          <div>
            <h2 className="text-4xl md:text-5xl font-light">
              <span className="text-primary">ADNOC PIPELINE INTEGRITY AI</span>
            </h2>
            <h3 className="text-2xl md:text-3xl font-light text-white mt-1">
              GAS PIPELINE THICKNESS ANALYSIS
            </h3>
            <p className="text-xs md:text-base text-white/70 leading-relaxed mt-2">
              A specialized AI system that assists ADNOC gas-line inspectors in assessing the health and remaining life of critical pipeline infrastructure.
            </p>
          </div>

          {/* Right Column - Features 1 & 2 stacked */}
          <div className="space-y-3">
            {/* Feature 1 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img src="/ow-16.png" alt="IoT Sensor Data" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Sensor data ingestion from IoT and NDT (non-destructive testing) devices.
                </p>
              </div>
            </MouseGradientCard>

            {/* Feature 2 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img src="/ow-17.png" alt="Feature Extraction" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Feature extraction of wall-thickness variation, corrosion depth, and temperature impact.
                </p>
              </div>
            </MouseGradientCard>
          </div>
        </div>

        {/* Features Grid - Bottom Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Right Column - Features 3 & 4 stacked - Order 1 on mobile, 2 on desktop */}
          <div className="space-y-3 order-1 md:order-2">
            {/* Feature 3 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img src="/ow-18.png" alt="XGBoost Model" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  XGBoost-based predictive model to estimate degradation trends and classify risk levels.
                </p>
              </div>
            </MouseGradientCard>

            {/* Feature 4 */}
            <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5 flex items-start gap-4 hover:border-primary/30 transition-colors">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center">
                <img src="/ow-19.png" alt="Visualization Dashboard" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                  Visualization dashboard displaying probability-of-failure and recommended action (retain / replace / reinspect).
                </p>
              </div>
            </MouseGradientCard>
          </div>

          {/* Left Column - PROJECT INTENT - Order 2 on mobile, 1 on desktop */}
          <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-5 flex flex-col order-2 md:order-1">
            <h4 className="text-xl md:text-2xl font-light text-primary mb-3">
              PROJECT INTENT
            </h4>
            <p className="text-sm md:text-base text-white/60 leading-relaxed">
              To Automatically Analyze Pipeline-Thickness Data Gathered From Ultrasonic And Magnetic Sensors, And Help Inspectors Decide Whether To Repair, Replace, Or Maintain Gas Pipelines.
            </p>
          </MouseGradientCard>
        </div>
      </section>

      {/* IMPACT & COMPLIANCE */}
      <section className="section py-16">
        <AnimatedInfoCards
          items={[
            {
              title: "IMPACT",
              content: "92% improvement in inspection accuracy compared to manual assessments, significantly reducing human error and inspection time."
            },
            {
              title: "COMPLIANCE",
              content: "Deployed on ADNOC's secure on-prem infrastructure with full UAE data residency and compliance with international safety standards."
            },
            {
              title: "IMPACT",
              content: "Reduced unnecessary replacements by 25 %, saving cost and downtime."
            },
            {
              title: "COMPLIANCE",
              content: "Enabled real-time decision support for field engineers and maintenance planners."
            },
            {
              title: "COMPLIANCE",
              content: "Compliant with ISO 27001 and ADNOC’s operational safety framework."
            }
          ]}
        />
      </section>


      {/* CTA SECTION */}
      <section className="section py-16">
        <div className="relative bg-black border border-white/10 rounded-2xl p-12 md:p-16 overflow-hidden">
          <div className="flex items-center justify-center gap-8">
            {/* Left image placeholder */}
            {/* <div className="hidden md:flex items-center justify-center w-24 h-24 flex-shrink-0">
              <img
                src="/number-image-2.png"
                alt="Decoration"
                className="w-full h-full object-contain"
              />
            </div> */}

            {/* Center content */}
            <div className="flex-1 max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-8">
                <span className="text-white">READY TO TRANSFORM</span>
                <br />
                <span className="text-white">WITH </span>
                <span className="text-primary">AUTONOMOUS INTELLIGENCE</span>
                <span className="text-white">?</span>
              </h2>
              
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 border border-white/30 rounded-full px-8 py-4 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group bg-white/5"
              >
                <span className="text-sm tracking-[0.2em] uppercase text-white font-medium">
                  LET'S CONNECT
                </span>
              </Link>
            </div>

            {/* Right image placeholder */}
            {/* <div className="hidden md:flex items-center justify-center w-24 h-24 flex-shrink-0">
              <img
                src="/number-image-1.png"
                alt="Decoration"
                className="w-full h-full object-contain"
              />
            </div> */}
          </div>
        </div>
      </section>
            
    </Layout>
  );
}
