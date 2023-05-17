import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Client } from 'src/app/model/client';
import { Employe } from 'src/app/model/employe';
import { User, Role } from 'src/app/model/user';
import { ClientService } from 'src/app/services/client.service';
import { EmployeService } from 'src/app/services/employe.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-create-expansion',
  templateUrl: './account-create-expansion.component.html',
  styleUrls: ['./account-create-expansion.component.css']
})
export class AccountCreateExpansionComponent {
  hide = true;
  roles = Object.values(Role).filter(value => isNaN(Number(value)));

  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();
  @ViewChild(MatExpansionPanel) expansionPanel: MatExpansionPanel;

  formClient: FormGroup;
  formEmploye: FormGroup;

  constructor(
    private userService: UserService,
    private employeService: EmployeService,
    private clientService: ClientService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
  ) {
    this.createFormClient();
    this.createFormEmploye();
  }

  createFormClient() {
    this.formClient = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      dateNais: new FormControl('',),
      numero: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("[0-9]{8}")]),
    })
  }

  submitClient() {
    let user: User = new User(1);
    user.email = this.formClient.get('email').value;
    user.password = this.formClient.get('password').value;
    let client: Client = new Client();
    client.firstname = this.formClient.get('firstname').value;
    client.lastname = this.formClient.get('lastname').value;
    client.dateNais = this.formClient.get('dateNais').value;
    client.numero = this.formClient.get('numero').value;
    this.userService.save(user).subscribe({
      next: (data) => {
        user = data;
        client.user = user;
        this.clientService.save(client).subscribe({
          next: (data) => {
            this.reset();
          }
        });
      },
    });
  }

  createFormEmploye() {
    this.formEmploye = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      nom: new FormControl('', [Validators.required]),
    })
  }

  submitEmploye() {
    let user: User = new User(2);
    let employe: Employe = new Employe();
    user.email = this.formEmploye.get('email').value;
    user.password = this.formEmploye.get('password').value;
    employe.user = user;
    employe.nom = this.formEmploye.get('nom').value;
    this.userService.save(user).subscribe({
      next: (data) => {
        user = data;
        employe.user = user;
        this.employeService.save(employe).subscribe({
          next: () => {
            this.reset();
          }
        });
      },
    });
  }

  reset() {
    this.refresh.emit();
    this.expansionPanel.close();
    this.notificationService.openSnackBar("Compte ajouté avec succés");
    this.formClient.reset();
    this.formEmploye.reset();
  }

}
