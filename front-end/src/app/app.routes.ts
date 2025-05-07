import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth-gurard';

export const routes: Routes = [
    {path:'dashboard', 
        loadComponent: () => import('./components/dashboard/dashboard.component')
        .then(m => m.DashboardComponent) 
        , canActivate: [AuthGuard]},
    {path:'login', 
        loadComponent: () => import('./components/login/login-form/login-form.component')
        .then(m => m.LoginFormComponent)
        },
    {path:'**', redirectTo: 'login'}
];
