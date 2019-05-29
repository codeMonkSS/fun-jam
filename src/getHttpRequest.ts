import { RxHR, RxHttpRequestResponse } from '@akanass/rx-http-request';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// sends a GET request to the provided url
export const getHttpRequest = (url: string): Observable<any> => {
    try {
        console.log(`GET requesting url: \n${url}\n`);
        return RxHR.get(url).pipe(
            map((http: RxHttpRequestResponse) => {
                return http.response.body;
            })
        );
    } catch (err) {
        console.log("Error: sends a GET request to the provided url", err);
    }
};

