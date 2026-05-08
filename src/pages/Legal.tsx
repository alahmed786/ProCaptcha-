import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";

interface LegalProps {
  documentType: "privacy" | "terms";
}

const docs = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      { id: "info", title: "1. Information We Collect", content: "We collect information to provide better services to our users. We may collect information implicitly, like your usage data, or explicitly, like your account details when you sign up." },
      { id: "use", title: "2. How We Use Information", content: "We use the data we collect to maintain and improve our services, develop new services, and protect ProCaptcha and our users." },
      { id: "sharing", title: "3. Information Sharing", content: "We do not share your personal information with companies, organizations, or individuals outside of ProCaptcha except in limited circumstances such as with your consent or for legal reasons." },
      { id: "security", title: "4. Data Security", content: "We work hard to protect you from unauthorized access, alteration, disclosure, or destruction of information we hold. We use encryption (HTTPS) to keep data private while in transit." },
    ]
  },
  terms: {
    title: "Terms of Service",
    sections: [
      { id: "acceptance", title: "1. Acceptance of Terms", content: "By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement." },
      { id: "license", title: "2. Usage License", content: "Permission is granted to temporarily download one copy of the materials on ProCaptcha's website for personal, non-commercial transitory viewing only." },
      { id: "user-content", title: "3. User Generated Content", content: "You retain all your ownership rights in your prompts. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute that content to provide the service." },
      { id: "limitations", title: "4. Limitations", content: "In no event shall ProCaptcha or its suppliers be liable for any damages arising out of the use or inability to use the materials on ProCaptcha's website." },
    ]
  }
};

export function Legal({ documentType }: LegalProps) {
  const doc = docs[documentType];
  const location = useLocation();

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row gap-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Sticky Sidebar Navigation */}
      <div className="md:w-64 shrink-0 relative z-10">
        <div className="sticky top-32 glass-panel p-6 rounded-2xl border border-white/5 bg-[#020617]/50">
          <div className="mb-8">
            <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-4">Legal Documents</h3>
            <div className="flex flex-col gap-2 relative">
              <div className="absolute left-[1px] top-0 bottom-0 w-px bg-white/10" />
              <Link 
                to="/privacy" 
                className={`pl-4 py-1 text-sm transition-all border-l-2 ${documentType === 'privacy' ? 'border-blue-500 text-white font-medium shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'border-transparent text-slate-500 hover:text-white'}`}
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className={`pl-4 py-1 text-sm transition-all border-l-2 ${documentType === 'terms' ? 'border-blue-500 text-white font-medium shadow-[0_0_10px_rgba(59,130,246,0.2)]' : 'border-transparent text-slate-500 hover:text-white'}`}
              >
                Terms of Service
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-4">Contents</h3>
            <ul className="space-y-2">
              {doc.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors block">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-3xl relative z-10 glass-panel p-8 md:p-16 rounded-3xl border border-white/10 bg-[#020617]/80">
        <div className="absolute inset-0 bg-noise mix-blend-overlay pointer-events-none rounded-3xl" />
        <motion.div
           key={location.pathname}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
           className="relative z-10"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">{doc.title}</h1>
          <p className="text-cyan-400/50 text-xs mb-12 uppercase tracking-widest font-bold font-mono">Last updated: Oct 24, 2026</p>

          <div className="space-y-12 text-slate-300 leading-relaxed font-serif text-lg">
            {doc.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-2xl font-bold font-sans text-white mb-4 tracking-tight drop-shadow-md">{section.title}</h2>
                <p>{section.content}</p>
                <div className="h-px border-t border-white/10 mt-12 w-full max-w-xs mx-auto opacity-50" />
              </section>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
