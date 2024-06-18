import { Routes } from '@angular/router';
import { NavGuard } from '../../core/guards/nav.guard';
import { ErrorComponent } from '../error/error.component';
// import { LoginComponent } from './pages/login/login.component';
// import { AuthLayoutComponent } from './pages/auth-layout/auth-layout.component';

export const AUTH_ROUTES: Routes = [
  { path: 'dashboard', canActivate: [NavGuard], loadChildren: () => import('../dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
  { path: 'roles', canActivate: [NavGuard], loadChildren: () => import('./../roles/roles.routes').then(m => m.ROLES_ROUTES) },
  { path: 'staffs', canActivate: [NavGuard], loadChildren: () => import('./../staffs/staffs.routes').then(m => m.STAFFS_ROUTES) },
  { path: 'report', canActivate: [NavGuard], loadChildren: () => import('../audit-reporting/audit-reporting.routes').then(m => m.AUDITREPORTING_ROUTES) },
  { path: 'unauthorized', component: ErrorComponent },
  { path: '**', component: ErrorComponent },
];
