import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import _ from 'lodash';
import { NzFormatEmitEvent, NzTreeModule, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { IPermissionAssignModel, IPermissionModel } from '../../../../core/models/permisson.model';
import { selectPermissions } from '../../../../core/state/app.selectors';
import { Store } from '@ngrx/store';
import { RoleService } from '../../../../core/services/role.service';
import { IGlobalState } from '../../../../core/state/app.reducer';
import { IRoleModel } from '../../../../core/models/role.model';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { IDrawerParams } from '../../../../core/models/drawer.model';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { assignPermissionsRequest } from '../../../../core/state/app.action';


@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [NzTreeModule],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss'
})
/**
 * Tree view component to handle the permission assignment for role
 */
export class TreeComponent implements OnInit {
  readonly #modal = inject(NzDrawerRef);
  readonly nzModalData: IDrawerParams = inject(NZ_DRAWER_DATA);

  defaultCheckedKeys = new Array<string>();
  defaultSelectedKeys = new Array<string>();
  defaultExpandedKeys = ['0-0', '0-0-0', '0-0-1'];

  permissionNodes: NzTreeNodeOptions[] = [];

  permissions$ = this.store.select(selectPermissions);

  assignedPermissions: IPermissionAssignModel = {
    id: '',
    role: {
      id: '',
      title: ''
    },
    permissionIds: []
  };
  permissionIds = new Array<string>();

  @Input() onSave!: Observable<void>;
  subscription = new Subscription();

  @Output() valueChanged = new EventEmitter<boolean>();

  constructor(private store: Store<IGlobalState>, private roleService: RoleService) {

  }

  async ngOnInit() {
    this.assignedPermissions.role = this.nzModalData;

    //get permissions data 
    const r = await firstValueFrom(this.permissions$);
    this.permissionNodes = this.mapToTreeNodeData(r);

    //get assigned permissions of the role
    const res = await firstValueFrom(this.roleService.getRolePermissons(this.nzModalData?.id))
    if (res?.length) {
      const permission = res[0];
      this.assignedPermissions = { ...permission };
      this.permissionIds = [..._.cloneDeep(permission.permissionIds)];
      this.defaultCheckedKeys = this.permissionIds;
      this.defaultSelectedKeys = this.permissionIds;
    }

    this.subscription = this.onSave.subscribe(() => {
      this.store.dispatch(assignPermissionsRequest({ assignedPermissions: { ...this.assignedPermissions, permissionIds: this.permissionIds } }));
    })

  }

  /**
   * Function trigger when permission in tree view gets checked
   * @param event mouse click event of check/uncheck
   */
  nzEvent(event: NzFormatEmitEvent): void {
    if (this.permissionIds && event.keys && event.eventName === 'check') {
      this.permissionIds = event.keys;
      this.valueChanged.next(true);
    }
  }

  /**
   * Function to map the permissions raw data to tree node data of nz tree
   * @param response Array<IPermissionModel> 
   * @returns Array<NzTreeNodeOptions>
   */
  mapToTreeNodeData(response: IPermissionModel[]): Array<NzTreeNodeOptions> {
    const mapped = new Array<NzTreeNodeOptions>();
    response?.forEach(x => {
      const parent = new Array<NzTreeNodeOptions>();
      x?.children.forEach(y => {
        const level1 = new Array<NzTreeNodeOptions>();
        y?.children.forEach(z => {
          level1.push(this.mapTreeNodeOption(z, []));
        });
        parent.push(this.mapTreeNodeOption(y, level1));
      });
      mapped.push(this.mapTreeNodeOption(x, parent));
    });

    return mapped;
  }

  /**
   * Function to map option object
   * @param permission IPermissionModel - permission data
   * @param children Array<NzTreeNodeOptions> - list of tree node
   * @param isChild boolean - determines inner child or not
   * @returns 
   */
  mapTreeNodeOption(permission: IPermissionModel, children: NzTreeNodeOptions[]) {
    return { key: permission.id, children: children, isLeaf: !children.length, expanded: true, title: permission.title, disabled: this.nzModalData.isView ? true : false } as NzTreeNodeOptions;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
