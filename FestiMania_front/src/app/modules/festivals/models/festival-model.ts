export interface Festival {
  id?: string,
  name: string;
  location: Location;
  dateStart: string;
  dateEnd: string;
  genres: string[];
  artists: Artist[];
  ticketPrice: TicketPrice;
  capacity: number;
}

interface TicketPrice {
  average: number;
  currency: string;
}

interface Artist {
  id: string;
  name: string;
  genres: string[];
  nationality: string;
}

interface Location {
  city: string;
  state: string;
  country: string;
}