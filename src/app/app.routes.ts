import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ListProyectosComponent } from './pages/proyectos/list-proyectos/list-proyectos.component';
import { ProyectosComponent } from './pages/proyectos/crear-proyecto/proyectos.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { DesplieguesComponent } from './pages/despliegues/despliegues.component';
import { MetricasComponent } from './pages/metricas/metricas.component';
import { VerProyectoComponent } from './pages/proyectos/ver-proyecto/ver-proyecto.component';
import { ExperimentoComponent } from './pages/experimento/experimento.component'
import {EditProyectoComponent} from './pages/proyectos/edit-proyecto/edit-proyecto.component'

export const routes: Routes = [
    {
        path: '',
        title: 'Home',
        component: PrincipalComponent
    },
    {
        path: 'login',
        title: 'Login',
        children: [
            {
                path: '',
                component: LoginComponent
            },
            {
                path: 'register',
                title: 'Register',
                component: RegisterComponent
            }
        ]
    },
    {
        path: 'dashboard',
        title: 'Dashboard',
        component: DashboardComponent,
        // canActivate: [authGuard]
    },
    {
        path: 'proyectos',
        title: 'Proyectos',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: ListProyectosComponent
            },
            {
                path: 'crearProyecto',
                title: 'CrearProyectos',
                component: ProyectosComponent
            },
            {
                path: 'verProyecto/:id',
                title: 'VerProyecto',
                component: VerProyectoComponent
            },
            {
                path: 'editProyecto/:id',
                title: 'EditProyecto',
                component: EditProyectoComponent
            }
        ]
    },
    {
        path: 'experimento',
        title: 'Experimento',
        component: ExperimentoComponent,
        canActivate: [authGuard]
    },
    {
        path: 'despliegues',
        title: 'Despliegues',
        component: DesplieguesComponent,
        canActivate: [authGuard]
    },
    {
        path: 'metricas',
        title: 'Metricas',
        component: MetricasComponent,
        canActivate: [authGuard]
    },
    {
        path: 'usuario',
        title: 'Info usuario',
        component: UsuarioComponent,
        canActivate: [authGuard]
    },
    {
        path: '**', redirectTo: '', pathMatch: 'full'
    }
];
