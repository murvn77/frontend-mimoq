import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { PrincipalComponent } from './pages/principal/principal.component';

export const routes: Routes = [
    // {
    //     path: '**', redirectTo: '', pathMatch: 'full'
    // },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: '',
                component: PrincipalComponent,
            },
        ]
    },
];
