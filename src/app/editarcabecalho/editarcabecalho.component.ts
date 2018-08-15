import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../shared/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-editarcabecalho',
  templateUrl: './editarcabecalho.component.html',
  styleUrls: ['./editarcabecalho.component.css']
})
export class EditarcabecalhoComponent implements OnInit {
  DadosCabecalho: FormGroup;
  Servico: any;
  fotoslider164: any;
  fotoslider264: any;
  fotoslider364: any;
  logo64: any;

  private user = JSON.parse(localStorage.getItem('user'));
  constructor(private formBuilder: FormBuilder, private _services: RequestService,private spinner: NgxSpinnerService) {
    this.DadosCabecalho = this.formBuilder.group({
      logo: [''],
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
      var dado = { serviceID: this.user.serviceID }
      this._services.getDadoscabecalhoService(dado).then((result) => {
        this.Servico = result["result"];
        console.log(this.Servico);
        if (this.Servico.length > 0) {
          this.popularDados(this.Servico[0])
        }else{
          this.Servico = null;
        }
      }, (err) => {
        console.log('erro ao solicitar');
      });
    }
  }

  popularDados(dados) {
    this.DadosCabecalho.controls.fotoslider164.setValue(dados.fotoslider164);
    this.DadosCabecalho.controls.fotoslider264.setValue(dados.fotoslider264);
    this.DadosCabecalho.controls.fotoslider364.setValue(dados.fotoslider364);
    this.DadosCabecalho.controls.logo64.setValue(dados.logo64);
    this.DadosCabecalho.controls.serviceID.setValue(dados.serviceID);
    this.DadosCabecalho.controls.subtituloslider1.setValue(dados.subtituloslider1);
    this.DadosCabecalho.controls.subtituloslider2.setValue(dados.subtituloslider2);
    this.DadosCabecalho.controls.subtituloslider3.setValue(dados.subtituloslider3);
    this.DadosCabecalho.controls.tituloslider1.setValue(dados.tituloslider1);
    this.DadosCabecalho.controls.tituloslider2.setValue(dados.tituloslider2);
    this.DadosCabecalho.controls.tituloslider3.setValue(dados.tituloslider3);
    this.fotoslider164 = dados.fotoslider164;
    this.fotoslider264 = dados.fotoslider264;
    this.fotoslider364 = dados.fotoslider364;
    this.logo64 = dados.logo64;
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
          this.logo64 = myReader.result;
          break;
        case 'slider1':
          this.DadosCabecalho.controls.fotoslider164.setValue(myReader.result);
          this.fotoslider164 = myReader.result;
          break;
        case 'slider2':
          this.DadosCabecalho.controls.fotoslider264.setValue(myReader.result);
          this.fotoslider264 = myReader.result;
          break;
        case 'slider3':
          this.DadosCabecalho.controls.fotoslider364.setValue(myReader.result);
          this.fotoslider364 = myReader.result;
          break;
      }

    }
    myReader.readAsDataURL(file);
  }

  SalvarDadosCabecalho() {
    this.spinner.show();
    console.log(this.DadosCabecalho.value);
    if (this.Servico != null) {
      this._services.putDadosCabecalhoService(this.DadosCabecalho.value, this.Servico[0]._id).then((result) => {
        this.Servico = result["result"];
        console.log(this.Servico);
        this.spinner.hide();
      }, (err) => {
        console.log('erro ao solicitar');
      });
    } else {
      this._services.salvarDadoscabecalho(this.DadosCabecalho.value).then((result) => {
        this.Servico = result["result"];
        console.log(this.Servico);
        this.spinner.hide();
      }, (err) => {
        console.log('erro ao solicitar');
      });
    }
  }


}
