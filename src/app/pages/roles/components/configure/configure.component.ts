import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IRoleModel } from '../../../../core/models/role.model';
import { Subject } from 'rxjs';
import _ from 'lodash';
import { TreeComponent } from '../tree/tree.component';
import { UserAssignmentComponent } from '../user-assignment/user-assignment.component';
import { IDrawerParams } from '../../../../core/models/drawer.model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
@Component({
  selector: 'app-configure',
  standalone: true,
  imports: [NzTabsModule, CommonModule, NzIconModule, TreeComponent, UserAssignmentComponent, NzButtonModule, NzDividerModule],
  templateUrl: './configure.component.html',
  styleUrl: './configure.component.scss'
})
/**
 * Role user & permissions assignment wrapper component
 */
export class ConfigureComponent implements OnInit, OnDestroy {
  readonly drawerRef = inject(NzDrawerRef);
  readonly nzModalData: IDrawerParams = inject(NZ_DRAWER_DATA);

  role: IRoleModel = { id: '', title: '' };
  isView = false;
  selectedIndex = 0;
  tabs = ['Permissions', 'Staffs'];
  savePermissionsEvent = new Subject<void>();
  saveUsersEvent = new Subject<void>();
  disableButton = true;

  constructor() {
  }
  ngOnDestroy(): void {
    this.savePermissionsEvent?.complete();
  }

  ngOnInit(): void {

  }

  /**
   * Function to trigger the save permissions and save users on permissions or users modification for the role
   */
  onSave() {
    if (this.selectedIndex === 0) {
      this.savePermissionsEvent.next();
    } else {
      this.saveUsersEvent.next();
    }
  }

  /**
   * callback function triggered from child component when the users or permissions are modified
   * @param value value state change flag
   */
  valueChanged(value: boolean) {
    if (value) {
      this.disableButton = false;
    }
  }
}
