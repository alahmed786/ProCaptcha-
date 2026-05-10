import React from "react";
import { FileText, ArrowLeft, CheckCircle2, UserCircle, ShieldAlert, BadgeInfo, Scale, Clock, Mail, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function TermsOfService() {
  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      icon: <CheckCircle2 className="w-5 h-5" />,
      content: "By creating an account or using our platform, you confirm your acceptance of these Terms of Service and our Privacy Policy. These terms apply to all visitors, users, and others who access or use the Service.",
      subpoints: ["Global applicability", "Electronic agreement", "Future updates"]
    },
    {
      id: "accounts",
      title: "2. User Accounts",
      icon: <UserCircle className="w-5 h-5" />,
      content: "You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.",
      subpoints: ["Age requirement (13+)", "Accurate registration", "Account security"]
    },
    {
      id: "use",
      title: "3. Proper Use",
      icon: <ShieldAlert className="w-5 h-5" />,
      content: "Our platform is for human use only. Attempting to exploit, bypass, or interfere with our security checks or reward systems will result in immediate permanent suspension. Automated scripts and bots are strictly banned.",
      subpoints: ["Manual input only", "No reverse engineering", "Anti-cheat compliance"]
    },
    {
      id: "rewards",
      title: "4. Rewards and Payments",
      icon: <BadgeInfo className="w-5 h-5" />,
      content: "Points and XP earned have no real-world cash value unless explicitly stated. We reserve the right to audit accounts and adjust balances if we detect system exploitation.",
      subpoints: ["Tiered reward system", "Zero cash value", "Balance adjustments"]
    },
    {
      id: "liability",
      title: "5. Limitation of Liability",
      icon: <Scale className="w-5 h-5" />,
      content: "The platform is provided \"as is\" without warranties of any kind. ProCaptcha is not liable for any indirect, incidental, or consequential damages arising from your use of the service.",
      subpoints: ["Service availability", "Data integrity", "Force Majeure"]
    },
    {
      id: "termination",
      title: "6. Termination",
      icon: <Clock className="w-5 h-5" />,
      content: "We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.",
      subpoints: ["Breach of terms", "Immediate suspension", "Survival clauses"]
    },
    {
      id: "conduct",
      title: "7. User Conduct",
      icon: <Mail className="w-5 h-5" />,
      content: "You agree not to use the Service for any purpose that is prohibited by these Terms. You are responsible for all of your activity in connection with the Service. You shall not (and shall not permit any third party to) either (a) take any action or (b) upload, download, post, submit or otherwise distribute or facilitate distribution of any content on or through the Service that: (i) is unlawful, threatening, abusive, harassing, defamatory, libelous, deceptive, fraudulent, invasive of another's privacy, tortious, obscene, vulgar, pornographic, offensive, profane, or is otherwise inappropriate as determined by us in our sole discretion.",
      subpoints: ["Prohibited content", "Responsible activity", "Discretionary removal"]
    },
    {
      id: "modifications",
      title: "8. Modifications to Service",
      icon: <Settings className="w-5 h-5" />,
      content: "We reserve the right to withdraw or amend our Service, and any service or material we provide via the Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Service is unavailable at any time or for any period.",
      subpoints: ["Discretionary changes", "Service availability", "No liability for downtime"]
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-[var(--text-secondary)] font-sans selection:bg-blue-500/30">
      <main className="max-w-6xl mx-auto px-6 pt-12 pb-32">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar / TOC */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-12">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-500 hover:text-indigo-400 transition-colors mb-12">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
              
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-50 mb-4 px-3">Agreement</p>
                {sections.map((section) => (
                  <a 
                    key={section.id}
                    href={`#${section.id}`}
                    className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-[var(--card-bg)] hover:text-[var(--text-primary)] transition-all"
                  >
                    {section.title}
                  </a>
                ))}
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                <div className="flex items-center gap-2 text-indigo-500 mb-2">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Compliance</span>
                </div>
                <p className="text-[10px] leading-relaxed opacity-70">
                  Stay updated. These terms protect both you and our platform.
                </p>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Clock className="w-3 h-3" /> Updated May 10, 2024
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] mb-8 tracking-tighter italic">
                Terms of <span className="text-indigo-500">Service</span>
              </h1>
              
              <p className="text-xl text-[var(--text-secondary)] mb-16 leading-relaxed max-w-2xl font-medium">
                Welcome to ProCaptcha. By using our service, you agree to these fundamental rules 
                designed to keep our ecosystem fair and secure for everyone.
              </p>

              <div className="space-y-20">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24 group">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center shrink-0 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/5 transition-all duration-300">
                        {React.cloneElement(section.icon as React.ReactElement, { className: "w-6 h-6 text-indigo-500" })}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 tracking-tight uppercase italic">{section.title}</h2>
                        <p className="text-[var(--text-secondary)] leading-relaxed mb-6 font-medium">
                          {section.content}
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {section.subpoints.map((point, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] opacity-80 backdrop-blur-sm p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)]">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-32 p-12 rounded-[40px] bg-[var(--card-bg)] border border-[var(--border-color)] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[80px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-md">
                    <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/20">
                      <Mail className="w-7 h-7 text-indigo-500" />
                    </div>
                    <h3 className="text-3xl font-black text-[var(--text-primary)] mb-4 tracking-tight uppercase italic">Legal Reach?</h3>
                    <p className="text-[var(--text-secondary)] font-medium mb-0">
                      For legal inquiries or terms clarification, our compliance team is ready to help.
                    </p>
                  </div>
                  <a href="mailto:legal@procaptcha.io" className="px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95">
                    Contact Legal Team
                  </a>
                </div>
              </div>

              
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
