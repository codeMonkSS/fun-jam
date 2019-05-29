import { getUUID } from './getUUID';
import { getHttpRequest } from './getHttpRequest';
import { mergeMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const searchEndpoint = 'https://stjxo8vo34.execute-api.eu-west-1.amazonaws.com/prod/flight-search/1.2';

export function startSearch(): Observable<any> {
    let guid = '';
    return getUUID().pipe(
        mergeMap((uuid: string) => {
            guid = uuid;
            return getHttpRequest(`${searchEndpoint}/${uuid}`);
        }),
        map((results) => {
            return { results, guid };
        })
    );
}