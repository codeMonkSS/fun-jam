import { Observable } from 'rxjs';
import { getHttpRequest } from './getHttpRequest';
import { map } from 'rxjs/operators';

// the REST endpoint that responds with UUID/GUID
const uuidEndpoint = 'https://www.uuidgenerator.net/api/version1';

// provides the caller with a UUID/GUID
export function getUUID(): Observable<string> {
    return getHttpRequest(uuidEndpoint).pipe(
        map((uuid: any) => {
            return (<string>uuid);
        })
    );
}