import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ROOT_URL } from "../users/services/users.service";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(private http: HttpClient) {
    }

    addSubscription(payload: any) {
        return this.http.post(ROOT_URL + '/subscription', payload);
    }

    sendNotification() {
        return this.http.post(ROOT_URL + '/send-notification', null);
    }
}