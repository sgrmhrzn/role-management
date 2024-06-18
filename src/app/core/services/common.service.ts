import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IActivityModel, IUserActivityModel } from '../models/activity.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivityEnum } from '../enums/activity.enums';
import { IUserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Communicate with server for common information
 */
export class CommonService {
  constructor(private http: HttpClient) { }

  /**
   *
   * Fetch all activity logs
   *
   * */
  getAll(): Observable<IActivityModel[]> {
    return this.http.get<IActivityModel[]>(`${environment.SERVER_URL}activityLogs`);
  }

  /**
   * Adds new user activity log
   * @param activity IUserActivityModel - pass the user activity information
   * @returns Observable<IActivityModel>
   */
  addNewActivity(activity: IUserActivityModel): Observable<IActivityModel> {
    return this.http.post<IActivityModel>(`${environment.SERVER_URL}activityLogs`, this.mapActivityPayload(activity));
  }

  /**
   * Maps IUserActivityModel to IActivity model
   * @param activity IUserActivityModel - user activity info passed through different operations
   * @returns IActivityModel
   */
  private mapActivityPayload(activity: IUserActivityModel) {
    const user = JSON.parse(localStorage.getItem(environment.ACTIVE_USER_KEY) || '') as IUserModel;

    const payload: IActivityModel = {
      id: this.uuidv4(),
      activityDate: new Date(),
      type: activity.type,
      createdBy: user ? {
        id: user.id,
        name: user.name
      } : {},
      details: activity.msg,
      role: activity.role,
      permissionIds: activity.permissionIds,
      staff: activity.staff

    };

    return payload;
  }

  /**
   * Generetes new GUID 
   * @returns string
   */
  uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }


}
