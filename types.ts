export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  size?: string;
  type: 'Villa' | 'Bungalow' | 'Plot' | 'Residential' | 'Commercial';
  image: string;
  images?: string[]; // Added for image carousel
  status?: string; // e.g., "Ready Move"
  isFeatured?: boolean;
  description?: string;
  amenities?: string[];
  bedBath?: string;
  videoUrl?: string;
}

export interface LocationItem {
  id: string;
  name: string;
  image: string;
}

export interface BlogItem {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
}