import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../shared/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  Eventos: any;
  public loading = false;
  private user = JSON.parse(localStorage.getItem('user'));
  constructor(private formBuilder: FormBuilder, public router: Router, private _services: RequestService, private spinner: NgxSpinnerService) {
    this.router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        switch (event["url"]) {
          case "/home/evento":
            {
              this.carregarDados();
              break;
            }
        }
      }
    });
  }

  ngOnInit() {    
    // this.carregarDados();
  }

  carregarDados(){
    if (this.user.serviceID != null) {
      this.loading = true;
      var dado = { serviceID: this.user.serviceID }
      this._services.getEventoService(dado).then((result) => {
        this.Eventos = result["result"];
        this.loading = false;
      }, (err) => {
        this.loading = false;
        console.log('erro ao solicitar');
      });
    }
  }

  excluirEvento(id){
    if (this.user.serviceID != null) {   
      this._services.deleteEvento(id).then((result) => {
        this.carregarDados();
      }, (err) => {
        console.log('erro ao solicitar');
      });
    }

  }



}
