export default function WatermarkLogo() {
  return (
    <div
      className="fixed z-0 pointer-events-none w-[380px] h-[380px] md:w-[540px] md:h-[540px] -bottom-12 -left-20 opacity-20 rotate-12 transition-opacity duration-1000"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#c9982a]"
      >
        <rect
          x="30"
          y="30"
          width="440"
          height="440"
          rx="90"
          stroke="currentColor"
          strokeWidth="20"
          strokeOpacity="0.85"
        />
        <text
          x="105"
          y="325"
          fill="currentColor"
          fontSize="260"
          fontWeight="bold"
          fontFamily="sans-serif"
          letterSpacing="-12"
        >
          iq
        </text>
        <circle cx="380" cy="125" r="32" fill="#3a8a3a" />
      </svg>
    </div>
  );
}
