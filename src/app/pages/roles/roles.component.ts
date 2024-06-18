import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ModalComponent } from "./components/modal/modal.component";
import { ModalOptions, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzDrawerModule, NzDrawerOptions, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { ConfigureComponent } from './components/configure/configure.component';
import { Store } from '@ngrx/store';
import { IGlobalState } from '../../core/state/app.reducer';
import { Observable } from 'rxjs';
import { IRoleModel } from '../../core/models/role.model';
import { selectActiveUser, selectRoles } from '../../core/state/app.selectors';
import { deleteRoleRequest } from '../../core/state/app.action';
import { PermissionsEnums } from '../../core/enums/permissions.enums';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-roles',
  standalone: true,
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
  imports: [NzTableModule, NzDividerModule, NzToolTipModule,
    NzModalModule, NzButtonModule, NzIconModule, ModalComponent, CommonModule, NzFlexModule, NzDrawerModule, ConfigureComponent, NzPopconfirmModule]
})
/**
 * Page to display roles and its available actions
 */
export class RolesComponent implements OnInit {
  modalRef: NzModalRef | undefined;
  drawerRef: NzDrawerRef | undefined;

  //fetch all available roles
  roles$: Observable<IRoleModel[]> = this.store.select(selectRoles);
  activeUser$ = this.store.select(selectActiveUser);
  permissionEnum = PermissionsEnums;

  constructor(private modalService: NzModalService, private drawerService: NzDrawerService, private store: Store<IGlobalState>) {

  }

  ngOnInit(): void {
  }

  /**
   * Show modal to add or update the role
   * @param role IRoleModel - pass existing role data during update operation
   */
  showModal(role?: IRoleModel) {
    const modalOptions: ModalOptions = { nzContent: ModalComponent, nzOkText: "Save", nzOkDisabled: true, nzData: role };
    if (role?.id) {
      modalOptions.nzTitle = 'Update Role';
    } else {
      modalOptions.nzTitle = 'Create Role';
    }
    this.modalRef = this.modalService.create(modalOptions);
    this.modalRef.afterOpen.subscribe(() => {
      this.modalRef?.updateConfig({ nzOnOk: this.modalRef?.componentInstance.handleOk });
    })
  }

  /**
   * Function to delete role
   * @param role IRoleModel - pass existing role data
   */
  confirmDelete(role: IRoleModel) {
    this.store.dispatch(deleteRoleRequest({ role }));
  }

  /**
   * Function to open side drawer for view, users and permission configuration operations
   * @param role IRoleModel - existing role data
   * @param isView boolean - determine if its viewonly
   */
  showDrawer(role: IRoleModel, isView = false) {
    const drawerOptions: NzDrawerOptions = {
      nzContent: ConfigureComponent,
      nzSize: 'default',
      nzTitle: `Configure Role - ${role.title}`,
      nzData: { ...role, isView },
    }
    this.drawerRef = this.drawerService.create(drawerOptions);
  }


}
