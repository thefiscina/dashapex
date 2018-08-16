import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RequestService {
// apiUrl = 'https://apiapex.herokuapp.com/api/v1/';
apiUrl = 'http://localhost:5000/api/v1/';
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

      putDadosCabecalhoService(data, id) {    
        return new Promise((resolve, reject) => {
          this.http.put(this.apiUrl+'cabecalho/' + id, JSON.stringify(data), {
            headers: new HttpHeaders().set("Content-Type", "application/json")        
          })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      salvarDadosSobre(data) {    
        return new Promise((resolve, reject) => {
          this.http.post(this.apiUrl+'sobre/', JSON.stringify(data), {
            headers: new HttpHeaders().set("Content-Type", "application/json")        
          })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      getDadosSobreService(data) {    
        return new Promise((resolve, reject) => {
          this.http.post(this.apiUrl+'sobre/service/', JSON.stringify(data), {
            headers: new HttpHeaders().set("Content-Type", "application/json")        
          })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      putDadosSobreService(data, id) {    
        return new Promise((resolve, reject) => {
          this.http.put(this.apiUrl+'sobre/' + id, JSON.stringify(data), {
            headers: new HttpHeaders().set("Content-Type", "application/json")        
          })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }


      getEvento(eventoid) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'evento/'+eventoid,               
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

      salvarEvento(data) {    
        return new Promise((resolve, reject) => {
          this.http.post(this.apiUrl+'evento/', JSON.stringify(data), {
            headers: new HttpHeaders().set("Content-Type", "application/json")        
          })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      getEventoService(data) {    
        return new Promise((resolve, reject) => {
          this.http.post(this.apiUrl+'evento/service/', JSON.stringify(data), {
            headers: new HttpHeaders().set("Content-Type", "application/json")        
          })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      putEvento(data, id) {    
        return new Promise((resolve, reject) => {
          this.http.put(this.apiUrl+'evento/' + id, JSON.stringify(data), {
            headers: new HttpHeaders().set("Content-Type", "application/json")        
          })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      deleteEvento(id) {    
        return new Promise((resolve, reject) => {
          this.http.delete(this.apiUrl+'evento/' + id ,{
            headers: new HttpHeaders().set("Content-Type", "application/json")        
          })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }


      getProjeto(eventoid) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + 'projeto/'+eventoid,               
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

      salvarProjeto(data) {    
        return new Promise((resolve, reject) => {
          this.http.post(this.apiUrl+'projeto/', JSON.stringify(data), {
            headers: new HttpHeaders().set("Content-Type", "application/json")        
          })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      getProjetoService(data) {    
        return new Promise((resolve, reject) => {
          this.http.post(this.apiUrl+'projeto/service/', JSON.stringify(data), {
            headers: new HttpHeaders().set("Content-Type", "application/json")        
          })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      putProjeto(data, id) {    
        return new Promise((resolve, reject) => {
          this.http.put(this.apiUrl+'projeto/' + id, JSON.stringify(data), {
            headers: new HttpHeaders().set("Content-Type", "application/json")        
          })
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
      }

      deleteProjeto(id) {    
        return new Promise((resolve, reject) => {
          this.http.delete(this.apiUrl+'projeto/' + id ,{
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