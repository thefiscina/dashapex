import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { EditarComponent } from './editar/editar.component';
import { EventosComponent } from './eventos/eventos.component';
import { ProjetosComponent } from './projetos/projetos.component';
import { EditarcabecalhoComponent } from './editarcabecalho/editarcabecalho.component';
import { EditarsobrenosComponent } from './editarsobrenos/editarsobrenos.component';
import { CriareventoComponent } from './criarevento/criarevento.component';
import { CriarprojetoComponent } from './criarprojeto/criarprojeto.component';
import { AuthGuard } from './_guards/auth.guard';
import { GaleriaComponent } from './galeria/galeria.component';

export const appRoutes: Routes = [
    {
        path: 'home', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: 'editar', component: EditarComponent },
            { path: 'editarcabecalho', component: EditarcabecalhoComponent },
            { path: 'sobrenos', component: EditarsobrenosComponent },
            {
                path: 'evento', component: EventosComponent,
                children: [
                    { path: 'criar', component: CriareventoComponent },
                    { path: 'editar/:id', component: CriareventoComponent },
                ]
            },
            {
                path: 'projeto', component: ProjetosComponent, 
                children: [
                    { path: 'criar', component: CriarprojetoComponent },
                    { path: 'editar/:id', component: CriarprojetoComponent },
                ]
            },
            { path: 'galeria', component: GaleriaComponent },      
        ]   
    },
    {
        path: 'login', component: PageLoginComponent,       
    },
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];