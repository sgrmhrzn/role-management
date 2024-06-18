import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { selectActiveUser } from '../../core/state/app.selectors';
import { GlobalState } from '../../core/state/app.reducer';
import { Store } from '@ngrx/store';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PermissionsEnums } from '../../core/enums/permissions.enums';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RouterModule, NzAvatarModule, NzDropDownModule, NzToolTipModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
/**
 * Wrapper component for pages that needs authentication and authorization
 */
export class AuthLayoutComponent {
  activeUser$ = this.store.select(selectActiveUser);
  isCollapsed = false;
  permissionEnum = PermissionsEnums;
  constructor(private store: Store<GlobalState>, private router: Router) {

  }

  /**
   * logout user from the system and redirects to login page
   */
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
