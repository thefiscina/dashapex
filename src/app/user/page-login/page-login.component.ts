import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../shared/user.service';
import { Router } from '@angular/router';
import { appRoutes } from '../../routes';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {
  Userauth: any;
  constructor(private _services: RequestService, private router: Router) { 
    localStorage.setItem('user', "");

  }

  ngOnInit() {
  }

  OnSubmit(email, senha) {    
    var data = {
      email: email,
      senha: senha
    }
    this._services.LoginAuth(data).then((result) => {
      this.Userauth = result["result"];
      console.log(this.Userauth);
      localStorage.setItem('user', JSON.stringify(this.Userauth[0]));
      this.encaminharParaHome()
    }, (err) => {
      console.log('erro ao solicitar');
    });
  }

  encaminharParaHome() {    
   this.router.navigate(['home'])
  }
}
