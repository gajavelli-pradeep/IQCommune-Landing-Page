export default function WatermarkLogo() {
  return (
    <div
      className="fixed z-10 pointer-events-none w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[480px] md:h-[480px] bottom-[20px] left-[-40px] opacity-40 rotate-[8deg] transition-opacity duration-1000 select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >

        {/* 'i' in Gold (#c9982a) */}
        <circle cx="175" cy="135" r="24" fill="#c9982a" />
        <rect x="159" y="180" width="32" height="120" rx="4" fill="#c9982a" />

        {/* 'q' in Cream (#f8f7f4) */}
        <path
          d="M 270 180 C 228 180 198 212 198 250 C 198 288 228 320 270 320 C 298 320 318 305 330 282 V 370 H 362 V 180 H 330 V 215 C 318 195 298 180 270 180 Z M 276 210 C 298 210 315 228 315 250 C 315 272 298 290 276 290 C 254 290 236 272 236 250 C 236 228 254 210 276 210 Z"
          fill="#f8f7f4"
        />

        {/* Green dot below 'q' tail (#3a8a3a) */}
        <circle cx="346" cy="405" r="20" fill="#3a8a3a" />
      </svg>
    </div>
  );
}


