import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user = JSON.parse(localStorage.getItem('user'));
  constructor(private router: Router) {
    console.log(this.user);
    if(this.user == null){
     this.router.navigate(['/'])
    }

   }

  ngOnInit() {
    
  }

}
