import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IGlobalState } from '../../../../core/state/app.reducer';
import { Store } from '@ngrx/store';
import { auditRequest } from '../../../../core/state/app.action';
import { selectAuditUsers } from '../../../../core/state/app.selectors';
import { PermissionsEnums } from '../../../../core/enums/permissions.enums';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [NzTableModule, CommonModule, NzIconModule],
  templateUrl: './audit.component.html',
  styleUrl: './audit.component.scss'
})
export class AuditComponent implements OnInit {
  //observable to select all the users data with audit report
  users$ = this.store.select(selectAuditUsers);
  permissionEnums = PermissionsEnums;

  constructor(private store: Store<IGlobalState>) {

  }
  ngOnInit(): void {
    this.store.dispatch(auditRequest());
  }
}
