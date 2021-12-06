import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export class BackEndServiceGet {
    constructor(public http: HttpClient) {
    }

    public getRequest(url: string): Observable<any> {
        return this.http.get(url);
    }
}
