import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type LogType = 'error' | 'warn' | 'info' | 'log';

export interface LogEntry {
  id: string;
  type: LogType;
  message: string;
  timestamp: number;
  stack?: string;
}

interface LogContextType {
  logs: LogEntry[];
  clearLogs: () => void;
  addLog: (type: LogType, message: string, stack?: string) => void;
}

const LogContext = createContext<LogContextType | undefined>(undefined);

export function LogProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((type: LogType, message: string, stack?: string) => {
    const newEntry: LogEntry = {
      id: Math.random().toString(36).substring(2, 11),
      type,
      message,
      timestamp: Date.now(),
      stack,
    };
    setTimeout(() => {
      setLogs((prev) => [newEntry, ...prev].slice(0, 500)); // Keep last 500 logs
    }, 0);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalLog = console.log;
    const originalInfo = console.info;

    console.error = (...args: any[]) => {
      const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ');
      addLog('error', message, new Error().stack);
      originalError.apply(console, args);
    };

    console.warn = (...args: any[]) => {
      const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ');
      addLog('warn', message);
      originalWarn.apply(console, args);
    };

    const handleWindowError = (event: ErrorEvent) => {
      addLog('error', `Runtime Error: ${event.message} at ${event.filename}:${event.lineno}`, event.error?.stack);
    };

    const handlePromiseRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message = typeof reason === 'object' ? JSON.stringify(reason) : String(reason);
      addLog('error', `Unhandled Promise Rejection: ${message}`, reason?.stack);
    };

    window.addEventListener('error', handleWindowError);
    window.addEventListener('unhandledrejection', handlePromiseRejection);

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      console.log = originalLog;
      console.info = originalInfo;
      window.removeEventListener('error', handleWindowError);
      window.removeEventListener('unhandledrejection', handlePromiseRejection);
    };
  }, [addLog]);

  return (
    <LogContext.Provider value={{ logs, clearLogs, addLog }}>
      {children}
    </LogContext.Provider>
  );
}

export function useLogs() {
  const context = useContext(LogContext);
  if (context === undefined) {
    throw new Error('useLogs must be used within a LogProvider');
  }
  return context;
}
