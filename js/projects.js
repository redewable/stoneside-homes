/**
 * STONESIDE CUSTOM HOMES - PROJECTS DATA
 * =====================================
 * 
 * This file contains all portfolio project data.
 * To add a new project:
 * 1. Add a new object to the PROJECTS array below
 * 2. Add the project images to /assets/images/projects/
 * 3. Refresh the website
 * 
 * Project Object Structure:
 * {
 *   id: "unique-id",           // Unique identifier (no spaces, lowercase)
 *   title: "Project Name",     // Display name
 *   location: "City, TX",      // Location
 *   type: "custom" or "spec",  // Project type for filtering
 *   featured: true/false,      // Show in featured filter
 *   sqft: "3,500",            // Square footage
 *   beds: "4",                // Number of bedrooms
 *   baths: "3.5",             // Number of bathrooms
 *   year: "2024",             // Year completed
 *   image: "filename.jpg",     // Main image filename (in /assets/images/projects/)
 *   gallery: ["img1.jpg"],     // Array of gallery image filenames
 *   description: "..."         // Project description
 * }
 */

const PROJECTS = [
    {
        id: "hill-country-estate",
        title: "Hill Country Estate",
        location: "College Station, TX",
        type: "custom",
        featured: true,
        sqft: "4,200",
        beds: "5",
        baths: "4.5",
        year: "2024",
        image: "custom_home.jpg",
        gallery: ["custom_home.jpg"],
        description: "A stunning Hill Country-inspired estate featuring exposed timber beams, native stone accents, and panoramic views. This custom home showcases the perfect blend of Texas tradition and modern luxury, with an open floor plan designed for both elegant entertaining and comfortable family living."
    },
    {
        id: "modern-farmhouse",
        title: "Modern Farmhouse",
        location: "Bryan, TX",
        type: "custom",
        featured: true,
        sqft: "3,800",
        beds: "4",
        baths: "3.5",
        year: "2023",
        image: "custom_home.jpg",
        gallery: ["custom_home.jpg"],
        description: "This modern farmhouse combines rustic charm with contemporary design. Board and batten siding, black steel windows, and warm wood tones create a welcoming atmosphere that feels both timeless and fresh."
    },
    {
        id: "craftsman-retreat",
        title: "Craftsman Retreat",
        location: "College Station, TX",
        type: "spec",
        featured: false,
        sqft: "2,900",
        beds: "3",
        baths: "2.5",
        year: "2024",
        image: "custom_home.jpg",
        gallery: ["custom_home.jpg"],
        description: "A beautifully crafted spec home featuring traditional Craftsman details with modern amenities. Tapered columns, detailed millwork, and a thoughtful floor plan make this home perfect for growing families."
    },
    {
        id: "texas-ranch",
        title: "Texas Ranch Revival",
        location: "Brazos County, TX",
        type: "custom",
        featured: true,
        sqft: "5,100",
        beds: "5",
        baths: "5",
        year: "2023",
        image: "custom_home.jpg",
        gallery: ["custom_home.jpg"],
        description: "An expansive ranch-style home designed for multi-generational living. Natural stone, reclaimed wood, and soaring ceilings honor Texas building traditions while incorporating the latest in smart home technology."
    },
    {
        id: "stone-creek-cottage",
        title: "Stone Creek Cottage",
        location: "Bryan, TX",
        type: "spec",
        featured: false,
        sqft: "2,400",
        beds: "3",
        baths: "2",
        year: "2024",
        image: "custom_home.jpg",
        gallery: ["custom_home.jpg"],
        description: "A charming cottage-style home with European influences. Stone and stucco exterior, arched doorways, and a courtyard entry create old-world appeal with all the conveniences of new construction."
    },
    {
        id: "legacy-manor",
        title: "Legacy Manor",
        location: "College Station, TX",
        type: "custom",
        featured: true,
        sqft: "6,500",
        beds: "6",
        baths: "6.5",
        year: "2022",
        image: "custom_home.jpg",
        gallery: ["custom_home.jpg"],
        description: "A grand estate designed to be a family legacy. This custom masterpiece features a porte cochère, wine cellar, home theater, and resort-style outdoor living spaces. Every detail was meticulously planned to create a home of enduring beauty."
    }
];

/**
 * TESTIMONIALS DATA
 * Add new testimonials by adding objects to this array
 */
const TESTIMONIALS = [
    {
        quote: "Stoneside exceeded every expectation. From the first meeting to move-in day, they treated us like family. Our home is more beautiful than we ever imagined.",
        name: "The Johnson Family",
        location: "College Station, TX"
    },
    {
        quote: "The attention to detail and craftsmanship is unmatched. We've built with other builders before, but Stoneside is in a league of their own.",
        name: "Michael & Sarah Williams",
        location: "Bryan, TX"
    },
    {
        quote: "Integrity, quality, and genuine care—that's Stoneside. They kept us informed throughout the entire process and delivered exactly what they promised.",
        name: "The Martinez Family",
        location: "College Station, TX"
    }
];

/**
 * COMPANY INFO
 * Update these values to change contact information site-wide
 */
const COMPANY_INFO = {
    name: "Stoneside Custom Homes",
    phone: "(979) 555-1234",
    email: "info@stonesidehomes.com",
    address: "Bryan-College Station, Texas",
    social: {
        facebook: "https://facebook.com/stonesidehomes",
        instagram: "https://instagram.com/stonesidehomes",
        houzz: "https://houzz.com/stonesidehomes",
        pinterest: "https://pinterest.com/stonesidehomes"
    }
};

// Export for use in main.js
if (typeof window !== 'undefined') {
    window.STONESIDE_DATA = {
        projects: PROJECTS,
        testimonials: TESTIMONIALS,
        company: COMPANY_INFO
    };
}
