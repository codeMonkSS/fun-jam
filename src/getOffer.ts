import { Offer } from './Offer';
import { Leg } from './Leg';

// private function
// formats the duration to be display friendly
const formatDuration = (duration: number): string => {
    try {
        const hours = Math.floor(duration / 60);
        let minutes: number | string = duration % 60;
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        return `${hours}h ${minutes}m`;
    } catch (err) {
        console.log("Error: formats the duration to be display friendly", err);
    }
};

// private function
// formats the date into a time of the day
const formatTimeOfDay = (dateTime: string): string => dateTime.split('T')[1];

// public function
// provides the caller with an offer where blob is the current fetch state
export const getOffer = (blob: any): Offer => {
    try {
        const legs: any[] = blob.legs;
        const segments: any[] = blob.segments;
        const offer: any = blob.offer;
        const flight: any = blob.flights[+offer['FlightIndex']];
        console.log(offer['FlightIndex']);
        console.log(blob.flights);
        let myLegs: Leg[] = [];
        flight['SegmentIndexes'].map((segIndex: number) => {
            const segment = segments[segIndex];
            const tmpLegs: Leg[] = segment['LegIndexes'].map((legIndex: number) => {
                const leg = legs[legIndex];
                const myLeg: Leg = {
                    departureAirport: leg['Origin']['Name'],
                    departureAirportCode: leg['Origin']['Iata'],
                    destinationAirport: leg['Destination']['Name'],
                    destinationAirportCode: leg['Destination']['Iata'],
                    departureTime: formatTimeOfDay(leg['Departure']),
                    arrivalTime: formatTimeOfDay(leg['Arrival']),
                    airlineName: leg['AirlineName'],
                    flightDuration: formatDuration(leg['Duration'])
                };
                return myLeg;
            });
            myLegs = [...myLegs, ...tmpLegs];
        });
        return {
            legs: myLegs,
            priceOfTicket: offer.Price,
            url: offer.Deeplink
        };
    } catch (err) {
        console.log("Error: provides the caller with an offer where blob is the current fetch state: ", err);
    }
};
