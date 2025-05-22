import { Routes } from '@angular/router';
import { authGuard, authGuardLogin } from './core/auth/guards/auth-gurard';
import { BacklogComponent } from './components/projects/backlog/backlog.component';

export const routes: Routes = [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },

    {
        path: 'projects',
        loadComponent: () => import('./components/projects/projects.component')
            .then(m => m.ProjectsComponent),
        canActivate: [authGuard],
        children: [
            {
                path: 'backlog',
                component: BacklogComponent,
                canActivate: [authGuard]
            },

        ]

    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
        , canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login/login-form/login-form.component')
            .then(m => m.LoginFormComponent),
        canActivate: [authGuardLogin]
    },
    { path: '**', canActivate: [authGuard], children: [] }
];
