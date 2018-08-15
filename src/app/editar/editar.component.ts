import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../shared/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})


export class EditarComponent implements OnInit {
  DadosContato: FormGroup;
  Servico:any;
  private user = JSON.parse(localStorage.getItem('user'));
  constructor(private formBuilder: FormBuilder, private _services : RequestService,private spinner: NgxSpinnerService) { 
    this.DadosContato = this.formBuilder.group({
      nome: ['', Validators.required],
      telefone1: [''],
      telefone2: [''],
      email: ['', [Validators.required, Validators.email]],
      endereco: [''],
      linkedin: [''],
      twitter: [''],
      facebook: ['']
    });

  }


  ngOnInit() {
    this._services.getService(this.user.serviceID).then((result) => {             
      this.Servico = result["result"];
      console.log(this.Servico); 
      this.popularDados(this.Servico);
    }, (err) => {   
      console.log('erro ao solicitar');   
    });   
  }

  popularDados(dados){    
    this.DadosContato.controls['nome'].setValue(dados.nome);    
    this.DadosContato.controls['telefone1'].setValue(dados.telefone1);    
    this.DadosContato.controls['telefone2'].setValue(dados.telefone2);    
    this.DadosContato.controls['email'].setValue(dados.email);    
    this.DadosContato.controls['endereco'].setValue(dados.endereco);    
    this.DadosContato.controls['linkedin'].setValue(dados.linkedin);    
    this.DadosContato.controls['twitter'].setValue(dados.twitter);    
    this.DadosContato.controls['facebook'].setValue(dados.facebook);        
  }

  SalvarDadosContato(){           
    this.spinner.show();
    this._services.putService(this.DadosContato.value, this.user.serviceID).then((result) => {             
      this.Servico = result["result"];
      this.spinner.hide();
      console.log(this.Servico); 
    }, (err) => {   
      console.log('erro ao solicitar');   
    });   
  }

}
