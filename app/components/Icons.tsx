// EDGE Brand Icons - Industrial Style with Cobalt Outlines

export const EdgeLogo = ({ className = "w-32 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Geometric E */}
    <path d="M0 0H25V6H6V17H22V23H6V34H25V40H0V0Z" fill="currentColor"/>
    {/* D */}
    <path d="M30 0H45C55.5 0 62 8 62 20C62 32 55.5 40 45 40H30V0ZM44 34C50 34 55 28 55 20C55 12 50 6 44 6H36V34H44Z" fill="currentColor"/>
    {/* G */}
    <path d="M67 20C67 8.954 75.954 0 87 0C95.5 0 102.5 5 105 12L99 15C97.5 10 93 6 87 6C79.268 6 73 12.268 73 20C73 27.732 79.268 34 87 34C93 34 97.5 30 99 25H87V19H106V40H100V35C97 38 92.5 40 87 40C75.954 40 67 31.046 67 20Z" fill="currentColor"/>
    {/* E */}
    <path d="M112 0H140V6H118V17H137V23H118V34H140V40H112V0Z" fill="currentColor"/>
    {/* Accent Line */}
    <rect x="0" y="42" width="60" height="3" fill="#1A4AFF"/>
  </svg>
);

export const EdgeLogoMark = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" fill="#122D8B"/>
    <path d="M8 8H32V13H13V18H28V23H13V28H32V33H8V8Z" fill="white"/>
    <rect x="8" y="35" width="16" height="2" fill="#1A4AFF"/>
  </svg>
);

export const FabricInspectionIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#122D8B" strokeWidth="2">
    <rect x="6" y="6" width="24" height="30" rx="1" strokeLinecap="square"/>
    <path d="M12 14H24M12 20H24M12 26H20" strokeLinecap="square"/>
    <circle cx="32" cy="32" r="8" fill="white"/>
    <circle cx="32" cy="32" r="6"/>
    <path d="M36 36L42 42" strokeWidth="3" strokeLinecap="square"/>
  </svg>
);

export const CuttingIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#122D8B" strokeWidth="2">
    <path d="M8 40L20 16" strokeLinecap="square"/>
    <path d="M40 40L28 16" strokeLinecap="square"/>
    <circle cx="8" cy="40" r="4"/>
    <circle cx="40" cy="40" r="4"/>
    <path d="M20 16L24 8L28 16" strokeLinecap="square"/>
    <path d="M18 20H30" strokeLinecap="square"/>
  </svg>
);

export const SewingIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#122D8B" strokeWidth="2">
    <rect x="8" y="20" width="32" height="20" rx="1" strokeLinecap="square"/>
    <path d="M8 28H40" strokeLinecap="square"/>
    <rect x="16" y="8" width="16" height="12" rx="1" strokeLinecap="square"/>
    <path d="M24 20V8" strokeLinecap="square"/>
    <circle cx="24" cy="34" r="3"/>
    <path d="M24 37V40" strokeLinecap="square"/>
  </svg>
);

export const WashingIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#122D8B" strokeWidth="2">
    <rect x="6" y="6" width="36" height="36" rx="2" strokeLinecap="square"/>
    <circle cx="24" cy="28" r="10"/>
    <path d="M18 28C18 28 20 26 24 26C28 26 30 28 30 28" strokeLinecap="square"/>
    <path d="M18 32C18 32 20 30 24 30C28 30 30 32 30 32" strokeLinecap="square"/>
    <rect x="10" y="10" width="6" height="4" rx="1"/>
    <rect x="18" y="10" width="6" height="4" rx="1"/>
  </svg>
);

export const EmbroideryIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#122D8B" strokeWidth="2">
    <path d="M24 6V18" strokeLinecap="square"/>
    <path d="M24 18L24 42" strokeDasharray="4 2" strokeLinecap="square"/>
    <circle cx="24" cy="6" r="2" fill="#122D8B"/>
    <path d="M12 24H36" strokeLinecap="square"/>
    <path d="M14 30H34" strokeLinecap="square"/>
    <path d="M16 36H32" strokeLinecap="square"/>
    <rect x="8" y="20" width="4" height="20" rx="1" strokeLinecap="square"/>
    <rect x="36" y="20" width="4" height="20" rx="1" strokeLinecap="square"/>
  </svg>
);

export const PackagingIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#122D8B" strokeWidth="2">
    <path d="M6 16L24 6L42 16V32L24 42L6 32V16Z" strokeLinecap="square" strokeLinejoin="miter"/>
    <path d="M6 16L24 26L42 16" strokeLinecap="square"/>
    <path d="M24 26V42" strokeLinecap="square"/>
    <path d="M15 11L33 21" strokeLinecap="square"/>
    <circle cx="24" cy="22" r="2" fill="#1A4AFF" stroke="none"/>
  </svg>
);

export const ReliabilityIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#122D8B" strokeWidth="2">
    <path d="M20 4L34 10V18C34 26.837 28.179 34.486 20 37C11.821 34.486 6 26.837 6 18V10L20 4Z" strokeLinecap="square"/>
    <path d="M14 20L18 24L26 16" strokeLinecap="square" strokeWidth="2.5"/>
  </svg>
);

export const QualityIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#122D8B" strokeWidth="2">
    <circle cx="20" cy="20" r="14"/>
    <path d="M20 10V20L26 26" strokeLinecap="square"/>
    <circle cx="20" cy="20" r="2" fill="#1A4AFF" stroke="none"/>
  </svg>
);

export const ProfessionalismIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#122D8B" strokeWidth="2">
    <rect x="6" y="12" width="28" height="22" rx="1" strokeLinecap="square"/>
    <path d="M14 12V8C14 6.895 14.895 6 16 6H24C25.105 6 26 6.895 26 8V12" strokeLinecap="square"/>
    <path d="M6 20H34" strokeLinecap="square"/>
    <rect x="17" y="17" width="6" height="6" rx="1" fill="#B6C6E1" stroke="none"/>
  </svg>
);

export const InnovationIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#122D8B" strokeWidth="2">
    <path d="M20 4V8M32 8L29.2 10.8M36 20H32M32 32L29.2 29.2M20 36V32M8 32L10.8 29.2M4 20H8M8 8L10.8 10.8" strokeLinecap="square"/>
    <circle cx="20" cy="20" r="8"/>
    <circle cx="20" cy="20" r="3" fill="#1A4AFF" stroke="none"/>
  </svg>
);

export const TransparencyIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#122D8B" strokeWidth="2">
    <circle cx="20" cy="20" r="14"/>
    <circle cx="20" cy="20" r="8"/>
    <circle cx="20" cy="20" r="3"/>
    <path d="M20 6V10M20 30V34M6 20H10M30 20H34" strokeLinecap="square"/>
  </svg>
);

export const FlexibilityIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#122D8B" strokeWidth="2">
    <path d="M8 32C8 32 12 24 20 24C28 24 32 32 32 32" strokeLinecap="square"/>
    <path d="M8 24C8 24 12 16 20 16C28 16 32 24 32 24" strokeLinecap="square"/>
    <path d="M8 16C8 16 12 8 20 8C28 8 32 16 32 16" strokeLinecap="square"/>
  </svg>
);

export const ChatbotIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12C2 13.89 2.525 15.66 3.438 17.168L2.546 20.2C2.355 20.843 2.946 21.434 3.59 21.243L6.832 20.295C8.34 21.208 10.11 21.733 12 21.733C17.523 21.733 22 17.256 22 11.733C22 6.21 17.523 2 12 2Z" fill="currentColor"/>
    <circle cx="8" cy="12" r="1.5" fill="white"/>
    <circle cx="12" cy="12" r="1.5" fill="white"/>
    <circle cx="16" cy="12" r="1.5" fill="white"/>
  </svg>
);

export const PhoneIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="square"/>
  </svg>
);

export const EmailIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="1" strokeLinecap="square"/>
    <path d="M22 6L12 13L2 6" strokeLinecap="square"/>
  </svg>
);

export const LocationIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="square"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
);

export const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export const CloseIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="square"/>
  </svg>
);

export const MenuIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
    <path d="M4 6H20M4 12H20M4 18H20" strokeLinecap="square"/>
  </svg>
);

export const ArrowRightIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2">
    <path d="M5 12H19M12 5l7 7-7 7" strokeLinecap="square"/>
  </svg>
);
