import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role, User } from 'src/app/model/user';

@Component({
  selector: 'app-change-role-modal',
  templateUrl: './change-role-modal.component.html',
  styleUrls: ['./change-role-modal.component.css']
})
export class ChangeRoleModalComponent implements OnInit {
  roles = Object.values(Role).filter(value => isNaN(Number(value)));
  passwordForm: FormGroup;
  hide = true;
  hide1 = true;



  constructor(
    public dialogRef: MatDialogRef<ChangeRoleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      role: new FormControl(this.data.role),
    });
  }

  close() {
    this.data.role = this.passwordForm.get("role").value;
    this.dialogRef.close(this.data);
  }
}
