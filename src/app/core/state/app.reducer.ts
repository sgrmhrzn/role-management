import _ from "lodash";
import { IRoleModel } from "../models/role.model";
import { addRole, addUser, auditRequestSuccess, deleteRole, deleteUser, fetchPermissionsRequestSuccess, fetchRolesRequestSuccess, fetchUsersRequestSuccess, loginRequestSuccess, reportingRequestSuccess, updateRole, updateUser } from "./app.action";
import { IPermissionModel } from "../models/permisson.model";
import { IActiveUserModel, IUserModel } from "../models/user.model";
import { IActivityModel } from "../models/activity.model";

/**
 * Global state of store
 */
export interface IGlobalState {
  global: IAppState
}

/**
 * App state of store
 */
export interface IAppState {
  roles: IRoleModel[];
  permissons: IPermissionModel[];
  users: IUserModel[];
  activeUser?: IActiveUserModel;
  error?: string;
  auditUsers?: IUserModel[];
  reports?: IActivityModel[];
}

/**
 * Initial state of store
 */
export const initialState: IAppState = {
  roles: [],
  permissons: [],
  users: [],
  activeUser: {},
  error: '',
  auditUsers: [],
  reports: []
};

/**
 * Reducer for app
 * @param state AppState
 * @param action any
 * @returns 
 */
export function appReducer(state = initialState, action: any): IAppState {
  switch (action.type) {
    case loginRequestSuccess.type: {
      return {
        ...state, activeUser: { ...action.user }
      }
    }
    case fetchPermissionsRequestSuccess.type: {
      return {
        ...state, permissons: action.permissions
      }
    }
    case fetchUsersRequestSuccess.type: {
      return {
        ...state, users: action.users
      }
    }
    case fetchRolesRequestSuccess.type:
      return {
        ...state, roles: action.roles
      }
    case addRole.type:
      return {
        ...state, roles: [...state.roles, action.role]
      }
    case updateRole.type:
      return {
        ...state,
        roles: state.roles.map(role => (role.id === action.role.id ? { ...role, title: action.role.title } : role))
      };
    case deleteRole.type: {
      const cloned = _.cloneDeep(state.roles);
      _.remove(cloned, { id: action.id });

      return { ...state, roles: cloned };
    }
    case auditRequestSuccess.type: {
      return {
        ...state, auditUsers: action.users
      }
    }
    case reportingRequestSuccess.type: {
      return {
        ...state, reports: action.reports
      }
    }
    case addUser.type:
      return {
        ...state, users: [...state.users, action.user]
      }
    case updateUser.type:
      return {
        ...state,
        users: state.users.map(user => (user.id === action.user.id ? { ...user, name: action.user.name } : user))
      };
    case deleteUser.type:
      const cloned = _.cloneDeep(state.users);
      _.remove(cloned, { id: action.id });

      return { ...state, users: cloned };
    default:
      return state;
  }
}