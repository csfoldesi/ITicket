export type VenueModel = {
  id?: string;
  name: string;
  description?: string;
  address: {
    country: string;
    zipCode: string;
    city: string;
    street: string;
  };
};

export type CreateVenueModel = {
  id?: string;
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
      id: undefined,
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

  static VenueModel_CreateVenueModel(source: VenueModel): CreateVenueModel {
    return { ...source };
  }
}

export type VenueSearchDto = {
  name?: string;
};
