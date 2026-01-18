// ============================================
// STONESIDE CUSTOM HOMES - Projects Data
// ============================================

const projects = [
    {
        id: 1,
        title: "The Oakwood Estate",
        type: "custom",
        location: "College Station, TX",
        sqft: "4,200",
        beds: 5,
        baths: 4.5,
        year: 2024,
        image: "assets/images/custom_home.jpg",
        gallery: [
            "assets/images/custom_home.jpg",
            "assets/images/custom_home.jpg",
            "assets/images/custom_home.jpg"
        ],
        description: "A stunning custom estate featuring exposed beam ceilings, a chef's kitchen with custom cabinetry, and a sprawling backyard perfect for Texas entertaining. Built with premium materials throughout.",
        features: ["Exposed Beam Ceilings", "Chef's Kitchen", "Wine Cellar", "Outdoor Kitchen"]
    },
    {
        id: 2,
        title: "The Heritage Craftsman",
        type: "custom",
        location: "Bryan, TX",
        sqft: "3,800",
        beds: 4,
        baths: 3.5,
        year: 2024,
        image: "assets/images/custom_home.jpg",
        gallery: [
            "assets/images/custom_home.jpg",
            "assets/images/custom_home.jpg"
        ],
        description: "Classic craftsman style meets modern luxury. This home features handcrafted woodwork, a wrap-around porch, and an open floor plan designed for family living.",
        features: ["Handcrafted Woodwork", "Wrap-around Porch", "Open Floor Plan", "Smart Home"]
    },
    {
        id: 3,
        title: "The Stone Creek Modern",
        type: "custom",
        location: "College Station, TX",
        sqft: "3,500",
        beds: 4,
        baths: 3,
        year: 2023,
        image: "assets/images/custom_home.jpg",
        gallery: [
            "assets/images/custom_home.jpg",
            "assets/images/custom_home.jpg"
        ],
        description: "Contemporary design with Texas soul. Clean lines, floor-to-ceiling windows, and an indoor-outdoor living concept that maximizes the beautiful lot.",
        features: ["Floor-to-Ceiling Windows", "Indoor-Outdoor Living", "Home Theater", "Pool"]
    },
    {
        id: 4,
        title: "The Brazos View",
        type: "custom",
        location: "Bryan, TX",
        sqft: "4,500",
        beds: 5,
        baths: 5,
        year: 2023,
        image: "assets/images/custom_home.jpg",
        gallery: [
            "assets/images/custom_home.jpg",
            "assets/images/custom_home.jpg"
        ],
        description: "Positioned to capture stunning views of the Brazos Valley, this estate home features luxury finishes, a resort-style pool, and a separate guest casita.",
        features: ["Valley Views", "Resort Pool", "Guest Casita", "3-Car Garage"]
    },
    {
        id: 5,
        title: "The Legacy Ranch",
        type: "custom",
        location: "College Station, TX",
        sqft: "5,200",
        beds: 6,
        baths: 5.5,
        year: 2023,
        image: "assets/images/custom_home.jpg",
        gallery: [
            "assets/images/custom_home.jpg",
            "assets/images/custom_home.jpg"
        ],
        description: "A true Texas ranch home built for generations. Features a grand entrance, his and hers offices, a massive game room, and a barn-style workshop.",
        features: ["Grand Entrance", "His & Hers Offices", "Game Room", "Workshop"]
    },
    {
        id: 6,
        title: "Willow Creek Residence",
        type: "spec",
        location: "College Station, TX",
        sqft: "2,800",
        beds: 4,
        baths: 3,
        year: 2024,
        image: "assets/images/custom_home.jpg",
        gallery: [
            "assets/images/custom_home.jpg",
            "assets/images/custom_home.jpg"
        ],
        description: "Move-in ready luxury in the sought-after Willow Creek community. Premium finishes, open concept living, and a covered patio for outdoor entertaining.",
        features: ["Premium Finishes", "Open Concept", "Covered Patio", "Energy Efficient"]
    },
    {
        id: 7,
        title: "The Homestead",
        type: "custom",
        location: "Bryan, TX",
        sqft: "3,200",
        beds: 4,
        baths: 3,
        year: 2022,
        image: "assets/images/custom_home.jpg",
        gallery: [
            "assets/images/custom_home.jpg",
            "assets/images/custom_home.jpg"
        ],
        description: "Farmhouse charm with modern amenities. Shiplap accents, a large kitchen island, and a dedicated mudroom make this home perfect for busy families.",
        features: ["Shiplap Accents", "Large Island", "Mudroom", "Built-in Storage"]
    },
    {
        id: 8,
        title: "Pecan Grove Estate",
        type: "spec",
        location: "College Station, TX",
        sqft: "3,100",
        beds: 4,
        baths: 3.5,
        year: 2024,
        image: "assets/images/custom_home.jpg",
        gallery: [
            "assets/images/custom_home.jpg",
            "assets/images/custom_home.jpg"
        ],
        description: "Nestled among mature pecan trees, this spec home offers privacy and luxury. Features include a gourmet kitchen, spa-like master bath, and outdoor fireplace.",
        features: ["Gourmet Kitchen", "Spa Master Bath", "Outdoor Fireplace", "Mature Trees"]
    },
    {
        id: 9,
        title: "The Carriage House",
        type: "custom",
        location: "Bryan, TX",
        sqft: "2,600",
        beds: 3,
        baths: 2.5,
        year: 2022,
        image: "assets/images/custom_home.jpg",
        gallery: [
            "assets/images/custom_home.jpg",
            "assets/images/custom_home.jpg"
        ],
        description: "Efficient elegance for empty nesters. Single-story living with a detached carriage house perfect for guests or a home office.",
        features: ["Single Story", "Carriage House", "Low Maintenance", "Courtyard"]
    },
    {
        id: 10,
        title: "Timber Ridge Modern",
        type: "spec",
        location: "College Station, TX",
        sqft: "2,400",
        beds: 3,
        baths: 2.5,
        year: 2024,
        image: "assets/images/custom_home.jpg",
        gallery: [
            "assets/images/custom_home.jpg",
            "assets/images/custom_home.jpg"
        ],
        description: "Contemporary spec home with thoughtful design. Features an open loft space, sleek finishes, and a low-maintenance backyard with artificial turf.",
        features: ["Open Loft", "Sleek Finishes", "Low Maintenance Yard", "Smart Features"]
    },
    {
        id: 11,
        title: "The Magnolia",
        type: "custom",
        location: "College Station, TX",
        sqft: "3,600",
        beds: 4,
        baths: 4,
        year: 2021,
        image: "assets/images/custom_home.jpg",
        gallery: [
            "assets/images/custom_home.jpg",
            "assets/images/custom_home.jpg"
        ],
        description: "Southern charm at its finest. This custom home features a grand staircase, formal dining, and a backyard oasis with a custom pool and outdoor kitchen.",
        features: ["Grand Staircase", "Formal Dining", "Custom Pool", "Outdoor Kitchen"]
    },
    {
        id: 12,
        title: "Creek Side Cottage",
        type: "spec",
        location: "Bryan, TX",
        sqft: "2,200",
        beds: 3,
        baths: 2,
        year: 2024,
        image: "assets/images/custom_home.jpg",
        gallery: [
            "assets/images/custom_home.jpg",
            "assets/images/custom_home.jpg"
        ],
        description: "Charming cottage-style spec home with creek views. Perfect starter home with room to grow, featuring quality construction and timeless design.",
        features: ["Creek Views", "Cottage Style", "Starter Home", "Quality Built"]
    }
];

const testimonials = [
    {
        id: 1,
        quote: "Working with Stoneside was like having a partner who truly cared about our family's future. They didn't just build us a house—they built us a home where our grandchildren will make memories.",
        author: "The Johnson Family",
        project: "Custom Home in College Station",
        year: 2023
    },
    {
        id: 2,
        quote: "From the first napkin sketch to handing us the keys, the attention to detail was incredible. Every single thing we asked for, they delivered—and then some.",
        author: "Michael & Sarah Thompson",
        project: "The Heritage Craftsman",
        year: 2024
    },
    {
        id: 3,
        quote: "We've built two homes with other builders before. The difference with Stoneside? They build like it's their own family moving in. That integrity is rare.",
        author: "Dr. Robert Chen",
        project: "The Brazos View Estate",
        year: 2023
    },
    {
        id: 4,
        quote: "Our spec home from Stoneside has the quality of a custom build. Friends can't believe we didn't design it ourselves. The craftsmanship speaks for itself.",
        author: "The Martinez Family",
        project: "Willow Creek Residence",
        year: 2024
    },
    {
        id: 5,
        quote: "They understood our vision immediately. When we said 'Texas ranch that feels like home,' they knew exactly what we meant. We couldn't be happier.",
        author: "James & Linda Patterson",
        project: "The Legacy Ranch",
        year: 2023
    }
];

// Export for use in main.js
window.projectsData = projects;
window.testimonialsData = testimonials;