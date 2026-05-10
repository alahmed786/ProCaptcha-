import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Settings, Save, Play, Clock, ChevronDown, ListTree, SplitSquareHorizontal, History, Plus } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Textarea } from "../components/ui/Textarea";

export function Ide() {
  const [activeTab, setActiveTab] = useState<"editor" | "builder">("editor");
  const [promptInput, setPromptInput] = useState("");
  const [version, setVersion] = useState("v1.2");
  const [isVersionOpen, setIsVersionOpen] = useState(false);

  return (
    <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden bg-[#050505]">
      {/* Left Sidebar - History & Prompts */}
      <div className="w-64 border-r border-white/10 flex flex-col bg-[#0a0a0a]/50">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <span className="font-bold text-sm tracking-widest text-white/50 uppercase">Library</span>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {["System Prompt core", "Greeting Agent", "Data Extractor", "Tone Analyzer"].map((name, i) => (
            <button key={i} className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-3 transition-colors ${i === 0 ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"}`}>
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span className="truncate">{name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Center Area */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top toolbar */}
        <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-[#0a0a0a]/80 backdrop-blur-sm z-10 shrink-0">
          <div className="flex items-center gap-1 bg-black rounded-lg p-1 border border-white/10">
             <button 
                onClick={() => setActiveTab("editor")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'editor' ? 'bg-white/10 text-brand' : 'text-white/50 hover:bg-white/5'}`}
             >
                <div className="flex flex-center gap-1.5">
                   <MessageSquare className="w-4 h-4" />
                   Editor
                </div>
             </button>
             <button 
                onClick={() => setActiveTab("builder")}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${activeTab === 'builder' ? 'bg-white/10 text-brand-purple' : 'text-white/50 hover:bg-white/5'}`}
             >
                <div className="flex flex-center gap-1.5">
                   <ListTree className="w-4 h-4" />
                   Chain Builder
                </div>
             </button>
          </div>

          <div className="flex items-center gap-3">
             <div className="relative">
                <Button 
                   variant="outline" 
                   size="sm" 
                   onClick={() => setIsVersionOpen(!isVersionOpen)}
                   className="flex items-center gap-2 h-8 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/30"
                >
                   <History className="w-4 h-4 text-brand" />
                   {version}
                   <ChevronDown className="w-3 h-3" />
                </Button>
                
                <AnimatePresence>
                   {isVersionOpen && (
                      <motion.div 
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.95 }}
                         className="absolute top-full right-0 mt-2 w-48 bg-[#111] border border-white/10 rounded-lg shadow-xl overflow-hidden py-1 z-50"
                      >
                         {[
                            { v: 'v1.2', date: 'Just now', active: true },
                            { v: 'v1.1', date: '2 hrs ago', active: false },
                            { v: 'v1.0', date: 'Yesterday', active: false }
                         ].map(ver => (
                            <button 
                               key={ver.v}
                               onClick={() => { setVersion(ver.v); setIsVersionOpen(false); }}
                               className={`w-full text-left px-4 py-2 flex justify-between items-center text-sm ${ver.active ? 'bg-brand/10 text-brand' : 'text-white/70 hover:bg-white/5'}`}
                            >
                               <span className="font-mono">{ver.v}</span>
                               <span className="text-[10px] text-white/40">{ver.date}</span>
                            </button>
                         ))}
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>
             
             <Button variant="primary" size="sm" className="h-8 gap-1.5 px-3">
                <Save className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Save</span>
             </Button>
          </div>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-auto relative p-4 flex flex-col gap-4">
           {activeTab === "editor" ? (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="flex-1 flex flex-col gap-4"
             >
                {/* Text Editor */}
                <div className="flex-1 min-h-[50%] relative flex flex-col">
                   <Textarea 
                      placeholder="Enter system prompt here..."
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      className="flex-1 resize-none bg-black/40 border-white/10 text-base p-6 font-mono leading-relaxed rounded-xl shadow-inner focus:border-brand/50 focus:shadow-[0_0_15px_rgba(0,243,255,0.1)_inset]"
                   />
                   <div className="absolute bottom-4 right-4">
                      <Button variant="primary" className="rounded-full shadow-lg h-12 w-12 p-0 flex items-center justify-center">
                         <Play className="w-5 h-5 ml-1" />
                      </Button>
                   </div>
                </div>

                {/* Multi-model output preview */}
                <div className="h-64 rounded-xl border border-white/10 bg-black/40 p-4 flex flex-col overflow-hidden">
                   <div className="flex items-center justify-between mb-3 shrink-0">
                      <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center gap-2">
                         <SplitSquareHorizontal className="w-4 h-4" /> 
                         Completions Compare
                      </h4>
                   </div>
                   <div className="grid grid-cols-2 gap-4 flex-1 h-full min-h-0">
                      <div className="bg-white/5 rounded-lg p-3 border border-white/5 overflow-y-auto">
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-blue-400">GPT-4o</span>
                            <span className="text-[10px] text-white/30">1.2s</span>
                         </div>
                         <div className="text-sm text-white/70 font-mono">Ready to test prompt completions...</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/5 overflow-y-auto">
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-semibold text-orange-400">Claude 3.5 Sonnet</span>
                            <span className="text-[10px] text-white/30">0.9s</span>
                         </div>
                         <div className="text-sm text-white/70 font-mono">Ready to test prompt completions...</div>
                      </div>
                   </div>
                </div>
             </motion.div>
           ) : (
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               className="flex-1 rounded-xl border border-white/10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-20 flex items-center justify-center relative overflow-hidden"
             >
                {/* Mock Visual Builder Canvas */}
                <div className="absolute inset-0 right-0 top-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                   <Card glass className="w-48 p-4 shrink-0 shadow-[0_0_20px_rgba(0,243,255,0.15)] border-brand/30">
                      <div className="text-xs font-bold text-brand uppercase tracking-wider mb-2">Input Agent</div>
                      <div className="text-sm text-white/80">Data Extractor</div>
                   </Card>
                   
                   <div className="w-16 h-0.5 bg-gradient-to-r from-brand to-brand-purple relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-brand-purple rotate-45 transform" />
                   </div>
                   
                   <Card glass className="w-48 p-4 shrink-0 shadow-[0_0_20px_rgba(181,53,255,0.15)] border-brand-purple/30">
                      <div className="text-xs font-bold text-brand-purple uppercase tracking-wider mb-2">Verifier</div>
                      <div className="text-sm text-white/80">Tone Analyzer</div>
                   </Card>
                </div>
             </motion.div>
           )}
        </div>
      </div>

      {/* Right Sidebar - Settings */}
      <div className="w-72 border-l border-white/10 bg-[#0a0a0a]/80 p-4 flex flex-col overflow-y-auto">
        <div className="flex items-center gap-2 mb-6">
          <Settings className="w-4 h-4 text-white/50" />
          <h3 className="font-bold text-sm tracking-widest text-white/50 uppercase">Parameters</h3>
        </div>

        <div className="space-y-6">
           <div className="space-y-3">
              <label className="text-xs font-bold text-white/70 block">Primary Model</label>
              <select className="w-full bg-black border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:ring-1 focus:ring-brand focus:border-brand outline-none">
                 <option>GPT-4 Omni</option>
                 <option>Claude 3.5 Sonnet</option>
                 <option>Gemini 1.5 Pro</option>
              </select>
           </div>

           <div className="space-y-3">
              <div className="flex justify-between items-center">
                 <label className="text-xs font-bold text-white/70 block">Temperature</label>
                 <span className="text-xs text-brand font-mono">0.7</span>
              </div>
              <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-full accent-brand bg-white/10 h-1 rounded-full appearance-none outline-none" />
           </div>

           <div className="space-y-3">
              <div className="flex justify-between items-center">
                 <label className="text-xs font-bold text-white/70 block">Max Tokens</label>
                 <span className="text-xs text-white/50 font-mono">2048</span>
              </div>
              <input type="range" min="256" max="8192" step="256" defaultValue="2048" className="w-full accent-brand bg-white/10 h-1 rounded-full appearance-none outline-none" />
           </div>

           <div className="border-t border-white/10 pt-6 mt-6">
              <label className="text-xs font-bold text-white/70 block mb-3">Stop Sequences</label>
              <div className="flex gap-2">
                 <input type="text" placeholder="e.g. \n\n" className="flex-1 bg-black border border-white/10 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand" />
                 <Button variant="secondary" size="sm" className="px-3">+</Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
