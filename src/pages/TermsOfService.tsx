import React from "react";
import { FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.3)] group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">TERMS OF SERVICE</span>
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
          <h1 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">Terms of Service</h1>
          <p className="text-xl text-slate-400 mb-12 leading-relaxed">
            Welcome to our platform. By accessing or using our services, you agree to be bound by these terms. 
            Please read them carefully.
          </p>

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By creating an account or using our platform, you confirm your acceptance of these Terms of Service 
                and our Privacy Policy. If you do not agree, you must not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. User Accounts</h2>
              <p className="leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials. Any activity 
                under your account is your responsibility. Multi-accounting or automated bot access is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Proper Use</h2>
              <p className="leading-relaxed">
                Our platform is for human use only. Attempting to exploit, bypass, or interfere with our security 
                checks or reward systems will result in immediate permanent suspension of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Rewards and Payments</h2>
              <p className="leading-relaxed">
                Points and XP earned on the platform have no real-world cash value unless explicitly stated in a 
                specific promotion. We reserve the right to adjust reward rates and balances at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
              <p className="leading-relaxed">
                The platform is provided "as is" without warranties of any kind. We are not liable for any 
                indirect, incidental, or consequential damages arising from your use of our services.
              </p>
            </section>
          </div>

          <div className="mt-20 p-8 rounded-3xl bg-white/5 border border-white/10">
            <p className="text-sm font-medium italic">
              Last Updated: May 8, 2024. Continued use of our service implies acceptance of any changes to these terms.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
