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
import { Store } from '@ngrx/store';
import { IGlobalState } from '../../core/state/app.reducer';
import { Observable, firstValueFrom } from 'rxjs';
import { IRoleModel } from '../../core/models/role.model';
import { selectActiveUser, selectUsers } from '../../core/state/app.selectors';
import { deleteRoleRequest, deleteUserRequest } from '../../core/state/app.action';
import { PermissionsEnums } from '../../core/enums/permissions.enums';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { IUserModel } from '../../core/models/user.model';
import { DetailComponent } from './components/detail/detail.component';

@Component({
  selector: 'app-staffs',
  standalone: true,
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.scss',
  imports: [NzTableModule, NzDividerModule, NzToolTipModule,
    NzModalModule, NzButtonModule, NzIconModule, ModalComponent, CommonModule, NzFlexModule, NzDrawerModule, NzPopconfirmModule]
})
/**
 * Page to display users and its available actions
 */
export class StaffsComponent implements OnInit {
  modalRef: NzModalRef | undefined;
  drawerRef: NzDrawerRef | undefined;

  //fetch all available users
  users$: Observable<IUserModel[]> = this.store.select(selectUsers);
  activeUser$ = this.store.select(selectActiveUser);
  permissionEnum = PermissionsEnums;
  permission = {
    add: false,
    update: false,
    delete: false
  }
  constructor(private modalService: NzModalService, private drawerService: NzDrawerService, private store: Store<IGlobalState>) {

  }

  async ngOnInit() {
    const user = await firstValueFrom(this.activeUser$);
    if (user?.permissions?.includes(PermissionsEnums.StaffsAllPrivilege)) {
      this.permission = {
        add: true,
        update: true,
        delete: true
      }
    } else {
      if (user?.permissions?.includes(PermissionsEnums.StaffsAllActionPrivilege)) {
        this.permission = {
          add: true,
          update: true,
          delete: true
        }
      } else {

        if (user?.permissions?.includes(PermissionsEnums.StaffsAddPrivilege)) {
          this.permission.add = true;
        } if (user?.permissions?.includes(PermissionsEnums.StaffsEditPrivilege)) {
          this.permission.update = true;
        } if (user?.permissions?.includes(PermissionsEnums.StaffsDeletePrivilege)) {
          this.permission.delete = true;
        }
      }

    }
  }

  /**
   * Show modal to add or update the user
   * @param user IUserModel - pass existing user data during update operation
   */
  showModal(user?: IUserModel) {
    const modalOptions: ModalOptions = { nzContent: ModalComponent, nzOkText: "Save", nzOkDisabled: true, nzData: user };
    if (user?.id) {
      modalOptions.nzTitle = 'Update Staff';
    } else {
      modalOptions.nzTitle = 'Create Staff';
    }
    this.modalRef = this.modalService.create(modalOptions);
    this.modalRef.afterOpen.subscribe(() => {
      this.modalRef?.updateConfig({ nzOnOk: this.modalRef?.componentInstance.handleOk });
    })
  }

  /**
   * Function to delete user
   * @param role IUserModel - pass existing user data
   */
  confirmDelete(user: IUserModel) {
    this.store.dispatch(deleteUserRequest({ user }));
  }

  /**
 * Function to open side drawer for view  user details
 * @param user IUserModel - existing role data
 */
  showDrawer(user: IUserModel) {
    const drawerOptions: NzDrawerOptions = {
      nzContent: DetailComponent,
      nzSize: 'default',
      nzTitle: `View Staff - ${user.name}`,
      nzData: { ...user },
    }
    this.drawerRef = this.drawerService.create(drawerOptions);
  }
}
