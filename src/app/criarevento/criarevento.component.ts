import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../shared/user.service';
import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/pt';

@Component({
  selector: 'app-criarevento',
  templateUrl: './criarevento.component.html',
  styleUrls: ['./criarevento.component.css']
})
export class CriareventoComponent implements OnInit {

  EventoID: any;
  Titulo: any;
  DadosEvento: FormGroup;
  foto64:any;  
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
    this.DadosEvento = this.formBuilder.group({
      titulo: [''],
      data_hora: [''],
      hora:[''],
      endereco: [''],
      foto64: [''],
      foto: [''],
      descricao: [''],
      serviceID: [this.user.serviceID],
    });

    

  }

  ngOnInit() {
    this.EventoID = this.route.snapshot.params['id'];
    if (this.EventoID != null) {
      this.Titulo = "Editar Evento";     
      this._services.getEvento(this.EventoID).then((result) => {        
        console.log(result);
        this.popularDados(result["result"]);
      }, (err) => {
        console.log('erro ao solicitar');
      });    
    } else {
      this.Titulo = "Criar Evento";
    }
    // this.router.navigate(['/empresa']);
  }

  popularDados(dados){
    this.DadosEvento.controls.titulo.setValue(dados.titulo);
    this.DadosEvento.controls.data_hora.setValue(dados.data_hora);
    this.DadosEvento.controls.hora.setValue(dados.hora);
    this.DadosEvento.controls.descricao.setValue(dados.descricao);
    this.DadosEvento.controls.endereco.setValue(dados.endereco);
    this.DadosEvento.controls.foto64.setValue(dados.foto64);
    this.foto64 = dados.foto64;
    this.DadosEvento.controls.serviceID.setValue(dados.serviceID);
  }

  SalvarEvento() {
    console.log(this.DadosEvento.value);
    console.log(this.DadosEvento.value.hora);
    var hora_ = '';
    if(this.DadosEvento.value.hora != ''){
      hora_ =  this.DadosEvento.value.hora.substring(2,0) + ":" + this.DadosEvento.value.hora.substring(2,this.DadosEvento.value.hora.length);
      this.DadosEvento.value.hora = hora_;
    }
   

    if (this.EventoID != null) {
      this._services.putEvento(this.DadosEvento.value, this.EventoID).then((result) => {
            this.router.navigate(['/evento']);
      }, (err) => {
        console.log('erro ao solicitar');
      });
    } else {
      this._services.salvarEvento(this.DadosEvento.value).then((result) => {     
        this.router.navigate(['/evento']);
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
          this.DadosEvento.controls.foto64.setValue(myReader.result);
          this.foto64 = myReader.result;
          break;  
      }

    }
    myReader.readAsDataURL(file);
  }
}
