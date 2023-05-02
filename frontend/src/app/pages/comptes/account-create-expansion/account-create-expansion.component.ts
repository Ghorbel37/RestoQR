import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User, Role } from 'src/app/model/user';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-create-expansion',
  templateUrl: './account-create-expansion.component.html',
  styleUrls: ['./account-create-expansion.component.css']
})
export class AccountCreateExpansionComponent {
  user: User = new User();
  roles = Object.values(Role).filter(value => isNaN(Number(value)));

  @Output("refresh") refresh: EventEmitter<any> = new EventEmitter();

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
  ) { }

  submit() {
    this.userService.save(this.user).subscribe(data => {
      this.refresh.emit();
      this.notificationService.openSnackBar("Compte ajouté avec succés");
      this.user = new User();
    });
  }

}
