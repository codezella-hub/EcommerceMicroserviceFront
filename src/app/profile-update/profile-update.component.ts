import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Profile} from "../services/profile/profile.service";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent {
  profileForm: FormGroup;
  genders = ['MALE', 'FEMALE'];

  constructor(
    public dialogRef: MatDialogRef<ProfileUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Profile,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      phoneNumber: [data.phoneNumber, Validators.required],
      address: [data.address, Validators.required],
      birthDate: [data.birthDate, Validators.required],
      gender: [data.gender, Validators.required],
      bio: [data.bio],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.profileForm.valid) {
      this.dialogRef.close(this.profileForm.value);
    }
  }
}
