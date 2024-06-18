import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRoleModel } from '../models/role.model';
import { Observable } from 'rxjs';
import { IPermissionAssignModel, IPermissionModel } from '../models/permisson.model';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Communicate with server for permissions information
 */
export class PermissionService {
  commonService = inject(CommonService);

  constructor(private http: HttpClient) { }

  /**
   *
   * Fetch all permissions
   *
   * */
  getAll(): Observable<IPermissionModel[]> {
    return this.http.get<IPermissionModel[]>(`${environment.SERVER_URL}permissions`);
  }

  /**
   * Assign give permissions to the role
   * @param assignedPermissions IPermissionAssignModel - role with permission assignment data
   * @returns Observable<IRoleModel>
   */
  assignPermissions(assignedPermissions: IPermissionAssignModel): Observable<IRoleModel> {
    const url = `${environment.SERVER_URL}assignedPermissions/${assignedPermissions.id}`;
    if (assignedPermissions.id) {
      return this.http.patch<IRoleModel>(url, assignedPermissions);
    } else {
      return this.http.post<IRoleModel>(url, { ...assignedPermissions, id: this.commonService.uuidv4() });
    }
  }
}
