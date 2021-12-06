import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BackEndServiceGet} from './back-end-service-get';

@Injectable({
    providedIn: 'root'
})
export class BackEndServiceService extends BackEndServiceGet {

    constructor(public http: HttpClient) {
        super(http);
    }

    request(type: 'get', url: string): Observable<any> {
        return new Observable(obs => {
                if (type === 'get') {
                    this.getRequest(url).subscribe(
                        {
                            next: data => obs.next(data),
                            error: err => obs.error(err)
                        }
                    );
                }
            }
        );


    }
}
