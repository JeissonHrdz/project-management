import { Routes } from '@angular/router';
import { authGuard, authGuardLogin } from './core/auth/guards/auth-gurard';
import { BacklogComponent } from './components/projects/backlog/backlog.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full'
    },
    {
        path: 'app',
        loadComponent: () => import('./components/dashboard/dashboard.component')
            .then(m => m.DashboardComponent),
        canActivate: [authGuard],
        children: [

            {
                path: 'project/dashboard',
                loadComponent: () => import('./components/projects/dashboard-project/dashboard-project.component')
                    .then(m => m.DashboardProjectComponent),
                canActivate: [authGuard],                              
                children: [
                    {
                        path: 'backlog',
                        component: BacklogComponent,
                        canActivate: [authGuard]
                    },

                ]
            }

        ]

    },

    {
        path: 'login',
        loadComponent: () => import('./components/login/login-form/login-form.component')
            .then(m => m.LoginFormComponent),
        canActivate: [authGuardLogin]
    },
    { path: '**', canActivate: [authGuard], children: [] }
];
