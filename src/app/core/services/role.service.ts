import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRoleModel, IRolePermissionModel, IRoleUserModel } from '../models/role.model';
import { Observable } from 'rxjs';
import { IPermissionAssignModel } from '../models/permisson.model';
import { IUserAssignModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Communicate with server for role information
 */
export class RoleService {

  constructor(private http: HttpClient) { }

  /**
   *
   * Fetch all roles
   *
   * */
  getAll(): Observable<IRoleModel[]> {
    return this.http.get<IRoleModel[]>(`${environment.SERVER_URL}roles`);
  }

  /**
   * Add new role
   * @param role IRoleModel - role information
   * @returns Observable<IRoleModel>
   */
  addRole(role: IRoleModel): Observable<IRoleModel> {
    return this.http.post<IRoleModel>(`${environment.SERVER_URL}roles`, role);
  }

  /**
   * Update role
   * @param role IRoleModel - role information
   * @returns Observable<IRoleModel>
   */
  updateRole(role: IRoleModel): Observable<IRoleModel> {
    return this.http.put<IRoleModel>(`${environment.SERVER_URL}roles/${role.id}`, role);
  }

  /**
   * Patch role
   * @param role IRoleModel - role information
   * @returns Observable<IRoleModel>
   */
  patchRole(role: IPermissionAssignModel): Observable<IRoleModel> {
    return this.http.patch<IRoleModel>(`${environment.SERVER_URL}roles/${role.id}`, role);
  }

  /**
   * Delete role
   * @param id string - role id
   * @returns Observable<IRoleModel>
   */
  deleteRole(id: string): Observable<IRoleModel> {
    return this.http.delete<IRoleModel>(`${environment.SERVER_URL}roles/${id}`);
  }

  /**
   * Get assigned permissions of a role
   * @param id string - role id
   * @returns Observable<IRoleModel>
   */
  getRolePermissons(id: string): Observable<IPermissionAssignModel[]> {
    return this.http.get<IPermissionAssignModel[]>(`${environment.SERVER_URL}assignedPermissions?role.id=${id}`);
  }
  
}
