import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ListProyectosComponent } from './pages/proyectos/list-proyectos/list-proyectos.component';
import { ProyectosComponent } from './pages/proyectos/crear-proyecto/proyectos.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { DesplieguesComponent } from './pages/despliegues/crear-despliegue/despliegues.component';
import { MetricasComponent } from './pages/metricas/metricas.component';
import { VerProyectoComponent } from './pages/proyectos/ver-proyecto/ver-proyecto.component';
import { EditProyectoComponent } from './pages/proyectos/edit-proyecto/edit-proyecto.component';
import { ListDesplieguesComponent } from './pages/despliegues/list-despliegues/list-despliegues.component';
import { ModalComponent } from './pages/modal/modal.component';
import { VerDespliegueComponent } from './pages/despliegues/ver-despliegue/ver-despliegue.component';
import { ExperimentoComponent } from './pages/experimento/crear-experimento/experimento.component';
import { ListExperimentosComponent } from './pages/experimento/list-experimentos/list-experimentos/list-experimentos.component';

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
        path: 'proyecto',
        title: 'Proyectos',
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: ListProyectosComponent
            },
            {
                path: 'crear',
                title: 'Crear Proyectos',
                component: ProyectosComponent
            },
            {
                path: 'ver/:id',
                title: 'Ver Proyecto',
                component: VerProyectoComponent
            },
            {
                path: 'editar/:id',
                title: 'Editar Proyecto',
                component: EditProyectoComponent
            }
        ]
    },
    {
        path: 'experimento',
        title: 'Experimento',
        canActivate: [authGuard],
        children:[
          {
              path: '',
              component: ListExperimentosComponent
          },
          {
              path: 'crear',
              title: 'Crear Experimento',
              component: ExperimentoComponent
          }
        ]
    },
    {
        path: 'despliegues',
        title: 'Despliegues',
        canActivate: [authGuard],
        children:[
            {
                path: '',
                component: ListDesplieguesComponent
            },
            {
                path: 'crear',
                title: 'Crear Despliegue',
                component: DesplieguesComponent
            },
            {
                path: 'ver/:nombre',
                title: 'Ver Despliegue',
                component: VerDespliegueComponent
            },
            // {
            //     path: 'editProyecto/:id',
            //     title: 'EditProyecto',
            //     component: EditProyectoComponent
            // }
        ]
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
        path: 'modal',
        title: 'Info modal',
        component: ModalComponent,
        // canActivate: [authGuard]
    },
    {
        path: '**', redirectTo: '', pathMatch: 'full'
    }
];
