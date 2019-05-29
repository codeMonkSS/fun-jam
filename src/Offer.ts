import { Leg } from "./Leg";

export interface Offer {
    priceOfTicket: string;
    legs: Leg[];
    url: string;
}
