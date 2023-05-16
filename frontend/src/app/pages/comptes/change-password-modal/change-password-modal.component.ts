import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { MustMatch } from 'src/app/validators/must-match';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css']
})
export class ChangePasswordModalComponent implements OnInit {
  passwordMinLength: number = 3;
  passwordForm: FormGroup;
  user: User;



  constructor(
    public dialogRef: MatDialogRef<ChangePasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      password: new FormControl<string>("", [Validators.required, Validators.minLength(this.passwordMinLength)]),
      confirmPassword: new FormControl<string>("", [Validators.required]),
    }, {
      validator: MustMatch('password', 'confirmPassword'),
    });
  }

  close() {
    this.data.password = this.passwordForm.get("password").value;
    console.log(this.data.password);
    this.dialogRef.close(this.data);
  }
}

