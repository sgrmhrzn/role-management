import { IRoleModel } from "./role.model";

/**
 * Holds user information
 */
export interface IUserModel {
    id: string;
    name: string;
    username?: string;
    password?: string;
    canDelete?: boolean;
    permissions?: Array<string>;
    role?: IRoleModel;
    createdDate?: Date;
}

/**
 * Holds user assignment information in the role
 */
export interface IUserAssignModel {
    id: string;
    role: IRoleModel;
    userIds: Array<string>;
}

/**
 * Holds the active user information 
 */
export interface IActiveUserModel {
    id?: string;
    name?: string;
    username?: string;
    permissions?: string[];
    role?: IRoleModel;
    createdDate?: Date;
}

/**
 * Holds the log in information
 */
export interface ILogInUserModel {
    username: string;
    password: string;
}