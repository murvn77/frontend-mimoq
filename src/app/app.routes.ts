import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ProyectosComponent } from './pages/proyectos/proyectos.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { DesplieguesComponent } from './pages/despliegues/despliegues.component';
import { MetricasComponent } from './pages/metricas/metricas.component';

export const routes: Routes = [
    // {
    //     path: '**', redirectTo: '', pathMatch: 'full'
    // },
    {
        path: '',
        title: 'Home',
        component: PrincipalComponent
    },
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent
    },
    {
        path: 'register',
        title: 'Register',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        title: 'Dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'proyectos',
        title: 'Proyectos',
        component: ProyectosComponent,
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
    }
];
