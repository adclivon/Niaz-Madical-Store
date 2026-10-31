import React from 'react';

interface NiazLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const NiazLogo: React.FC<NiazLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const iconDimensions = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const titleSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const subtitleSize = size === 'sm' ? 'text-[10px]' : size === 'lg' ? 'text-xs' : 'text-[11px]';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Professional Medical Cross Emblem */}
      <div
        className={`relative ${iconDimensions} rounded-xl bg-gradient-to-br from-sky-600 to-sky-700 flex items-center justify-center text-white shadow-sm ring-1 ring-sky-700/20 shrink-0`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5/6 h-5/6"
        >
          {/* Main White Medical Cross */}
          <path
            d="M12 5C12 4.44772 12.4477 4 13 4H19C19.5523 4 20 4.44772 20 5V12H27C27.5523 12 28 12.4477 28 13V19C28 19.5523 27.5523 20 27 20H20V27C20 27.5523 19.5523 28 19 28H13C12.4477 28 12 27.5523 12 27V20H5C4.44772 20 4 19.5523 4 19V13C4 12.4477 4.44772 12 5 12H12V5Z"
            fill="currentColor"
          />
          {/* Inner Soft Green Healthcare Leaf / Care Accent */}
          <path
            d="M16 8C19 12 21 16 21 19C21 21.7614 18.7614 24 16 24C13.2386 24 11 21.7614 11 19C11 16 13 12 16 8Z"
            fill="#10b981"
            fillOpacity="0.9"
          />
          <circle cx="16" cy="16" r="2.5" fill="#ffffff" />
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col leading-tight">
        <span className={`${titleSize} font-bold tracking-tight text-slate-900 font-sans`}>
          Niaz <span className="text-sky-700">Medical</span> Store
        </span>
        {showSubtitle && (
          <span className={`${subtitleSize} font-medium tracking-wide uppercase text-slate-500`}>
            Pharmacy · 283 GB Mandi Rurala Road
          </span>
        )}
      </div>
    </div>
  );
};
