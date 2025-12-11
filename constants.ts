import { Property, LocationItem, BlogItem, CategoryItem } from './types';

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://picsum.photos/seed/hero1/1600/600',
    title: 'Your Second Home, IN THE HEART OF NATURE',
    subtitle: 'Welcome to 99Villa'
  },
  {
    id: 2,
    image: 'https://picsum.photos/seed/hero2/1600/600',
    title: 'Invest in Your Future',
    subtitle: 'Prime Locations Available'
  },
  {
    id: 3,
    image: 'https://picsum.photos/seed/hero3/1600/600',
    title: 'Luxury Living Defined',
    subtitle: 'Experience the Best'
  }
];

export const HIGHLIGHTED_PROJECTS: Property[] = [
  {
    id: 'h1',
    title: 'Luxury Villa/Bungalow',
    location: 'Karjat, Navi Mumbai',
    price: '₹ 75 L',
    type: 'Villa',
    image: 'https://picsum.photos/seed/villa1/600/400',
    images: [
        'https://picsum.photos/seed/villa1/800/600',
        'https://picsum.photos/seed/villa1_int/800/600',
        'https://picsum.photos/seed/villa1_pool/800/600',
        'https://picsum.photos/seed/villa1_garden/800/600'
    ],
    description: 'A beautiful luxury villa nestled in the hills of Karjat. Experience serenity and luxury combined with modern architecture and lush green surroundings.',
    amenities: ['Pool', 'Garden', 'Security', 'Clubhouse', 'Jogging Track'],
    bedBath: '3 BHK',
    videoUrl: 'https://www.youtube.com/embed/lxO-6rlihSg' // Sample architectural video
  },
  {
    id: 'h2',
    title: 'Modern Villa/Bungalow',
    location: 'Karjat, Navi Mumbai',
    price: '₹ 45 L',
    type: 'Bungalow',
    image: 'https://picsum.photos/seed/villa2/600/400',
    images: [
        'https://picsum.photos/seed/villa2/800/600',
        'https://picsum.photos/seed/villa2_bed/800/600'
    ],
    description: 'Affordable luxury with modern amenities.',
    amenities: ['Clubhouse', 'Gym'],
    bedBath: '2 BHK'
  },
  {
    id: 'h3',
    title: 'Cozy Bungalow',
    location: 'Khopoli Pali Road, Navi Mumbai',
    price: '₹ 25 L',
    type: 'Bungalow',
    image: 'https://picsum.photos/seed/villa3/600/400',
    description: 'Perfect weekend gateway near the city.',
    amenities: ['Garden', 'Parking'],
    bedBath: '1 BHK'
  },
  {
    id: 'h4',
    title: 'Hillside Retreat',
    location: 'Lonavala',
    price: '₹ 1.2 Cr',
    type: 'Villa',
    image: 'https://picsum.photos/seed/villa4/600/400',
    description: 'High-end villa with panoramic views.',
    amenities: ['Pool', 'Spa', 'Concierge'],
    bedBath: '4 BHK'
  }
];

export const POPULAR_PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'Residential Plot',
    location: 'Alibaug, Navi Mumbai',
    price: '₹ 9 L',
    size: '1089 sqft',
    status: 'Ready Move',
    type: 'Plot',
    image: 'https://picsum.photos/seed/land1/600/400'
  },
  {
    id: 'p2',
    title: 'Villa/Bungalow',
    location: 'Khopoli Pali Road',
    price: '₹ 25 L',
    size: '1089 sqft',
    status: 'Ready Move',
    type: 'Villa',
    image: 'https://picsum.photos/seed/villa5/600/400'
  },
  {
    id: 'p3',
    title: 'Residential Plot',
    location: 'Khopoli Pali Road',
    price: '₹ 15 L',
    size: '1089 sqft',
    status: 'Ready Move',
    type: 'Plot',
    image: 'https://picsum.photos/seed/land2/600/400'
  },
  {
    id: 'p4',
    title: 'Residential Plot',
    location: 'Navi Mumbai',
    price: '₹ 9 L',
    size: '1089 sqft',
    status: 'Ready Move',
    type: 'Plot',
    image: 'https://picsum.photos/seed/land3/600/400'
  }
];

// Combine for Listing Page
export const ALL_PROPERTIES: Property[] = [...HIGHLIGHTED_PROJECTS, ...POPULAR_PROPERTIES];

export const TOP_LOCATIONS: LocationItem[] = [
  { id: 'l1', name: 'Uran Plots', image: 'https://picsum.photos/seed/loc1/300/300' },
  { id: 'l2', name: 'Chirle Plots', image: 'https://picsum.photos/seed/loc2/300/300' },
  { id: 'l3', name: 'Ranjanpada Plots', image: 'https://picsum.photos/seed/loc3/300/300' },
  { id: 'l4', name: 'Vindhane Plots', image: 'https://picsum.photos/seed/loc4/300/300' },
];

export const DREAM_CATEGORIES: CategoryItem[] = [
  {
    id: 'c1',
    title: 'Plots for Petrolpump',
    description: 'The biggest is for the land to be convenient for either travelers or local population.',
    image: 'https://picsum.photos/seed/gas/400/300'
  },
  {
    id: 'c2',
    title: 'Investment Plots',
    description: 'Your future prospects look great when you buy investment plots with regards to profitable returns.',
    image: 'https://picsum.photos/seed/invest/400/300'
  },
  {
    id: 'c3',
    title: 'Commercial Plots',
    description: 'Contact us for best returns on plots invested near junctions, stations, highways.',
    image: 'https://picsum.photos/seed/comm/400/300'
  },
  {
    id: 'c4',
    title: 'Residential Plots',
    description: 'In case you are a developer looking for land to expand your business.',
    image: 'https://picsum.photos/seed/res/400/300'
  }
];

export interface BlogItemExtended extends BlogItem {
    content?: string;
}

export const BLOGS: BlogItemExtended[] = [
  {
    id: 'b1',
    title: 'Mahamumbai - Your Future Investment Opportunity',
    excerpt: 'MAHAMUMBAI enjoys high property supply, demand is growing due to construction...',
    date: 'Oct 12, 2023',
    image: 'https://picsum.photos/seed/bridge/500/300',
    content: `
      <p>The concept of "Mahamumbai" or the Third Mumbai is gaining rapid traction among investors and homebuyers alike. With the upcoming Atal Setu (MTHL) bridge, connectivity between Mumbai and Navi Mumbai has improved drastically, reducing travel time significantly.</p>
      <br/>
      <h3 class="text-xl font-bold">Why Invest Now?</h3>
      <p>Property prices in this region are still competitive compared to Mumbai and Thane. The proposed airport and metro connectivity are set to boost infrastructure development, making it a hotspot for real estate appreciation.</p>
      <br/>
      <p>Whether you are looking for residential plots or commercial land, Mahamumbai offers a plethora of options that promise high returns in the next 5-10 years.</p>
    `
  },
  {
    id: 'b2',
    title: 'Why Thane is good for investment in Plots?',
    excerpt: 'Thane is an emerging cosmopolitan city in the Mumbai Metropolitan Area...',
    date: 'Sep 28, 2023',
    image: 'https://picsum.photos/seed/city/500/300',
    content: `
      <p>Thane has evolved from a satellite town to a robust cosmopolitan city. It boasts excellent connectivity to Mumbai via the Eastern Express Highway and the suburban railway network.</p>
      <br/>
      <h3 class="text-xl font-bold">Greenery and Infrastructure</h3>
      <p>Unlike the concrete jungle of Mumbai, Thane still retains much of its greenery, offering a better quality of life. The municipal corporation has been proactive in developing wide roads, parks, and civic amenities.</p>
    `
  },
  {
    id: 'b3',
    title: 'The Dos and Don\'ts of Buying Land',
    excerpt: 'Buying land is a dream for many people. Purchasing land is also one of the...',
    date: 'Aug 15, 2023',
    image: 'https://picsum.photos/seed/grass/500/300',
    content: `
      <p>Investing in land is lucrative but comes with its own set of risks. Here is a checklist to ensure a safe transaction.</p>
      <ul class="list-disc pl-5 mt-2 space-y-2">
        <li><strong>Do:</strong> Check the title deed thoroughly.</li>
        <li><strong>Do:</strong> Verify the land use zone (Residential/Commercial/Agricultural).</li>
        <li><strong>Don't:</strong> Rush into a deal without a physical site visit.</li>
        <li><strong>Don't:</strong> Forget to check for pending litigations or mortgages.</li>
      </ul>
    `
  }
];