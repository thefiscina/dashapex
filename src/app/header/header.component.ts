import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public item = localStorage.getItem('user')
  public user = "";
  constructor(private router: Router) {
    if (this.item == "" || this.item == null) {
      this.router.navigate(['/'])
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
      console.log(this.user);
      if (this.user == null || this.user == "") {
        this.router.navigate(['/'])
      }
    }
  }

  ngOnInit() {

  }

}
