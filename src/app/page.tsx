"use client";

import NetworkBackground from "@/components/NetworkBackground";
import TaglineRotator from "@/components/TaglineRotator";
import { LinkedinIcon, InstagramIcon, MailIcon } from "@/components/SocialIcons";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-8 overflow-hidden selection:bg-[#c9982a]/30">
      {/* Background Interactive Canvas */}
      <NetworkBackground />

      {/* Top Left Logo */}
      <div className="absolute top-6 left-6 sm:top-6 sm:left-6 z-20 select-none">
        <img
          src="/logo.png"
          alt="iqcommune logo"
          className="w-12 h-12 rounded-[12px] border border-[rgba(201,152,42,0.25)] shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-300"
        />
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
