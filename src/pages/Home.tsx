import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, Play, CheckCircle2, Box, GitBranch, ShieldCheck, 
  History, Sparkles, ArrowRightLeft, Image as ImageIcon, Camera, 
  ScanText, ShoppingCart, ListChecks, Type, Send, MessageSquare, 
  Mail, User, AlertCircle 
} from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export function Home() {
  const [tickerValue, setTickerValue] = useState(1450392);
  const [optimizerState, setOptimizerState] = useState<'before' | 'typing' | 'after'>('before');

  // Typing Animation State
  const TYPING_MESSAGES = [
    "Next-Gen Micro-Task & Reward Engine",
    "Solve Tasks. Earn Daily Rewards.",
    "Verify, Engage, and Earn Points.",
    "Complete Tasks. Get Stack Rewards.",
    "Fast Verifications. High Rewards."
  ];
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = TYPING_MESSAGES[currentMessageIndex];
      
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        // Variable speed for more natural feel
        setTypingSpeed(50 + Math.random() * 50);
        
        if (displayText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000); 
          return;
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(40);
        
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentMessageIndex((prev) => (prev + 1) % TYPING_MESSAGES.length);
          setTypingSpeed(500); // Pause before starting next word
          return;
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentMessageIndex, typingSpeed]);

  // Contact Form State
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const fullPrompt = `# ROLE\nAct as a Senior Medical Technology Analyst...\n# TASK\nAuthor a comprehensive 1500-word editorial...\n# CONSTRAINTS\n- Tone: Clinical yet accessible...`;

  const rates = [
    { name: "Text Captcha", rate: "2,000", price: "$1.00", icon: "text_fields" },
    { name: "Image Captcha", rate: "2,500", price: "$1.00", icon: "wallpaper" },
    { name: "Slider Captcha", rate: "3,333", price: "$1.00", icon: "toys_and_games" },
    { name: "Emoji Captcha", rate: "3,333", price: "$1.00", icon: "emoji_symbols" },
    { name: "Tap Captcha", rate: "5,000", price: "$1.00", icon: "touch_app" },
    { name: "Math Captcha", rate: "5,000", price: "$1.00", icon: "casino" },
    { name: "Match Captcha", rate: "5,000", price: "$1.00", icon: "sound_detection_dog_barking" },
    { name: "Missing Captcha", rate: "3,333", price: "$1.00", icon: "flare" },
    { name: "Auto Captcha", rate: "5,000", price: "$1.00", icon: "robot_2" },
    { name: "Audio Captcha", rate: "2,500", price: "$1.00", icon: "voice_selection" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerValue(prev => prev + Math.floor(Math.random() * 7) + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setFormState('error');
      return;
    }
    
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id as keyof typeof errors]) {
       setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleStartFree = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f3ff', '#3b82f6', '#1e40af']
    });
  };

  return (
    <div className="flex-1 relative scroll-smooth">
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <motion.div 
           initial={{ opacity: 0, y: -20 }}
           animate={{ 
             opacity: 1, 
             y: 0,
           }}
           transition={{ duration: 0.5, ease: "easeOut" }} 
           className="group relative inline-flex items-center gap-3 rounded-full border border-blue-500/40 bg-blue-500/10 backdrop-blur-xl px-5 py-2 mb-8 shadow-[0_0_20px_rgba(59,130,246,0.2)] overflow-hidden h-[44px] sm:h-[52px]"
        >
          {/* Subtle Shine Effect */}
          <motion.div 
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent skew-x-12"
          />

          <div className="relative flex items-center gap-3 z-10 h-full">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
            </span>

            <div className="text-sm font-bold tracking-wide text-blue-600 dark:text-blue-300 w-[260px] sm:w-[380px] flex items-center justify-center h-full">
              <span className="whitespace-nowrap overflow-hidden">
                {displayText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-[2px] h-4 ml-1 bg-blue-500 dark:bg-blue-400"
              />
            </div>

            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1] flex flex-col items-center">
            <span className="bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto] bg-[image:var(--hero-red-gradient)]">
              Solve
            </span>
            <span className="bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto] bg-[image:var(--hero-red-gradient)]">
              Captchas
            </span>
            <span className="bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto] bg-[image:var(--hero-gradient)]">
              Earn
            </span>
            <span className="bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto] bg-[image:var(--hero-gradient)]">
              Rewards
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg md:text-xl text-[var(--text-secondary)] mb-12 font-medium">
            Join the most advanced reward engine. Solve various types of captchas and get rewarded in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-16">
            <Button onClick={handleStartFree} variant="primary" size="lg" className="w-full sm:w-auto rounded-full px-10 py-4 text-lg group h-14 bg-gradient-to-b from-blue-500 to-blue-700">
                Start Free 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform ml-2" />
            </Button>
            <Link to="#pricing">
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 h-14 text-lg group border-[var(--border-color)] hover:border-blue-500/50 bg-[var(--card-bg)] backdrop-blur-xl">
                Engage & Earn
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--text-secondary)] font-medium bg-[var(--card-bg)] backdrop-blur-md rounded-2xl w-fit mx-auto px-6 py-4 border border-[var(--border-color)]">
             {["9+ Variety", "Daily Tasks", "Fast & Secure", "Reliable Support"].map((feat) => (
               <div key={feat} className="flex items-center gap-2">
                 <CheckCircle2 className="w-4 h-4 text-green-400" />
                 <span>{feat}</span>
               </div>
             ))}
          </div>
        </motion.div>
      </div>

      {/* Reward Rates Section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-[var(--text-primary)]">Reward Rates</h2>
            <p className="text-xl text-[var(--text-secondary)] font-medium">Transparent reward structures for every captcha type.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {rates.map((rate, i) => (
               <motion.div
                key={rate.name}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
               >
                  <div className="group relative flex items-center justify-between p-5 bg-[var(--card-bg)] backdrop-blur-md border border-[var(--border-color)] rounded-2xl hover:bg-blue-500/5 transition-all duration-300 hover:border-blue-500/30">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-colors">
                         <span className="material-symbols-outlined text-blue-500 text-xl group-hover:text-blue-400">
                           {rate.icon}
                         </span>
                       </div>
                       <span className="font-semibold text-[var(--text-primary)] group-hover:text-blue-500 transition-colors">{rate.name}</span>
                     </div>
                     <div className="flex flex-col items-end">
                        <span className="text-xs text-[var(--text-secondary)] font-mono tracking-widest">{rate.rate}</span>
                        <span className="text-base font-extrabold text-[var(--text-primary)] mt-0.5 group-hover:text-blue-500">{rate.price}</span>
                     </div>
                  </div>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-[var(--text-primary)]">Get in Touch</h2>
            <p className="text-lg text-[var(--text-secondary)] font-medium">Have questions or need support? Our team is always online.</p>
          </div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-[var(--card-bg)] backdrop-blur-2xl p-8 md:p-12 relative overflow-hidden rounded-[40px] border border-[var(--border-color)]"
          >
            {formState === 'success' ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                 <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/30 transition-colors">
                    <Send className="w-8 h-8 text-blue-500" />
                 </div>
                 <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2 uppercase italic tracking-tighter">Transmission Successful</h3>
                 <p className="text-[var(--text-secondary)] font-medium leading-relaxed">We will respond shortly through secure channels.</p>
                 <Button variant="outline" className="mt-8" onClick={() => setFormState('idle')}>
                    Compose New Message
                 </Button>
              </div>
            ) : (
               <form onSubmit={handleContactSubmit} className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)] ml-4">Full Name</label>
                      <input 
                        id="name"
                        value={formData.name}
                        onChange={handleContactChange}
                        className={cn(
                          "w-full px-6 py-4 bg-[var(--input-bg)] border rounded-2xl text-[var(--text-primary)] font-medium focus:outline-none transition-all",
                          errors.name ? "border-rose-500 bg-rose-500/5" : "border-[var(--border-color)] focus:border-blue-500/50"
                        )}
                        placeholder="Your Name"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)] ml-4">Email Address</label>
                      <input 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleContactChange}
                        className={cn(
                          "w-full px-6 py-4 bg-[var(--input-bg)] border rounded-2xl text-[var(--text-primary)] font-medium focus:outline-none transition-all",
                          errors.email ? "border-rose-500 bg-rose-500/5" : "border-[var(--border-color)] focus:border-blue-500/50"
                        )}
                        placeholder="you@domain.com"
                      />
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] uppercase font-black tracking-widest text-[var(--text-secondary)] ml-4">Your Message</label>
                    <textarea 
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleContactChange}
                      className={cn(
                        "w-full px-6 py-4 bg-[var(--input-bg)] border rounded-2xl text-[var(--text-primary)] font-medium focus:outline-none transition-all resize-none",
                        errors.message ? "border-rose-500 bg-rose-500/5" : "border-[var(--border-color)] focus:border-blue-500/50"
                      )}
                      placeholder="Enter the Message"
                    />
                 </div>
                 <Button type="submit" variant="primary" className="w-full py-6 group h-14 bg-blue-600 font-bold uppercase tracking-widest" disabled={formState === 'submitting'}>
                    {formState === 'submitting' ? "Submitting..." : "Submit Message"}
                 </Button>
               </form>
            )}
          </motion.div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes text-shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-text-shimmer {
          animation: text-shimmer 4s ease infinite;
        }
      `}} />
    </div>
  );
}

