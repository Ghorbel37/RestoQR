import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../_common/confirm-dialog/confirm-dialog.component';
import { ChangePasswordModalComponent } from '../change-password-modal/change-password-modal.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  columnsToDisplay = ['email', 'role', 'action'];
  existingUsers: User[];
  user: User = new User();
  result: string = '';

  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.notificationService.openSnackBar('Comptes affichés')
  }

  refresh() {
    this.userService.getAll().subscribe(data => {
      this.existingUsers = data;
      this.changeDetectorRef.detectChanges();
    });
  }

  update(user: User) {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, { data: user })
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult)
      if (dialogResult) {
        this.user = dialogResult;
        this.userService.update(this.user.idUser, this.user).subscribe();
        this.user = new User();
      }
      else this.refresh();
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { maxWidth: "400px", data: new ConfirmDialogModel("Attention", "Êtes-vous sûr de vouloir supprimer") });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      if (this.result) {
        this.userService.delete(id).subscribe(data => {
          this.refresh();
          this.notificationService.openSnackBar("Compte supprimé");
        });
      }
    });
  }

}
