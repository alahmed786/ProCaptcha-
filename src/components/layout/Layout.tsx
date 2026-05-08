import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { LiquidBackground } from "./LiquidBackground";

export function Layout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="relative min-h-screen flex flex-col text-white bg-[#020617] selection:bg-blue-500/30 overflow-x-hidden font-sans">
      <LiquidBackground />
      <Navbar />
      <div className="relative z-10 flex flex-col min-h-screen pt-24">
        <main className="flex-1 flex flex-col w-full h-full pb-0 md:pb-8">
          <Outlet />
        </main>
        {!isDashboard && <Footer />}
      </div>
    </div>
  );
}
