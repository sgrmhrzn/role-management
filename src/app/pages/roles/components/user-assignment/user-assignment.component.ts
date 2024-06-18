import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { Observable, Subscription, map } from 'rxjs';
import { IUserAssignModel, IUserModel } from '../../../../core/models/user.model';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../../../core/state/app.reducer';
import { selectAssignedUsers, selectUsers } from '../../../../core/state/app.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserService } from '../../../../core/services/user.service';
import { RoleService } from '../../../../core/services/role.service';
import _ from 'lodash';
import { NzDrawerRef, NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { IDrawerParams } from '../../../../core/models/drawer.model';
import { assignUsersRequest } from '../../../../core/state/app.action';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-user-assignment',
  standalone: true,
  imports: [NzListModule, NzSkeletonModule, NzIconModule, CommonModule, NzSelectModule, FormsModule, NzButtonModule, NzFlexModule, NzAvatarModule, NzToolTipModule, NzEmptyModule],
  templateUrl: './user-assignment.component.html',
  styleUrl: './user-assignment.component.scss'
})
/**
 * Component to handle user assignment for role
 */
export class UserAssignmentComponent implements OnInit, OnDestroy {
  readonly #drawerRef = inject(NzDrawerRef);
  readonly nzModalData: IDrawerParams = inject(NZ_DRAWER_DATA);

  //fetch all available users
  users$: Observable<IUserModel[]> = this.store.select(selectUsers);
  assignedUsers$!: Observable<IUserModel[]>;
  selectedUser!: any;
  assignedKeys = new Array<string>();

  assignedUsers: IUserAssignModel = {
    id: '',
    role: {
      id: '',
      title: ''
    },
    userIds: [],
  };
  @Input() onSave!: Observable<void>;
  subscription = new Subscription();
  @Output() valueChanged = new EventEmitter<boolean>();
  allRolesUser = new Array<IUserAssignModel>();

  constructor(private store: Store<GlobalState>, private roleService: RoleService, private userService: UserService, private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.assignedUsers.role = this.nzModalData;

    this.userService.getRoleUsers(this.nzModalData?.id).subscribe(res => {
      if (res?.length) {
        this.assignedUsers = { ...res[0], userIds: [] };
        this.assignedKeys = res[0]?.userIds;
      }
      this.assignedUsers$ = this.store.select(selectAssignedUsers(this.assignedKeys));
    })

    this.userService.getAllAssignedRolesUsers().subscribe(r => this.allRolesUser = r)
    this.subscription = this.onSave.subscribe(() => {
      this.store.dispatch(assignUsersRequest({ assignedUsers: this.assignedUsers }))
    })
  }

  /**
   * Add new user to role
   * 
   */
  addUser() {
    //check if selected user is assigned to another role or not
    if (this.allRolesUser.some(x => x.userIds.includes(this.selectedUser))) {
      this.messageService.error('User is assigned to another role. Please remove exisiting role and proceed.');
      return;
    }

    if (!this.assignedKeys.includes(this.selectedUser)) {
      this.assignedKeys.push(this.selectedUser);
      this.assignedUsers$ = this.store.select(selectAssignedUsers(this.assignedKeys));
      this.assignedUsers.userIds = this.assignedKeys;
      this.selectedUser = '';
      this.valueChanged.next(true);
    }

  }

  /**
   * Function to remove user from role
   * @param id string - id of user
   */
  removeUser(id: string) {
    if (this.assignedKeys.includes(id)) {
      this.assignedKeys.splice(this.assignedKeys.indexOf(id), 1);
      this.assignedUsers.userIds = this.assignedKeys;
      this.assignedUsers$ = this.store.select(selectAssignedUsers(this.assignedKeys));
      this.valueChanged.next(true);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
