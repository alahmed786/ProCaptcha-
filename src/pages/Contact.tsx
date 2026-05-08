import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, MessageSquare, Mail, User, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/Button";

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setFormState('error');
      return;
    }
    
    setFormState('submitting');
    console.log("Mock: Contact form submitted");
    setTimeout(() => {
      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id as keyof typeof errors]) {
       setErrors(prev => ({ ...prev, [id]: '' }));
    }
    if (formState === 'error') {
       setFormState('idle');
    }
  };

  return (
    <div className="flex-1 py-8 relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-2xl px-4 sm:px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">Get in Touch</h1>
          <p className="text-lg text-slate-400 font-medium">
            Have questions about ProCaptcha? Our team is here to help you scale your AI engineering.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
           className="glass-panel p-8 md:p-10 relative overflow-hidden rounded-3xl"
        >
          <div className="absolute inset-0 bg-noise mix-blend-overlay pointer-events-none" />
          <div className="relative z-10">
            {formState === 'success' ? (
              <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="py-12 flex flex-col items-center justify-center text-center h-full"
              >
                 <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/30 relative">
                    <div className="absolute inset-0 bg-blue-500 blur-md opacity-30" />
                    <Send className="w-8 h-8 text-cyan-400 relative z-10" />
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Message Sent!</h3>
                 <p className="text-slate-400 max-w-md font-medium leading-relaxed">We've received your inquiry and will get back to you within 24 hours.</p>
                 <Button variant="outline" className="mt-8 shadow-[0_0_15px_rgba(255,255,255,0.05)]" onClick={() => setFormState('idle')}>
                    Send another message
                 </Button>
              </motion.div>
            ) : (
               <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Floating Label Input */}
                   <div className="relative group flex flex-col gap-1">
                     <div className="relative">
                         <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${errors.name ? 'text-rose-500' : 'text-slate-500 group-focus-within:text-blue-400'}`}>
                           <User className="h-5 w-5" />
                         </div>
                         <input 
                           type="text" 
                           id="name"
                           value={formData.name}
                           onChange={handleChange}
                           className={`block w-full pl-12 pr-4 py-4 border bg-[#020617]/50 rounded-xl text-white font-medium focus:outline-none transition-all peer placeholder-transparent shadow-inner ${errors.name ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50 bg-rose-500/5' : 'border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 hover:border-white/20'}`}
                           placeholder="Name"
                         />
                         <label htmlFor="name" className={`absolute left-12 -top-2.5 px-1 bg-[#090e1f] text-[10px] uppercase font-bold tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-[10px] peer-focus:bg-[#090e1f] rounded ${errors.name ? 'text-rose-400 peer-placeholder-shown:text-rose-500/70 peer-focus:text-rose-400' : 'text-slate-500 peer-placeholder-shown:text-slate-500 peer-focus:text-blue-400'}`}>
                           Full Name
                         </label>
                     </div>
                     <AnimatePresence>
                        {errors.name && (
                           <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-rose-400 font-medium pl-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</motion.span>
                        )}
                     </AnimatePresence>
                   </div>
                   
                   <div className="relative group flex flex-col gap-1">
                     <div className="relative">
                         <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${errors.email ? 'text-rose-500' : 'text-slate-500 group-focus-within:text-blue-400'}`}>
                           <Mail className="h-5 w-5" />
                         </div>
                         <input 
                           type="email" 
                           id="email"
                           value={formData.email}
                           onChange={handleChange}
                           className={`block w-full pl-12 pr-4 py-4 border bg-[#020617]/50 rounded-xl text-white font-medium focus:outline-none transition-all peer placeholder-transparent shadow-inner ${errors.email ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50 bg-rose-500/5' : 'border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 hover:border-white/20'}`}
                           placeholder="Email"
                         />
                         <label htmlFor="email" className={`absolute left-12 -top-2.5 px-1 bg-[#090e1f] text-[10px] uppercase font-bold tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-[10px] peer-focus:bg-[#090e1f] rounded ${errors.email ? 'text-rose-400 peer-placeholder-shown:text-rose-500/70 peer-focus:text-rose-400' : 'text-slate-500 peer-placeholder-shown:text-slate-500 peer-focus:text-blue-400'}`}>
                           Email Address
                         </label>
                     </div>
                     <AnimatePresence>
                        {errors.email && (
                           <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-rose-400 font-medium pl-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</motion.span>
                        )}
                     </AnimatePresence>
                   </div>
                 </div>

                 <div className="relative group flex flex-col gap-1">
                   <div className="relative">
                       <div className={`absolute top-4 left-0 pl-4 pointer-events-none transition-colors ${errors.message ? 'text-rose-500' : 'text-slate-500 group-focus-within:text-blue-400'}`}>
                         <MessageSquare className="h-5 w-5" />
                       </div>
                       <textarea 
                         id="message"
                         rows={5}
                         value={formData.message}
                         onChange={handleChange}
                         className={`block w-full pl-12 pr-4 py-4 border bg-[#020617]/50 rounded-xl text-white font-medium focus:outline-none transition-all peer placeholder-transparent resize-none shadow-inner ${errors.message ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/50 bg-rose-500/5' : 'border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 hover:border-white/20'}`}
                         placeholder="Message"
                       />
                       <label htmlFor="message" className={`absolute left-12 -top-2.5 px-1 bg-[#090e1f] text-[10px] uppercase font-bold tracking-wider transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-[10px] peer-focus:bg-[#090e1f] rounded ${errors.message ? 'text-rose-400 peer-placeholder-shown:text-rose-500/70 peer-focus:text-rose-400' : 'text-slate-500 peer-placeholder-shown:text-slate-500 peer-focus:text-blue-400'}`}>
                         How can we help?
                       </label>
                   </div>
                   <AnimatePresence>
                      {errors.message && (
                         <motion.span initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-[10px] text-rose-400 font-medium pl-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</motion.span>
                      )}
                   </AnimatePresence>
                 </div>

                 <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full text-base py-6 group h-14"
                    disabled={formState === 'submitting'}
                 >
                   {formState === 'submitting' ? (
                      <span className="flex items-center gap-2 animate-pulse font-bold tracking-wide">Sending...</span>
                   ) : (
                      <span className="flex items-center gap-2 font-bold tracking-wide">
                         Send Message
                         <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                   )}
                 </Button>
               </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
