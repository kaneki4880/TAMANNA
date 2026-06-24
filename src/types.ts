export interface Table {
  id: string;
  name: string;
  capacity: number;
  isAvailable: boolean;
  type: 'Window Side' | 'VIP Booth' | 'Main Salon' | 'Chef\'s Table' | 'Garden Terrace';
}

export interface Restaurant {
  id: string;
  name: string;
  designTheme: string;
  description: string;
  longDescription: string;
  rating: number;
  reviewsCount: number;
  image: string;
  additionalImages: string[];
  materialPalette: string[];
  colorScheme: {
    name: string;
    hexes: string[];
  };
  keyElements: string[];
  basePriceTable: number; // Booking fee / deposit
  basePriceFullVenue: number; // Venue buy-out deposit
  tables: Table[];
  address: string;
}

export interface Booking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantImage: string;
  userId: string;
  bookingType: 'table' | 'full_venue';
  date: string;
  time: string;
  guests: number;
  tableId?: string;
  tableName?: string;
  paymentStatus: 'paid' | 'pending';
  amount: number;
  createdAt: string;
  notes?: string;
  partyType?: string; // e.g. "Birthday Party", "Corporate Event"
  stylingPreference?: string; // Custom decor details requested
}

export interface Review {
  id: string;
  restaurantId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  ratingInterior: number;
  ratingFood: number;
  ratingService: number;
  comment: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'info' | 'success' | 'alert';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  preferredStyle: string;
}
