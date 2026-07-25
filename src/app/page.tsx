"use client";

import { useState } from "react";
import NetworkBackground from "@/components/NetworkBackground";
import WatermarkLogo from "@/components/WatermarkLogo";
import TaglineRotator from "@/components/TaglineRotator";
import CityNodes from "@/components/CityNodes";
import NotifyModal from "@/components/NotifyModal";
import { LinkedinIcon, InstagramIcon } from "@/components/SocialIcons";
import { Mail, ArrowUpRight, Lock } from "lucide-react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center px-4 py-8 md:py-12 overflow-hidden selection:bg-[#c9982a]/30">
      {/* Background Interactive Canvas */}
      <NetworkBackground />

      {/* Watermark Logo */}
      <WatermarkLogo />

      {/* Header Navigation / Brand Status */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between mx-auto mb-8 md:mb-12">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9496a1]">
            InvestQ Commune
          </span>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-xs font-semibold px-3.5 py-1.5 rounded-full border border-[#c9982a]/40 bg-[#c9982a]/10 text-[#e0c870] hover:bg-[#c9982a]/20 hover:border-[#c9982a] transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(201,152,42,0.15)]"
        >
          <Lock className="w-3 h-3 text-[#c9982a]" /> Private Invite
        </button>
      </header>

      {/* Main Content Card */}
      <main className="relative z-10 text-center max-w-2xl mx-auto my-auto py-4">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 glass-badge text-[#e0c870] text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#3a8a3a] animate-pulse-green" />
          <span>Launching August 2026</span>
        </div>

        {/* Brand Logo */}
        <div className="logo flex items-baseline justify-center gap-0 mb-6 leading-none select-none">
          <span className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#c9982a] text-glow-gold">
            iq
          </span>
          <span className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#f8f7f4]">
            commune
          </span>
          <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#3a8a3a] ml-1 self-end mb-2.5 sm:mb-3 animate-pulse-green" />
        </div>

        {/* Subline Description */}
        <p className="text-sm sm:text-base md:text-lg text-[#9496a1] leading-relaxed max-w-xl mx-auto mb-6">
          A room is taking shape — real professionals, real sessions, no pitch, no product. Coming soon, city by city, across India.
        </p>

        {/* Tagline Rotator */}
        <TaglineRotator />

        {/* Action Button */}
        <div className="my-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 rounded-2xl bg-[#c9982a] text-[#0f1117] font-bold text-sm hover:bg-[#e0c870] transition-all duration-300 shadow-[0_0_24px_rgba(201,152,42,0.4)] hover:shadow-[0_0_32px_rgba(224,200,112,0.6)] hover:-translate-y-0.5 active:translate-y-0"
          >
            Get Notified For Your City
          </button>
        </div>

        {/* Interactive City Nodes Component */}
        <CityNodes />

        {/* Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8">
          <a
            href="https://linkedin.com/company/iqcommune"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#9496a1] hover:text-[#e0c870] transition-colors group"
          >
            <span className="w-8 h-8 rounded-full border border-[#c9982a]/40 bg-[#c9982a]/10 flex items-center justify-center text-[#e0c870] group-hover:border-[#c9982a] group-hover:bg-[#c9982a]/20 group-hover:scale-105 transition-all">
              <LinkedinIcon className="w-4 h-4 text-[#e0c870]" />
            </span>
            <span>@iqcommune</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href="https://instagram.com/iqcommune"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#9496a1] hover:text-[#e0c870] transition-colors group"
          >
            <span className="w-8 h-8 rounded-full border border-[#c9982a]/40 bg-[#c9982a]/10 flex items-center justify-center text-[#e0c870] group-hover:border-[#c9982a] group-hover:bg-[#c9982a]/20 group-hover:scale-105 transition-all">
              <InstagramIcon className="w-4 h-4 text-[#e0c870]" />
            </span>
            <span>@iqcommune</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <a
            href="mailto:hello@iqcommune.com"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#9496a1] hover:text-[#e0c870] transition-colors group"
          >
            <span className="w-8 h-8 rounded-full border border-[#c9982a]/40 bg-[#c9982a]/10 flex items-center justify-center text-[#e0c870] group-hover:border-[#c9982a] group-hover:bg-[#c9982a]/20 group-hover:scale-105 transition-all">
              <Mail className="w-4 h-4 text-[#e0c870]" />
            </span>
            <span>hello@iqcommune.com</span>
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 text-center text-[11.5px] text-[#9496a1]/60 tracking-wider">
        © 2026. InvestQ Commune. All Rights Reserved
      </footer>

      {/* Notification Modal */}
      <NotifyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
