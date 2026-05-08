import { useState } from "react";
import confetti from "canvas-confetti";

export function usePrompts() {
  const [promptText, setPromptText] = useState("You are an expert AI assistant specialized in writing deep and engaging copy for a new Web3 Prompt IDE. Describe the 'Navy Blue Glow' aesthetic in exactly two sentences.");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  // Multi-Model outputs
  const [gptOutput, setGptOutput] = useState("");
  const [claudeOutput, setClaudeOutput] = useState("");
  const [geminiOutput, setGeminiOutput] = useState("");

  const [credits, setCredits] = useState(10000);

  const triggerConfetti = () => {
    const end = Date.now() + 1.5 * 1000;
    const colors = ['#f43f5e', '#3b82f6', '#ffffff'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const generateOutput = async () => {
    if (credits < 10) return;
    setIsGenerating(true);
    setIsVerified(false);
    setCredits(prev => prev - 10);
    
    // Mock the API delay
    return new Promise((resolve) => {
      setTimeout(() => {
         setGptOutput("The Navy Blue Glow aesthetic merges deep oceanic darkness with striking luminescent high-contrast accents, representing the cutting-edge of modern interfaces. It creates an atmosphere of focused power, where stark contrasts guide the eye seamlessly.");
         setClaudeOutput("Our Navy Blue Glow aesthetic defines the standard for premium software, pairing a fathomless dark background with sharp, neon-pink and blue features. This bold visual language signals immense and robust technological sophistication.");
         setGeminiOutput("Immersive and beautifully futuristic, the Navy Blue Glow aesthetic contrasts an abyssal #020617 backdrop against electric highlights. It serves as the ultimate professional visual translation of ProCaptcha's core mission.");
         setIsGenerating(false);
         setIsVerified(true);
         triggerConfetti();
         resolve(true);
      }, 3000);
    });
  };

  return {
    promptText,
    setPromptText,
    isGenerating,
    isVerified,
    gptOutput,
    claudeOutput,
    geminiOutput,
    credits,
    generateOutput
  };
}
