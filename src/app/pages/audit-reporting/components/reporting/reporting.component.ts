import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { reportingRequest } from '../../../../core/state/app.action';
import { IGlobalState } from '../../../../core/state/app.reducer';
import { selectReports } from '../../../../core/state/app.selectors';
import { NzListModule } from 'ng-zorro-antd/list';
import { CommonModule } from '@angular/common';
import { ActivityEnum } from '../../../../core/enums/activity.enums';
import { DateTimeFormatPipe } from '../../../../core/pipes/date-time-format.pipe';
import { PermissionsEnums } from '../../../../core/enums/permissions.enums';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [NzListModule, CommonModule, DateTimeFormatPipe, NzEmptyModule],
  templateUrl: './reporting.component.html',
  styleUrl: './reporting.component.scss'
})
export class ReportingComponent implements OnInit {
  //observable to select all the reports
  reports$ = this.store.select(selectReports);
  activityTypeEnum = ActivityEnum;
  acitivityTypes = [];
  permissionEnums = Object.entries(PermissionsEnums);
  constructor(private store: Store<IGlobalState>) {
  }
  ngOnInit(): void {
    // console.log(Object.entries(this.permissionEnums).find(x => x[1] === '0-0'))
    this.store.dispatch(reportingRequest());
  }
}
