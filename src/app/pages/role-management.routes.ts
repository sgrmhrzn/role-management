import { Routes } from '@angular/router';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';

export const ROLE_MANAGEMENT: Routes = [
  { path: 'permissions', component: PermissionsComponent },
  { path: 'roles', component: RolesComponent },
];
