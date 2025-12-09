import React, { useRef, useEffect, useState } from 'react';

// --- Utility for Scroll Animations ---
const useOnScreen = (ref: React.RefObject<Element>, threshold = 0.1) => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return isIntersecting;
};

const Reveal: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  delay?: number; // delay in ms
}> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  
  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Common wrapper for consistent slide layout
const SlideWrapper: React.FC<{ 
  children: React.ReactNode; 
  id?: string; 
  className?: string; 
  slideNumber?: string;
}> = ({ children, id, className = "", slideNumber }) => (
  <div id={id} className={`min-h-screen w-full flex flex-col justify-center items-center px-6 md:px-12 py-24 snap-start relative ${className}`}>
    {slideNumber && (
      <span className="absolute top-24 right-6 md:right-12 text-xs font-semibold text-gray-300 tracking-widest uppercase">
        {slideNumber}
      </span>
    )}
    {children}
  </div>
);

// --- 00. Title Slide ---
export const TitleSlide: React.FC<{ id: string }> = ({ id }) => (
  <SlideWrapper id={id}>
    <div className="text-center">
      <Reveal delay={100}>
        <div className="text-xs font-bold text-[#999] mb-4 tracking-[4px] uppercase">Strategy For</div>
      </Reveal>
      <Reveal delay={200}>
        <div className="text-xl font-medium text-primary mb-8 tracking-widest uppercase">F.F. Foundation Ltd.</div>
      </Reveal>
      <Reveal delay={300}>
        <h1 className="text-5xl md:text-7xl font-light text-primary mb-8 leading-tight tracking-tight">
          Brand & Digital<br/>Transformation
        </h1>
      </Reveal>
      <Reveal delay={400}>
        <p className="text-xl text-[#888] font-light tracking-wide max-w-2xl mx-auto">
          Aligning market identity with world-class medical infrastructure
        </p>
      </Reveal>
    </div>
  </SlideWrapper>
);

// --- 01. Analysis Slide ---
export const AnalysisSlide: React.FC<{ id: string }> = ({ id }) => (
  <SlideWrapper id={id} slideNumber="02">
    <Reveal>
      <h2 className="text-3xl md:text-4xl font-light mb-12 text-primary tracking-tight text-center md:text-left">Current State Analysis</h2>
    </Reveal>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl w-full">
      <Reveal delay={200}>
        <div className="space-y-6">
          <h3 className="text-lg font-medium border-b border-border pb-3 mb-4 text-primary">Your Capabilities</h3>
          <ul className="space-y-4 text-[0.95rem] text-secondary font-light">
            {['30 years of healthcare infrastructure experience', 'Schaerer OT Tables (Swiss)', 'Austofix Orthopedics (Australia)', 'German Modular Hospital Solutions', 'Prestigious client portfolio'].map((item, i) => (
              <li key={i} className="flex items-start before:content-['—'] before:mr-4 before:text-accent/50">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <Reveal delay={400}>
        <div className="space-y-6">
          <h3 className="text-lg font-medium border-b border-border pb-3 mb-4 text-primary">Market Perception Gap</h3>
          <ul className="space-y-4 text-[0.95rem] text-secondary font-light">
            {['Inconsistent brand messaging', 'Website UX requires modernization', 'Limited thought leadership presence', 'Visual identity lags behind premium positioning'].map((item, i) => (
              <li key={i} className="flex items-start before:content-['—'] before:mr-4 before:text-accent/50">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
    <Reveal delay={600} className="mt-16 text-center max-w-2xl">
      <p className="text-lg leading-relaxed text-secondary mb-3">
        <span className="font-semibold text-primary">94% of B2B buyers perform online research before purchasing.</span><br/>
        Your digital presence is the first—and most critical—touchpoint.
      </p>
      <p className="text-[0.65rem] text-[#bbb] tracking-widest uppercase font-medium">Source: Accenture B2B Procurement Study</p>
    </Reveal>
  </SlideWrapper>
);

// --- 02. Business Impact Slide ---
export const BusinessImpactSlide: React.FC<{ id: string }> = ({ id }) => (
  <SlideWrapper id={id} slideNumber="03">
    <Reveal>
      <h2 className="text-3xl md:text-4xl font-light mb-12 text-primary tracking-tight text-center">The Business Impact</h2>
    </Reveal>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-16">
      {[
        { num: '33%', label: 'Revenue increase attributed to brand consistency', source: 'Marq: State of Brand Consistency', delay: 200 },
        { num: '83%', label: 'Of B2B buyers prefer digital commerce channels', source: 'Gartner Sales Survey 2022', delay: 300 },
        { num: '77%', label: 'Research independently before contacting sales', source: 'Saleslion / CEB Global', delay: 400 }
      ].map((stat, i) => (
        <Reveal key={i} delay={stat.delay} className="h-full">
          <div className="text-center p-8 bg-card rounded-lg border border-transparent hover:border-border hover:shadow-sm transition-all duration-300 h-full flex flex-col items-center justify-between">
            <div className="text-6xl font-thin text-primary mb-4 tracking-tighter">{stat.num}</div>
            <div className="text-sm text-secondary leading-relaxed mb-6 font-light">{stat.label}</div>
            <p className="text-[0.6rem] text-[#bbb] uppercase tracking-wider">{stat.source}</p>
          </div>
        </Reveal>
      ))}
    </div>
    <Reveal delay={500}>
      <div className="max-w-3xl bg-card border-l-2 border-primary p-8 hover:border-accent transition-colors duration-300 shadow-sm rounded-r-lg">
        <p className="text-base text-secondary leading-loose font-light">
          In medical procurement, credibility drives decisions. Healthcare administrators and surgeons rely heavily on digital research to evaluate potential partners. A cohesive brand identity signals reliability and professionalism—essential qualities when dealing with life-critical infrastructure.
        </p>
      </div>
    </Reveal>
  </SlideWrapper>
);

// --- 03. Strategy Overview Slide ---
export const StrategyOverviewSlide: React.FC<{ id: string }> = ({ id }) => (
  <SlideWrapper id={id} slideNumber="04">
    <Reveal>
      <h2 className="text-3xl md:text-4xl font-light mb-3 text-primary tracking-tight text-center">Strategic Approach</h2>
      <p className="text-center text-[#999] mb-12 font-light">Five integrated initiatives to strengthen market positioning</p>
    </Reveal>
    <ul className="w-full max-w-3xl space-y-4">
      {[
        { step: 1, title: 'Brand Audit', desc: 'Analyze competitive positioning and stakeholder perception' },
        { step: 2, title: 'Visual Identity Refresh', desc: 'Develop cohesive brand system reflecting precision and authority' },
        { step: 3, title: 'PR & Communications Strategy', desc: 'Position leadership through thought leadership and case studies' },
        { step: 4, title: 'Catalogue Redesign', desc: 'Create professional reference materials for sales teams' },
        { step: 5, title: 'Website Redesign', desc: 'Build digital showroom optimized for the B2B buyer journey' }
      ].map((phase, i) => (
        <Reveal key={i} delay={i * 100}>
          <li className="flex items-center gap-6 p-6 bg-card rounded-lg border border-transparent hover:border-border hover:shadow-md transition-all duration-300 group cursor-default">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white text-sm font-medium shrink-0 group-hover:bg-accent group-hover:scale-110 transition-all duration-300 shadow-lg">
              {phase.step}
            </span>
            <div>
              <strong className="block text-primary mb-1 text-lg font-normal group-hover:text-accent transition-colors">{phase.title}</strong>
              <span className="text-sm text-[#888] font-light">{phase.desc}</span>
            </div>
          </li>
        </Reveal>
      ))}
    </ul>
  </SlideWrapper>
);

// --- 04. Phase 1 Slide ---
export const PhaseOneSlide: React.FC<{ id: string }> = ({ id }) => (
  <SlideWrapper id={id} slideNumber="05">
    <Reveal>
      <h2 className="text-3xl md:text-4xl font-light mb-2 text-primary tracking-tight text-center">Phase 1: Brand Audit</h2>
      <h3 className="text-sm text-[#999] font-medium mb-12 uppercase tracking-[2px] text-center">Foundation for informed decisions</h3>
    </Reveal>
    
    <Reveal delay={200} className="w-full max-w-5xl">
      <div className="overflow-hidden bg-card rounded-lg shadow-sm border border-border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-border">
              <th className="text-left p-6 text-xs font-semibold uppercase tracking-wider text-primary w-1/4">Focus Area</th>
              <th className="text-left p-6 text-xs font-semibold uppercase tracking-wider text-primary w-1/4">Deliverable</th>
              <th className="text-left p-6 text-xs font-semibold uppercase tracking-wider text-primary w-1/2">Value</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Competitive Analysis', 'Market positioning map', 'Identify differentiation opportunities vs. local and international competitors'],
              ['Messaging Review', 'Verbal identity assessment', 'Align tone and language with professional medical standards'],
              ['Stakeholder Input', 'Perception interviews', 'Understand how decision-makers currently view F.F. Foundation']
            ].map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-white transition-colors group">
                <td className="p-6 text-sm text-primary font-medium group-hover:text-accent transition-colors">{row[0]}</td>
                <td className="p-6 text-sm text-secondary">{row[1]}</td>
                <td className="p-6 text-sm text-secondary font-light">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
    
    <Reveal delay={400} className="mt-10 max-w-3xl w-full">
      <div className="bg-white border border-border p-6 rounded-lg shadow-sm">
        <p className="text-sm text-secondary leading-relaxed font-light italic text-center">
          "A brand audit provides data-driven insights rather than subjective opinions. This ensures subsequent investments address actual market perception gaps, not assumptions."
        </p>
      </div>
    </Reveal>
  </SlideWrapper>
);

// --- 05. Phase 2 Slide ---
export const PhaseTwoSlide: React.FC<{ id: string }> = ({ id }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
    }
  }, []);

  return (
    <SlideWrapper id={id} slideNumber="06">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-light mb-2 text-primary tracking-tight text-center">Phase 2: Visual Identity Refresh</h2>
        <h3 className="text-sm text-[#999] font-medium mb-12 uppercase tracking-[2px] text-center">Creating visual consistency</h3>
      </Reveal>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl items-center">
        {/* Left Column: Content */}
        <div className="space-y-6">
          <Reveal delay={200}>
            <div className="bg-card p-8 rounded-lg shadow-sm border border-border hover:shadow-md transition-all duration-300">
              <h3 className="text-base font-semibold text-primary mb-4">Brand System Components</h3>
              <ul className="space-y-3 text-sm text-secondary font-light">
                <li className="flex gap-3"><span className="text-accent">•</span> Logo refinement to reflect modern medical infrastructure</li>
                <li className="flex gap-3"><span className="text-accent">•</span> Professional color palette suited to healthcare environments</li>
                <li className="flex gap-3"><span className="text-accent">•</span> Typography system for technical documentation</li>
                <li className="flex gap-3"><span className="text-accent">•</span> Comprehensive brand guidelines for all touchpoints</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="bg-card p-8 rounded-lg shadow-sm border-l-4 border-accent hover:shadow-md transition-all duration-300">
              <h3 className="text-base font-semibold text-primary mb-4">Expected Outcome</h3>
              <p className="text-sm text-secondary leading-relaxed font-light">
                Consistent brand presentation across email signatures, presentations, on-site signage, and digital platforms. Every interaction reinforces professionalism and reliability.
              </p>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className="pt-2 px-2">
              <p className="text-xs text-secondary leading-relaxed">
                <strong>Research insight:</strong> Organizations with consistent brand presentation are 3-4 times more likely to achieve excellent brand visibility.
                <span className="block text-[#bbb] mt-1 uppercase tracking-wider text-[0.65rem] font-medium">Source: Marq Brand Consistency Study</span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Video Player */}
        <Reveal delay={300} className="w-full h-full">
          <div className="relative group w-full flex flex-col items-center justify-center">
            <div className="relative w-full overflow-hidden rounded-xl shadow-2xl bg-black aspect-video ring-1 ring-black/5">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="https://5efocrpdcf1ikwvu.public.blob.vercel-storage.com/grok-video-0c79ecb7-5355-49bc-b325-109b9410efdc.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none z-10">
                <div className="text-white text-sm font-medium tracking-wide">Proposed Visual Language</div>
                <div className="text-white/70 text-xs font-light mt-1">Modern, Clean, Clinical Precision</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SlideWrapper>
  );
};

// --- 06. Phase 3 Slide ---
export const PhaseThreeSlide: React.FC<{ id: string }> = ({ id }) => (
  <SlideWrapper id={id} slideNumber="07">
    <Reveal>
      <h2 className="text-3xl md:text-4xl font-light mb-2 text-primary tracking-tight text-center">Phase 3: PR & Communications</h2>
      <h3 className="text-sm text-[#999] font-medium mb-12 uppercase tracking-[2px] text-center">Building credibility and visibility</h3>
    </Reveal>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
      <Reveal delay={200} className="h-full">
        <div className="bg-card p-10 rounded-lg border border-border hover:shadow-lg transition-all duration-300 h-full">
          <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-6 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
          </div>
          <h3 className="text-lg font-medium text-primary mb-6">Content Strategy</h3>
          <div className="space-y-4">
            <p className="text-sm text-secondary font-light"><strong className="font-medium text-primary block mb-1">Thought Leadership</strong> Articles by leadership on healthcare infrastructure</p>
            <p className="text-sm text-secondary font-light"><strong className="font-medium text-primary block mb-1">Case Studies</strong> Document successful installations with narrative details</p>
            <p className="text-sm text-secondary font-light"><strong className="font-medium text-primary block mb-1">Media Relations</strong> Secure coverage for major milestones and partnerships</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={400} className="h-full">
        <div className="bg-card p-10 rounded-lg border border-border hover:shadow-lg transition-all duration-300 h-full">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6 text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
          </div>
          <h3 className="text-lg font-medium text-primary mb-6">Distribution Channels</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></span>
              <p className="text-sm text-secondary font-light">LinkedIn for direct access to hospital decision-makers</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></span>
              <p className="text-sm text-secondary font-light">Industry publications relevant to the healthcare sector</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></span>
              <p className="text-sm text-secondary font-light">Targeted email communications with value-driven content</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
    
    <Reveal delay={600} className="mt-12 max-w-3xl w-full">
      <div className="border-t border-b border-border py-6 text-center">
        <p className="text-sm text-secondary leading-relaxed font-light">
          <strong>B2B buyer behavior:</strong> The average B2B buyer consumes 13 pieces of content during their purchasing journey—8 from vendors and 5 from third-party sources.
        </p>
        <p className="text-[0.6rem] text-[#bbb] mt-2 uppercase tracking-widest font-medium">Source: FocusVision Content Consumption Study</p>
      </div>
    </Reveal>
  </SlideWrapper>
);

// --- 07. Phase 4 Slide ---
export const PhaseFourSlide: React.FC<{ id: string }> = ({ id }) => (
  <SlideWrapper id={id} slideNumber="08">
    <Reveal>
      <h2 className="text-3xl md:text-4xl font-light mb-2 text-primary tracking-tight text-center">Phase 4: Catalogue Design</h2>
      <h3 className="text-sm text-[#999] font-medium mb-12 uppercase tracking-[2px] text-center">Professional sales materials</h3>
    </Reveal>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-10">
      {[
        { title: 'Premium Materials', desc: 'High-quality paper and binding that positions the catalogue as a reference document rather than disposable marketing material.' },
        { title: 'Technical Clarity', desc: 'Clear schematics, high-resolution photography, and factual specifications prioritized over marketing language.' },
        { title: 'Solution-Based', desc: 'Organized by hospital need (Surgical Suite, Sterilization) rather than by manufacturer for easier navigation.' }
      ].map((item, i) => (
        <Reveal key={i} delay={i * 150}>
          <div className="bg-card p-8 rounded-lg shadow-sm border border-transparent hover:border-border hover:shadow-md transition-all duration-300 h-full">
            <h3 className="text-base font-semibold text-primary mb-4">{item.title}</h3>
            <p className="text-sm text-secondary leading-relaxed font-light">{item.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
    <Reveal delay={600}>
      <p className="text-center text-sm text-[#999] max-w-2xl mx-auto italic font-light">
        "The catalogue often represents the final touchpoint before contract discussions. Its quality should reflect the precision of the equipment being offered."
      </p>
    </Reveal>
  </SlideWrapper>
);

// --- 08. Phase 5 Slide ---
export const PhaseFiveSlide: React.FC<{ id: string }> = ({ id }) => (
  <SlideWrapper id={id} slideNumber="09">
    <Reveal>
      <h2 className="text-3xl md:text-4xl font-light mb-2 text-primary tracking-tight text-center">Phase 5: Website Redesign</h2>
      <h3 className="text-sm text-[#999] font-medium mb-12 uppercase tracking-[2px] text-center">Digital showroom for B2B buyers</h3>
    </Reveal>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
      <Reveal delay={200}>
        <div className="bg-card p-10 rounded-lg shadow-sm border border-border hover:shadow-lg transition-all duration-300 h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <h3 className="text-lg font-medium text-primary mb-6 relative z-10">User Experience (UX)</h3>
          <ul className="space-y-4 text-sm text-secondary font-light relative z-10">
            {['Responsive design optimized for tablets and mobile', 'Intuitive navigation with clear information architecture', 'Fast loading times and clean visual hierarchy', 'Solution-based content organization'].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      
      <Reveal delay={400}>
        <div className="bg-card p-10 rounded-lg shadow-sm border-l-4 border-accent hover:shadow-lg transition-all duration-300 h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h3 className="text-lg font-medium text-primary mb-6 relative z-10">Trust Elements</h3>
          <ul className="space-y-4 text-sm text-secondary font-light relative z-10">
            {['Client testimonials prominently featured', 'Partner logos and certifications visible', '30-year heritage highlighted', 'Case studies with detailed project information'].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
    
    <Reveal delay={600} className="mt-12 max-w-3xl w-full">
      <div className="bg-primary/5 p-6 rounded-lg text-center">
        <p className="text-sm text-primary leading-relaxed">
          <strong>Critical context:</strong> 70% of the B2B buying process is completed online before a supplier is contacted. Your website needs to answer questions and build confidence independently.
        </p>
        <p className="text-[0.6rem] text-secondary mt-2 uppercase tracking-widest font-medium">Source: Sopro / Forrester Research</p>
      </div>
    </Reveal>
  </SlideWrapper>
);

// --- 09. Integration Slide ---
export const IntegrationSlide: React.FC<{ id: string }> = ({ id }) => (
  <SlideWrapper id={id} slideNumber="10">
    <Reveal>
      <h2 className="text-3xl md:text-4xl font-light mb-4 text-primary tracking-tight text-center">Why An Integrated Approach?</h2>
      <p className="text-center text-[#999] mb-12 max-w-2xl mx-auto font-light">These initiatives build on each other sequentially for maximum impact</p>
    </Reveal>
    
    <div className="max-w-4xl w-full space-y-6">
      <Reveal delay={200}>
        <div className="bg-card border-l-4 border-primary p-10 hover:border-accent transition-colors shadow-sm rounded-r-lg">
          <h3 className="text-xl font-medium text-primary mb-4">Sequential Build</h3>
          <div className="flex flex-col md:flex-row gap-6 items-start">
             <div className="flex-1">
                <p className="text-sm text-secondary leading-relaxed mb-4 font-light">
                  The audit informs the brand refresh. The brand refresh guides the website, catalogue, and communications design. The PR strategy launches the new positioning into the market.
                </p>
             </div>
             <div className="flex-1">
                <p className="text-sm text-secondary leading-relaxed font-light">
                  Each phase depends on insights and deliverables from the previous one, ensuring alignment and efficiency. Disconnected efforts waste budget and dilute impact.
                </p>
             </div>
          </div>
        </div>
      </Reveal>
      
      <Reveal delay={400}>
        <div className="bg-card p-10 rounded-lg hover:shadow-lg transition-all duration-300 border border-border">
          <h3 className="text-xl font-medium text-primary mb-6">Partial Implementation Risks</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded border border-gray-100">
              <strong className="text-primary text-sm block mb-2">Website without brand</strong>
              <p className="text-xs text-secondary font-light">Improved UX but inconsistent identity confuses users</p>
            </div>
            <div className="bg-white p-4 rounded border border-gray-100">
              <strong className="text-primary text-sm block mb-2">PR without website</strong>
              <p className="text-xs text-secondary font-light">Generates traffic without conversion infrastructure</p>
            </div>
            <div className="bg-white p-4 rounded border border-gray-100">
              <strong className="text-primary text-sm block mb-2">Catalogue with old brand</strong>
              <p className="text-xs text-secondary font-light">Sends mixed signals to prospects about modernization</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </SlideWrapper>
);

// --- 10. Outcomes Slide ---
export const OutcomesSlide: React.FC<{ id: string }> = ({ id }) => (
  <SlideWrapper id={id} slideNumber="11">
    <Reveal>
      <h2 className="text-3xl md:text-4xl font-light mb-16 text-primary tracking-tight text-center">Expected Outcomes</h2>
    </Reveal>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-16">
      <Reveal delay={200} className="h-full">
        <div className="text-center p-8 bg-card rounded-lg border border-transparent hover:border-accent/20 hover:shadow-md transition-all duration-300 h-full">
          <div className="text-3xl font-light text-accent mb-4">Measurable</div>
          <div className="w-12 h-0.5 bg-border mx-auto mb-4"></div>
          <div className="text-sm text-secondary font-light">Increase in qualified lead generation from improved digital presence</div>
        </div>
      </Reveal>
      <Reveal delay={300} className="h-full">
        <div className="text-center p-8 bg-card rounded-lg border border-transparent hover:border-accent/20 hover:shadow-md transition-all duration-300 h-full">
          <div className="text-3xl font-light text-accent mb-4">Sustained</div>
          <div className="w-12 h-0.5 bg-border mx-auto mb-4"></div>
          <div className="text-sm text-secondary font-light">Revenue growth from consistent brand positioning and market trust</div>
        </div>
      </Reveal>
      <Reveal delay={400} className="h-full">
        <div className="text-center p-8 bg-card rounded-lg border border-transparent hover:border-accent/20 hover:shadow-md transition-all duration-300 h-full">
          <div className="text-3xl font-light text-primary mb-4">3.5x</div>
          <div className="w-12 h-0.5 bg-border mx-auto mb-4"></div>
          <div className="text-sm text-secondary font-light mb-2">Improved brand visibility vs inconsistent competitors</div>
          <p className="text-[0.6rem] text-[#bbb] uppercase tracking-widest">Source: Marq Brand Report</p>
        </div>
      </Reveal>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
      <Reveal delay={500}>
        <div className="bg-card p-8 rounded-lg border border-border">
          <h3 className="text-base font-semibold text-primary mb-4">Business Benefits</h3>
          <ul className="space-y-3 text-sm text-secondary font-light">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div>Enhanced market credibility</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div>Stronger partner relationships</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div>Improved competitive positioning</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div>Foundation for sustainable growth</li>
          </ul>
        </div>
      </Reveal>
      <Reveal delay={600}>
        <div className="bg-card p-8 rounded-lg border-l-4 border-accent shadow-sm">
          <h3 className="text-base font-semibold text-primary mb-4">Timeline Estimates</h3>
          <ul className="space-y-3 text-sm text-secondary font-light">
            <li className="flex justify-between"><span>Phases 1-2</span> <span className="text-primary font-medium">8-10 weeks</span></li>
            <li className="flex justify-between"><span>Phases 3-5</span> <span className="text-primary font-medium">12-14 weeks</span></li>
            <li className="flex justify-between"><span>Full implementation</span> <span className="text-primary font-medium">5-6 months</span></li>
            <li className="flex justify-between border-t border-border pt-2 mt-2"><span>Market impact visible</span> <span className="text-accent font-medium">12-18 months</span></li>
          </ul>
        </div>
      </Reveal>
    </div>
  </SlideWrapper>
);

// --- 11. Next Steps Slide ---
export const NextStepsSlide: React.FC<{ id: string }> = ({ id }) => (
  <SlideWrapper id={id} slideNumber="12">
    <Reveal>
      <h2 className="text-3xl md:text-4xl font-light mb-16 text-primary tracking-tight text-center">Recommended Next Steps</h2>
    </Reveal>
    
    <div className="max-w-4xl w-full space-y-8">
      <Reveal delay={200}>
        <div className="bg-card border-l-4 border-primary p-10 hover:border-accent transition-colors shadow-sm rounded-r-lg">
          <h3 className="text-xl font-medium text-primary mb-4">Strategic Priority</h3>
          <p className="text-lg text-secondary leading-relaxed font-light">
            F.F. Foundation's operational excellence and product quality deserve a brand identity that matches. The gap between capability and market perception represents both a risk and an opportunity.
          </p>
        </div>
      </Reveal>
      
      <Reveal delay={400}>
        <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <h3 className="text-lg font-medium text-primary mb-6 text-center uppercase tracking-widest text-xs">Proposed Path Forward</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <div>
                <strong className="block text-primary text-sm mb-1">Approval</strong>
                <span className="text-sm text-secondary font-light">Review and approve strategic framework</span>
              </div>
            </div>
             <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <div>
                <strong className="block text-primary text-sm mb-1">Foundation</strong>
                <span className="text-sm text-secondary font-light">Initiate Phase 1 (Brand Audit) for data</span>
              </div>
            </div>
             <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm font-bold shrink-0">3</span>
              <div>
                <strong className="block text-primary text-sm mb-1">Planning</strong>
                <span className="text-sm text-secondary font-light">Develop detailed project plan and timeline</span>
              </div>
            </div>
             <div className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-lg">4</span>
              <div>
                <strong className="block text-primary text-sm mb-1">Execution</strong>
                <span className="text-sm text-secondary font-light">Begin sequential implementation</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </SlideWrapper>
);