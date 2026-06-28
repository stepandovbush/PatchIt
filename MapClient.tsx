'use client'
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Report } from '@/lib/types'
import { timeAgo } from '@/lib/utils'

function isRecent(createdAt: string): boolean {
  return Date.now() - new Date(createdAt).getTime() < 24 * 60 * 60 * 1000
}

function statusMeta(status: string) {
  if (status === 'fixed')       return { label: 'Fixed',       color: '#22c55e' }
  if (status === 'in_progress') return { label: 'In Progress', color: '#f59e0b' }
  return                               { label: 'Open',         color: '#ef4444' }
}

function makeIcon(report: Report): L.DivIcon {
  const recent = isRecent(report.created_at)
  const color  = statusMeta(report.status).color
  const size   = recent ? 20 : 13
  const pulse  = recent
    ? `<div style="position:absolute;inset:-5px;border-radius:50%;border:2px solid ${color};animation:map-ping 1.5s ease-out infinite;"></div>`
    : ''
  return L.divIcon({
    className: '',
    html: `<div style="position:relative;width:${size}px;height:${size}px">
      ${pulse}
      <div style="width:${size}px;height:${size}px;background:${color};border:2.5px solid white;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>
    </div>`,
    iconSize:    [size, size],
    iconAnchor:  [size / 2, size / 2],
    popupAnchor: [0, -(size / 2) - 6],
  })
}

// ── Locate Me — must live inside MapContainer to call useMap ─────────────────
function LocateControl() {
  const map = useMap()
  const [busy, setBusy] = useState(false)

  const locate = () => {
    if (!navigator.geolocation) return
    setBusy(true)
    navigator.geolocation.getCurrentPosition(
      pos => {
        map.flyTo([pos.coords.latitude, pos.coords.longitude], 13, { animate: true, duration: 1.2 })
        setBusy(false)
      },
      () => setBusy(false),
      { timeout: 8000 },
    )
  }

  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: 80, pointerEvents: 'auto' }}>
      <div className="leaflet-control leaflet-bar">
        <a
          role="button"
          title="Go to my location"
          onClick={locate}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 30, height: 30, cursor: 'pointer', textDecoration: 'none',
          }}
        >
          {/* crosshair / target icon */}
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill="none" stroke={busy ? '#f97316' : '#555'} strokeWidth="2.2" strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="4"/>
            <line x1="12" y1="2"  x2="12" y2="6"/>
            <line x1="12" y1="18" x2="12" y2="22"/>
            <line x1="2"  y1="12" x2="6"  y2="12"/>
            <line x1="18" y1="12" x2="22" y2="12"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

// ── Satellite toggle — lives inside MapContainer so it stacks under LocateControl ──
function SatelliteControl({ isSatellite, onToggle }: { isSatellite: boolean; onToggle: () => void }) {
  return (
    <div className="leaflet-top leaflet-right" style={{ marginTop: 114, pointerEvents: 'auto' }}>
      <div className="leaflet-control leaflet-bar">
        <a
          role="button"
          title={isSatellite ? 'Switch to street map' : 'Switch to satellite'}
          onClick={e => { e.preventDefault(); onToggle() }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 30, height: 30, cursor: 'pointer', textDecoration: 'none',
          }}
        >
          {isSatellite ? (
            /* street-map icon (grid of roads) */
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2.2" strokeLinecap="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          ) : (
            /* satellite / globe icon */
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="12" cy="12" r="9"/>
              <path d="M3 12h18"/>
              <path d="M12 3a15 15 0 0 1 0 18"/>
              <path d="M12 3a15 15 0 0 0 0 18"/>
            </svg>
          )}
        </a>
      </div>
    </div>
  )
}

const WORLD_OFFSETS = [-360, 0, 360]

const TILES = {
  street: {
    url:  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attr: '&copy; <a href="https://carto.com/">CARTO</a>',
  },
  satellite: {
    url:  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attr: 'Tiles &copy; Esri',
  },
}

interface Props {
  reports: Report[]
  center?: [number, number]
  zoom?:   number
  height?: string
}

export default function MapClient({
  reports,
  center = [40.7128, -74.006],
  zoom   = 12,
  height = '400px',
}: Props) {
  const located = reports.filter(r => r.lat && r.lng)
  const [tileKey, setTileKey] = useState<'street' | 'satellite'>('street')

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <style>{`@keyframes map-ping{0%{transform:scale(1);opacity:.8}100%{transform:scale(2.5);opacity:0}}`}</style>

      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        worldCopyJump={true}
        minZoom={2}
        zoomControl={false}
        maxBounds={[[-85.06, -99999], [85.06, 99999]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer key={tileKey} url={TILES[tileKey].url} attribution={TILES[tileKey].attr} />

        {/* Zoom — top right */}
        <ZoomControl position="topright" />

        {/* Locate — below zoom (marginTop 80 = after the 2×30px zoom buttons) */}
        <LocateControl />

        {/* Satellite toggle — below locate (marginTop 114 = 80 + 30 + 4px border gap) */}
        <SatelliteControl
          isSatellite={tileKey === 'satellite'}
          onToggle={() => setTileKey(k => k === 'street' ? 'satellite' : 'street')}
        />

        {located.flatMap(report =>
          WORLD_OFFSETS.map(offset => (
            <Marker
              key={`${report.id}-${offset}`}
              position={[report.lat!, report.lng! + offset]}
              icon={makeIcon(report)}
            >
              <Popup minWidth={200} maxWidth={260}>
                <div style={{ fontFamily: 'system-ui, sans-serif', fontSize: 13 }}>
                  {report.media_url && report.media_type === 'image' && (
                    <img
                      src={report.media_url}
                      alt={report.title}
                      style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 8, marginBottom: 8, display: 'block' }}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                  )}
                  <div style={{ display: 'flex', gap: 5, marginBottom: 5, flexWrap: 'wrap' }}>
                    <span style={{
                      background: statusMeta(report.status).color,
                      color: '#fff', fontSize: 10, fontWeight: 700,
                      padding: '2px 7px', borderRadius: 20,
                    }}>
                      {statusMeta(report.status).label}
                    </span>
                    {isRecent(report.created_at) && (
                      <span style={{
                        background: '#fff7ed', color: '#c2410c', fontSize: 10,
                        fontWeight: 700, padding: '2px 7px', borderRadius: 20,
                        border: '1px solid #fed7aa',
                      }}>NEW</span>
                    )}
                  </div>
                  <p style={{ fontWeight: 700, marginBottom: 3, lineHeight: 1.3 }}>{report.title}</p>
                  {report.address && (
                    <p style={{ color: '#6b7280', fontSize: 11, marginBottom: 2 }}>{report.address}</p>
                  )}
                  <p style={{ color: '#9ca3af', fontSize: 11, marginBottom: 8 }}>
                    @{(report as any).profiles?.username ?? '?'} · {timeAgo(report.created_at)}
                  </p>
                  <a
                    href={`/report/${report.id}`}
                    style={{
                      display: 'inline-block',
                      background: '#f97316', color: '#fff',
                      fontWeight: 700, fontSize: 12,
                      padding: '5px 12px', borderRadius: 8,
                      textDecoration: 'none',
                    }}
                  >
                    View report →
                  </a>
                </div>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  )
}
