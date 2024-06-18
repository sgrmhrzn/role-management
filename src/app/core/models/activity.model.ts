import { ActivityEnum } from "../enums/activity.enums";
import { IRoleModel } from "./role.model";

/**
 * Interface for activity record
 */
export interface IActivityModel {
    id: string;
    activityDate: Date;
    type: ActivityEnum;
    createdBy: ICreatorModel;
    details: string;
    role?: IRoleModel;
    permissionIds?: Array<string>;
    userIds?: Array<string>;
    staff?: { id: string, name: string }
}

/**
 * Activity creator info interface
 */
export interface ICreatorModel {
    id?: string;
    name?: string;
}

/**
 * Interface to hold users activity in the page
 */
export interface IUserActivityModel {
    type: ActivityEnum;
    msg: string;
    role?: IRoleModel;
    permissionIds?: Array<string>;
    userIds?: Array<string>;
    staff?: { id: string, name: string }
}