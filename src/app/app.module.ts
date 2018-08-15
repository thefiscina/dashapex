import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule} from '@angular/router';
import { FormsModule, FormBuilder }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { PageLoginComponent } from './user/page-login/page-login.component';
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

import { NgxSpinnerModule } from 'ngx-spinner';

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
    EditarsobrenosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,    
    NgxSpinnerModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
