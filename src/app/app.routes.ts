import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/login/page/login').then(l => l.Login)
    },
    {
        path: 'cart',
        loadComponent: () => import('./features/cart/page/cart').then(c => c.Cart),
        canActivate: [authGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./features/store/page/store').then(s => s.Store)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
