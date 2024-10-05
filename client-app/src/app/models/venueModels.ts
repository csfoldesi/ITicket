export type VenueModel = {
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

export class Venue {
  static VenueModel(): VenueModel {
    return {
      id: "",
      name: "",
      description: "",
      address: {
        country: "",
        zipCode: "",
        city: "",
        street: "",
      },
    };
  }
}
