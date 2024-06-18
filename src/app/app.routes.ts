import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayoutComponent } from './pages/auth-layout/auth-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AUTH_ROUTES } from './pages/auth-layout/auth.routes';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  {
    path: '', component: AuthLayoutComponent, children: AUTH_ROUTES, canActivateChild: [AuthGuard]
  }
];
