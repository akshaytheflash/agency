export const site = {
  name: "Aurelia",
  legalName: "Aurelia Longevity Clinic & Retreat",
  tagline: "Medicine that keeps its promises.",
  description:
    "A physician-led longevity clinic and wellness retreat in New Delhi. Diagnostics, protocols and recovery built around one idea: measure what matters, then do less of what does not.",
  url: "https://aurelia-02-noir.vercel.app",

  // Preview scaffolding — remove when this becomes a real client site.
  variant: {
    label: "Noir",
    number: "02",
    direction: "Dark cinematic luxury",
    note: "Near-black editorial, brass hairlines, full-bleed photography.",
    siblings: [
      { label: "Lumen", number: "01", href: "https://aurelia-01-lumen.vercel.app" },
      { label: "Terra", number: "03", href: "https://aurelia-03-terra.vercel.app" },
    ],
  },

  contact: {
    phoneDisplay: "XXXX",
    phoneHref: "XXXX",
    email: "concierge@aurelia-clinic.example",
    address: {
      line1: "New Delhi",
      line2: "India",
    },
    mapsHref: "https://maps.google.com/?q=New%20Delhi%20India",
  },

  hours: [
    { days: "Monday — Friday", time: "07:00 — 19:00" },
    { days: "Saturday", time: "09:00 — 16:00" },
    { days: "Sunday", time: "Clinical emergencies only" },
  ],

  nav: [
    { label: "Treatments", href: "/treatments" },
    { label: "The Retreat", href: "/retreat" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const credentials = [
  "NMC registered",
  "ISO 9001:2015 clinic",
  "18 resident physicians",
  "NAD+ & GLP-1 certified",
];

export const stats = [
  { value: "12", suffix: "yrs", label: "Practising longevity medicine" },
  { value: "9,400", suffix: "+", label: "Guests through the programme" },
  { value: "94", suffix: "%", label: "Renew for a second year" },
  { value: "18", suffix: "", label: "Physicians on site, full-time" },
];

export const method = [
  {
    step: "01",
    title: "Assess",
    body: "A 90-minute intake that reads your history, your sleep, your bloods and your routine. No brochure, no upsell — a baseline you can actually reason about.",
  },
  {
    step: "02",
    title: "Diagnose",
    body: "We map the eight markers that predict how you will age over the next thirty years, and discard the ninety that do not.",
  },
  {
    step: "03",
    title: "Protocol",
    body: "A written plan: what to change, what to take, what to stop. Delivered in-clinic, at home, or while you sleep here on the hill.",
  },
  {
    step: "04",
    title: "Sustain",
    body: "Quarterly reviews keep it honest. Adjustments are small, boring and extremely effective — which is the whole point.",
  },
];

export type Treatment = {
  slug: string;
  name: string;
  category: "Diagnostics" | "Protocols" | "Aesthetics" | "Recovery";
  duration: string;
  price: string;
  summary: string;
  detail: string;
  image: string;
  includes: string[];
};

export const treatments: Treatment[] = [
  {
    slug: "longevity-diagnostic",
    name: "The Longevity Diagnostic",
    category: "Diagnostics",
    duration: "90 min",
    price: "from CHF 480",
    summary: "The full baseline. Everything we measure, explained by the person who measured it.",
    detail:
      "Most clinics hand you a PDF and send you away. We sit you down in a room with the physician who ran your panel and walk through every number — what it means, what it is sensitive to, what is genuinely worth acting on, and what is noise you should ignore. You leave with a written summary and a plan.",
    image: "/images/consult-clinic.jpg",
    includes: [
      "90 minutes with a resident physician",
      "42-marker blood panel",
      "DEXA body composition scan",
      "Continuous glucose 14-day profile",
      "Written findings, reviewed together",
    ],
  },
  {
    slug: "biological-age-mapping",
    name: "Biological Age Mapping",
    category: "Diagnostics",
    duration: "45 min",
    price: "CHF 320",
    summary: "Your chronological age is a receipt. This is the invoice.",
    detail:
      "Three independent methods — epigenetic clocks,glycation and inflammatory load — give you a spread rather than a single flattering number. That spread is the interesting part: it shows where you are ageing unevenly, which is usually where the leverage is.",
    image: "/images/doctor-report.jpg",
    includes: [
      "Epigenetic age clock",
      "Advanced glycation end-product scan",
      "hs-CRP and cytokine panel",
      "Age-gap visualisation across systems",
    ],
  },
  {
    slug: "precision-iv",
    name: "Precision IV Therapy",
    category: "Protocols",
    duration: "60 min",
    price: "from CHF 340",
    summary: "Dose and deliver: infusions formulated against your own panel, not a menu.",
    detail:
      "Every drip is built the morning of your appointment from your bloods. Magnesium, glycine and taurine for sleep; NAD+ precursors for cellular repair; vitamin C and glutathione for a post-flight reset. Dripped over an hour in a private room, which most guests use to sleep.",
    image: "/images/aromatherapy.jpg",
    includes: [
      "Formulated from your same-day panel",
      "Drip rate titrated by your nurse",
      "Pre- and post-infusion vitals",
      "Private room, dimmed, temperature controlled",
    ],
  },
  {
    slug: "cellular-regeneration",
    name: "The Cellular Regeneration Protocol",
    category: "Protocols",
    duration: "12 weeks",
    price: "from CHF 9,400",
    summary: "A structured twelve-week course built around NAD+ precursor cycling.",
    detail:
      "The flagship. Twelve weeks of graduated NAD+ precursor dosing, capped by anti-inflammatory nutrition, a rewritten sleep architecture and twice-weekly thermal conditioning. Designed for people whose work is cognitively expensive and whose calendar is worse.",
    image: "/images/hammam-ambiance.jpg",
    includes: [
      "Twelve physician reviews",
      "NAD+ precursor cycling protocol",
      "Personal nutrition plan and kitchen access",
      "Sleep architecture rebuild",
      "Thermal conditioning, four times weekly",
    ],
  },
  {
    slug: "medical-aesthetics",
    name: "Medical Aesthetics",
    category: "Aesthetics",
    duration: "60 min",
    price: "from CHF 590",
    summary: "Subtle, conservative, and refusable. We will talk you out of things.",
    detail:
      "Consulting injectables, skin-fibre work and laser resurfacing delivered by clinicians, not commission-driven sales staff. Roughly a third of consultations end with us recommending nothing. That is a reasonable position to take when your reputation outlives the procedure.",
    image: "/images/serum-face.jpg",
    includes: [
      "Clinician-led consultation",
      "Treatment plan with conservative dosing",
      "Topical protocol and aftercare",
      "Fourteen-day review as standard",
    ],
  },
  {
    slug: "sleep-reset",
    name: "Sleep & Circadian Reset",
    category: "Recovery",
    duration: "5 days",
    price: "CHF 3,200",
    summary: "Five nights of supervised sleep work. Most guests arrive with a 14-hour bill waiting for them.",
    detail:
      "Light, temperature, meal timing and stimulus control, supervised. We map your sleep architecture on night one, then rebuild it around it. Disappointing guests leave having slept seven hours for the first time in a decade.",
    image: "/images/meditation.jpg",
    includes: [
      "Five nights in a blackout suite",
      "Clinical polysomnography, nights one and five",
      "Circadian and stimulus-control coaching",
      "Light therapy and temperature protocol",
    ],
  },
  {
    slug: "thermal-circuit",
    name: "The Thermal Circuit",
    category: "Recovery",
    duration: "3 hrs",
    price: "CHF 180",
    summary: "Hammam, sauna, plunge, rest. Two hundred years old and still the best idea in recovery.",
    detail:
      "The circuit runs in the order it has run for two centuries: heat, hold, cold, silence. Our marble hammam is the only one in New Delhi on private booking, and the plunge is fed by glacier melt. Guests book it nightly and then cancel everything else to stay longer.",
    image: "/images/sauna-wood.jpg",
    includes: [
      "Private marble hammam, 60 minutes",
      "Cedar sauna and cold plunge",
      "Mineral tea service in the rest gallery",
      "Optional in-suite massage",
    ],
  },
  {
    slug: "clinical-nutrition",
    name: "Clinical Nutrition",
    category: "Protocols",
    duration: "8 weeks",
    price: "CHF 2,600",
    summary: "A kitchen that is also a clinic. Three meals a day, built to your metabolic profile.",
    detail:
      "You do not get a PDF of recipes. You get eight weeks of food prepared by a clinical kitchen, matched to your glucose response, your allergies and your actual week — travel weeks included. We cook for the life you have, not the one in the brochure.",
    image: "/images/salads.jpg",
    includes: [
      "Continuous glucose monitoring for 28 days",
      "Three meals daily from the clinical kitchen",
      "Reactive-vs-culinary carbohydrate mapping",
      "Take-home recipes built around your results",
    ],
  },
  {
    slug: "physiotherapy",
    name: "Physiotherapy & Movement",
    category: "Recovery",
    duration: "50 min",
    price: "CHF 240",
    summary: "For the desk, the knee and the post-surgery shoulder.",
    detail:
      "Hands-on treatment and a progressive loading programme from our sports physiotherapists. Available to retreat guests daily, and to the public by appointment. The most requested service at Aurelia for four years running.",
    image: "/images/treatment-room.jpg",
    includes: [
      "Manual therapy and soft-tissue work",
      "Progressive loading programme",
      "Movement screening and gait analysis",
      "Direct line to your physician if needed",
    ],
  },
];

export const featuredTreatments = treatments.slice(0, 6);

export const suites = [
  {
    name: "The Cedar Suite",
    detail: "42 m², west-facing balcony over the vineyard. Queen bed, deep soaking tub, writing desk that faces the window.",
    sleeps: "2 guests",
    rate: "CHF 890 / night",
    image: "/images/hotel-room-elegant.jpg",
  },
  {
    name: "The Alpine Suite",
    detail: "58 m², corner unit with a double aspect and a private sauna door. The room most guests upgrade to.",
    sleeps: "2 guests",
    rate: "CHF 1,340 / night",
    image: "/images/bath-sunny.jpg",
  },
  {
    name: "The Garden Pavilion",
    detail: "A standalone studio in the walled garden. No corridor, no foot traffic, one very old olive tree.",
    sleeps: "1 guest",
    rate: "CHF 1,080 / night",
    image: "/images/bath-tropical.jpg",
  },
  {
    name: "The Residence",
    detail: "A two-bedroom apartment for stays of a month or more. Full kitchen, laundry, a door that locks.",
    sleeps: "4 guests",
    rate: "CHF 3,600 / month",
    image: "/images/lobby-plants.jpg",
  },
];

export const programmes = [
  {
    name: "The Half-Day Reset",
    duration: "5 hours",
    price: "CHF 620",
    summary: "Diagnostics, thermal circuit, massage, and lunch from the clinical kitchen. Leaves at six feeling measurably different.",
    includes: ["Longevity diagnostic", "Thermal circuit", "60-minute massage", "Clinical kitchen lunch"],
  },
  {
    name: "The Five-Day Restore",
    duration: "5 days / 4 nights",
    price: "CHF 7,900",
    summary: "The most-booked programme. Full diagnostic work, the sleep reset, nutrition programme and unlimited thermal access.",
    includes: ["Everything in the Half-Day Reset", "Sleep & Circadian Reset", "Clinical Nutrition, week one", "Unlimited thermal circuit"],
  },
  {
    name: "The Executive Week",
    duration: "7 days / 6 nights",
    price: "CHF 14,600",
    summary: "Built around a demanding calendar. Diagnostics on arrival, the Cellular Regeneration Protocol, and everything else fitted between meetings.",
    includes: ["Full Cellular Regeneration Protocol", "Personal physician on call", "Two executive briefing lunches", "Transfers from the airport"],
  },
];

export const team = [
  {
    name: "Dr. Elin Marchetti",
    role: "Medical Director, Founder",
    bio: "Trained in New Delhi and London, eleven years in sports medicine before founding Aurelia in 2014. Writes the protocols; reviews every clinical note personally.",
    image: "/images/doctor-senior.jpg",
  },
  {
    name: "Dr. Idris Kaya",
    role: "Head of Diagnostics",
    bio: "Runs the imaging and biomarker lab. Responsible for the decision to throw away ninety per cent of the tests we used to order.",
    image: "/images/consult-clinic.jpg",
  },
  {
    name: "Sofia Renard",
    role: "Director of Nutrition",
    bio: "Chef before she was a clinician. Builds the clinical kitchen menu around glucose response and cooks it like it should taste.",
    image: "/images/salads.jpg",
  },
  {
    name: "Jonas Weill",
    role: "Head of Recovery",
    bio: "Has personally supervised more thermal circuits than anyone in New Delhi. Believes the rest gallery is the real medicine.",
    image: "/images/sauna-wood.jpg",
  },
];

export const timeline = [
  { year: "2014", text: "Aurelia opens as a four-room practice in New Delhi with two physicians and a borrowed sauna." },
  { year: "2017", text: "The hillside building is acquired and the marble hammam — the city's only private one — is installed." },
  { year: "2019", text: "The clinical kitchen opens. Nutrition becomes part of the protocol rather than an afterthought." },
  { year: "2022", text: "Biological Age Mapping launches after four years of internal validation." },
  { year: "2025", text: "Ninety-four per cent of guests renew. The waiting list for the Executive Week is six months long." },
];

export const values = [
  {
    title: "Measurement before opinion",
    body: "We do not treat what we have not measured. Every recommendation traces back to a number taken from your own body.",
  },
  {
    title: "Less, and for longer",
    body: "The most effective intervention in this building is usually the one we talk you out of. Protocols here are short by design.",
  },
  {
    title: "Clinical, then comfortable",
    body: "Evidence sets the plan. The room, the light and the food are what make you actually complete it.",
  },
  {
    title: "A clinician, not a seller",
    body: "No commission structure exists on this floor. We would rather lose the sale than sell you a treatment you do not need.",
  },
];

export const testimonials = [
  {
    quote:
      "I came in expecting a spa and left with a diagnosis. The difference in how seriously they took the numbers changed how I think about my own health. I have renewed three times.",
    name: "Henrik Bauer",
    role: "Managing Partner, Basel",
  },
  {
    quote:
      "They talked me out of a second treatment I had already paid for. That is the single reason my company sends every executive here.",
    name: "Amara Osei",
    role: "Chief of Staff, New Delhi",
  },
  {
    quote:
      "Five days. I slept seven hours on the fourth night and cried about it. I did not know that was still available to me.",
    name: "Daniel Roth",
    role: "Founder, Winterthur",
  },
];

export const faqs = [
  {
    q: "Do I need a referral from a physician?",
    a: "No. Roughly half our guests arrive with a referral and half do not. If you do have one we read it before your consultation and never repeat a test we can see.",
  },
  {
    q: "Is this covered by insurance?",
    a: "Diagnostics and medical treatments are billed through your insurer where the policy allows. The thermal circuit, nutrition programme and residential suites are self-funded. Our billing team handles the submission; you will get one document, not six.",
  },
  {
    q: "How long until I notice something?",
    a: "Sleep and energy move in two to four weeks. Measurable biological-age movement takes a minimum of twelve weeks, which is why the flagship protocol is twelve weeks rather than three.",
  },
  {
    q: "What if you conclude I need nothing?",
    a: "Then we charge you for the diagnostic and send you home. It happens roughly one consultation in eight. We would rather be your physician for twenty years than sell you one bad afternoon.",
  },
  {
    q: "Can I bring my spouse or team?",
    a: "Yes. The Executive Week is built for it, and the Garden Pavilion and Residence hold small groups comfortably. Group bookings for eight or more are arranged directly with the concierge.",
  },
  {
    q: "How private is this?",
    a: "Guest records are held under professional medical confidentiality duties and are never shared. We do not sell data, do not appear in marketing material without written consent, and do not run a patient community.",
  },
];

export const galleryImages = [
  { src: "/images/hero-hammam.jpg", caption: "The marble hammam, private booking" },
  { src: "/images/indoor-pool.jpg", caption: "The thermal pool, 06:00 — 22:00" },
  { src: "/images/minimal-marble-wood.jpg", caption: "The east wing, rebuilt 2021" },
  { src: "/images/massage-therapy.jpg", caption: "Recovery suite two" },
  { src: "/images/facial-spa.jpg", caption: "Aesthetics, second floor" },
  { src: "/images/ceiling-curve.jpg", caption: "Circulation, main atrium" },
  { src: "/images/pool-loungers.jpg", caption: "South terrace, summer" },
  { src: "/images/sauna-wood.jpg", caption: "Cedar sauna, third floor" },
  { src: "/images/herbal-tea.jpg", caption: "The apothecary bar" },
  { src: "/images/hammam-ambiance.jpg", caption: "Hammam, evening light" },
  { src: "/images/staircase-facade.jpg", caption: "The hillside approach" },
  { src: "/images/tea-closeup.jpg", caption: "Herbal infusions, included" },
  { src: "/images/robe-towel.jpg", caption: "Guest preparation" },
  { src: "/images/doctor-report.jpg", caption: "Findings review, room 4" },
  { src: "/images/meditation.jpg", caption: "Movement studio, dawn class" },
  { src: "/images/clean-skin.jpg", caption: "Post-treatment, week two" },
];