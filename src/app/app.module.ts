import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule} from '@angular/router';
import { FormsModule, FormBuilder }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { appRoutes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { RequestService } from './shared/user.service';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { RigthpanelComponent } from './rigthpanel/rigthpanel.component';
import { HeaderComponent } from './header/header.component';
import { EditarComponent } from './editar/editar.component';
import { EventosComponent } from './eventos/eventos.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { EditarcabecalhoComponent } from './editarcabecalho/editarcabecalho.component';
import { EditarsobrenosComponent } from './editarsobrenos/editarsobrenos.component';
import { GaleriaComponent } from './galeria/galeria.component';


import { NgxSpinnerModule } from 'ngx-spinner';
import { NgDatepickerModule } from 'ng2-datepicker';
import {NgxMaskModule} from 'ngx-mask';
// Import NgMasonryGridModule
import { NgMasonryGridModule } from 'ng-masonry-grid';

import { CriareventoComponent } from './criarevento/criarevento.component';
import { CriarprojetoComponent } from './criarprojeto/criarprojeto.component';
import { AuthenticationService } from './shared/authentication.service';
import { AuthGuard } from './_guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    UserComponent,
    HomeComponent,
    LeftpanelComponent,
    RigthpanelComponent,
    HeaderComponent,
    EditarComponent,
    EventosComponent,
    ProjetosComponent,
    EditarcabecalhoComponent,
    EditarsobrenosComponent,
    CriareventoComponent,
    CriarprojetoComponent,
    GaleriaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,    
    NgxSpinnerModule,
    NgDatepickerModule,
    NgMasonryGridModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [RequestService, AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
