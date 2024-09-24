export type Venue = {
  id: string;
  name: string;
  description?: string;
  address: {
    country: string;
    zipCode: string;
    city: string;
    street: string;
  };
};
