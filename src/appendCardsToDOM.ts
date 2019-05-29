import { Offer } from './Offer';
import { Leg } from './Leg';

// provides caller with an HTML component with interpolated Leg data
const getLegComponent = (leg: Leg): string => `
        <div class="c-flights_ticket-summary-segment">
            <div class="c-flights_ticket-summary-segment-carriers">
                ${leg.airlineName}
            </div>
            <div class="c-flights_ticket-summary-segment-location c-flights_ticket-summary-segment-location--origin">
                <div class="c-flights_ticket-summary-segment-iata_time">
                    <div class="c-flights_ticket-summary-segment-iata">${leg.departureAirportCode}</div>
                    <div class="c-flights_ticket-summary-segment-time">${leg.departureTime}</div>
                </div>
                <div class="c-flights_ticket-summary-segment-place">${leg.departureAirport}</div>
            </div>
            <div class="c-flights_ticket-summary-segment-route">
                <div class="c-flights_ticket_route">
                    <div class="c-flights_ticket_route-container">
                        <div class="c-flights_ticket_route-duration">${leg.flightDuration}</div>
                        <div class="c-flights_ticket_route-stops">
                            <svg class="c-flights_ticket_route-stops-svg" width="100%" height="20" focusable="false">
                                <line class="c-flights_ticket_route-stops-svg-line" x1="2" y1="3" x2="100%" y2="3" stroke-width="2" transform="translate(-1)"></line>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            <div class="c-flights_ticket-summary-segment-location c-flights_ticket-summary-segment-location--destination">
                <div class="c-flights_ticket-summary-segment-iata_time">
                    <div class="c-flights_ticket-summary-segment-iata">${leg.destinationAirportCode}</div>
                    <div class="c-flights_ticket-summary-segment-time">${leg.arrivalTime}</div>
                </div>
                <div class="c-flights_ticket-summary-segment-place">${leg.destinationAirport}</div>
            </div>
        </div>
    `;

// provides caller with an HTML component with interpolated Offer data
const getOfferComponent = (offer: Offer): string => {
    // iterate through Legs and get a component for each Leg
    const legComponent: string = offer.legs.map((leg: Leg) => getLegComponent(leg)).join('');
    return `
        <div class="c-flights_ticket">
            <div class="c-flights_ticket-container">
                <div class="c-flights_ticket-content" theme="secondary">
                    <div class="c-flights_ticket-summary">
                        <div class="c-flights_ticket-summary-content">
                            <div class="c-flights_ticket-summary-header">
                            </div>
                            <div class="c-flights_ticket-summary-segments">
                                ${legComponent}
                            </div>
                        </div>
                        <div class="c-flights_ticket-summary-deal">
                            <div class="c-flights_ticket-summary-deal-main">
                                <div class="c-flights_ticket-summary-deal-prices">
                                    <div class="c-flights_ticket-summary-deal-price c-flights_ticket-summary-deal-price--single">
                                        ${offer.priceOfTicket} HUF
                                    </div>
                                </div>
                            </div>
                            <div class="c-flights_ticket-summary-deal-footer">
                                <div 
                                    class="c-flights_ticket-summary-deal-button c-button c-push_button" theme="redirect"
                                >
                                    <div class="c-button-layers">
                                        <div class="c-button-outline"></div>
                                        <div class="c-button-fill"></div>
                                    </div>
                                    <div 
                                        onclick="window.open('${offer.url}', '_blank')"
                                        class="c-button-content"
                                    >
                                        Book
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// the public function for this file 
export const appendCardsToDOM = (cards: Offer[], clearDOM = true): void => {
    try {
        // iterate through cards, getting an html component for each card
        const offerComponents: string = cards.map((card: Offer) => getOfferComponent(card)).join('');
        // select element to be appended to
        const bodyContent: Element | null = document.querySelector('div.c-app_developertest-body-content');
        if (bodyContent) {
            // append component to DOM
            bodyContent.innerHTML = clearDOM ? offerComponents : (offerComponents + bodyContent.innerHTML);
        }
    } catch (err) {
        console.log("Error: the public function for appendCardsToThisDOM file: ", err);
    }
};
