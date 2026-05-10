import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { LiquidBackground } from "./LiquidBackground";
import { ScrollToTop } from "../ui/ScrollToTop";

export function Layout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="relative min-h-screen flex flex-col text-[var(--text-primary)] bg-[var(--bg-color)] selection:bg-blue-500/30 overflow-x-hidden font-sans transition-colors duration-300">
      <LiquidBackground />
      <Navbar />
      <ScrollToTop />
      <div className="relative z-10 flex flex-col min-h-screen pt-24">
        <main className="flex-1 flex flex-col w-full h-full pb-0 md:pb-8">
          <Outlet />
        </main>
        {!isDashboard && <Footer />}
      </div>
    </div>
  );
}
