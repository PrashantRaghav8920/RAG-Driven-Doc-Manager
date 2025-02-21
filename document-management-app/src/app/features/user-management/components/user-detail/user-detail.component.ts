import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  standalone: false
})
export class UserDetailComponent {
  @Input() set user(value: User | null) {
    if (value) {
      this.isEditing = true;
      this.userForm.patchValue(value);
    }
  }

  @Output() onSave = new EventEmitter<Partial<User>>();
  @Output() onCancel = new EventEmitter<void>();

  userForm: FormGroup;
  isEditing = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['USER', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.onSave.emit(this.userForm.value);
    }
  }
  
} 