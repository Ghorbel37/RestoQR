import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

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
    this.notificationService.openSnackBar('Categories affichés')
  }

  refresh() {
    this.userService.getAll().subscribe(data => {
      this.existingUsers = data;
      this.changeDetectorRef.detectChanges();
    });
  }

}
