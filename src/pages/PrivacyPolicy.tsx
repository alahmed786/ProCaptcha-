import React from "react";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">PRIVACY POLICY</span>
          </Link>
          <Link to="/" className="text-sm font-bold text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-40 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">Privacy Policy</h1>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            Your privacy is our anchor. This policy outlines how we handle your data with respect and transparency.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Data Collection</h2>
              <p className="leading-relaxed">
                We collect minimal data necessary to provide our services. This includes your account information, 
                task completion history, and basic system logs to ensure security and performance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Usage of Information</h2>
              <p className="leading-relaxed">
                Your data is primarily used to track your progress, calculate rewards, and maintain the integrity 
                of our leaderboard system. We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Security Measures</h2>
              <p className="leading-relaxed">
                We employ industry-standard encryption and security protocols to protect your data from unauthorized 
                access. Our systems are regularly audited for vulnerabilities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Cookies and Tracking</h2>
              <p className="leading-relaxed">
                We use essential cookies to maintain your session and preferences. Non-essential tracking is kept to 
                a minimum and is used only for improving our platform's user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
              <p className="leading-relaxed">
                You have the right to access, correct, or delete your personal data at any time. For such requests, 
                please contact our support team.
              </p>
            </section>
          </div>

          <div className="mt-20 p-8 rounded-3xl bg-white/5 border border-white/10">
            <p className="text-sm font-medium italic">
              Last Updated: May 8, 2024. We reserve the right to update this policy as our services evolve.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
