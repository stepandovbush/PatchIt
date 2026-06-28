// node seed.js  — idempotent: safe to re-run
const { createClient } = require('@supabase/supabase-js')

const URL  = 'https://utyeaupyqteknqrcjhei.supabase.co'
const KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0eWVhdXB5cXRla25xcmNqaGVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI2MjE1NDYsImV4cCI6MjA5ODE5NzU0Nn0.LCYT_uWVXgMNSAjG-zi3OoYjWD1ai7ND-wXAFYKq1K8'

const anon = createClient(URL, KEY)
function authed(token) {
  return createClient(URL, KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false },
  })
}

const USERS = [
  { email: 'alexm@demo.com',    password: 'Demo1234!', username: 'alexm'     },
  { email: 'sarahc@demo.com',   password: 'Demo1234!', username: 'sarahc'    },
  { email: 'mikej@demo.com',    password: 'Demo1234!', username: 'mikej'     },
  { email: 'priyap@demo.com',   password: 'Demo1234!', username: 'priyap'    },
  { email: 'jamesw@demo.com',   password: 'Demo1234!', username: 'jamesw'    },
  { email: 'emilie_d@demo.com', password: 'Demo1234!', username: 'emilie_d'  },
  { email: 'kenji_r@demo.com',  password: 'Demo1234!', username: 'kenji_r'   },
  { email: 'olivia_au@demo.com',password: 'Demo1234!', username: 'olivia_au' },
  { email: 'carlos_sp@demo.com',password: 'Demo1234!', username: 'carlos_sp' },
  { email: 'bernd_k@demo.com',  password: 'Demo1234!', username: 'bernd_k'   },
  { email: 'fatima_ke@demo.com',password: 'Demo1234!', username: 'fatima_ke' },
  { email: 'raj_in@demo.com',   password: 'Demo1234!', username: 'raj_in'    },
  { email: 'mei_hk@demo.com',   password: 'Demo1234!', username: 'mei_hk'    },
  { email: 'pablo_mx@demo.com', password: 'Demo1234!', username: 'pablo_mx'  },
  { email: 'anna_pl@demo.com',  password: 'Demo1234!', username: 'anna_pl'   },
  { email: 'lena_es@demo.com', password: 'Demo1234!', username: 'lena_es'   },
  { email: 'ivan_ru@demo.com', password: 'Demo1234!', username: 'ivan_ru'   },
  { email: 'jin_kr@demo.com',  password: 'Demo1234!', username: 'jin_kr'    },
  { email: 'amara_gh@demo.com',password: 'Demo1234!', username: 'amara_gh'  },
  { email: 'dian_id@demo.com', password: 'Demo1234!', username: 'dian_id'   },
]

// Real pothole photos — Wikimedia Commons (CC licensed) + local shots
const W = (file) =>
  `https://upload.wikimedia.org/wikipedia/commons/thumb/${file}`

const PHOTOS = {
  // ── Potholes ──────────────────────────────────────────────────────────────
  pot1:       '/pot1.avif',
  pot2:       '/pot2.avif',
  london:     W('9/94/Potholes_-_at_the_junction_of_Philip_Lane_N15_and_Mount_Pleasant_Road_N17.jpg/1280px-Potholes_-_at_the_junction_of_Philip_Lane_N15_and_Mount_Pleasant_Road_N17.jpg'),
  montreal:   W('8/86/Pothole_in_Villeray%2C_Montr%C3%A9al.jpg/1280px-Pothole_in_Villeray%2C_Montr%C3%A9al.jpg'),
  longlane:   W('4/4d/A_pothole_by_Long_Lane_-_geograph.org.uk_-_2565265.jpg/1280px-A_pothole_by_Long_Lane_-_geograph.org.uk_-_2565265.jpg'),
  // Toronto spring pothole — city truck literally stuck in pothole while doing repairs (Toronto, 2008)
  muchos:     W('b/b7/Ironic_Pothole_Mayhem_%2812683223904%29.jpg/960px-Ironic_Pothole_Mayhem_%2812683223904%29.jpg'),
  icy:        W('4/4f/Icy_pothole_-_geograph.org.uk_-_1089086.jpg/1280px-Icy_pothole_-_geograph.org.uk_-_1089086.jpg'),
  potholed:   W('c/c9/Potholed_road_-_geograph.org.uk_-_1534809.jpg/1280px-Potholed_road_-_geograph.org.uk_-_1534809.jpg'),
  potholed2:  W('c/c3/Potholed_road_-_geograph.org.uk_-_164053.jpg/1280px-Potholed_road_-_geograph.org.uk_-_164053.jpg'),
  // Lagos mud-filled pothole — actual photo from Lagos, Nigeria
  bostock:    W('f/f9/A_mud_filled_pothole_on_a_road_in_Lagos%2C_Nigeria.jpg/960px-A_mud_filled_pothole_on_a_road_in_Lagos%2C_Nigeria.jpg'),
  // NYC pothole — 2nd Avenue, New York City (original Pothole_Big.jpg was only 400px wide)
  big:        W('3/35/Large_pot_hole_on_2nd_Avenue_in_New_York_City.JPG/960px-Large_pot_hole_on_2nd_Avenue_in_New_York_City.JPG'),
  bengaluru:  W('3/36/Potholes_in_Bengaluru_road.jpg/1280px-Potholes_in_Bengaluru_road.jpg'),
  potholes:   W('b/bc/Pot_holes.jpg/1280px-Pot_holes.jpg'),
  bache:      W('a/af/Bache_en_la_escuela.jpg/1280px-Bache_en_la_escuela.jpg'),
  isle:       W('1/10/Newport_Whitepit_Lane_pot_hole.JPG/1280px-Newport_Whitepit_Lane_pot_hole.JPG'),
  banbury:    W('b/b1/Banbury%27s_Bretch_Hill_Pothole%2C_2010.png/1280px-Banbury%27s_Bretch_Hill_Pothole%2C_2010.png'),
  // ── Location / context specific ──────────────────────────────────────────
  // French potholes on a community road (France)
  nids_fr:    W('3/3e/Nids-de-poule_sur_une_route_communale.jpg/1280px-Nids-de-poule_sur_une_route_communale.jpg'),
  // German Schlagloch (pothole) between Mannheim and Heidelberg
  schlagloch: W('2/25/Schlagloch_zwischen_Friedrichsfeld_und_Grenzhof.JPG/1280px-Schlagloch_zwischen_Friedrichsfeld_und_Grenzhof.JPG'),
  // Crocodile / alligator cracking — asphalt surface failure pattern
  asphalt_crack: W('7/75/Asphalt_deterioration.jpg/1280px-Asphalt_deterioration.jpg'),
  // Australia — Dungog road flooding/potholes (NSW, 2016)
  aus_road:   W('a/a6/Dungog_flooding_2016-01-6_e_-_Flickr_-_Macleay_Grass_Man.jpg/960px-Dungog_flooding_2016-01-6_e_-_Flickr_-_Macleay_Grass_Man.jpg'),
  // South Africa — multiple fallen trees blocking road in Kruger NP after storm
  za_storm:   W('b/b3/Road_closed_after_the_storm_..._-_Flickr_-_berniedup.jpg/960px-Road_closed_after_the_storm_..._-_Flickr_-_berniedup.jpg'),
  // Des Moines derecho 2020 — fallen tree limbs on a city street
  derecho:    W('9/9e/2020aug10-derecho-damage-AAnsorge-MerleHay-DSM.jpg/960px-2020aug10-derecho-damage-AAnsorge-MerleHay-DSM.jpg'),
  // Dortmund — road surface and kerb heaved up by ancient plane tree roots
  tree_roots: W('e/e7/Grating%2C_kerb%2C_and_road_surface_uplifted_by_age-old_plane_tree_roots_-_Dortmund%2C_Am_Oelpfad%2C_2020-01-24.jpg/960px-Grating%2C_kerb%2C_and_road_surface_uplifted_by_age-old_plane_tree_roots_-_Dortmund%2C_Am_Oelpfad%2C_2020-01-24.jpg'),
  // ── City-specific new posts ───────────────────────────────────────────────
  // Pothole IN Los Angeles (confirmed)
  la:        W('b/be/Potholeinlosangeles.jpg/1280px-Potholeinlosangeles.jpg'),
  // Tomsk, Russia — spring road damage (potholes in Russian city)
  tomsk:     W('d/db/Berdskaya_street_in_Tomsk_01.JPG/1280px-Berdskaya_street_in_Tomsk_01.JPG'),
  // Jakarta flood 2013 — car navigating flooded Jakarta street
  banjir:    W('f/fa/Banjir_Jakarta_2013.jpeg/1280px-Banjir_Jakarta_2013.jpeg'),
  // South Korea pothole (Wikimedia: Potholes in South Korea category)
  korea:     W('a/ac/Roadhole_in_Korea.jpg/1280px-Roadhole_in_Korea.jpg'),
  // New Orleans — decorated/marked pothole on Magazine St
  nola:      W('2/22/A_Pothole_Is_Decorated_-_Mid-City_New_Orleans.jpg/1280px-A_Pothole_Is_Decorated_-_Mid-City_New_Orleans.jpg'),
  // Indianapolis 2022 pothole
  indy:      W('f/f4/Pothole_-_June_2022_-_Indianapolis_-_Sarah_Stierch.jpg/1280px-Pothole_-_June_2022_-_Indianapolis_-_Sarah_Stierch.jpg'),
  // Ghana — potholes on Wa road
  ghana:     W('7/78/Pot_holes_in_wa_road.jpg/1280px-Pot_holes_in_wa_road.jpg'),
  // Car sinking into pothole — dramatic, for Cairo
  carsink:   W('8/89/Car_sinking_in_a_pothole.jpg/1280px-Car_sinking_in_a_pothole.jpg'),
  // Virginia Avenue nasty pothole — extra US city
  virginia:  W('e/e0/Nasty_pothole_in_the_middle_of_Virginia_Avenue.jpg/1280px-Nasty_pothole_in_the_middle_of_Virginia_Avenue.jpg'),
  // ── Fallen trees (local) ──────────────────────────────────────────────────
  fallen_tree:  '/pot19.jpg',  // massive trunk across paved road
  fallen_tree2: '/pot9.jpg',   // fallen tree blocking forest road
  // ── Sinkholes (local) ─────────────────────────────────────────────────────
  sinkhole:   '/pot3.jpg',   // water-filled road collapse
  sinkhole2:  '/pot4.jpg',   // sinkhole with orange cones & yellow barrier
  sinkhole3:  '/pot5.jpg',   // aerial view of intersection sinkhole
  // ── Flooding (local) ──────────────────────────────────────────────────────
  flooded:    '/pot6.jpg',   // car stopped at flooded road
  flooded2:   '/pot7.jpg',   // aerial flood-washed bridge/road
  flooded3:   '/pot8.jpeg',  // flooded street, car at STOP sign
}

function daysAgo(n) { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString() }
function hoursAgo(n) { const d = new Date(); d.setHours(d.getHours() - n); return d.toISOString() }

async function getSession(u) {
  const { data: si } = await anon.auth.signInWithPassword({ email: u.email, password: u.password })
  if (si?.session) { process.stdout.write(`  ✓ ${u.username}\n`); return { id: si.user.id, token: si.session.access_token } }
  const { data: su, error } = await anon.auth.signUp({ email: u.email, password: u.password })
  if (error) throw new Error(`Signup failed for ${u.email}: ${error.message}`)
  if (!su.session) throw new Error(`Email confirmation is ON — disable it in Supabase Auth settings.`)
  process.stdout.write(`  ✓ ${u.username} (new)\n`)
  return { id: su.user.id, token: su.session.access_token }
}

async function main() {
  console.log('\n🔶 PatchIt seed\n')

  // ── Users ─────────────────────────────────────────────────────────────────
  console.log('Step 1/4  users...')
  const sessions = []
  for (const u of USERS) {
    const s = await getSession(u)
    const c = authed(s.token)
    await c.from('profiles').upsert({ id: s.id, username: u.username })
    sessions.push({ ...u, ...s, client: c })
  }
  const [alex, sarah, mike, priya, james, emilie, kenji, olivia, carlos, bernd,
         fatima, raj, mei, pablo, anna,
         lena, ivan, jin, amara, dian] = sessions

  // ── Wipe all existing reports for demo users (idempotency) ────────────────
  console.log('\nStep 1b/4  wipe old reports...')
  for (const s of sessions) {
    await s.client.from('reports').delete().eq('user_id', s.id)
    process.stdout.write(`  ✓ cleared ${s.username}\n`)
  }

  // ── Reports ───────────────────────────────────────────────────────────────
  console.log('\nStep 2/4  reports...')
  const defs = [
    { by: alex,   title: 'Giant crater on Oak Ave',
      desc: 'Nearly wrecked my car last night. Right in the middle of the lane, water pools in it after rain.',
      lat: 40.6782, lng: -73.9442, addr: '42 Oak Avenue, Brooklyn NY',
      img: PHOTOS.pot1, status: 'open', severity: 'critical',
      ai_desc: 'A large, deep pothole with water pooling inside, indicating full base-course failure. Poses serious risk of vehicle damage and aquaplaning at normal driving speeds.' },

    { by: sarah,  title: 'Pothole right outside PS 147 — REPAIRED',
      desc: 'Was dangerous for kids. City crews finally patched it after weeks of community pressure.',
      lat: 40.7128, lng: -74.0060, addr: '3rd Street & Broadway, Manhattan NY',
      img: PHOTOS.potholes, status: 'fixed', severity: 'severe',
      ai_desc: 'School-zone pothole successfully repaired following sustained community reporting. Surface now flush and safe for pedestrian and cyclist traffic.' },

    { by: mike,   title: 'Crumbling pavement on 5th Ave',
      desc: 'Between 42nd and 43rd the whole section is falling apart — counted at least 5 potholes.',
      lat: 40.7549, lng: -73.9840, addr: '5th Avenue & 42nd St, Manhattan NY',
      img: PHOTOS.potholed, status: 'open', severity: 'severe',
      ai_desc: 'Extensive pavement deterioration with multiple interconnected voids. Surface failure pattern suggests underlying structural or drainage deficiency.' },

    { by: priya,  title: 'Road collapse near Grand Concourse — FIXED',
      desc: null,
      lat: 40.8448, lng: -73.8648, addr: 'Grand Concourse & 161st St, Bronx NY',
      img: PHOTOS.isle, status: 'fixed', severity: 'moderate',
      ai_desc: 'Previously severe road collapse, now patched and repaired. Evidence of earlier complete pavement layer failure successfully addressed by city maintenance crews.' },

    { by: alex,   title: 'Pothole blocking drain causing flooding',
      desc: 'Been here for months. Floods the whole block because it sits right over the drain.',
      lat: 40.7282, lng: -73.7949, addr: 'Jamaica Ave & 165th St, Queens NY',
      img: PHOTOS.pot2, status: 'open', severity: 'severe',
      ai_desc: 'Large pothole directly over a storm drain causing persistent flooding. Water infiltration is actively accelerating sub-base deterioration and will worsen without repair.' },

    { by: sarah,  title: 'Deep hole next to fire hydrant on 7th Ave',
      desc: 'Cones keep getting knocked over at night. At least 8 inches deep.',
      lat: 40.7580, lng: -73.9855, addr: '7th Ave & 34th St, Manhattan NY',
      img: PHOTOS.big, status: 'in_progress', severity: 'critical',
      ai_desc: 'Critical-depth void adjacent to a fire hydrant compromising emergency vehicle access. Depth indicates complete base course failure; immediate hazard to pedestrians.' },

    { by: mike,   title: 'Severe winter damage on Michigan Ave',
      desc: 'Freeze-thaw cycles completely destroyed this stretch. Cars bottoming out every day.',
      lat: 41.8781, lng: -87.6298, addr: 'N Michigan Ave, Chicago IL',
      img: PHOTOS.icy, status: 'open', severity: 'critical',
      ai_desc: 'Ice-filled pothole from severe freeze-thaw cycling across a major urban thoroughfare. Full pavement layer deterioration — dangerous black ice risk at low temperatures.' },

    { by: priya,  title: 'Spring potholes on Yonge Street',
      desc: 'Every spring this block turns into a minefield. At least a dozen craters.',
      lat: 43.6532, lng: -79.3832, addr: 'Yonge Street, Toronto ON',
      img: PHOTOS.muchos, status: 'open', severity: 'severe',
      ai_desc: 'Severe road deterioration consistent with repeated freeze-thaw damage on a high-traffic corridor. Seasonal pattern suggests inadequate sub-base drainage needing engineering intervention.' },

    { by: james,  title: 'Dangerous pothole on Oxford Street',
      desc: 'Right in the bus lane. Buses are swerving out to avoid it, making it a nightmare for cyclists.',
      lat: 51.5152, lng: -0.1413, addr: 'Oxford Street, London UK',
      img: PHOTOS.london, status: 'open', severity: 'severe',
      ai_desc: 'Multiple potholes in an active road junction in London. Heavy bus traffic is swerving to avoid them, creating secondary hazard for cyclists on one of the city\'s busiest streets.' },

    { by: emilie, title: 'Trou dangereux Avenue de la République',
      desc: 'Un immense trou au carrefour. Deux motos ont déjà chuté à cause de lui cette semaine.',
      lat: 48.8637, lng: 2.3764, addr: 'Avenue de la République, Paris FR',
      img: PHOTOS.nids_fr, status: 'in_progress', severity: 'critical',
      ai_desc: 'Critical road failure at a busy urban intersection with confirmed motorcycle injury incidents. Emergency repair required to prevent further accidents.' },

    { by: bernd,  title: 'Großes Schlagloch auf Unter den Linden',
      desc: 'Das Schlagloch ist so tief, dass es Fahrradfelgen beschädigt.',
      lat: 52.5170, lng: 13.3888, addr: 'Unter den Linden, Berlin DE',
      img: PHOTOS.schlagloch, status: 'open', severity: 'moderate',
      ai_desc: 'Moderate pothole on a historic Berlin boulevard with confirmed bicycle wheel damage. Edge cracking suggests enlargement is imminent without prompt repair.' },

    { by: kenji,  title: 'Road crack near Shinjuku Station — FIXED',
      desc: 'Repair crews came within 48 hours. Tokyo moves fast — crack fully sealed and resurfaced.',
      lat: 35.6896, lng: 139.6917, addr: 'Shinjuku Station West Exit, Tokyo JP',
      img: PHOTOS.asphalt_crack, status: 'fixed', severity: 'moderate',
      ai_desc: 'Longitudinal cracking successfully sealed and resurfaced. Repair completed within 48 hours of report, demonstrating responsive municipal maintenance.' },

    { by: alex,   title: 'Multiple potholes on Western Express Highway',
      desc: 'The highway surface is completely gone in places. Serious accident risk at 80 km/h.',
      lat: 19.0760, lng: 72.8777, addr: 'Western Express Hwy, Mumbai IN',
      img: PHOTOS.bengaluru, status: 'open', severity: 'critical',
      ai_desc: 'Multiple critical potholes on an Indian urban highway with complete surface loss in sections. Extreme danger at traffic speeds; temporary filling and speed restriction required immediately.' },

    { by: olivia, title: 'Pothole near Harbour Bridge approach',
      desc: 'Right before the onramp, cannot be avoided at speed. Already caused one blowout I saw personally.',
      lat: -33.8523, lng: 151.2108, addr: 'Bradfield Hwy, Sydney NSW',
      img: PHOTOS.aus_road, status: 'open', severity: 'severe',
      ai_desc: 'Severe pothole on a bridge approach ramp with constrained lane geometry. High speed combined with limited manoeuvre space creates significant tyre damage and crash risk.' },

    { by: carlos, title: 'Cratera na Avenida Paulista',
      desc: 'Buraco imenso no meio da faixa. Já causou dois acidentes essa semana.',
      lat: -23.5613, lng: -46.6558, addr: 'Avenida Paulista, São Paulo BR',
      img: PHOTOS.sinkhole2, status: 'open', severity: 'critical',
      ai_desc: 'Massive road crater spanning the full lane width on São Paulo\'s main commercial boulevard. Two confirmed accidents this week; emergency repair warranted immediately.' },

    { by: sarah,  title: 'Road completely destroyed on Victoria Island',
      desc: 'The entire carriageway has collapsed. Cars are going off-road to pass.',
      lat: 6.4281, lng: 3.4219, addr: 'Adeola Odeku St, Lagos NG',
      img: PHOTOS.bostock, status: 'open', severity: 'critical',
      ai_desc: 'Catastrophic road surface failure across the entire carriageway. Complete structural collapse with underlying material exposed; infrastructure emergency requiring immediate civil engineering response.' },

    // ── Fallen trees ──────────────────────────────────────────────────────────
    { by: anna,   title: 'Tree down blocking both lanes on Cypress Rd',
      desc: 'Storm last night dropped a massive oak across the full road. No way through — cars turning back.',
      lat: 49.2827, lng: -123.1207, addr: 'Cypress Road, Vancouver BC',
      img: PHOTOS.fallen_tree, status: 'open', severity: 'critical',  // pot19: massive trunk on paved road
      ai_desc: 'Multiple downed trees completely blocking vehicle passage on a two-lane road. Debris field spans full road width; requires chain-saw crew and heavy equipment for clearance.' },

    { by: bernd,  title: 'Herengracht cycle lane branch — CLEARED',
      desc: 'Amsterdam cleared it the same morning. Lane fully open again within 3 hours of the report.',
      lat: 52.3740, lng: 4.8897, addr: 'Herengracht, Amsterdam NL',
      img: PHOTOS.fallen_tree2, status: 'fixed', severity: 'moderate',
      ai_desc: 'Fallen branch blocking dedicated cycle infrastructure fully cleared. Same-morning response by city crews restored safe passage for cyclists.' },

    { by: carlos, title: 'Three trees down on Jan Smuts Ave after storm',
      desc: 'Thunderstorm last night. Jan Smuts is blocked for at least 500 metres. Commuters stuck.',
      lat: -26.1440, lng: 28.0291, addr: 'Jan Smuts Ave, Johannesburg ZA',
      img: PHOTOS.za_storm, status: 'open', severity: 'critical',  // South Africa: multiple fallen trees on road
      ai_desc: 'Major road blockage from multiple downed trees following severe thunderstorm. Extensive debris across multiple blocks; emergency clearance services required immediately.' },

    // ── Sinkholes ─────────────────────────────────────────────────────────────
    { by: fatima, title: 'Sinkhole swallowing Queens Blvd near Rego Park',
      desc: 'Massive hole appeared overnight — at least 6 feet across and still growing. Police have coned it.',
      lat: 40.7282, lng: -73.8708, addr: 'Queens Blvd & 63rd Dr, Rego Park NY',
      img: PHOTOS.sinkhole3, status: 'in_progress', severity: 'critical',  // pot5: aerial intersection sinkhole
      ai_desc: 'Large urban sinkhole with evidence of active expansion. Underlying infrastructure likely compromised; represents an imminent collapse hazard for passing vehicles.' },

    { by: pablo,  title: 'Sinkhole opening up on Insurgentes Ave',
      desc: "Spotted a new sinkhole forming near the metro station. It's getting bigger every hour — very dangerous.",
      lat: 19.4326, lng: -99.1332, addr: 'Av. Insurgentes Sur, Mexico City MX',
      img: PHOTOS.sinkhole, status: 'open', severity: 'critical',  // pot3: water-filled road collapse
      ai_desc: 'Developing sinkhole at a high-traffic urban arterial near metro infrastructure. Progressive subsidence pattern suggests underground void with risk of sudden full collapse.' },

    // ── Flooding ──────────────────────────────────────────────────────────────
    { by: mei,    title: 'Sukhumvit Road completely flooded — avoid',
      desc: 'Monsoon water is 40cm deep across 3 lanes. Cars stalling. No detour signs posted.',
      lat: 13.7367, lng: 100.5608, addr: 'Sukhumvit Road, Bangkok TH',
      img: PHOTOS.flooded3, status: 'open', severity: 'critical',  // pot8: car at flooded STOP sign
      ai_desc: 'Deep standing water across all lanes of a major urban arterial. Vehicle stalling and hydroplaning risk is extreme; road closure and emergency pumping required immediately.' },

    { by: fatima, title: 'Thika Road flooded after heavy rain, Nairobi',
      desc: 'Flash flood from last night completely submerged the lower section. Trucks are getting stuck.',
      lat: -1.2921, lng: 36.8219, addr: 'Thika Road, Nairobi KE',
      img: PHOTOS.flooded2, status: 'open', severity: 'severe',  // pot7: aerial flood-damaged road/bridge
      ai_desc: 'Country road flooded to significant depth following heavy rainfall. Soft road shoulders and reduced visibility are compounding the hazard; heavy vehicles are becoming stranded.' },

    { by: raj,    title: 'NH48 Electronic City flood — road now clear',
      desc: 'Pumping teams cleared it overnight. Highway re-opened this morning after drain inspection.',
      lat: 12.8456, lng: 77.6601, addr: 'NH48 Electronic City, Bengaluru IN',
      img: PHOTOS.flooded, status: 'fixed', severity: 'severe',
      ai_desc: 'Flood cleared following emergency pumping and storm drain inspection. Road re-opened after surface damage assessment confirmed no structural compromise.' },

    { by: anna,   title: 'Storm debris blocking Marszałkowska St',
      desc: 'High winds brought down signage, scaffolding, and branches. Road is impassable in the city centre.',
      lat: 52.2297, lng: 21.0122, addr: 'Marszałkowska St, Warsaw PL',
      img: PHOTOS.derecho, status: 'open', severity: 'severe',  // fallen tree limbs on a city street
      ai_desc: 'Mixed debris field from storm damage blocking a primary urban artery. Includes fallen scaffolding and tree material requiring multiple crews for safe clearance.' },

    { by: raj,    title: 'Tree roots cracking NH8 surface near Gurugram',
      desc: 'Mature tree roots have lifted and cracked two full lanes. Bumps are causing truck wheel damage.',
      lat: 28.4595, lng: 77.0266, addr: 'NH8 Gurugram, Haryana IN',
      img: PHOTOS.tree_roots, status: 'open', severity: 'moderate',
      ai_desc: 'Persistent root intrusion has fractured the asphalt surface creating raised ridges across multiple lanes. Progressive damage will worsen; root barrier installation needed alongside resurfacing.' },

    // ── New cities ────────────────────────────────────────────────────────────
    { by: carlos, title: 'Enorme bache en Avenida Corrientes',
      desc: 'Un bache gigante en pleno centro. Los autos tienen que esquivarlo en plena avenida.',
      lat: -34.6037, lng: -58.3816, addr: 'Av. Corrientes, Buenos Aires AR',
      img: PHOTOS.bache, status: 'open', severity: 'severe',
      ai_desc: 'Large central-lane pothole on one of Buenos Aires\'s main boulevards. Traffic swerving creates secondary collision hazard; requires urgent temporary filling.' },

    { by: james,  title: 'Oxford Road subsidence — fully resurfaced',
      desc: 'Council brought in a full resurfacing crew. Both lanes repaired and re-opened after a 2-day closure.',
      lat: 53.4672, lng: -2.2337, addr: 'Oxford Road, Manchester UK',
      img: PHOTOS.longlane, status: 'fixed', severity: 'severe',
      ai_desc: 'Subsidence-driven road failure successfully addressed with full-depth repair and resurfacing. Two-lane closure required during works; road now fully re-opened.' },

    { by: lena,   title: 'Bache profundo en plena Gran Vía',
      desc: 'Hay un hoyo enorme que nadie arregla. Ya han caído varias motos esta semana.',
      lat: 40.4200, lng: -3.7050, addr: 'Gran Vía, Madrid ES',
      img: PHOTOS.banbury, status: 'open', severity: 'critical',
      ai_desc: 'Deep pothole on a major tourist thoroughfare with confirmed motorcycle incidents. High pedestrian and vehicle density makes this a critical public safety hazard.' },

    { by: emilie, title: 'Strada dissestata in Via del Corso',
      desc: 'Buche enormi nel centro storico. Le auto rallentano bruscamente creando pericolo.',
      lat: 41.9003, lng: 12.4801, addr: 'Via del Corso, Rome IT',
      img: PHOTOS.potholed2, status: 'open', severity: 'moderate',
      ai_desc: 'Multiple potholes on a historic central-Rome shopping street. Abrupt braking by vehicles creates rear-end collision risk; resurfacing complicated by UNESCO heritage constraints.' },

    { by: priya,  title: 'Potholes back on Rue Saint-Denis after thaw',
      desc: "Every year after the thaw this street becomes undriveable. It's even worse this spring.",
      lat: 45.5199, lng: -73.5693, addr: 'Rue Saint-Denis, Montreal QC',
      img: PHOTOS.montreal, status: 'open', severity: 'severe',
      ai_desc: 'Annual freeze-thaw pothole cycle returning to a heavily-trafficked Montréal commercial street. Pattern of recurrence indicates drainage inadequacy needing permanent engineering solution.' },

    { by: mike,   title: 'Giant pothole swallowing cars on the 405 ramp',
      desc: 'The on-ramp from Wilshire is completely destroyed. Already saw one car blow two tires.',
      lat: 34.0522, lng: -118.4937, addr: 'I-405 Wilshire Blvd ramp, Los Angeles CA',
      img: PHOTOS.la, status: 'open', severity: 'critical',
      ai_desc: 'Critical pothole on a high-speed freeway on-ramp with confirmed tyre blowout incident. High entry speeds give drivers no time to avoid; emergency temporary repair required.' },

    { by: ivan,   title: 'Разрушенная дорога после зимы на Тверской',
      desc: 'После зимы дорога в ужасном состоянии. Ямы везде, машины объезжают по тротуарам.',
      lat: 55.7614, lng: 37.6108, addr: 'Tverskaya Street, Moscow RU',
      img: PHOTOS.tomsk, status: 'open', severity: 'critical',
      ai_desc: 'Severe post-winter road deterioration across multiple lanes on a major Moscow thoroughfare. Freeze-thaw cycling has destroyed the surface; vehicles reported mounting pavements.' },

    { by: dian,   title: 'Banjir parah di Jl. Sudirman — tidak bisa lewat',
      desc: 'Hujan deras semalam membuat Sudirman banjir setinggi lutut. Semua kendaraan macet total.',
      lat: -6.2088, lng: 106.8227, addr: 'Jl. Jenderal Sudirman, Jakarta ID',
      img: PHOTOS.banjir, status: 'open', severity: 'critical',
      ai_desc: 'Knee-deep floodwaters covering all lanes of Jakarta\'s main business corridor. Inadequate drainage infrastructure unable to handle monsoon-level rainfall; full closure warranted.' },

    { by: jin,    title: '강남대로 도로 파손 — 보수 완료',
      desc: '구청에서 신속히 대응했습니다. 이틀 만에 도로 전체가 재포장되었어요.',
      lat: 37.4981, lng: 127.0276, addr: 'Gangnam-daero, Seoul KR',
      img: PHOTOS.korea, status: 'fixed', severity: 'severe',
      ai_desc: 'Road failure on a central Seoul arterial fully repaired and resurfaced within two days of reporting. Rapid municipal response demonstrates effective hazard management.' },

    { by: alex,   title: 'Pothole on Magazine St decorated by locals — still dangerous',
      desc: "Someone put a flamingo in it last night. Funny, but it's still a serious hazard.",
      lat: 29.9288, lng: -90.0907, addr: 'Magazine Street, New Orleans LA',
      img: PHOTOS.nola, status: 'open', severity: 'moderate',
      ai_desc: 'Community-marked pothole using humorous decoration to draw attention. Despite the artwork, the void poses a genuine tyre damage risk; city repair order overdue.' },

    { by: sarah,  title: 'Potholes destroying Meridian St downtown',
      desc: "Counted 11 potholes in one block. The whole street needs to be ripped up and redone.",
      lat: 39.7684, lng: -86.1581, addr: 'N Meridian Street, Indianapolis IN',
      img: PHOTOS.indy, status: 'open', severity: 'severe',
      ai_desc: 'Dense cluster of potholes across an entire downtown block indicating systemic base-course failure. Incremental patching is no longer viable; full-depth reclamation required.' },

    { by: amara,  title: 'Terrible potholes on Ring Road Central, Accra',
      desc: 'These potholes have been here for years. Cars swerve into oncoming traffic to avoid them.',
      lat: 5.5913, lng: -0.2021, addr: 'Ring Road Central, Accra GH',
      img: PHOTOS.ghana, status: 'open', severity: 'severe',
      ai_desc: 'Chronic, multi-year pothole field on a major Accra ring road. Evasive manoeuvres by drivers create head-on collision risk; sustained funding commitment needed for proper repair.' },

    { by: fatima, title: 'Car-swallowing sinkhole near Tahrir Square',
      desc: 'A vehicle partially sank into a sinkhole that appeared overnight. Road closed on one side.',
      lat: 30.0444, lng: 31.2357, addr: 'Tahrir Square area, Cairo EG',
      img: PHOTOS.carsink, status: 'in_progress', severity: 'critical',
      ai_desc: 'Vehicle entrapment in a suddenly-formed sinkhole adjacent to a major Cairo landmark. Sub-surface void likely connected to aging utility infrastructure; structural survey urgently required.' },
  ]

  // Assign varied timestamps so the feed feels like a live community (not all posted at once)
  // Order matches defs: r1…r39
  const TIMESTAMPS = [
    daysAgo(120),  // r1  Oak Ave (months old)
    daysAgo(65),   // r2  PS 147 REPAIRED
    daysAgo(35),   // r3  5th Ave
    daysAgo(150),  // r4  Grand Concourse FIXED (oldest)
    daysAgo(1),    // r5  Jamaica drain
    hoursAgo(2),   // r6  7th Ave hydrant (brand new)
    daysAgo(95),   // r7  Michigan Ave
    daysAgo(14),   // r8  Yonge Street
    daysAgo(28),   // r9  Oxford Street
    daysAgo(3),    // r10 Paris
    daysAgo(25),   // r11 Berlin
    daysAgo(130),  // r12 Shinjuku FIXED
    daysAgo(90),   // r13 Mumbai highway
    daysAgo(5),    // r14 Sydney
    daysAgo(21),   // r15 Avenida Paulista
    daysAgo(160),  // r16 Victoria Island Lagos (oldest open)
    daysAgo(45),   // r17 Vancouver trees
    daysAgo(85),   // r18 Amsterdam CLEARED
    daysAgo(6),    // r19 Jo'burg storm
    daysAgo(4),    // r20 Queens sinkhole
    daysAgo(10),   // r21 Mexico City sinkhole
    hoursAgo(8),   // r22 Bangkok flood
    daysAgo(12),   // r23 Nairobi flood
    daysAgo(75),   // r24 Bengaluru FIXED
    daysAgo(16),   // r25 Warsaw debris
    daysAgo(32),   // r26 Gurugram roots
    daysAgo(50),   // r27 Buenos Aires
    daysAgo(100),  // r28 Manchester FIXED
    daysAgo(7),    // r29 Madrid Gran Vía
    daysAgo(55),   // r30 Rome
    daysAgo(24),   // r31 Montreal
    daysAgo(2),    // r32 LA 405
    daysAgo(40),   // r33 Moscow
    hoursAgo(1),   // r34 Jakarta Sudirman (most recent)
    daysAgo(110),  // r35 Seoul FIXED
    daysAgo(27),   // r36 New Orleans
    daysAgo(18),   // r37 Indianapolis
    daysAgo(22),   // r38 Accra
    hoursAgo(5),   // r39 Cairo sinkhole
  ]
  defs.forEach((d, i) => { d.ts = TIMESTAMPS[i] })

  // Helper: update extra columns that may not exist yet (severity, ai_description)
  async function softUpdate(client, id, severity, ai_desc) {
    await client.from('reports').update({ severity }).eq('id', id)
    await client.from('reports').update({ ai_description: ai_desc }).eq('id', id)
  }

  const rids = []
  for (const r of defs) {
    const { data: existing } = await r.by.client
      .from('reports').select('id')
      .eq('title', r.title).eq('user_id', r.by.id).maybeSingle()

    if (existing) {
      await r.by.client.from('reports').update({ media_url: r.img, created_at: r.ts }).eq('id', existing.id)
      await softUpdate(r.by.client, existing.id, r.severity, r.ai_desc)
      process.stdout.write(`  ~ ${r.title} (updated)\n`)
      rids.push(existing.id)
      continue
    }

    // INSERT (severity column doesn't exist in schema yet — detected client-side)
    const { data, error } = await r.by.client.from('reports')
      .insert({
        user_id: r.by.id, title: r.title, description: r.desc,
        lat: r.lat, lng: r.lng, address: r.addr,
        media_url: r.img, media_type: 'image', status: r.status,
        created_at: r.ts,
      })
      .select('id').single()

    if (error) { console.warn(`  ⚠ ${r.title}: ${error.message}`); rids.push(null); continue }
    await softUpdate(r.by.client, data.id, r.severity, r.ai_desc)
    rids.push(data.id)
    process.stdout.write(`  ✓ ${r.title}\n`)
  }

  const [r1,r2,r3,r4,r5,r6,r7,r8,r9,r10,r11,r12,r13,r14,r15,r16,
         r17,r18,r19,r20,r21,r22,r23,r24,r25,r26,
         r27,r28,r29,r30,r31,r32,r33,r34,r35,r36,r37,r38,r39] = rids

  // ── Comments ──────────────────────────────────────────────────────────────
  console.log('\nStep 3/4  comments...')
  const comments = [
    { by: sarah,  rid: r1,  text: 'Hit this one yesterday, nearly bent my wheel' },
    { by: mike,   rid: r1,  text: "My neighbor reported it 3 weeks ago and nothing happened smh" },
    { by: alex,   rid: r1,  text: "Yeah I've been calling 311 every week. They keep saying 'scheduled for repair'" },
    { by: priya,  rid: r1,  text: 'Saw a city truck nearby this morning — maybe finally happening?' },
    { by: james,  rid: r1,  text: 'Same thing in London, takes forever to get anything done' },
    { by: alex,   rid: r2,  text: 'Parents have been raising this at every PTA meeting' },
    { by: mike,   rid: r2,  text: 'Saw workers there today, hopefully this actually means something' },
    { by: sarah,  rid: r2,  text: 'Better get it done before school starts back up' },
    { by: priya,  rid: r2,  text: 'Kids are literally walking in the road to get around it' },
    { by: priya,  rid: r3,  text: 'I take a different route now just to avoid that block' },
    { by: sarah,  rid: r3,  text: 'I bike to work and this stretch is genuinely scary' },
    { by: mike,   rid: r3,  text: "Someone's going to get seriously hurt if this isn't fixed" },
    { by: alex,   rid: r4,  text: 'Finally fixed!! Took way too long' },
    { by: mike,   rid: r4,  text: 'Only took them 6 months lol' },
    { by: sarah,  rid: r4,  text: 'Better late than never I guess' },
    { by: sarah,  rid: r5,  text: 'My car got water damage from driving through last week' },
    { by: mike,   rid: r5,  text: 'File a formal complaint with 311 — more reports = faster fix' },
    { by: alex,   rid: r5,  text: 'Done. Complaint filed. Everyone else do the same' },
    { by: priya,  rid: r6,  text: "Those cones get knocked over every night, someone's going to fall in" },
    { by: alex,   rid: r6,  text: 'I called 311 — they said 48 hrs but that was a week ago' },
    { by: mike,   rid: r6,  text: "This is genuinely dangerous" },
    { by: olivia, rid: r7,  text: 'Chicago winters just destroy roads. Seen this every year' },
    { by: carlos, rid: r7,  text: 'Same in São Paulo after rain season — whole streets just disappear' },
    { by: james,  rid: r8,  text: 'Toronto spring potholes are infamous. Happens every single year' },
    { by: kenji,  rid: r8,  text: 'In Japan this would be fixed same day, incredible' },
    { by: mike,   rid: r9,  text: 'Oxford Street is already a nightmare without this' },
    { by: emilie, rid: r9,  text: 'Even worse in Paris — our roads are falling apart too' },
    { by: james,  rid: r9,  text: 'Reported to TfL 3 times, still waiting. Typical.' },
    { by: james,  rid: r10, text: 'Paris roads are shocking for a capital city' },
    { by: bernd,  rid: r10, text: 'Berlin is the same, we have a massive repair backlog' },
    { by: emilie, rid: r10, text: 'The city said 6 weeks before they can come. Unbelievable' },
    { by: emilie, rid: r12, text: 'Japan is supposed to have perfect infrastructure, what happened?' },
    { by: kenji,  rid: r12, text: 'Water main burst underneath last month, still not fully repaired' },
    { by: alex,   rid: r14, text: 'Beautiful city but the roads near the bridge are rough' },
    { by: olivia, rid: r14, text: 'I got a blowout here last week, this needs urgent attention' },
    { by: mike,   rid: r15, text: 'Heard about this — apparently São Paulo has thousands of these' },
    { by: carlos, rid: r15, text: 'The rainy season just destroys everything. We lose road sections every year' },
    { by: priya,  rid: r15, text: "Mumbai is the same, it's a global problem" },
    { by: priya,  rid: r16, text: 'Lagos road conditions are genuinely dangerous' },
    { by: carlos, rid: r16, text: 'This is why apps like PatchIt matter — local action creates change' },
    { by: sarah,  rid: r16, text: 'Really hope the city sees this and acts on it' },

    // fallen trees
    { by: raj,    rid: r17, text: 'This is insane, glad nobody was driving under it when it fell' },
    { by: fatima, rid: r17, text: 'We need emergency alerts for this kind of thing' },
    { by: mei,    rid: r17, text: 'Vancouver storms are no joke lately' },
    { by: pablo,  rid: r18, text: 'Cyclists are vulnerable in these situations, fix it ASAP' },
    { by: anna,   rid: r18, text: 'Council said they would respond by morning — still waiting' },
    { by: fatima, rid: r19, text: 'Joburg thunderstorms this season have been brutal' },
    { by: raj,    rid: r19, text: "Three trees! That's a whole cleanup operation" },
    // sinkholes
    { by: alex,   rid: r20, text: 'Walked past this — the hole is way bigger than it looks in photos' },
    { by: mike,   rid: r20, text: 'Another broken water main probably. Queens infrastructure is failing' },
    { by: sarah,  rid: r20, text: 'Someone is going to fall in if they don\'t light this properly at night' },
    { by: anna,   rid: r21, text: 'Mexico City sits on a lake bed — sinkholes are constant there' },
    { by: mei,    rid: r21, text: 'Hope the metro station nearby is OK, feels related' },
    // flooding
    { by: kenji,  rid: r22, text: 'Bangkok floods every monsoon season, this is unfortunately normal' },
    { by: carlos, rid: r22, text: 'São Paulo too. Cities need better drainage investment' },
    { by: mei,    rid: r22, text: 'I turned back, lost 40 minutes. There HAS to be a detour sign' },
    { by: carlos, rid: r23, text: 'Nairobi gets these flash floods so fast, no warning at all' },
    { by: priya,  rid: r24, text: 'Bengaluru drains are just not designed for modern rainfall levels' },
    { by: raj,    rid: r24, text: 'Filed complaint with BBMP, let\'s see if they respond' },
    { by: bernd,  rid: r25, text: 'Warsaw city centre blocked is a nightmare, hope crews come fast' },
    { by: kenji,  rid: r26, text: 'Tree root damage is so slow to get attention compared to potholes' },
    { by: fatima, rid: r26, text: 'Trucks losing wheels on highway root ridges is genuinely dangerous' },
  ]
  let okC = 0
  for (const c of comments) {
    if (!c.rid) continue
    const { data: ex } = await c.by.client.from('comments').select('id')
      .eq('report_id', c.rid).eq('content', c.text).maybeSingle()
    if (ex) continue
    const { error } = await c.by.client.from('comments')
      .insert({ report_id: c.rid, user_id: c.by.id, content: c.text })
    if (!error) okC++
  }
  console.log(`  ✓ ${okC} comments added`)

  // ── Upvotes ───────────────────────────────────────────────────────────────
  console.log('\nStep 4/4  upvotes...')
  const pairs = [
    [sarah,r1],[mike,r1],[priya,r1],[james,r1],
    [alex,r2],[mike,r2],[priya,r2],[james,r2],
    [alex,r3],[priya,r3],[james,r3],
    [sarah,r4],
    [sarah,r5],[mike,r5],[priya,r5],
    [alex,r6],[mike,r6],
    [olivia,r7],[james,r7],
    [james,r8],[kenji,r8],
    [mike,r9],[emilie,r9],[alex,r9],
    [james,r10],[bernd,r10],
    [emilie,r12],[james,r12],
    [alex,r14],[mike,r14],
    [mike,r15],[priya,r15],
    [priya,r16],[carlos,r16],[sarah,r16],
    // new reports
    [raj,r17],[fatima,r17],[mei,r17],[pablo,r17],
    [pablo,r18],[anna,r18],[fatima,r18],
    [fatima,r19],[raj,r19],[anna,r19],
    [alex,r20],[mike,r20],[priya,r20],[sarah,r20],
    [anna,r21],[mei,r21],[pablo,r21],
    [kenji,r22],[carlos,r22],[mei,r22],
    [carlos,r23],[fatima,r23],
    [priya,r24],[raj,r24],[mei,r24],
    [bernd,r25],[anna,r25],
    [kenji,r26],[fatima,r26],
  ]
  let okU = 0
  for (const [u, rid] of pairs) {
    if (!rid) continue
    const { error } = await u.client.from('upvotes').insert({ report_id: rid, user_id: u.id })
    if (!error) okU++
  }
  console.log(`  ✓ ${okU} upvotes added`)

  console.log('\n✅ Done! Refresh localhost:3000\n')
  console.log(`Demo accounts (password: Demo1234!): ${USERS.length} users`)
  USERS.forEach(u => console.log(`  ${u.email}`))
}

main().catch(e => { console.error('\n❌', e.message); process.exit(1) })
