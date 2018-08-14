import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PageLoginComponent } from './user/page-login/page-login.component';
import { EditarComponent } from './editar/editar.component';
import { EventosComponent } from './eventos/eventos.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { EditarcabecalhoComponent } from './editarcabecalho/editarcabecalho.component';
import { EditarsobrenosComponent } from './editarsobrenos/editarsobrenos.component';


export const appRoutes: Routes = [
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: 'editar', component: EditarComponent },
            { path: 'evento', component: EventosComponent },
            { path: 'projeto', component: ProjetosComponent },
            { path: 'editarcabecalho', component: EditarcabecalhoComponent },
            { path: 'sobrenos', component: EditarsobrenosComponent },
        ],
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: PageLoginComponent }]
    },

    { path: '', redirectTo: '/login', pathMatch: 'full' }
];