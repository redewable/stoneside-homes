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
    subtitle: "Custom homes built with the patience of experience, the discipline of tradition, and the care of a family name.",
    location: "Bryan–College Station, Texas",
    years: "40 Years",
    stat1Value: "40",
    stat1Label: "Years of Excellence",
    stat2Value: "∞",
    stat2Label: "Patience",
    stat3Value: "1",
    stat3Label: "Promise"
  },
  
  content: {
    legacyTitle: "Four Decades of *Unwavering Excellence*",
    legacyLead: "In 1984, when most builders chased volume, we chose a different path—one measured not in units built, but in families served with excellence.",
    philosophyTitle: "Building Is *Stewardship*",
    philosophyLead: "A home is where your children will take their first steps. Where holidays will gather decades of memories. Where legacy is quietly built.",
    portfolioTitle: "Homes That *Tell Stories*",
    portfolioLead: "Every home begins as a drawing. What matters is what it becomes—a vessel for your family's story.",
    processTitle: "From First *Conversation* to Forever Home",
    contactTitle: "Let's Build *Something* That Lasts",
    contactLead: "A short note is enough to begin. We'll schedule a call to discuss your vision, timeline, and whether we're the right fit."
  },

  contact: {
    location: "Bryan–College Station, TX",
    phone: "(979) 555-1984",
    email: "build@stonesidehomes.com",
    response: "Within 24 Hours"
  },

  timeline: [
    { year: "1984", title: "The Beginning", text: "Founded in Bryan–College Station with a simple promise: build homes as if our name depended on it." },
    { year: "1994", title: "First Decade", text: "A decade of learning the land, understanding families, and refining our craft." },
    { year: "2004", title: "Deep Roots", text: "Twenty years of building relationships as strong as our foundations." },
    { year: "2014", title: "Generational", text: "Three decades of families trusting their dreams to our hands." },
    { year: "2024", title: "Four Decades Strong", text: "Forty years of keeping one promise: every home built with the patience and care it deserves." }
  ],

  pillars: [
    { num: "I", title: "Clarity Before Commitment", text: "You'll understand every detail before we break ground." },
    { num: "II", title: "Peace During the Build", text: "Weekly communication. Clean sites. No surprises." },
    { num: "III", title: "Accountability After Keys", text: "Our relationship doesn't end at closing. Ever." }
  ],

  testimonials: [
    { quote: "The difference was communication and care. We always knew what was happening, and the craftsmanship speaks for itself.", name: "The Martinez Family", detail: "Custom Build, College Station • 2023" },
    { quote: "No games, no surprises. Clear plans, honest numbers, and a builder who stood behind the details.", name: "The Thompson Family", detail: "Custom Build, Bryan • 2022" }
  ],

  projects: [
    {
      id: 1,
      title: "The Oakwood Estate",
      type: "custom",
      location: "College Station, TX",
      sqft: "4,200",
      beds: "5",
      baths: "4.5",
      year: "2024",
      photo: "assets/images/custom_home.jpg",
      sketch: "assets/images/hero-sketch.jpg",
      description: "Designed for a growing family who wanted vaulted volume, long sightlines, and a backyard built for gathering. Warm finishes, disciplined layout, and details that age well.",
      verseText: "By wisdom a house is built, and through understanding it is established.",
      verseRef: "Proverbs 24:3"
    },
    {
      id: 2,
      title: "The Heritage Craftsman",
      type: "custom",
      location: "Bryan, TX",
      sqft: "3,600",
      beds: "4",
      baths: "3.5",
      year: "2023",
      photo: "assets/images/custom_home.jpg",
      sketch: "assets/images/hero-sketch.jpg",
      description: "A classic exterior with thoughtful interior flow. Built for everyday living, long-term durability, and a finish level that doesn't chase trends.",
      verseText: "Unless the Lord builds the house, the builders labor in vain.",
      verseRef: "Psalm 127:1"
    },
    {
      id: 3,
      title: "The Brazos Modern Ranch",
      type: "custom",
      location: "Bryan–College Station, TX",
      sqft: "3,950",
      beds: "4",
      baths: "3",
      year: "2024",
      photo: "assets/images/custom_home.jpg",
      sketch: "assets/images/hero-sketch.jpg",
      description: "A modern ranch with practical planning: generous storage, clean transitions, and materials chosen for how they perform over time.",
      verseText: "Commit your work to the Lord, and your plans will be established.",
      verseRef: "Proverbs 16:3"
    },
    {
      id: 4,
      title: "The Stonegate Spec",
      type: "spec",
      location: "College Station, TX",
      sqft: "2,850",
      beds: "4",
      baths: "3",
      year: "2023",
      photo: "assets/images/custom_home.jpg",
      sketch: "assets/images/hero-sketch.jpg",
      description: "A spec home built with custom-home discipline: strong details, clean scope, and straightforward value for families who want quality without the noise.",
      verseText: "Let all that you do be done in love.",
      verseRef: "1 Corinthians 16:14"
    },
    {
      id: 5,
      title: "The Traditions Porch House",
      type: "custom",
      location: "College Station, TX",
      sqft: "3,250",
      beds: "4",
      baths: "3.5",
      year: "2022",
      photo: "assets/images/custom_home.jpg",
      sketch: "assets/images/hero-sketch.jpg",
      description: "Designed around front-porch living and family gatherings. Traditional proportions, warm interior light, and a layout that feels settled.",
      verseText: "As for me and my house, we will serve the Lord.",
      verseRef: "Joshua 24:15"
    },
    {
      id: 6,
      title: "The Midtown Bryan Build",
      type: "spec",
      location: "Bryan, TX",
      sqft: "2,640",
      beds: "3",
      baths: "2.5",
      year: "2022",
      photo: "assets/images/custom_home.jpg",
      sketch: "assets/images/hero-sketch.jpg",
      description: "A clean, durable build with strong planning and honest finishes. Built for real life — and built to last.",
      verseText: "Whatever you do, work at it with all your heart.",
      verseRef: "Colossians 3:23"
    }
  ]
};