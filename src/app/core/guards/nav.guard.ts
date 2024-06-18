import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PermissionsEnums } from '../enums/permissions.enums';

/**
 * Guard to check authorization of pages during route change
 * @param route activated route data
 * @param state router state data
 * @returns 
 */
export const NavGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  if (localStorage.getItem(environment.ACTIVE_USER_KEY)) {
    const user = JSON.parse(localStorage.getItem(environment.ACTIVE_USER_KEY) || '');
    //check if the user have access to audit reporting page
    if (!user.permissions?.includes(PermissionsEnums.AuditReportViewPrivilege) && state.url.includes('report')) {
      router.navigateByUrl('unauthorized');
      return false;
    }

    if ((!user.permissions?.includes(PermissionsEnums.StaffsAllPrivilege) && !user.permissions?.includes(PermissionsEnums.StaffsViewPrivilege)) && state.url.includes('staff')) {
      router.navigateByUrl('unauthorized');
      return false;
    }

    //check if the user have access to roles page
    if ((!user.permissions?.includes(PermissionsEnums.RolesAllPrivilege) && !user.permissions?.includes(PermissionsEnums.RolesViewPrivilege)) && state.url.includes('roles')) {
      router.navigateByUrl('unauthorized');
      return false;
    }
  }
  return true;
}
