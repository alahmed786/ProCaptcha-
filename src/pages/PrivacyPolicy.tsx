import React from "react";
import { Shield, ArrowLeft, Eye, Lock, Database, Cookie, UserCheck, Mail, Info, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function PrivacyPolicy() {
  const sections = [
    {
      id: "data-collection",
      title: "1. Data Collection",
      icon: <Database className="w-5 h-5" />,
      content: "We collect minimal data necessary to provide our services. This includes your account information (email, username), task completion history, and basic system logs. We do not collect sensitive personal information without your explicit consent.",
      subpoints: ["Account credentials (encrypted)", "Transaction history", "IP addresses for security logs"]
    },
    {
      id: "usage",
      title: "2. Usage of Information",
      icon: <Eye className="w-5 h-5" />,
      content: "Your data is primarily used to track your progress, calculate rewards, and maintain the integrity of our leaderboard system. We use automated systems to detect and prevent fraudulent activity.",
      subpoints: ["Service optimization", "Fraud prevention", "Personalized experience"]
    },
    {
      id: "security",
      title: "3. Security Measures",
      icon: <Lock className="w-5 h-5" />,
      content: "We employ industry-standard encryption and security protocols. Our databases are isolated and require multi-factor authentication for administrative access. Your passwords are never stored in plain text.",
      subpoints: ["AES-256 Encryption", "SSL/TLS secure transit", "Regular security audits"]
    },
    {
      id: "cookies",
      title: "4. Cookies and Tracking",
      icon: <Cookie className="w-5 h-5" />,
      content: "We use essential cookies to maintain your session and preferences. We do not use third-party tracking cookies for advertising purposes.",
      subpoints: ["Session management", "User preferences", "Secure authentication"]
    },
    {
      id: "rights",
      title: "5. Your Rights",
      icon: <UserCheck className="w-5 h-5" />,
      content: "Under GDPR and other privacy laws, you have the right to access, export, or delete your personal data. You can exercise these rights directly through your account settings or by contacting our support.",
      subpoints: ["Right to access", "Right to erase", "Data portability"]
    },
    {
      id: "retention",
      title: "6. Data Retention",
      icon: <Clock className="w-5 h-5" />,
      content: "We retain your information for as long as your account is active or as needed to provide you services. If you wish to cancel your account or request that we no longer use your information, you may contact us. We will retain and use your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.",
      subpoints: ["Active account duration", "Legal hold override", "Archival records"]
    },
    {
      id: "third-party",
      title: "7. Third-Party Sharing",
      icon: <ArrowLeft className="w-5 h-5" />, // Reusing an icon or choosing a better one
      content: "We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.",
      subpoints: ["Trusted infrastructure partners", "Legal compliance", "No selling of data"]
    },
    {
      id: "updates",
      title: "8. Policy Updates",
      icon: <AlertCircle className="w-5 h-5" />,
      content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date at the top of this document. You are advised to review this Privacy Policy periodically for any changes.",
      subpoints: ["Periodic reviews", "Notification of changes", "Version tracking"]
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-[var(--text-secondary)] font-sans selection:bg-blue-500/30">
      <main className="max-w-6xl mx-auto px-6 pt-12 pb-32">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar / TOC */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-12">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors mb-12">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
              
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-50 mb-4 px-3">Sections</p>
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

              <div className="mt-12 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                <div className="flex items-center gap-2 text-blue-500 mb-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Privacy First</span>
                </div>
                <p className="text-[10px] leading-relaxed opacity-70">
                  Your data is encrypted and never sold to third parties.
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                <Clock className="w-3 h-3" /> Updated May 10, 2024
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-[var(--text-primary)] mb-8 tracking-tighter italic">
                Privacy <span className="text-blue-500">Policy</span>
              </h1>
              
              <p className="text-xl text-[var(--text-secondary)] mb-16 leading-relaxed max-w-2xl font-medium">
                At ProCaptcha, we believe privacy is a fundamental human right. 
                This document outlines exactly how we protect and process your data.
              </p>

              <div className="space-y-20">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24 group">
                    <div className="flex items-start gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center shrink-0 group-hover:border-blue-500/50 group-hover:bg-blue-500/5 transition-all duration-300">
                        {React.cloneElement(section.icon as React.ReactElement, { className: "w-6 h-6 text-blue-500" })}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4 tracking-tight uppercase italic">{section.title}</h2>
                        <p className="text-[var(--text-secondary)] leading-relaxed mb-6 font-medium">
                          {section.content}
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {section.subpoints.map((point, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] opacity-80 backdrop-blur-sm p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)]">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
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
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="max-w-md">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                      <Mail className="w-7 h-7 text-blue-500" />
                    </div>
                    <h3 className="text-3xl font-black text-[var(--text-primary)] mb-4 tracking-tight uppercase italic">Questions?</h3>
                    <p className="text-[var(--text-secondary)] font-medium mb-0">
                      Our privacy officer is available to answer any questions regarding your data rights.
                    </p>
                  </div>
                  <a href="mailto:privacy@procaptcha.io" className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95">
                    Contact Privacy Team
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
