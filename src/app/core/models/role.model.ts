import { IPermissionAssignModel, IPermissionModel } from "./permisson.model";
import { IUserAssignModel } from "./user.model";

/**
 * holds role information
 */
export interface IRoleModel {
    id: string;
    title: string;
    canDelete?: boolean;
}

/**
 * holds role and permission information
 */
export interface IRolePermissionModel extends IRoleModel {
    assignedPermissions: IPermissionAssignModel[];
}

/**
 * holds role and users information
 */
export interface IRoleUserModel extends IRoleModel {
    assignedUsers: IUserAssignModel[];
}