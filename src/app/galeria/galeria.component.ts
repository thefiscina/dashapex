import { Component, OnInit } from '@angular/core';
import { Masonry, MasonryGridItem } from 'ng-masonry-grid'; // import necessary datatypes
import { FormGroup, FormBuilder } from '../../../node_modules/@angular/forms';
import { RequestService } from '../shared/user.service';
import { NgxSpinnerService } from '../../../node_modules/ngx-spinner';
@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['../../../node_modules/ng-masonry-grid/ng-masonry-grid.css', './galeria.component.css']
})
export class GaleriaComponent implements OnInit {
  _masonry: Masonry;
  masonryItems: any[];
  formGaleria: FormGroup;
  Servico: any;
  foto: any;
  public loading= false;
  private user = JSON.parse(localStorage.getItem('user'));
  constructor(private formBuilder: FormBuilder, private _services: RequestService, private spinner: NgxSpinnerService) {
    this.formGaleria = this.formBuilder.group({
      titulo: [''],
      descricao: [''],
      foto64: [''],
      foto: [''],
      serviceID: [this.user.serviceID],
    });

  }

  onNgMasonryInit($event: Masonry) {
    this._masonry = $event;
  }


  removeItem(id) {    
    this._services.deleteGaleria(id).then((result) => {
      if (this._masonry) {
        this._masonry.removeAllItems()
          .subscribe((items: MasonryGridItem) => {
            // remove all items from the list
            this.masonryItems = [];
            this.getGaleria();
          });        
      }
  
    }, (err) => {
      console.log('erro ao solicitar');
    });
  }

  ngOnInit() {
    if (this.user.serviceID != null) {
      this.loading = true;
      this.getGaleria();
    }
  }

  getGaleria() {
    if (this.user.serviceID != null) {
      this.masonryItems = [];
      var dado = { serviceID: this.user.serviceID }
      this._services.getGaleriaService(dado).then((result) => {
        this.masonryItems = result["result"];  
        this.loading = false;      
      }, (err) => {
        console.log('erro ao solicitar');
      });
    }
  }

  popularDados(dados) {

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
          this.formGaleria.controls.foto64.setValue(myReader.result);
          this.foto = myReader.result;
          break;
      }
    }
    myReader.readAsDataURL(file);
  }

  Salvar() {
    this._services.salvarGaleria(this.formGaleria.value).then((result) => {
     if(this.masonryItems.length > 0){
      if (this._masonry) {
        this._masonry.removeAllItems()
          .subscribe((items: MasonryGridItem) => {
            // remove all items from the list
            this.masonryItems = [];
            this.getGaleria();
          });        
      }
    }else{
      this.getGaleria();
    }
      this.formGaleria.controls.foto64.setValue('');
      this.formGaleria.controls.descricao.setValue('');
      this.formGaleria.controls.titulo.setValue('');
      this.formGaleria.controls.foto.setValue('');
      this.foto = '';
    }, (err) => {
      console.log('erro ao solicitar');
    });
  }
}
