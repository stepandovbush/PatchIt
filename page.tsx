'use client'
import { useState, useMemo } from 'react'

type Region = 'All' | 'Americas' | 'Europe' | 'Asia & Pacific' | 'Middle East' | 'Africa' | 'Oceania'

interface Resource {
  name: string
  desc: string
  website: string
  phone: string
  region: Exclude<Region, 'All'>
  type: 'authority' | 'hotline' | 'platform' | 'ngo'
}

const RESOURCES: Resource[] = [
  // ── Americas ───────────────────────────────────────────────────────────────
  {
    region: 'Americas', type: 'authority',
    name: 'Federal Highway Administration (FHWA)',
    desc: 'Primary US federal agency overseeing the national highway system, funding, and safety standards.',
    website: 'https://www.fhwa.dot.gov',
    phone: '+1 (202) 366-4000',
  },
  {
    region: 'Americas', type: 'hotline',
    name: '311 — US City Services Hotline',
    desc: 'Call 311 in most US cities to report potholes, flooding, and road hazards directly to your local public works department.',
    website: 'https://www.usa.gov/local-governments',
    phone: '311',
  },
  {
    region: 'Americas', type: 'authority',
    name: 'Transport Canada',
    desc: 'Federal department responsible for transportation policies and infrastructure safety across Canada.',
    website: 'https://tc.gc.ca',
    phone: '+1 (866) 995-9737',
  },
  {
    region: 'Americas', type: 'authority',
    name: 'DNIT — Brazil National Road Agency',
    desc: 'Departamento Nacional de Infraestrutura de Transportes — manages federal highways and infrastructure projects across Brazil.',
    website: 'https://www.gov.br/dnit',
    phone: '0800 724 8181',
  },
  {
    region: 'Americas', type: 'authority',
    name: 'INVIAS — Colombia Roads Institute',
    desc: 'Instituto Nacional de Vías — plans, builds, and maintains Colombia\'s national road network.',
    website: 'https://www.invias.gov.co',
    phone: '+57 (601) 377-7600',
  },
  {
    region: 'Americas', type: 'authority',
    name: 'Dirección Nacional de Vialidad (Argentina)',
    desc: 'Argentina\'s national agency responsible for the design, construction, and upkeep of national roads.',
    website: 'https://www.vialidad.gob.ar',
    phone: '+54 (11) 4343-8520',
  },
  {
    region: 'Americas', type: 'authority',
    name: 'Secretaría de Infraestructura — Mexico',
    desc: 'Oversees Mexico\'s federal road network, tolls, and highway modernization programs.',
    website: 'https://www.sct.gob.mx',
    phone: '01 800 0086 392',
  },
  {
    region: 'Americas', type: 'ngo',
    name: 'ARTBA — American Road & Transportation Builders',
    desc: 'Industry association advocating for safe, well-funded US road infrastructure and transportation policy.',
    website: 'https://www.artba.org',
    phone: '+1 (202) 289-4434',
  },
  {
    region: 'Americas', type: 'platform',
    name: 'SeeClickFix',
    desc: 'Civic reporting platform used by hundreds of US & Canadian municipalities to receive and track pothole and road hazard reports.',
    website: 'https://seeclickfix.com',
    phone: '+1 (203) 745-5488',
  },

  // ── Europe ─────────────────────────────────────────────────────────────────
  {
    region: 'Europe', type: 'authority',
    name: 'National Highways (England)',
    desc: 'Government company that operates and maintains England\'s 4,500 miles of motorways and major A-roads.',
    website: 'https://nationalhighways.co.uk',
    phone: '0300 123 5000',
  },
  {
    region: 'Europe', type: 'platform',
    name: 'FixMyStreet (UK)',
    desc: 'Award-winning platform to report road defects, potholes, and street issues directly to UK local councils.',
    website: 'https://www.fixmystreet.com',
    phone: 'Online only',
  },
  {
    region: 'Europe', type: 'authority',
    name: 'Autobahn GmbH des Bundes (Germany)',
    desc: 'Federal company responsible for planning, building, operating, and financing Germany\'s autobahn network.',
    website: 'https://www.autobahn.de',
    phone: '0800 000 9440',
  },
  {
    region: 'Europe', type: 'hotline',
    name: 'ADAC Road Emergency (Germany)',
    desc: 'Germany\'s largest automobile club — provides 24/7 roadside assistance and road hazard reporting.',
    website: 'https://www.adac.de',
    phone: '+49 89 22 22 22',
  },
  {
    region: 'Europe', type: 'authority',
    name: 'SANEF Motorways (France)',
    desc: 'Operates 1,800 km of motorways in northern France including the A1 Paris–Lille corridor.',
    website: 'https://www.sanef.com',
    phone: '3605',
  },
  {
    region: 'Europe', type: 'authority',
    name: 'Rijkswaterstaat (Netherlands)',
    desc: 'Dutch Ministry of Infrastructure agency managing national roads, waterways, and flood defences.',
    website: 'https://www.rijkswaterstaat.nl',
    phone: '0800 8002',
  },
  {
    region: 'Europe', type: 'authority',
    name: 'ANAS — Italian National Roads (Italy)',
    desc: 'Manages Italy\'s 30,000 km state road and motorway network. Report hazards via their 24-hour helpline.',
    website: 'https://www.stradeanas.it',
    phone: '800 841 148',
  },
  {
    region: 'Europe', type: 'authority',
    name: 'GDDKiA — Polish Roads Authority',
    desc: 'General Directorate for National Roads and Motorways — oversees Poland\'s national road infrastructure.',
    website: 'https://www.gov.pl/web/gddkia',
    phone: '+48 22 375 88 88',
  },
  {
    region: 'Europe', type: 'authority',
    name: 'Trafikverket (Sweden)',
    desc: 'Swedish Transport Administration responsible for all long-term infrastructure planning and road maintenance.',
    website: 'https://www.trafikverket.se',
    phone: '0771-921 921',
  },
  {
    region: 'Europe', type: 'authority',
    name: 'DGT — Directorate General of Traffic (Spain)',
    desc: 'Spain\'s national traffic authority managing road safety campaigns and hazard reporting on state roads.',
    website: 'https://www.dgt.es',
    phone: '900 123 505',
  },
  {
    region: 'Europe', type: 'platform',
    name: 'Meld Misdaad Anoniem (Netherlands)',
    desc: 'Anonymous reporting platform for road crimes and infrastructure hazards in the Netherlands.',
    website: 'https://www.meldmisdaad.nl',
    phone: '0800 7000',
  },

  // ── Asia & Pacific ─────────────────────────────────────────────────────────
  {
    region: 'Asia & Pacific', type: 'authority',
    name: 'NHAI — National Highways Authority of India',
    desc: 'Responsible for development and maintenance of national highways across India. 24/7 helpline for road distress.',
    website: 'https://nhai.gov.in',
    phone: '1033',
  },
  {
    region: 'Asia & Pacific', type: 'authority',
    name: 'NEXCO — Japan Expressway Companies',
    desc: 'Three regional companies operating Japan\'s 8,400 km expressway network with 24-hour emergency response.',
    website: 'https://www.e-nexco.co.jp',
    phone: '0570-024-024',
  },
  {
    region: 'Asia & Pacific', type: 'authority',
    name: 'Korea Expressway Corporation',
    desc: 'Builds and operates South Korea\'s expressway network, with 24-hour emergency and hazard reporting services.',
    website: 'https://www.ex.co.kr',
    phone: '1588-2504',
  },
  {
    region: 'Asia & Pacific', type: 'authority',
    name: 'Land Transport Authority (Singapore)',
    desc: 'Singapore\'s statutory board overseeing road infrastructure, public transport, and active mobility safety.',
    website: 'https://www.lta.gov.sg',
    phone: '1800 2255 582',
  },
  {
    region: 'Asia & Pacific', type: 'hotline',
    name: 'China Road Transport Hotline',
    desc: 'Ministry of Transport hotline for road hazard reports, freight violations, and infrastructure complaints.',
    website: 'https://www.mot.gov.cn',
    phone: '12328',
  },
  {
    region: 'Asia & Pacific', type: 'authority',
    name: 'Department of Highways (Thailand)',
    desc: 'Thai authority responsible for 50,000+ km of highway network — report hazards via their national hotline.',
    website: 'https://www.doh.go.th',
    phone: '1586',
  },
  {
    region: 'Asia & Pacific', type: 'authority',
    name: 'Bina Marga / BPJT (Indonesia)',
    desc: 'Indonesian directorate managing national roads and toll roads. Emergency and hazard reporting available.',
    website: 'https://bpjt.pu.go.id',
    phone: '14091',
  },
  {
    region: 'Asia & Pacific', type: 'authority',
    name: 'Department of Highways (Sri Lanka)',
    desc: 'Government body responsible for expressways, national, and provincial roads across Sri Lanka.',
    website: 'https://www.highway.gov.lk',
    phone: '+94 11 2694 085',
  },
  {
    region: 'Asia & Pacific', type: 'authority',
    name: 'Department of Public Works (Philippines)',
    desc: 'DPWH handles all national road projects and accepts hazard reports through their road emergency hotline.',
    website: 'https://www.dpwh.gov.ph',
    phone: '165-02',
  },

  // ── Middle East ────────────────────────────────────────────────────────────
  {
    region: 'Middle East', type: 'authority',
    name: 'General Authority of Roads & Bridges (Saudi Arabia)',
    desc: 'Oversees Saudi Arabia\'s 70,000 km road network and accepts reports on road damage, accidents, and hazards.',
    website: 'https://www.roads.gov.sa',
    phone: '19933',
  },
  {
    region: 'Middle East', type: 'authority',
    name: 'UAE Federal Roads & Transport Authority',
    desc: 'Oversees roads and public transport in the UAE. Emergency and hazard reports accepted 24/7.',
    website: 'https://www.rta.ae',
    phone: '800 9090',
  },
  {
    region: 'Middle East', type: 'authority',
    name: 'Directorate General of Highways (Turkey)',
    desc: 'Turkish highways authority managing 68,000 km of national roads and 2,800+ km of motorways.',
    website: 'https://www.kgm.gov.tr',
    phone: '444 0 466',
  },
  {
    region: 'Middle East', type: 'authority',
    name: 'Ministry of Public Works (Jordan)',
    desc: 'Responsible for Jordan\'s road infrastructure. Report potholes and hazards through the national services portal.',
    website: 'https://www.mopw.gov.jo',
    phone: '+962 6 585 7000',
  },
  {
    region: 'Middle East', type: 'authority',
    name: 'Qatar Ashghal (Public Works Authority)',
    desc: 'Qatar\'s authority for road design, construction, and maintenance — including hazard and defect reporting.',
    website: 'https://www.ashghal.gov.qa',
    phone: '16000',
  },

  // ── Africa ─────────────────────────────────────────────────────────────────
  {
    region: 'Africa', type: 'authority',
    name: 'SANRAL — South African National Roads Agency',
    desc: 'Manages South Africa\'s 22,000 km national road network and operates a 24-hour hazard reporting line.',
    website: 'https://www.sanral.co.za',
    phone: '0800 234 567',
  },
  {
    region: 'Africa', type: 'authority',
    name: 'KeNHA — Kenya National Highways Authority',
    desc: 'Responsible for national trunk roads in Kenya — free hotline for road distress, potholes, and emergency reporting.',
    website: 'https://www.kenha.co.ke',
    phone: '0800 720 607',
  },
  {
    region: 'Africa', type: 'authority',
    name: 'Ghana Highway Authority',
    desc: 'Develops and maintains Ghana\'s trunk road network. Report road defects via their regional offices.',
    website: 'https://gha.gov.gh',
    phone: '+233 30 266 6590',
  },
  {
    region: 'Africa', type: 'authority',
    name: 'FERMA — Federal Roads Maintenance Agency (Nigeria)',
    desc: 'Nigeria\'s agency dedicated to emergency and routine maintenance of federal roads and bridges.',
    website: 'https://www.ferma.gov.ng',
    phone: '+234 9 291 4567',
  },
  {
    region: 'Africa', type: 'authority',
    name: 'GARBLT — General Authority for Roads (Egypt)',
    desc: 'Egyptian authority managing the national road network — accepts hazard and infrastructure complaints.',
    website: 'https://www.mts.gov.eg',
    phone: '+20 2 2579 4999',
  },
  {
    region: 'Africa', type: 'authority',
    name: 'Tanzania Roads Authority (TANROADS)',
    desc: 'Responsible for Tanzania\'s trunk and regional road network. Reports can be submitted to regional offices.',
    website: 'https://www.tanroads.go.tz',
    phone: '+255 22 211 6157',
  },
  {
    region: 'Africa', type: 'authority',
    name: 'Ethiopian Roads Administration (ERA)',
    desc: 'Manages Ethiopia\'s national road network development, maintenance, and emergency response.',
    website: 'https://www.era.gov.et',
    phone: '+251 11 557 0230',
  },

  // ── Oceania ────────────────────────────────────────────────────────────────
  {
    region: 'Oceania', type: 'authority',
    name: 'Transport for NSW (Australia)',
    desc: 'NSW state road authority — report potholes and hazards on state roads via 132 701.',
    website: 'https://www.transport.nsw.gov.au',
    phone: '132 701',
  },
  {
    region: 'Oceania', type: 'authority',
    name: 'VicRoads — Victoria (Australia)',
    desc: 'Manages Victoria\'s 22,000 km road network. Report damaged roads, signs, and hazards via phone or online.',
    website: 'https://www.vicroads.vic.gov.au',
    phone: '13 11 70',
  },
  {
    region: 'Oceania', type: 'authority',
    name: 'Main Roads Western Australia',
    desc: 'Plans and manages WA\'s state road network. 24-hour road emergency and hazard reporting hotline.',
    website: 'https://www.mainroads.wa.gov.au',
    phone: '138 138',
  },
  {
    region: 'Oceania', type: 'authority',
    name: 'Waka Kotahi NZTA (New Zealand)',
    desc: 'New Zealand Transport Agency — manages state highways and accepts hazard reports via phone or online portal.',
    website: 'https://www.nzta.govt.nz',
    phone: '0800 44 44 49',
  },
]

const REGIONS: Region[] = ['All', 'Americas', 'Europe', 'Asia & Pacific', 'Middle East', 'Africa', 'Oceania']

const TYPE_COLORS: Record<Resource['type'], string> = {
  authority: 'bg-blue-50 text-blue-700 border-blue-100',
  hotline:   'bg-red-50 text-red-700 border-red-100',
  platform:  'bg-purple-50 text-purple-700 border-purple-100',
  ngo:       'bg-green-50 text-green-700 border-green-100',
}

const TYPE_LABELS: Record<Resource['type'], string> = {
  authority: 'Official Authority',
  hotline:   'Emergency Hotline',
  platform:  'Reporting Platform',
  ngo:       'NGO / Advocacy',
}

export default function ResourcesPage() {
  const [region, setRegion] = useState<Region>('All')
  const [query,  setQuery]  = useState('')

  const filtered = useMemo(() => RESOURCES.filter(r => {
    if (region !== 'All' && r.region !== region) return false
    if (query) {
      const q = query.toLowerCase()
      return r.name.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q) || r.region.toLowerCase().includes(q)
    }
    return true
  }), [region, query])

  const counts = useMemo(() => {
    const map: Partial<Record<Region, number>> = { All: RESOURCES.length }
    for (const r of RESOURCES) {
      map[r.region] = (map[r.region] ?? 0) + 1
    }
    return map
  }, [])

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gray-50 pb-20">

      {/* ── Header ── */}
      <div className="bg-white border-b border-gray-100 px-4 lg:px-8 pt-8 pb-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900">Global Road Resources</h1>
              <p className="text-sm text-gray-400">{RESOURCES.length} agencies, hotlines & platforms worldwide</p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-5 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              placeholder="Search by name, country, or description..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>

          {/* Region tabs */}
          <div className="mt-4 flex gap-1.5 flex-wrap">
            {REGIONS.map(r => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all border ${
                  region === r
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {r} {counts[r] !== undefined && <span className="opacity-70">({counts[r]})</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Resource cards ── */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 pt-6">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-medium">No resources match your search.</p>
            <button onClick={() => { setQuery(''); setRegion('All') }} className="mt-3 text-sm text-orange-500 hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-gray-400 font-medium mb-4">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {filtered.map((r, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:border-gray-200 transition-all">

                  {/* Type badge + region */}
                  <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide ${TYPE_COLORS[r.type]}`}>
                      {TYPE_LABELS[r.type]}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">{r.region}</span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm mb-1.5 leading-snug">{r.name}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{r.desc}</p>

                  <div className="flex flex-col gap-2">
                    {/* Phone */}
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                      </div>
                      <span className="font-semibold text-gray-700">{r.phone}</span>
                    </div>

                    {/* Website */}
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                        </svg>
                      </div>
                      <a
                        href={r.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate"
                      >
                        {r.website.replace('https://', '')}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Legend ── */}
      <div className="max-w-4xl mx-auto px-4 lg:px-8 mt-8 pb-4">
        <div className="flex items-center gap-4 flex-wrap">
          <p className="text-xs text-gray-400 font-medium">Key:</p>
          {(Object.entries(TYPE_LABELS) as [Resource['type'], string][]).map(([type, label]) => (
            <div key={type} className="flex items-center gap-1.5">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide ${TYPE_COLORS[type]}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-300 mt-3">
          Phone numbers and websites are provided for informational purposes. Always verify with official sources before calling.
        </p>
      </div>
    </div>
  )
}
