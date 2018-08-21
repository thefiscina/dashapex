import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {
  Userauth: any;
  loading = false;
  returnUrl: string;
  constructor(private _services: RequestService, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {
    localStorage.setItem('user', "");

  }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  OnSubmit(email, senha) {
    var data = {
      email: email,
      senha: senha
    }    
    this.loading = true;
    this.authenticationService.login(data).subscribe((user) => {
      var usuario =user["result"][0]; 
      if (usuario && usuario["_id"]) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(usuario));
        localStorage.setItem('user', JSON.stringify(usuario));
      }
      this.router.navigate([this.returnUrl]);
    }, (err) => {

      this.loading = false;
    });   
  } 
}
