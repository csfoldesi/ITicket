import { Venue, VenueModel } from "./venueModels";

export type EventModel = {
  id?: string;
  title: string;
  description: string;
  dateTime: Date;
  venue: VenueModel;
};

export type CreateEventModel = {
  id?: string;
  venueId: string;
  title: string;
  description: string;
  dateTime: string;
};

export class Event {
  static EventModel(): EventModel {
    return {
      id: undefined,
      title: "",
      description: "",
      dateTime: new Date(),
      venue: Venue.VenueModel(),
    };
  }

  static EventModel_CreateEventModel(source: EventModel): CreateEventModel {
    return {
      id: source.id,
      venueId: source.venue.id!,
      title: source.title,
      description: source.description,
      dateTime: source.dateTime.toISOString(),
    };
  }
}
