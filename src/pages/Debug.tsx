import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertCircle, 
  AlertTriangle, 
  Info, 
  Trash2, 
  Search, 
  Filter,
  ChevronDown,
  ChevronUp,
  Clock,
  Terminal,
  ArrowLeft,
  Copy,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLogs, LogEntry, LogType } from '../context/LogContext';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';

export function Debug() {
  const { logs, clearLogs } = useLogs();
  const [filter, setFilter] = useState<LogType | 'all'>('all');
  const [search, setSearch] = useState('');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyAllLogs = () => {
    const allLogsText = logs.map(log => 
      `[${new Date(log.timestamp).toISOString()}] ${log.type.toUpperCase()}: ${log.message}${log.stack ? `\nStack: ${log.stack}` : ''}`
    ).join('\n\n');
    copyToClipboard(allLogsText, 'all');
  };

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.type === filter;
    const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getLogIcon = (type: LogType) => {
    switch (type) {
      case 'error': return <AlertCircle className="w-4 h-4 text-rose-500" />;
      case 'warn': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default: return <Terminal className="w-4 h-4 text-slate-400" />;
    }
  };

  const getLogStyles = (type: LogType) => {
    switch (type) {
      case 'error': return 'bg-rose-500/5 border-rose-500/20 text-rose-200';
      case 'warn': return 'bg-amber-500/5 border-amber-500/20 text-amber-200';
      default: return 'bg-white/5 border-white/10 text-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                <Terminal className="w-8 h-8 text-blue-500" />
                SYSTEM CONSOLE
              </h1>
              <p className="text-slate-500 text-sm font-medium">Real-time application logs and debugging interface.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={copyAllLogs}
              className="bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all flex items-center gap-2"
            >
              {copiedId === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedId === 'all' ? 'Copied All' : 'Copy All Logs'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearLogs}
              className="bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear Console
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {(['all', 'error', 'warn'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap",
                  filter === type 
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-600/20" 
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Logs Container */}
        <div className="bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden backdrop-blur-xl">
          <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>Entry History ({filteredLogs.length})</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Latest First</span>
            </div>
          </div>

          <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <AnimatePresence initial={false}>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={cn(
                      "group transition-all",
                      expandedLog === log.id ? "bg-white/[0.05]" : "hover:bg-white/[0.02]"
                    )}
                  >
                    <div 
                      className="p-4 cursor-pointer flex items-start gap-4"
                      onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                    >
                      <div className="mt-1 shrink-0">{getLogIcon(log.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4 mb-1">
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border",
                            getLogStyles(log.type)
                          )}>
                            {log.type}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className={cn(
                          "text-sm font-medium leading-relaxed break-all",
                          expandedLog === log.id ? "whitespace-pre-wrap" : "line-clamp-2"
                        )}>
                          {log.message}
                        </p>
                      </div>
                      <div className="mt-1 flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(`${log.message}${log.stack ? `\n\nStack Trace:\n${log.stack}` : ''}`, log.id);
                          }}
                          className={cn(
                            "p-2 rounded-lg transition-all",
                            copiedId === log.id 
                              ? "bg-emerald-500/20 text-emerald-400" 
                              : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                          )}
                          title="Copy to clipboard"
                        >
                          {copiedId === log.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <div className="text-slate-600">
                          {expandedLog === log.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {expandedLog === log.id && log.stack && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="px-4 pb-4 overflow-hidden"
                      >
                        <div className="bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-xs text-slate-400 overflow-x-auto whitespace-pre">
                          {log.stack}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="p-20 text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <Terminal className="w-8 h-8 text-slate-600" />
                  </div>
                  <h3 className="text-white font-bold mb-1">Clean Slate</h3>
                  <p className="text-slate-500 text-sm">No {filter !== 'all' ? filter : ''} logs matching your criteria found.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-300/60 leading-relaxed">
            Note: This interface captures console output for debugging purposes only. 
            Logs are stored locally in the session and are cleared upon page refresh unless persistent storage is implemented.
            Sensitive information should not be logged in production environments.
          </p>
        </div>
      </div>
    </div>
  );
}
