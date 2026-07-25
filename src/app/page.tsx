"use client";

import NetworkBackground from "@/components/NetworkBackground";
import WatermarkLogo from "@/components/WatermarkLogo";
import TaglineRotator from "@/components/TaglineRotator";
import { LinkedinIcon, InstagramIcon, MailIcon } from "@/components/SocialIcons";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-8 overflow-hidden selection:bg-[#c9982a]/30">
      {/* Background Interactive Canvas */}
      <NetworkBackground />

      {/* Background Watermark Logo */}
      <WatermarkLogo />

      {/* Top Left Logo & Brand */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 z-20 flex items-center gap-3 select-none">
        <img
          src="/logo.png"
          alt="iqcommune logo"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl shadow-lg border border-[rgba(201,152,42,0.25)] hover:scale-105 transition-transform duration-300"
        />
        <span className="font-bold text-xl sm:text-2xl tracking-[-0.03em] flex items-baseline">
          <span className="text-[#c9982a]">iq</span>
          <span className="text-[#f8f7f4] font-light">commune</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#3a8a3a] ml-1" />
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-[620px] w-full my-auto">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-[7px] bg-[rgba(201,152,42,0.1)] border border-[rgba(201,152,42,0.35)] text-[#e0c870] text-[12px] font-semibold tracking-[0.06em] uppercase px-4 py-[7px] rounded-full mb-[2.25rem]">
          <span className="w-[6px] h-[6px] rounded-full bg-[#3a8a3a] animate-pulse-green" />
          <span>Launching August 2026</span>
        </div>

        {/* Brand Logo */}
        <div className="logo flex items-baseline justify-center gap-0 mb-[1.5rem] leading-none select-none">
          <span className="text-[#c9982a] font-bold text-[40px] sm:text-[56px] tracking-[-0.03em]">
            iq
          </span>
          <span className="text-[#f8f7f4] font-light text-[40px] sm:text-[56px] tracking-[-0.03em]">
            commune
          </span>
          <span className="w-[9px] h-[9px] rounded-full bg-[#3a8a3a] ml-[4px] self-end mb-[10px]" />
        </div>

        {/* Subline Description */}
        <p className="text-[14px] sm:text-[15.5px] text-[#9496a1] leading-[1.75] mb-[2.75rem] max-w-[480px] mx-auto">
          A room is taking shape — real professionals, real sessions, no pitch, no product. Coming soon, city by city, across India.
        </p>

        {/* Punchline Rotator */}
        <TaglineRotator />

        {/* Contact Links */}
        <div className="flex items-center justify-center gap-[0.9rem] sm:gap-[1.75rem] flex-col sm:flex-row flex-wrap">
          <a
            href="https://linkedin.com/company/iqcommune"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[9px] text-[#9496a1] text-[13px] font-medium no-underline hover:text-[#e0c870] transition-colors group"
          >
            <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full border-[1.4px] border-[#c9982a]/40 text-[#e0c870] group-hover:border-[#e0c870] group-hover:bg-[#c9982a]/10 transition-all">
              <LinkedinIcon />
            </span>
            <span>@iqcommune</span>
          </a>

          <a
            href="https://instagram.com/iqcommune"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[9px] text-[#9496a1] text-[13px] font-medium no-underline hover:text-[#e0c870] transition-colors group"
          >
            <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full border-[1.4px] border-[#c9982a]/40 text-[#e0c870] group-hover:border-[#e0c870] group-hover:bg-[#c9982a]/10 transition-all">
              <InstagramIcon />
            </span>
            <span>@iqcommune</span>
          </a>

          <a
            href="mailto:hello@iqcommune.com"
            className="inline-flex items-center gap-[9px] text-[#9496a1] text-[13px] font-medium no-underline hover:text-[#e0c870] transition-colors group"
          >
            <span className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-full border-[1.4px] border-[#c9982a]/40 text-[#e0c870] group-hover:border-[#e0c870] group-hover:bg-[#c9982a]/10 transition-all">
              <MailIcon />
            </span>
            <span>hello@iqcommune.com</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-[4rem] text-[11.5px] text-[#9496a1]/60 text-center tracking-[0.02em]">
        © 2026. InvestQ Commune. All Rights Reserved
      </footer>
    </div>
  );
}
