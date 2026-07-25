export default function WatermarkLogo() {
  return (
    <div
      className="fixed z-0 pointer-events-none w-[360px] h-[360px] md:w-[480px] md:h-[480px] -bottom-20 -left-28 opacity-[0.08] rotate-12 transition-opacity duration-1000"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#c9982a]"
      >
        <rect
          x="40"
          y="40"
          width="420"
          height="420"
          rx="80"
          stroke="currentColor"
          strokeWidth="24"
        />
        <text
          x="125"
          y="310"
          fill="currentColor"
          fontSize="240"
          fontWeight="bold"
          fontFamily="system-ui"
          letterSpacing="-10"
        >
          iq
        </text>
        <circle cx="370" cy="140" r="28" fill="#3a8a3a" />
      </svg>
    </div>
  );
}
