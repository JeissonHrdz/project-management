import { Routes } from '@angular/router';
import { authGuard, authGuardLogin } from './core/auth/guards/auth-gurard';
import { BacklogComponent } from './components/projects/backlog/backlog.component';
import { SprintComponent } from './components/projects/sprint/sprint.component';
import { CreateTaskComponent } from './components/projects/sprint/task/create-task/create-task.component';
import { TaskDetailComponent } from './components/projects/sprint/task/task-detail/task-detail.component';
import { BoardComponent } from './components/tasks/board/board.component';
import { CommentsComponent } from './components/tasks/board/comments/comments.component';
import { CalendarComponent } from './components/calendar/calendar.component';

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
                    {
                        path: 'sprints',
                        component: SprintComponent,
                        canActivate: [authGuard],
                        children: [
                            {
                                path: 'task',
                                component: CreateTaskComponent,
                                canActivate: [authGuard]
                            },
                            {
                                path: 'task-detail',
                                component: TaskDetailComponent,
                                canActivate: [authGuard]
                            }
                        ]
                    }
                  
                ]
            },
            {
                path: 'tasks/dashboard',
                loadComponent: () => import('./components/tasks/tasks-dashboard/tasks-dashboard.component')
                    .then(m => m.TasksDashboardComponent),
                canActivate: [authGuard],
                children: [
                    {
                        path: 'board',
                        component: BoardComponent,
                        canActivate: [authGuard],
                        children: [
                            {
                                path: 'task-detail',
                                component: TaskDetailComponent,
                                canActivate: [authGuard]
                            },
                            {
                                path: 'comments',
                                component: CommentsComponent,
                                canActivate: [authGuard]
                            }
                        ]
                    },
                    {
                        path: 'calendar',
                        component: CalendarComponent,
                        canActivate: [authGuard]
                    }
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
    {
        path: 'register',
        loadComponent: () => import('./components/register/register-form/register-form.component')
            .then(m => m.RegisterFormComponent),
        canActivate: [authGuardLogin]
    },
    { path: '**', canActivate: [authGuard], children: [] }
];
