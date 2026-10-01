import * as React from 'react';
import { geoAlbers, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { useTranslation } from 'gatsby-plugin-react-i18next';

const W = 1000;
const H = 720;
const INSET = 30;
const MAX_R = 32;

// Hawaii, Puerto Rico and the outlying territories are not mapped; Alaska is.
const SKIP = new Set(['15', '72', '78', '60', '66', '69']);
const AK_ID = '02';

// Natural Earth splits Alaska at the antimeridian; the Aleutian rings that land at
// positive longitude would blow out any projection fit, so drop them.
function dropAntimeridian(f) {
  const clone = structuredClone(f);
  const keep = (ring) => !ring.some((c) => c[0] > 0);
  const g = clone.geometry;
  if (g.type === 'Polygon') g.coordinates = g.coordinates.filter(keep);
  else if (g.type === 'MultiPolygon') g.coordinates = g.coordinates.map((p) => p.filter(keep)).filter((p) => p.length);
  return clone;
}

export default function DataCenterMap() {
  const { t, i18n } = useTranslation();
  const [scene, setScene] = React.useState(null);

  React.useEffect(() => {
    let alive = true;

    Promise.all([
      fetch('/data/datacenters.json').then((r) => r.json()),
      fetch('/data/us-states-10m.json').then((r) => r.json()),
      fetch('/data/canada.geojson').then((r) => r.json()),
    ])
      .then(([data, usTopo, canGeo]) => {
        if (!alive) return;

        const states = feature(usTopo, usTopo.objects.states)
          .features.filter((f) => !SKIP.has(String(f.id).padStart(2, '0')))
          .map((f) => (String(f.id).padStart(2, '0') === AK_ID ? dropAntimeridian(f) : f));
        const land = states.concat(canGeo.features);

        // The handful of markets north of 56°N (10 of 4,864 facilities) would drag
        // the frame to the Arctic Ocean; they are excluded like Hawaii and noted.
        const cities = data.cities.filter((d) => d.lat <= 56);
        const maxCount = Math.max(...cities.map((d) => d.count));
        const r = (v) => MAX_R * Math.sqrt(v / maxCount);

        // Fit to the markets themselves, not the landmass: including Alaska or arctic
        // Canada in the fit fills the frame with empty wilderness. Land outside the
        // populated band simply bleeds off the edges.
        const fitTo = { type: 'MultiPoint', coordinates: cities.map((d) => [d.lon, d.lat]) };
        const proj = geoAlbers()
          .rotate([100, 0])
          .center([0, 45])
          .parallels([29.5, 60])
          .fitExtent(
            [
              [INSET, INSET],
              [W - INSET, H - INSET],
            ],
            fitTo,
          );
        const path = geoPath(proj);

        // fitExtent centers the fitted band in whichever axis has slack; crop the
        // viewBox to the band so the map shows no dead margins.
        const b = path.bounds(fitTo);
        const x0 = Math.max(0, b[0][0] - INSET);
        const x1 = Math.min(W, b[1][0] + INSET);
        const y0 = Math.max(0, b[0][1] - INSET);
        const y1 = Math.min(H, b[1][1] + INSET);

        setScene({
          viewBox: `${x0.toFixed(1)} ${y0.toFixed(1)} ${(x1 - x0).toFixed(1)} ${(y1 - y0).toFixed(1)}`,
          left: x0,
          bottom: y1,
          land: land.map((f) => path(f)),
          bubbles: cities
            .slice()
            .sort((a, b) => b.count - a.count)
            .map((d) => {
              const [x, y] = proj([d.lon, d.lat]);
              return { x, y, r: Math.max(2, r(d.count)) };
            }),
          legend: [1, 50, Math.ceil(maxCount / 50) * 50].map((m) => ({ value: m, r: Math.max(2, r(m)) })),
          total: cities.reduce((s, d) => s + d.count, 0),
          markets: cities.length,
          retrieved: data.retrieved,
          sourceUrl: data.sourceUrl,
        });
      })
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, []);

  if (!scene) return <div className='w-full rounded-2xl bg-white' style={{ aspectRatio: '1000 / 580' }}></div>;

  const locale = i18n.language === 'fr' ? 'fr-CA' : 'en-CA';
  const fmt = (n) => n.toLocaleString(locale);
  const dateStr = new Date(scene.retrieved + 'T00:00:00').toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const legendMaxR = scene.legend[scene.legend.length - 1].r;

  return (
    <div className='grid gap-4 rounded-2xl bg-white p-4 md:p-8'>
      <svg className='w-full' viewBox={scene.viewBox} role='img' aria-label={t('mapLegend')}>
        <g>
          {scene.land.map((d, i) => (
            <path key={i} d={d} fill='#b5ada7' fillOpacity='0.35' stroke='#fff' strokeWidth='1' />
          ))}
        </g>
        <g>
          {scene.bubbles.map((b, i) => (
            <circle
              key={i}
              cx={b.x}
              cy={b.y}
              r={b.r}
              fill='#d79c00'
              fillOpacity='0.34'
              stroke='#d79c00'
              strokeOpacity='0.5'
              strokeWidth='0.7'
            />
          ))}
        </g>
        <g transform={`translate(${scene.left + INSET + legendMaxR}, ${scene.bottom - 8})`}>
          <text
            x={-legendMaxR}
            y={-2 * legendMaxR - 14}
            fontSize='13'
            fill='#5e514d'
            style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}
          >
            {t('mapLegend')}
          </text>
          {scene.legend.map((l) => (
            <React.Fragment key={l.value}>
              <circle cy={-l.r} r={l.r} fill='none' stroke='#d79c00' strokeOpacity='0.7' strokeWidth='1' />
              <text x={legendMaxR + 8} y={-2 * l.r + 4} fontSize='12' fill='#5e514d'>
                {fmt(l.value)}
              </text>
            </React.Fragment>
          ))}
        </g>
      </svg>

      <div className='grid gap-1 border-t border-tertiary/40 pt-4'>
        <p className='text-sm text-tertiary'>
          {t('mapNote')}{' '}
          <a className='underline hover:text-primary' href={scene.sourceUrl} target='_blank' rel='noopener noreferrer'>
            datacentermap.com
          </a>
        </p>
        <p className='text-sm text-tertiary'>
          {t('mapStats', { total: fmt(scene.total), markets: fmt(scene.markets), date: dateStr })}
        </p>
      </div>
    </div>
  );
}
