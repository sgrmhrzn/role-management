import { Component, inject } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { IDrawerParams } from '../../../../core/models/drawer.model';
import { Store } from '@ngrx/store';
import { IGlobalState } from '../../../../core/state/app.reducer';
import { selectUserById } from '../../../../core/state/app.selectors';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { DateTimeFormatPipe } from '../../../../core/pipes/date-time-format.pipe';
import { map, mergeMap } from 'rxjs';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NzDescriptionsModule, NzBadgeModule, CommonModule, NzAvatarModule, DateTimeFormatPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  readonly nzModalData: IDrawerParams = inject(NZ_DRAWER_DATA);

  user$ = this.store.select(selectUserById(this.nzModalData.id)).pipe(mergeMap((user) =>
    this.userService.getAllAssignedRolesUsers().pipe(map((assignedRolesUsers) => {
      const clonedUser = {...user}
      if (user) {
        const assignedRole = assignedRolesUsers.find(l => l.userIds.includes(user?.id));
        if (assignedRole && user) {
          clonedUser.role = assignedRole?.role;
        }
      }
      return clonedUser;
    }))))

  constructor(private store: Store<IGlobalState>, private userService: UserService) {

  }
}
