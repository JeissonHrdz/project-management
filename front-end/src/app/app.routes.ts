import { Routes } from '@angular/router';
import {  authGuard, authGuardLogin} from './core/auth/guards/auth-gurard';

export const routes: Routes = [
    {path:'dashboard', 
        loadComponent: () => import('./components/dashboard/dashboard.component')
        .then(m => m.DashboardComponent) 
        , canActivate: [ authGuard]},
    {path:'login', 
        loadComponent: () => import('./components/login/login-form/login-form.component')
        .then(m => m.LoginFormComponent),
        canActivate: [authGuardLogin]},
    {path:'**', redirectTo: 'login'}
];
