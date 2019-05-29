import { pollSearch } from './pollSearch';
import { getOffer } from './getOffer';
import { Offer } from './Offer';
import { startSearch } from './startSearch';
import { appendCardsToDOM } from './appendCardsToDOM';

// application state
let flights: any[] = [];
let legs: any[] = [];
let offers: any[] = [];
let segments: any[] = [];

let done = false;
let resultNumber = -1;
let uuid = '';

let cards: Offer[] = [];
// end application state

// private function
// subscribes to polling request
const doPoll = (guid: string): void => {
    try {
        pollSearch(guid).subscribe((res) => {
            const results = JSON.parse(res);
            console.log(`results:\n${JSON.stringify(results, null, 4)}`);
            saveResults(results);
        });
    } catch (err) {
        console.log("Error: subscribes to polling request: ", err);
    }
};

// private function
// subscribes to the search request
const doSearch = (): void => {
    try {
        startSearch().subscribe((res) => {
            uuid = res.guid;
            const results = JSON.parse(res.results);
            console.log(`results:\n${JSON.stringify(results, null, 2)}`);
            saveResults(results);
        });
    } catch (err) {
        console.log("Error: subscribes to the search request", err);
    }
};

// accumulates lists in application state
// appends search results to DOM
const saveResults = (results: any): void => {
    try {
        const tmpResultNumber = resultNumber + 1;
        if (results['ResultNumber'] === tmpResultNumber) {
            resultNumber = tmpResultNumber;
            done = results['Done'];

            flights = results['Flights'] ? [...flights, ...results['Flights']] : flights;
            legs = results['Legs'] ? [...legs, ...results['Legs']] : legs;
            segments = results['Segments'] ? [...segments, ...results['Segments']] : segments;

            if (results['Offers']) {
                offers = [...offers, ...results['Offers']];
                let newCards: Offer[] = results['Offers'].map((offer: any) => {
                    return getOffer({flights, legs, offer, segments});
                });
                cards = [...cards, ...newCards].sort((a: Offer, b: Offer) => a.priceOfTicket > b.priceOfTicket ? -1 : 0);
                //cards = [...newCards, ...cards].sort((a: Offer, b: Offer) => a.priceOfTicket > b.priceOfTicket ? 1 : -1);
                appendCardsToDOM(cards);
            }
        }
    } catch (err) {
        console.log("Error: appends search results to DOM: ", err);
    }
};

// main application loop
((): void => {
    // poll for new results every 2 seconds
    // exit when search is done
    try {
        const refreshID = setInterval(() => {
            if (!done) {
                uuid ? doPoll(uuid) : doSearch();
            } else {
                clearInterval(refreshID);

                console.log('');
                console.log('');
                console.log(JSON.stringify(cards, null, 4));
                console.log('');
                console.log('');
                console.log("Done: ", done);
                console.log('');
                console.log('');
                console.log('end of main function');

                return;
            }
        }, 2000);
    } catch(err) {
        console.log("Error: main application loop: ",err);
    }
})();
