import { Injectable } from "@angular/core";
import { switchMap, of, map, catchError, concatMap, forkJoin, mergeMap, throwError, zip } from "rxjs";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoleService } from "../services/role.service";
import * as actions from "./app.action";
import { NzMessageService } from 'ng-zorro-antd/message';
import { PermissionService } from "../services/permission.service";
import { IPermissionModel } from "../models/permisson.model";
import { NzTreeNodeOptions } from "ng-zorro-antd/tree";
import { UserService } from "../services/user.service";
import { IUserAssignModel, IUserModel } from "../models/user.model";
import { environment } from "../../../environments/environment";
import { Router } from "@angular/router";
import { CommonService } from "../services/common.service";
import { ActivityEnum } from "../enums/activity.enums";
import _ from "lodash";

@Injectable()
/**
 *
 * App effect
 *
 * */
export class AppEffects {

    //#region Roles
    /**
     *
     * Fetch roles
     *
     * */
    requestRoles = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.fetchRolesRequest),
            switchMap(() =>
                this.roleService.getAll().pipe(
                    map((response) => {
                        return actions.fetchRolesRequestSuccess({ roles: response });
                    }),
                    catchError(() => of())
                )
            )
        )
    );

    /**
     * Add new role and log activity
     */
    addRoleRequest = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.addRoleRequest),
            switchMap(({ role }) =>
                this.roleService.addRole(role).pipe(mergeMap((response) => {
                    const msg = `${response.title} role added`;
                    return this.commonService.addNewActivity({ msg, role, type: ActivityEnum.RoleCreate }).pipe(
                        map((activityRes) => {
                            this.messageService.success(msg);
                            return actions.addRole({ role });
                        }),
                        catchError(() => of())
                    )
                })
                )
            )
        )
    );

    /**
     * Update role and log activity
     */
    updateRoleRequest = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.updateRoleRequest),
            switchMap(({ role }) =>
                this.roleService.updateRole(role).pipe(mergeMap((response) => {
                    const msg = `${response.title} role updated`;
                    return this.commonService.addNewActivity({ msg, role, type: ActivityEnum.RoleEdit }).pipe(
                        map((activityRes) => {
                            this.messageService.success(msg);
                            return actions.updateRole({ role });
                        }),
                        catchError(() => of())
                    )
                })
                )
            )
        )
    );

    /**
     * Delete role and log activity
     */
    deleteRoleRequest = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.deleteRoleRequest),
            switchMap(({ role }) =>
                this.roleService.deleteRole(role.id).pipe(mergeMap((response) => {
                    const msg = `${response.title} role deleted`;
                    return this.commonService.addNewActivity({ msg, role, type: ActivityEnum.RoleDelete }).pipe(
                        map((activityRes) => {
                            this.messageService.success(msg);
                            return actions.deleteRole({ id: role.id });
                        }),
                        catchError(() => of())
                    )
                })
                )
            )
        )
    );
    //#endregion

    //#region permissions
    /**
     * Fetch all permissions
     */
    requestPermissions = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.fetchPermissionsRequest),
            switchMap(() =>
                this.permissionService.getAll().pipe(
                    map((response) => {

                        return actions.fetchPermissionsRequestSuccess({ permissions: response });
                    }),
                    catchError(() => of())
                )
            )
        )
    );

    /**
     * Assign permissions to role
     */
    assignPermissionsRequest = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.assignPermissionsRequest),
            switchMap(({ assignedPermissions }) =>
                this.permissionService.assignPermissions(assignedPermissions).pipe(mergeMap((response) => {
                    const msg = `Permissions modified for ${assignedPermissions.role.title}`;
                    return this.commonService.addNewActivity({ msg, role: assignedPermissions.role, type: ActivityEnum.PermissionChanges, permissionIds: assignedPermissions.permissionIds }).pipe(
                        map((response) => {
                            this.messageService.success(msg);
                            return actions.assignPermissionsRequestSuccess({ assignedPermissions });
                        }),
                        catchError(() => of())
                    )
                }))
            )
        )
    );
    //#endregion

    //#region users
    /**
     * Fetch all users
     */
    fetchUsersRequest = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.fetchUsersRequest),
            switchMap(() =>
                this.userService.getAll().pipe(
                    map((response) => {
                        return actions.fetchUsersRequestSuccess({ users: response });
                    }),
                    catchError(() => of())
                )
            )
        )
    );
    /**
     * Add new user and log activity
     */
    addUserRequest = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.addUserRequest),
            switchMap(({ user }) =>
                this.userService.addUser(user).pipe(mergeMap((response) => {
                    const msg = `${response.name} user added`;
                    return this.commonService.addNewActivity({ msg, staff: user, type: ActivityEnum.UserCreate }).pipe(
                        map((activityRes) => {
                            this.messageService.success(msg);
                            return actions.addUser({ user });
                        }),
                        catchError(() => of())
                    )
                })
                )
            )
        )
    );

    /**
     * Update user and log activity
     */
    updateUserRequest = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.updateUserRequest),
            switchMap(({ user }) =>
                this.userService.updateUser(user).pipe(mergeMap((response) => {
                    const msg = `${response.name} user updated`;
                    return this.commonService.addNewActivity({ msg, staff: user, type: ActivityEnum.UserEdit }).pipe(
                        map((activityRes) => {
                            this.messageService.success(msg);
                            return actions.updateUser({ user });
                        }),
                        catchError(() => of())
                    )
                })
                )
            )
        )
    );

    /**
     * Delete user and log activity
     */
    deleteUserRequest = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.deleteUserRequest),
            switchMap(({ user }) =>
                this.userService.deleteUser(user.id).pipe(mergeMap((response) => {
                    const msg = `${response.name} user deleted`;
                    return this.commonService.addNewActivity({ msg, staff: user, type: ActivityEnum.UserDelete }).pipe(
                        map((activityRes) => {
                            this.messageService.success(msg);
                            return actions.deleteUser({ id: user.id });
                        }),
                        catchError(() => of())
                    )
                })
                )
            )
        )
    );
    /**
     * Assign users to role
     */
    assignUserssRequest = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.assignUsersRequest),
            switchMap(({ assignedUsers }) =>
                this.userService.assignUsers(assignedUsers).pipe(mergeMap((response) => {
                    const msg = `Users modified for ${assignedUsers.role.title}`;
                    return this.commonService.addNewActivity({ msg, role: assignedUsers.role, type: ActivityEnum.UsersAssignmentChanges, userIds: assignedUsers.userIds }).pipe(
                        map((response) => {
                            this.messageService.success(msg);
                            return actions.assignUsersRequestSuccess({ assignedUsers });
                        }),
                        catchError(() => of())
                    )
                }
                )))
        )
    );

    //#endregion

    /**
     * Request login, check user credentials, fetch assigned role and permissions of logged in user  
     */
    loginRequest = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loginRequest),
            switchMap(({ user }) =>
                this.userService.checkUser(user).pipe(concatMap((userData: Array<IUserModel>) => {
                    if (userData.length) {
                        return this.userService.getAllAssignedRolesUsers().pipe(map(d => d.filter(f => f.userIds.includes(userData[0].id))), mergeMap((roleData: IUserAssignModel[]) => {
                            if (roleData.length) {

                                return this.roleService.getRolePermissons(roleData[0].role.id).pipe(
                                    map((permissionData) => {
                                        this.messageService.success(`Log in successful`);
                                        const user = { id: userData[0].id, name: userData[0].name, role: roleData[0].role, username: userData[0].username, permissions: permissionData[0].permissionIds };
                                        localStorage.setItem(environment.ACTIVE_USER_KEY, JSON.stringify(user));
                                        this.router.navigateByUrl('dashboard');
                                        return actions.loginRequestSuccess({ user });
                                    }),
                                    catchError(() => of())
                                )
                            } else {
                                this.messageService.error("Role hasn't been assigned to this user. Please contact administrator.");
                                return throwError(() => new Error('Username or password incorrect.'))
                            }
                        }),

                        )
                    } else {
                        this.messageService.error('Username or password incorrect.');
                        return throwError(() => new Error('Username or password incorrect.'))
                    }
                })
                ),
            )
        )
    );

    //#region reporting
    /**
     * Prepare audit report, fetch all users with their assigned role and permissions
     */
    auditRequest = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.auditRequest),
            switchMap(() =>
                this.userService.getAll().pipe(mergeMap((rawUsers) =>
                    this.userService.getAllAssignedRolesUsers().pipe(mergeMap((assignedRolesUsers: IUserAssignModel[]) => {
                        const users = rawUsers.map(x => {
                            const assignedRole = assignedRolesUsers.find(l => l.userIds.includes(x.id));
                            if (assignedRole && assignedRole.role) {
                                x.role = assignedRole?.role;
                            }
                            return x;
                        })
                        return zip(users.filter(r => r.role).map(r => r.role ? this.roleService.getRolePermissons(r.role.id) : of(null))).pipe(
                            map(permissionData => {
                                permissionData?.forEach((x: any) => {
                                    if (x[0]) {
                                        const user = users.find(y => y?.role?.id === x[0].role.id);
                                        if (user) {
                                            user.permissions = x[0].permissionIds;
                                        }
                                    }
                                })
                                return actions.auditRequestSuccess({ users });
                            }),
                            catchError((error) => { return throwError(() => new Error(`Error - ${error}`)) })
                        )
                    }),
                    )
                ))

            ),
        )
    );
    //#endregion
    /**
     * Request all activity logs 
     */
    requestActivity = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.reportingRequest),
            switchMap(() =>
                this.commonService.getAll().pipe(
                    map((response) => {
                        return actions.reportingRequestSuccess({ reports: _.orderBy(response, ['activityDate'], ['desc']) });
                    }),
                    catchError(() => of())
                )
            )
        )
    );

    /**
     * 
     * @param actions$ Actions
     * @param roleService RoleService
     * @param messageService NzMessageService
     * @param permissionService PermissionService
     * @param userService UserService
     * @param commonService CommonService
     * @param router Router
     */
    constructor(private actions$: Actions, private roleService: RoleService,
        private messageService: NzMessageService,
        private permissionService: PermissionService,
        private userService: UserService,
        private commonService: CommonService,
        private router: Router
    ) { }
}