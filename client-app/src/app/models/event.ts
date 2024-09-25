import { Venue } from "./venue";

export type Event = {
  id: string;
  title: string;
  description: string;
  dateTime: Date;
  venue: Venue;
};
