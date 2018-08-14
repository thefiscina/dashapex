import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../shared/user.service';

@Component({
  selector: 'app-editarcabecalho',
  templateUrl: './editarcabecalho.component.html',
  styleUrls: ['./editarcabecalho.component.css']
})
export class EditarcabecalhoComponent implements OnInit {
  DadosCabecalho: FormGroup;
  Servico: any;
  private user = JSON.parse(localStorage.getItem('user'));
  constructor(private formBuilder: FormBuilder, private _services: RequestService) {
    this.DadosCabecalho = this.formBuilder.group({
      logo: ['', Validators.required],
      tituloslider1: [''],
      subtituloslider1: [''],
      fotoslider1: [''],
      tituloslider2: [''],
      subtituloslider2: [''],
      fotoslider2: [''],
      tituloslider3: [''],
      subtituloslider3: [''],
      fotoslider3: [''],
      logo64: [''],
      fotoslider164: [''],
      fotoslider264: [''],
      fotoslider364: [''],
      serviceID: [this.user.serviceID],
    });

  }

  ngOnInit() {  
    if (this.user.serviceID != null) {
      var dado = {serviceID: this.user.serviceID}
      this._services.getDadoscabecalhoService(dado).then((result) => {        
        this.Servico = result["result"];
        console.log(this.Servico);
        if(this.Servico.length > 0){
          this.popularDados(this.Servico[0])
        }
      }, (err) => {
        console.log('erro ao solicitar');
      });
    }
  }
  popularDados(dados){

  }
  changeListener($event, str): void {
    this.readThis($event.target, str);
  }

  readThis(inputValue: any, str): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      switch (str) {
        case 'logo':
          this.DadosCabecalho.controls.logo64.setValue(myReader.result);
          break;
        case 'slider1':
          this.DadosCabecalho.controls.fotoslider164.setValue(myReader.result);
          break;
        case 'slider2':
          this.DadosCabecalho.controls.fotoslider264.setValue(myReader.result);
          break;
        case 'slider3':
          this.DadosCabecalho.controls.fotoslider364.setValue(myReader.result);
          break;
      }

    }
    myReader.readAsDataURL(file);
  }

  SalvarDadosCabecalho() {
    console.log(this.DadosCabecalho.value);
    this._services.salvarDadoscabecalho(this.DadosCabecalho.value).then((result) => {
      this.Servico = result["result"];
      console.log(this.Servico);

    }, (err) => {
      console.log('erro ao solicitar');
    });
  }

}
