/**
 * STONESIDE LIVE DATA
 * * HOW TO PUBLISH CHANGES:
 * 1. Go to your Admin Dashboard (admin.html) and make your edits.
 * 2. Click the "Export All Data" button.
 * 3. Open this file (js/data.js).
 * 4. Paste the exported text inside the brackets below.
 * 5. Save and Upload this file to your host.
 */

window.STONESIDE_DATA = {
  // ════════════════════════════════════════════════════════════════
  // PASTE YOUR EXPORT DATA HERE
  // ════════════════════════════════════════════════════════════════

  hero: {
    title1Word1: "Where",
    title1Word2: "Blueprints",
    title2Word1: "Become",
    title2Word2: "Legacy",
    subtitle: "Forty-five years of building homes families never want to leave.",
    location: "Bryan–College Station, Texas",
    years: "45 Years",
    stat1Value: "45",
    stat1Label: "Years of Excellence",
    stat2Value: "∞",
    stat2Label: "Patience",
    stat3Value: "1",
    stat3Label: "Promise"
  },

  content: {
    legacyTitle: "Forty-Five Years of *Unwavering Excellence*",
    legacyLead: "While other builders chase volume, we've spent forty-five years perfecting one thing: building homes that families hand down for generations.",
    philosophyTitle: "Building Is *Stewardship*",
    philosophyLead: "Your home is where first steps happen. Where holidays stack into decades of memory. Where legacy is built, quietly, room by room.",
    portfolioTitle: "Homes That *Tell Stories*",
    portfolioLead: "Each project tells its own story. Explore our recent builds and see the quality that keeps families coming back.",
    processTitle: "The *Experience* of Building with Stoneside",
    contactTitle: "Let's Build *Something* That Lasts",
    contactLead: "Tell us what you're envisioning. We'll schedule a no-pressure call to talk budget, timeline, and fit — usually within 24 hours."
  },

  contact: {
    location: "Bryan–College Station, TX",
    phone: "(979) 398-7313",
    email: "sales@stonesidehomes.com",
    response: "Within 24 Hours"
  },

  timeline: [
    { year: "1981", title: "The Foundation", text: "Before the company, there was the craft. Started swinging hammers and learning the trade under seasoned builders — absorbing every lesson the hard way." },
    { year: "1997", title: "Going Independent", text: "After sixteen years of learning what to do (and what never to do), the decision was made: build homes the right way, on our own terms. No shortcuts. No compromises." },
    { year: "2000", title: "Homes at Scale", text: "Became the go-to builder for aging-in-place homes — 60 custom builds a year for buyers who knew exactly what they wanted and wouldn't settle for less." },
    { year: "2022", title: "Stoneside Is Born", text: "Four decades of expertise distilled into a new brand. Stoneside Custom Homes launched with one mission: build fewer homes, build them better, and make every client feel like the only one." },
    { year: String(new Date().getFullYear()), title: (new Date().getFullYear() - 1981) + " Years Strong", text: (new Date().getFullYear() - 1981) + " years in the business. Still family-owned. Still answering our own phone. Still building homes that families never want to leave." }
  ],

  pillars: [
    { num: "I", title: "Clarity Before Commitment", text: "You'll know every cost, every material, every timeline milestone — before we break ground." },
    { num: "II", title: "Peace During the Build", text: "Weekly updates. Clean job sites. Zero surprises. Your project manager is one call away." },
    { num: "III", title: "Accountability After Keys", text: "Our relationship doesn't end at closing. We stand behind every home, every year. Period." }
  ],

  process: [
    { num: "01", title: "Discovery", subtitle: "3–4 weeks · 1–2 meetings per week", text: "Most builders hand you a catalog. We sit down. We listen. Over several weeks of one-on-one sessions, we uncover every detail of the home you've been picturing for years — how you wake up, where the light falls, what the holidays look like. This is the step no one else takes.", icon: "plus" },
    { num: "02", title: "Design & Architecture", subtitle: "Plans · Elevations · Revisions", text: "Your vision becomes a blueprint. We develop floor plans, elevations, and architectural drawings — then refine them together until every room, every angle, every window placement is exactly right. No rushing. No settling.", icon: "grid" },
    { num: "03", title: "Transparent Numbers", subtitle: "Cost Estimates · Allowances · Contract", text: "Before a single shovel hits dirt, you'll see every cost, every allowance, every line item. We lock in a fixed-price contract — no hidden fees, no surprises six months in. You'll know exactly what you're building and exactly what it costs.", icon: "arrow" },
    { num: "04", title: "Selections", subtitle: "Every Finish, Every Detail", text: "Countertops, cabinetry, fixtures, flooring — this is where your home becomes yours. We guide you through every choice with the patience of experience, so nothing gets overlooked and nothing feels rushed.", icon: "home" },
    { num: "05", title: "The Build", subtitle: "Weekly Updates · Clean Sites", text: "Construction starts — and you're never left wondering. Weekly photo updates, a dedicated project manager who actually answers the phone, and job sites clean enough to walk through. This is what accountability looks like.", icon: "check" },
    { num: "06", title: "Walkthroughs & Keys", subtitle: "4 Scheduled Walk-Throughs", text: "You'll walk your home at four key milestones: pre-insulation, cabinet and trim, full orientation, and the final walk. By the time we hand you the keys, there are no surprises — just the home you designed, built exactly as promised.", icon: "key" }
  ],

  testimonials: [
    { quote: "The difference was communication and care. We always knew what was happening, and the craftsmanship speaks for itself.", name: "The Martinez Family", detail: "Custom Build, College Station • 2023" },
    { quote: "No games, no surprises. Clear plans, honest numbers, and a builder who stood behind the details.", name: "The Thompson Family", detail: "Custom Build, Bryan • 2022" }
  ],

  // ════════════════════════════════════════════════════════════════
  // MODEL SHOWCASES — floor plan models with multiple builds
  // ════════════════════════════════════════════════════════════════
  models: [
    {
      slug: "brandon",
      name: "The Brandon",
      sqft: "1,625",
      beds: "4",
      baths: "2",
      garage: "2 Car",
      tagline: "Clean lines, modern farmhouse charm"
    },
    {
      slug: "bayley",
      name: "The Bayley",
      sqft: "1,749",
      beds: "3",
      baths: "2",
      garage: "2 Car",
      tagline: "Charm and efficiency in a compact footprint"
    },
    {
      slug: "dustin",
      name: "The Dustin",
      sqft: "1,710",
      beds: "3",
      baths: "2",
      garage: "2 Car",
      tagline: "Generous living spaces, clean finishes"
    },
    {
      slug: "caylen",
      name: "The Caylen",
      sqft: "1,781",
      beds: "3",
      baths: "2",
      garage: "2 Car",
      tagline: "Striking exterior, open living"
    },
    {
      slug: "custom-hampton",
      name: "The Hampton",
      sqft: "2,555",
      beds: "3",
      baths: "2.5",
      garage: "3 Car · 1,229 sq ft",
      tagline: "A fully custom build tailored to the family"
    }
  ],

  projects: [
    {
      id: 5,
      title: "The Caylen",
      model: "caylen",
      type: "spec",
      location: "Grand Lake · Snook, Texas",
      sqft: "1,781",
      beds: "3",
      baths: "2",
      garage: "2 Car",
      year: "2025",
      photo: "assets/images/projects/caylen-436/caylen-exterior-main.jpg",
      sketch: "assets/images/projects/caylen-436/caylen-interior-main.jpg",
      description: "The Caylen model features a striking stone-and-siding exterior with a covered entry. Inside, you'll find an open floor plan with clean transitions, quality cabinetry, and a layout built for daily life.",
      verseText: "As for me and my house, we will serve the Lord.",
      verseRef: "Joshua 24:15",
      gallery: [
        { src: "assets/images/projects/caylen-436/caylen-exterior-main.jpg", label: "Front Exterior" },
        { src: "assets/images/projects/caylen-436/caylen-entry.jpg", label: "Entry" },
        { src: "assets/images/projects/caylen-436/caylen-interior-main.jpg", label: "Living Area" },
        { src: "assets/images/projects/caylen-436/caylen-great-room.jpg", label: "Great Room" },
        { src: "assets/images/projects/caylen-436/caylen-kitchen-1.jpg", label: "Kitchen" },
        { src: "assets/images/projects/caylen-436/caylen-kitchen-2.jpg", label: "Kitchen Detail" },
        { src: "assets/images/projects/caylen-436/caylen-dining.jpg", label: "Dining" },
        { src: "assets/images/projects/caylen-436/caylen-master-bedroom.jpg", label: "Master Bedroom" },
        { src: "assets/images/projects/caylen-436/caylen-master-bath.jpg", label: "Master Bath" },
        { src: "assets/images/projects/caylen-436/caylen-master-shower.jpg", label: "Master Shower" },
        { src: "assets/images/projects/caylen-436/caylen-master-closet.jpg", label: "Master Closet" },
        { src: "assets/images/projects/caylen-436/caylen-bedroom-2.jpg", label: "Bedroom 2" },
        { src: "assets/images/projects/caylen-436/caylen-bedroom-3.jpg", label: "Bedroom 3" },
        { src: "assets/images/projects/caylen-436/caylen-guest-bath.jpg", label: "Guest Bath" },
        { src: "assets/images/projects/caylen-436/caylen-exterior-back.jpg", label: "Back Exterior" },
        { src: "assets/images/projects/caylen-436/caylen-exterior-patio.jpg", label: "Patio" }
      ]
    },
    {
      id: 1,
      title: "The Brandon",
      model: "brandon",
      type: "spec",
      location: "Grand Lake · Snook, Texas",
      sqft: "1,625",
      beds: "4",
      baths: "2",
      garage: "2 Car",
      year: "2025",
      photo: "assets/images/projects/brandon-569/brandon-exterior-main.jpg",
      sketch: "assets/images/projects/brandon-569/brandon-interior-main.jpg",
      description: "The Brandon model features a clean, modern farmhouse exterior with an open-concept interior. White cabinetry, granite counters, and dark hardwood floors create a crisp, timeless finish throughout.",
      verseText: "By wisdom a house is built, and through understanding it is established.",
      verseRef: "Proverbs 24:3",
      gallery: [
        { src: "assets/images/projects/brandon-569/brandon-exterior-main.jpg", label: "Front Exterior" },
        { src: "assets/images/projects/brandon-569/brandon-entry.jpg", label: "Entry" },
        { src: "assets/images/projects/brandon-569/brandon-interior-main.jpg", label: "Living Area" },
        { src: "assets/images/projects/brandon-569/brandon-kitchen.jpg", label: "Kitchen" },
        { src: "assets/images/projects/brandon-569/brandon-master-bedroom.jpg", label: "Master Bedroom" },
        { src: "assets/images/projects/brandon-569/brandon-master.jpg", label: "Master Suite" },
        { src: "assets/images/projects/brandon-569/brandon-master-bath.jpg", label: "Master Bath" },
        { src: "assets/images/projects/brandon-569/brandon-master-closet.jpg", label: "Master Closet" },
        { src: "assets/images/projects/brandon-569/brandon-bedroom-2.jpg", label: "Bedroom 2" },
        { src: "assets/images/projects/brandon-569/brandon-bedroom-3.jpg", label: "Bedroom 3" },
        { src: "assets/images/projects/brandon-569/brandon-bedroom-4.jpg", label: "Bedroom 4" },
        { src: "assets/images/projects/brandon-569/brandon-guest-bath.jpg", label: "Guest Bath" },
        { src: "assets/images/projects/brandon-569/brandon-utility.jpg", label: "Utility Room" },
        { src: "assets/images/projects/brandon-569/brandon-exterior-back.jpg", label: "Back Exterior" },
        { src: "assets/images/projects/brandon-569/brandon-exterior-back-patio.jpg", label: "Back Patio" }
      ]
    },
    {
      id: 2,
      title: "The Bayley",
      model: "bayley",
      type: "spec",
      location: "Grand Lake · Snook, Texas",
      sqft: "1,749",
      beds: "3",
      baths: "2",
      garage: "2 Car",
      year: "2025",
      photo: "assets/images/projects/bayley-581/bayley-exterior-main.jpg",
      sketch: "assets/images/projects/bayley-581/bayley-interior-main.jpg",
      description: "The Bayley model delivers charm and efficiency in a compact footprint. Warm wood floors, a bright open kitchen, and thoughtful storage make this home feel larger than its square footage suggests.",
      verseText: "Unless the Lord builds the house, the builders labor in vain.",
      verseRef: "Psalm 127:1",
      gallery: [
        { src: "assets/images/projects/bayley-581/bayley-exterior-main.jpg", label: "Front Exterior" },
        { src: "assets/images/projects/bayley-581/bayley-interior-main.jpg", label: "Living Area" },
        { src: "assets/images/projects/bayley-581/bayley-kitchen-1.jpg", label: "Kitchen" },
        { src: "assets/images/projects/bayley-581/bayley-kitchen-2.jpg", label: "Kitchen Detail" },
        { src: "assets/images/projects/bayley-581/bayley-kitchen-3.jpg", label: "Kitchen View" },
        { src: "assets/images/projects/bayley-581/bayley-master-bath.jpg", label: "Master Bath" },
        { src: "assets/images/projects/bayley-581/bayley-master-closet.jpg", label: "Master Closet" },
        { src: "assets/images/projects/bayley-581/bayley-master-shower.jpg", label: "Master Shower" },
        { src: "assets/images/projects/bayley-581/bayley-guest-bath.jpg", label: "Guest Bath" }
      ]
    },
    {
      id: 3,
      title: "The Dustin",
      model: "dustin",
      type: "spec",
      location: "Grand Lake · Snook, Texas",
      sqft: "1,710",
      beds: "3",
      baths: "2",
      garage: "2 Car",
      year: "2025",
      photo: "assets/images/projects/dustin-557/dustin-557-exterior-main.jpg",
      sketch: "assets/images/projects/dustin-557/dustin-557-interior-main.jpg",
      description: "The Dustin model at Harvest Lake features generous living spaces, clean finishes, and a layout designed for growing families. Situated on a corner lot with views of the community pond.",
      verseText: "Commit your work to the Lord, and your plans will be established.",
      verseRef: "Proverbs 16:3",
      gallery: [
        { src: "assets/images/projects/dustin-557/dustin-557-exterior-main.jpg", label: "Front Exterior" },
        { src: "assets/images/projects/dustin-557/dustin-557-entry.jpg", label: "Entry" },
        { src: "assets/images/projects/dustin-557/dustin-557-interior-main.jpg", label: "Living Area" },
        { src: "assets/images/projects/dustin-557/dustin-557-great-room.jpg", label: "Great Room" },
        { src: "assets/images/projects/dustin-557/dustin-557-living-1.jpg", label: "Living Room" },
        { src: "assets/images/projects/dustin-557/dustin-557-kitchen-1.jpg", label: "Kitchen" },
        { src: "assets/images/projects/dustin-557/dustin-557-kitchen-3.jpg", label: "Kitchen Detail" },
        { src: "assets/images/projects/dustin-557/dustin-557-dining.jpg", label: "Dining" },
        { src: "assets/images/projects/dustin-557/dustin-557-master-bedroom.jpg", label: "Master Bedroom" },
        { src: "assets/images/projects/dustin-557/dustin-557-master-bath.jpg", label: "Master Bath" },
        { src: "assets/images/projects/dustin-557/dustin-557-master-closet.jpg", label: "Master Closet" },
        { src: "assets/images/projects/dustin-557/dustin-557-bedroom-2.jpg", label: "Bedroom 2" },
        { src: "assets/images/projects/dustin-557/dustin-557-bedroom-3.jpg", label: "Bedroom 3" },
        { src: "assets/images/projects/dustin-557/dustin-557-guest-bath.jpg", label: "Guest Bath" },
        { src: "assets/images/projects/dustin-557/dustin-557-mudroom.jpg", label: "Mudroom" },
        { src: "assets/images/projects/dustin-557/dustin-557-utility.jpg", label: "Utility Room" },
        { src: "assets/images/projects/dustin-557/dustin-557-exterior-back.jpg", label: "Back Exterior" },
        { src: "assets/images/projects/dustin-557/dustin-557-exterior-patio.jpg", label: "Patio" }
      ]
    },
    {
      id: 4,
      title: "The Dustin",
      model: "dustin",
      type: "spec",
      location: "Grand Lake · Snook, Texas",
      sqft: "1,710",
      beds: "3",
      baths: "2",
      garage: "2 Car",
      year: "2025",
      photo: "assets/images/projects/dustin-545/dustin-545-interior-main.jpg",
      sketch: "assets/images/projects/dustin-545/dustin-545-entry-1.jpg",
      description: "Another Dustin model build on Harvest Lake Drive — same trusted floor plan with unique lot positioning and finish selections. Dark countertops and warm cabinetry give this one its own character.",
      verseText: "Let all that you do be done in love.",
      verseRef: "1 Corinthians 16:14",
      gallery: [
        { src: "assets/images/projects/dustin-545/dustin-545-entry-1.jpg", label: "Entry" },
        { src: "assets/images/projects/dustin-545/dustin-545-entry-2.jpg", label: "Entry Detail" },
        { src: "assets/images/projects/dustin-545/dustin-545-interior-main.jpg", label: "Living Area" },
        { src: "assets/images/projects/dustin-545/dustin-545-kitchen-1.jpg", label: "Kitchen" },
        { src: "assets/images/projects/dustin-545/dustin-545-kitchen-2.jpg", label: "Kitchen Detail" },
        { src: "assets/images/projects/dustin-545/dustin-545-master-bath.jpg", label: "Master Bath" },
        { src: "assets/images/projects/dustin-545/dustin-545-master-closet.jpg", label: "Master Closet" },
        { src: "assets/images/projects/dustin-545/dustin-545-master-shower.jpg", label: "Master Shower" },
        { src: "assets/images/projects/dustin-545/dustin-545-master-tub.jpg", label: "Master Tub" },
        { src: "assets/images/projects/dustin-545/dustin-545-guest-bath.jpg", label: "Guest Bath" }
      ]
    },
    {
      id: 6,
      title: "The Dustin",
      model: "dustin",
      type: "spec",
      location: "Grand Lake · Snook, Texas",
      sqft: "1,710",
      beds: "3",
      baths: "2",
      garage: "2 Car",
      year: "2025",
      photo: "assets/images/projects/dustin-424/dustin-424-exterior-main.jpg",
      sketch: "assets/images/projects/dustin-424/dustin-424-interior-main.jpg",
      description: "Another Dustin model build bringing the same disciplined floor plan to a new lot. Modern gray exterior, covered porch, and an interior with clean lines and durable finishes throughout.",
      verseText: "Whatever you do, work at it with all your heart.",
      verseRef: "Colossians 3:23",
      gallery: [
        { src: "assets/images/projects/dustin-424/dustin-424-exterior-main.jpg", label: "Front Exterior" },
        { src: "assets/images/projects/dustin-424/dustin-424-entry.jpg", label: "Entry" },
        { src: "assets/images/projects/dustin-424/dustin-424-interior-main.jpg", label: "Living Area" },
        { src: "assets/images/projects/dustin-424/dustin-424-living-1.jpg", label: "Living Room" },
        { src: "assets/images/projects/dustin-424/dustin-424-living-2.jpg", label: "Living Detail" },
        { src: "assets/images/projects/dustin-424/dustin-424-kitchen-1.jpg", label: "Kitchen" },
        { src: "assets/images/projects/dustin-424/dustin-424-ktichen-2.jpg", label: "Kitchen Detail" },
        { src: "assets/images/projects/dustin-424/dustin-424-kitchen-3.jpg", label: "Kitchen View" },
        { src: "assets/images/projects/dustin-424/dustin-424-dining.jpg", label: "Dining" },
        { src: "assets/images/projects/dustin-424/dustin-424-master-bedroom.jpg", label: "Master Bedroom" },
        { src: "assets/images/projects/dustin-424/dustin-424-master-bath-1.jpg", label: "Master Bath" },
        { src: "assets/images/projects/dustin-424/dustin-424-master-bath-2.jpg", label: "Master Bath Detail" },
        { src: "assets/images/projects/dustin-424/dustin-424-master-tub.jpg", label: "Master Tub" },
        { src: "assets/images/projects/dustin-424/dustin-424-master-closet.jpg", label: "Master Closet" },
        { src: "assets/images/projects/dustin-424/dustin-424-bedroom-2.jpg", label: "Bedroom 2" },
        { src: "assets/images/projects/dustin-424/dustin-424-bedroom-3.jpg", label: "Bedroom 3" },
        { src: "assets/images/projects/dustin-424/dustin-424-guest-bath.jpg", label: "Guest Bath" },
        { src: "assets/images/projects/dustin-424/dustin-424-mudroom.jpg", label: "Mudroom" },
        { src: "assets/images/projects/dustin-424/dustin-424-utility.jpg", label: "Utility Room" },
        { src: "assets/images/projects/dustin-424/dustin-424-exterior-back.jpg", label: "Back Exterior" },
        { src: "assets/images/projects/dustin-424/dustin-424-exterior-patio.jpg", label: "Patio" }
      ]
    },
    {
      id: 7,
      title: "The Hampton",
      model: "custom-hampton",
      type: "custom",
      location: "Iola, Texas",
      sqft: "2,555",
      beds: "3",
      baths: "2.5",
      garage: "3 Car · 1,229 sq ft",
      year: "2024",
      porches: "852 sq ft total",
      fireplaces: "2 Fireplaces",
      outdoorKitchen: true,
      photo: "assets/images/projects/custom-hampton/custom-hampton-exterior-main.jpg",
      sketch: "assets/images/projects/custom-hampton/custom-hampton-interior-main.jpg",
      description: "The Hampton is 2,555 square feet of fully custom living on a sprawling Iola lot. Three bedrooms, two and a half baths, a three-car garage, dual fireplaces, an outdoor kitchen, and over 850 square feet of covered porches — front and back. Every detail was tailored to this family's vision of forever.",
      verseText: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you.",
      verseRef: "Jeremiah 29:11",
      gallery: [
        { src: "assets/images/projects/custom-hampton/custom-hampton-exterior-main.jpg", label: "Front Exterior" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-interior-main.jpg", label: "Living Area" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-great-room.jpg", label: "Great Room" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-living-1.jpg", label: "Living Room" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-living-2.jpg", label: "Living Detail" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-kitchen-1.jpg", label: "Kitchen" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-kitchen-2.jpg", label: "Kitchen Detail" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-kitchen-3.jpg", label: "Kitchen View" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-dining.jpg", label: "Dining Room" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-pantry.jpg", label: "Pantry" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-master-1.jpg", label: "Master Bedroom" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-master-2.jpg", label: "Master Suite" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-master-bath.jpg", label: "Master Bath" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-master-shower.jpg", label: "Master Shower" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-master-closet-1.jpg", label: "Master Closet" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-master-closet-2.jpg", label: "Walk-In Closet" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-bedroom-2.jpg", label: "Bedroom 2" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-bedroom-3.jpg", label: "Bedroom 3" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-guest-bath.jpg", label: "Guest Bath" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-half-bath.jpg", label: "Half Bath" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-mudroom.jpg", label: "Mudroom" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-utility.jpg", label: "Utility Room" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-garage.jpg", label: "Garage" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-back-patio.jpg", label: "Back Patio" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-outdoor-kitchen.jpg", label: "Outdoor Kitchen" },
        { src: "assets/images/projects/custom-hampton/custom-hampton-patio-fireplace.jpg", label: "Patio Fireplace" }
      ]
    }
  ]
};
