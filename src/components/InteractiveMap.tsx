import { useState } from 'react';
import { provinces, Province, DATASET_AVG } from '../data/provinces';
import islandPaths from '../data/islandPaths.json';

interface InteractiveMapProps {
  selected: Province;
  onSelect: (province: Province) => void;
}

export function projectCoordinates(p: Province) {
  return {
    x: (p.longitude - 94) * 22 + 15,
    y: (6 - p.latitude) * 22 + 12
  };
}

export function InteractiveMap({ selected, onSelect }: InteractiveMapProps) {
  const [hovered, setHovered] = useState<Province | null>(null);
  const active = hovered || selected;
  const activePos = projectCoordinates(active);

  const tooltipX = Math.min(955, Math.max(125, activePos.x));
  const tooltipY = activePos.y > 65 ? activePos.y - 55 : activePos.y + 25;

  return (
    <div className="relative w-full overflow-x-auto overflow-y-hidden rounded-[20px] bg-[#fbf9f4] p-2 sm:p-4">
      <svg
        viewBox="0 0 1100 430"
        className="h-[260px] min-w-[660px] w-full sm:h-[300px] sm:min-w-[740px] lg:h-[330px]"
        role="group"
        aria-label="Peta interaktif 38 provinsi Indonesia, pin di ibu kota"
      >
        <defs>
          <pattern id="mapDots" width="21" height="21" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#e6e2eb" />
          </pattern>
        </defs>

        {/* Background Dot Matrix */}
        <rect width="1100" height="430" fill="url(#mapDots)" rx="16" />

        {/* Islands Landmass Polygons */}
        <g opacity="0.95">
          {islandPaths.map((island, idx) => (
            <path
              key={idx}
              d={island.path}
              fill="#e6def3"
              stroke="#d5c8e7"
              strokeWidth="1.2"
              className="transition-colors hover:fill-[#d8ccf0]"
            />
          ))}
        </g>

        {/* Province Capital Pins */}
        {provinces.map((prov) => {
          const { x, y } = projectCoordinates(prov);
          const isSelected = selected.name === prov.name;
          const isHovered = hovered?.name === prov.name;

          return (
            <g
              key={prov.name}
              tabIndex={0}
              role="button"
              aria-label={`${prov.name}, RLS ${prov.value.toFixed(2)} tahun`}
              onClick={() => onSelect(prov)}
              onMouseEnter={() => setHovered(prov)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer focus:outline-none"
            >
              {/* Outer Pulse Ring for Selected */}
              {isSelected && (
                <circle
                  cx={x}
                  cy={y}
                  r="13"
                  fill="none"
                  stroke="#7350b5"
                  strokeWidth="2"
                  opacity="0.6"
                  className="animate-pulse"
                />
              )}

              {/* Pin Base Circle */}
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 7.5 : isHovered ? 6.5 : 4.5}
                fill={isSelected ? '#7350b5' : isHovered ? '#8b67cc' : '#a890d3'}
                stroke="#ffffff"
                strokeWidth={isSelected ? 2.5 : 1.5}
                className="transition-all duration-200"
              />
            </g>
          );
        })}

        {/* Floating Tooltip Pin */}
        <g
          transform={`translate(${tooltipX}, ${tooltipY})`}
          className="pointer-events-none transition-transform duration-200"
        >
          <rect
            x="-85"
            y="-22"
            width="170"
            height="44"
            rx="10"
            fill="#ffffff"
            stroke="#7350b5"
            strokeWidth="1.5"
            className="drop-shadow-md"
          />
          <text
            x="0"
            y="-4"
            textAnchor="middle"
            className="text-[11px] font-extrabold fill-[#23201d]"
          >
            {active.name}
          </text>
          <text
            x="0"
            y="12"
            textAnchor="middle"
            className="text-[9.5px] font-semibold fill-[#7350b5]"
          >
            RLS: {active.value.toFixed(2)} thn ({active.value >= DATASET_AVG ? `+${(active.value - DATASET_AVG).toFixed(2)}` : (active.value - DATASET_AVG).toFixed(2)})
          </text>
        </g>
      </svg>
    </div>
  );
}
