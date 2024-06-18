import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AuthLayoutComponent } from './pages/auth-layout/auth-layout.component';
import { Store } from '@ngrx/store';
import { IGlobalState } from './core/state/app.reducer';
import { selectActiveUser } from './core/state/app.selectors';
import { map } from 'rxjs';
import { fetchPermissionsRequest, fetchRolesRequest, fetchUsersRequest, loginRequestSuccess } from './core/state/app.action';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RouterModule, AuthLayoutComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //check active user session, if no session redirects to login page
  activeUser$ = this.store.select(selectActiveUser).pipe(map(a => {
    a?.id ? this.initializeData() : this.router.navigateByUrl('login');
  }))

  constructor(private router: Router, private store: Store<IGlobalState>) {

  }
  initializeData(){
    this.store.dispatch(fetchRolesRequest());
    this.store.dispatch(fetchPermissionsRequest());
    this.store.dispatch(fetchUsersRequest());
  }
  
  ngOnInit(): void {

    //check if the log in session exists in the localstorage and load the data if exists
    if (localStorage.getItem(environment.ACTIVE_USER_KEY)) {
      
      
      const user = JSON.parse(localStorage.getItem(environment.ACTIVE_USER_KEY) || '');
      return this.store.dispatch(loginRequestSuccess({ user }));
    }
  }
}
