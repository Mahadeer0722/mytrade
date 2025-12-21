export interface ProductOption {
    label: string;
    price: number;
}

export interface Product {
    id: string;
    name: string;
    tagline: string;
    description: string;
    keyFeatures: string[];
    benefits: string[];
    image: string;
    secondaryImage?: string; // Optional second image (e.g. badges, certifications)
    detailImage?: string; // Optional detailed image to show on click
    video?: string; // Optional video to show on click
    price: number;
    options?: ProductOption[];
}

export const products: Product[] = [
    {
        id: 'p5',
        name: 'Vidhya Coffee',
        tagline: 'Perfect blend for rich taste and health benefits',
        description: 'Vidhya Coffee - Available in Instant and Filter varieties.',
        keyFeatures: ['Coffee-Chicory Blend', 'Rich Taste', 'Health Benefits', 'Multiple Varieties'],
        benefits: ['Digestive Health', 'Lower Caffeine', 'Rich Flavor', 'Instant Energy'],
        image: '/images/vidya-insta-coffee.png',
        price: 150,
        options: [
            { label: 'Instant Coffee - 200g', price: 150 },
            { label: 'Instant Coffee - 50g (Jar)', price: 100 },
            { label: 'Filter Coffee - 250g', price: 140 }
        ]
    },
    {
        id: 'p6',
        name: 'Grand Tea-1 Strong Dust Tea',
        tagline: "Gold Medal quality tea from India's finest tea gardens.",
        description: 'Strong dust variety for perfect brew.',
        keyFeatures: ['Gold Medal Quality', 'Strong Dust', 'Tea Garden Fresh', 'TATA Enterprise Associate'],
        benefits: ['Antioxidants', 'Mental Alertness', 'Traditional Taste', 'Premium Quality'],
        image: '/images/grand-tea-1.png',
        secondaryImage: '/images/tata-associate.jpg',
        price: 99,
        options: [
            { label: '250g', price: 99 },
            { label: '1kg', price: 350 }
        ]
    },
    {
        id: 'p3',
        name: 'Heal Herbals Herbal Tea Sugar Control',
        tagline: '100% Natural herbal tea specially formulated for sugar control and overall wellness',
        description: 'Experience the healing power of nature with our specially formulated herbal tea.',
        keyFeatures: ['Sugar Control', '100% Natural', '10+ Herbals', 'ISO Certified'],
        benefits: ['Blood Sugar Control', 'Natural Ingredients', 'Digestive Health', 'Immunity Boost'],
        image: '/images/heal-herbals-tea.png',
        video: '/videos/specific-product.mp4',
        price: 250,
        options: [
            { label: '90g', price: 250 }
        ]
    },
    {
        id: 'p1',
        name: 'A Grand Kudanthai Degree Instant Coffee',
        tagline: 'Fresh, Bold, Unforgettable. Meet Your New Favorite Coffee.',
        description: 'Every Cup Tells a Story, Make Yours Extraordinary.',
        keyFeatures: ['Premium Quality', 'Rich Aroma', 'Instant Preparation', 'Bold Taste'],
        benefits: ['Energy Boost', 'Antioxidants', 'Mental Alertness', 'Rich Flavor'],
        image: '/images/kudanthai-degree-instant.png',
        price: 350,
        options: [
            { label: '200g', price: 350 }
        ]
    },
    {
        id: 'p2',
        name: 'A Grand Kudanthai Degree Filter Coffee',
        tagline: 'Fresh, Bold, Unforgettable. Meet Your New Favorite Coffee.',
        description: 'Every Cup Tells a Story, Make Yours Extraordinary.',
        keyFeatures: ['Premium Quality', 'Rich Aroma', 'Instant Preparation', 'Bold Taste'],
        benefits: ['Energy Boost', 'Antioxidants', 'Mental Alertness', 'Rich Flavor'],
        image: '/images/kudanthai-degree-filter.png',
        price: 250,
        options: [
            { label: '200g', price: 250 }
        ]
    },
    {
        id: 'p4',
        name: 'Grand Premium Oil',
        tagline: 'Pure and natural oil products with authentic quality',
        description: 'Pure Natural Oil produced with traditional extraction methods.',
        keyFeatures: ['Cold Pressed', 'Pure & Natural', 'No Preservatives', 'Traditional Method'],
        benefits: ['Heart Health', 'Natural Vitamins', 'Better Digestion', 'Pure Quality'],
        image: '/images/grand-premium-oil.png',
        detailImage: '/images/grand-oil-detail.png',
        price: 250,
        options: [
            { label: '75ml', price: 250 }
        ]
    },
];
