import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RequestService {
apiUrl = 'https://apiapex.herokuapp.com/api/v1/';
// apiUrl = 'http://localhost:5000/api/v1/';
    constructor(private http: HttpClient) { }
    getUsers() {
        return new Promise(resolve => {
            this.http.get(this.apiUrl+'users/',               
            ).subscribe(data => {
                resolve(data);
            }, err => {
                console.log(err);
                if (err.status == 401) {
                    resolve(err)
                }
            });
        });
    }

    LoginAuth(data) {    
        return new Promise((resolve, reject) => {
          this.http.post(this.apiUrl+'users/auth/', JSON.stringify(data), {
            headers: new HttpHeaders().set("Content-Type", "application/json")        
          })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      getService(servicoid) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'servicos/'+servicoid,               
            ).subscribe(data => {
                resolve(data);
            }, err => {
                console.log(err);
                if (err.status == 401) {
                    resolve(err)
                }
            });
        });
    }

    putService(dado, servicoid) {
        return new Promise(resolve => {
            this.http.put(this.apiUrl + 'servicos/'+ servicoid, JSON.stringify(dado),{
                headers: new HttpHeaders().set("Content-Type", "application/json")        
              }            
            ).subscribe(data => {
                resolve(data);
            }, err => {
                console.log(err);
                if (err.status == 401) {
                    resolve(err)
                }
            });
        });
    }

    salvarDadoscabecalho(data) {    
        return new Promise((resolve, reject) => {
          this.http.post(this.apiUrl+'cabecalho/', JSON.stringify(data), {
            headers: new HttpHeaders().set("Content-Type", "application/json")        
          })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      getDadoscabecalhoService(data) {    
        return new Promise((resolve, reject) => {
          this.http.post(this.apiUrl+'cabecalho/service/', JSON.stringify(data), {
            headers: new HttpHeaders().set("Content-Type", "application/json")        
          })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }
    
}