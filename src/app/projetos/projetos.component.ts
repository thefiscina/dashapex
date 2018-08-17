import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../shared/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';


@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {

  Projetos: any;
  private user = JSON.parse(localStorage.getItem('user'));
  constructor(private formBuilder: FormBuilder, public router: Router, private _services: RequestService, private spinner: NgxSpinnerService) {
    this.router.events.forEach((event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        console.log(event.url);
        switch (event["url"]) {
          case "/home/projeto":
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
      var dado = { serviceID: this.user.serviceID }
      this._services.getProjetoService(dado).then((result) => {
        this.Projetos = result["result"];
        console.log(this.Projetos);

      }, (err) => {
        console.log('erro ao solicitar');
      });
    }
  }

  excluirprojeto(id){
    if (this.user.serviceID != null) {   
      this._services.deleteProjeto(id).then((result) => {
        this.carregarDados();
      }, (err) => {
        console.log('erro ao solicitar');
      });
    }
  }

}
