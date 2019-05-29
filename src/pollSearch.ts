import { getHttpRequest } from './getHttpRequest';
import { Observable } from 'rxjs';

const searchEndpoint = 'https://stjxo8vo34.execute-api.eu-west-1.amazonaws.com/prod/flight-search/1.2';

export function pollSearch(uuid: string): Observable<any> {
    return getHttpRequest(`${searchEndpoint}/${uuid}`);
}