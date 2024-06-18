import { createAction, props } from '@ngrx/store';
import { IPermissionAssignModel, IPermissionModel } from '../models/permisson.model';
import { IRoleModel } from '../models/role.model';
import { NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { IActiveUserModel, ILogInUserModel, IUserAssignModel, IUserModel } from '../models/user.model';

export const loginRequest = createAction('[Login] Login request', props<{ user: ILogInUserModel }>());
export const loginRequestSuccess = createAction('[Login] Login request success', props<{ user: IActiveUserModel }>());

export const addRole = createAction('[Role] Add role', props<{ role: IRoleModel }>());
export const addRoleRequest = createAction('[Role] Add role request', props<{ role: IRoleModel }>());
export const updateRoleRequest = createAction('[Role] Update role request', props<{ role: IRoleModel }>());
export const updateRole = createAction('[Role] Update role', props<{ role: IRoleModel }>());
export const deleteRole = createAction('[Role] Delete role', props<{ id: string }>());
export const fetchRolesRequest = createAction('[Role] request roles');
export const fetchRolesRequestSuccess = createAction('[Role] request roles success', props<{ roles: IRoleModel[] }>());
export const failedRequest = createAction('[Role] request roles failed');
export const deleteRoleRequest = createAction('[Role] delete role request', props<{ role: IRoleModel }>());

export const fetchPermissionsRequest = createAction('[Permissions] request permissions');
export const fetchPermissionsRequestSuccess = createAction('[Permissions] request permissions success', props<{ permissions: IPermissionModel[] }>());
export const assignPermissionsRequest = createAction('[Permissions] assign permissions request', props<{ assignedPermissions: IPermissionAssignModel }>());
export const assignPermissionsRequestSuccess = createAction('[Permissions] assign permissions request success', props<{ assignedPermissions: IPermissionAssignModel }>());

export const fetchUsersRequest = createAction('[Users] request users');
export const fetchUsersRequestSuccess = createAction('[Users] request users success', props<{ users: IUserModel[] }>());
export const addUser = createAction('[User] Add User', props<{ user: IUserModel }>());
export const addUserRequest = createAction('[User] Add User request', props<{ user: IUserModel }>());
export const updateUserRequest = createAction('[User] Update User request', props<{ user: IUserModel }>());
export const updateUser = createAction('[User] Update User', props<{ user: IUserModel }>());
export const deleteUserRequest = createAction('[User] request User delete', props<{ user: IUserModel }>());
export const deleteUser = createAction('[User] Delete User', props<{ id: string }>());

export const assignUsersRequest = createAction('[Users] assign Users request', props<{ assignedUsers: IUserAssignModel }>());
export const assignUsersRequestSuccess = createAction('[Users] assign Users request success', props<{ assignedUsers: IUserAssignModel }>());


export const auditRequest = createAction('[Audit] Audit request');
export const auditRequestSuccess = createAction('[Audit] Audit request success', props<{ users: IUserModel[] }>());

export const reportingRequest = createAction('[Report] Report request');
export const reportingRequestSuccess = createAction('[Report] Report request success', props<{ reports: IActiveUserModel[] }>());