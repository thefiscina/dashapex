import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../shared/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-editarsobrenos',
  templateUrl: './editarsobrenos.component.html',
  styleUrls: ['./editarsobrenos.component.css']
})
export class EditarsobrenosComponent implements OnInit {
  DadosSobreNos: FormGroup;
  Servico:any;
  foto:string='';
  public loading = false;
  private user = JSON.parse(localStorage.getItem('user'));
  constructor(private formBuilder: FormBuilder, private _services: RequestService,private spinner: NgxSpinnerService) {
    this.DadosSobreNos = this.formBuilder.group({
      titulo: [''],
      texto: [''],
      foto64: [''],
      foto1:[''],
      serviceID: [this.user.serviceID]
    });
   }

   ngOnInit() {
    if (this.user.serviceID != null) {
      this.loading = true;
      var dado = { serviceID: this.user.serviceID }
      this._services.getDadosSobreService(dado).then((result) => {
        this.Servico = result["result"];
        this.loading = false;
        if (this.Servico.length > 0) {
          this.popularDados(this.Servico[0])
        }else{
          this.Servico = null;
        }
      }, (err) => {
        this.loading = false;
        console.log('erro ao solicitar');
      });
    }
  }

  popularDados(dados) {
    this.DadosSobreNos.controls.titulo.setValue(dados.titulo);
    this.DadosSobreNos.controls.texto.setValue(dados.texto);
    this.DadosSobreNos.controls.foto64.setValue(dados.foto64);    
    this.foto = dados.foto64;
    this.DadosSobreNos.controls.serviceID.setValue(dados.serviceID);    
  }

  changeListener($event, str): void {
    this.readThis($event.target, str);
  }

  readThis(inputValue: any, str): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {      
      switch (str) {
        case 'foto':
        this.DadosSobreNos.controls.foto64.setValue(myReader.result);
        this.foto = myReader.result;
          break;        
      }
    }
    myReader.readAsDataURL(file);
  }

  SalvarDadosSobreNos(){
    console.log(this.DadosSobreNos.value);
    if (this.Servico != null) {
      this._services.putDadosSobreService(this.DadosSobreNos.value, this.Servico[0]._id).then((result) => {
        this.Servico = result["result"];        
      }, (err) => {
        console.log('erro ao solicitar');
      });
    } else {
      this._services.salvarDadosSobre(this.DadosSobreNos.value).then((result) => {
        this.Servico = result["result"];        
      }, (err) => {
        console.log('erro ao solicitar');
      });
    }
  }
}
