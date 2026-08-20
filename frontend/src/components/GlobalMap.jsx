import { useState, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { officeLocations, partnerInstitutions, regions } from "../data/locations";
import CutButton from "./CutButton";
import InstitutionLogo from "./InstitutionLogo";
import "leaflet/dist/leaflet.css";

// Location Card Overlay (Fixed inside map container to prevent clipping/hiding)
function LocationOverlayCard({ location, isPinned, onClose }) {
  const isOffice = location.type === "office";

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-16 left-4 z-[1000] pointer-events-none"
      style={{ width: '280px' }}
    >
      <div className="bg-paper/97 backdrop-blur-md border border-line p-4 btn-cut-sm shadow-xl">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <InstitutionLogo institution={location} size="md" />
            <div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-ink/55 font-semibold block">
                {isOffice
                  ? "AcdyOn Office"
                  : location.partnership || `Partner ${location.institutionType || "Institution"}`}
              </span>
              <h4 className="font-semibold text-sm text-ink leading-tight">
                {location.name}
              </h4>
            </div>
          </div>
          {isPinned && (
            <button
              onClick={onClose}
              className="text-ink/40 hover:text-ink transition pointer-events-auto -mt-1 -mr-1 p-1 shrink-0"
              aria-label="Close card"
            >
              <X size={13} />
            </button>
          )}
        </div>
        <p className="text-[11px] text-ink/60 mt-0.5 flex items-center gap-1.5">
          {location.flagUrl ? (
            <img
              src={location.flagUrl}
              alt={`${location.country} flag`}
              className="w-4 h-3 object-cover rounded-sm border border-black/10 shrink-0"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <span className="inline-block">{location.flag}</span>
          )}
          <span>{location.country}{location.city ? ` · ${location.city}` : ""}</span>
        </p>

        {location.description && (
          <p className="text-[11px] text-ink/75 mt-2 leading-relaxed">
            {location.description}
          </p>
        )}

        {location.programs && (
          <div className="flex flex-wrap gap-1 mt-2.5">
            {location.programs.map((p) => (
              <span
                key={p}
                className="text-[9px] bg-paper2 px-2 py-0.5 text-ink/70 font-medium"
              >
                {p}
              </span>
            ))}
          </div>
        )}

        {isOffice && (
          <div className="mt-2 pt-2 border-t border-line text-[10px] text-ink/65 space-y-0.5">
            <p>{location.phone}</p>
            <p>{location.email}</p>
            <p className="text-ink/45 leading-normal">{location.address}</p>
          </div>
        )}

        {!isPinned && (
          <p className="mt-2 pt-2 border-t border-line text-[9px] uppercase tracking-widest text-ink/35">
            Click pin to keep open
          </p>
        )}
      </div>
    </motion.div>
  );
}

// RegionalMap Component
function RegionalMap({ region }) {
  const [activeLocation, setActiveLocation] = useState(null);
  const [pinnedLocation, setPinnedLocation] = useState(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Filter office locations and partner universities inside this region
  const regionOffices = officeLocations
    .filter((loc) => loc.region === region.id)
    .map((loc) => ({ ...loc, type: "office" }));

  const regionUnis = partnerInstitutions
    .filter((loc) => loc.region === region.id)
    .map((loc) => ({ ...loc, type: "university" }));

  const allLocations = [...regionOffices, ...regionUnis];
  const displayLocation = pinnedLocation || activeLocation;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-frame bg-paper2 border border-line btn-cut-sm relative overflow-hidden h-[380px] flex flex-col shadow-md map-airplane"
    >
      {/* Region Header inside Map Frame */}
      <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
        <span className="bg-ink/80 backdrop-blur-sm text-paper text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1.5 btn-cut-sm">
          {region.label}
        </span>
      </div>

      {mobile && (
        <div className="absolute bottom-3 left-4 z-[500] pointer-events-none">
          <span className="text-[9px] text-ink/50 font-semibold uppercase tracking-widest bg-paper/90 px-2.5 py-1 border border-line btn-cut-sm">
            Tap pin to explore
          </span>
        </div>
      )}

      {/* Leaflet Map */}
      <div className="w-full flex-1 relative z-0">
        <MapContainer
          center={region.center}
          zoom={region.zoom}
          zoomControl={false}
          attributionControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          dragging={false}
          touchZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution=""
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {/* Circle Markers */}
          {allLocations.map((loc) => {
            const isOffice = loc.type === "office";
            const isUpgrad = loc.partnership === "AcdyOn × upGrad";
            const fillColor = isOffice ? "#12213a" : isUpgrad ? "#c8451f" : "#c9a961";

            return (
              <CircleMarker
                key={loc.id}
                center={loc.coords}
                radius={6.5}
                pathOptions={{
                  color: "#f5f1ea",
                  fillColor: fillColor,
                  fillOpacity: 1,
                  weight: 2,
                }}
                eventHandlers={{
                  mouseover: () => setActiveLocation(loc),
                  mouseout: () => setActiveLocation(null),
                  click: () => setPinnedLocation(loc),
                }}
              />
            );
          })}
        </MapContainer>

        {/* Overlay Card Details */}
        <AnimatePresence>
          {displayLocation && (
            <LocationOverlayCard
              location={displayLocation}
              isPinned={Boolean(pinnedLocation)}
              onClose={() => setPinnedLocation(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Main Component
export default function GlobalMap() {
  const [showAllUnis, setShowAllUnis] = useState(false);
  const totalOffices = officeLocations.length;
  const totalInstitutions = partnerInstitutions.length;
  const previewUnis = showAllUnis ? partnerInstitutions : partnerInstitutions.slice(0, 6);

  return (
    <section id="network" className="px-3 md:px-4 py-16 md:py-24 bg-paper text-ink">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-ink/50 mb-3 font-semibold">
              Partner network
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight max-w-2xl">
              A global academic network — universities, business schools, and institutes.
            </h2>
          </div>
          <p className="text-sm text-ink/65 max-w-sm">
            {totalInstitutions} partner institutions and {totalOffices} AcdyOn offices mapped across Americas, Europe, and Asia.
          </p>
        </div>

        {/* 3 Regional Maps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regions.map((region) => (
            <RegionalMap key={region.id} region={region} />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mt-8 text-xs font-medium text-ink/75">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#12213a] border border-[#f5f1ea] shadow-sm shrink-0 inline-flex" />
            <span className="inline-flex items-center gap-1.5">🏢 Offices ({totalOffices})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#c9a961] border border-[#f5f1ea] shadow-sm shrink-0 inline-flex" />
            <span className="inline-flex items-center gap-1.5">🎓 Direct partner institutions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#c8451f] border border-[#f5f1ea] shadow-sm shrink-0 inline-flex" />
            <span className="inline-flex items-center gap-1.5">🌟 AcdyOn × upGrad programs</span>
          </div>
        </div>

      </div>
    </section>
  );
}