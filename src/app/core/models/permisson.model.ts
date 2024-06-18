import { IRoleModel } from "./role.model";

/**
 * Holds permission data
 */
export interface IPermissionModel {
    id: string;
    key: string;
    title: string;
    children: Array<IPermissionModel>;
    isLeaf?: boolean;
}

/**
 * Holds assigned permissions & role
 */
export interface IPermissionAssignModel {
    id: string;
    role: IRoleModel;
    permissionIds: Array<string>;
}