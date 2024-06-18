import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { NZ_MODAL_DATA, NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IGlobalState } from '../../../../core/state/app.reducer';
import { Store } from '@ngrx/store';
import { addRoleRequest, updateRoleRequest } from '../../../../core/state/app.action';
import { IRoleModel } from '../../../../core/models/role.model';
import { RoleService } from '../../../../core/services/role.service';
import { selectRoleByTitle } from '../../../../core/state/app.selectors';
import { Observable, firstValueFrom } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonService } from '../../../../core/services/common.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NzModalModule, NzFlexModule, NzButtonModule, CommonModule, FormsModule, ReactiveFormsModule, NzFormModule, NzInputModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
/**
 * Modal component to add & edit role
 */
export class ModalComponent implements OnInit {
  readonly #modal = inject(NzModalRef);
  readonly nzModalData: IRoleModel = inject(NZ_MODAL_DATA);
  form: FormGroup<{
    id: FormControl<string>;
    title: FormControl<string>;
  }> = this.fb.group({
    id: ['', []],
    title: ['', [Validators.required, Validators.maxLength(25)]],
  });

  isEdit = false;
  current = 0;
  checkRoleTitle$!: Observable<IRoleModel | undefined>;

  constructor(private fb: NonNullableFormBuilder,
    private store: Store<IGlobalState>, private roleService: RoleService,
    private messageService: NzMessageService,
    private commonService: CommonService) {

  }

  ngOnInit(): void {
    if (this.nzModalData?.id) {
      this.form.patchValue(this.nzModalData);
    }
    else {
      this.form.get('id')?.setValue(this.commonService.uuidv4());
    }

    this.form.valueChanges.subscribe(value => {
      if (this.form.valid) {
        this.#modal.updateConfig({ nzOkDisabled: false });
      } else {
        this.#modal.updateConfig({ nzOkDisabled: true });
      }
    })
  }

  handleCancel(): void {

  }

  /**
   * Function to handle save button in the modal footer
   * @param event mouse click event
   */
  handleOk = async (event: MouseEvent) => {
    //check if the role name is already exist or not
    this.checkRoleTitle$ = this.store.select(selectRoleByTitle(this.form.value.title || ''));
    const r = await firstValueFrom(this.checkRoleTitle$);
    if (r) {
      this.messageService.error('Role with the same title already exist. Please choose a different title.');
      event.stopPropagation();
    }
    else {
      if (this.nzModalData?.id) {
        this.store.dispatch(updateRoleRequest({ role: { ...this.form.getRawValue()} }))
      } else {
        this.store.dispatch(addRoleRequest({ role: { ...this.form.getRawValue(), canDelete: true } }))
      }
    }
  }
}

