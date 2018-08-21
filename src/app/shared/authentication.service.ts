import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
    apiUrl = 'https://apiapex.herokuapp.com/api/v1/';
    // apiUrl = 'http://localhost:5000/api/v1/';
    constructor(private http: HttpClient) { }

    login(data) {
        return this.http.post(this.apiUrl + 'users/auth/', JSON.stringify(data), {
            headers: new HttpHeaders().set("Content-Type", "application/json")
        })
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}