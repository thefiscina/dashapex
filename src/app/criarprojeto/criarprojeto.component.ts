import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../shared/user.service';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/pt';

@Component({
  selector: 'app-criarprojeto',
  templateUrl: './criarprojeto.component.html',
  styleUrls: ['./criarprojeto.component.css']
})
export class CriarprojetoComponent implements OnInit {

  ProjetoID: any;
  Titulo: any;
  DadosProjeto: FormGroup;
  foto:any;  
  private user = JSON.parse(localStorage.getItem('user'));
  
  options: DatepickerOptions = {
    minYear: 2018,
    maxYear: 2030,
    displayFormat: 'MMM D[,] YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: frLocale,
    minDate: new Date(Date.now()), // Minimal selectable date
    // maxDate: new Date(Date.now()),  // Maximal selectable date
    barTitleIfEmpty: 'Selecione',
    placeholder: 'Clique para selecionar uma data', // HTML input placeholder attribute (default: '')
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };

  constructor(private formBuilder: FormBuilder, private _services: RequestService, public router: Router, public route: ActivatedRoute) {
    this.DadosProjeto = this.formBuilder.group({
      titulo: [''],
      data_hora: [''],
      hora:[''],      
      foto64: [''],
      foto: [''],
      descricao: [''],
      serviceID: [this.user.serviceID],
    });

    

  }

  ngOnInit() {
    this.ProjetoID = this.route.snapshot.params['id'];
    if (this.ProjetoID != null) {
      this.Titulo = "Editar Projeto";     
      this._services.getProjeto(this.ProjetoID).then((result) => {        
        console.log(result);
        this.popularDados(result["result"]);
      }, (err) => {
        console.log('erro ao solicitar');
      });    
    } else {
      this.Titulo = "Criar Projeto";
    }
    // this.router.navigate(['/empresa']);
  }

  popularDados(dados){
    this.DadosProjeto.controls.titulo.setValue(dados.titulo);
    this.DadosProjeto.controls.data_hora.setValue(dados.data_hora);
    this.DadosProjeto.controls.hora.setValue(dados.hora);
    this.DadosProjeto.controls.descricao.setValue(dados.descricao);    
    this.DadosProjeto.controls.foto64.setValue(dados.foto64);
    this.foto = dados.foto64;
    this.DadosProjeto.controls.serviceID.setValue(dados.serviceID);
  }

  SalvarProjeto() {
    console.log(this.DadosProjeto.value);
    console.log(this.DadosProjeto.value.hora);
    var hora_ = '';
    if(this.DadosProjeto.value.hora != ''){
      hora_ =  this.DadosProjeto.value.hora.substring(2,0) + ":" + this.DadosProjeto.value.hora.substring(2,this.DadosProjeto.value.hora.length);
      this.DadosProjeto.value.hora = hora_;
    }
   

    if (this.ProjetoID != null) {
      this._services.putProjeto(this.DadosProjeto.value, this.ProjetoID).then((result) => {
            this.router.navigate(['/home/projeto']);
      }, (err) => {
        console.log('erro ao solicitar');
      });
    } else {
      this._services.salvarProjeto(this.DadosProjeto.value).then((result) => {     
        this.router.navigate(['/home/projeto']);
      }, (err) => {
        console.log('erro ao solicitar');
      });
    }
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
          this.DadosProjeto.controls.foto64.setValue(myReader.result);
          this.foto = myReader.result;
          break;  
      }

    }
    myReader.readAsDataURL(file);
  }

}
