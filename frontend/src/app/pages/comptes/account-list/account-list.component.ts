import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../_common/confirm-dialog/confirm-dialog.component';
import { ChangePasswordModalComponent } from '../change-password-modal/change-password-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeRoleModalComponent } from '../change-role-modal/change-role-modal.component';

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
  dataSource = new MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.refresh();
    this.sortDataSource();
    this.filterDataSource();
    this.notificationService.openSnackBar('Comptes affichés')
  }

  refresh() {
    this.userService.getAll().subscribe(data => {
      this.dataSource.data = data;
      this.changeDetectorRef.detectChanges();
    });
  }

  updatePassword(user: User) {
    const dialogRef = this.dialog.open(ChangePasswordModalComponent, { data: user })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.user = dialogResult;
        this.userService.update(this.user.idUser, this.user).subscribe({
          next: () => this.notificationService.openSnackBar("Mot de passe modifié"),
          complete: () => this.refresh()
        });
        this.user = new User();
      }
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sortDataSource() {
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      if (!data[sortHeaderId]) {
        return this.sort.direction === "asc" ? '3' : '1';
      }
      return typeof data[sortHeaderId] === 'string' ? '2' + data[sortHeaderId].toLocaleLowerCase() : data[sortHeaderId];
    }
  }

  filterDataSource() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.email.toLocaleLowerCase().includes(filter) || data.role.toString().toLocaleLowerCase().includes(filter);
    };
  }

}
