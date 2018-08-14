import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../shared/user.service';
@Component({
  selector: 'app-editarsobrenos',
  templateUrl: './editarsobrenos.component.html',
  styleUrls: ['./editarsobrenos.component.css']
})
export class EditarsobrenosComponent implements OnInit {
  DadosSobreNos: FormGroup;
  private user = JSON.parse(localStorage.getItem('user'));
  constructor(private formBuilder: FormBuilder, private _services: RequestService) {

    this.DadosSobreNos = this.formBuilder.group({
      titulo: ['', Validators.required],
      texto: [''],
      foto: [''],
      serviceID: [this.user.serviceID],
    });
   }

  ngOnInit() {
    
  }

  SalvarDadosSobreNos(){

  }
}
