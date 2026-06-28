export default function PatchItLogo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="18" fill="#f97316"/>
      {/* T-grip */}
      <rect x="11.5" y="6" width="13" height="2.5" rx="1.25" fill="white"/>
      {/* Handle shaft */}
      <rect x="16.75" y="8" width="2.5" height="11" rx="1.25" fill="white"/>
      {/* Blade — flat top, tapers to rounded bottom */}
      <path d="M13 19 H23 L21.5 27.5 Q18 31 14.5 27.5 Z" fill="white"/>
    </svg>
  )
}
