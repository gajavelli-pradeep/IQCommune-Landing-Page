"use client";

import { useState } from "react";
import { MapPin, Sparkles } from "lucide-react";

interface City {
  name: string;
  state: string;
  status: "Launching First" | "Phase 1" | "Phase 2";
  cohorts: string;
}

const CITIES: City[] = [
  { name: "Bengaluru", state: "Karnataka", status: "Launching First", cohorts: "Tech & Venture Leaders" },
  { name: "Mumbai", state: "Maharashtra", status: "Launching First", cohorts: "Financial & Founders" },
  { name: "Delhi NCR", state: "National Capital Region", status: "Launching First", cohorts: "Policy & Scale-Ups" },
  { name: "Hyderabad", state: "Telangana", status: "Phase 1", cohorts: "Engineering & Enterprise" },
  { name: "Pune", state: "Maharashtra", status: "Phase 1", cohorts: "Product & Manufacturing" },
  { name: "Chennai", state: "Tamil Nadu", status: "Phase 2", cohorts: "SaaS & Industrial" },
];

export default function CityNodes() {
  const [activeCity, setActiveCity] = useState<City | null>(CITIES[0]);

  return (
    <div className="w-full max-w-xl mx-auto my-8 p-6 rounded-2xl glass-card relative overflow-hidden transition-all duration-300">
      <div className="flex items-center justify-between mb-4 border-b border-[#c9982a]/20 pb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#c9982a]" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9496a1]">
            Pan-India Presence
          </h3>
        </div>
        <span className="text-[11px] text-[#e0c870] bg-[#c9982a]/10 px-2.5 py-0.5 rounded-full border border-[#c9982a]/30 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#c9982a]" /> Offline Sessions
        </span>
      </div>

      {/* City Chips */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {CITIES.map((city) => {
          const isActive = activeCity?.name === city.name;
          return (
            <button
              key={city.name}
              onClick={() => setActiveCity(city)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? "bg-[#c9982a] text-[#0f1117] font-semibold shadow-[0_0_12px_rgba(201,152,42,0.4)]"
                  : "bg-[#0f1117]/60 text-[#9496a1] hover:text-[#f8f7f4] hover:bg-[#c9982a]/20 border border-white/5"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  city.status === "Launching First" ? "bg-[#3a8a3a]" : "bg-[#c9982a]"
                }`}
              />
              {city.name}
            </button>
          );
        })}
      </div>

      {/* Selected City Details */}
      {activeCity && (
        <div className="bg-[#0f1117]/80 rounded-xl p-3.5 border border-[#c9982a]/20 text-left flex items-center justify-between text-xs transition-opacity duration-300">
          <div>
            <div className="font-semibold text-[#f8f7f4] flex items-center gap-2">
              {activeCity.name} <span className="text-[#9496a1] font-normal">({activeCity.state})</span>
            </div>
            <div className="text-[#9496a1] mt-0.5">{activeCity.cohorts}</div>
          </div>
          <div className="text-right">
            <span
              className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                activeCity.status === "Launching First"
                  ? "bg-[#3a8a3a]/20 text-[#4cd94c] border border-[#3a8a3a]/40"
                  : "bg-[#c9982a]/20 text-[#e0c870] border border-[#c9982a]/40"
              }`}
            >
              {activeCity.status}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
