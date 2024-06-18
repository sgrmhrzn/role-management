import { createSelector } from '@ngrx/store';
import { IGlobalState } from './app.reducer';
import _ from 'lodash';
import { IUserModel } from '../models/user.model';

//selector for roles
export const selectRoles = (state: IGlobalState) => state.global.roles;

//selector for permissions
export const selectPermissions = (state: IGlobalState) => state.global.permissons;

//selector for users
export const selectUsers = (state: IGlobalState) => state.global.users;

//selector for user by id
export const selectUserById = (id: string) =>
    createSelector(selectUsers, users => {
        return users.find(r => r.id === id);
    });

//selector for audit users
export const selectAuditUsers = (state: IGlobalState) => state.global.auditUsers;

//selector for reports
export const selectReports = (state: IGlobalState) => state.global.reports;

//selector for assigned users
export const selectAssignedUsers = (userIds: string[]) =>
    createSelector(selectUsers, users => {
        const filtered = new Array<IUserModel>();
        userIds.forEach(id => {
            const u = users.find(user => user.id === id);
            if (u) {
                filtered.push({ id: u?.id, name: u?.name, username: u?.username, password: u?.password } as IUserModel)
            }
        });
        return filtered;
    });

//selector for role by title
export const selectRoleByTitle = (title: string) =>
    createSelector(selectRoles, roles => {
        return roles.find(r => r.title.toLocaleLowerCase()?.trim() === title.toLocaleLowerCase()?.trim());
    });

//selector for active user
export const selectActiveUser = (state: IGlobalState) => state.global.activeUser;

//selector for dashboard metrics
export const selectCounts = (state: IGlobalState) => {
    return {
        roles: state.global.roles.length,
        users: state.global.users.length,
    }
};
