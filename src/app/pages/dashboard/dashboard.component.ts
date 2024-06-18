import { Component, OnInit } from '@angular/core';
import { AuditComponent } from '../audit-reporting/components/audit/audit.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { Store } from '@ngrx/store';
import { IGlobalState } from '../../core/state/app.reducer';
import { selectActiveUser, selectCounts } from '../../core/state/app.selectors';
import { CommonModule } from '@angular/common';
import { fetchRolesRequest, fetchPermissionsRequest, fetchUsersRequest } from '../../core/state/app.action';
import { DateTimeFormatPipe } from '../../core/pipes/date-time-format.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AuditComponent, NzFlexModule, NzCardModule, NzStatisticModule, NzGridModule, NzDescriptionsModule, NzBadgeModule, NzAvatarModule, CommonModule, DateTimeFormatPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
/**
 * Dashboard page for entry after logging into the system
 */
export class DashboardComponent implements OnInit {
  counts$ = this.store.select(selectCounts);
  activeUser$ = this.store.select(selectActiveUser);

  constructor(private store: Store<IGlobalState>) { }

  ngOnInit() {

  }

}
