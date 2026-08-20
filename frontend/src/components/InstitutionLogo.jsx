// src/components/InstitutionLogo.jsx
import { useState } from "react";

export default function InstitutionLogo({ institution, size = "md" }) {
  const [imgError, setImgError] = useState(false);

  if (!institution) return null;

  const sizes = {
    sm: "w-7 h-7 text-[11px]",
    md: "w-9 h-9 text-xs",
    lg: "w-11 h-11 text-sm",
    xl: "w-12 h-12 text-base font-extrabold",
  };

  // Color coding by institution type
  const colors = {
    University: "bg-[#12213a] text-[#f5f1ea] border border-[#f5f1ea]/20",
    "Business School": "bg-[#c9a961] text-white border border-white/20",
    Institute: "bg-[#c8451f] text-white border border-white/20",
    "Institute of Technology": "bg-[#c8451f] text-white border border-white/20",
    "Institute of Management": "bg-[#c8451f] text-white border border-white/20",
    office: "bg-[#12213a] text-[#c9a961] border border-[#c9a961]/40",
    default: "bg-[#12213a] text-[#f5f1ea] border border-[#f5f1ea]/20",
  };

  const getInitials = () => {
    if (institution.shortName) {
      return institution.shortName.charAt(0).toUpperCase();
    }
    const name = (institution.name || "A").split(" ")[0];
    return name.charAt(0).toUpperCase();
  };

  const type = institution.type === "office" ? "office" : institution.institutionType;

  if (institution.logoUrl && !imgError) {
    const bgStyle = institution.logoBg || "bg-white";
    return (
      <div
        className={`${sizes[size]} rounded-full overflow-hidden shrink-0 shadow-sm ${bgStyle} border border-line flex items-center justify-center p-1`}
      >
        <img
          src={institution.logoUrl}
          alt={`${institution.name} logo`}
          className="w-full h-full object-contain rounded-full"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizes[size]} ${colors[type] || colors.default} rounded-full flex items-center justify-center font-bold shrink-0 shadow-sm`}
    >
      {getInitials()}
    </div>
  );
}
