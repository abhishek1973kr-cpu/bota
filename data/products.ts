export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: number; // current discounted price
  originalPrice: number;
  discountPrice: number; // alias for compatibility
  discount: string;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  ratingCount: number; // alias for compatibility
  badge?: string;
  image: string;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  description?: string;
  ingredients: string[];
  howToUse: string;
  size: string;
  inStock: boolean;
  reviews: Review[];
}

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "hemp-cleansing-oil",
    name: "Hemp Cleansing Oil",
    tagline: "Ultra-Nourishing Makeup & Dirt Remover",
    category: "Face Care",
    price: 749,
    discountPrice: 749,
    originalPrice: 899,
    discount: "17% OFF",
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 1420,
    ratingCount: 1420,
    badge: "Bestseller",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Cold-pressed organic hemp seed oil infused with golden calendula flowers that gently dissolves stubborn waterproof makeup, sunscreen, and sebum without stripping the skin's moisture mantle.",
    fullDescription: "Our Hemp Cleansing Oil is formulated using single-origin, Himalayan cold-pressed hemp seeds rich in essential Omega 3, 6, and 9 fatty acids. Blended with skin-soothing calendula extracts and non-comedogenic jojoba, it transforms on contact with water into a gentle milky emulsion. Ideal for double-cleansing routines, acne-prone skin, and dry dehydrated textures alike.",
    ingredients: [
      "Cold-Pressed Cannabis Sativa (Hemp) Seed Oil",
      "Calendula Officinalis Flower Extract",
      "Simmondsia Chinensis (Golden Jojoba) Seed Oil",
      "Helianthus Annuus (Sunflower) Seed Oil",
      "Tocopherol (Pure Plant-Derived Vitamin E)",
      "Citrus Aurantium Bergamia (Bergamot) Peel Oil"
    ],
    howToUse: "Take 2 to 3 pumps onto dry palms. Gently massage in upward circular motions over dry face and eyes for 60 seconds to melt makeup and surface impurities. Splash with lukewarm water to emulsify into a light milk, then rinse thoroughly. Follow with Shahi Ubtan Wash for best double-cleansing results.",
    size: "100 ml",
    inStock: true,
    reviews: [
      {
        id: "r1",
        author: "Debalina Das",
        rating: 5,
        date: "October 14, 2026",
        comment: "This has completely replaced my micellar water! It dissolves waterproof mascara without stinging my eyes and leaves my skin supple and bouncy.",
        verified: true,
      },
      {
        id: "r2",
        author: "Kavita Sen",
        rating: 5,
        date: "September 28, 2026",
        comment: "Zero breakouts! I have sensitive combination skin and was nervous about facial oils, but this rinses off completely clean.",
        verified: true,
      },
      {
        id: "r3",
        author: "Meera Nair",
        rating: 4,
        date: "September 11, 2026",
        comment: "Wonderful earthy fragrance and great slip for a gentle evening facial massage. Highly recommend!",
        verified: true,
      }
    ]
  },
  {
    id: "shahi-ubtan-wash",
    name: "Shahi Ubtan Wash",
    tagline: "Ayurvedic Radiance & Tan Removal Cleanser",
    category: "Face Care",
    price: 599,
    discountPrice: 599,
    originalPrice: 699,
    discount: "14% OFF",
    discountPercentage: 14,
    rating: 4.8,
    reviewCount: 2180,
    ratingCount: 2180,
    badge: "14% Off",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Traditional royal formulation of wild Kasturi turmeric, Kashmiri saffron strands, sandalwood, and gram flour for instant brightening and deep pore purification.",
    fullDescription: "Inspired by ancient royal bridal bathing rituals, Shahi Ubtan Wash combines sun-dried Kashmiri saffron, wild Kasturi Manjal, chana flour, and certified Mysore sandalwood powder. This low-foam, non-drying cleanser gently sloughs dead cellular debris, lifts daily sun tan, and restores an incomparable golden radiance.",
    ingredients: [
      "Kashmiri Crocus Sativus (Saffron) Extract",
      "Curcuma Aromatica (Wild Kasturi Turmeric)",
      "Santalum Album (Mysore Sandalwood) Hydrosol",
      "Cicer Arietinum (Besan/Gram Flour) Extract",
      "Aloe Barbadensis Leaf Juice",
      "Vegetable Glycerine"
    ],
    howToUse: "Wet face with lukewarm water. Squeeze a coin-sized amount onto damp fingertips and massage onto face and neck in circular motions for 1-2 minutes. Allow the herbal actives to sit on the skin for 30 seconds before rinsing thoroughly. Use morning and night.",
    size: "150 ml",
    inStock: true,
    reviews: [
      {
        id: "r4",
        author: "Pooja Banerjee",
        rating: 5,
        date: "October 19, 2026",
        comment: "Visible reduction in sun tan after just 4 days. It leaves my skin glowing without that stretchy dry feeling typical cleansers give.",
        verified: true,
      },
      {
        id: "r5",
        author: "Ritu Verma",
        rating: 5,
        date: "October 02, 2026",
        comment: "The authentic smell of saffron and sandalwood is divine. Definitely feels royal!",
        verified: true,
      }
    ]
  },
  {
    id: "green-tea-water-cream",
    name: "Green Tea Water Cream",
    tagline: "Lightweight Oil-Free Gel Moisturizer",
    category: "Face Cream",
    price: 799,
    discountPrice: 799,
    originalPrice: 999,
    discount: "20% OFF",
    discountPercentage: 20,
    rating: 4.9,
    reviewCount: 980,
    ratingCount: 980,
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Burst-of-hydration aqua formula enriched with Darjeeling green tea antioxidants and willow bark extract to calm active breakouts and refine enlarged pores.",
    fullDescription: "Formulated specifically for humid tropical climates and combination-to-oily skin, the Green Tea Water Cream delivers 72-hour weightless hydration. When applied, this bouncy gel matrix bursts into cooling moisture drops packed with polyphenols, green tea EGCG, and botanical hyaluronic acid.",
    ingredients: [
      "Darjeeling Camellia Sinensis (Green Tea) Leaf Water",
      "Salix Alba (Willow Bark) Extract",
      "Cassia Angustifolia (Botanical Hyaluronic Acid)",
      "Centella Asiatica (Gotu Kola) Extract",
      "Niacinamide (Vitamin B3 2%)",
      "Cucumber Fruit Distillate"
    ],
    howToUse: "After cleansing and toning, scoop a dime-sized amount with the wooden spatula. Gently smooth over face and neck until the water droplets are fully absorbed. Can be used under makeup as a smooth hydrating primer.",
    size: "50 g",
    inStock: true,
    reviews: [
      {
        id: "r6",
        author: "Sneha Roy",
        rating: 5,
        date: "October 22, 2026",
        comment: "Zero greasiness! My T-zone stays matte all day yet my cheeks feel deeply hydrated.",
        verified: true,
      },
      {
        id: "r7",
        author: "Arjun Mehta",
        rating: 4,
        date: "October 08, 2026",
        comment: "Very cooling after a hot day outside. Great for soothing razor burns as well.",
        verified: true,
      }
    ]
  },
  {
    id: "kumkumadi-youth-serum",
    name: "Kumkumadi Youth Elixir",
    tagline: "Miraculous Night Repair Treatment Oil",
    category: "Serums",
    price: 1199,
    discountPrice: 1199,
    originalPrice: 1499,
    discount: "20% OFF",
    discountPercentage: 20,
    rating: 5.0,
    reviewCount: 3120,
    ratingCount: 3120,
    badge: "Award Winner",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "26 precious Ayurvedic botanicals infused in pure goat milk and sesame oil to diminish pigmentation, target fine lines, and give radiant glass skin.",
    fullDescription: "Our crown jewel elixir is prepared following the authentic Ashtanga Hridaya classical Vedic scripture. Saffron pistils, red sandalwood, vetiver, lotus stamen, and sacred Indian banyan are simmered over a low flame for 72 continuous hours in pure sesame and organic goat milk. A few golden drops each night awaken skin with luminous vitality.",
    ingredients: [
      "Pure Kashmiri Mongra Saffron (Crocus Sativus)",
      "Pterocarpus Santalinus (Red Sandalwood)",
      "Vetiveria Zizanioides (Usheera/Khus)",
      "Nelumbo Nucifera (Sacred Indian Lotus)",
      "Ficus Benghalensis (Banyan Aerial Roots)",
      "Cold-Pressed Sesame Seed Oil",
      "Aja Kshira (Farm Fresh Goat Milk)"
    ],
    howToUse: "At night, after misting face with pure rose water, press 3-4 golden drops into the palm of your hands. Warm between palms and gently press onto damp face, neck, and decolletage using upward patting motions. Leave on overnight.",
    size: "30 ml",
    inStock: true,
    reviews: [
      {
        id: "r8",
        author: "Anurpeeta Mandal",
        rating: 5,
        date: "October 16, 2026",
        comment: "I have used several high-end luxury serums, but nothing beats Royal Botanica's Kumkumadi. My hyperpigmentation on both cheeks has faded by 70% in one bottle!",
        verified: true,
      },
      {
        id: "r9",
        author: "Simran Kaur",
        rating: 5,
        date: "September 30, 2026",
        comment: "Pure gold in a bottle. Wake up looking like you got 10 hours of beauty sleep.",
        verified: true,
      }
    ]
  },
  {
    id: "bhringraj-hair-nectar",
    name: "Bhringraj & Rosemary Nectar",
    tagline: "Root-Stimulating Herbal Hair Oil",
    category: "Hair Care",
    price: 699,
    discountPrice: 699,
    originalPrice: 849,
    discount: "18% OFF",
    discountPercentage: 18,
    rating: 4.9,
    reviewCount: 1860,
    ratingCount: 1860,
    badge: "Trending",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Potent cold-pressed hair growth tonic with freshly harvested Bhringraj leaves, steam-distilled Rosemary herb, onion seed oil, and methi extract.",
    fullDescription: "A slow-infused botanical treatment addressing hair thinning, dry scalp itchiness, and breakage. Fresh Eclipta Alba (Bhringraj—the king of herbs) is slow-steeped in virgin coconut, sweet almond, and black seed kalonji oil, fortified with pure rosemary essential oil to stimulate scalp micro-circulation.",
    ingredients: [
      "Eclipta Alba (Fresh Bhringraj Herb)",
      "Rosmarinus Officinalis (Rosemary Essential Oil)",
      "Nigella Sativa (Black Kalonji Seed Oil)",
      "Trigonella Foenum-Graecum (Methi/Fenugreek)",
      "Emblica Officinalis (Amla/Indian Gooseberry)",
      "Cold-Pressed Virgin Coconut Oil"
    ],
    howToUse: "Part dry hair into sections. Apply oil directly to the scalp using the dropper and massage with fingertips for 5 to 10 minutes to boost circulation. Leave on for at least 1 hour or overnight before washing with a mild botanical shampoo.",
    size: "200 ml",
    inStock: true,
    reviews: [
      {
        id: "r10",
        author: "Sritoma Das",
        rating: 5,
        date: "October 07, 2026",
        comment: "Hair fall stopped drastically within 2 weeks of using this twice a week. Love the rosemary scent!",
        verified: true,
      }
    ]
  },
  {
    id: "rose-geranium-sun-fluid",
    name: "Rose & Aloe Matte Sun Fluid SPF 50+",
    tagline: "Broad Spectrum PA++++ Zero White Cast",
    category: "Sun Protection",
    price: 679,
    discountPrice: 679,
    originalPrice: 799,
    discount: "15% OFF",
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 840,
    ratingCount: 840,
    badge: "Summer Essential",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Non-greasy mineral and plant antioxidant sunscreen infused with Damask rose water and pure aloe vera leaf for all-day matte UV defense.",
    fullDescription: "Say goodbye to chalky white residue and clogged pores. Our lightweight sun fluid combines non-nano zinc oxide with organic Damask rose hydrosol, raspberry seed oil, and green tea antioxidants to shield skin against harmful UVA/UVB rays and blue light emitted by screens.",
    ingredients: [
      "Non-Nano Zinc Oxide 18%",
      "Rosa Damascena (Damask Rose) Flower Distillate",
      "Aloe Barbadensis Leaf Extract",
      "Rubus Idaeus (Red Raspberry) Seed Oil",
      "Daucus Carota Sativa (Carrot Seed) Oil",
      "Caprylic/Capric Triglyceride"
    ],
    howToUse: "Apply generously as the final step of your daytime skincare routine, at least 15 minutes before sun exposure. Reapply every 2 hours if swimming or sweating.",
    size: "50 ml",
    inStock: true,
    reviews: [
      {
        id: "r11",
        author: "Tanya Sharma",
        rating: 5,
        date: "October 11, 2026",
        comment: "Zero white cast on dusky skin! Extremely rare for a clean mineral sunscreen. Doesn't feel sticky in Mumbai humidity.",
        verified: true,
      }
    ]
  },
  {
    id: "shea-sheen-body-butter",
    name: "Whipped Shea & Cocoa Butter",
    tagline: "Deep Moisture Soufflé for Dry Skin",
    category: "Body Care",
    price: 749,
    discountPrice: 749,
    originalPrice: 899,
    discount: "17% OFF",
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 720,
    ratingCount: 720,
    badge: "Ultra Hydrating",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Velvety whipped unrefined Ghanaian shea butter with organic vanilla bean extract and cold-pressed sweet almond oil for 48h barrier repair.",
    fullDescription: "A decadent cloud of moisture crafted from unrefined raw shea butter, organic cocoa seed butter, and sweet almond oil. Whipped to airy perfection, it melts into skin instantly, soothing rough elbows, cracked heels, and winter flakiness with an intoxicating natural vanilla aroma.",
    ingredients: [
      "Raw Butyrospermum Parkii (Shea) Butter",
      "Theobroma Cacao (Cocoa) Seed Butter",
      "Prunus Amygdalus Dulcis (Sweet Almond) Oil",
      "Vanilla Planifolia Bean Extract",
      "Persea Gratissima (Avocado) Oil",
      "Tocopheryl Acetate"
    ],
    howToUse: "Massage generously over body immediately after showering while skin is still slightly damp to lock in maximum hydration. Pay special attention to dry areas like knees and elbows.",
    size: "150 g",
    inStock: true,
    reviews: [
      {
        id: "r12",
        author: "Priyanka Ghosh",
        rating: 5,
        date: "October 03, 2026",
        comment: "Literally smells like an expensive dessert and keeps dry winter ashiness away all day. 10/10!",
        verified: true,
      }
    ]
  },
  {
    id: "beetroot-tinted-lip-butter",
    name: "Beetroot Glow Lip Butter",
    tagline: "Natural Rosy Tint & Intense Hydration",
    category: "Lip Care",
    price: 329,
    discountPrice: 329,
    originalPrice: 399,
    discount: "18% OFF",
    discountPercentage: 18,
    rating: 4.8,
    reviewCount: 1540,
    ratingCount: 1540,
    badge: "Pocket Favorite",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=900&q=80",
    ],
    shortDescription: "Organic beeswax, raw beetroot pigment, and virgin coconut oil to heal chapped lips with a healthy flushed berry tint.",
    fullDescription: "A plant-pigmented lip savior formulated with wild mountain honey, cold-pressed coconut oil, organic beeswax, and raw beetroot juice. Heals peeling dry lips while imparting a subtle, glossy natural berry stain that enhances your natural lip tone.",
    ingredients: [
      "Beta Vulgaris (Raw Beetroot) Extract",
      "Cera Alba (Organic Unbleached Beeswax)",
      "Cocos Nucifera (Virgin Coconut) Oil",
      "Wild Forest Honey",
      "Punica Granatum (Pomegranate) Seed Oil",
      "Mentha Piperita (Peppermint) Oil"
    ],
    howToUse: "Glide over bare lips anytime moisture or a pop of natural rosy tint is desired. Can also be dabbed gently onto cheeks as a dewy natural blush.",
    size: "10 g",
    inStock: true,
    reviews: [
      {
        id: "r13",
        author: "Sayani Bhattacharya",
        rating: 5,
        date: "October 18, 2026",
        comment: "The prettiest natural tint! Doesn't dry out lips like chemical tints do. Keep one in every purse.",
        verified: true,
      }
    ]
  },
];

export interface Category {
  id: string;
  name: string;
  count: string;
  image: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "hair-care",
    name: "Hair Care",
    count: "18 Products",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=500&q=80",
    description: "Root-strengthening herbs & cold-pressed oils",
  },
  {
    id: "face-cream",
    name: "Face Cream",
    count: "24 Products",
    image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&w=500&q=80",
    description: "Deep nourishing day & night hydration botanicals",
  },
  {
    id: "serums",
    name: "Serums & Elixirs",
    count: "12 Products",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80",
    description: "Potent active botanicals for targeted correction",
  },
  {
    id: "face-gel",
    name: "Face Gel",
    count: "9 Products",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80",
    description: "Pure soothing aloe & cucumber water jellies",
  },
  {
    id: "sun-protection",
    name: "Sun Protection",
    count: "7 Products",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=500&q=80",
    description: "Mineral broad spectrum SPF without toxicity",
  },
  {
    id: "body-care",
    name: "Body Care",
    count: "16 Products",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=500&q=80",
    description: "Whipped butters, polishes & herbal washes",
  },
  {
    id: "lip-care",
    name: "Lip Care",
    count: "8 Products",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=500&q=80",
    description: "Tinted herbal balms & exfoliating polishes",
  },
  {
    id: "night-cream",
    name: "Night Cream",
    count: "11 Products",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=500&q=80",
    description: "Cellular renewal sleep masks & restorative balms",
  },
];

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  verified: boolean;
  product: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Anurpeeta Mandal",
    city: "Kolkata",
    verified: true,
    product: "Kumkumadi Youth Elixir",
    rating: 5,
    date: "Verified Buyer • 2 weeks ago",
    comment: "I've struggled with stubborn acne spots for years. Just 3 weeks into using the Kumkumadi Elixir every evening, my skin texture has smoothed out tremendously! The herbal smell is therapeutic.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "2",
    name: "Debalina Das",
    city: "Asansol",
    verified: true,
    product: "Shahi Ubtan Wash & Hemp Oil",
    rating: 5,
    date: "Verified Buyer • 1 month ago",
    comment: "The double cleansing combo of Hemp Cleansing Oil and Shahi Ubtan Wash is magical. It removes stubborn makeup effortlessly without drying out my cheeks. Royal Botanica is now my holy grail!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "3",
    name: "Sritoma Das",
    city: "Durgapur",
    verified: true,
    product: "Bhringraj & Rosemary Nectar",
    rating: 5,
    date: "Verified Buyer • 3 weeks ago",
    comment: "Noticeable reduction in hair fall within 15 days! The rosemary and bhringraj aroma is 100% natural, no synthetic perfume headache. Delivery was swift and the packaging was eco-friendly glass.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
];
