import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, KeyRound, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/authService";
import { signInWithCustomToken } from "../lib/firebase";
import { auth } from "../lib/firebase";

export function Auth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey.trim()) {
      setError("Access Key is required.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await authService.verifyOtp(accessKey.trim());
      
      if (response.success && response.customToken) {
        // 1. Authenticate with Firebase using the custom token
        const userCredential = await signInWithCustomToken(auth, response.customToken);
        
        // 2. Get the standard ID token (standard JWT with kid header)
        const idToken = await userCredential.user.getIdToken(true);
        
        // 3. Now send this standard ID token to the security-server for final gateway verification
        // This ensures the security-server receives a token it can verify against Google JWKS
        const gatewayResponse = await authService.invokeAuthenticated('login-handler', 'login', {
          user_id: userCredential.user.uid
        }, idToken);

        if (gatewayResponse && gatewayResponse.success) {
          navigate('/dashboard');
        } else {
          setError(gatewayResponse?.error || "Gateway authentication failed.");
          await auth.signOut();
        }
      } else {
        setError(response.error || "Invalid Access Key. Please check the key from your app.");
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError("Authentication failed. " + (err.message || "Please try again later."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-[calc(100vh-80px)] relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse-border" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none animate-pulse-border" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm relative z-10"
      >
        <Card glass={false} whileHover={{ y: 0 }} className="p-8 bg-[#090e1a]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-blue-500/10 rounded-3xl relative">
          {/* Subtle top highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-blue-400/40 to-transparent opacity-100" />
          
          <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-10 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
                Secure Access
              </h1>
              <p className="text-sm font-medium text-slate-400">
                Please authenticate with your access key.
              </p>
            </div>

            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              noValidate
            >
              <div className="space-y-1">
                <div className="relative group/input flex flex-col">
                    <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${error ? 'text-rose-500' : 'text-slate-500 group-focus-within/input:text-blue-400'}`}>
                      <KeyRound className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <input 
                      type="text" 
                      id="accessKey"
                      value={accessKey}
                      onChange={(e) => {
                        setAccessKey(e.target.value);
                        if (error) setError("");
                      }}
                      className={`block w-full pl-12 pr-4 py-4 border bg-[#020617] rounded-xl text-white font-medium focus:outline-none transition-all duration-300 placeholder-slate-500 shadow-inner ${error ? 'border-rose-500/50 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-rose-500/5' : 'border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20'}`}
                      placeholder="Enter Access Key"
                      autoComplete="off"
                      autoFocus
                    />
                </div>
                <AnimatePresence>
                    {error && (
                       <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-xs text-rose-400 font-medium pl-2 flex items-center gap-1.5 pt-1">
                         <AlertCircle className="w-3.5 h-3.5" />
                         {error}
                       </motion.span>
                    )}
                </AnimatePresence>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full text-sm font-bold tracking-wide py-4 bg-blue-600 hover:bg-blue-500 rounded-xl group/btn h-14 relative overflow-hidden border border-blue-400/30 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                disabled={isLoading || accessKey.trim().length < 4}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover/btn:animate-[shimmer_2s_infinite]" />
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_50%)] transition-opacity duration-500" />

                
                <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                  {isLoading ? (
                    <span className="animate-pulse tracking-widest uppercase">Verifying...</span>
                  ) : (
                    <>
                       SUBMIT KEY
                       <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </Button>
            </motion.form>

            <div className="mt-8 text-center pt-6">
              <span className="text-sm text-slate-400 font-medium">
                Don't have a key?{" "}
                <Link to="/get-key" className="text-white hover:text-blue-400 transition-colors font-bold underline decoration-white/20 hover:decoration-blue-400/50 underline-offset-4">
                  Get it Now
                </Link>
              </span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
