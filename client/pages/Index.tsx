import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, MouseEvent } from "react";
import SplineBackground from "@/components/SplineBackground";
import RadialGlass from "@/components/RadialGlass";
import RadialGlassSmall from "@/components/RadialGlassSmall";

function CountUp({
  target,
  className,
  duration = 1200,
}: {
  target: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState<string>("0");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    const match = target.match(/^-?\d+(?:\.\d+)?/);
    const numPart = match ? match[0] : "0";
    const suffix = target.slice(numPart.length);
    const to = parseFloat(numPart);
    const decimals = (numPart.split(".")[1] || "").length;

    let raf: number;
    const start = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      const val = (to * eased).toFixed(decimals);
      setDisplay(`${val}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

function Stat({
  value,
  heading,
  desc,
}: {
  value: string;
  heading: string;
  desc: string;
}) {
  return (
    <div className="px-4 md:px-6 text-center flex-1">
      <div className="mb-4">
        <CountUp
          target={value}
          className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-weight:500 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
        />
      </div>
      <h4 className="text-white font-normal mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px' }}>
        {heading}
      </h4>
      <p className="text-xs leading-relaxed text-white/60 max-w-xs mx-auto">
        {desc}
      </p>
    </div>
  );
}

function WhatWeDoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1); // Mobile: 1 card
      } else {
        setCardsPerView(3); // Desktop: 3 cards
      }
    };
    
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);
  
  const cards = [
    {
      title: "AI-Enabled Software Services",
      desc: "Autonomous AI Delivers End-To-End Solutions—From AI Strategy And Consulting To Full-Scale Deployment. We Help Organizations Integrate Computer Vision, NLP, And Automation Into Their Workflows While Ensuring Compliance And Responsible AI Governance.",
      icon: "/card-icon1.png",
      alt: "Neural Network"
    },
    {
      title: "AI Infrastructure & Data Services",
      desc: "We architect and deploy scalable AI infrastructure—cloud-native platforms, MLOps pipelines, and data engineering solutions that power intelligent systems at enterprise scale.",
      icon: "/card-icon2.png",
      alt: "Infrastructure"
    },
    {
      title: "AI-Powered Business Evolution",
      desc: "Transform operations with intelligent automation, predictive analytics, and AI-driven decision systems that evolve with your business needs.",
      icon: "/iconimg3.png",
      alt: "Business Evolution"
    },
    {
      title: "Emerging Innovations",
      desc: "Pioneering next-generation AI capabilities through research and development in advanced machine learning, neural architectures, and cognitive systems.",
      icon: "/icon-img4.png",
      alt: "Emerging Innovations"
    },
    {
      title: "Training and Enablement",
      desc: "Autonomous AI offers corporate training, developer bootcamps, and executive programs that prepare UAE teams to adopt, manage, and scale artificial intelligence ethically and effectively.",
      icon: "/imgicon5.png",
      alt: "Emerging Innovations"
    },
    {
      title: "AI Solutions Execution Process",
      desc: "Our five-phase process—Discovery, Data, Model, Deployment, and Scaling—ensures that every project moves from vision to real-world impact with transparency, speed, and measurable outcomes.",
      icon: "/imgicon6.png",
      alt: "Emerging Innovations"
    },
    {
      title: "Autonomous AI Advantage",
      desc: "We combine strategy, design, and deep technical expertise across healthcare, fintech, retail, logistics, and government sectors. With a focus on UAE standards, GDPR, and responsible AI, we build solutions that are scalable, secure, and future-proof.",
      icon: "/imgicon7.png",
      alt: "Emerging Innovations"
    }

  ];
  
  // Calculate maxIndex to ensure last card is fully visible
  // With peek effect, we show 3.2 cards at a time
  // maxIndex = total cards - cards that fit fully = 7 - 3 = 4
  const maxIndex = Math.max(0, cards.length - cardsPerView);
  
  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };
  
  return (
    <div className="relative">
      {/* Cards Container */}
      <div className="overflow-hidden w-full">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            gap: cardsPerView === 1 ? '0' : '20px',
            transform: cardsPerView === 1 
              ? `translateX(-${currentIndex * 100}%)` 
              : `translateX(calc(-${currentIndex * 100 / (cardsPerView + 0.2)}% - ${currentIndex * 20}px))`
          }}
        >
          {cards.map((card, index) => (
            <div key={index} className="flex-shrink-0" style={{ width: cardsPerView === 1 ? '100%' : `calc(${100 / (cardsPerView + 0.2)}% - ${20 * (cardsPerView - 1) / cardsPerView}px - 50px)` }}>
              <Card
                title={card.title}
                desc={card.desc}
                variant="dark"
                icon={
                  <img 
                    src={card.icon} 
                    alt={card.alt} 
                    className="w-full h-full object-contain object-bottom"
                  />
                }
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="flex justify-end gap-3 mt-8 pr-6">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary/20 disabled:hover:bg-transparent"
          aria-label="Previous"
        >
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center hover:bg-primary/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Card({
  title,
  desc,
  icon,
  variant = "dark",
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  variant?: "light" | "dark";
}) {
  return (
    <div className="rounded-xl overflow-hidden flex flex-col h-[600px] bg-[#E8E4DC] text-black">
      <div className="p-8 pb-6 flex-shrink-0">
        <h3 className="text-sm md:text-xl font-normal mb-4 text-black" style={{ fontFamily: 'Poppins, sans-serif' }}>
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-black/80">
          {desc}
        </p>
      </div>
      <div className="flex-1 flex items-end justify-center overflow-hidden">
        <div className="text-primary w-full h-full flex items-end">{icon}</div>
      </div>
    </div>
  );
}

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
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 68, 0, 0.15), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function Index() {
  return (
    <Layout>
      {/* HERO */}
      {/* <section className="relative overflow-hidden bg-black w-full" style={{ height: '870px' }}>
        <SplineBackground />
        <RadialGlass />
        <div className="section pt-8 md:pt-32 pb-16 md:pb-28 h-full flex flex-col gap-6 md:gap-8 relative z-20 justify-start md:justify-center">
          <div className="max-w-4xl relative z-20">
            <h1 className="mt-0 text-2xl md:text-5xl font-normal leading-tight uppercase" style={{ fontFamily: 'Clash Display, sans-serif' }}>
              <span className="block text-white">INTELLIGENCE</span>
              <span className="block text-primary">
                THAT MOVES THE FUTURE
              </span>
            </h1>
          </div> */}
          {/* <div className="flex-shrink-0 mt-4 md:mt-0">
            <PlusButton to="/contact" />
          </div> */}
        {/* </div>
      </section> */}
      {/* HERO */}
                  <section className="relative overflow-hidden bg-black w-full h-[500px] md:h-[800px]">
                    <SplineBackground />
                    <RadialGlass />
                    <div className="absolute inset-0 pointer-events-none -z-10">
                      <div
                        className="absolute -top-24 right-0 h-[320px] w-[720px] blur-3xl opacity-0"
                        style={{
                          background:
                            "radial-gradient(closest-side, hsl(var(--primary)/0.55), transparent)",
                        }}
                      />
                    </div>
                    <div className="section pt-6 md:pt-24 pb-0 md:pb-28 h-full flex flex-col md:flex-row items-start md:items-end justify-start md:justify-between gap-0 md:gap-8 relative z-20 md:z-auto">
                      <div className="max-w-4xl relative">
                        <h1 className="mt-0 text-2xl md:text-5xl font-normal leading-tight uppercase" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                          <span className="block">INTELLIGENCE THAT BUILDS</span>
                          <span className="block">
                            THE<span className="text-primary"> FUTURE</span>
                          </span>
                        </h1>
                      </div>
                      {/* <div className="flex-shrink-0 mt-4 md:mt-0">
                        <PlusButton to="/contact" />
                      </div> */}
                    </div>
                  </section>

      {/* INTRO */}
      <section className="section py-16 md:py-20">
        <div className="relative bg-black rounded-[20px] p-6 md:p-16 lg:p-20">
          {/* Top-left corner accent */}
          <div className="absolute top-0 left-0">
            {/* <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              className="text-primary"
            >
              <path
                d="M 0 80 Q 0 0 80 0 L 80 20 Q 20 20 20 80 Z"
                fill="currentColor"
              />
            </svg> */}
          </div>

          {/* Top-left glow */}
          <div
            className="absolute -top-8 -left-8 w-24 h-24 rounded-full blur-2xl opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary)), transparent)",
            }}
          />

          {/* Center radial glow behind text */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-15"
            style={{
              background: "radial-gradient(ellipse, hsl(var(--primary)), transparent 70%)",
            }}
          />

          {/* Content */}
          <p className="text-sm md:text-[30px] text-left md:text-center text-white/80 relative z-10 max-w-4xl mx-auto leading-relaxed">
            At <span className="text-primary font-medium">Autonomous AI</span>, we build systems that think, learn, and evolve. From predictive
            analytics to generative intelligence, we empower <span className="text-primary font-medium">UAE businesses</span> to automate,
            innovate, and scale with precision.
          </p>

          {/* Bottom-right corner accent */}
          <div className="absolute bottom-0 right-0">
            {/* <svg
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
            </svg> */}
          </div>

          {/* Bottom-right glow */}
          <div
            className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-20"
            style={{
              background: "radial-gradient(circle, hsl(var(--primary)), transparent)",
            }}
          />
        </div>
      </section>

      {/* WHAT WE DO */}
      <section id="what-we-do" className="section py-16">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
            <span className="block text-white">The Future, Powered By</span>
            <span className="block text-primary font-normal tracking-wide">
              Autonomous AI
            </span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-white/60 max-w-2xl">
            Integrating Intelligence Seamlessly Across Software, Data, And
            Operations To Shape The Future Of How Businesses Evolve.
          </p>
        </div>
        
        <WhatWeDoCarousel />
      </section>

      {/* NUMBERS */}
      <section className="section py-16 md:py-16 relative pt-[50px]">
        <h3 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-regular tracking-wide mb-12 md:mb-16 m-12 md:mb-16">
          <span className="text-primary font-normal">Numbers</span> <span className="text-white">That Speak</span>
        </h3>
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          {/* Left image placeholder */}
          <div className="hidden lg:flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0">
            {/* <img
              src="/number-image-2.png"
              alt="Decoration"
              className="w-full h-full object-contain"
            /> */}
          </div>

          {/* Stats container */}
          <div className="flex-1 max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <Stat
              value="2M+"
              heading="Client Growth Impact"
              desc="Achieved Through Automation And Intelligence."
            />
            <Stat
              value="5+"
              heading="AI+ Projects Delivered"
              desc="Including Saim.AI, GoGuard.AI, Raqeeb.AI, And ADNOC AI."
            />
            <Stat
              value="2+"
              heading="Years In AI Excellence"
              desc="Advancing UAE Innovation Through Real-World AI."
            />
          </div>

          {/* Right image placeholder */}
          <div className="hidden lg:flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24 flex-shrink-0">
            {/* <img
              src="/number-image-1.png"
              alt="Decoration"
              className="w-full h-full object-contain"
            /> */}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      {/* <section className="section py-16">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide uppercase mb-12 md:mb-16">
          <span className="text-white">OUR </span>
          <span className="text-primary">CERTIFICATIONS</span>
          <span className="text-white"> & </span>
          <span className="text-primary">STANDARDS</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { num: 1, title: "ISO 27001:2022", desc: "Information Security Management For AI And Data Systems" },
            { num: 2, title: "ISO 9001:2015", desc: "Quality Management System For AI Development" },
            { num: 3, title: "UAE Artificial Intelligence Accreditation (MOAI) ", desc: "Alignment with UAE’s National AI Strategy 2031" },
            { num: 4, title: "GDPR & UAE Data Residency Compliance Compliant", desc: "Full adherence to privacy and ethical AI practices" },
            { num: 5, title: "AWS & Azure AI Partner Certification", desc: "Authorized deployment on major cloud infrastructures" },
            { num: 6, title: "Responsible AI Framework Certification", desc: "Ensuring transparency, bias control,and ethical governance" },
          ].map((cert) => (
            <div
              key={cert.num}
              className="bg-black border border-white/10 rounded-xl p-6 md:p-8 flex flex-col items-center text-center hover:border-primary/30 transition-colors"
            >
              {/* Certification Image */}
              {/* <div className="w-full h-32 md:h-40 mb-6 flex items-center justify-center bg-white/5 rounded-lg p-4">
                <img
                  src={`/cert-${cert.num}.png`}
                  alt={cert.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              
              {/* Certification Title */}
              {/* <h3 className="text-xl md:text-2xl font-light text-white mb-3">
                {cert.title}
              </h3>
              
              {/* Certification Description */}
              {/* <p className="text-sm text-white/60 leading-relaxed">
                {cert.desc}
              </p>
            </div>
          ))}
        </div>
      </section> */}

      {/* SPOTLIGHT */}
      <section className="section py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-normal tracking-wide">
            <span className="text-white">SPOTLIGHT </span>
            <span className="text-primary">ON</span>
            <span className="text-white"> OUR WORK</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {/* SAIM.AI - Desktop/Tablet: Text first */}
          <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-10 flex flex-col justify-between min-h-[320px] order-1 md:order-1">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-normal">
                <span className="text-primary">SAIM.AI</span>
              </h3>
              <h4 className="text-xl md:text-2xl font-light text-white">
                AI BUSINESS ASSISTANT
              </h4>
            </div>
            <p className="text-xs md:text-base text-white/70 leading-relaxed mt-8">
              A Multi-Agent Business Intelligence Platform That Automates
              Workflows, Analyzes Communication, And Generates Insights —
              Reducing Manual Reporting Time By 70%.
            </p>
          </MouseGradientCard>

          {/* SAIM.AI Image */}
          <div className="bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden min-h-[280px] order-2 md:order-2">
            <img
              src="/spotlight-image-1.png"
              alt="SAIM.AI"
              className="w-full h-full object-cover"
            />
          </div>

          {/* GOGUARD.AI - Mobile: Text first, Desktop: Image first */}
          <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-10 flex flex-col justify-between min-h-[320px] order-3 md:order-4">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-normal">
                <span className="text-primary">GOGUARD.AI</span>
              </h3>
              <h4 className="text-xl md:text-2xl font-light text-white">
                AI VISION FOR SAFETY & SPORTS
              </h4>
            </div>
            <p className="text-xs md:text-base text-white/70 leading-relaxed mt-8">
              An AI-Powered Video Analytics System Using Computer Vision To
              Track Player Movements, Predict Injuries, And Enhance Safety
              Compliance In Industrial And Athletic Settings.
            </p>
          </MouseGradientCard>

          {/* GOGUARD.AI Image */}
          <div className="bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden min-h-[280px] order-4 md:order-3">
            <img
              src="/spotlight-image-2.png"
              alt="GOGUARD.AI"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RAQEEB.AI - Desktop/Tablet: Text first */}
          <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-10 flex flex-col justify-between min-h-[320px] order-5 md:order-5">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-normal">
                <span className="text-primary">RAQEEB.AI</span>
              </h3>
              <h4 className="text-xl md:text-2xl font-light text-white">
                REGTECH & COMPLIANCE AUTOMATION
              </h4>
            </div>
            <p className="text-xs md:text-base text-white/70 leading-relaxed mt-8">
              A Regulatory Intelligence Solution Built For Financial
              Institutions, Detecting Fraud, Ensuring KYC/AML Compliance, And
              Automating Policy Audits With Explainable AI.
            </p>
          </MouseGradientCard>

          {/* RAQEEB.AI Image */}
          <div className="bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden min-h-[280px] order-6 md:order-6">
            <img
              src="/spotlight-image-3.png"
              alt="RAQEEB.AI"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ADNOC AI INITIATIVE - Mobile: Text first, Desktop: Image first */}
          <MouseGradientCard className="bg-[#1A1A1A] border border-white/10 rounded-xl p-10 flex flex-col justify-between min-h-[320px] order-7 md:order-8">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-4xl font-normal">
                <span className="text-primary">ADNOC AI INITIATIVE</span>
              </h3>
              <h4 className="text-xl md:text-2xl font-light text-white">
                OPERATIONAL INTELLIGENCE FOR ENERGY
              </h4>
            </div>
            <p className="text-xs md:text-base text-white/70 leading-relaxed mt-8">
              AI-Powered Predictive Analytics Integrated Into ADNOC Workflows
              To Optimize Maintenance Schedules, Energy Consumption, And Risk
              Management In Real-Time.
            </p>
          </MouseGradientCard>

          {/* ADNOC Image */}
          <div className="bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden min-h-[280px] order-8 md:order-7">
            <img
              src="/Spotlight-image-4.png"
              alt="ADNOC AI Initiative"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Discover More Button */}
        <div className="text-center mt-12">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <span className="text-sm tracking-widest uppercase">
              DISCOVER MORE
            </span>
            <span className="text-xl">+</span>
          </Link>
        </div>
      </section>

      {/* AI-POWERED SOLUTIONS FOR TARGETED LEAD ACQUISITION */}
      <section className="relative overflow-hidden bg-black w-full h-[600px] md:h-[800px]">
        {/* Semi-Circle Radial Gradient Background */}
        <div className="absolute inset-0 z-0" style={{
          background: 'radial-gradient(ellipse 110% 100% at 0% 30%, #ff4400 0%, #d63a00 8%, #a82f00 15%, #7a2200 22%, #4a1a0a 30%, #2a0f05 40%, #000000 55%), linear-gradient(to bottom, transparent 0%, transparent 70%, rgba(0,0,0,0.5) 85%, #000000 100%)'
        }} />
        
        {/* 3D Model Image on Right - Desktop & Tablet Only */}
        <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-[70%] h-[120%] z-0 pointer-events-none items-center justify-end">
          <img 
            src="/radial-glass-model.png" 
            alt="3D Model" 
            className="h-full w-auto object-contain"
          />
        </div>
        <div className="section pt-6 md:pt-24 pb-0 md:pb-28 h-full flex flex-col md:flex-row items-start md:items-end justify-start md:justify-between gap-0 md:gap-8 relative z-20">
          <div className="max-w-2xl relative z-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight uppercase mb-6 text-left">
              <span className="text-primary block sm:inline">AI-POWERED</span>{" "}
              <span className="text-white block sm:inline">SOLUTIONS FOR</span>{" "}
              <span className="text-white block sm:inline">TARGETED LEAD</span>{" "}
              <span className="text-white block sm:inline">ACQUISITION</span>
            </h2>
            
            <p className="text-xs md:text-base text-white/70 leading-relaxed max-w-xl mb-6">
              Your Gateway To A World Where Expertise Meets Innovation. While You're
              Here, Talk To An Expert And Let's Shape Your Digital Success Story
              Together.
            </p>
            
            <Link
              to="/whatwedo"
              className="inline-flex items-center gap-2 border border-white/30 rounded-full pl-6 pr-2 py-2 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group bg-white/5"
            >
              <span className="text-xs tracking-[0.2em] uppercase text-white font-normal">
                LET'S CONNECT
              </span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black text-xl font-light">+</span>
            </Link>
          </div>
          
          {/* Mobile Image Only */}
          <div className="md:hidden mt-2 w-full flex items-center justify-center px-2 overflow-hidden">
            <img 
              src="/Radial-Glass-Mobile.png" 
              alt="3D Radial Glass" 
              className="w-full max-w-[500px] h-auto max-h-[500px] object-contain scale-[1.4]"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
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
                <span className="text-sm tracking-[0.2em] uppercase text-white font-normal">
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
